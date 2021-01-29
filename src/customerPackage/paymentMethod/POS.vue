<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:27:32
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-29 16:01:27
-->
<template>
  <u-popup
    class="popupitem"
    :value="value"
    mode="center"
    :mask="true"
    close-icon-pos="top-right"
    closeable
    safe-area-inset-bottom
    @close="close"
  >
    <view class="box">
      <view class="hint">请联系案场人员使用POS机扫描该二维码</view>
      <view>
        <u-image
          width="600rpx"
          height="600rpx"
          :src="url"
        >
          <u-loading slot="loading"></u-loading>
        </u-image>
      </view>
      <view style="margin-top: 20rpx">￥{{payMsg.transAmount}}</view>
      <view>订单号：{{payMsg.billNo}}</view>
      <view>状态：{{getDictName(payMsg.status, PaymentStatus)}}</view>
    </view>
  </u-popup>
</template>
<script>
import { getPaymentQRCodeInfoApi, getPayStatusApi } from "../../api/customer";
import storageTool from "../../common/storageTool";
import { getAllByTypeApi } from "../../api/index";
import { currentEnvConfig } from "../../env-config.js";
import UPopup from "../../uview-ui/components/u-popup/u-popup.vue";
export default {
  components: { UPopup },
  props: {
    value: {
      type: Boolean,
    },
    payId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      url: "",
      posTimer: null,
      payMsg: {
        transAmount: 0,
        billNo: "",
      },
      PaymentStatus: [],
    };
  },
  watch: {
    value: {
      immediate: true,
      async handler(v) {
        if (v) {
          if (this.payId) {
            this.getInfo();
            if (this.posTimer) {
              clearInterval(this.posTimer);
              this.posTimer = null;
            } else {
              this.posTimer = setInterval(this.getStatus, 3000);
            }
          }
          this.PaymentStatus = await this.getDictAll("PaymentStatus");
        }
      },
    },
  },
  methods: {
    close() {
      this.$emit("input", false);
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
    async getInfo() {
      const item = await getPaymentQRCodeInfoApi(this.payId);
      this.payMsg = { ...item };
      let o = { ...item };
      delete o.status;
      let obj = {
        content: JSON.stringify(o),
      };
      const token = storageTool.getToken();
      let header = {
        Authorization: "bearer " + token,
      };
      uni.request({
        url: `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/qrcode`,
        method: "POST",
        header: {
          ...header,
          "Content-Type": "application/json",
        },
        data: obj,
        success: (res) => {
          this.url = `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${res.data.data.fileId}`;
        },
      });
    },
    async getStatus() {
      const item = await getPayStatusApi(this.payId, {
        hideLoading: true,
      });
      switch (item.status) {
        case "Paid":
          this.close();
          clearInterval(this.posTimer);
          uni.redirectTo({
            url: `/customerPackage/paySuccess/index?id=${item.businessId}`,
          });
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  padding: 30rpx 20rpx 20rpx 20rpx;
  background-color: #f1f1f1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  .hint {
    padding: 40rpx 0;
  }
}
</style>