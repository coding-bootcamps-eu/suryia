<template>
  <div>
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="toolbar-title"> Suriya | A Link Guiding System</q-toolbar-title>
        <q-space />
        <!--Registrierungs-Button, wenn Benutzer nicht angemeldet ist -->
        <q-btn
          flat
          v-if="!sessionStore.isAuthenticated"
          @click="goToRegister"
          icon="person_add"
          label="Register"
        />
        <!--Logout-Button, wenn Benutzer angemeldet ist -->
        <div v-if="sessionStore.isAuthenticated" class="logout-section">
          <div class="welcome-message">Willkommen, {{ sessionStore.user?.email }}!</div>
          <q-btn data-cy="logout-button" flat @click="logout" icon="exit_to_app" label="Logout" />
        </div>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { userSessionStore } from '@/store/session'
import { API_URL } from '@/utils/config.ts'
import axios from 'axios'
export default defineComponent({
  name: 'Header',
  setup() {
    const sessionStore = userSessionStore()
    return { sessionStore }
  },
  emits: ['logout', 'goToRegister'],
  methods: {
    async logout() {
      try {
        const response = await axios.post(API_URL + '/logout')
        this.sessionStore.logout()
      } catch (error) {
        console.error(error)
      }
      this.$emit('logout')
    },
    goToRegister() {
      this.$emit('goToRegister')
    }
  }
})
</script>

<style scoped>
.toolbar-title {
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.logout-section {
  display: flex;
  align-items: center;
}
.welcome-message {
  margin-right: 10px;
  font-size: 1em;
  font-weight: bold;
}
</style>
