<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3>🏆 结局回顾</h3>
      <div v-if="endings.length === 0" class="empty">
        还没有解锁任何结局<br>继续游戏探索吧！
      </div>
      <div v-for="ending in endings" :key="ending" class="ending-item" @click="$emit('watch', ending)">
        <span>📖 {{ ending }}</span>
        <span class="play-icon">▶</span>
      </div>
      <button class="close-btn" @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  endings: { type: Array, default: () => [] }
})
defineEmits(['close', 'watch'])
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
  max-width: 400px;
  border: 1px solid #444;
}
.modal h3 {
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
}
.empty {
  color: #666;
  text-align: center;
  padding: 30px 0;
  line-height: 1.8;
}
.ending-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin: 6px 0;
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
  color: #ddd;
  cursor: pointer;
  transition: all 0.2s;
}
.ending-item:hover {
  background: rgba(255,68,68,0.15);
  border-color: #ff4444;
}
.play-icon {
  color: #ff4444;
  font-size: 14px;
}
.close-btn {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 6px;
  background: #555;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.close-btn:hover {
  background: #777;
}
</style>