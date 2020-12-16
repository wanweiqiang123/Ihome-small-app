<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 10:45:20
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-16 21:13:06
-->
<template>
  <view class="pay safe-area-inset-bottom">
    <view class="pay-title margin-top">付款信息</view>
    <view class="pay-msg margin-top">
      <view class="pay-item">
        <u-field label-width="150" v-model="payData.paymentAmount" label="应付服务费" disabled></u-field>
        <u-field label-width="150" v-model="payData.paid" label="已付服务费" disabled></u-field>
        <u-field label-width="150" v-model="payData.unpaid" label="未付服务费" disabled></u-field>
        <u-field label-width="150" v-model="payNum" label="付款金额" :clearable="false" @blur="payNumChange"></u-field>
      </view>
    </view>
    <view class="pay-title">付款方式</view>
    <view class="pay-msg margin-top">
      <u-radio-group v-model="payType">
        <view
          class="pay-type"
          v-for="(item, i) in $dict.dictAllList('PayType')"
          :key="i"
        >
          <view style="line-height: 80rpx">
            <u-icon
              name="zhifubao"
              size="50"
            ></u-icon>
            <text class="pay-type-name">{{item.name}}</text>
          </view>
          <u-radio
            active-color="#18B566"
            class="pay-type-radio"
            :name="item.code"
            @change="radioChange"
          ></u-radio>
        </view>
      </u-radio-group>
    </view>
    <view class="my-btn">
      <u-button
        shape="square"
        @click="payGoto"
      >{{`${$dict.dictAllName(payType, 'PayType')}支付 ￥${payNum?payNum:0}`}}</u-button>
    </view>
    <view class="pay-hint">
      付款成功后可能存在延迟，请耐心等待1~2分钟！
      如付款成功后长时间还未更新记录请及时联系工作人员。
    </view>
  </view>
</template>
<script>
import { postAddServiceApi, getDoPaymentApi } from "../../api/customer";
export default {
  data() {
    return {
      payData: {},
      payType: "WeChatPay",
      payNum: 0,
    };
  },
  onLoad() {
    this.payData = { ...getApp().paidData };
    this.payNum = this.payData.paymentAmount;
  },
  methods: {
    payNumChange(v) {
      let num = v.target.value;
      let amount = this.payData.paymentAmount + '';
      if (Number(num) > Number(this.payData.paymentAmount)) {
        this.payNum = num.substring(0, amount.length);
      }
    },
    radioChange(e) {
      this.payType = e;
    },
    async payGoto() {
      console.log(this.payType)
      let obj = {};
      obj.amount = this.payNum;
      obj.businessId = this.payData.businessId;
      obj.foundType = 'ServiceCharge';
      obj.groupId = this.payData.groupId;
      obj.operator = this.payData.operator;
      obj.payType = this.payType;
      obj.payer = 'Customer';
      obj.proId = this.payData.projectId;
      obj.roomId = this.payData.roomNumberId;
      obj.serviceAmount = this.payData.paymentAmount;
      obj.serviceFeePaid = this.payData.paid;
      obj.termId = this.payData.cycleId;
      obj.unpaidServiceFee = this.payData.unpaid;
      obj.terminal = 'WeChatApp';
      // 假数据
      obj.groupId = 15;
      obj.operator = 15;
      obj.proId = 1;
      obj.termId = 3;
      let res = await postAddServiceApi(obj);
      console.log(res);
      // const yinlian = await getDoPaymentApi({
        // id: 15,
      //   // id: this.payData.groupId,
      // })
      switch (this.payType) {
        // 微信支付
        case "WeChatPay":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/weChatPay`,
          });
          break;
        // pos机
        case "Pos":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/POS`,
          });
          break;
        // 银行转账
        case "Transfer":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/bankTransfer`,
          });
          break;
        // 支付宝
        case "Alipay":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/zhifubaoPay`,
          });
          break;
        // 银联支付
        case "UnionPay":
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
    width: 90%;
  }

  &-item {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    /deep/ .u-field {
      padding: 20rpx 0;
    }
    /deep/ .u-field__input-wrap {
      text-align: center;
    }
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