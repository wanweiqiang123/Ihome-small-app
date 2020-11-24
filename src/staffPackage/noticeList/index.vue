<!--
 * @Description: 优惠告知书列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 15:54:19
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-24 09:52:09
-->
<template>
  <view class="notice safe-area-inset-bottom">
    <view class="fliter-container">
      <view class="fliter-btn">筛选</view>
    </view>
    <view class="item-container">
      <view
        class="notice-item"
        v-for="(i) in 10"
        :key="i"
        @click="handleGoConfirm()"
      >
        <view class="notice-info">
          <view class="notice-title">优惠告知书(1238755544645)</view>
          <view>保利XX项目 住宅-10栋-1501</view>
          <view>刘伟</view>
        </view>
        <view>
          <text>信息待确认</text>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
    <view class="notice-btn safe-area-inset-bottom">
      <u-button
        shape="circle"
        type="primary"
        @click="handleGoCreate()"
      >生成优惠告知书</u-button>
    </view>
  </view>
</template>

<script>
export default {
  name: "notice-list",
  methods: {
    handleGoConfirm() {
      uni.navigateTo({
        url: "/staffPackage/noticeConfirm/index",
      });
    },
    handleGoCreate() {
      uni.navigateTo({
        url: "/staffPackage/noticeCreate/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  background: $u-bg-color;
  min-height: 100vh;
}
.fliter-container {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  .fliter-btn {
    padding: 12rpx 16rpx;
  }
}
.item-container {
  padding: 90rpx 30rpx 102rpx;
  .notice-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14rpx 20rpx;
    background: #fff;
    .notice-info {
      font-size: 24rpx;
      color: $u-tips-color;
      line-height: 40rpx;
    }
    .notice-title {
      font-size: 30rpx;
      color: #000;
    }
  }
  .notice-item + .notice-item {
    margin-top: 20rpx;
  }
}
.notice-btn {
  position: fixed;
  bottom: 6rpx;
  left: 0;
  right: 0;
  padding-top: 10rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background: #fff;
}
</style>
