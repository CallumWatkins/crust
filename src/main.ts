// TODO: Remove devtools from prod build
// eslint-disable-next-line import/no-extraneous-dependencies
import devtools from '@vue/devtools';
import { createApp } from 'vue';
import 'reflect-metadata';
import { createPinia } from 'pinia';
import Popper from 'vue3-popper';

import { library as font_awesome_library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';
import {
  faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark,
  faBars, faCaretLeft, faChevronDown, faCircleCheck, faLightbulb,
  faCircle, faUser, faCircleQuestion, faMagnifyingGlass, faPlus,
  faSort, faImage, faCrown, faUserPlus, faPhone, faMicrophone,
  faMicrophoneSlash, faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';
import setup_logging from './helpers/logging';

await setup_logging();

font_awesome_library.add(
  faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark,
  faBars, faCaretLeft, faChevronDown, faCircleCheck, faLightbulb,
  faCircle, faUser, faCircleQuestion, faMagnifyingGlass, faPlus,
  faSort, faImage, faCrown, faUserPlus, faPhone, faMicrophone,
  faMicrophoneSlash, faUserGroup,
);

createApp(App)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .component('FontAwesomeLayers', FontAwesomeLayers)
  .component('Popper', Popper)
  .use(createPinia())
  .use(router)
  .mount('#app');

if (import.meta.env.DEV) {
  devtools.connect();
}
