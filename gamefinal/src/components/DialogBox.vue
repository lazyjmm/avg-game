<template>
  <div class="dialog-box" @click="handleClick" :style="{ opacity: opacity }">
    <div class="speaker">{{ speaker }}</div>
    <div class="content" :style="{ fontSize: textSize + 'px' }">{{ displayedText }}</div>
    <div v-if="!isFinished" class="next-hint">▼</div>
    <div v-else class="next-hint">▼ 点击继续</div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  speaker: String,
  content: String,
  speed: { type: Number, default: 50 },
  textSize: { type: Number, default: 18 },
  opacity: { type: Number, default: 0.85 }
})

const emit = defineEmits(['click'])

const displayedText = ref('')
const isFinished = ref(false)
let timer = null
let fullText = ''

function startTyping() {
  stopTyping()
  fullText = props.content || ''
  displayedText.value = ''
  isFinished.value = false
  if (!fullText) {
    isFinished.value = true
    return
  }
  let index = 0
  timer = setInterval(() => {
    if (index < fullText.length) {
      displayedText.value += fullText.charAt(index)
      index++
    } else {
      clearInterval(timer)
      timer = null
      isFinished.value = true
    }
  }, props.speed)
}

function stopTyping() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function skipTyping() {
  if (!isFinished.value) {
    stopTyping()
    displayedText.value = fullText
    isFinished.value = true
  }
}

function handleClick() {
  if (!isFinished.value) {
    skipTyping()
  } else {
    emit('click')
  }
}

watch(() => props.content, () => {
  startTyping()
}, { immediate: true })

onMounted(() => {
  startTyping()
})
</script>

<style scoped>
.dialog-box {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 18px 25px;
  border-radius: 8px;
  border: 2px solid #444;
  cursor: pointer;
  min-height: 80px;
  transition: opacity 0.3s ease;
}
.speaker {
  font-size: 16px;
  color: #ff6b6b;
  font-weight: bold;
  margin-bottom: 6px;
}
.content {
  line-height: 1.8;
  color: #f0f0f0;
  max-height: 200px;
  overflow-y: auto;
}
.next-hint {
  position: absolute;
  bottom: 8px;
  right: 20px;
  font-size: 14px;
  color: #888;
  animation: blink 1s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
</style>