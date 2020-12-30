<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-30 10:23:11
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-30 14:25:18
-->
<template>
  <view>
    <view>
      <u-image width="100%" height="100vh" :src="src"></u-image>
    </view>
    <view class="sign">
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
      notificationId: '',
      src: '',
      isShow: true,
      tips: '',
      disabled: true,
    }
  },
  onLoad(options) {
    this.templateId = options.templateId;
    this.notificationId = options.id;
    this.$refs.uCode.start();
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
      const res = await postSignApi({
        id: this.notificationId,
      });
      if (res.certificationStatus === 'notCertified') {
        console.log(111)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sign {
  width: 80%;
  position: fixed;
  bottom: 40rpx;
  left: 50%;
  transform: translateX(-50%);
}
</style>