<!--
 * @Description: 付款单详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-27 17:26:51
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-27 18:53:05
-->
<template>
  <view class="payment safe-area-inset-bottom">
    <view class="payment-info">
      <text>付款单号：CJ38135843321</text>
      <view class="status">审核中</view>
    </view>
    <view class="form-content">
      <view class="payment-form">
        <view class="form-title u-border-bottom">渠道信息</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="170"
        >
          <u-form-item label="渠道公司">
            <view class="form-color">德祐地产经纪有限公司</view>
          </u-form-item>
          <u-form-item label="收款账号">
            <view class="form-color">443134654687310012445</view>
          </u-form-item>
          <u-form-item label="发票类型">
            <view class="form-color">增值税普通发票</view>
          </u-form-item>
          <u-form-item label="发票税率">
            <view class="form-color">1%</view>
          </u-form-item>
        </u-form>
      </view>
      <view class="payment-title">结算佣金付款明细</view>
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
          <view class="top-money">
            <text>扣除总额：</text>
            <text class="money-rad">40.00</text>
            <text class="money-unit">元</text>
          </view>
          <view class="top-money">
            <text>实结总额：</text>
            <text class="money-rad">560.00</text>
            <text class="money-unit">元</text>
          </view>
          <!-- <view class="top-border"></view> -->
        </view>
        <view class="bottom u-border-bottom">
          <view>
            <view class="code">成交报告编号：DF836372822</view>
            <view>本单佣金：200.00</view>
            <view>本单应扣：20.00</view>
            <view>本单实结：180.00</view>
            <view class="status">扣款原因：客户退房抵扣</view>
          </view>
          <view>详情
            <u-icon
              name="arrow-right"
              size="28"
            ></u-icon>
          </view>
        </view>
        <view class="bottom u-border-bottom">
          <view>
            <view class="code">成交报告编号：DF836372822</view>
            <view>本单佣金：200.00</view>
            <view>本单应扣：20.00</view>
            <view>本单实结：180.00</view>
            <view class="status">扣款原因：客户退房抵扣</view>
          </view>
          <view>详情
            <u-icon
              name="arrow-right"
              size="28"
            ></u-icon>
          </view>
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
          <view class="top-money">
            <text>扣除总额：</text>
            <text class="money-rad">40.00</text>
            <text class="money-unit">元</text>
          </view>
          <view class="top-money">
            <text>实结总额：</text>
            <text class="money-rad">560.00</text>
            <text class="money-unit">元</text>
          </view>
        </view>
        <view class="bottom u-border-bottom">
          <view>
            <view class="code">成交报告编号：DF836372822</view>
            <view>本单佣金：200.00</view>
            <view>本单应扣：20.00</view>
            <view>本单实结：180.00</view>
            <view class="status">扣款原因：客户退房抵扣</view>
          </view>
          <view>详情
            <u-icon
              name="arrow-right"
              size="28"
            ></u-icon>
          </view>
        </view>
        <view class="bottom u-border-bottom">
          <view>
            <view class="code">成交报告编号：DF836372822</view>
            <view>本单佣金：200.00</view>
            <view>本单应扣：20.00</view>
            <view>本单实结：180.00</view>
            <view class="status">扣款原因：客户退房抵扣</view>
          </view>
          <view>详情
            <u-icon
              name="arrow-right"
              size="28"
            ></u-icon>
          </view>
        </view>
      </view>
      <view class="payment-form margin-20">
        <view class="form-title u-border-bottom">佣金结算</view>
        <u-form
          ref="uForm"
          label-width="200"
        >
          <u-form-item label="本单佣金">800.00</u-form-item>
          <u-form-item label="本单扣除">780.00</u-form-item>
          <u-form-item label="本单实结">20.00</u-form-item>
          <u-form-item label="不含税金额">20.00</u-form-item>
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
          <u-form-item label="申请说明">备注说明</u-form-item>
        </u-form>
      </view>
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
    // .form-color {
    //   color: #ccc;
    // }
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
  &-info {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80rpx;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    .status {
      padding: 6rpx 10rpx;
      color: #fff;
      background: #fcd639;
      margin-left: 20rpx;
      border-radius: 4rpx;
      font-size: 24rpx;
    }
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
        font-size: 30rpx;
        color: #333333;
        line-height: 60rpx;
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
      // .top-border {
      //   border-bottom-width: 1px;
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      //   pointer-events: none;
      //   box-sizing: border-box;
      //   transform: scale(0.5, 0.5);
      //   border: 0 dotted #e4e7ed;
      //   transform-origin: 0 0;
      //   width: 199.8%;
      //   height: 199.7%;
      //   z-index: 2;
      // }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24rpx 39rpx 24rpx 17rpx;
      font-size: 25rpx;
      color: #999999;
      .code {
        color: #333333;
        font-size: 30rpx;
      }
      .status {
        color: $u-type-error;
      }
    }
    & + & {
      margin-top: 10rpx;
    }
  }
}
.form-content {
  padding: 110rpx 30rpx 10rpx;
}
.margin-20 {
  margin-top: 20rpx;
}
.form-upload {
  padding: 10rpx 12rpx;
}
</style>
