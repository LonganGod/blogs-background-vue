import Vue from 'vue'
import Router from 'vue-router'
import Default from './default/default'
import axios from 'axios'
import {Message} from "element-ui";

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

router.beforeEach(async (to, from, next) => {
  if (to.path != '/login') {
    const adminId = window.sessionStorage.getItem('adminId')
    if (adminId) {
      let {data} = await axios.post('/api/checkPermission', {
        adminId: window.sessionStorage.getItem('adminId'),
        path: to.path
      })

      if (data.code == 200) {
        next()
      } else {
        return Message({
          type: 'warning',
          message: '对不起，您没有操作权限！'
        })
      }
    } else {
      next({path: "/login"})
    }
  } else {
    next()
  }
});

export default router
