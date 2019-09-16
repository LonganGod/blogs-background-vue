import UserList from '../../views/userList/userList'
import UserDetails from '../../views/userList/userDetails'
import UserMsg from '../../views/userMsg/userMsg'

export default [
  {
    name: 'UserList',
    path: '/user/userList',
    component: UserList
  },
  {
    name: 'UserDetails',
    path: '/user/userDetails',
    param: true,
    component: UserDetails
  },
  {
    name: 'UserMsg',
    path: '/user/UserMsg',
    component: UserMsg
  }
]
