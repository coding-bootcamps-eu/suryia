import { defineStore } from 'pinia'

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
  }),
  getters: {
    isAuthenticated(state) {
      return state.user !== null
    }
  },
  actions: {
    login(email: string) {
      this.user = {
        email: email,
        token: ''
      }
    },
    logout() {
      this.user = null
    }
  }
})
