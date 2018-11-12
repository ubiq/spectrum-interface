// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App'
import router from './router'
import { store } from './store/'
import moment from 'moment'
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(require('vue-moment'), {moment: moment})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
    Notifications
  },
  template: '<App/>'
})
