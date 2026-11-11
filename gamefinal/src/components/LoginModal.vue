<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3>登录</h3>
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <div class="modal-actions">
        <button @click="handleLogin">登录</button>
        <button @click="$emit('close')">取消</button>
        <button class="register-btn" @click="$emit('close'); $emit('switchToRegister')">注册</button>
      </div>
      <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['close', 'login', 'switchToRegister'])

const username = ref('')
const password = ref('')
const errorMsg = ref('')

async function handleLogin() {
  if (!username.value || !password.value) {
    errorMsg.value = '请输入用户名和密码'
    return
  }
  try {
    const res = await axios.post('/api/user/login', {
      username: username.value,
      password: password.value
    }, { withCredentials: true })
    if (res.data.success) {
      emit('login', {
        userId: res.data.userId,
        username: res.data.username,
        unlockedEndings: res.data.unlockedEndings || []
      })
      emit('close')
    } else {
      errorMsg.value = res.data.msg || '登录失败'
    }
  } catch {
    errorMsg.value = '服务器错误，请重试'
  }
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
  min-width: 320px;
  border: 1px solid #444;
}
.modal h3 {
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
}
.modal input {
  display: block;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #555;
  background: rgba(255,255,255,0.05);
  color: #fff;
  font-size: 16px;
  box-sizing: border-box;
}
.modal input:focus {
  outline: none;
  border-color: #ff4444;
}
.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
.modal-actions button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  background: #ff4444;
  color: #fff;
}
.modal-actions button:last-child {
  background: transparent;
  border: 1px solid #666;
  color: #999;
}
.modal-actions .register-btn {
  background: transparent;
  border: 1px solid #4a9eff;
  color: #4a9eff;
}
.error {
  color: #ff4444;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}
</style>