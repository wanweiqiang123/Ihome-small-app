<!--
 * @Description: 查看优惠告知书信息
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-18 11:38:42
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-23 08:54:23
-->
<template>
  <LoginPage>
    <view class="notice safe-area-inset-bottom">
      <view class="notice-info">
        <view class="title u-border-bottom">
          <u-image
            width="80rpx"
            height="80rpx"
            :src="logoSrc"
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
              <view class="text-right">{{isRecognize ? (form.buyUnitName || '以最终甲方推送的房号确认书为准') : form.buyUnitName}}</view>
            </u-form-item>
            <u-form-item label="房号">
              <view class="text-right">{{isRecognize ? (form.roomNumberName || '以最终甲方推送的房号确认书为准') : form.roomNumberName}}</view>
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
            <!-- 电子版 -->
            <u-form-item
              label="优惠告知书预览"
              v-if="!isPaper"
            >
              <view class="text-right">
                <u-button
                  v-if="form.notificationStatus === 'BecomeEffective'"
                  size="mini"
                  type="primary"
                  :custom-style="{
                    marginRight: '30rpx'
                  }"
                  @click="handleShow"
                >下载文件</u-button>
                <u-button
                  size="mini"
                  type="success"
                  @click="handleGoto"
                >预览</u-button>
              </view>
            </u-form-item>
            <!-- 纸质版 -->
            <u-form-item
              label="优惠告知书附件"
              label-position="top"
              v-else
            >
              <view class="file-list">
                <template v-for="(i, n) in fileList">
                  <u-image
                    class="list-item"
                    width="180"
                    height="180"
                    :key="n"
                    :src="i.url"
                    @click="filePerview(n)"
                  ></u-image>
                </template>
              </view>
            </u-form-item>
            <template v-if="isOther">
              <u-gap
                height="20"
                bg-color="#f1f1f1"
              ></u-gap>
              <u-form-item
                label="审核意见"
                label-position="top"
              >{{form.reviewOpinion || (form.notificationStatus === 'Invalidation' ? '不通过' : '-')}}</u-form-item>
            </template>
          </u-form>
        </view>
      </view>
      <view class="notice-btn safe-area-inset-bottom">
        <view class="btn-container">
          <u-button
            shape="circle"
            type="success"
            class="ih-btn"
            @click="handleShowFile()"
          >补充附件</u-button>
          <u-button
            v-if="form.notificationStatus === 'WaitPay'"
            shape="circle"
            type="primary"
            class="ih-btn"
            @click="handleToReceipt()"
          >去添加收款</u-button>
        </view>
      </view>
      <!-- 弹窗 -->
      <u-modal
        v-model="isShow"
        :show-title="false"
        confirm-text="一键复制"
        :content="downUrl"
        :content-style="{
          wordBreak: 'break-word'
        }"
        @confirm="modalConfirm"
      ></u-modal>
      <!-- 弹出层 -->
      <u-popup
        v-model="isShowUpload"
        mode="bottom"
        height="100%"
        :mask="false"
        safe-area-inset-bottom
        closeable
      >
        <view class="popup-bady">
          <scroll-view
            scroll-y="true"
            class="popup-cantainer"
          >
            <u-form
              ref="notice"
              label-position="top"
              :border-bottom="false"
            >
              <u-form-item
                label="附件类型"
                :border-bottom="false"
              >
                <u-input
                  v-model="fileTypeData.name"
                  placeholder="请选择"
                  @click="isShowFileType = true"
                  type="select"
                  border
                />
              </u-form-item>
              <u-form-item
                label="附件材料"
                :border-bottom="false"
              >
                <u-upload
                  v-if="fileTypeData.type === 'NoticeAttachment'"
                  width="180"
                  height="180"
                  name="files"
                  ref="fileRef"
                  :file-list="fileList"
                  :action="$tool.getUploadUrl()"
                  :header="header"
                  :show-progress="false"
                  :before-upload="beforeUpload"
                  :before-remove="beforeRemove"
                  @on-success="successChange"
                  @on-remove="removeChange"
                ></u-upload>
                <u-upload
                  v-else-if="fileTypeData.type === 'Subscription'"
                  width="180"
                  height="180"
                  name="files"
                  ref="subscriptionRef"
                  :file-list="subscription"
                  :action="$tool.getUploadUrl()"
                  :header="header"
                  :show-progress="false"
                  :before-upload="beforeUpload"
                  :before-remove="beforeRemove"
                  @on-success="attachmentChange"
                  @on-remove="removeAttachment"
                ></u-upload>
              </u-form-item>
            </u-form>
          </scroll-view>
          <view class="popup-button">
            <u-button
              size="medium"
              shape="circle"
              @click="isShowUpload = false"
            >取 消</u-button>
            <u-button
              size="medium"
              type="primary"
              shape="circle"
              @click="submitFile()"
            >保 存</u-button>
          </view>
        </view>
      </u-popup>
      <!-- 下拉框 -->
      <u-select
        v-model="isShowFileType"
        :list="fileTypeList"
        safe-area-inset-bottom
        title="附件类型"
        @confirm="typeConfirm"
      ></u-select>
    </view>
  </LoginPage>
</template>

<script>
import storageTool from "../../common/storageTool.js";
import {
  getNoticeInfo,
  postUploadAnnex,
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
        promotionMethod: "",
        notificationStatus: "",
      },
      logoSrc: require("@/static/logo.png"),
      option: {},
      isPaper: false,
      header: {
        Authorization: "bearer " + storageTool.getToken(),
      },
      fileList: [],
      noticeAttachmentList: [],
      subscription: [],
      subscriptionList: [],
      isRecognize: false,
      isShow: false,
      downUrl: "",
      isShowUpload: false,
      fileTypeData: {
        type: "",
        name: "",
      },
      isShowFileType: false,
      fileTypeList: [],
    };
  },
  computed: {
    isEnterprise() {
      return this.form.ownerType === "Enterprise";
    },
    isOther() {
      return this.form.promotionMethod === "Manual";
    },
  },
  methods: {
    async getInfo(id) {
      if (id) {
        const res = await getNoticeInfo({ id });
        Object.assign(this.form, res);
        this.isRecognize = await getRecognizeById(res.cycleId);
        this.isPaper = res.templateType === "PaperTemplate";
        this.fileList = res.noticeAttachmentList
          .filter((i) => i.type === "NoticeAttachment")
          .map((val) => ({
            url: this.$tool.getFileUrl(val.fileNo),
          }));
        this.subscription = res.subscriptionAnnex.map((i) => ({
          url: this.$tool.getFileUrl(i.fileNo),
        }));
      }
    },
    handleShowFile() {
      // 是否是纸质
      if (this.isPaper) {
        this.fileTypeList = [
          { value: "Subscription", label: "认购书" },
          { value: "NoticeAttachment", label: "优惠告知书" },
        ];
      } else {
        this.fileTypeList = [{ value: "Subscription", label: "认购书" }];
      }
      this.isShowUpload = true;
    },
    typeConfirm(val) {
      let item = val[0];
      this.fileTypeData.type = item.value;
      this.fileTypeData.name = item.label;
    },
    handleShow() {
      this.downUrl = this.$tool.getFileDownloadUrl(this.form.templateId);
      this.isShow = true;
    },
    filePerview(current) {
      uni.previewImage({
        urls: this.fileList.map((i) => i.url),
        current,
      });
    },
    subscriptionPreview() {
      if (this.form.subscriptionAnnex.length) {
        let preList = this.form.subscriptionAnnex.map((i) =>
          this.$tool.getFileUrl(i.fileNo)
        );
        uni.previewImage({
          urls: preList,
          current: 0,
        });
      } else {
        this.$tool.toast("认购书为空");
      }
    },
    handleToReceipt() {
      // 客户待支付
      uni.navigateTo({
        url: `/staffPackage/receiptInfo/index?id=${this.form.id}`,
      });
    },
    async handleGoto() {
      const list = ["Paid", "WaitPay"];
      if (list.includes(this.form.notificationStatus)) {
        const res = await getPreviewApi(this.form.id);
        if (res) {
          getApp().globalData.webViewSrc = res;
          uni.navigateTo({
            url: `/pages/webView/preview/index`,
          });
        }
      } else {
        let url = this.$tool.getFileUrl(this.form.templateId);
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
    },
    modalConfirm() {
      uni.setClipboardData({
        data: this.downUrl,
        success: () => {
          this.$tool.toast("复制成功, 请前往浏览器打开");
        },
      });
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
    attachmentChange(data, index, lists, name) {
      this.subscriptionList[index] = {
        fileNo: lists[index].response.data[0].fileId,
        attachmentSuffix:
          lists[index].response?.data[0].generateFileName +
          "." +
          lists[index].response?.data[0].generateFileType,
        type: "Subscription",
        contractId: this.option.id,
      };
    },
    // 删除优惠告知书附件
    removeChange(index, lists, name) {
      this.noticeAttachmentList.splice(index, 1);
    },
    // 删除认购书附件
    removeAttachment(index, lists, name) {
      this.noticeAttachmentList.splice(index, 1);
    },
    async submitFile() {
      try {
        let list = this.noticeAttachmentList.filter((i) => !!i); // 告知书附件
        let subscription = this.subscriptionList.filter((i) => !!i); // 认购书附件
        console.log(list, subscription);
        if (list.length || subscription.length) {
          await postUploadAnnex(list.concat(subscription));
          this.$tool.toast("上传成功");
          this.noticeAttachmentList = [];
          this.subscriptionList = [];
          if (this.fileTypeData.type === "Subscription") {
            this.$refs.subscriptionRef.clear();
          } else {
            this.$refs.fileRef.clear();
          }
          this.isShowUpload = false;
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
  },
};
</script>

<style lang="scss" scoped>
.notice {
  background-color: $u-bg-color;
  min-height: 100vh;
}
.notice-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90rpx;
  box-sizing: content-box;
  padding-top: 10rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background: #fff;
  z-index: 10;
  .btn-container {
    display: flex;
  }
  .ih-btn {
    flex: 1;
  }
  .ih-btn + .ih-btn {
    padding-left: 20rpx;
  }
}
.file-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  .list-item {
    margin: 10rpx;
  }
}
.popup-bady {
  padding-top: 80rpx;
  height: 100%;
  .popup-cantainer {
    height: calc(100% - 114rpx);
  }
  .popup-button {
    padding: 14rpx 50rpx 20rpx;
    display: flex;
    justify-content: space-between;
    background: #fff;
  }
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
  padding: 20rpx 30rpx 120rpx;
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
// .btn-container {
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   z-index: 10;
//   height: 90rpx;
//   box-sizing: content-box;
//   padding-top: 10rpx;
//   padding-left: 30rpx;
//   padding-right: 30rpx;
//   background: #fff;
// }
.text-right {
  text-align: right;
}
</style>
