<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 10:45:20
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-24 15:39:34
-->
<template>
  <view class="pay safe-area-inset-bottom">
    <view class="pay-msg margin-top">
      <view class="pay-title">付款信息</view>
      <view class="pay-item">
        <view class="pay-list">应付服务费
          <text class="pay-list-money">{{payNum}}</text>
        </view>
        <view class="pay-list">已付服务费
          <text class="pay-list-money">{{payNum}}</text>
        </view>
        <view class="pay-list">未付服务费
          <text class="pay-list-money">{{payNum}}</text>
        </view>
        <view class="pay-list">付款金额
          <text class="pay-list-money">{{payNum}}</text>
        </view>
      </view>
    </view>
    <view class="pay-msg margin-top">
      <view class="pay-title">付款方式</view>
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
    <view class="pay-hint">
      付款成功后可能存在延迟，请耐心等待1~2分钟！
      如付款成功后长时间还未更新记录请及时联系工作人员。
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
          paytype: "POS机刷卡",
          id: 2,
        },
        {
          paytype: "银行转账",
          id: 3,
        },
        {
          paytype: "银联支付",
          id: 4,
        },
        {
          paytype: "支付宝支付",
          id: 5,
        },
        {
          paytype: "微信好友代付",
          id: 6,
        },
      ],
    };
  },
  methods: {
    radioChange(e) {
      this.payType = e;
    },
    payGoto() {
      switch (this.value) {
        case "微信支付":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/weChatPay`,
          });
          break;
        case "POS机刷卡":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/POS`,
          });
          break;
        case "微信好友代付":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/friendPay`,
          });
          break;
        case "银行转账":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/bankTransfer`,
          });
          break;
        case "银联支付":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/zhifubaoPay`,
          });
          break;
        case "支付宝支付":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/zhifubaoPay`,
          });
          break;
      }
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
      left: 50%;
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

  &-hint {
    width: 90%;
    height: 100rpx;
    color: $uni-color-error;
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