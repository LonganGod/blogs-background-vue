import BackgroundNavList from '../../views/backgroundNav/backgroundNavList'
import AddBackgroundNav from '../../views/backgroundNav/addBackGroundNav'
import EditBackgroundNav from '../../views/backgroundNav/editBackgroundNav'
import EditPermission from '../../views/backgroundNav/editPermission'
import RoleList from '../../views/role/roleList'
import AddRole from '../../views/role/addRole'
import EditRole from '../../views/role/editRole'
import FrontDeskNavList from '../../views/frontDeskNav/frontDeskNavList'
import AddFrontDeskNav from '../../views/frontDeskNav/addFrontDeskNav'
import EditFrontDeskNav from '../../views/frontDeskNav/editFrontDeskNav'

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
    name: 'EditPermission',
    path: '/config/editPermission',
    component: EditPermission
  },
  {
    name: 'FrontDeskNavList',
    path: '/config/frontDeskNavList',
    component: FrontDeskNavList
  },
  {
    name: 'AddFrontDeskNav',
    path: '/config/addFrontDeskNav',
    component: AddFrontDeskNav
  },
  {
    name: 'EditFrontDeskNav',
    path: '/config/editFrontDeskNav',
    component: EditFrontDeskNav
  },
]
