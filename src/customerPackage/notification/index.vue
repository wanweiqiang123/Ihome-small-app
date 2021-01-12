<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-30 10:23:11
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-12 08:42:15
-->
<template>
  <view>
    <view class="imageview">
      <image
        style="width: 100%;height: 100vh"
        mode="aspectFit"
        :src="src"
        @click="showImage"
      ></image>
    </view>
    <view
      class="sign"
      v-if="type === 'sign'"
    >
      <u-button
        type="primary"
        :disabled="disabled"
        @click="gotoSign"
      >{{tips}}</u-button>
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
import { getAllByTypeApi } from "../../api/index";
export default {
  data() {
    return {
      templateId: "",
      noticeId: "",
      src: "",
      isShow: true,
      tips: "",
      disabled: true,
      type: "",
      NotificationType: [],
    };
  },
  async onLoad() {
    this.templateId = getApp().noticeInfo.templateId;
    this.noticeId = getApp().noticeInfo.id;
    this.type = getApp().noticeInfo.type;
    this.NotificationType = await this.getDictAll("NotificationType");
    uni.setNavigationBarTitle({
      title: this.getDictName(
        getApp().noticeInfo.notificationType,
        this.NotificationType
      ),
    });
    getApp().noticeInfo;
    if (this.type === "sign") this.$refs.uCode.start();
    const res = await getPdf2PicApi(this.templateId);
    this.src = `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${res.fileId}`;
  },
  methods: {
    end() {
      this.tips = "签署";
      this.disabled = !this.disabled;
    },
    codeChange(text) {
      this.tips = text;
    },
    showImage() {
      uni.previewImage({
        urls: [this.src],
        current: 1,
      });
    },
    // 字典翻译
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 字典匹配
    getDictName(code, list) {
      if (list.length) {
        const { name } = list.find((v) => v.code === code);
        return name;
      }
    },
    async gotoSign() {
      const res = await postSignApi({
        id: this.noticeId,
      });
      if (res.certificationStatus === "notCertified") {
        getApp().globalData.attestationInfo = {
          ownerName: res.certificationResponseVO.ownerName,
          ownerMobile: res.certificationResponseVO.ownerMobile,
          ownerCertificateNo: res.certificationResponseVO.ownerCertificateNo,
          noticeId: this.noticeId,
          templateId: this.templateId,
          notificationType: getApp().noticeInfo.notificationType,
        };
        uni.navigateTo({
          url: `/customerPackage/attestation/index`,
        });
      } else {
        getApp().globalData.webViewSrc = res.signedAddress;
        uni.navigateTo({
          url: `/customerPackage/webView/index`,
        });
      }
    },
  },
};
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