<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-12 16:23:34
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-12 17:52:36
-->
<template>
  <view class="page">
    <view class="item">
      <view class="item-left">
        <u-image
          width="80rpx"
          height="80rpx"
          src="/static/img/msg.jpg"
        ></u-image>
      </view>
      <view class="item-right"> 项目通知</view>
    </view>
    <view class="item">
      <view class="item-left">
        <u-image
          width="80rpx"
          height="80rpx"
          src="/static/img/msg2.jpg"
        ></u-image>
      </view>
      <view class="item-right"> 报备带看提醒</view>
    </view>
    <view class="item">
      <view class="item-left">
        <u-image
          width="80rpx"
          height="80rpx"
          src="/static/img/msg3.jpg"
        ></u-image>
      </view>
      <view class="item-right"> 结佣提醒</view>
    </view>
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
  methods: {},
};
</script>

<style lang="scss">
.page {
  padding: 0 20rpx 20rpx 20rpx;
}
.item {
  display: flex;
}
.item-left {
  width: 120rpx;
  padding-top: 10rpx;
}
.item-right {
  flex: 1;
  line-height: 100rpx;
  font-size: 36rpx;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}
</style>