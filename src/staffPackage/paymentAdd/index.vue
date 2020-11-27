<!--
 * @Description: 创建付款申请单
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-27 14:33:47
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-27 18:57:29
-->
<template>
  <view class="payment safe-area-inset-bottom">
    <view class="form-content">
      <view class="payment-form">
        <view class="form-title u-border-bottom">渠道信息</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="170"
        >
          <u-form-item
            label="渠道公司"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择渠道公司"
            />
          </u-form-item>
          <u-form-item
            label="收款账号"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择收款账号"
            />
          </u-form-item>
          <u-form-item
            label="发票类型"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择发票类型"
            />
          </u-form-item>
          <u-form-item
            label="发票税率"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择发票税率"
            />
          </u-form-item>
        </u-form>
      </view>
      <view class="payment-title">
        <text>待结佣付款列表</text>
        <view>
          <u-icon name="plus" /> 添加
        </view>
      </view>
      <view class="payment-item">
        <view class="top">
          <view class="top-container u-border-bottom">
            <view class="top-title">爱特城（20200101～202002001）</view>
            <view class="icon-container">
              <view class="icon">不垫佣</view>
              <view class="icon total">总包</view>
            </view>
          </view>
          <view class="top-money">
            <text>结佣总额：</text>
            <text class="money-rad">600.00</text>
            <text class="money-unit">元</text>
          </view>
        </view>
        <view class="bottom u-border-bottom">
          <view>
            <view class="code">成交报告编号：DF836372822</view>
            <view>本单佣金：200.00</view>
          </view>
          <u-icon
            name="close-circle-fill"
            color="#C0C4CC"
            size="30"
          ></u-icon>
        </view>
        <view class="bottom u-border-bottom">
          <view>
            <view class="code">成交报告编号：DF836372822</view>
            <view>本单佣金：200.00</view>
          </view>
          <u-icon
            name="close-circle-fill"
            color="#C0C4CC"
            size="30"
          ></u-icon>
        </view>
      </view>
      <view class="payment-item">
        <view class="top">
          <view class="top-container u-border-bottom">
            <view class="top-title">爱特城（20200101～202002001）</view>
            <view class="icon-container">
              <view class="icon warning">垫佣</view>
              <view class="icon total">总包</view>
            </view>
          </view>
          <view class="top-money">
            <text>结佣总额：</text>
            <text class="money-rad">600.00</text>
            <text class="money-unit">元</text>
          </view>
        </view>
        <view class="bottom u-border-bottom">
          <view>
            <view class="code">成交报告编号：DF836372822</view>
            <view>本单佣金：200.00</view>
          </view>
          <u-icon
            name="close-circle-fill"
            color="#C0C4CC"
            size="30"
          ></u-icon>
        </view>
        <view class="bottom u-border-bottom">
          <view>
            <view class="code">成交报告编号：DF836372822</view>
            <view>本单佣金：200.00</view>
          </view>
          <u-icon
            name="close-circle-fill"
            color="#C0C4CC"
            size="30"
          ></u-icon>
        </view>
      </view>
      <view class="payment-form margin-20">
        <view class="form-title u-border-bottom">佣金付款结算</view>
        <u-form
          ref="uForm"
          label-width="200"
        >
          <u-form-item label="本单结算佣金">800.00</u-form-item>
          <u-form-item label="不含税金额">780.00</u-form-item>
          <u-form-item label="税额">20.00</u-form-item>
        </u-form>
      </view>
      <view class="payment-form">
        <view class="form-title u-border-bottom">上传附件</view>
        <view class="form-upload">
          <u-upload
            :action="action"
            :file-list="fileList"
          ></u-upload>
        </view>
      </view>
      <view class="payment-form">
        <view class="form-title u-border-bottom">说明</view>
        <u-form
          ref="uForm"
          label-width="180"
        >
          <u-form-item label="申请说明">
            <u-input
              v-model="form.sex"
              placeholder="备注说明"
            />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="payment-btn safe-area-inset-bottom">
      <u-button
        shape="circle"
        type="primary"
      >提交</u-button>
    </view>
  </view>
</template>

<script>
export default {
  name: "payment-add",
  data() {
    return {
      form: {},
      action: "",
      fileList: [
        {
          url: "http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.payment {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-form {
    background: #fff;
    .form-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 92rpx;
      padding: 0 24rpx;
      color: $u-type-primary;
      font-family: "Source Han Sans CN";
    }
    & + & {
      margin-top: 20rpx;
    }
  }
  &-title {
    margin-top: 20rpx;
    margin-bottom: 10rpx;
    height: 92rpx;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24rpx;
    color: $u-type-primary;
    font-family: "Source Han Sans CN";
  }
  &-item {
    background: #fff;
    padding: 32rpx 0;
    .top {
      position: relative;
      padding: 0 20rpx;
      border-bottom: 1px dashed $u-bg-color;
      &::before {
        content: "";
        position: absolute;
        width: 25rpx;
        height: 25rpx;
        background: $u-bg-color;
        bottom: 0;
        left: 0;
        border-radius: 50%;
        transform: translate(-50%, 50%);
      }
      &::after {
        content: "";
        position: absolute;
        width: 25rpx;
        height: 25rpx;
        background: $u-bg-color;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        transform: translate(50%, 50%);
      }
      &-container {
        padding-bottom: 17rpx;
      }
      &-title {
        color: #1f1f1f;
        font-weight: 600;
        margin-bottom: 10rpx;
      }
      &-money {
        height: 98rpx;
        font-size: 30rpx;
        color: #333333;
        line-height: 98rpx;
        .money-rad {
          font-size: 36rpx;
          font-weight: 600;
          color: #ff0000;
        }
        .money-unit {
          color: #ff0000;
          font-size: 22rpx;
          vertical-align: bottom;
          margin-left: 6rpx;
        }
      }
      .icon-container {
        display: flex;
        .icon {
          padding: 6rpx 10rpx;
          background: #18b566;
          border-radius: 4rpx;
          color: #fff;
          font-size: 24rpx;
          &.warning {
            background: #fcd639;
          }
          &.total {
            background: #b29ff3;
          }
        }
        .icon + .icon {
          margin-left: 10rpx;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 24rpx 39rpx 24rpx 17rpx;
      font-size: 25rpx;
      color: #999999;
      .code {
        color: #333333;
        font-size: 30rpx;
      }
    }
    & + & {
      margin-top: 10rpx;
    }
  }
  &-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90rpx;
    box-sizing: content-box;
    padding-top: 10rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    z-index: 10;
    background: #fff;
  }
}
.form-content {
  padding: 40rpx 30rpx 110rpx;
}
.margin-20 {
  margin-top: 20rpx;
}
.form-upload {
  padding: 10rpx 12rpx;
}
</style>
