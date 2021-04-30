<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-30 10:23:11
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-28 11:31:27
-->
<template>
  <LoginPage>
    <view>
      <view class="imageview">
        <image
          style="width: 100%;height: 100vh"
          mode="widthFix"
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
    <Attestation v-model="attestationShow"></Attestation>
  </LoginPage>
</template>
<script>
import { getPdf2PicApi } from "../../api/index";
import { postSignApi } from "../../api/customer";
import { getAllByTypeApi } from "../../api/index";
import Attestation from "../attestation/index";
export default {
  components: { Attestation },
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
      notificationType: "",
      attestationShow: false,
    };
  },
  async onLoad(options) {
    if (options.id) {
      this.templateId = options.templateId;
      this.noticeId = options.noticeId;
      this.type = options.type;
      this.notificationType = options.notificationType;
    } else {
      this.templateId = getApp().noticeInfo.templateId;
      this.noticeId = getApp().noticeInfo.id;
      this.type = getApp().noticeInfo.type;
      this.notificationType = getApp().noticeInfo.notificationType;
    }
    this.NotificationType = await this.getDictAll("NotificationType");
    uni.setNavigationBarTitle({
      title: this.getDictName(this.notificationType, this.NotificationType),
    });
    if (this.type === "sign") this.$refs.uCode.start();
    const res = await getPdf2PicApi(this.templateId);
    this.src = this.$tool.getFileUrl(res.fileId);
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
        const item = list.find((v) => v.code === code);
        return item?.name;
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
          notificationType: this.notificationType,
          type: "one",
        };
        this.attestationShow = true;
      } else {
        getApp().globalData.webViewSrc = res.signedAddress;
        uni.navigateTo({
          url: `/pages/webView/preview/index`,
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