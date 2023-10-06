<template>
  <div v-if="sessionStore.isAuthenticated">
    <p class="welcome-message">Welcome, {{ sessionStore.user?.email }}!</p>
    <button @click="logout" id="logout-button">LogOut</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userSessionStore } from '@/store/session'
import axios from 'axios'

export default defineComponent({
  setup() {
    const sessionStore = userSessionStore()
    return { sessionStore }
  },
  methods: {
    async logout() {
      try {
        const response = await axios.post('http://localhost:8080/logout')
        this.sessionStore.logout()
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<style scoped></style>
