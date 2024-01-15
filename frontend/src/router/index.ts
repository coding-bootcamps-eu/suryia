import { createRouter, createWebHistory } from 'vue-router'
import { userSessionStore } from '@/store/session'
import BasisLogin from '@/components/BasisLogin.vue'
import Dashboard from '@/components/Dashboard.vue'
import CreateLink from '@/components/CreateLink.vue'
import LinkList from '@/components/LinkList.vue'
const EditLink = () => import('@/components/EditLink.vue')

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
    },
    {
      path: '/link-list',
      name: 'LinkList',
      component: LinkList
    },

    {
      path: '/create-link',
      name: 'CreateLink',
      component: CreateLink
    },
    {
      path: '/edit-link/:id',
      name: 'EditLink',
      component: EditLink,
      props: true
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
