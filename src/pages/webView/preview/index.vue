<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-29 17:01:06
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-28 15:37:12
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
  onLoad(res) {
    if (res.url) {
      this.webViewSrc = res.url;
    } else {
      this.webViewSrc = getApp().globalData.webViewSrc;
    }
  },
  // onShow() {
  //   this.webViewSrc = getApp().globalData.webViewSrc;
  // },
  onShareAppMessage(res) {
    //分享到朋友
    if (res.from === "button") {
      // 来自页面内分享按钮
    } else if (res.from === "menu") {
      // 来自右上角分享按钮
    }
    return {
      title: this.share.title,
      path: "/pages/webView/preview/index?url=" + res.webViewUrl,
      imageUrl: this.share.imageUrl,
      desc: this.share.desc,
      content: this.share.content,
      success() {
        uni.showToast({
          title: "分享成功",
        });
      },
      fail() {
        uni.showToast({
          title: "分享失败",
          icon: "none",
        });
      },
    };
  },
};
</script>