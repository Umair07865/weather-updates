import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store.js'; // Import Vuex store
// Import the icons you want to use
// Create the Vue app and register the FontAwesomeIcon component globally
import SvgIcon from '@jamescoyle/vue-icon';


createApp(App)
  .use(store) // Use the Vuex store
  .component('SvgIcon', SvgIcon) // Register SvgIcon component globally
  .mount('#app'); // Mount the app to the DOM