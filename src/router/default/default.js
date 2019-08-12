import Login from '../../views/login/login'
import Default from '../../views/default/default'
import Index from '../index/index'

export default [
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: '后台管理系统 - 登录'
    },
    component: Login
  },
  {
    name: 'Default',
    path: '/default',
    component: Default,
    children: [
      ...Index
    ]
  },
]
