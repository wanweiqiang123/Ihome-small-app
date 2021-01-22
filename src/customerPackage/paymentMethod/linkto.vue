<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:26:47
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-22 12:08:54
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
        <u-icon
          name="clock"
          color="#2979ff"
          size="200"
        ></u-icon>
      </view>
      <view>点击复制链接打开浏览器已完成支付</view>
      <view class="router">
        <u-parse
          :html="url"
          :selectable="true"
          style="width: min-content"
        ></u-parse>
      </view>
      <u-button
        type="primary"
        @click="copyUrl"
      >复制链接</u-button>
    </view>
  </u-popup>
</template>
<script>
import { getPayStatusApi } from "../../api/customer";
import { currentEnvConfig } from "../../env-config.js";
export default {
  props: {
    value: {
      type: Boolean,
    },
    payId: {
      type: String,
      default: "",
    },
    payType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      url: "",
      timer: "",
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        if (v) {
          this.url = `${currentEnvConfig["protocol"]}://${currentEnvConfig["h5Domain"]}/sales-h5/${this.payType}?id=${this.payId}`;
          this.timer = setInterval(this.getInfo, 3000);
        }
      },
    },
  },
  // created() {},
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    async getInfo() {
      const item = await getPayStatusApi(this.payId, {
        hideLoading: true,
      });
      switch (item.status) {
        case "Paid":
          uni.navigateTo({
            url: `/customerPackage/paySuccess/index?id=${item.businessId}`,
          });
          clearInterval(this.timer);
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