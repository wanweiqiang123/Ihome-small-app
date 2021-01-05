<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:26:47
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-05 16:56:14
-->
<template>
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
  </view>
</template>
<script>
import { getPayStatusApi } from "../../api/customer";
import { currentEnvConfig } from "../../env-config.js";
export default {
  data() {
    return {
      payId: "",
      payType: "",
      url: "",
      timer: "",
    };
  },
  onLoad(options) {
    this.payId = options.id;
    this.payType = options.type;
    this.url = `${currentEnvConfig["protocol"]}://${currentEnvConfig["h5Domain"]}/sales-h5/${this.payType}?id=${this.payId}`;
  },
  onShow() {
    this.timer = setInterval(this.getInfo, 3000);
  },
  onHide() {
    clearInterval(this.timer);
  },
  onUnload() {
    clearInterval(this.timer);
  },
  methods: {
    async getInfo() {
      const item = await getPayStatusApi(this.payId, {
        hideLoading: true,
      });
      if (item === "Paid") {
        uni.navigateTo({
          url: `/customerPackage/paySuccess/index`,
        });
        clearInterval(this.timer);
      }
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