<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:27:32
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-25 16:52:06
-->
<template>
  <view class="box">
    <view class="hint">请联系案场人员使用POS机扫描该二维码</view>
    <view>
      <u-image
        width="600rpx"
        height="600rpx"
        src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3101623223,11353193&fm=26&gp=0.jpg"
      ></u-image>
    </view>
    <view>￥10000.00</view>
    <view>订单号：5120201105000001</view>
    <view>状态：待支付</view>
  </view>
</template>
<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  .hint {
    padding: 30rpx 0;
  }
}
</style>