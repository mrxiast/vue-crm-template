import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
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


