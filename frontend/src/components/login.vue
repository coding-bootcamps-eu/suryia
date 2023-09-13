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

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    /*async login() {
      const store = userSessionStore()
      try {
        const response = await checkCredentials(this.email, this.password)
        if (response.status === 200) {
          const userData = response.data
          store.session.login(userData.email)
          this.$router.push('/')
        } else {
          this.errorMessage = 'Denied Credentials'
        }
      } catch (error) {
        console.error('Something went wrong!', error)
        this.errorMessage = 'Please, try again!'
      }
    }*/
  }
})
</script>
