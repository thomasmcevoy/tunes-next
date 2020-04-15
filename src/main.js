import App from './App.vue'
import { createStore } from './store/index'
import { createApp } from 'vue'
import { VueHammer } from 'vue2-hammer'
// import Vue2TouchEvents from 'vue2-touch-events'

const app = createApp(App)
app.use(createStore())
app.use(VueHammer)
// app.use(Vue2TouchEvents)
app.config.devtools = true
app.config.productionTip = false
app.mount('#app')
