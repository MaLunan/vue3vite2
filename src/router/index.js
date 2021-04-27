import {createRouter,createWebHashHistory} from 'vue-router'
import layout from "views/layout/index.vue";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        }, {
            path: "/",
            name: "layout",
            component: layout,
            children: [
                {
                    path: "/home",
                    name: "home",
                    meta: {
                        title: '主页'
                    },
                    component: () => import ("views/home/index.vue")
                }, 
                {
                    path: "/test",
                    name: "test",
                    meta: {
                        title: 'test'
                    },
                    component: () => import ("views/test/index.vue")
                }, 
                // {
                //     path: '/404',
                //     name: '404',
                //     meta: {
                //         title: '找不到页面'
                //     },
                //     component: () => import (/* webpackChunkName: "404" */
                //     '../views/404.vue')
                // }, {
                //     path: '/403',
                //     name: '403',
                //     meta: {
                //         title: '没有权限'
                //     },
                //     component: () => import (/* webpackChunkName: "403" */
                //     '../views/403.vue')
                // }
            ]
        }, 
        {
            path: "/login",
            name: "Login",
            meta: {
                title: '登录'
            },
            component: () => import (
            /* webpackChunkName: "login" */
            "../views/Login/index.vue")
        }
    ]
})

export default router;