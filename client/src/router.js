import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('./views/Product.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.token ? true : false
//   if (to.path === '/login') {
//     isLogin ? next('/') : next()
//   } else {
//     next()
//   }
// })

export default router
