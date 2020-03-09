import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index'
import adminRoutes from './adminRoutes'
import { fetchPermission } from './api'


const state = {
    get UserToken () {
        return localStorage.getItem('token')
    },
    set UserToken (value) {
        localStorage.setItem('token', value)
    },
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: [],
    permissionList: null /** 所有路由 */,
    sidebarMenu: [] /** 导航菜单 */,
    currentMenu: '' /** 当前active导航菜单 */
}

const actions = {
    //permission的文件
    async FETCH_PERMISSION ({ commit, state }) {
        //请求后台，后台给返回的路由，是登陆者用有的路由，
        let permissionList = await fetchPermission()

        /*  拿到后台返回的简易数据，与前端本地写好完整，有路径的路由作对比  然后两个数组循环对比拿真实的权限路由*/
        let routes = recursionRouter(permissionList, adminRoutes)

        //获取的路由的匹配的第一个对象，就是下面这一块
        // {
        //     path: '',
        //     component: () => import('@/pages/layout/index'),
        //     name: 'container',
        //     redirect: 'home',
        //     meta: {
        //         requiresAuth: true,
        //         name: '首页'
        //     },
        //     children: [
        //         {
        //             path: 'home',
        //             component: () => import('@/pages/home/index'),
        //             name: 'home',
        //             meta: {
        //                 name: '首页',
        //                 icon: 'icon-home'
        //             }
        //         }
        //     ]
        // },
        let MainContainer = DynamicRoutes.find(v => {
            return v.path === ''
        })

        //这里的children，就是这一块
        //children: [
        //         {
        //             path: 'home',
        //             component: () => import('@/pages/home/index'),
        //             name: 'home',
        //             meta: {
        //                 name: '首页',
        //                 icon: 'icon-home'
        //             }
        //         }
        //     ]
        let children = MainContainer.children
        children.push(...routes)

        /* 生成左侧导航菜单 */
        commit('SET_MENU', children)


        /*
            为所有有children的菜单路由设置第一个children为默认路由
            主要是供面包屑用，防止点击面包屑后进入某个路由下的 '' 路由,比如/manage/
            而我们的路由是
            [
                /manage/menu1,
                /manage/menu2
            ]
        */
        setDefaultRoute([MainContainer])





        //下面是生成跳转用的路由，上面是生成左侧菜单的路由

        /*  初始路由 只有一个login*/
        let initialRoutes = router.options.routes

        /*  动态添加路由 */
        router.addRoutes(DynamicRoutes)

        /* 完整的路由表 */
        commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])
    }
}
const mutations = {
    //登录 设置roken
    LOGIN_IN (state, token) {
        state.UserToken = token
    },
    //登出 清除token
    LOGIN_OUT (state) {
        state.UserToken = ''
    },
    // 面包屑 的收起与展开
    toggleNavCollapse (state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    //设置面包屑导航列表
    setCrumbList (state, list) {
        state.crumbList = list
    },

    //登录时设置 permission文件
    SET_PERMISSION (state, routes) {
        state.permissionList = routes
    },
    //登出时清空
    CLEAR_PERMISSION (state) {
        state.permissionList = null
    },
    //登录时 设置左侧菜单
    SET_MENU (state, menu) {
        state.sidebarMenu = menu
    },
    //登出时 清空左侧菜单
    CLEAR_MENU (state) {
        state.sidebarMenu = []
    },
    //设置当前的路由
    SET_CURRENT_MENU (state, currentMenu) {
        state.currentMenu = currentMenu
    }

}

/* 准备动态添加的路由 */
const DynamicRoutes = [
    {
        path: '',
        component: () => import('@/pages/layout/index'),
        name: 'container',
        redirect: 'home',
        meta: {
            requiresAuth: true,
            name: '首页'
        },
        children: [
            {
                path: 'home',
                component: () => import('@/pages/home/index'),
                name: 'home',
                meta: {
                    name: '首页',
                    icon: 'icon-home'
                }
            }
        ]
    },
    {
        path: '/403',
        component: () => import('@/pages/errorPage/403')
    },
    {
        path: '*',
        component: () => import('@/pages/errorPage/404')
    }
]

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
})


// //路由拼接的函数
function recursionRouter (userRouter = [], allRouter = []) {
    var realRoutes = []
    allRouter.forEach((v, i) => {
        userRouter.forEach((item, index) => {
            if (item.name === v.meta.name) {
                if (item.children && item.children.length > 0) {
                    v.children = recursionRouter(item.children, v.children)
                }
                realRoutes.push(v)
            }
        })
    })
    return realRoutes
}

/**
 *
 * 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
function setDefaultRoute (routes) {
    routes.forEach((v, i) => {
        if (v.children && v.children.length > 0) {
            v.redirect = { name: v.children[0].name }
            setDefaultRoute(v.children)
        }
    })
}
