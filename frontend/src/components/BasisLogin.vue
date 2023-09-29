<template>
  <div v-if="!sessionStore.isAuthenticated">
    <h2>LOGIN</h2>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input v-model="email" type="email" id="email" required />
      <label for="pasword">Password:</label>
      <input v-model="password" type="password" id="password" required />
      <button type="submit">LogIN</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { userSessionStore } from '@/store/session'
import axios from 'axios'

export default defineComponent({
  setup() {
    const sessionStore = userSessionStore()
    return { sessionStore }
  },

  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },

  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          username: this.email,
          password: this.password
        })
        console.log(response)
        if (response.data.token) {
          this.sessionStore.login(this.email, response.data.token)
          this.$router.push({ name: 'Dashboard' })
        } else {
          this.errorMessage = 'Incorrect email or password'
        }
      } catch (error) {
        // Error handling in case of a failed API request.
        console.error('Error during login:', error)
        this.errorMessage = 'Error during login. Try again!'
      }
    }
  }
})
</script>
