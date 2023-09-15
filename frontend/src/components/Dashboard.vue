<template>
  <div>
    <button @click="logout">LogOut</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userSessionStore } from '@/store/session'

export default defineComponent({
  setup() {
    const sessionStore = userSessionStore()
    return { sessionStore }
  },
  methods: {
    logout() {
      this.sessionStore.logout()
    }
  }
})
</script>

<style scoped></style>
