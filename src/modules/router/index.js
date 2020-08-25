import Vue from 'vue'
import Router from 'vue-router'
import paths from './paths'

Vue.use(Router);
const router = new Router({
    mode: 'hash',
    routes: paths
});

export default router;