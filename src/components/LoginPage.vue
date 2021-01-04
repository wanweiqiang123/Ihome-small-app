<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-30 15:30:33
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-04 15:52:58
-->
<template>
  <view class="base-login-lage">
    <slot />
  </view>
</template>

<script>
import storageTool from "../common/storageTool";
export default {
  name: "LoginPage",
  props: {
    check: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      title: "",
    };
  },
  onLoad() {},
  created() {
    let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
    let curRoute = routes[routes.length - 1].route; //获取当前页面路由
    let curParam = routes[routes.length - 1].options; //获取路由参数
    let parameter;
    Object.keys(curParam || {}).forEach((key) => {
      let t = key + "=" + curParam[key] + "&";
      parameter += t;
    });
    if (this.check) {
      //需校验登录
      let redirect;
      let url;
      if (parameter) {
        redirect = redirect + "?" + parameter;
        if (redirect.endsWith("&")) {
          redirect.substring(0, redirect.length - 1);
        }
      }
      if (redirect) {
        url = "/pages/login/index/index?redirect=" + redirect;
      } else {
        url = "/pages/login/index/index";
      }
      console.log(url);
      if (!storageTool.getToken()) {
        uni.redirectTo({
          url: url,
        });
      }
    } else {
      //无需校验登录
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>