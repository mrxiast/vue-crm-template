
/* 需要权限判断的路由,本地写好了 */
const adminRoutes = [
    {
        path: '/order',
        component: () => import('pages/order-manage'),
        name: 'order-manage',
        meta: {
            name: '订单管理',
            icon: 'icon-email'
        },
        children: [
            {
                path: 'list',
                name: 'order-list',
                component: () => import('pages/order-manage/order-list'),
                meta: {
                    name: '订单列表',
                    icon: 'icon-quit'
                }
            },
            {
                path: 'product',
                name: 'product-manage',
                component: () => import('pages/order-manage/product-manage'),
                meta: {
                    name: '生产管理',
                    icon: 'icon-service'
                },
                children: [
                    {
                        path: 'list',
                        name: 'product-list',
                        component: () =>
                            import('pages/order-manage/product-manage/production-list'),
                        meta: {
                            name: '生产列表',
                            icon: 'icon-nav'
                        }
                    },
                    {
                        path: 'review',
                        name: 'review-manage',
                        component: () =>
                            import('pages/order-manage/product-manage/review-manage'),
                        meta: {
                            name: '审核管理',
                            icon: 'icon-finance-manage'
                        }
                    }
                ]
            },
            {
                path: 'returnGoods',
                name: 'return-goods',
                component: () => import('pages/order-manage/return-goods'),
                meta: {
                    name: '退货管理',
                    icon: 'icon-product-manage'
                }
            }
        ]
    },
    {
        path: '/goods',
        component: () => import('pages/goods-manage'),
        name: 'goods',
        meta: {
            name: '产品管理',
            icon: 'icon-order-manage'
        },
        children: [
            {
                path: 'list',
                name: 'goods-list',
                component: () => import('pages/goods-manage/goods-list'),
                meta: {
                    name: '产品列表',
                    icon: 'icon-home'
                }
            },
            {
                path: 'classify',
                name: 'goods-classify',
                component: () => import('pages/goods-manage/goods-classify'),
                meta: {
                    name: '产品分类',
                    icon: 'icon-product-manage'
                }
            }
        ]
    }
]

export default adminRoutes
