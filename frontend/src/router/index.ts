import { createRouter, createWebHistory } from 'vue-router'
import BasisLogin from '@/components/BasisLogin.vue'
import Dashboard from '@/components/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: BasisLogin
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    }
  ]
})

export default router
