<template>
  <div class="history-panel">
    <div class="history-header">
      <h3>📜 对话历史</h3>
      <button @click="$emit('close')">✕</button>
    </div>
    <div class="history-list">
      <div v-for="(item, idx) in history" :key="idx" class="history-item">
        <span class="h-speaker">{{ item.speaker }}：</span>
        <span class="h-content">{{ item.content }}</span>
      </div>
      <div v-if="history.length === 0" class="empty">暂无对话</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  history: Array
})
defineEmits(['close'])
</script>

<style scoped>
.history-panel {
  position: absolute;
  top: 60px;
  right: 20px;
  z-index: 20;
  width: 360px;
  max-height: 70vh;
  background: rgba(0, 0, 0, 0.92);
  color: #fff;
  border-radius: 8px;
  border: 1px solid #444;
  padding: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #333;
}

.history-header h3 {
  margin: 0;
  color: #ff6b6b;
}

.history-header button {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

.history-list {
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
}

.history-item {
  padding: 6px 0;
  border-bottom: 1px solid #222;
  font-size: 14px;
  line-height: 1.6;
}

.h-speaker {
  color: #ff6b6b;
  font-weight: bold;
}

.h-content {
  color: #ddd;
}

.empty {
  color: #666;
  text-align: center;
  padding: 30px 0;
}
</style>