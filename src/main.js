import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from '@/modules/router';
import store from '@/modules/store'
import heatmapjsVue from 'heatmapjs-vue';

Vue.config.productionTip = false
Vue.use(heatmapjsVue);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
