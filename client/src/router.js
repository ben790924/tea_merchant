import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Login from './views/Login.vue'
import About from './views/About.vue'
import Location from './views/Location.vue'
import Buy from './views/Buy.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy
    },
    {
      path: '/location',
      name: 'Location',
      component: Location
    }
  ]
})
