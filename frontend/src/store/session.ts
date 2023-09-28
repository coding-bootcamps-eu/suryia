import { defineStore } from 'pinia'
import router from '@/router/index'
export interface User {
  email: string
  token: string
}

export interface SessionState {
  user: User | null
}
export const userSessionStore = defineStore('session', {
  state: (): SessionState => ({
    user: null
    //user: { email: '', token: '' }
  }),
  getters: {
    isAuthenticated(state) {
      return state.user !== null
    }
  },
  actions: {
    login(email: string, token: string) {
      this.user = {
        email: email,
        token: token
      }
    },
    logout() {
      this.user = null
      router.push({ name: 'Login' })
    }
  }
})
