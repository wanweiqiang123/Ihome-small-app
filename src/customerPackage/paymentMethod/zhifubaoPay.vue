<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:26:47
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-24 17:09:34
-->
<template>
  <view class="box">
    <view>
      <u-icon
        name="clock"
        color="#2979ff"
        size="200"
      ></u-icon>
    </view>
    <view>点击复制链接打开浏览器已完成支付</view>
    <u-link href="http://www.uviewui.com">http://8789321.dwd.com/asd2/das2dds</u-link>
  </view>
</template>
<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 100vh;
  display: flex;
  margin-top: 50rpx;
  flex-flow: column nowrap;
  align-items: center;
  .router {
    padding: 30rpx 0;
    color: $u-type-primary;
  }
}
</style>