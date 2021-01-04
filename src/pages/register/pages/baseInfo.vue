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
            v-model="baseForm.mobile"
            placeholder="请输入您的手机号码" :clearable="true" />
        </u-form-item>
        <u-form-item label="身份证号码" required prop="identityCode">
          <u-input
            maxlength="18"
            v-model="baseForm.identityCode"
            placeholder="请输入您的身份证号码" :clearable="true" />
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
import { getMessage } from '@/api/channel';
import { phoneValidator, validIdentityCard, emailOrNullValidato } from '@/common/validate';
import { currentEnvConfig } from '@/env-config';
import {getSessionUserSendSmsApi} from "@/api";

export default {
  props: {
    qrCode: {
      type: String,
      default: () => "",
    }
  },
  data() {
    const validPassword = (rule, value, callback) => {
      // const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z_]+$)(?![a-z0-9]+$)(?![a-z_]+$)(?![0-9_]+$)[a-zA-Z0-9_]{8,}$/;
      // const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$/;
      // const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W@#$%^&.]+$)(?![a-z0-9]+$)(?![a-z\W@#$%^&.]+$)(?![0-9\W@#$%^&.]+$)[a-zA-Z0-9\W@#$%^&.]{8,}$/;
      let rC = {
        lW:'[a-z]', // 小写字母
        uW:'[A-Z]', // 大写字母
        nW:'[0-9]', // 数字
        sW:'[@#$%^&.]'// 特殊字符
      };
      function Reg(str, rStr){
        let reg = new RegExp(rStr);
        if(reg.test(str)) return true;
        else return false;
      }
      if (!value) {
        callback(new Error('请输入密码'));
        return;
      } else {
        if(value.length < 8){
          callback(new Error('请至少输入8位及以上密码'));
          return;
        }else{
          let tR = {
            l: Reg(value, rC.lW),
            u: Reg(value, rC.uW),
            n: Reg(value, rC.nW),
            s: Reg(value, rC.sW)
          };
          if((tR.l && tR.u && tR.n) || (tR.l && tR.u && tR.s) || (tR.s && tR.u && tR.n) ||                                     (tR.s && tR.l && tR.n)){
            // 密码符合要求
            callback();
          }else{
            callback(new Error('密码必须是数字、大写字母、小写字母、符号4类中包含3类且长度不能少于8位。'));
            return;
          }
        }
        // if (!reg.test(value)) {
        //   callback(new Error('密码必须是数字、大写字母、小写字母、符号4类中包含3类且长度不能少于8位。'));
        //   return;
        // } else {
        //   callback();
        // }
      }
    }
    const validConfirmPassword = (rule, value, callback) => {
      if (!this.baseForm.password) {
        callback(new Error('请先输入密码'));
        return;
      }
      // const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$/;
      let rC = {
        lW:'[a-z]', // 小写字母
        uW:'[A-Z]', // 大写字母
        nW:'[0-9]', // 数字
        sW:'[@#$%^&.]'// 特殊字符
      };
      function Reg(str, rStr){
        let reg = new RegExp(rStr);
        if(reg.test(str)) return true;
        else return false;
      }
      if (!value) {
        callback(new Error('请输入确认密码'));
        return;
      } else {
        // if (!reg.test(value)) {
        //   callback(new Error('密码必须是数字、大写字母、小写字母、符号4类中包含3类且长度不能少于8位。'));
        //   return;
        // } else {
        //   if (this.baseForm.password !== value) {
        //     callback(new Error('两次输入的密码不一致'));
        //     return;
        //   }
        //   callback();
        // }
        if(value.length < 8){
          callback(new Error('请至少输入8位及以上密码'));
          return;
        }else{
          if (this.baseForm.password !== value) {
            callback(new Error('两次输入的密码不一致'));
            return;
          }
          let tR = {
            l: Reg(value, rC.lW),
            u: Reg(value, rC.uW),
            n: Reg(value, rC.nW),
            s: Reg(value, rC.sW)
          };
          if((tR.l && tR.u && tR.n) || (tR.l && tR.u && tR.s) || (tR.s && tR.u && tR.n) ||                                     (tR.s && tR.l && tR.n)){
            // 密码符合要求
            callback();
          }else{
            callback(new Error('密码必须是数字、大写字母、小写字母、符号4类中包含3类且长度不能少于8位。'));
            return;
          }
        }
      }
    }
    return {
      baseForm: {
        companyName: '',
        creditCode: '',
        username: '',
        mobile: '',
        identityCode: '',
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
        email: [
          { validator: emailOrNullValidato, trigger: ['blur'] }
        ]
      },
      fileUrl: `${currentEnvConfig['protocol']}://${currentEnvConfig['apiDomain']}/sales-api/sales-document-cover/static/channel/模版-委托书.docx`
    };
  },
  onReady() {
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    this.$refs.baseForm.setRules(this.rules);
    console.log('qrCode - onReady', this.qrCode);
    if (this.qrCode) {
      this.baseForm.invitationCode = this.qrCode;
    }
    let sysInfo = uni.getSystemInfoSync();
    console.log(sysInfo);
  },
  methods: {
    // 下一步
    nextStep() {
      this.$refs.baseForm.validate(valid => {
        if (valid) {
          console.log('验证通过');
          this.$emit('next', this.baseForm);
        } else {
          console.log('验证失败');
        }
      });
    },
    // 下载授权确认函模板
    downTemplate() {
      let self = this;
      uni.downloadFile({
        url: self.fileUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('下载成功');
            uni.openDocument({
              filePath: res.tempFilePath,
              showMenu: true,
              success: (res) => {
                console.log('打开文档成功');
              }
            });
          }
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