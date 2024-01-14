import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index.js'
import { i18n } from '../i18n.js'
import './css/app.css'
import './style.css'
import './css/custom-style.css'
import App from './App.vue'
import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config'
import SvgVue from './components/global/svgVue.vue'
import VueClickAway from "vue3-click-away"
import { VueReCaptcha } from 'vue-recaptcha-v3'
import router from './router.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

//import Login from './Views/Login.vue'
//import Auth from './Layouts/Auth.vue'
//import Admin from './Layouts/Admin.vue'
//import Public from './Layouts/Public.vue'

//import AdminHome from './Views/Admin/home.vue'

const app = createApp(App)

if (window.app.recaptcha_enabled) {
    app.use(VueReCaptcha, { siteKey: window.app.recaptcha_public });
}

const Filters = {
    capitalize: {
      onlyFirstLetter: false,
    },
    number: {
      format: '0',
      thousandsSeparator: ',',
      decimalSeparator: '.',
    },
    bytes: {
      decimalDigits: 2,
    },
    percent: {
      decimalDigits: 2,
      multiplier: 100,
      decimalSeparator: '.',
    },
    currency: {
      symbol: window.app.currency_symbol,
      decimalDigits: 2,
      thousandsSeparator: ',',
      decimalSeparator: '.',
      symbolOnLeft: window.app.currency_symbol_on_left,
      spaceBetweenAmountAndSymbol: false,
      showPlusSign: false,
    },
    pluralize: {
      includeNumber: false,
    },
    ordinal: {
      includeNumber: false,
    },
}

app.config.globalProperties.$axios = axios
app.component('svg-vue', SvgVue)
app.use(VueClickAway).use(VueAxios, axios).use(Filters)
app.use(router).use(i18n).use(store).use(Vueform, vueformConfig).mount('#app')
