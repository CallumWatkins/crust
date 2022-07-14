import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWindowMinimize, faWindowMaximize, faXmark } from '@fortawesome/free-solid-svg-icons'

fontAwesomeLibrary.add(faWindowMinimize, faWindowMaximize, faXmark)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app')
