<!--
 * @Description: 购房优惠收款
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 14:10:55
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-26 09:21:38
-->
<template>
  <view class="receipt safe-area-inset-bottom">
    <view class="fliter">
      <view class="fliter-btn">筛选</view>
    </view>
    <view class="item-list">
      <u-card
        :border="false"
        :show-head="false"
        class="ih-card"
        v-for="i in 10"
        :key="i"
      >
        <view
          slot="body"
          class="ih-card-content"
        >
          <view>
            <view class="receipt-title">保利时光城</view>
            <view>住宅-3栋-1904号</view>
          </view>
          <view>五万抵十万优惠折扣</view>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <text class="font-text">客户尚未完成付款</text>
          <u-button
            size="medium"
            type="primary"
            shape="circle"
          >查看</u-button>
        </view>
      </u-card>
    </view>
  </view>
</template>

<script>
export default {
  name: "receipt",
};
</script>

<style lang="scss" scoped>
.receipt {
  background: $u-bg-color;
  min-height: 100vh;
}
.fliter {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  .fliter-btn {
    padding: 16rpx 20rpx;
  }
}
.item-list {
  padding-top: 60rpx;
  padding-bottom: 6rpx;
}
.ih-card {
  &-content {
    display: flex;
    justify-content: space-between;
  }
  .receipt-title {
    font-weight: bold;
    font-size: 40rpx;
    margin-bottom: 10rpx;
  }
  &-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .font-text {
    color: $u-type-error;
  }
}
</style>
