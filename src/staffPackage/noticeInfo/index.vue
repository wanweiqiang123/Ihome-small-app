<!--
 * @Description: 查看优惠告知书信息
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-18 11:38:42
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-28 10:22:02
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
            <u-form-item
              label="优惠告知书预览"
              v-if="!isPaper"
            >
              <view class="text-right">
                <u-button
                  size="mini"
                  type="success"
                  @click="handleGoto"
                >预览</u-button>
              </view>
            </u-form-item>
            <u-form-item
              label="优惠告知书附件"
              label-position="top"
              v-else
            >
              <u-upload
                width="180"
                height="180"
                name="files"
                ref="fileRef"
                :file-list="fileList"
                :action="action"
                :header="header"
                :show-progress="false"
                :before-upload="beforeUpload"
                :before-remove="beforeRemove"
                @on-success="successChange"
                @on-remove="removeChange"
              ></u-upload>
            </u-form-item>
          </u-form>
        </view>
        <template v-if="isPaper">
          <u-gap
            height="20"
            bg-color="#f1f1f1"
          ></u-gap>
          <u-button
            shape="circle"
            type="primary"
            class="ih-btn"
            @click="submitFile()"
          >提交附件</u-button>
        </template>
      </view>
    </view>
  </LoginPage>
</template>

<script>
import { currentEnvConfig } from "../../env-config.js";
import storageTool from "../../common/storageTool.js";
import {
  getNoticeInfo,
  postUploadAnnex,
  getRecognizeById,
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
      },
      option: {},
      isPaper: false,
      action: `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/upload`,
      header: {
        Authorization: "bearer " + storageTool.getToken(),
      },
      fileList: [],
      noticeAttachmentList: [],
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
        console.log(this.fileList);
      }
    },
    handleGoto() {
      let url = `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${this.form.templateId}.pdf`;
      getApp().globalData.webViewSrc = url;
      console.log(url);
      uni.navigateTo({
        url: `/customerPackage/webView/index`,
      });
      // uni.navigateTo({
      //   url: `/staffPackage/noticePreview/index?id=${this.form.id}&tId=${this.form.templateId}&type=${this.form.notificationType}&sign=${this.form.notificationStatus}`,
      // });
    },
    beforeUpload() {
      uni.showToast({
        icon: "loading",
        title: "正在上传...",
        duration: 500000000000,
      });
      return true;
    },
    beforeRemove(index, lists) {
      console.log(index, lists);
      if (lists[index].response) {
        return true;
      } else {
        return false;
      }
    },
    successChange(data, index, lists, name) {
      this.noticeAttachmentList[index] = {
        fileNo: lists[index].response.data[0].fileId,
        attachmentSuffix:
          lists[index].response?.data[0].generateFileName +
          "." +
          lists[index].response?.data[0].generateFileType,
        type: "NoticeAttachment",
        contractId: this.option.id,
      };
    },
    removeChange(index, lists, name) {
      this.noticeAttachmentList.splice(index, 1);
    },
    async submitFile() {
      try {
        let list = this.noticeAttachmentList.filter((i) => !!i);
        console.log(list);
        if (list.length) {
          await postUploadAnnex(list);
          this.$tool.toast("上传成功");
          this.noticeAttachmentList = [];
          this.$refs.fileRef.clear();
          this.getInfo(this.form.id);
          // this.$tool.back(null, { type: "update", page: null });
        } else {
          this.$tool.toast("请先上传附件");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  onLoad(option) {
    this.getInfo(option.id);
    this.option = option;
    this.isPaper = option.tempType === "PaperTemplate";
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
  padding: 20rpx 30rpx;
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
}
.text-right {
  text-align: right;
}
</style>
