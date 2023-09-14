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
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const sessionStore = userSessionStore()
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()
    const login = async () => {
      try {
        if (email.value === 'benutzer@email.com' && password.value === 'passwort123') {
          sessionStore.login(email.value)
          router.push('/dashboard')
        } else {
          errorMessage.value = 'Falsche E-Mail oder Passwort.'
        }
      } catch (error) {
        // Fehlerbehandlung, falls eine API-Anfrage fehlschlägt
        console.error('Fehler bei der Anmeldung:', error)
        errorMessage.value = 'Fehler bei der Anmeldung. Bitte versuche es erneut.'
      }
    }

    return {
      sessionStore,
      email,
      password,
      errorMessage,
      login
    }
  }
})
</script>
