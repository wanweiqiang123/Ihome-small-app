<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:27:32
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-24 15:58:11
-->
<template>
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
    <view>状态：{{$dict.dictAllName(payMsg.status, 'PaymentStatus')}}</view>
  </view>
</template>
<script>
import { getPaymentQRCodeInfoApi, getPayStatusApi } from "../../api/customer";
import storageTool from '../../common/storageTool';
export default {
  components: {},
  data() {
    return {
      payId: '',
      url: '',
      timer: '',
      payMsg: {
        transAmount: 0,
        billNo: '',
      }
    }
  },
  onLoad(options) {
    this.payId = options.id;
  },
  onShow() {
    if (this.payId) {
      this.getInfo();
      this.timer = setInterval(this.getStatus, 3000);
    }
  },
  onHide() {
    clearInterval(this.timer);
  },
  onUnload() {
    clearInterval(this.timer);
  },
  methods: {
    async getInfo() {
      const item = await getPaymentQRCodeInfoApi(this.payId);
      this.payMsg = {...item};
      let o = { ...item};
      delete o.status
      let obj = {
        content: JSON.stringify(o),
      };
      const token = storageTool.getToken();
      let header = {
        'Authorization': 'bearer ' + token
      };
      uni.request({
        url: 'http://api.polyihome.develop/sales-api/sales-document-cover/file/qrcode',
        method: 'POST',
        header: {
          ...header,
          "Content-Type": "application/json",
        },
        data: obj,
        success: res => {
          this.url = `http://api.polyihome.develop/sales-api/sales-document-cover/file/browse/${res.data.data.fileId}`
        }
      })
    },
    async getStatus() {
      const item = await getPayStatusApi(this.payId, {
        hideLoading: true
      });
      if (item === 'Paid') {
        uni.navigateTo({
          url: `/customerPackage/paySuccess/index`,
        });
        clearInterval(this.timer);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  .hint {
    padding: 30rpx 0;
  }
}
</style>