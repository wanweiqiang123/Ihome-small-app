<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-17 09:23:15
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-23 18:14:12
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
        <view class="head-title">退款信息</view>
      </view>
      <view
        class="body"
        slot="body"
      >
        <view class="body-msg">
          <view class="">项目名称</view>
          <view class="color">{{info.projectName}}</view>
        </view>
        <view class="body-msg">
          <view class="">优惠方式</view>
          <view class="color">{{info.explain}}</view>
        </view>
        <view class="body-msg">
          <view class="">服务费金额</view>
          <view class="color">¥{{info.paymentAmount?info.paymentAmount: 0}}</view>
        </view>
        <view class="body-msg">
          <view class="">购买单位</view>
          <view class="color">{{info.buyUnitName + info.roomNumberName}}</view>
        </view>
        <view style="border-top: 1px solid #f1f1f1">
          <swiper
            class="swiper"
            :autoplay="false"
            circular
            title
            @change="change"
          >
            <swiper-item
              class="swiper-item"
              v-for="(item, i) in info.ownerList"
              :key="i"
            >
              <view class="swiper-item-title">{{`业主${i+1}`}}</view>
              <view class="swiper-item-msg">
                <view class="swiper-item-detail">姓名
                  <text class="swiper-item-name">{{item.ownerName}}</text>
                </view>
                <view
                  class="swiper-item-detail"
                  style="padding-top: 20rpx"
                >身份证号
                  <text class="swiper-item-identity">{{item.ownerCertificateNo}}</text>
                </view>
                <view
                  class="swiper-item-detail"
                  style="padding-top: 20rpx"
                >手机号码
                  <text class="swiper-item-phone">{{item.ownerMobile}}</text>
                </view>
              </view>
            </swiper-item>
          </swiper>
          <view class="indicator-dots">
            <view
              v-for="(item, i) in info.ownerList"
              :key="i"
              class="indicator-dots-item"
              :class="[current == i ? 'indicator-dots-active' : '']"
            >
            </view>
          </view>
        </view>
      </view>
    </u-card>
    <u-gap
      height="20"
      bg-color="#f3f4f6"
    ></u-gap>
    <view class="owner">
      <u-form
        :model="form"
        ref="uForm"
        label-width="150"
      >
        <u-form-item
          label="开户银行"
          required
          prop="bankName"
          right-icon="arrow-right"
          class="hide-icon"
        >
          <u-input
            v-model="form.bankName"
            type="select"
            placeholder="请选择开户银行"
            @click="gotoSearch"
          />
        </u-form-item>
        <u-form-item
          required
          label="开户人"
          prop="accountHolderName"
        >
          <u-input
            v-model="form.accountHolderName"
            placeholder="请输入开户人姓名"
          />
        </u-form-item>
        <u-form-item
          required
          label="银行帐号"
          prop="account"
        >
          <u-input
            v-model="form.account"
            placeholder="请输入银行帐号"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="button">
      <u-button
        type="primary"
        size="medium"
        @click="submit"
      >保存并预览退款申请书</u-button>
    </view>
  </view>
</template>

<script>
import { getNoticeRefundApi, postUpdateRefundApi } from "../../api/customer";
export default {
  data() {
    return {
      src: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
      info: {
        buyUnitName: "",
        projectName: "",
        explain: "",
        paymentAmount: "",
        roomNumberName: "",
        ownerList: [],
      },
      form: {
        accountHolderName: "",
        account: "",
        bankName: "",
        branchName: "",
        cityName: "",
        provinceName: "",
        noticeId: "",
      },
      list: [],
      rules: {
        accountHolderName: [
          {
            required: true,
            message: "请输入开户人姓名",
            trigger: "change",
          },
        ],
        account: [
          {
            required: true,
            message: "请输入银行帐号",
            trigger: "change",
          },
        ],
        bankName: [
          {
            required: true,
            message: "请输入银行名称",
            trigger: "change",
          },
        ],
      },
      noticeId: "",
      current: 0,
    };
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  async onLoad(options) {
    this.noticeId = options.id;
    const res = await getNoticeRefundApi(this.noticeId);
    this.info = { ...res };
  },
  onShow() {
    let item = getApp().globalData.searchBackData;
    if (item) {
      switch (item.type) {
        case "branch":
          this.form.bankName = item.data.branchName;
          this.form.branchName = item.data.branchName;
          this.form.provinceName = item.data.provinceName;
          this.form.cityName = item.data.cityName;
          break;
      }
    }
  },
  methods: {
    gotoSearch() {
      getApp().globalData.searchParams = {
        api: "postBankBranchApi",
        key: "branchName",
        id: "branchNo",
        type: "branch",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    change(e) {
      this.current = e.detail.current;
    },
    submit() {
      this.$refs.uForm.validate(async (valid) => {
        if (valid) {
          this.form.noticeId = Number(this.noticeId);
          console.log(this.form);
          const res = await postUpdateRefundApi(this.form);
          uni.showToast({
            title: "保存成功",
            icon: "none",
          });
          getApp().noticeInfo = {
            id: res.noticeId,
            templateId: res.templateId,
            notificationType: "RefundApplication",
            type: "sign",
          };
          uni.redirectTo({
            url: `/customerPackage/notification/index`,
          });
        } else {
          console.log("验证失败");
        }
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
    font-size: 16px;
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

.owner {
  padding: 0 40rpx;
}

.button {
  padding: 50rpx 0;
  text-align: center;
}

.color {
  color: #999999;
}

.swiper {
  padding: 0 21rpx;
  height: 360rpx;
  &-item {
    padding-right: 5rpx;
    box-sizing: border-box;
    &-title {
      padding: 30rpx 0 28rpx 0;
      text-align: center;
      font-size: 32rpx;
      font-weight: 600;
    }
    &-msg {
      background-color: #e6f1fc;
      box-sizing: border-box;
      border-radius: 14rpx;
      padding: 48rpx 56rpx 50rpx 29rpx;
    }
    &-detail {
      position: relative;
    }
    &-name,
    &-identity,
    &-phone {
      position: absolute;
      left: 40%;
    }
  }
}
.indicator-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30rpx;
}

.indicator-dots-item {
  background-color: $u-tips-color;
  height: 16rpx;
  width: 16rpx;
  border-radius: 10px;
  margin: 0 3px;
}

.indicator-dots-active {
  background-color: #4881f9;
}
</style>