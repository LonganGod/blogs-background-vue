import Login from '../../views/login/login'
import Public from '../../views/public/public'
import Home from '../../views/home/home'

import UserRouter from '../user/user'
import ArticleRouter from '../article/article'

export default [
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: '后台管理 - 登录'
    },
    component: Login
  },
  {
    name: 'Public',
    path: '/public',
    meta: {
      title: '个人博客后台管理'
    },
    redirect: '/home',
    component: Public,
    children: [
      {
        name: 'Home',
        path: '/home',
        component: Home,
      },
      ...UserRouter,
      ...ArticleRouter
    ]
  }
]
