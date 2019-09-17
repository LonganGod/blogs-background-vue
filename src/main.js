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
  Tag,
  Pagination,
  Avatar,
  MessageBox,
  Message,
  Form,
  FormItem,
  Timeline,
  TimelineItem,
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/default/base.less';
import './assets/less/default/default.less';
import './assets/less/public/public.less';

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
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Avatar)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Timeline)
Vue.use(TimelineItem)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
