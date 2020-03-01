import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)
import '@/plugins'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
