<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-16 14:19:14
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-18 15:36:12
-->
<template>
  <view class="pay safe-area-inset-bottom">
    <view class="pay-hint">付款信息</view>
    <view class="pay-msg margin-top">
      <view class="pay-item">
        <u-field
          v-model="payRecod.payNo"
          label="订单号"
          placeholder="请输入付款金额"
          disabled
        ></u-field>
        <u-field
          v-model="payRecod.amount"
          label="支付金额"
          placeholder="请输入付款金额"
          disabled
        ></u-field>
      </view>
    </view>
    <view class="pay-title">支付方式</view>
    <view class="pay-msg margin-top">
      <u-radio-group v-model="payRecod.payType">
        <view class="pay-type">
          <view class="pay-type-image">
            <u-image
              height="60rpx"
              width="60rpx"
              :src="require(`../common/img/${payRecod.payType}.png`)"
            ></u-image>
            <text class="pay-type-name">{{`${getDictName(payRecod.payType, PayType)}`}}</text>
          </view>
          <u-radio
            active-color="#18B566"
            class="pay-type-radio"
            :name="payRecod.payType"
            @change="radioChange"
          ></u-radio>
        </view>
      </u-radio-group>
    </view>
    <view class="my-btn">
      <u-button
        shape="square"
        @click="payGoto"
      >{{`${getDictName(payRecod.payType, PayType)}支付 ￥${payRecod.amount?payRecod.amount: 0}`}}</u-button>
    </view>
    <view class="my-btn">
      <u-button
        shape="square"
        @click="changePayType"
      >更换支付方式</u-button>
    </view>
  </view>
</template>
<script>
import {
  getBusinessIdApi,
  getIdApi,
  postDeleteByBusinessIdApi,
  postUnionPayParameterApi,
  getWeChatJsApi,
} from "../../api/customer";
import { getAllByTypeApi } from "../../api/index";
export default {
  data() {
    return {
      noticeId: "",
      payRecod: {
        amount: 0,
        payType: "WeChatPay",
      },
      padId: "",
      PayType: [],
    };
  },
  async onShow() {
    let paidData = { ...getApp().paidData };
    this.noticeId = paidData.businessId;
    this.getInfo();
    this.PayType = await this.getDictAll("PayType");
  },
  methods: {
    // 字典翻译
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 字典匹配
    getDictName(code, list) {
      if (list.length) {
        const item = list.find((v) => v.code === code);
        return item?.name;
      }
    },
    async getInfo() {
      this.padId = await getBusinessIdApi(this.noticeId);
      const res = await getIdApi({
        id: this.padId,
      });
      this.payRecod = { ...res };
    },
    radioChange(e) {
      this.payRecod.payType = e;
    },
    async changePayType() {
      await postDeleteByBusinessIdApi({
        businessId: this.noticeId,
      });
      uni.navigateTo({
        url: `/customerPackage/paymentMethod/index`,
      });
    },
    async payGoto() {
      switch (this.payRecod.payType) {
        // 微信支付
        case "WeChatPay":
          const openId = uni.getStorageSync("openId");
          const res = await getWeChatJsApi(this.padId);
          const weChatData = JSON.parse(res).response.msgBody.wcPayData;
          uni.getProvider({
            service: "payment",
            success: (reson) => {
              uni.requestPayment({
                provider: reson.provider[0],
                appId: weChatData.appId,
                timeStamp: weChatData.timeStamp,
                nonceStr: weChatData.nonceStr,
                package: weChatData.pkg,
                signType: weChatData.signType,
                paySign: weChatData.paySign,
                success: () => {
                  uni.showToast({
                    title: "支付成功",
                    icon: "success",
                  });
                  uni.navigateTo({
                    url: `/customerPackage/paySuccess/index`,
                  });
                },
                fail: () => {
                  uni.showToast({
                    title: "支付失败",
                    icon: "none",
                  });
                },
              });
            },
          });
          break;
        case "Alipay":
        case "UnionPay":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/zhifubaoPay?id=${this.padId}&type=${this.payRecod.payType}`,
          });
          break;
        // pos机
        case "Pos":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/POS?id=${this.padId}`,
          });
          break;
        // 银行转账
        case "Transfer":
          uni.navigateTo({
            url: `/customerPackage/paymentMethod/bankTransfer`,
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

  &-hint {
    width: 90%;
    padding-top: 20rpx;
    text-align: left;
    display: block;
  }

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

  &-type {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;

    &-image {
      line-height: 80rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    &-name {
      margin-left: 20rpx;
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