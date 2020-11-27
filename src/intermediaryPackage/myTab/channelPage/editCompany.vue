<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 15:36:22
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-27 16:36:22
-->
<template>
  <view class="edit-company-wrapper">
    <view class="form">
      <u-form :model="paymentForm" ref="paymentForm" :label-width="210">
        <u-form-item label="公司简称">
          <u-input
            v-model="paymentForm.account"
            placeholder="公司简称" :clearable="false" input-align="right" />
        </u-form-item>
        <u-form-item label="公司类型">
          <u-input
            v-model="paymentForm.account"
            placeholder="公司类型" :clearable="false" input-align="right" />
        </u-form-item>
        <u-form-item label="法定代表人">
          <u-input
            v-model="paymentForm.account"
            placeholder="法定代表人" :clearable="false" input-align="right"/>
        </u-form-item>
        <u-form-item label="法人身份证号码">
          <u-input
            v-model="paymentForm.account"
            placeholder="法人身份证号码" :clearable="false" input-align="right"/>
        </u-form-item>
        <u-form-item label="成立日期" right-icon="arrow-right" class="hide-icon">
          <u-input
            @click="showTime = true"
            v-model="paymentForm.account" type="select"
            placeholder="成立日期" disabled :clearable="false" input-align="right" />
        </u-form-item>
        <u-form-item label="注册资本">
          <u-input
            v-model="paymentForm.account"
            placeholder="注册资本" :clearable="false" input-align="right"/>
        </u-form-item>
        <u-form-item label="营业期限">
          <u-input
            v-model="paymentForm.account"
            placeholder="营业期限" :clearable="false" input-align="right"/>
        </u-form-item>
        <u-form-item label="地区" right-icon="arrow-right" class="hide-icon">
          <u-input
            @click="showRegion = true"
            v-model="paymentForm.account" type="select"
            placeholder="地区" disabled :clearable="false" input-align="right" />
        </u-form-item>
        <u-form-item label="住所">
          <u-input
            v-model="paymentForm.account"
            placeholder="住所" :clearable="false" input-align="right"/>
        </u-form-item>
      </u-form>
      <view class="company-annex-wrapper u-margin-top-20">
        <view class="title">公司附件</view>
        <view class="annex-list-wrapper" v-for="(item, index) in annexList" :key="index">
          <view class="type">{{item.type}}</view>
          <view v-for="(imgItem, imgIndex) in item.imgUrl" :key="imgIndex" class="img">
            <u-image width="100rpx" height="100rpx" :src="imgItem"></u-image>
          </view>
          <view>
            <u-upload
              width="100rpx"
              height="100rpx"
              :action="action" :file-list="fileList" ></u-upload>
          </view>
        </view>
      </view>
      <view class="company-annex-wrapper u-margin-top-20">
        <view class="title">基本存款信息</view>
        <u-form :model="paymentForm" ref="paymentForm" :label-width="210">
          <u-form-item label="账户名称">
            <u-input
              v-model="paymentForm.account"
              placeholder="账户名称" :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="开户银行" right-icon="arrow-right" class="hide-icon">
            <u-input
              @click="showBank = true"
              v-model="paymentForm.account" type="select"
              placeholder="开户银行" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="银行卡号">
            <u-input
              v-model="paymentForm.account"
              placeholder="银行卡号" :clearable="false" input-align="right"/>
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="btn">
      <u-button type="primary">保存</u-button>
    </view>
    <u-picker v-model="showTime" mode="time"></u-picker>
    <u-picker v-model="showRegion" mode="region"></u-picker>
    <u-popup v-model="showBank" mode="right" length="100%">
      <view class="bank-list-wrapper">
        <view class="top-wrapper">
          <u-search
            class="search"
            shape="round"
            bg-color="#FFFFFF"
            border-color="#FFFFFF"
            :show-action="false"
            placeholder="请输入开户银行名搜索"
            v-model="queryPageParameters.bankName"></u-search>
        </view>
        <view
          class="bank-item"
          v-for="(item, index) in bankList" :key="index"
          @click="showBank = false">{{item.name}}</view>
      </view>
    </u-popup>
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
      showTime: false,
      showRegion: false,
      showBank: false,
      annexList: [
        {
          type: '营业执照',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg']
        },
        {
          type: '开户许可证',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg']
        },
        {
          type: '法人身份证正反面复印件',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg']
        },
        {
          type: '签约授权确认函',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg']
        },
        {
          type: '被委托人身份证复印件',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg']
        },
        {
          type: '综合查询被执行人查询结果',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg']
        }
      ],
      action: 'http://www.example.com/upload',
      fileList: [],
      queryPageParameters: {
        bankName: ''
      },
      bankList: [
        {
          name: '广东广州工商银行番禺支行'
        },
        {
          name: '广东广州工商银行番禺支行'
        },
        {
          name: '广东广州工商银行番禺支行'
        },
        {
          name: '广东广州工商银行番禺支行'
        }
      ]
    };
  },
  onLoad() {

  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .edit-company-wrapper {
    width: 100%;
    background-color: #F5F5F5;
    padding: 30rpx;

    .form {
      background-color: #FFFFFF;
    }

    .btn {
      width: 100%;
      padding: 30rpx 50rpx;
      text-align: center;
    }

    .company-annex-wrapper {
      width: 100%;

      .title {
        font-size: 32rpx;
        padding: 30rpx 0rpx;
        background-color: #F5F5F5;
      }

      .annex-list-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10rpx 20rpx;
        font-size: 22rpx;

        .type {
          flex: 1;
        }

        .img {
          margin-right: 5rpx;
        }
      }
    }
  }

  .bank-list-wrapper {
    width: 100%;

    .top-wrapper {
      width: 100%;
      //height: 72rpx;
      box-sizing: border-box;
      padding: 20rpx 20rpx;
      margin-top: 10rpx;
      display: flex;
      background-color: #EFEFF4;

      .search {
        flex: 1;
        height: 72rpx;

        /deep/ .u-content {
          height: 72rpx !important;
        }
      }
    }

    .bank-item {
      padding: 30rpx 10rpx;
      text-align: left;
      border-bottom: 1rpx solid #CCCCCC;
    }
  }
</style>