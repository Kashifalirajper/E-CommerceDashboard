import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./../views/Dashboard')
  },
  {
    path: '/revenue-analysis',
    name: 'revenue-analysis',
    component: () => import('./../views/RevenueAnalysis')
  },
  {
    path: '/inventory-management',
    name: 'inventory-management',
    component: () => import('./../views/InventoryManagement')
  },
  {
    path: '/product-registration',
    name: 'product-registration',
    component: () => import('./../views/ProductRegistration')
  }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
