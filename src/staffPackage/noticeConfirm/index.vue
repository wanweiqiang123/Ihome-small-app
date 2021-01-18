<!--
 * @Description: 确认优惠告知书
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 17:32:25
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-18 19:40:38
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
            <u-form-item label="选择栋座">
              <view class="text-right">{{form.buyUnitName}}</view>
            </u-form-item>
            <u-form-item label="选择房号">
              <view class="text-right">{{form.roomNumberName}}</view>
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
                label="业主姓名"
              >
                <view class="text-right">{{i.ownerName}}</view>
              </u-form-item>
              <u-form-item
                :key="n"
                label="手机号码"
              >
                <view class="text-right">{{i.ownerMobile}}</view>
              </u-form-item>
              <u-form-item
                :key="n"
                label="身份证号"
              >
                <view class="text-right">{{i.ownerCertificateNo}}</view>
              </u-form-item>
            </template>
            <u-gap
              height="20"
              bg-color="#f1f1f1"
            ></u-gap>
            <u-form-item
              label="优惠告知书附件"
              label-position="top"
              v-if="fileList.length"
            >
              <u-upload
                width="180"
                height="180"
                name="files"
                :file-list="fileList"
                :deletable="fasle"
              ></u-upload>
            </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="btn-container safe-area-inset-bottom">
        <u-button
          size="default"
          type="primary"
          shape="circle"
          @click="submit"
        >确认</u-button>
      </view>
      <!-- 选择器 -->
      <u-select
        v-model="buildShow"
        :list="selectBuildList"
        safe-area-inset-bottom
        title="选择栋座"
        value-name="buildingId"
        label-name="buildingName"
        @confirm="buildConfirm"
      ></u-select>
      <u-select
        v-model="roomShow"
        :list="roomSelectList"
        safe-area-inset-bottom
        title="选择房号"
        value-name="roomId"
        label-name="roomNo"
        @confirm="roomConfirm"
      ></u-select>
    </view>
  </LoginPage>
</template>

<script>
import {
  getNoticeInfo,
  postNoticeManagement,
  postBuildByProId,
  postRoomByProId,
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
      },
      buildShow: false,
      selectBuildList: [],
      roomShow: false,
      roomSelectList: [],
      fileList: [],
    };
  },
  methods: {
    async getInfo(id) {
      if (id) {
        const res = await getNoticeInfo({ id });
        Object.assign(this.form, res);
        this.fileList = res.noticeAttachmentList
          .filter((i) => i.type === "NoticeAttachment")
          .map((val) => ({
            url: `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${val.fileNo}`,
          }));
      }
    },
    roomConfirm(val) {
      let item = val[0];
      this.form.roomNumberId = item.value;
      this.form.roomNumberName = item.label;
    },
    async handleShowRoom() {
      this.roomSelectList = await postRoomByProId({
        proId: this.form.projectId,
        buildingId: this.form.buyUnit,
      });
      this.roomShow = true;
    },
    buildConfirm(val) {
      let item = val[0];
      this.form.buyUnit = item.value;
      this.form.buyUnitName = item.label;
      this.form.roomNumberName = "";
    },
    async submit() {
      try {
        await postNoticeManagement(this.form.id);
        this.$tool.toast("确认成功");
        this.$tool.back(null, {
          type: "update",
          data: { ...this.form, notificationStatus: "WaitBeSigned" },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  async onLoad(option) {
    await this.getInfo(option.id);
    this.selectBuildList = await postBuildByProId({
      proId: this.form.projectId,
    });
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
