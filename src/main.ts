import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {  mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
    },
  },
});

axios.defaults.baseURL = 'http://localhost:4000/';



createApp(App).use(router).use(vuetify).mount('#app');