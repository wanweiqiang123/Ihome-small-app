/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:31:14
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-30 11:22:08
 */
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store;
App.mpType = 'app'


//异常配置捕获  errorHandler,warnHandler,renderError,errorCaptured
// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(`main.ts=> Vue.config.errorHandler------ Error: ${err.toString()};`);
//   console.log(err.message, err.stack);
//   console.log(err, vm, info);
// }
import TabBarPage from './components/TabBarPage.vue'

Vue.component('TabBarPage',TabBarPage)

const app = new Vue({
  ...App,
  store
})
app.$mount()
