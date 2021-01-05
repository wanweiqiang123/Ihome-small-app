<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-30 17:20:45
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-05 16:56:58
-->
<template>
  <view class="base-info-wrapper">
    <view class="imageInfo">
      <u-icon
        name="photo"
        size="100"
      ></u-icon>
      <view>完成身份验证，可核对真实身份，</view>
      <view>保障合法权益</view>
    </view>
    <view class="form">
      <u-field
        label-width="150"
        v-model="info.ownerName"
        label="姓名"
        disabled
      >
      </u-field>
      <u-field
        label-width="150"
        v-model="info.ownerCertificateNo"
        label="身份证号码"
        disabled
      >
      </u-field>
      <u-field
        label-width="150"
        v-model="info.ownerMobile"
        label="手机号码"
        disabled
      >
      </u-field>
      <u-field
        label-width="150"
        v-model="info.verificationCode"
        label="验证码"
        placeholder="请填写验证码"
      >
        <u-button
          size="mini"
          slot="right"
          type="success"
          @click="getCode"
        >{{codeText}}</u-button>
      </u-field>
      <u-verification-code
        ref="uCode"
        @change="codeChange"
      ></u-verification-code>
    </view>
    <view class="buttons">
      <u-button
        type="primary"
        @click="gotoAttestation"
      >实名认证</u-button>
    </view>
  </view>
</template>
<script>
import { postVerificationApi, postCertificationApi } from "../../api/customer";
export default {
  data() {
    return {
      info: {
        ownerName: "",
        ownerMobile: "",
        ownerCertificateNo: "",
        verificationCode: "",
        noticeId: "",
        templateId: "",
      },
      codeText: "",
    };
  },
  onShow() {
    this.info = { ...getApp().globalData.attestationInfo };
  },
  methods: {
    codeChange(text) {
      this.codeText = text;
    },
    async getCode() {
      if (this.$refs.uCode.canGetCode) {
        let postData = { ...this.info };
        delete postData.templateId;
        delete postData.verificationCode;
        await postVerificationApi(postData);
        uni.showLoading({
          title: "正在获取验证码",
        });
        setTimeout(() => {
          uni.hideLoading();
          this.$refs.uCode.start();
        }, 1000);
      } else {
        this.$u.toast("倒计时结束后再发送");
      }
    },
    async gotoAttestation() {
      let obj = {};
      obj = { ...this.info };
      delete obj.templateId;
      await postCertificationApi(obj);
      uni.navigateTo({
        url: `/customerPackage/notification/index?templateId=${this.info.templateId}&&id=${this.info.noticeId}&&type=sign`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #f1f1f1;
  position: relative;

  .form {
    width: 100%;
    box-sizing: border-box;
    padding: 0rpx 10rpx;
    background-color: #ffffff;

    .input-btn-flex {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
  .imageInfo {
    width: 100%;
    height: 250rpx;
    background-color: #a0cfff32;
    font-size: 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .buttons {
    width: 80%;
    position: absolute;
    margin-top: 50rpx;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>