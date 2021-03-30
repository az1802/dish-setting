import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from "@views/Home"
import About from "@views/About"
import Login from "@views/Login"
import DataAnalysis from "@views/DataAnalysis"
import MerchantSetting from "@components/MerchantSetting"
import DishSetting from "@components/DishSetting"        


const routes = [
  {
    path: "/",
    redirect: "/home/dishSetting"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        name:"merchantSetting",
        path: 'merchantSetting',
        component:MerchantSetting,
      }, {
        name:"dishSetting",
        path: 'dishSetting',
        component:DishSetting,
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dataAnalysis',
    name: "DataAnalysis",
    component: DataAnalysis
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
