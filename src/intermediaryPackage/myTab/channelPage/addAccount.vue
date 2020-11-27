<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 17:13:50
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-27 17:30:50
-->
<template>
  <view class="add-account-wrapper">
    <view class="form">
      <u-form :model="addForm" ref="addForm" :label-width="160">
        <u-form-item label="账户名称">
          <u-input
            v-model="addForm.accountName"
            placeholder="账户名称" :clearable="false" input-align="right" />
        </u-form-item>
        <u-form-item label="开户银行" right-icon="arrow-right" class="hide-icon">
          <u-input
            @click="showBank = true"
            v-model="addForm.accountBank" type="select"
            placeholder="开户银行" disabled :clearable="false" input-align="right" />
        </u-form-item>
        <u-form-item label="银行卡号">
          <u-input
            v-model="addForm.accountCode"
            placeholder="银行卡号" :clearable="false" input-align="right"/>
        </u-form-item>
      </u-form>
    </view>
    <view class="btn">
      <u-button type="primary" @click="handleSave">保存</u-button>
    </view>
    <u-popup v-model="showBank" mode="right" length="100%">
      <view class="add-bank-list-wrapper">
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
      addForm: {
        accountName: '',
        accountBank: '',
        accountCode: ''
      },
      showBank: false,
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
    // 保存
    handleSave() {
      uni.redirectTo({
        url: `/intermediaryPackage/myTab/channelPage/commissionAccount`
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .add-account-wrapper {
    width: 100%;
    height: 100vh;
    background-color: #F5F5F5;

    .form {
      background-color: #FFFFFF;
      padding: 20rpx;
    }

    .btn {
      width: 100%;
      padding: 10rpx 50rpx;
      margin-top: 20rpx;
    }
  }

  .add-bank-list-wrapper {
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