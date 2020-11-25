<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-25 11:42:30
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-25 15:26:35
-->
<template>
  <view class="box">
    <view
      class="box-item"
      v-for="(item, i) in history"
      :key="i"
    >
      <view class="box-item-title">
        <view style="font-weight: bold;">付款金额：{{item.paid}}</view>
        <view style="color:#F59A23;font-size:26rpx">
          审核中
          <u-icon
            name="info-circle"
            size="28"
          ></u-icon>
        </view>
      </view>
      <view class="box-item-msg">
        <view class="box-item-msg-item">
          <view class="box-item-msg-title">付款单号
            <text class="box-item-msg-detail">{{item.payNum}}</text>
          </view>
          <view class="box-item-msg-title">付款方式
            <text class="box-item-msg-detail">{{item.payType}}</text>
          </view>
          <view class="box-item-msg-title">付款时间
            <text class="box-item-msg-detail">{{item.time}}</text>
          </view>
          <view class="box-item-msg-title">转账凭证
            <u-image
              bg-color="#FFFFFF"
              width="100rpx"
              height="60rpx"
              class="box-item-msg-detail"
              :url="item.url"
            ></u-image>
          </view>
          <view
            class="box-item-msg-title"
            style="border-top: 1px solid #f2f2f2f2;padding: 10rpx 0;height: 80rpx"
          >转账凭证
            <u-button
              class="box-item-msg-detail"
              type="error"
              size="mini"
            >删除</u-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      history: [
        {
          paid: "10000.00",
          payNum: "127892238733",
          payType: "微信支付",
          time: "2020-11-25 10:10:10",
          url: "https://cdn.uviewui.com/uview/example/fade.jpg",
        },
        {
          paid: "20000.00",
          payNum: "127892238733",
          payType: "支付宝支付",
          time: "2020-11-20 10:10:10",
          url: "https://cdn.uviewui.com/uview/example/fade.jpg",
        },
        {
          paid: "30000.00",
          payNum: "127892238733",
          payType: "银联支付",
          time: "2020-11-22 10:10:10",
          url: "https://cdn.uviewui.com/uview/example/fade.jpg",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
  padding: 22rpx 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-item {
    background-color: #fff;
    width: 100%;
    padding: 0 20rpx;
    & + & {
      margin-top: 20rpx;
    }
    &-title {
      height: 88rpx;
      font-size: 30rpx;
      border-bottom: 1px solid #f2f2f2f2;
      line-height: 88rpx;
      padding: 0 19rpx;
      display: flex;
      justify-content: space-between;
    }
    &-msg {
      &-item {
        padding: 0 20rpx;
      }
      &-title {
        height: 60rpx;
        line-height: 60rpx;
        position: relative;
      }
      &-detail {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>