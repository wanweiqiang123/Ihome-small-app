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
            v-model="baseForm.companyName"
            placeholder="请输入公司名称" :clearable="true" />
        </u-form-item>
        <u-form-item label="信用代码" required prop="creditCode">
          <u-input
            v-model="baseForm.creditCode"
            placeholder="请输入信用代码" :clearable="true" />
        </u-form-item>
        <u-form-item label="姓名" required prop="username">
          <u-input
            v-model="baseForm.username"
            placeholder="请输入您的姓名" :clearable="true" />
        </u-form-item>
        <u-form-item label="手机号码" required prop="mobile">
          <u-input
            v-model="baseForm.mobile"
            placeholder="请输入您的手机号码" :clearable="true" />
        </u-form-item>
        <u-form-item label="身份证号码" required prop="identityCode">
          <u-input
            v-model="baseForm.identityCode"
            placeholder="请输入您的身份证号码" :clearable="true" />
        </u-form-item>
        <u-form-item label="密码" required prop="password">
          <u-input
            v-model="baseForm.password"
            type="password"
            placeholder="请设置您的初始登录密码" :clearable="true" />
        </u-form-item>
        <u-form-item label="确认密码" required prop="rePassword">
          <u-input
            v-model="baseForm.rePassword"
            type="password"
            placeholder="请再次确认您的登录密码" :clearable="true" />
        </u-form-item>
        <u-form-item label="邀请码" required prop="invitationCode">
          <u-input
            :disabled="!!qrCode"
            v-model="baseForm.invitationCode"
            placeholder="请联系对接人获取并输入" :clearable="true" />
        </u-form-item>
        <u-form-item label="邮箱" prop="email">
          <u-input
            v-model="baseForm.email"
            placeholder="请输入您的邮箱" :clearable="true" />
        </u-form-item>
        <u-form-item label="短信验证码" required prop="verifyCode">
          <view class="input-btn-flex">
            <u-input
              v-model="baseForm.verifyCode"
              placeholder="请输入短信验证码" :clearable="true" />
            <u-button class="u-margin-left-8" type="success" size="mini" @click="sendMessage">{{codeBtn}}</u-button>
          </view>
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
      const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$/;
      if (!value) {
        callback(new Error('请输入确认密码'));
        return;
      } else {
        if (!reg.test(value)) {
          callback(new Error('密码必须是数字、大写字母、小写字母、符号4类中包含3类且长度不能少于8位。'));
          return;
        } else {
          if (this.baseForm.password !== value) {
            callback(new Error('两次输入的密码不一致'));
            return;
          }
          callback();
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
        password: '',
        rePassword: '',
        invitationCode: '',
        email: '',
        verifyCode: ''
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
        password: [
          { validator: validPassword, trigger: ['blur'] }
        ],
        rePassword: [
          { validator: validConfirmPassword, trigger: ['blur'] }
        ],
        invitationCode: [
          { required: true, message: '请输入邀请码', trigger: ['blur'] }
        ],
        email: [
          { validator: emailOrNullValidato, trigger: ['blur'] }
        ],
        verifyCode: [
          { required: true, message: '请输入短信验证码', trigger: ['blur'] }
        ]
      },
      codeBtn: '发送验证码',
      timer: null, // 计时器
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
    // 点击发送短信
    async sendMessage() {
      let self = this;
      let validFlag = false; // 手机号是否正确
      let count = 60;  // 倒计时60秒
      validFlag = this.validPhoneBySendCode(self.baseForm.mobile);
      if (validFlag) {
        if (!self.timer) {
          uni.showToast({
            icon: 'loading',
            title: '正在获取验证码',
            duration: 50000000
          });
          let postData = {
            mobilePhone: this.baseForm.mobile,
            smsCodeType: 'RegisterAndLogin'
          }
          const res = await getMessage(postData);
          if (res) {
            uni.showToast({
              title: res,
              icon: "none",
              duration: 3000,
            });
          } else {
            uni.showToast({
              icon: 'none',
              title: '验证码已发送'
            });
          }
          self.timer = setInterval(() => {
            if (count > 0 && count <= 60) {
              self.codeBtn = `${count}后重新获取`;
              count--;
            } else {
              self.timer = null;
              self.codeBtn = '重新获取';
              clearInterval(self.timer);
            }
          }, 1000);
        } else {
          uni.showToast({
            icon: 'none',
            title: '倒计时结束后再获取'
          });
        }
      }
    },
    // 发送验证码前校验
    validPhoneBySendCode(phone = '') {
      const Reg = /^[1][3-9]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/;
      if (phone) {
        if (!(Reg.test(phone))) {
          uni.showToast({
            icon: 'none',
            title: '请输入有效手机号码!'
          });
          return false;
        } else {
          return true;
        }
      } else {
        uni.showToast({
          icon: 'none',
          title: '请输入手机号!'
        });
        return false;
      }
    },
    // 下载授权确认函模板
    downTemplate() {
      let self = this;
      uni.downloadFile({
        url: self.fileUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('下载成功');
            uni.showToast({
              icon: 'success',
              title: '下载成功',
            });
            // 预览下载的文件
            uni.openDocument({
              filePath: res.tempFilePath,
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