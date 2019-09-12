import UserList from '../../views/userList/userList'
import UserEdit from '../../views/userList/userEdit'
import UserMsg from '../../views/userMsg/userMsg'

export default [
  {
    name: 'UserList',
    path: '/user/userList',
    component: UserList
  },
  {
    name: 'UserEdit',
    path: '/user/userEdit',
    param: true,
    component: UserEdit
  },
  {
    name: 'UserMsg',
    path: '/user/UserMsg',
    component: UserMsg
  }
]
