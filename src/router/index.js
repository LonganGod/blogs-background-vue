import Vue from 'vue'
import Router from 'vue-router'
import Default from './default/default'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    ...Default
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    const adminId = window.sessionStorage.getItem('adminId')
    if (adminId) {
      next();
    } else {
      next({path: "/login"})
    }
  } else {
    next();
  }
});

export default router
