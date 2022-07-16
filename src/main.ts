import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Popper from 'vue3-popper'

import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark, 
  faBars, faCaretLeft, faChevronDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

fontAwesomeLibrary.add(faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark, 
  faBars, faCaretLeft, faChevronDown, faCircleCheck)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .component("Popper", Popper)
  .mount('#app')
