/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:31:14
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-03 15:45:31
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
import { getDictGetAllApi, getAreaApi } from './api/index'
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

import LoginPage from './components/LoginPage.vue'

import EmptyLoading from './components/EmptyLoading.vue'
Vue.component('LoginPage', LoginPage);
Vue.component('EmptyLoading', EmptyLoading);

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
  methods: {}
})
app.$mount();















/**  字典数据，省市区数据方法（已弃用，取name值让后端接口返回）
Vue.prototype.$dict = {
  //根据字典类别获取该分类的列表
  dictAllList(category, tag) {
    let areaAll = getApp().globalData.initData.areaAll;
    let list = dictAll[category];
    if (list) {
      if (tag) {
        let listTag = list.filter((item) => {
          if (item.tag == tag) {
            return true;
          } else {
            return false;
          }
        })
        return listTag;

      } else {
        return list;
      }

    } else {
      console.error(category, '字典类型无法匹配.')
      return [];
    }
  },
  //根据字典code和类别获取对应的name
  dictAllName(data, category) {
    let dictAll = getApp().globalData.initData.dictAll;
    if (data === undefined || data === null) {
      return null;
    } else {
      let list = dictAll[category];
      if (list) {
        let item = list.filter((i) => {
          if (i.code == data) {
            return true;
          } else {
            return false;
          }
        })
        if (item && item.length == 1) {
          return item[0].name;
        } else if (item && item.length > 1) {
          console.error(data, category, item, '字典匹配到多项.返回第一项');
          return item[0].name;
        } else {
          console.error(data, category, '字典无法匹配到数据');
          return null;
        }
      } else {
        console.error(category, '字典类型无法匹配.')
        return null;
      }
    }
  },
  //根据字典code和类别获取对应的name
  dictAllItem(data, category) {
    let dictAll = getApp().globalData.initData.dictAll;
    if (data === undefined || data === null) {
      return {}
    } else {
      let list = dictAll[category];
      if (list) {
        let item = list.filter((i) => {
          if (i.code == data) {
            return true;
          } else {
            return false;
          }
        })
        if (item && item.length == 1) {
          return item[0]
        } else if (item && item.length > 1) {
          console.error(data, category, item, '字典匹配到多项.返回第一项');
          return item[0]
        } else {
          console.error(data, category, '字典无法匹配到数据');
          return {};
        }
      } else {
        console.error(category, '字典类型无法匹配.')
        return {};
      }
    }
  },
  //根据行政区code获取对应的name
  getAreaName(code) {
    let areaAll = getApp().globalData.initData.areaAll;
    if (areaAll) {
      let areaName = null;
      for (let index = 0; index < areaAll.length; index++) {
        const element = areaAll[index];
        if (element.code == code) {
          areaName = element.name;
          break;
        }
      }
      return areaName;

    } else {
      return null;
    }
  },
 //根据行政区code获取对应的该项数据
  getArea(code) {
    if (areaAll) {
      let area = null;
      for (let index = 0; index < areaAll.length; index++) {
        const element = areaAll[index];
        if (element.code == code) {
          area = element;
          break;
        }
      }
      return area;
    } else {
      return null;
    }
  }
}
 */



// function initGlobalData() {
//   Promise.all([getAreaApi(), getDictGetAllApi()])
//     .then(res => {
//       areaAll = res[0];
//       dictAll = res[1];
//     }).catch(err => {
//       console.error('系统初始化数据存在异常', err)
//     }).finally(() => {
//       getApp().globalData.initData = true;
//     })
// };
// initGlobalData();






