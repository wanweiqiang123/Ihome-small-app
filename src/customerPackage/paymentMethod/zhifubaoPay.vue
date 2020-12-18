<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:26:47
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-18 20:02:07
-->
<template>
  <view class="box">
    <view>
      <u-icon
        name="clock"
        color="#2979ff"
        size="200"
      ></u-icon>
    </view>
    <view>点击复制链接打开浏览器已完成支付</view>
    <view class="router">
      <u-parse :html="url" :selectable="true" style="width: min-content"></u-parse>
    </view>
  </view>
</template>
<script>
import { postUnionPayParameterApi } from "../../api/customer";
export default {
  data() {
    return {
      payId: '',
      payType: '',
      url: '',
    }
  },
  onLoad(options) {
    this.payId = options.id;
    this.payType = options.type;
    this.url = `https://test.m.polyihome.com/sales-h5/${this.payType}?id=${this.payId}`;
  },
  methods: {
      // let unionMsg = await postUnionPayParameterApi({
      //   id: this.payId,
      // });
      // console.log(unionMsg, '银联参数');
      // let submit = {
      //   MerId: unionMsg.merId,
      //   OrderNo: unionMsg.orderNo,
      //   OrderAmount: unionMsg.orderAmount,
      //   CurrCode: unionMsg.currCode,
      //   OrderType: unionMsg.orderType,
      //   CallBackUrl: unionMsg.callBackUrl,
      //   BankCode: unionMsg.bankCode,
      //   LangType: unionMsg.langType,
      //   BuzType: unionMsg.buzType,
      //   Reserved01: unionMsg.reserved01,
      //   Reserved02: unionMsg.reserved02,
      //   SignMsg: unionMsg.signMsg,
      // };
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 100vh;
  display: flex;
  margin-top: 50rpx;
  flex-flow: column nowrap;
  align-items: center;
  .router {
    padding: 20rpx 50rpx;
    color: $u-type-primary;
  }
}
</style>