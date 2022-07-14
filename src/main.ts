import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Popper from 'vue3-popper'

createApp(App)
  .use(router)
  .component("Popper", Popper)
  .mount('#app')
