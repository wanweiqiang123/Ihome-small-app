<!--
 * @Description: 确认优惠告知书
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 17:32:25
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-12 12:03:34
-->
<template>
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
          label-width="150"
        >
          <u-form-item
            label="选择栋座"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.buyUnitName"
              type="select"
              placeholder="请选择栋座"
              @click="buildShow = true"
            />
          </u-form-item>
          <u-form-item
            label="选择房号"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.roomNumberName"
              type="select"
              placeholder="请选择房号"
              @click="handleShowRoom"
            />
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
              <u-input
                v-model="i.ownerName"
                placeholder="请输入业主姓名"
              />
            </u-form-item>
            <u-form-item
              :key="n"
              label="手机号码"
            >
              <u-input
                v-model="i.ownerMobile"
                placeholder="请输入手机号码"
              />
            </u-form-item>
            <u-form-item
              :key="n"
              label="身份证号"
            >
              <u-input
                v-model="i.ownerCertificateNo"
                placeholder="请输入身份证号"
              />
            </u-form-item>
          </template>
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
</template>

<script>
import {
  getNoticeInfo,
  postNoticeStatus,
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
    };
  },
  methods: {
    async getInfo(id) {
      if (id) {
        const res = await getNoticeInfo({ id });
        Object.assign(this.form, res);
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
      let params = {
        buyUnit: this.form.buyUnit,
        noticeId: this.form.id,
        ownerList: this.form.ownerList,
        roomNumberId: this.form.roomNumberId,
      };
      try {
        await postNoticeStatus(params);
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
</style>
<style lang="scss">
.form-color {
  .u-form-item {
    padding-left: 20rpx !important;
    padding-right: 20rpx !important;
  }
}
</style>
