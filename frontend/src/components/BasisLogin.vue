<template>
  <q-layout>
    <!-- Header-->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Suriya | A Link Guiding System</q-toolbar-title>
        <q-space />
        <q-btn
          flat
          v-if="!sessionStore.isAuthenticated"
          @click="goToRegister"
          icon="person_add"
          label="Register"
        />
      </q-toolbar>
    </q-header>
    <!-- Inhaltsbereich -->
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card v-if="!sessionStore.isAuthenticated" class="my-card" bordered>
          <q-card-section class="bg-primary text-white">
            <div class="text-h5">Login</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="login" class="q-gutter-md">
              <q-input filled v-model="email" type="email" label="Email" id="email" required />
              <q-input
                filled
                v-model="password"
                type="password"
                label="Password"
                id="password"
                required
              />
              <div class="q-mt-md">
                <q-btn label="Login" type="submit" color="secondary" stretch />
              </div>
            </q-form>
            <div v-if="errorMessage" class="text-red">{{ errorMessage }}</div>
          </q-card-section>
        </q-card>
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
import { defineComponent, ref } from 'vue'
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
<style>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-center span {
  margin-left: 1em; /* Abstand zwischen Logo und Text */
  white-space: nowrap; /* Zeilenumbruch */
}
.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.footer-logo {
  height: 50px; /* Adjust the size as needed */
}

.footer-text {
  margin-left: 16px; /* Adjust the spacing as needed */
}
</style>
