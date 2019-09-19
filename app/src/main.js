import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Main from './Main.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Main)
})
