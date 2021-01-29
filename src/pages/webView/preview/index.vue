<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-29 17:01:06
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-29 17:01:22
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