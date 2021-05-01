<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-22 16:35:22
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-28 11:48:54
-->
<template>
  <u-popup
    class="popupitem"
    :value="value"
    mode="right"
    :mask="true"
    width="100%"
    close-icon-pos="top-left"
    closeable
    safe-area-inset-bottom
    close-icon-size="40"
    @close="close"
  >
    <view class="box">
      <view>
        <u-icon name="clock" color="#2979ff" size="200"></u-icon>
      </view>
      <view>点击复制链接打开浏览器完成实名</view>
      <view class="router">
        <u-parse
          :html="url"
          :selectable="true"
          style="width: min-content"
        ></u-parse>
      </view>
      <u-button type="primary" @click="copyUrl">复制链接</u-button>
      <u-button style="margin-top: 20rpx" @click="getInfo" type="primary"
        >查询是否认证成功</u-button
      >
    </view>
  </u-popup>
</template>
<script>
import { isPoolSelectCustApi } from "../../api/customer";
export default {
  props: {
    value: {
      type: Boolean,
    },
    url: {
      type: String,
      default: "",
    },
    custTel: {
      type: String,
      default: "",
    },
    custName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      linkToTimer: "",
    };
  },
  methods: {
    async getInfo() {
      const item = await isPoolSelectCustApi(
        {
          custTel: this.custTel,
          custName: this.custName,
        },
        {
          hideLoading: true,
        }
      );
      switch (
        Number(item.ecertificationStatus) //0: 已实名, 1: 实名失败, 2: 未实名
      ) {
        case 0:
          this.close();
          if (getApp().globalData.attestationInfo.type === "one") {
            getApp().noticeInfo = {
              templateId: getApp().globalData.attestationInfo.templateId,
              id: getApp().globalData.attestationInfo.noticeId,
              notificationType: getApp().globalData.attestationInfo
                .notificationType,
              type: "sign",
            };
            uni.redirectTo({
              url: `/customerPackage/notification/index`,
            });
          } else {
            uni.redirectTo({
              url: `/customerPackage/signMore/index`,
            });
          }
          break;
        case 1:
          this.close();
          this.$tool.toast("认证失败");
          break;
        case 2:
          this.$tool.toast("未实名认证");
          break;
      }
    },
    close() {
      this.$emit("input", false);
    },
    copyUrl() {
      uni.setClipboardData({
        data: this.url,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 100vh;
  display: flex;
  margin-top: 50rpx;
  flex-flow: column nowrap;
  align-items: center;
  .router {
    padding: 20rpx 50rpx;
    color: $u-type-primary;
  }
}
</style>