import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from '@/modules/router';
import store from '@/modules/store'
import heatmapjsVue from 'heatmapjs-vue';
import heatmap from 'vue-heatmapjs';
import VueHtml2Canvas from 'vue-html2canvas';
import moment from 'moment';

Vue.config.productionTip = false
Vue.use(heatmapjsVue);
Vue.use(heatmap);
Vue.use(VueHtml2Canvas);
Vue.prototype.$moment = moment;

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
