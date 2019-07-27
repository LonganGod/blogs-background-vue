import Vue from 'vue'
import Router from 'vue-router'
import Default from './default/default'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    ...Default
  ]
})
