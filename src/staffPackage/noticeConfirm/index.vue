<!--
 * @Description: 确认优惠告知书
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 17:32:25
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-15 19:48:46
-->
<template>
  <LoginPage>
    <view class="notice">
      <view class="notice-info">
        <view class="title u-border-bottom">
          <u-image
            width="80rpx"
            height="80rpx"
            src="http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg"
            shape="circle"
          ></u-image>
          <text class="title-text">优惠信息</text>
        </view>
        <view class="info">
          <text>项目名称</text>
          <text class="info-content">{{form.projectName}}</text>
        </view>
        <view class="info">
          <text>优惠方式</text>
          <text class="info-content">{{form.explain}}</text>
        </view>
        <view class="info">
          <text>服务费金额</text>
          <text class="info-content">¥{{form.paymentAmount}}</text>
        </view>
      </view>
      <view class="form-content">
        <view class="form-color">
          <u-form
            :model="form"
            ref="uForm"
            label-width="220"
          >
            <u-form-item label="栋座">
              <view class="text-right">{{isRecognize ? '以最终甲方推送的房号确认书为准' : form.buyUnitName}}</view>
            </u-form-item>
            <u-form-item label="房号">
              <view class="text-right">{{isRecognize ? '以最终甲方推送的房号确认书为准' : form.roomNumberName}}</view>
            </u-form-item>
            <template v-for="(i, n) in form.ownerList">
              <u-gap
                height="20"
                bg-color="#f1f1f1"
                :key="n"
              ></u-gap>
              <view
                :key="n"
                class="form-title u-border-bottom"
              >业主信息</view>
              <u-form-item
                :key="n"
                :label="isEnterprise ? '公司名称' : '业主姓名'"
              >
                <view class="text-right">{{i.ownerName}}</view>
              </u-form-item>
              <u-form-item
                :key="n"
                :label="isEnterprise ? '经办人号码' : '手机号码'"
              >
                <view class="text-right">{{i.ownerMobile}}</view>
              </u-form-item>
              <u-form-item
                :key="n"
                :label="isEnterprise ? '营业执照编号' : '身份证号'"
              >
                <view class="text-right">{{i.ownerCertificateNo}}</view>
              </u-form-item>
            </template>
            <u-gap
              height="20"
              bg-color="#f1f1f1"
            ></u-gap>
            <u-form-item label="优惠告知书附件">
              <view class="text-right">
                <u-button
                  size="mini"
                  type="success"
                  @click="noticePreview"
                >预览</u-button>
              </view>
            </u-form-item>
            <u-gap
              height="20"
              bg-color="#f1f1f1"
            ></u-gap>
            <u-form-item label="认购书附件">
              <view class="text-right">
                <u-button
                  size="mini"
                  type="success"
                  @click="subscriptionPreview"
                >预览</u-button>
              </view>
            </u-form-item>
            <u-gap
              height="20"
              bg-color="#f1f1f1"
            ></u-gap>
            <u-form-item
              label="审核意见"
              label-position="top"
            >
              <u-input
                type="textarea"
                v-model="reviewOpinion"
                border
                maxlength="40"
              ></u-input>
            </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="btn-container safe-area-inset-bottom">
        <u-button
          shape="circle"
          type="error"
          class="ih-btn"
          @click="submit('No')"
        >拒 接</u-button>
        <u-button
          size="default"
          type="primary"
          shape="circle"
          class="ih-btn"
          @click="submit('Yes')"
        >通 过</u-button>
      </view>
    </view>
  </LoginPage>
</template>

<script>
import { currentEnvConfig } from "../../env-config.js";
import {
  getNoticeInfo,
  postNoticeManagement,
  getRecognizeById,
  getPreviewApi,
} from "../../api/staff";

export default {
  name: "notice-confirm",
  data() {
    return {
      form: {
        ownerList: [],
        projectId: "",
        projectName: "",
        roomNumberId: "",
        roomNumberName: "",
        paymentAmount: "",
        explain: "",
        buyUnit: "",
        buyUnitName: "",
        ownerType: "",
        subscriptionAnnex: [],
        noticeAttachmentList: [],
        templateType: "",
      },
      reviewOpinion: "",
      fileList: [],
      isRecognize: false,
    };
  },
  computed: {
    isEnterprise() {
      return this.form.ownerType === "Enterprise";
    },
  },
  methods: {
    async getInfo(id) {
      if (id) {
        const res = await getNoticeInfo({ id });
        Object.assign(this.form, res);
        this.isRecognize = await getRecognizeById(res.cycleId);
        this.fileList = res.noticeAttachmentList
          .filter((i) => i.type === "NoticeAttachment")
          .map((val) => ({
            url: `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${val.fileNo}`,
          }));
      }
    },
    async noticePreview() {
      let val = this.form;
      if (val.templateType === "ElectronicTemplate") {
        if (
          val.notificationStatus === "WaitPay" ||
          val.notificationStatus === "Paid"
        ) {
          const res = await getPreviewApi(val.id);
          if (res) {
            getApp().globalData.webViewSrc = res;
            uni.navigateTo({
              url: `/pages/webView/preview/index`,
            });
          }
        } else {
          let url = `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${val.templateId}.pdf`;
          uni.downloadFile({
            url: url,
            success: function (res) {
              var filePath = res.tempFilePath;
              uni.openDocument({
                filePath: filePath,
                fileType: "pdf",
                showMenu: true,
                success: function (res) {
                  console.log("打开文档成功");
                },
              });
            },
          });
        }
      } else {
        if (val.noticeAttachmentList.length) {
          let preList = val.noticeAttachmentList.map(
            (i) =>
              `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${i.fileNo}`
          );
          uni.previewImage({
            urls: preList,
            current: 1,
          });
        } else {
          this.$tool.toast("附件为空");
        }
      }
    },
    subscriptionPreview() {
      if (this.form.subscriptionAnnex.length) {
        let preList = this.form.subscriptionAnnex.map(
          (i) =>
            `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${i.fileNo}`
        );
        uni.previewImage({
          urls: preList,
          current: 1,
        });
      } else {
        this.$tool.toast("认购书为空");
      }
    },
    async submit(status) {
      if (!this.reviewOpinion.length) {
        this.$tool.toast("审核意见不能为空");
        return;
      }
      try {
        await postNoticeManagement({
          id: this.form.id,
          reviewOpinion: this.reviewOpinion,
          status,
        });
        this.$tool.toast(`${status === "Yes" ? "审核通过" : "操作成功"}`);
        this.$tool.back(null, {
          type: "update",
          data: { ...this.form, reviewStatus: "Audited" },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  onLoad(option) {
    this.getInfo(option.id);
  },
};
</script>

<style lang="scss" scoped>
.notice {
  background-color: $u-bg-color;
  min-height: 100vh;
}
.notice-info {
  padding: 20rpx 30rpx 40rpx;
  background: #fff;
  .info {
    display: flex;
    justify-content: space-between;
    line-height: 60rpx;
    &-content {
      color: $u-type-info;
    }
  }
  .title {
    padding: 30rpx 0;
    margin-bottom: 20rpx;
    font-size: 40rpx;
    font-weight: bold;
    display: flex;
    align-items: center;
    &-text {
      margin-left: 20rpx;
    }
  }
}
.form-content {
  padding: 20rpx 30rpx 106rpx;
  .form-color {
    background: #fff;
  }
}
.form-title {
  height: 92rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24rpx;
  color: $u-type-primary;
  font-family: "Source Han Sans CN";
}
.btn-container {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 90rpx;
  box-sizing: content-box;
  padding-top: 10rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background: #fff;
  .ih-btn {
    flex: 1;
  }
  .ih-btn + .ih-btn {
    padding-left: 20rpx;
  }
}
.text-right {
  text-align: right;
}
</style>
