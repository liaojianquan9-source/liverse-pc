import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/variables.css'
import './styles/animations.css'

const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
  const msg = err && typeof err === 'object' ? (err.message || String(err)) : String(err)
  console.error('Vue Error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
  console.error('Message:', msg)
}
app.config.warnHandler = (msg, vm, trace) => {
  console.warn('Vue Warn:', msg)
}
app.use(createPinia())
app.use(router)
app.mount('#app')
