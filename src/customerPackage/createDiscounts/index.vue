<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-13 15:23:42
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-19 15:23:47
-->
<template>
  <LoginPage>
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
            <view class="color">{{form.proName}}</view>
          </view>
          <view class="body-msg">
            <view>优惠方式</view>
            <view class="color">{{form.explain}}</view>
          </view>
          <view class="body-msg">
            <view>服务费金额</view>
            <view class="color">¥{{form.paymentAmount?form.paymentAmount:0}}</view>
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
          >
            <u-input
              v-model="form.buyUnitName"
              type="select"
              placeholder="请选择栋座"
              @click="buildingBlockShow = true"
            />
          </u-form-item>
          <u-form-item
            label="选择房号"
            right-icon="arrow-right"
            class="hide-icon"
            prop="roomNo"
          >
            <u-input
              v-model="form.roomNo"
              type="select"
              placeholder="请选择房号"
              @click="roomNoShow = true"
            />
          </u-form-item>
        </u-form>
        <u-select
          title="选择栋座"
          confirm-color="#dd524d"
          v-model="buildingBlockShow"
          :list="buildingBlockList"
          @confirm="buildingBlockClick"
          value-name="buildingId"
          label-name="buildingName"
        ></u-select>
        <u-select
          title="选择房号"
          confirm-color="#dd524d"
          v-model="roomNoShow"
          :list="roomNoList"
          @confirm="roomNoClick"
          value-name="roomId"
          label-name="roomNo"
        ></u-select>
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
      <view class="button">
        <u-button
          type="primary"
          size="medium"
          @click="submit"
        >保存并预览优惠告知书</u-button>
      </view>
    </view>
  </LoginPage>
</template>

<script>
import { phoneValidator, validIdentityCard } from "../../common/validate.js";
import { getDetailApi, postNoticeCreateApi } from "../../api/customer";
import { postBuildByProId, postRoomByProId } from "../../api/staff";
export default {
  data() {
    return {
      src: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
      buildingBlockShow: false,
      buildingBlockList: [],
      roomNoShow: false,
      roomNoList: [],
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
          { validator: validIdentityCard, trigger: "change" },
        ],
      },
      noticeId: "",
      proId: "",
      form: {
        buyUnitName: "",
        roomNo: "",
      },
      roomRules: {
        buyUnitName: [
          { required: true, message: "请选择栋座", trigger: "change" },
        ],
        roomNo: [{ required: true, message: "请选择房号", trigger: "change" }],
      },
    };
  },
  onLoad(options) {
    this.noticeId = options.id;
  },
  onReady() {
    this.$refs.uForm[0].setRules(this.rules);
    this.$refs.roomFrom.setRules(this.roomRules);
  },
  onShow() {
    if (this.noticeId) {
      this.getInfo();
    }
  },
  methods: {
    // 获取页面信息
    async getInfo() {
      const res = await getDetailApi(this.noticeId);
      this.form = {
        channel: "Customer",
        cycleId: res.termId,
        explain: res.modeDescription,
        noticeAttachmentList: [],
        ownerList: [],
        ownerType: "Personal",
        paymentAmount: res.premiumReceived,
        promotionMethod: "Automatic",
        refundDays: res.partyARefundDays,
        roomNumberId: "",
        templateType: "ElectronicTemplate",
        proName: res.proName,
        buyUnit: "",
        buyUnitName: "",
        roomNo: "",
        roomNumberId: "",
      };
      this.proId = res.proId;
      this.buildingBlockList = await postBuildByProId({
        proId: res.proId,
      });
      this.getRoomList();
    },
    // 获取房号
    async getRoomList(buildNo) {
      this.roomNoList = await postRoomByProId({
        proId: this.proId,
        buildingId: buildNo,
      });
    },
    buildingBlockClick(v) {
      this.form.buyUnitName = v[0].label;
      this.form.buyUnit = v[0].value;
      this.form.roomNo = "";
      this.form.roomNumberId = "";
      this.getRoomList(this.form.buyUnit);
    },
    roomNoClick(v) {
      this.form.roomNo = v[0].label;
      this.form.roomNumberId = v[0].value;
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
      const roomRes = new Promise((resolve, reject) => {
        this.$refs.roomFrom.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      this.arr.push(roomRes);
      Promise.all(this.arr)
        .then(async () => {
          this.form.ownerList = [...this.ownerList];
          console.log(this.form);
          const res = await postNoticeCreateApi(this.form);
          uni.showToast({
            title: "保存成功",
            icon: "none",
          });
          getApp().noticeInfo = {
            ...res,
            notificationType: "Notification",
            type: "view",
          };
          uni.navigateTo({
            url: `/customerPackage/notification/index`,
          });
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