import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from '@/modules/router';
import store from '@/modules/store'
import heatmapjsVue from 'heatmapjs-vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import VueHtml2Canvas from 'vue-html2canvas';
import moment from 'moment';

Vue.config.productionTip = false
Vue.use(heatmapjsVue);
Vue.use(VueHtml2Canvas);
Vue.prototype.$moment = moment;

new Vue({
  vuetify,
  store,
  router,
  PulseLoader,
  
  render: h => h(App)
}).$mount('#app')
