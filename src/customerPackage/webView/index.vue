<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-07 19:54:18
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-07 20:13:21
-->
<template>
  <view>
    <web-view :src="webViewSrc"></web-view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      webViewSrc: "",
    };
  },
  onShow() {
    this.webViewSrc = getApp().globalData.webViewSrc;
  },
};
</script>