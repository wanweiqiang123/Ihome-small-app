<!--
 * @Description: 优惠告知书预览
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-04 11:20:06
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-04 17:10:04
-->
<template>
  <view class="safe-area-inset-bottom">
    <u-image
      :src="fileUrl"
      mode="widthFix"
      @click="preview(fileUrl)"
    >
      <u-loading slot="loading"></u-loading>
    </u-image>
    <view
      class="fixed-btn"
      v-if="option.type === 'Notification'"
    >
      <u-button
        type="success"
        open-type="share"
        :custom-style="{
          borderRadius: 'unset',
          marginBottom: '10rpx',
          padding: '0 20rpx'
        }"
      >转发</u-button>
      <u-button
        type="primary"
        :custom-style="{
          borderRadius: 'unset',
          marginBottom: '10rpx',
          padding: '0 20rpx'
        }"
      >修改</u-button>
      <u-button
        type="error"
        :custom-style="{
          borderRadius: 'unset',
          marginBottom: '10rpx',
          padding: '0 20rpx'
        }"
      >作废</u-button>
    </view>
    <view
      class="share-btn"
      v-else
    >
      <u-button
        type="primary"
        open-type="share"
      >转发</u-button>
    </view>
  </view>
</template>

<script>
import { currentEnvConfig } from "../../env-config.js";
import { getPdf2PicApi, getAllByTypeApi } from "../../api/index";

export default {
  name: "notice-preview",
  data() {
    return {
      fileUrl: "",
      option: {
        type: null,
        id: null,
        tId: null,
      },
      share: {
        title: "居恒小程序", //不设置为主体名称
        path: `/staffPackage/noticePreview/index`, //不设置为转发时的路径
        imageUrl: "/static/logo.png", //不设置为转发时页面截图
      },
    };
  },
  methods: {
    preview(url) {
      uni.previewImage({
        urls: [url],
        current: 1,
      });
    },
    async pdf2Pic(tId) {
      const { fileId } = await getPdf2PicApi(tId);
      this.fileUrl = `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${fileId}`;
    },
    async getDict(type) {
      const list = await getAllByTypeApi({ type: "NotificationType" });
      const { name } = list.find((i) => i.code === type);
      uni.setNavigationBarTitle({
        title: name,
      });
    },
  },
  onLoad(option) {
    console.log(option);
    this.option = option;
    this.share = {
      title: "居恒小程序", //不设置为主体名称
      path: `/staffPackage/noticePreview/index?id=${option.id}&tId=${option.tId}&type=${option.type}`, //不设置为转发时的路径
      imageUrl: "/static/logo.png", //不设置为转发时页面截图
    };
    this.pdf2Pic(option.tId);
    this.getDict(option.type);
  },
  // onShareAppMessage(res) {
  //   console.log(res);
  // },
};
</script>

<style lang="scss" scoped>
.share-btn {
  padding: 0 20rpx;
}
.fixed-btn {
  position: fixed;
  bottom: 100rpx;
  right: 0;
  width: 100rpx;
}
</style>
