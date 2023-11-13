import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { userSessionStore } from './store/session'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions)

const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
