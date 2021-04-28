<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-28 15:50:48
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-28 11:49:33
-->
<template>
  <view class="signmore">
    <u-collapse
      class="signCollapse"
      :head-style="headStyle"
    >
      <u-collapse-item
        v-for="(item, index) in list"
        :title="getDictName(item.notificationType, NotificationType)"
        :key="index"
        @change="openChange(item, index)"
      >
        <view class="imageview">
          <image
            style="width: 100%;height: 70vh"
            mode="widthFix"
            :src="item.src"
            @click="showImage(item.src)"
          ></image>
        </view>
      </u-collapse-item>
    </u-collapse>
    <view class="my-btn">
      <u-button
        shape="square"
        @click="gotosign"
      >签署以上协议</u-button>
    </view>
    <Attestation v-model="attestationShow"></Attestation>
  </view>
</template>
<script>
import { getAllByTypeApi, getPdf2PicApi } from "../../api/index";
import { postSigningApi } from "../../api/customer";
import Attestation from "../attestation/index";
export default {
  components: { Attestation },
  data() {
    return {
      list: [],
      NotificationType: [],
      headStyle: {
        "font-size": "30rpx",
        "background-color": "#F59A23",
        color: "#ffffff",
        padding: "20rpx",
      },
      attestationShow: false,
    };
  },
  async onLoad() {
    this.NotificationType = await this.getDictAll("NotificationType");
    this.list = getApp().signMoreData;
    console.log(this.list, "签署数据");
  },
  methods: {
    // 字典翻译
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 字典匹配
    getDictName(code, list) {
      if (list.length) {
        const item = list.find((v) => v.code === code);
        return item?.name ? item.name : "";
      }
    },
    showImage(src) {
      uni.previewImage({
        urls: [src],
        current: 1,
      });
    },
    async openChange(data, index) {
      console.log(data, index);
      const res = await getPdf2PicApi(data.templateId);
      this.$set(this.list, index, {
        ...data,
        src: this.$tool.getFileUrl(res.fileId),
      });
    },
    async gotosign() {
      const arr = this.list.map((v) => v.id);
      const res = await postSigningApi({
        noticeIds: arr,
      });
      console.log(res, "合并签署");
      if (res.certificationStatus === "notCertified") {
        getApp().globalData.attestationInfo = {
          ownerName: res.certificationResponseVO.ownerName,
          ownerMobile: res.certificationResponseVO.ownerMobile,
          ownerCertificateNo: res.certificationResponseVO.ownerCertificateNo,
          type: "more",
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
.signmore {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signCollapse {
  width: 100%;
}

.my-btn {
  width: 90%;
  box-sizing: border-box;
  position: absolute;
  bottom: 30rpx;

  /deep/.u-btn {
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
  }
}
</style>