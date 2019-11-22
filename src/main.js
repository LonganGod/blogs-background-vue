import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import moment from 'moment'
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
  Switch,
  Select,
  Option,
  Cascader,
  Timeline,
  TimelineItem,
  Upload,
  Steps,
  Step,
  Tree,
} from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/default/base.less';
import './assets/less/default/default.less';
import './assets/less/public/public.less';

Vue.config.productionTip = false

Vue.use(Input);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Card);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Avatar);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(Upload);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Tree);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.prototype.$axios = axios;

Vue.filter('dateFormat', date => {
  return moment(date).format('YYYY-MM-DD')
})

Vue.filter('dateFormatSeconds', date => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
})

// axios.defaults.baseURL = '/api';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
