<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-16 15:32:50
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-17 11:35:20
-->
<template>
  <IntermediaryTabBar>
    <view class="message-page-wrapper">
      <view class="message-item-wrapper">
        <view class="message-icon">
          <u-icon
            size="50rpx"
            name="volume-fill"></u-icon>
        </view>
        <view class="message-type">项目通知</view>
      </view>
      <view class="message-item-wrapper">
        <view class="message-icon">
          <u-icon
            size="50rpx"
            name="chat-fill"></u-icon>
        </view>
        <view class="message-type">报备带看提醒</view>
      </view>
      <view class="message-item-wrapper">
        <view class="message-icon">
          <u-icon
            size="50rpx"
            name="bell-fill"></u-icon>
        </view>
        <view class="message-type">结佣提醒</view>
      </view>
    </view>
  </IntermediaryTabBar>
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

<style lang="scss" scoped>
  .message-page-wrapper {
    width: 100%;

    .message-item-wrapper {
      width: 100%;
      display: flex;
      align-items: center;

      .message-icon {
        width: 120rpx;
        box-sizing: border-box;
        margin-right: 20rpx;
        text-align: center;
      }

      .message-type {
        flex: 1;
        box-sizing: border-box;
        padding: 30rpx 0rpx;
        border-bottom: 1px solid #f2f2f2;
        font-size: 36rpx;
        font-weight: 600;
        color: gray;
      }
    }
  }
</style>