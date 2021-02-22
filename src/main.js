import Vue from 'vue'
import { UI } from '@cyradar/ui'

import routes from './routes'
import localization from './localization'
import store from './store'
import AuthAPI from './api/Auth'
import App from './App.vue'

Vue.use(UI)

let ui = new UI({
  routes,
  store,
  auth: true,
  authAPI: AuthAPI.authentication,
  modeDisabled: false,
  localization: localization,
  http: {
    baseURL: process.env.VUE_APP_BASE_URL || '/api/v1/view/',
    timeout: 15000,
    unauthenticated (ui, err) {
      ui.store.dispatch('LOGOUT')
    }
  }
})

Vue.config.productionTip = false

new Vue({
  ui,
  render: h => h(App)
}).$mount('#app')
