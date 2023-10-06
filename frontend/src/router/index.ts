import { createRouter, createWebHistory } from 'vue-router'
import BasisLogin from '@/components/BasisLogin.vue'
import Dashboard from '@/components/Dashboard.vue'
import { userSessionStore } from '@/store/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: BasisLogin,
      meta: { isPublic: true }
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})

router.beforeEach((to, from, next) => {
  // alert('foobar')
  console.log('start')
  const sessionStore = userSessionStore()
  if (to.name !== 'Login' && !sessionStore.isAuthenticated) {
    console.log('authenticated')
    next({ name: 'Login' })
  } else {
    next()
  }
})
export default router
