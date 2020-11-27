<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-26 17:14:10
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-26 17:33:10
-->
<template>
  <view class="commission-details-wrapper">
    <view class="code-wrapper">
      <view class="u-margin-right-15">结佣单号：CJ38135843321</view>
      <view>
        <u-button type="warning" size="mini">审核中</u-button>
      </view>
    </view>
    <view class="initiate-title">
      <view class="title">结算佣金明细</view>
    </view>
    <view class="commission-item-wrapper" v-for="item in [1,2]" :key="item">
      <view class="item-project-name u-padding-15">
        <view>爱特城(20200101~20200130)</view>
        <view class="price-list">
          <view>结佣总额：600.00</view>
          <view>扣除总额：40.00</view>
          <view>实结总额：360.00</view>
        </view>
      </view>
      <view class="item-code-list u-padding-15" v-for="list in [1,2,3,4]" :key="list" @click="viewDealDetail">
        <view class="list-left">
          <view>成交报告编号：CJ138979352876</view>
          <view class="price">
            <view>本单佣金200.00</view>
            <view>本单应扣200.00</view>
            <view>本单实结200.00</view>
          </view>
          <view class="reason">扣款原因：客户退房抵扣</view>
        </view>
        <view class="detail-color">详情</view>
        <view>
          <u-icon name="arrow-right" color="#999999" size="29"></u-icon>
        </view>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">收款信息</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="收款帐号" right-icon="arrow-right" class="hide-icon">
            <u-input
              v-model="paymentForm.account" type="select"
              placeholder="收款帐号" :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="发票类型" right-icon="arrow-right" class="hide-icon">
            <u-input
              v-model="paymentForm.invoiceType" type="select"
              placeholder="发票类型" :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="发票税率" right-icon="arrow-right" class="hide-icon">
            <u-input
              v-model="paymentForm.invoiceTaxRate" type="select"
              placeholder="发票税率" :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">佣金结算</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="本单佣金" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.estateName"
              placeholder="本单佣金" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="不含税金额" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.roof"
              placeholder="不含税金额" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="税额" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.room"
              placeholder="税额" disabled :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">附件信息</view>
      <view class="form-img">
        <view class="img-item">
          <view class="img-upload">
            <u-upload :action="action" :file-list="fileList" ></u-upload>
          </view>
          <view class="img-type">发票</view>
        </view>
        <view class="img-item">
          <view class="img-upload">
            <u-upload :action="action" :file-list="fileList" ></u-upload>
          </view>
          <view class="img-type">请款单</view>
        </view>
        <view class="img-item">
          <view class="img-upload">
            <u-upload :action="action" :file-list="fileList" ></u-upload>
          </view>
          <view class="img-type">结算明细</view>
        </view>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">说明</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="申请说明" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.estateName"
              placeholder="申请说明" :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      paymentForm: {
        account: '',
        invoiceType: '',
        invoiceTaxRate: ''
      },
      action: 'http://www.example.com/upload',
      fileList: []
    };
  },
  onLoad() {},
  methods: {
    // 查看结佣成交详情
    viewDealDetail() {
      uni.navigateTo({
        url: `/intermediaryPackage/myTab/pages/dealDetails?type=commission`
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .commission-details-wrapper {
    width: 100%;
    background-color: #F5F5F5;

    .code-wrapper {
      width: 100%;
      height: 80rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 20rpx;
      background-color: #FFFFFF;
    }

    .initiate-title {
      width: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 30rpx;

      .title {
        flex: 1;
      }
    }

    .commission-item-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 15rpx 15rpx 0rpx 15rpx;

      .item-project-name {
        width: 100%;
        box-sizing: border-box;
        color: #FFFFFF;
        background-color: #02A7F0;

        view {
          padding: 10rpx;
          font-weight: 600;
        }

        .price-list {
          display: flex;
          flex-direction: row;
          align-items: center;

          view {
            flex: 1;
          }
        }
      }

      .item-code-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #FFFFFF;

        &:not(:last-child) {
          border-bottom: 1rpx solid #CCCCCC;
        }

        .list-left {
          flex: 1;

          view {
            padding: 10rpx;
          }

          .price {
            color: #999999;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            view {
              flex: 1;
            }
          }

          .reason {
            color: #D9001B;
          }
        }

        .detail-color {
          color: #999999;
        }
      }
    }

    .form-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 30rpx 0rpx 30rpx;

      .form {
        background-color: #FFFFFF;
        border: 1rpx solid #E4E4E4;
        box-sizing: border-box;
        padding: 0rpx 30rpx;
        margin: 20rpx 0rpx;
      }

      .form-img {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .img-item {
          width: 30%;
          display: flex;
          flex-direction: column;

          .img-upload,.img-type {
            flex: 1;
          }

          .img-type {
            height: 65rpx;
            line-height: 65rpx;
            background-color: #FFFFFF;
            text-align: center;
          }
        }
      }
    }
  }
</style>