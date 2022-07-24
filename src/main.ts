import devtools from '@vue/devtools'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Popper from 'vue3-popper'

import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import {
  faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark,
  faBars, faCaretLeft, faChevronDown, faCircleCheck, faLightbulb,
  faCircle, faUser, faCircleQuestion, faMagnifyingGlass, faPlus, faSort
} from '@fortawesome/free-solid-svg-icons'

fontAwesomeLibrary.add(
  faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark,
  faBars, faCaretLeft, faChevronDown, faCircleCheck, faLightbulb,
  faCircle, faUser, faCircleQuestion, faMagnifyingGlass, faPlus, faSort
)

createApp(App)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .component('FontAwesomeLayers', FontAwesomeLayers)
  .use(router)
  .component("Popper", Popper)
  .mount('#app')

if (import.meta.env.DEV) {
  devtools.connect();
}
