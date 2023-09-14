<template>
  <div>
    <h2>LOGIN</h2>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input v-model="email" type="email" id="email" required />
      <label for="pasword">Password:</label>
      <input v-model="password" type="password" id="password" required />
      <button type="submit">LogIN</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { userSessionStore } from '@/store/session'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const sessionStore = userSessionStore()
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()
    const login = async () => {
      try {
        if (email.value === 'user@email.com' && password.value === 'password123') {
          sessionStore.login(email.value)
          router.push('/dashboard')
        } else {
          errorMessage.value = 'Incorrect email or password'
        }
      } catch (error) {
        // Error handling in case of a failed API request.
        console.error('Error during login:', error)
        errorMessage.value = 'Error during login. Try again!.'
      }
    }

    return {
      sessionStore,
      email,
      password,
      errorMessage,
      login
    }
  }
})
</script>
