import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'aos/dist/aos.css';
import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)

app.use(router)

registerSW({ immediate: true })

app.mount('#app')