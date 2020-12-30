<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-30 15:30:33
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-30 17:19:23
-->
<template>
  <view class="base-login-lage">
    <slot />
  </view>
</template>

<script>
export default {
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
    console.log("NoLoginPage", curRoute, curParam);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>