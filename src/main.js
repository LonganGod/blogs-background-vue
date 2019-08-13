import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Input,
  Button,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/default/base.less';
import './assets/less/default/default.less';
import './assets/less/public/public.less';
import './assets/less/user/user.less';

Vue.config.productionTip = false

Vue.use(Input)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
