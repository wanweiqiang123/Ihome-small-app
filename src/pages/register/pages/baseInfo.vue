<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-12 10:50:30
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-20 17:34:20
-->
<template>
  <view class="base-info-wrapper">
    <view class="form">
      <u-form :model="baseForm" ref="baseForm" :label-width="170">
        <u-form-item label="公司名称" required prop="companyName">
          <u-input
            maxlength="64"
            v-model="baseForm.companyName"
            placeholder="请输入公司名称" :clearable="true" />
        </u-form-item>
        <u-form-item label="信用代码" required prop="creditCode">
          <u-input
            maxlength="18"
            v-model="baseForm.creditCode"
            placeholder="请输入信用代码" :clearable="true" />
        </u-form-item>
        <u-form-item label="姓名" required prop="username">
          <u-input
            maxlength="32"
            v-model="baseForm.username"
            placeholder="请输入您的姓名" :clearable="true" />
        </u-form-item>
        <u-form-item label="手机号码" required prop="mobile">
          <u-input
            maxlength="16"
            type="number"
            :disabled="!!userInfo.mobilePhone"
            v-model="baseForm.mobile"
            placeholder="请输入您的手机号码" :clearable="true" />
        </u-form-item>
        <u-form-item label="身份证号码" required prop="identityCode">
          <u-input
            maxlength="18"
            v-model="baseForm.identityCode"
            placeholder="请输入您的身份证号码" :clearable="true" />
        </u-form-item>
        <u-form-item label="邀请码" required prop="invitationCode">
          <u-input
            type="number"
            maxlength="8"
            :disabled="!!qrCode"
            v-model="baseForm.invitationCode"
            placeholder="请联系对接人获取并输入" :clearable="true" />
        </u-form-item>
        <u-form-item label="邮箱" prop="email">
          <u-input
            maxlength="64"
            v-model="baseForm.email"
            placeholder="请输入您的邮箱" :clearable="true" />
        </u-form-item>
      </u-form>
    </view>
    <view class="down-load" >
      <text @click="downTemplate">下载授权确认函模板</text>
    </view>
    <view class="tips">注册信息需与签约授权确认函保持一致</view>
    <view class="btn">
      <u-button type="primary" @click="nextStep">下一步</u-button>
    </view>
  </view>
</template>

<script>
import { phoneValidator, validIdentityCard, emailOrNullValidato } from '@/common/validate';
import storageTool from "@/common/storageTool";
import tool from "@/common/tool";

export default {
  props: {
    qrCode: {
      type: String,
      default: () => "",
    }
  },
  data() {
    return {
      userInfo: null,
      baseForm: {
        companyName: '',
        creditCode: '',
        username: '',
        mobile: '',
        identityCode: '',
        invitationCode: '',
        email: '',
      },
      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: ['blur'] }
        ],
        creditCode: [
          { required: true, message: '请输入信用代码', trigger: ['blur'] }
        ],
        username: [
          { required: true, message: '请输入您的姓名', trigger: ['blur'] }
        ],
        mobile: [
          { validator: phoneValidator, trigger: ['blur'] }
        ],
        identityCode: [
          { validator: validIdentityCard, trigger: ['blur'] }
        ],
        invitationCode: [
          { required: true, message: '请输入邀请码', trigger: ['blur'] }
        ],
        email: [
          { validator: emailOrNullValidato, trigger: ['blur'] }
        ]
      }
    };
  },
  onReady() {
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    this.$refs.baseForm.setRules(this.rules);
    // console.log('qrCode - onReady', this.qrCode);
    if (this.qrCode) {
      this.baseForm.invitationCode = this.qrCode;
    }
    this.userInfo = storageTool.getUserInfo();
    this.baseForm.mobile = this.userInfo.mobilePhone;
  },
  methods: {
    // 下一步
    nextStep() {
      this.$refs.baseForm.validate(valid => {
        if (valid) {
          console.log('验证通过');
          this.$emit('next', this.baseForm, true);
        } else {
          console.log('验证失败');
        }
      });
    },
    // 下载授权确认函模板
    downTemplate() {
      let filePath = wx.env.USER_DATA_PATH + "/" + "广州居恒销售系统授权确认函.docx"
      uni.downloadFile({
        url: tool.getTemplateDocUrl(),
        filePath: filePath,
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('下载成功');
            uni.openDocument({
              filePath: filePath,
              showMenu: true,
              success: (res) => {
                console.log('打开文档成功');
              },
              fail: (err) => {
                console.log('打开文档出错', err);
                uni.showToast({
                  title: '无法打开该文档',
                  duration: 3000
                });
              }
            });
          }
        },
        fail: (err) => {
          console.log('下载出错', err);
          uni.showToast({
            title: '下载出错',
            duration: 3000
          });
        }
      });
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
        justify-content: center;
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