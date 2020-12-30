<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-30 10:23:11
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-30 18:36:08
-->
<template>
  <view>
    <view class="imageview">
      <image style="width: 100%;height: 100vh" mode="aspectFit" :src="src"></image>
    </view>
    <view class="sign" v-if="type === 'sign'">
      <u-button type="primary" :disabled="disabled" @click="gotoSign">{{tips}}</u-button>
    </view>
    <u-verification-code
      :seconds="10"
      @end="end"
      ref="uCode"
      unique-key="notification"
      change-text="请仔细阅读协议(x)"
      @change="codeChange"
      start-text="签署"
    ></u-verification-code>
  </view>
</template>
<script>
import { currentEnvConfig } from "../../env-config.js";
import { getPdf2PicApi } from "../../api/index";
import { postSignApi } from "../../api/customer";
export default {
  data() {
    return {
      templateId: '',
      noticeId: '',
      src: '',
      isShow: true,
      tips: '',
      disabled: true,
      type: '',
    }
  },
  onLoad(options) {
    this.templateId = options.templateId;
    this.noticeId = options.id;
    this.type = options.type;
    if (this.type === 'sign') this.$refs.uCode.start();
  },
  async onShow() {
    if (this.templateId) {
      const res = await getPdf2PicApi(this.templateId);
      this.src = `${currentEnvConfig['protocol']}://${currentEnvConfig['apiDomain']}/sales-api/sales-document-cover/file/browse/${res.fileId}`;
    }
  },
  methods: {
    end() {
      this.tips = '签署';
      this.disabled = !this.disabled;
    },
    codeChange(text) {
      this.tips = text;
    },
    async gotoSign() {
      getApp().globalData.attestationInfo = {
        ownerName: '皮小强',
        ownerMobile: '15119337612',
        ownerCertificateNo: '441424199302050553',
        noticeId: this.noticeId,
        templateId: this.templateId,
      };
      uni.navigateTo({
        url: `/customerPackage/attestation/index`,
      });
      // const res = await postSignApi({
      //   id: this.noticeId,
      // });
      // if (res.certificationStatus === 'notCertified') {
      //   getApp().globalData.attestationInfo = {
      //     ownerName: res.ownerName,
      //     ownerMobile: res.ownerMobile,
      //     ownerCertificateNo: res.ownerCertificateNo,
      //     noticeId: this.noticeId,
      //     templateId: this.templateId,
      //   };
      //   uni.navigateTo({
      //     url: `/customerPackage/attestation/index`,
      //   });
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.imageview {
  padding-bottom: 50rpx;
}

.sign {
  width: 80%;
  position: fixed;
  bottom: 40rpx;
  left: 50%;
  transform: translateX(-50%);
}
</style>