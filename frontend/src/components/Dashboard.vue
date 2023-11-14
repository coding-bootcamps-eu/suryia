<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Suriya </q-toolbar-title>
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
    <q-footer reveal elevated>
      <q-toolbar>
        <div class="q-toolbar__title flex-center">
          <img :src="bootcamplogo" alt="Logo" class="footer-logo" />
          <span>Developed by Ferdinand Niemann, Joe Gregory and Jipson Minibhavan</span>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userSessionStore } from '@/store/session'
import bootcamplogo from '@/assets/bootcamplogo.png'
import axios from 'axios'

export default defineComponent({
  setup() {
    const sessionStore = userSessionStore()
    return { sessionStore }
  },
  data() {
    return {
      email: 'julia12345@test.com',
      password: 'password1234',
      errorMessage: '',
      bootcamplogo: bootcamplogo
    }
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
