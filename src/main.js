import Vue from 'vue'
import App from './App'
import router from './router'
import {Input, Button, Row, Col} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/default/base.less';
import './assets/less/default/default.less';

Vue.config.productionTip = false

Vue.use(Input)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
