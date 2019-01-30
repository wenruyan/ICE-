import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 登录
    {
      path: '',
      name: 'Login',
      component: () => import('@/components/Login'),
      // component: resolve => require(['@/components/login/Login'],resolve)
    },
    // 登录
    {
      path: '/IceStatus',
      name: 'IceStatus',
      component: () => import('@/components/IceStatus'),
      // component: resolve => require(['@/components/login/Login'],resolve)
    },
    // {
    //   path: '/status',
    //   name: 'status',
    //   component: () => import('@/components/status'),
    //   // component: resolve => require(['@/components/login/Login'],resolve)
    // },
  ]
})
