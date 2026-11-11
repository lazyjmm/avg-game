<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div v-for="slot in slots" :key="slot" class="slot-item">
          <button @click="handleSlot(slot)">
            {{ title }}槽位 {{ slot }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  slots: Number
})
const emit = defineEmits(['save', 'load', 'close'])

function handleSlot(slot) {
  if (props.title === '存档') {
    emit('save', slot)
  } else {
    emit('load', slot)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #2a2a3e;
  border-radius: 12px;
  padding: 24px;
  min-width: 320px;
  border: 2px solid #555;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.modal-header h3 {
  color: #ff6b6b;
  margin: 0;
}
.modal-header button {
  background: none;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}
.modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.slot-item button {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid #444;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}
.slot-item button:hover {
  background: rgba(255, 68, 68, 0.2);
  border-color: #ff6b6b;
}
</style>