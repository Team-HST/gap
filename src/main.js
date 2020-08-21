import Vue from "vue"
import App from './App.vue'
import Vuetify from 'vuetify'
import router from '@/router'

new Vue({
    vuetify: new Vuetify(),    
    router,

    render: h => h(App),
}).$mount('#app')
