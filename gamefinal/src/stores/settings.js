import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    opacity: 0.85,
    textSpeed: 50,
    textSize: 18
  }),
  actions: {
    setOpacity(val) { this.opacity = val },
    setTextSpeed(val) { this.textSpeed = val },
    setTextSize(val) { this.textSize = val }
  },
  persist: true
})