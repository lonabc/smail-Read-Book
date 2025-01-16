
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: () => import('@/views/UserCenter.vue')
    }

  ]
})
// //路由守卫
// router.beforeEach((to, from, next) => {

//   if (to.name !== 'login' && !document.cookie.includes('JSESSe')) next({ name: 'login' })
//   else {
//     next();

//   }
// })

export default router
