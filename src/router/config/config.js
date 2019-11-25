import BackgroundNavList from '../../views/backgroundNav/backgroundNavList'
import AddBackgroundNav from '../../views/backgroundNav/addBackGroundNav'
import EditBackgroundNav from '../../views/backgroundNav/editBackgroundNav'
import RoleList from '../../views/role/roleList'
import AddRole from '../../views/role/addRole'
import EditRole from '../../views/role/editRole'
import PermissionList from '../../views/permission/permissionList'

export default [
  {
    name: 'BackgroundNavList',
    path: '/config/backgroundNavList',
    component: BackgroundNavList
  },
  {
    name: 'AddBackgroundNav',
    path: '/config/addBackgroundNav',
    component: AddBackgroundNav
  },
  {
    name: 'EditBackgroundNav',
    path: '/config/editBackgroundNav',
    component: EditBackgroundNav
  },
  {
    name: 'RoleList',
    path: '/config/roleList',
    component: RoleList
  },
  {
    name: 'AddRole',
    path: '/config/addRole',
    component: AddRole
  },
  {
    name: 'EditRole',
    path: '/config/editRole',
    component: EditRole
  },
  {
    name: 'PermissionList',
    path: '/config/permissionList',
    component: PermissionList
  },
]
