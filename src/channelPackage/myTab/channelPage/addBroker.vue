<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 19:34:30
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-27 20:11:30
-->
<template>
  <view class="add-broker-wrapper">
    <view class="form">
      <u-form :model="addForm" ref="addForm" :label-width="160">
        <u-form-item label="姓名">
          <u-input
            v-model="addForm.accountName"
            placeholder="姓名" :clearable="false" input-align="right" />
        </u-form-item>
        <u-form-item label="手机号">
          <u-input
            v-model="addForm.accountName"
            placeholder="手机号" :clearable="false" input-align="right" />
        </u-form-item>
        <u-form-item label="邮箱">
          <u-input
            v-model="addForm.accountName"
            placeholder="邮箱" :clearable="false" input-align="right" />
        </u-form-item>
        <u-form-item label="账号状态" class="u-text-right">
          <u-switch v-model="checked"></u-switch>
        </u-form-item>
        <u-form-item label="结佣权限" class="u-text-right">
          <u-switch v-model="checked"></u-switch>
        </u-form-item>
      </u-form>
    </view>
    <view class="btn">
      <u-button type="primary" @click="handleSave">保存</u-button>
    </view>
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
      checked: true,
    };
  },
  onLoad() {

  },
  methods: {
    // 保存
    handleSave() {
      uni.redirectTo({
        url: `/channelPackage/myTab/channelPage/brokerList`
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .add-broker-wrapper {
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
</style>