<template>
  <q-layout>
    <!-- Header -->
    <Header />
    <!-- <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="toolbar-title"> Suriya | A Link Guiding System </q-toolbar-title>
        <q-space />
        <div v-if="sessionStore.isAuthenticated" class="logout-section">
          <div class="welcome-message">Willkommen, {{ sessionStore.user?.email }}!</div>
          <q-btn flat @click="logout" icon="exit_to_app" label="Logout" />
        </div>
      </q-toolbar>
    </q-header>-->

    <!--  Footer Bereich -->
    <Footer />
    <!-- <q-footer reveal elevated>
      <q-toolbar>
        <div class="q-toolbar__title flex-center footer-content">
          <img :src="bootcamplogo" alt="Logo" class="footer-logo" />
          <span>Developed by Ferdinand Niemann, Joe Gregory and Jipson Minibhavan</span>
        </div>
      </q-toolbar>
    </q-footer>-->
  </q-layout>
</template>

<script lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { defineComponent } from 'vue'
import { userSessionStore } from '@/store/session'
import bootcamplogo from '@/assets/bootcamplogo.png'
import axios from 'axios'

export default defineComponent({
  name: 'Dashboard',
  components: {
    Header,
    Footer
  },
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

<style scoped>
/*.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
}*/
</style>
