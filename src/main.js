import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './helpers/helpers'
import * as VueGoogleMaps from 'vue2-google-maps'

import axios from "axios"
window.axios = axios

//window.$ = window.jQuery = require('jquery');

Vue.use(Buefy)

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDTUlCK1IVx7UMAOjeLpA4tCQteMOtBqBo',
        libraries: 'places',
    }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Buefy,
  render: h => h(App)
}).$mount('#app')
