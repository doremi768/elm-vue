import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    // name: 'index',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: '/home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/Order',
        name: '/order',
        component: () => import('../views/Order.vue')
      },
      {
        path: '/Me',
        name: '/me',
        component: () => import('../views/Me.vue')
      }
      
    ]
  },
  {
    path:'/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if(to.path == '/login'){
    next();
  } else {
    //判断是否在登录状态
    isLogin ? next() : next('/login');
  }
})

export default router
