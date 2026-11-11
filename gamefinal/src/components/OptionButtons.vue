<template>
  <div class="options">
    <button
      v-for="(opt, idx) in options"
      :key="idx"
      @click="$emit('select', idx)"
    >
      {{ opt.text }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  options: Array
})
defineEmits(['select'])
</script>

<style scoped>
.options {
  position: absolute;
  bottom: 160px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 70%;
}

.options button {
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  border: 2px solid #ff6b6b;
  padding: 14px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 17px;
  transition: all 0.3s;
}

.options button:hover {
  background: rgba(255, 68, 68, 0.3);
  transform: scale(1.03);
  box-shadow: 0 0 20px rgba(255, 68, 68, 0.3);
}
</style>