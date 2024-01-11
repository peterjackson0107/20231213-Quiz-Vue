import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Front',
      name: 'Front',
      component: () => import('../views/Front.vue'),
    },
    {
      path: '/FrontInside',
      name: 'FrontInside',
      component: () => import('../views/FrontInside.vue')
    },
    {
      path: '/FrontCheck',
      name: 'FrontCheck',
      component: () => import('../views/FrontCheck.vue')
    },
    {
      path: '/FrontStatistics',
      name: 'FrontStatistics',
      component: () => import('../views/FrontStatistics.vue')
    },
    {
      path: '/Back',
      name: 'Back',
      component: () => import('../views/Back.vue')
    },
    {
      path: '/BackManage',
      name: 'BackManage',
      component: () => import('../views/BackManage.vue')
    },
    {
      path: '/Movie',
      name: 'Movie',
      component: () => import('../views/Movie.vue')
    },
    {
      path: '/moviecomment',
      name: 'moviecomment',
      component: () => import('../views/MovieComment.vue')
    },
    {
      path: '/MovieTest',
      name: 'MovieTest',
      component: () => import('../views/MovieTest.vue')
    },
  ]
})

export default router
