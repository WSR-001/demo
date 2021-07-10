import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    //首页重定向
    path: '/',
    redirect: '/home',
  },
  //首页
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index'),
  },
  //人员管理模块
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/views/personal/index'),
  },
  //违规人员页面
  {
    path: '/ViolatorsNotification',
    name: 'ViolatorsNotification',
    component: () => import('@/views/personal/ViolatorsNotification'),
  },
  // 实时监控
  {
    path: '/monitor',
    name: 'Monitor',
    component: () => import('@/views/monitor/index'),
  },
  //安全管理
  {
    path: '/security',
    name: 'Security',
    component: () => import('@/views/security/index'),
  },
  // 安全告警信息显示
  {
    path: '/SecurityWarning',
    name: 'SecurityWarning',
    component: () => import('@/views/security/SecurityWarning'),
  },
  //工程进度页面
  {
    path: '/progress',
    name: 'Progress',
    component: () => import('@/views/progress/index'),
  },
  // 预警图片显示
  {
    path: '/image',
    name: 'LayOut',
    component: () => import('@/views/LayOut'),
  },
  {
    path: '/404',
    component: () => import('@/components/error-page/404.vue'),
    hidden: true,
  },
];
const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_API,
  routes,
});
// 路由跳转之前,路由拦截
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login' && !localStorage.token) {
//     return next('/login');
//   }
//    next()
// })

export default router;
