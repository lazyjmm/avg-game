<template>
  <div class="menu-bar">
    <button @click="$emit('save')">💾 存档</button>
    <button @click="$emit('load')">📂 读档</button>
    <button @click="$emit('history')">📜 历史</button>
    <button @click="$emit('skip')">
      {{ isSkipping ? '⏸️ 停止' : '⏩ 快进' }}
    </button>
    <button @click="$emit('back')">↩️ 回退</button>
    <button @click="$emit('exit')" class="exit-btn">🚪 退出</button>
  </div>
</template>

<script setup>
defineProps({
  isSkipping: Boolean
})
defineEmits(['save', 'load', 'history', 'skip', 'back', 'exit'])
</script>

<style scoped>
.menu-bar {
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 10;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.menu-bar button {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: 1px solid #555;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.menu-bar button:hover {
  background: rgba(255, 68, 68, 0.7);
  border-color: #ff4444;
}
.exit-btn {
  border-color: #ff6b6b !important;
  color: #ff6b6b !important;
}
.exit-btn:hover {
  background: rgba(255, 68, 68, 0.3) !important;
}
</style>