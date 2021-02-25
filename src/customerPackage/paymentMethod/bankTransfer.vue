<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 15:28:17
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-25 14:47:19
-->
<template>
  <u-popup
    :value="value"
    mode="right"
    width="100%"
    :mask="true"
    close-icon-pos="top-left"
    closeable
    safe-area-inset-bottom
    close-icon-size="40"
    @close="close"
  >
    <view
      class="title"
      v-if="!hidePayStatus"
    >银行转账</view>
    <view class="pay safe-area-inset-bottom">
      <view class="pay-msg margin-top">
        <view class="pay-title">
          <text style="margin-left: 20rpx">收款信息</text>
        </view>
        <view class="pay-item">
          <view class="pay-list">收款公司
            <text class="pay-list-money">{{info.payeeName | emptyFilter}}</text>
          </view>
          <view class="pay-list">收款帐号
            <view class='pay-payeeAccount'>
              <text class="pay-payeeAccount-title">{{info.payeeAccount | emptyFilter}}</text>
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
          <text
            class="upload-title"
            v-if="!hidePayStatus"
          >转账凭证</text>
          <u-upload
            max-count="10"
            class="upload"
            width="160"
            height="160"
            :action="$tool.getUploadUrl()"
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
          type="primary"
          shape="square"
          @click="submitMsg"
          :loading="buttonLoading"
        >提交</u-button>
      </view>
    </view>
  </u-popup>
</template>
<script>
import {
  getBankInfoApi,
  postAddServiceApi,
  postPaymentupdateApi,
} from "../../api/customer";
import storageTool from "../../common/storageTool.js";
export default {
  props: {
    value: {
      type: Boolean,
    },
  },
  data() {
    return {
      info: {},
      cycleId: "",
      payNum: 0,
      lists: [],
      showUploadList: true,
      header: {
        Authorization: "bearer " + storageTool.getToken(),
      },
      payData: {},
      uploadArr: [],
      addOrUpdate: "",
      continueId: "",
      buttonLoading: false,
      hidePayStatus: true,
    };
  },
  watch: {
    value: {
      immediate: true,
      async handler(v) {
        if (v) {
          this.cycleId = getApp().bankTransferData.cycleId;
          this.payNum = getApp().bankTransferData.payNum;
          this.addOrUpdate = getApp().bankTransferData.addOrUpdate;
          this.continueId = getApp().bankTransferData.id;
          this.payData = { ...getApp().paidData };
          if (this.cycleId) {
            this.getInfo();
          }
          this.hidePayStatus = this.$storageTool.hidePay();
          // 假数据
          // this.cycleId = 3;
        }
      },
    },
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
    async getInfo() {
      this.info = await getBankInfoApi(this.cycleId);
    },
    copyPayNum() {
      uni.setClipboardData({
        data: this.info.payeeAccount,
      });
    },
    async successChange(data, index, lists, name) {
      this.uploadArr[index] = {
        fileId: lists[index].response.data[0].fileId,
        fileName:
          lists[index].response?.data[0].generateFileName +
          "." +
          lists[index].response?.data[0].generateFileType,
      };
    },
    beforeUpload() {
      uni.showToast({
        icon: "loading",
        title: "正在上传...",
        duration: 500000000000,
      });
      return true;
    },
    removeChange(index, lists, name) {
      this.uploadArr.splice(index, 1);
    },
    async submitMsg() {
      let obj = {};
      obj.amount = Number(this.payNum);
      obj.businessId = this.payData.businessId;
      obj.businessCode = this.payData.businessCode;
      obj.groupId = this.payData.groupId;
      obj.operator = this.payData.agentId;
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
      if (this.addOrUpdate === "update") {
        obj.id = this.continueId;
      }
      if (!this.uploadArr.length) {
        this.$tool.toast("请上传转账凭证");
        return;
      }
      // 假数据
      // obj.groupId = 15;
      // obj.operator = 15;
      // obj.proId = 1;
      // obj.termId = 3;
      if (this.addOrUpdate === "add") {
        try {
          await postAddServiceApi(obj);
          this.buttonLoading = false;
          this.$tool.toast("提交成功");
          this.close();
          uni.redirectTo({
            url: `/customerPackage/discountsInfo/index?id=${this.payData.businessId}`,
          });
        } catch (err) {
          this.buttonLoading = false;
        }
      } else {
        try {
          await postPaymentupdateApi(obj);
          this.buttonLoading = false;
          this.$tool.toast("提交成功");
          this.close();
          uni.redirectTo({
            url: `/customerPackage/discountsInfo/index?id=${this.payData.businessId}`,
          });
        } catch (error) {
          this.buttonLoading = false;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  position: absolute;
  left: 50%;
  top: 30rpx;
  transform: translate(-50%);
}
.pay {
  padding-top: 15rpx;
  min-height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70rpx;

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
    min-height: 80rpx;
    border-bottom: 1px solid #f2f2f2;
    position: relative;
    display: flex;
    align-items: center;

    &-money {
      position: absolute;
      right: 0;
      max-width: 60%;
      text-align: right;
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