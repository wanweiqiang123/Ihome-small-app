<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-25 11:40:27
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-25 16:56:18
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
        <view>
          <u-button
            type="primary"
            size="mini"
          >下载电子回单</u-button>
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
        },
        {
          paid: "20000.00",
          payNum: "127892238733",
          payType: "支付宝支付",
          time: "2020-11-20 10:10:10",
        },
        {
          paid: "30000.00",
          payNum: "127892238733",
          payType: "银联支付",
          time: "2020-11-22 10:10:10",
        },
        {
          paid: "30000.00",
          payNum: "127892238733",
          payType: "银行转账",
          time: "2020-11-22 10:10:10",
        },
        {
          paid: "30000.00",
          payNum: "127892238733",
          payType: "微信支付",
          time: "2020-11-22 10:10:10",
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
        border-bottom: 1px solid #f2f2f2;
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