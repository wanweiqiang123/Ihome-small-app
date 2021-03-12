<!--
 * @Description: 优惠告知书预览
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-04 11:20:06
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-12 14:59:43
-->
<template>
  <LoginPage>
    <view class="safe-area-inset-bottom">
      <u-image
        :src="fileUrl"
        mode="widthFix"
        @click="preview(fileUrl)"
      >
        <u-loading slot="loading"></u-loading>
      </u-image>
      <!-- <view class="share-btn">
        <u-button
          type="primary"
          open-type="share"
        >转发</u-button>
      </view> -->
    </view>
  </LoginPage>
</template>

<script>
import { getPdf2PicApi, getAllByTypeApi } from "../../api/index";
import { postNoticeDelete } from "../../api/staff";

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
        path: `/customerPackage/notification/index`, //不设置为转发时的路径
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
    handleTo() {
      uni.navigateTo({
        url: `/staffPackage/noticeCreate/index?id=${this.option.id}`,
      });
    },
    async pdf2Pic(tId) {
      const { fileId } = await getPdf2PicApi(tId);
      this.fileUrl = this.$tool.getFileUrl(fileId);
    },
    async getDict(type) {
      const list = await getAllByTypeApi({ type: "NotificationType" });
      const item = list.find((i) => i.code === type);
      uni.setNavigationBarTitle({
        title: item?.name,
      });
    },
  },
  onLoad(option) {
    console.log(option);
    this.option = option;
    this.share = {
      title: "居恒小程序", //不设置为主体名称
      path: `/customerPackage/notification/index?id=${option.id}&templateId=${
        option.tId
      }&notificationType=${option.type}&type=${
        option.sign === "WaitBeSigned" ? "sign" : "view"
      }`, //不设置为转发时的路径
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
