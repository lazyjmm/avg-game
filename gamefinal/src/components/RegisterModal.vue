<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3>注册</h3>
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <input v-model="confirmPassword" type="password" placeholder="确认密码" />
      <div class="modal-actions">
        <button @click="handleRegister">注册</button>
        <button @click="$emit('close')">取消</button>
      </div>
      <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['close', 'register'])

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

async function handleRegister() {
  if (!username.value || !password.value) {
    errorMsg.value = '用户名和密码不能为空'
    return
  }
  // 数据库里 username 是 VARCHAR(50)，超长会直接报 SQL 错误（前端只能看到"服务器错误"）
  if (username.value.length > 50) {
    errorMsg.value = '用户名不能超过 50 个字符'
    return
  }
  if (password.value.length > 255) {
    errorMsg.value = '密码过长'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = '两次密码输入不一致'
    return
  }
  try {
    const res = await axios.post('/api/user/register', {
      username: username.value,
      password: password.value
    })
    if (res.data.success) {
      emit('register')
    } else {
      errorMsg.value = res.data.msg || '注册失败'
    }
  } catch {
    errorMsg.value = '服务器错误，请重试'
  }
}
</script>

<style scoped>
/* 与 LoginModal 样式一致 */
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
.error {
  color: #ff4444;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}
</style>