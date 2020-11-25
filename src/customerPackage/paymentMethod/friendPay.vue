<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:29:18
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-24 16:01:57
-->
<template>
  <view class="pay safe-area-inset-bottom">
    <view class="pay-hint">您的好友《微信昵称》邀请您帮忙代付</view>
    <view class="pay-msg margin-top">
      <view class="pay-item">
        <view class="pay-list">订单号
          <text class="pay-list-money">{{5120201105000001}}</text>
        </view>
        <view class="pay-list">支付金额
          <text class="pay-list-money">{{payNum}}</text>
        </view>
      </view>
    </view>
    <view class="pay-msg margin-top">
      <view class="pay-title">支付方式</view>
      <u-radio-group v-model="value">
        <view
          class="pay-type"
          v-for="(item, i) in payTypeList"
          :key="i"
        >
          <view style="line-height: 80rpx">
            <u-icon
              name="zhifubao"
              size="50"
            ></u-icon>
            <text class="pay-type-name">{{item.paytype}}</text>
          </view>
          <u-radio
            class="pay-type-radio"
            :name="item.paytype"
            @change="radioChange"
          ></u-radio>
        </view>
      </u-radio-group>
    </view>
    <view class="my-btn">
      <u-button
        shape="square"
        @click="payGoto"
      >{{`${payType}支付 ￥${payNum}`}}</u-button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      value: "微信支付",
      payType: "微信支付",
      payNum: "50000.00",
      payTypeList: [
        {
          paytype: "微信支付",
          id: 1,
        },
        {
          paytype: "支付宝支付",
          id: 2,
        },
        {
          paytype: "银联支付",
          id: 3,
        },
      ],
    };
  },
  methods: {
    radioChange(e) {
      this.payType = e;
    },
  },
};
</script>
<style lang="scss" scoped>
.pay {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-hint {
    padding-top: 20rpx;
  }

  &-msg {
    width: 90%;
    box-sizing: border-box;
    margin-bottom: 30rpx;
    padding: 0 20rpx;
    background-color: white;
  }

  &-title {
    width: 100%;
    font-size: 34rpx;
    box-sizing: border-box;
    font-weight: 600;
    padding: 15rpx 0rpx;
    border-bottom: 1px solid #f2f2f2;
  }

  &-item {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
  }
  &-list {
    height: 80rpx;
    line-height: 80rpx;
    border-bottom: 1px solid #f2f2f2;
    position: relative;

    &-money {
      position: absolute;
      right: 0;
    }
  }

  &-type {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;

    &-name {
      margin-left: 30rpx;
    }

    &-radio {
      display: flex;
      justify-content: space-evenly;
      /deep/ .u-radio__icon-wrap {
        width: 40rpx !important;
        height: 40rpx !important;
      }
    }
  }
}

.margin-top {
  width: 90%;
  box-sizing: border-box;
  margin-top: 20rpx;
}

.my-btn {
  width: 90%;
  box-sizing: border-box;
  margin-bottom: 30rpx;

  /deep/.u-btn {
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
  }
}
</style>
