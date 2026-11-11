<template>
  <div id="app">
    <div class="game-container">
      <!-- 🆕 背景层：根据引擎状态动态切换 -->
      <div class="bg-layer">
        <img
          v-if="engine.currentBg.value"
          :src="getBgImage(engine.currentBg.value)"
          alt="背景"
          @error="handleBgError"
        />
        <!-- 默认背景（当没有指定 bg 时） -->
        <div v-else class="bg-default"></div>
      </div>

      <!-- 🆕 立绘层：根据引擎状态动态切换 -->
      <div class="character-layer">
        <img
          v-if="engine.currentCharacter.value"
          :src="getCharacterImage(engine.currentCharacter.value)"
          alt="立绘"
          @error="handleCharacterError"
        />
      </div>

      <div class="game-title">《弹丸论破2：真实七海IF线》</div>

      <MenuBar
        @save="showSaveModal = true"
        @load="showLoadModal = true"
        @history="showHistory = true"
        @skip="toggleSkip"
        @back="goBack"
        @exit="exitGame"
        :isSkipping="engine.isSkipping.value"
      />

      <HistoryPanel v-if="showHistory" :history="engine.history" @close="showHistory = false" />

      <DialogBox
        v-if="dialogLine"
        :speaker="dialogLine.speaker"
        :content="dialogLine.content"
        :speed="settingsStore.textSpeed"
        :textSize="settingsStore.textSize"
        :opacity="settingsStore.opacity"
        @click="handleClick"
      />

      <OptionButtons
        v-if="showOptions"
        :options="engine.options.value"
        @select="handleSelect"
      />

      <SaveLoadModal
        v-if="showSaveModal"
        title="存档"
        :slots="5"
        @save="doSave"
        @close="showSaveModal = false"
      />
      <SaveLoadModal
        v-if="showLoadModal"
        title="读档"
        :slots="5"
        @load="doLoad"
        @close="showLoadModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import GameEngine from '../game/GameEngine'
import { events } from '../game/events'
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import MenuBar from '../components/MenuBar.vue'
import DialogBox from '../components/DialogBox.vue'
import OptionButtons from '../components/OptionButtons.vue'
import HistoryPanel from '../components/HistoryPanel.vue'
import SaveLoadModal from '../components/SaveLoadModal.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

if (!userStore.isLoggedIn) router.push('/')

// 创建引擎，传入结局回调
const engine = new GameEngine(events, async (endingId) => {
  try {
    await axios.post('/api/user/unlock-ending', { endingId }, { withCredentials: true })
    userStore.addEnding(endingId)
    alert(`🎉 结局「${endingId}」已解锁！`)
  } catch (e) {
    console.error('解锁结局失败', e)
  }
})

const showOptions = ref(false)
const showHistory = ref(false)
const showSaveModal = ref(false)
const showLoadModal = ref(false)

const currentEvent = computed(() => engine.getCurrentEvent())

// 对话框内容：台词事件显示自己；选项弹出时保留上一句，玩家才看得到"在选什么"
const dialogLine = computed(() => {
  const ev = currentEvent.value
  if (!ev) return null
  if (ev.type === 'say') return ev
  if (engine.options.value.length > 0) return engine.lastLine.value
  return null
})
// 🆕 不再需要 currentSpeaker，因为立绘由 engine.currentCharacter 控制

watch(
  () => engine.options.value,
  (newOptions) => {
    showOptions.value = newOptions && newOptions.length > 0
  },
  { immediate: true, deep: true }
)

function handleClick() {
  if (showOptions.value) return
  engine.click()
}

function handleSelect(index) {
  engine.selectChoice(index)
  showOptions.value = false
}

async function doSave(slot) {
  const saveData = engine.getSaveData()
  const currentEvent = engine.getCurrentEvent()
  const sceneName = currentEvent?.speaker || '未知场景'
  try {
    await axios.post(`/api/game/save?slot=${slot}`, {
      data: JSON.stringify(saveData),
      sceneName
    }, { withCredentials: true })
    showSaveModal.value = false
    alert('存档成功！')
  } catch (e) {
    console.error('存档失败', e)
    alert('存档失败，请检查网络')
    showSaveModal.value = false
  }
}

async function doLoad(slot) {
  try {
    const res = await axios.get(`/api/game/load/${slot}`, { withCredentials: true })
    const data = JSON.parse(res.data.saveData)
    if (typeof data.currentIndex !== 'number') {
      alert('存档数据损坏')
      showLoadModal.value = false
      return
    }
    showLoadModal.value = false
    engine.stopSkip()
    engine.isWaiting = false
    engine.options.value = []
    // 剧本 events 是静态导入的，存档里不再保存它，这里也不要覆盖
    let idx = data.currentIndex
    if (idx >= engine.events.length) idx = engine.events.length - 1
    if (idx < 0) idx = 0
    engine.currentIndex.value = idx
    Object.assign(engine.variables, data.variables || {})
    // 用 splice 就地替换，保持 reactive 数组身份，否则读档后历史面板不再刷新
    engine.history.splice(0, engine.history.length, ...(data.history || []))
    engine.sessionId = data.sessionId || Date.now().toString()
    // 🆕 恢复背景和立绘
    engine.currentBg.value = data.currentBg || 'courtroom'
    engine.currentCharacter.value = data.currentCharacter || ''
    engine.lastLine.value = data.lastLine || { speaker: '', content: '' }
    engine.executeCurrent()
    alert('读档成功！')
  } catch (e) {
    console.error('读档失败', e)
    if (e.response && e.response.status === 404) {
      alert('该槽位没有存档')
    } else if (e.response && e.response.status === 401) {
      alert('登录状态已失效，请重新登录')
    } else {
      alert('读档失败，请重试')
    }
    showLoadModal.value = false
  }
}

function toggleSkip() {
  engine.toggleSkip()
}

function goBack() {
  engine.goBack()
}

function exitGame() {
  if (confirm('确定要退出游戏并返回主菜单吗？未保存的进度将丢失。')) {
    router.push('/')
  }
}

// 🆕 获取背景图片路径（支持 .jpg 和 .png）
function getBgImage(name) {
  // 如果名字已经有扩展名，直接返回
  if (name.includes('.')) {
    return `/assets/bg/${name}`
  }
  // 默认尝试 .jpg
  return `/assets/bg/${name}.jpg`
}

// 🆕 获取立绘图片路径（支持 .png 和 .jpg）
function getCharacterImage(name) {
  // 如果名字已经有扩展名，直接返回
  if (name.includes('.')) {
    return `/assets/characters/${name}`
  }
  // 默认尝试 .png
  return `/assets/characters/${name}.png`
}

// 🆕 背景加载失败时尝试其他格式
function handleBgError(e) {
  const img = e.target
  const src = img.src
  if (src.endsWith('.jpg')) {
    img.src = src.replace('.jpg', '.png')
  } else if (src.endsWith('.png')) {
    img.src = src.replace('.png', '.jpg')
  } else {
    // 如果都失败，隐藏图片
    img.style.display = 'none'
  }
}

// 🆕 立绘加载失败时尝试其他格式
function handleCharacterError(e) {
  const img = e.target
  const src = img.src
  if (src.endsWith('.png')) {
    img.src = src.replace('.png', '.jpg')
  } else if (src.endsWith('.jpg')) {
    img.src = src.replace('.jpg', '.png')
  } else {
    // 如果都失败，隐藏图片
    img.style.display = 'none'
  }
}

onMounted(() => {
  const mode = route.query.mode
  const endingId = route.query.id

  if (mode === 'new') {
    engine.start()
  } else if (mode === 'load') {
    showLoadModal.value = true
  } else if (mode === 'ending' && endingId) {
    const targetMap = {
      'good_end': 'trust_ending_1',
	  'noTrust_end': 'doubt_ending_1', 
	   'normal_end': 'trust_ending_2', 
	   'bad_end': 'doubt_ending_2',
    }
    const targetId = targetMap[endingId] || endingId
    const targetIndex = engine.findIndexById(targetId)
    if (targetIndex !== -1) {
      engine.currentIndex.value = targetIndex
      engine.executeCurrent()
    } else {
      alert('结局不存在')
      router.push('/')
    }
  } else {
    engine.start()
  }
})
</script>

<style scoped>
#app { width: 100vw; height: 100vh; margin: 0; padding: 0; overflow: hidden; font-family: 'Microsoft YaHei', sans-serif; }
.game-container { position: relative; width: 100%; height: 100%; background: #1a1a2e; overflow: hidden; }
.bg-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
.bg-layer img { width: 100%; height: 100%; object-fit: cover; }
.bg-default { width: 100%; height: 100%; background: #1a1a2e; }
.character-layer { position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%); z-index: 2; }
.character-layer img { max-height: 400px; object-fit: contain; }
.game-title { position: absolute; top: 15px; left: 50%; transform: translateX(-50%); z-index: 10; color: #ff00ff; font-size: 28px; font-weight: bold; text-shadow: 0 0 20px rgba(255,0,0,0.5); letter-spacing: 8px; font-family: 'STKaiti', serif; }
</style>