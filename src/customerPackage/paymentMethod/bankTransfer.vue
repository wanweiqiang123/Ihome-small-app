<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:28:17
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-24 16:43:07
-->
<template>
  <view class="pay safe-area-inset-bottom">
    <view class="pay-msg margin-top">
      <view class="pay-title">
        <text style="margin-left: 20rpx">收款信息</text>
      </view>
      <view class="pay-item">
        <view class="pay-list">收款公司
          <text class="pay-list-money">西藏保利爱家房地产经纪有限公司</text>
        </view>
        <view class="pay-list">收款帐号
          <text class="pay-list-money">{{5120234420110500000}}</text>
        </view>
        <view class="pay-list">收款金额
          <text class="pay-list-money">{{3000.00}}</text>
        </view>
      </view>
    </view>
    <view class="pay-msg margin-top">
      <view class="pay-hint">
        <u-icon
          name="info-circle"
          size="34"
        ></u-icon>
        <text style="margin-left: 20rpx">转账成功后在下方上传银行转账凭证并提交确认~</text>
      </view>
      <view class="pay-upload">
        <text>转账凭证</text>
        <u-upload
          class="upload"
          ref="uUpload"
          action="#"
          :auto-upload="false"
        ></u-upload>
      </view>

    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      value: "微信支付",
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
  methods: {},
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
    padding: 20rpx;
    font-size: 12px;
    background-color: $u-type-primary-disabled;
  }

  &-msg {
    width: 90%;
    box-sizing: border-box;
    margin-bottom: 30rpx;
    // padding: 0 20rpx;
    background-color: white;
  }

  &-title {
    width: 100%;
    font-size: 34rpx;
    box-sizing: border-box;
    font-weight: 600;
    padding: 15rpx 0rpx;
    background-color: $uni-color-warning;
    border-bottom: 1px solid #f2f2f2;
  }

  &-item {
    width: 100%;
    display: flex;
    padding: 0 20rpx;
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

  &-upload {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20rpx;

    .upload {
      margin-left: 20rpx;
    }
  }
}

.margin-top {
  width: 90%;
  box-sizing: border-box;
  margin-top: 20rpx;
}
</style>