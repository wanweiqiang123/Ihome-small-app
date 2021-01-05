<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:28:17
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-05 16:51:50
-->
<template>
  <view class="pay safe-area-inset-bottom">
    <view class="pay-msg margin-top">
      <view class="pay-title">
        <text style="margin-left: 20rpx">收款信息</text>
      </view>
      <view class="pay-item">
        <view class="pay-list">收款公司
          <text class="pay-list-money">{{info.payeeName}}</text>
        </view>
        <view class="pay-list">收款帐号
          <view class='pay-payeeAccount'>
            <text class="pay-payeeAccount-title">{{info.payeeAccount}}</text>
            <u-icon
              name="file-text-fill"
              color="#2979ff"
              size="40"
              @click="copyPayNum"
            ></u-icon>
          </view>
        </view>
        <view class="pay-list">收款金额
          <text class="pay-list-money">{{payNum}}</text>
        </view>
      </view>
    </view>
    <view class="pay-msg margin-top">
      <view class="pay-hint">
        <u-icon
          name="info-circle"
          size="34"
        ></u-icon>
        <text style="margin-left: 20rpx">转账成功后在下方上传银行转账凭证并提交确认~</text>
      </view>
      <view class="pay-upload">
        <text class="upload-title">转账凭证</text>
        <u-upload
          class="upload"
          ref="uUpload"
          :action="action"
          @on-success="successChange"
          @on-remove="removeChange"
          :show-upload-list="showUploadList"
          :header="header"
          :show-progress="false"
          :before-upload="beforeUpload"
          name="files"
        ></u-upload>
      </view>
    </view>
    <view class="my-btn">
      <u-button
        shape="square"
        @click="submitMsg"
      >提交</u-button>
    </view>
  </view>
</template>
<script>
import { getBankInfoApi, postAddServiceApi } from "../../api/customer";
import { currentEnvConfig } from "../../env-config.js";
import storageTool from "../../common/storageTool.js";
export default {
  data() {
    return {
      info: {},
      payId: "",
      payNum: 0,
      action:
        currentEnvConfig["protocol"] +
        "://" +
        currentEnvConfig["apiDomain"] +
        "/sales-api/sales-document-cover/file/upload",
      lists: [],
      showUploadList: true,
      header: {
        Authorization: "bearer " + storageTool.getToken(),
      },
      payData: {},
      uploadArr: [],
    };
  },
  onLoad(options) {
    this.payId = options.id;
    this.payNum = options.payNum;
    this.payData = { ...getApp().paidData };
    // 假数据
    this.payId = 3;
  },
  onReady() {
    // 得到整个组件对象，内部图片列表变量为"lists"
    // this.lists = this.$refs.uUpload.lists;
  },
  onShow() {
    if (this.payId) {
      this.getInfo();
    }
  },
  methods: {
    async getInfo() {
      this.info = await getBankInfoApi(this.payId);
    },
    copyPayNum() {
      uni.setClipboardData({
        data: this.info.payeeAccount,
      });
    },
    async successChange(data, index, lists, name) {
      this.uploadArr = lists.map((v) => ({
        fileId: v.response.data[0].fileId,
        fileName:
          v.response.data[0].generateFileName +
          "." +
          v.response.data[0].generateFileType,
      }));
    },
    beforeUpload() {
      uni.showToast({
        icon: "loading",
        title: "正在上传...",
        duration: 500000000000,
      });
      return true;
    },
    async submitMsg() {
      let obj = {};
      obj.amount = this.payNum;
      obj.businessId = this.payData.businessId;
      obj.groupId = this.payData.groupId;
      obj.operator = this.payData.operator;
      obj.payType = "Transfer";
      obj.payer = "Customer";
      obj.proId = this.payData.projectId;
      obj.roomId = this.payData.roomNumberId;
      obj.serviceAmount = this.payData.paymentAmount;
      obj.serviceFeePaid = this.payData.paid;
      obj.termId = this.payData.cycleId;
      obj.unpaidServiceFee = this.payData.unpaid;
      obj.terminal = "WeChatApp";
      obj.attachments = this.uploadArr;
      obj.payeeAccount = this.info.payeeAccount;
      obj.payeeName = this.info.payeeName;
      // 假数据
      obj.groupId = 15;
      obj.operator = 15;
      obj.proId = 1;
      obj.termId = 3;
      const res = await postAddServiceApi(obj);
      if (res) {
        uni.showToast({
          title: "提交成功",
          icon: "none",
        });
      }
      uni.navigateTo({
        url: `/customerPackage/discountsInfo/index?id=${this.payData.businessId}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.pay {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-hint {
    padding: 20rpx;
    font-size: 12px;
    background-color: $u-type-primary-disabled;
  }

  &-msg {
    width: 90%;
    box-sizing: border-box;
    margin-bottom: 30rpx;
    // padding: 0 20rpx;
    background-color: white;
  }

  &-title {
    width: 100%;
    font-size: 34rpx;
    box-sizing: border-box;
    font-weight: 600;
    padding: 15rpx 0rpx;
    background-color: $uni-color-warning;
    border-bottom: 1px solid #f2f2f2;
  }

  &-item {
    width: 100%;
    display: flex;
    padding: 0 20rpx;
    flex-flow: column nowrap;
  }
  &-list {
    height: 80rpx;
    line-height: 80rpx;
    border-bottom: 1px solid #f2f2f2;
    position: relative;

    &-money {
      position: absolute;
      right: 0;
    }
  }

  &-payeeAccount {
    height: 80rpx;
    line-height: 80rpx;
    display: inline-block;
    position: absolute;
    right: 0;
  }

  &-upload {
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 20rpx;

    .upload-title {
      margin-left: 10rpx;
    }
  }
}

.margin-top {
  width: 90%;
  box-sizing: border-box;
  margin-top: 20rpx;
}

.my-btn {
  width: 90%;
  box-sizing: border-box;
  margin-bottom: 30rpx;

  /deep/.u-btn {
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
  }
}
</style>