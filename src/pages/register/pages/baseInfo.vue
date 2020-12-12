<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-12 10:50:30
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-12 15:04:30
-->
<template>
  <view class="base-info-wrapper">
    <view class="form">
      <u-form :model="baseForm" ref="baseForm" :label-width="170">
        <u-form-item label="公司名称" required>
          <u-input
            v-model="baseForm.companyName"
            placeholder="请输入公司名称" :clearable="true" />
        </u-form-item>
        <u-form-item label="信用代码" required>
          <u-input
            v-model="baseForm.creditCode"
            placeholder="请输入信用代码" :clearable="true" />
        </u-form-item>
        <u-form-item label="姓名" required>
          <u-input
            v-model="baseForm.name"
            placeholder="请输入您的姓名" :clearable="true" />
        </u-form-item>
        <u-form-item label="手机号码" required>
          <u-input
            v-model="baseForm.phone"
            placeholder="请输入您的手机号码" :clearable="true" />
        </u-form-item>
        <u-form-item label="密码" required>
          <u-input
            v-model="baseForm.password"
            placeholder="请设置您的初始登录密码" :clearable="true" />
        </u-form-item>
        <u-form-item label="确认密码" required>
          <u-input
            v-model="baseForm.confirmPassword"
            placeholder="请再次确认您的登录密码" :clearable="true" />
        </u-form-item>
        <u-form-item label="邀请码" required>
          <u-input
            v-model="baseForm.invitationCode"
            placeholder="请联系对接人获取并输入" :clearable="true" />
        </u-form-item>
        <u-form-item label="邮箱">
          <u-input
            v-model="baseForm.email"
            placeholder="请输入您的邮箱" :clearable="true" />
        </u-form-item>
        <u-form-item label="短信验证码" required>
          <view class="input-btn-flex">
            <u-input
              v-model="baseForm.verificationCode"
              placeholder="4位数验证码" :clearable="true" />
            <u-button type="success" size="mini">发送验证码</u-button>
          </view>
        </u-form-item>
      </u-form>
    </view>
    <view class="down-load">下载授权确认函模板</view>
    <view class="tips">注册信息需与签约授权确认函保持一致</view>
    <view class="btn">
      <u-button type="primary" @click="nextStep">下一步</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      baseForm: {
        companyName: null,
        creditCode: null,
        name: null,
        phone: null,
        password: null,
        confirmPassword: null,
        invitationCode: null,
        email: null,
        verificationCode: null
      }
    };
  },

  onLoad() {

  },
  methods: {
    nextStep() {
      this.$emit('next');
    }
  },
};
</script>

<style lang="scss" scoped>
  .base-info-wrapper {
    width: 100%;
    background-color: #FFFFFF;

    .form {
      width: 100%;
      box-sizing: border-box;
      padding: 0rpx 10rpx;

      .input-btn-flex {
        display: flex;
        flex-direction: row;
        align-items: center;

        /deep/.u-btn {
          margin-left: 10rpx !important;
        }
      }
    }

    .down-load {
      width: 100%;
      font-size: 30rpx;
      font-weight: 500;
      text-align: right;
      padding: 30rpx;
      color: $u-type-primary;
      text-decoration: underline;
    }

    .tips {
      width: 100%;
      font-size: 28rpx;
      font-weight: 500;
      text-align: center;
      margin: 10rpx 0rpx;
      color: $uni-color-error;
    }

    .btn {
      box-sizing: border-box;
      margin: 30rpx 0rpx;
      /deep/.u-size-default {
        height: 92rpx !important;
        line-height: 92rpx !important;
      }
    }
  }
  </style>