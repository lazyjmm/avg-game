<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3>⚙️ 游戏设置</h3>
      <div class="setting-item">
        <label>对话框透明度：{{ Math.round(opacity * 100) }}%</label>
        <input type="range" min="50" max="100" v-model="opacityPercent" @input="updateOpacity" />
      </div>
      <div class="setting-item">
        <label>文本速度：{{ speed }}ms</label>
        <input type="range" min="20" max="200" v-model="speed" @input="updateSpeed" />
      </div>
      <div class="setting-item">
        <label>文本大小：{{ textSize }}px</label>
        <input type="range" min="14" max="28" v-model="textSize" @input="updateTextSize" />
      </div>
      <button class="close-btn" @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '../stores/settings'

const settings = useSettingsStore()

const opacityPercent = ref(settings.opacity * 100)
const speed = ref(settings.textSpeed)
const textSize = ref(settings.textSize)

const opacity = computed(() => opacityPercent.value / 100)

function updateOpacity() {
  settings.setOpacity(opacity.value)
}
function updateSpeed() {
  settings.setTextSpeed(Number(speed.value))
}
function updateTextSize() {
  settings.setTextSize(Number(textSize.value))
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: #2a2a3e;
  padding: 30px;
  border-radius: 12px;
  min-width: 340px;
  border: 1px solid #444;
}
.modal h3 {
  color: #fff;
  margin-bottom: 25px;
  text-align: center;
}
.setting-item {
  margin: 16px 0;
}
.setting-item label {
  color: #ddd;
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
}
.setting-item input[type="range"] {
  width: 100%;
  accent-color: #ff4444;
  background: #333;
  height: 4px;
  border-radius: 2px;
}
.close-btn {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 6px;
  background: #ff4444;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.close-btn:hover {
  background: #cc3333;
}
</style>