import { reactive, ref } from 'vue'

// 说明（2026-09-20 重构）：
// 旧版有一独立循环 autoSkip()，与 executeCurrent() 并行改 currentIndex，导致
// ①遇到选项自动选第一个 ②跑到结局不触发结局 ③历史重复 ④按钮状态不同步。
// 现在快进只是 executeCurrent() 内部的一个状态：一条推进链，不再有竞争。
class GameEngine {
  constructor(events, onEnding = null) {
    this.events = events
    this.onEnding = onEnding
    this.currentIndex = ref(0)
    this.variables = reactive({})
    this.history = reactive([])
    this.sessionId = Date.now().toString()
    this.isSkipping = ref(false)      // 快进开关（用 ref，视图直接绑定同一份状态）
    this.isWaiting = false
    this.options = ref([])
    this.lastLine = ref({ speaker: '', content: '' })  // 最近一句台词：选项弹出时对话框仍保留上下文

    // 🆕 当前背景和立绘
    this.currentBg = ref('courtroom')        // 默认背景
    this.currentCharacter = ref('')          // 默认立绘（空表示不显示）

    this._resolveClick = null
    this._resolveChoice = null
    this._epoch = 0                  // 硬中断计数（回退/读档/重开），用于作废在途的快进链
    this._suppressHistory = false    // 回退时抑制一次历史写入，避免重复
  }

  findIndexById(id) {
    if (!id) return -1
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].id === id) return i
    }
    console.warn('未找到 id:', id)
    return -1
  }

  start() {
    this.stopSkip()
    this.history.splice(0)
    this._suppressHistory = false
    this.currentIndex.value = 0
    // 重置背景和立绘到默认值
    this.currentBg.value = 'courtroom'
    this.currentCharacter.value = ''
    this.lastLine.value = { speaker: '', content: '' }
    this.options.value = []
    this.executeCurrent()
  }

  async executeCurrent() {
    const event = this.events[this.currentIndex.value]
    if (!event) {
      console.warn('事件不存在，索引:', this.currentIndex.value)
      this.isWaiting = false
      return
    }
    this.isWaiting = true

    // 🆕 检测背景切换
    if (event.bg !== undefined) {
      this.currentBg.value = event.bg
    }
    // 🆕 检测立绘切换
    if (event.character !== undefined) {
      this.currentCharacter.value = event.character
    }

    switch (event.type) {
      case 'say':
        this.lastLine.value = { speaker: event.speaker, content: event.content }
        if (this._suppressHistory) {
          this._suppressHistory = false
        } else {
          this.history.push({ speaker: event.speaker, content: event.content })
        }

        // 快进：不等点击，延时后自己往下走（撞到选项或结局会自然停下）
        if (this.isSkipping.value) {
          const myEpoch = this._epoch
          this.currentIndex.value++
          this.isWaiting = false
          await new Promise(r => setTimeout(r, 80))
          // 期间发生过回退/读档/重开：这条链作废，新的那条已经接手
          if (myEpoch !== this._epoch) return
          this.executeCurrent()
          break
        }

        await this.waitForClick()
        this.currentIndex.value++
        this.isWaiting = false
        this.executeCurrent()
        break

      case 'choice':
        // 快进遇到选项：停在这里，把选择权交回玩家
        if (this.isSkipping.value) this.isSkipping.value = false
        this.options.value = event.options
        const selected = await this.waitForChoice()
        this.options.value = []
        if (selected) {
          if (selected.targetId !== undefined) {
            const idx = this.findIndexById(selected.targetId)
            this.currentIndex.value = idx !== -1 ? idx : this.currentIndex.value + 1
          } else if (selected.nextIndex !== undefined) {
            this.currentIndex.value = selected.nextIndex
          } else if (selected.variable) {
            this.variables[selected.variable] = selected.value
            this.currentIndex.value++
          } else {
            this.currentIndex.value++
          }
        } else {
          this.currentIndex.value++
        }
        this.isWaiting = false
        this.executeCurrent()
        break

      case 'jump':
        if (event.targetId) {
          const idx = this.findIndexById(event.targetId)
          this.currentIndex.value = idx !== -1 ? idx : this.currentIndex.value + 1
        } else if (event.targetIndex !== undefined) {
          this.currentIndex.value = event.targetIndex
        } else {
          this.currentIndex.value++
        }
        this.isWaiting = false
        this.executeCurrent()
        break

      case 'condition':
        const cond = event.condition
        let targetIdx = this.currentIndex.value + 1
        if (this.variables[cond.var] === cond.value) {
          if (event.trueId) {
            const idx = this.findIndexById(event.trueId)
            targetIdx = idx !== -1 ? idx : this.currentIndex.value + 1
          } else if (event.trueIndex !== undefined) {
            targetIdx = event.trueIndex
          }
        } else {
          if (event.falseId) {
            const idx = this.findIndexById(event.falseId)
            targetIdx = idx !== -1 ? idx : this.currentIndex.value + 1
          } else if (event.falseIndex !== undefined) {
            targetIdx = event.falseIndex
          }
        }
        this.currentIndex.value = targetIdx
        this.isWaiting = false
        this.executeCurrent()
        break

      case 'end':
        this.isSkipping.value = false
        this.history.push({ speaker: '系统', content: '游戏结束' })
        if (this.onEnding) {
          const endingId = event.endingId || 'default_ending'
          this.onEnding(endingId)
        }
        this.isWaiting = false
        break

      default:
        this.currentIndex.value++
        this.executeCurrent()
    }
  }

  waitForClick() {
    return new Promise(resolve => { this._resolveClick = resolve })
  }

  click() {
    if (this._resolveClick) {
      this._resolveClick()
      this._resolveClick = null
    }
  }

  waitForChoice() {
    return new Promise(resolve => { this._resolveChoice = resolve })
  }

  selectChoice(index) {
    if (this._resolveChoice) {
      this._resolveChoice(this.options.value[index])
      this._resolveChoice = null
    }
  }

  getCurrentEvent() {
    return this.events[this.currentIndex.value] || null
  }

  // 注意：不再把整个静态剧本(events)写进存档——旧写法会让存档 JSON 涨到 1 万字符以上，
  // 超过后端 save_data 的字段长度，导致结局前存档失败或静默截断。
  getSaveData() {
    return {
      currentIndex: this.currentIndex.value,
      variables: this.variables,
      history: this.history,
      sessionId: this.sessionId,
      currentBg: this.currentBg.value,               // 🆕 保存背景
      currentCharacter: this.currentCharacter.value, // 🆕 保存立绘
      lastLine: this.lastLine.value
    }
  }

  goBack() {
    if (this.currentIndex.value <= 0) return
    this.stopSkip()

    // 历史修正：离开的若是台词就撤掉它那一条，落点那句已经记过，别重复写
    const leaving = this.events[this.currentIndex.value]
    if (leaving && leaving.type === 'say' && this.history.length > 0) {
      this.history.pop()
    }
    this.currentIndex.value--
    const entering = this.events[this.currentIndex.value]
    this._suppressHistory = !!(entering && entering.type === 'say')

    this.options.value = []
    this.isWaiting = false

    // 🆕 回退后重新检测当前事件的 bg 和 character
    if (entering) {
      if (entering.bg !== undefined) {
        this.currentBg.value = entering.bg
      }
      if (entering.character !== undefined) {
        this.currentCharacter.value = entering.character
      }
      if (entering.type === 'say') {
        this.lastLine.value = { speaker: entering.speaker, content: entering.content }
      }
    }

    this.executeCurrent()
  }

  // 快进开关：只翻状态，推进由 executeCurrent() 负责
  toggleSkip() {
    if (this.isSkipping.value) {
      // 关掉开关即可：在途的那一步跑完会自己挂回"等点击"
      this.isSkipping.value = false
    } else {
      const ev = this.getCurrentEvent()
      if (!ev || ev.type === 'end') return  // 已经到结局/没有事件，没什么可快进的
      this.isSkipping.value = true
      // 当前正挂在"等点击"上，替他点一下，让主循环接着往下跑
      this.click()
    }
  }

  // 硬中断快进（回退/读档/重开用）：作废在途的快进链，调用方负责再 executeCurrent()
  stopSkip() {
    this.isSkipping.value = false
    this._epoch++
  }
}

export default GameEngine
