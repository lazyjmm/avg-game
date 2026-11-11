import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    username: '',
    isLoggedIn: false,
    unlockedEndings: []
  }),
  actions: {
    setUser(id, username, endings = []) {
      this.id = id
      this.username = username
      this.isLoggedIn = true
      this.unlockedEndings = endings
    },
    logout() {
      this.id = null
      this.username = ''
      this.isLoggedIn = false
      this.unlockedEndings = []
    },
    addEnding(endingId) {
      if (!this.unlockedEndings.includes(endingId)) {
        this.unlockedEndings.push(endingId)
      }
    }
  },
  persist: true
})