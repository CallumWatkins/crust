import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Popper from 'vue3-popper'

import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import {
  faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark,
  faBars, faCaretLeft, faChevronDown, faCircleCheck, faLightbulb,
  faCircle, faUser
} from '@fortawesome/free-solid-svg-icons'

fontAwesomeLibrary.add(
  faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark,
  faBars, faCaretLeft, faChevronDown, faCircleCheck, faLightbulb,
  faCircle, faUser
)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('font-awesome-layers', FontAwesomeLayers)
  .use(router)
  .component("Popper", Popper)
  .mount('#app')
