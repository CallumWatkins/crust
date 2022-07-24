// TODO: Remove devtools from prod build
// eslint-disable-next-line import/no-extraneous-dependencies
import devtools from '@vue/devtools';
import { createApp } from 'vue';
import Popper from 'vue3-popper'

import { library as font_awesome_library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';
import {
  faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark,
  faBars, faCaretLeft, faChevronDown, faCircleCheck, faLightbulb,
  faCircle, faUser, faCircleQuestion, faMagnifyingGlass, faPlus, faSort,
} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';

font_awesome_library.add(
  faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark,
  faBars, faCaretLeft, faChevronDown, faCircleCheck, faLightbulb,
  faCircle, faUser, faCircleQuestion, faMagnifyingGlass, faPlus, faSort,
);

createApp(App)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .component('FontAwesomeLayers', FontAwesomeLayers)
  .use(router)
  .component('Popper', Popper)
  .mount('#app');

if (import.meta.env.DEV) {
  devtools.connect();
}
