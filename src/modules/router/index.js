import Vue from 'vue'
import Router from 'vue-router'
import paths from './paths'

Vue.use(Router);
const router = new Router({
    mode: 'history',
    routes: paths.map((path) => {
        return route(path.path, path.component, path.name)
    })
})

function route (path, component, name) {    
    return {
        name,
        path,
        component: () => import(
            `@/views/${component}`
        )
    }
}
export default router;