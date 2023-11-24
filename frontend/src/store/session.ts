import { defineStore } from 'pinia'
import router from '@/router/index'
import axios from 'axios'
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

      localStorage.setItem('access_token', token)
      console.log(localStorage.getItem('access_token'))

      if (token) {
        this.user = { email, token }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        console.log(axios.defaults.headers.common['Authorization'])
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem('access_token')
      delete axios.defaults.headers.common['Authorization']
      router.push({ name: 'Login' })
    }
  }
})
