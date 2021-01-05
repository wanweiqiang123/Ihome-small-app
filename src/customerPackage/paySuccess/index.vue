<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-16 14:21:01
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-21 15:16:58
-->
<template>
  <view class="success">
    <view class="list">
      <u-icon
        name="checkmark-circle-fill"
        color="#0099ff"
        size="120"
      ></u-icon>
      <view class="title">支付成功</view>
      <view class="init">您可以在我的购房详情查看付款记录</view>
    </view>
    <view class="my-btn">
      <u-button
        shape="square"
        @click="goback"
      >返回
      </u-button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goback() {
      uni.navigateTo({
        url: `/customerPackage/homeTab/index`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.success {
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  .list {
    margin-top: 50rpx;

    .title {
      font-size: 40rpx;
      font-weight: 600;
      margin-top: 20rpx;
    }
    .init {
      font-size: 25rpx;
      margin-top: 30rpx;
      color: #999999;
    }
  }
}
.my-btn {
  margin: 0 auto;
  width: 70%;
  text-align: center;
  box-sizing: border-box;
  margin-top: 20rpx;

  /deep/.u-btn {
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
  }
}
</style>