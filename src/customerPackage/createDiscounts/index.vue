<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-13 15:23:42
 * @LastEditors: wwq
 * @LastEditTime: 2021-05-11 10:03:30
-->
<template>
  <view>
    <u-card
      :border="false"
      padding="20"
      margin="30rpx 30rpx 0 30rpx"
    >
      <view
        class="head"
        slot="head"
      >
        <view>
          <img
            class="head-img"
            :src="src"
            alt=""
          >
        </view>
        <view class="head-title">优惠信息</view>
      </view>
      <view
        class="body"
        slot="body"
      >
        <view class="body-msg">
          <view>项目名称</view>
          <view class="color">{{form.proName | emptyFilter}}</view>
        </view>
        <view class="body-msg">
          <view>优惠方式</view>
          <view class="color">{{form.explain | emptyFilter}}</view>
        </view>
        <view class="body-msg">
          <view>服务费金额</view>
          <view class="color">¥{{form.paymentAmount | emptyFilter}}</view>
        </view>
      </view>
    </u-card>
    <u-gap
      height="20"
      bg-color="#f3f4f6"
    ></u-gap>
    <view class="select">
      <u-form
        class="select-msg"
        :model="form"
        ref="roomFrom"
        label-width="190"
      >
        <u-form-item
          label="选择栋座"
          right-icon="arrow-right"
          class="hide-icon"
          prop="buyUnitName"
          :required="!isRecognize"
        >
          <u-input
            v-model="form.buyUnitName"
            type="select"
            :placeholder="`${isRecognize ? '认筹阶段可不选择栋座': '请选择栋座'}`"
            @click="handleShowBuild"
          />
        </u-form-item>
        <u-form-item
          label="选择房号"
          right-icon="arrow-right"
          class="hide-icon"
          prop="roomNo"
          :required="!isRecognize"
        >
          <u-input
            v-model="form.roomNo"
            type="select"
            :placeholder="`${isRecognize ? '认筹阶段可不选择房号':'请选择房号'}`"
            @click="handleShowRoom"
          />
        </u-form-item>
      </u-form>
    </view>
    <u-gap
      height="80"
      bg-color="#f3f4f6"
    ></u-gap>
    <view class="owner">
      <view class="owner-tilte">
        <view class="owner-tilte-left">业主信息</view>
        <view class="owner-tilte-right">如有多个业主通过右侧“
          <u-icon
            name="plus-circle"
            size="32"
          ></u-icon>
          ”按钮新增
        </view>
      </view>
      <template v-for="(item, i) in ownerList">
        <view
          class="owner-layout"
          :key="i"
        >
          <u-form
            :model="item"
            :ref="`uForm`"
            class="owner-msg"
            label-width="190"
          >
            <u-form-item
              class="owner-msg-item"
              label="业主姓名"
              required
              prop="ownerName"
            >
              <u-input
                v-model="item.ownerName"
                :auto-height="autoHeight"
                placeholder="请输入姓名"
                clearable
              />
            </u-form-item>
            <u-form-item
              class="owner-msg-item"
              label="手机号码"
              required
              prop="ownerMobile"
            >
              <u-input
                v-model="item.ownerMobile"
                :auto-height="autoHeight"
                placeholder="请输入手机号码"
                clearable
              />
            </u-form-item>
            <u-form-item
              class="owner-msg-item"
              label="身份证号"
              required
              prop="ownerCertificateNo"
            >
              <u-input
                v-model="item.ownerCertificateNo"
                :auto-height="autoHeight"
                placeholder="请输入身份证号"
                clearable
              />
            </u-form-item>
          </u-form>
          <view
            v-if="i === 0"
            class="owner-icon"
            @click="addOwner"
          >
            <u-icon
              name="plus-circle"
              color="#2979ff"
              size="32"
            ></u-icon>
          </view>
          <view
            v-else
            class="owner-icon"
            @click="subtractOwner(i)"
          >
            <u-icon
              name="close-circle"
              color="#2979ff"
              size="32"
            ></u-icon>
          </view>
        </view>
        <u-gap
          :key="i"
          height="20"
          bg-color="#f3f4f6"
        ></u-gap>
      </template>
    </view>
    <view>
      <u-form
        label-width="220"
        label-position="top"
      >
        <u-form-item label="认购书附件">
          <u-upload
            width="180"
            height="180"
            name="files"
            :action="$tool.getUploadUrl()"
            :header="header"
            :show-progress="false"
            :before-upload="beforeUpload"
            :file-list="subFileList"
            @on-success="subscriptionSuccess"
            @on-remove="subscriptionRemove"
          ></u-upload>
        </u-form-item>
      </u-form>
    </view>
    <view class="button">
      <u-button
        type="primary"
        size="medium"
        :loading="submitLoading"
        @click="submit"
      >保存并预览优惠告知书</u-button>
    </view>
  </view>
</template>

<script>
import { phoneValidator } from "../../common/validate.js";
import { getDetailApi, postNoticeCreateApi } from "../../api/customer";
import {
  postBuildByProId,
  postRoomByProId,
  getRecognizeById,
} from "../../api/staff";
import storageTool from "@/common/storageTool";
export default {
  data() {
    return {
      src: require("@/static/logo.png"),
      ownerList: [
        {
          ownerName: "",
          ownerMobile: "",
          ownerCertificateNo: "",
        },
      ],
      arr: [],
      rules: {
        ownerName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change",
          },
        ],
        ownerMobile: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "change",
          },
          { validator: phoneValidator, trigger: "change" },
        ],
        ownerCertificateNo: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "change",
          },
        ],
      },
      noticeId: "",
      proId: "",
      form: {
        buyUnitName: "",
        roomNo: "",
        noticeAttachmentList: [],
      },
      isRecognize: false,
      roomRules: {
        buyUnitName: [
          { required: true, message: "请选择栋座", trigger: "change" },
        ],
        roomNo: [{ required: true, message: "请选择房号", trigger: "change" }],
      },
      header: {
        Authorization: "bearer " + storageTool.getToken(),
      },
      subFileList: [],
      subscriptionFile: [],
      submitLoading: false,
    };
  },
  onLoad(options) {
    if (options && options.scene) {
      const scene = decodeURIComponent(options.scene);
      console.log(scene, "scene");
      this.noticeId = scene;
      console.log(this.noticeId, "noticeId");
    }
    let url =
      "/pages/login/index/index?redirect=" +
      encodeURIComponent(
        `customerPackage/createDiscounts/index?scene=${this.noticeId}`
      );
    console.log(url, "url");
    if (!storageTool.getToken()) {
      uni.redirectTo({
        url: url,
      });
    }
  },
  onReady() {
    this.$refs.uForm[0].setRules(this.rules);
    this.$refs.roomFrom.setRules(this.roomRules);
  },
  async onShow() {
    let item = getApp().globalData.searchBackData;
    if (this.noticeId) {
      await this.getInfo();
    } else {
      this.$tool.toast(`优惠告知书Id不存在`);
    }
    if (item && item.type === "building") {
      this.buildingBlockClick(item.data);
      getApp().globalData.searchBackData = {};
    }
    if (item && item.type === "roomNo") {
      this.roomNoClick(item.data);
      getApp().globalData.searchBackData = {};
    }
  },
  methods: {
    // 获取页面信息
    async getInfo() {
      const res = await getDetailApi(this.noticeId);
      console.log(res);
      switch (res.state) {
        case "Start":
          Object.assign(this.form, {
            channel: "Customer",
            cycleId: res.termId,
            explain: res.modeDescription,
            noticeAttachmentList: [],
            ownerList: [],
            ownerType: "Personal",
            paymentAmount: res.premiumReceived,
            promotionMethod: "Automatic",
            refundDays: res.partyARefundDays,
            templateType: "ElectronicTemplate",
            proName: res.proName,
            exPreferentialItem: res.exPreferentialItem,
          });
          this.proId = res.proId;
          this.isRecognize = await getRecognizeById(res.termId);
          break;
        default:
          uni.reLaunch({
            url: `/customerPackage/createDiscounts/invalid?type=${res.state}`,
          });
          break;
      }
      this.roomRules = {
        buyUnitName: [
          {
            required: !this.isRecognize,
            message: "请选择栋座",
            trigger: "change",
          },
        ],
        roomNo: [
          {
            required: !this.isRecognize,
            message: "请选择房号",
            trigger: "change",
          },
        ],
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
    subscriptionSuccess(data, index, lists, name) {
      this.subscriptionFile[index] = {
        fileNo: lists[index].response.data[0].fileId,
        attachmentSuffix:
          lists[index].response?.data[0].generateFileName +
          "." +
          lists[index].response?.data[0].generateFileType,
        type: "Subscription",
      };
    },
    subscriptionRemove(index, lists, name) {
      this.subscriptionFile.splice(index, 1);
    },
    // 查询房号
    handleShowRoom() {
      if (!this.form.buyUnit) {
        this.$tool.toast("请先选择栋座");
        return;
      }
      getApp().globalData.searchParams = {
        searchTip: "输入房号",
        api: "postRoomByProId",
        key: "roomNo",
        id: "roomId",
        type: "roomNo",
        other: {
          proId: this.proId,
          buildingId: this.form.buyUnit,
          exDeal: 0,
        },
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 查询栋座
    handleShowBuild() {
      getApp().globalData.searchParams = {
        searchTip: "输入栋座",
        api: "postBuildByProId",
        key: "buildingName",
        id: "buildingId",
        type: "building",
        other: {
          proId: this.proId,
        },
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    buildingBlockClick(v) {
      console.log(v);
      this.form.buyUnitName = v.buildingName;
      this.form.buyUnit = v.buildingId;
      this.form.roomNo = "";
      this.form.roomNumberId = "";
    },
    roomNoClick(v) {
      this.form.roomNo = v.roomNo;
      this.form.roomNumberId = v.roomId;
    },
    addOwner() {
      this.ownerList.push({
        ownerName: "",
        ownerMobile: "",
        ownerCertificateNo: "",
      });
      this.$nextTick(() => {
        this.$refs.uForm[this.ownerList.length - 1].setRules(this.rules);
      });
    },
    subtractOwner(i) {
      this.ownerList.splice(i, 1);
    },
    refForm(index, err) {
      let res = new Promise((resolve, reject) => {
        this.$refs.uForm[index].validate((valid) => {
          if (valid) {
            resolve();
          } else {
            reject(err);
          }
        });
      });
      this.arr.push(res);
    },
    submit() {
      this.arr = [];
      this.ownerList.forEach((v, i) => {
        this.refForm(i, this.ownerList[i]);
      });
      if (!this.isRecognize) {
        const roomRes = new Promise((resolve, reject) => {
          this.$refs.roomFrom.validate((val) => {
            val ? resolve() : reject(err);
          });
        });
        this.arr.push(roomRes);
      }
      Promise.all(this.arr)
        .then(async () => {
          this.form.ownerList = [...this.ownerList];
          this.form.noticeAttachmentList = this.subscriptionFile;
          console.log(this.form);
          try {
            this.submitLoading = true;
            const res = await postNoticeCreateApi(this.form);
            uni.showToast({
              title: "保存成功",
              icon: "none",
            });
            getApp().noticeInfo = {
              id: res.noticeId,
              templateId: res.templateId,
              notificationType: "Notification",
              type: "view",
            };
            uni.navigateTo({
              url: `/customerPackage/notification/index`,
            });
          } catch (error) {
            console.log(error);
            this.submitLoading = false;
          }
        })
        .catch(() => {
          console.log("验证不通过");
        });
    },
  },
};
</script>

<style lang="scss">
.head {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &-img {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
  }
  &-title {
    margin-left: 30rpx;
    font-weight: bold;
    font-size: 32rpx;
  }
}

.body {
  &-msg {
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.select {
  padding: 0 40rpx;
  &-msg {
    height: 80rpx;
    & + & {
      border-top: 1px solid #f3f4f6;
    }
  }
}

.owner {
  position: relative;
  &-tilte {
    width: 100%;
    padding: 0 50rpx;
    position: absolute;
    top: -60rpx;
    display: flex;
    justify-content: space-between;
    &-right {
      color: #d9001b;
      font-size: 28rpx;
    }
  }
  &-layout {
    padding: 0 30rpx 0 40rpx;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  &-msg {
    width: 95%;
    &-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  &-icon {
    width: 80rpx;
    line-height: 300rpx;
    text-align: right;
  }
}

.button {
  padding: 50rpx 0;
  text-align: center;
}

.color {
  color: #999999;
}
</style>