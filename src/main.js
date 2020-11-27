/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:31:14
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-13 11:47:05
 */
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
import store from './store'
import tool from './common/tool'
import storageTool from './common/storageTool'
import './common/css/public.scss'
//把vuex定义成全局组件
Vue.prototype.$store = store;
Vue.prototype.$tool = tool;
Vue.prototype.$storageTool = storageTool;
App.mpType = 'app'


//异常配置捕获  errorHandler,warnHandler,renderError,errorCaptured
// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(`main.ts=> Vue.config.errorHandler------ Error: ${err.toString()};`);
//   console.log(err.message, err.stack);
//   console.log(err, vm, info);
// }
import TabBarPage from './components/TabBar/TabBarPage.vue'
import CustomerTabBar from './components/TabBar/CustomerTabBar.vue'
import IntermediaryTabBar from './components/TabBar/IntermediaryTabBar.vue'
import StaffTabBar from './components/TabBar/StaffTabBar.vue'
Vue.component('TabBarPage', TabBarPage);
Vue.component('CustomerTabBar', CustomerTabBar);
Vue.component('IntermediaryTabBar', IntermediaryTabBar);
Vue.component('StaffTabBar', StaffTabBar);

const app = new Vue({
  ...App,
  store
})
app.$mount()
