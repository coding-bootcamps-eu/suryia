<template>
  <q-layout>
    <!-- Header mit Quasar Toolbar -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Dashboard </q-toolbar-title>
        <!-- Rechte Seite des Toolbars -->
        <div class="q-toolbar__actions">
          <div v-if="sessionStore.isAuthenticated">
            <q-btn flat @click="logout" icon="exit_to_app" label="Logout" />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Inhaltsbereich -->
    <q-page-container>
      <q-page padding>
        <div v-if="sessionStore.isAuthenticated">
          <p class="welcome-message">Willkommen, {{ sessionStore.user?.email }}!</p>
          <!-- Weitere Inhalte Ihres Dashboards hier -->
        </div>
      </q-page>
    </q-page-container>

    <!--  Footer Bereich -->
    <q-footer> </q-footer>
  </q-layout>
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
