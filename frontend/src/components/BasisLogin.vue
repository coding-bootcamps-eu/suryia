<template>
  <q-layout>
    <!-- Inhaltsbereich -->
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card v-if="!sessionStore.isAuthenticated" class="my-card" bordered>
          <q-card-section class="bg-secondary text-white">
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
                <q-btn label="Login" type="submit" color="secondary" />
              </div>
            </q-form>
            <div v-if="errorMessage" class="text-red">{{ errorMessage }}</div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userSessionStore } from '@/store/session'
import axios from 'axios'

export default defineComponent({
  name: 'BasisLogin',

  setup() {
    const sessionStore = userSessionStore()
    return { sessionStore }
  },

  data() {
    return {
      email: '', //'julia12345@test.com',
      password: '', //'password1234',
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
<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.q-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
