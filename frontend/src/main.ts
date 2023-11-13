import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { Quasar } from 'quasar'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Quasar, {
  plugins: {}
})
app.mount('#app')
