<!--
 * @Description: 优惠告知书预览
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-04 11:20:06
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-06 11:27:25
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
          @click="handleTo"
        >修改</u-button>
        <u-button
          type="error"
          :custom-style="{
            borderRadius: 'unset',
            marginBottom: '10rpx',
            padding: '0 20rpx'
          }"
          @click="isShow = true"
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
    <!-- 模态框 -->
    <u-modal
      v-model="isShow"
      content="是否确认作废?"
      show-cancel-button
      confirm-color="#fa3534"
      :async-close="true"
      @confirm="confirm"
    ></u-modal>
  </LoginPage>
</template>

<script>
import { currentEnvConfig } from "../../env-config.js";
import { getPdf2PicApi, getAllByTypeApi } from "../../api/index";
import { postNoticeDelete } from "../../api/staff";

export default {
  name: "notice-preview",
  data() {
    return {
      isShow: false,
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
    handleTo() {
      uni.navigateTo({
        url: `/staffPackage/noticeCreate/index?id=${this.option.id}`,
      });
    },
    async confirm() {
      try {
        await postNoticeDelete({ id: this.option.id });
        this.isShow = false;
        this.$u.toast("作废成功");
        this.$tool.back(null, { type: "init", page: null });
      } catch (error) {
        console.log(error);
        this.isShow = false;
        this.$u.toast("作废失败");
      }
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
