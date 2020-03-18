import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/* 初始路由 */
export default new Router({
    routes: [
        {
            path: '/login',
            component: () => import('@/pages/login')
        }, {
            path: '/register',
            component: () => import('@/pages/register')
        }
    ]
})


