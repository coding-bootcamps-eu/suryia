<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">LOGIN</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="login">
          <q-input filled v-model="email" type="email" label="Email" required />
          <q-input filled v-model="password" type="password" label="Password" required />
          <div class="q-mt-md">
            <q-btn label="Login" type="submit" color="primary" />
          </div>
        </q-form>
        <div v-if="errorMessage" class="text-negative q-mt-md">{{ errorMessage }}</div>
      </q-card-section>
    </q-card>
  </q-page>
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
