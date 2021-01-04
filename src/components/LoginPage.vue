<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-30 15:30:33
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-04 15:28:04
-->
<template>
  <view class="base-login-lage">
    <slot />
  </view>
</template>

<script>
import storageTool from "../common/storageTool";
export default {
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
    if (this.check) {
      //需校验登录
      if (!storageTool.getToken()) {
        let url = "/pages/login/index/index?redirect=" + curRoute;
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