<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 08:14:50
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-27 08:42:20
-->
<template>
  <view class="deal-details-wrapper">
    <view class="form-wrapper">
      <view class="title">客户信息</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="张小刚" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.account"
              placeholder="张小刚" disabled :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">房产信息</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="楼盘名称" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.account"
              placeholder="楼盘名称" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="物业类型" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.invoiceType"
              placeholder="物业类型" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="栋座" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.invoiceTaxRate"
              placeholder="栋座" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="房号" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.invoiceTaxRate"
              placeholder="房号" disabled :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">结佣信息</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="可结佣金" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.estateName"
              placeholder="可结佣金" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="已结佣金" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.roof"
              placeholder="已结佣金" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="未结佣金" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.room"
              placeholder="未结佣金" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="在结佣金" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.room"
              placeholder="在结佣金" disabled :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">结佣记录</view>
      <view class="form u-padding-0">
        <view class="record-list" v-for="item in [2,3,4,5,6]" :key="item">
          <view class="record-code">
            <view class="code">JY013246683</view>
            <view class="price">结佣金额：500.00</view>
          </view>
          <view class="record-time">2020-10-08 12:15:30</view>
        </view>
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
      }
    };
  },
  onLoad() {},
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .deal-details-wrapper {
    width: 100%;
    background-color: #F5F5F5;

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

        .record-list {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 20rpx 30rpx;
          border-bottom: 1rpx solid #E4E4E4;

          .record-code {
            display: flex;
            flex-direction: column;

            view {
              padding: 5rpx 0rpx;
            }

            .code {
              color: rgb(41, 121, 255);
              text-decoration: underline;
            }

            .price {
              color: #999999;
            }
          }
        }
      }
    }
  }
</style>