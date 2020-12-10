/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:31:14
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-01 11:51:10
 */
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import share from './mixins/share';
Vue.mixin(share);
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
import ChannelTabBar from './components/TabBar/ChannelTabBar.vue'
import StaffTabBar from './components/TabBar/StaffTabBar.vue'
Vue.component('TabBarPage', TabBarPage);
Vue.component('CustomerTabBar', CustomerTabBar);
Vue.component('ChannelTabBar', ChannelTabBar);
Vue.component('StaffTabBar', StaffTabBar);

//是否有资源权限的方法
Vue.prototype.$has = function (key) {
  let list = ['xx', 'yy'];//权限列表（从用户信息中读取）
  let result = false;//是否有权限
  if (key instanceof Array) {
    //数组类型
    let set1 = new Set(key);
    let set2 = new Set(list);
    //交集
    let intersect = [...new Set([...set1].filter(x => set2.has(x)))];
    if (intersect.length == 0) {
      result = false;
    } else {
      result = true;
    }
  } else if (typeof key == 'string') {
    //字符串类型
    result = list.includes(key);
  } else {
    result = false;
    console.error('只支持数组或字符串:' + typeof key)
  }
  console.log(result, key, list)
  return result;
}



const app = new Vue({
  ...App,
  store,

})
app.$mount()
