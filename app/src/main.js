import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Main from './Main.vue'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Main)
})
