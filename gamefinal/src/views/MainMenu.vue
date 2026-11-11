<template>
  <div class="main-menu">
    <div class="menu-container">
      <h1 class="title">《弹丸论破2：真实七海IF线》</h1>
      <div class="menu-buttons">
        <button class="menu-btn" @click="handleNewGame">📖 新游戏</button>
        <button class="menu-btn" @click="handleLoadGame">💾 读取存档</button>
        <button class="menu-btn" @click="handleEndings">🏆 结局回顾</button>
        <button class="menu-btn" @click="showSettings = true">⚙️ 游戏设置</button>
        <button v-if="userStore.isLoggedIn" class="menu-btn logout" @click="handleLogout">
          👋 登出 ({{ userStore.username }})
        </button>
        <button v-else class="menu-btn login" @click="showLogin = true">
          🔑 登录 / 注册
        </button>
      </div>
    </div>

    <!-- 登录弹窗 -->
    <LoginModal
      v-if="showLogin"
      @close="showLogin = false"
      @login="onLogin"
      @switchToRegister="showRegister = true"
    />
    
    <!-- 注册弹窗 -->
    <RegisterModal
      v-if="showRegister"
      @close="showRegister = false"
      @register="onRegister"
    />
    
    <!-- 设置弹窗 -->
    <SettingsModal v-if="showSettings" @close="showSettings = false" />
    
    <!-- 结局回顾弹窗 -->
    <EndingsModal
      v-if="showEndingsModal"
      :endings="userStore.unlockedEndings"
      @close="showEndingsModal = false"
      @watch="watchEnding"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '../stores/user'
import LoginModal from '../components/LoginModal.vue'
import RegisterModal from '../components/RegisterModal.vue'
import SettingsModal from '../components/SettingsModal.vue'
import EndingsModal from '../components/EndingsModal.vue'

const router = useRouter()
const userStore = useUserStore()

const showLogin = ref(false)
const showRegister = ref(false)
const showSettings = ref(false)
const showEndingsModal = ref(false)

// 检查登录状态
onMounted(async () => {
  if (userStore.isLoggedIn) {
    try {
      const res = await axios.get('/api/user/me', { withCredentials: true })
      if (res.data.success) {
        userStore.setUser(res.data.userId, res.data.username, res.data.unlockedEndings || [])
      } else {
        userStore.logout()
        showLogin.value = true
      }
    } catch {
      userStore.logout()
      showLogin.value = true
    }
  } else {
    showLogin.value = true
  }
})

function handleNewGame() {
  if (!userStore.isLoggedIn) {
    showLogin.value = true
    return
  }
  router.push('/game?mode=new')
}

function handleLoadGame() {
  if (!userStore.isLoggedIn) {
    showLogin.value = true
    return
  }
  router.push('/game?mode=load')
}

function handleEndings() {
  if (!userStore.isLoggedIn) {
    showLogin.value = true
    return
  }
  showEndingsModal.value = true
}

function watchEnding(endingId) {
  router.push(`/game?mode=ending&id=${endingId}`)
}

function onLogin(user) {
  showLogin.value = false
  userStore.setUser(user.userId, user.username, user.unlockedEndings || [])
}

function onRegister() {
  showRegister.value = false
  showLogin.value = true   // 注册成功后自动打开登录
}

async function handleLogout() {
  userStore.logout()
  await axios.post('/api/user/logout', {}, { withCredentials: true }).catch(() => {})
  showLogin.value = true
}
</script>

<style scoped>
.main-menu {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Microsoft YaHei', sans-serif;
}
.menu-container {
  text-align: center;
}
.title {
  font-size: 64px;
  color: #ff4444;
  text-shadow: 0 0 40px rgba(255, 68, 68, 0.3);
  margin-bottom: 50px;
  letter-spacing: 12px;
  font-family: 'STKaiti', serif;
}
.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.menu-btn {
  width: 240px;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 2px solid rgba(255, 68, 68, 0.5);
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}
.menu-btn:hover {
  background: rgba(255, 68, 68, 0.2);
  border-color: #ff4444;
  transform: scale(1.02);
}
.menu-btn.logout {
  border-color: #666;
  color: #999;
}
.menu-btn.logout:hover {
  background: rgba(255, 0, 0, 0.1);
  border-color: #ff4444;
  color: #ff4444;
}
.menu-btn.login {
  border-color: #4a9eff;
}
.menu-btn.login:hover {
  background: rgba(74, 158, 255, 0.2);
  border-color: #4a9eff;
}
</style>