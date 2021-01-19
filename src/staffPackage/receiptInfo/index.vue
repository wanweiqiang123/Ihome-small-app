<!--
 * @Description: 购房优惠收款详情
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-19 15:46:14
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-19 18:10:53
-->
<template>
  <view class="receipt info">
    <view class="info-first">
      <view class="info-first-title">
        <view>
          <view class="info-first-way">优惠方式</view>
          <view class="info-first-discount">{{info.discountInformationResponseVo.explain}}</view>
        </view>
        <view class="background"></view>
      </view>
      <view style="padding: 0 19rpx">
        <view class="info-first-progress">
          <u-line-progress
            height="18"
            active-color="#4881F9"
            :show-percent="false"
            :percent="percent"
            :striped-active="true"
          ></u-line-progress>
        </view>
        <view class="info-first-msg">
          <view>已付{{info.discountInformationResponseVo.paid}}</view>
          <view>应付{{info.discountInformationResponseVo.paymentAmount}}</view>
        </view>
        <view class="info-first-paid">待收金额(元)</view>
        <view class="info-first-money">{{info.discountInformationResponseVo.unpaid}}
          <text style="margin-left:20rpx;font-size: 24rpx;font-weight: bold;">元</text>
        </view>
        <view
          class="info-first-detail"
          @click="payHistory(noticeId)"
        >
          <u-icon
            name="arrow-right"
            width="12"
            height="22"
            color="#666666"
          ></u-icon>
          <text>付款明细</text>
        </view>
        <view
          v-if="payAuditNum"
          class="info-first-audit"
          @click="payAuditing(noticeId)"
        >
          <u-icon
            name="arrow-right"
            size="28"
            color="#666666"
          ></u-icon>
          <text class="text">有
            <text style="color:#FF0000;padding: 0 5rpx">{{payAuditNum}}</text>
            笔付款正在审核中
          </text>
        </view>
        <view
          class="info-first-btn"
          v-if="true"
        >
          <u-button
            type="primary"
            size="medium"
            shape="circle"
          >添加收款</u-button>
        </view>
      </view>
    </view>
    <view class="info-second">
      <view class="info-second-title">购房信息</view>
      <view class="info-second-msg">
        <view class="info-second-top">{{info.purchaseInformation.projectName}}</view>
        <view class="info-second-bottom">{{`${getDictName(info.purchaseInformation.propertyType, Property)}-${info.purchaseInformation.buyUnit}-${info.purchaseInformation.roomNumberName}`}}</view>
      </view>
      <view class="info-second-wrap">
        <swiper
          class="swiper"
          :autoplay="false"
          circular
          title
          @change="change"
        >
          <swiper-item
            class="swiper-item"
            v-for="(item, i) in info.purchaseInformation.ownerWeChatList"
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
            v-for="(item, i) in info.purchaseInformation.ownerWeChatList"
            :key="i"
            class="indicator-dots-item"
            :class="[current == i ? 'indicator-dots-active' : '']"
          >
          </view>
        </view>
      </view>
    </view>
    <view class="info-third">
      <view class="info-third-title">
        <view style="color: #4881f9;">优惠告知书信息</view>
        <view class="all">全部（
          <text style="color: #FF0000">{{info.noticeList.length}}</text>
          ）
        </view>
      </view>
      <view class="info-third-wrap">
        <swiper
          class="swiper"
          :autoplay="false"
          circular
          title
          @change="changemsg"
        >
          <swiper-item
            class="swiper-item"
            v-for="(item, i) in info.noticeList"
            :key="i"
          >
            <view class="swiper-item-msg">
              <view class="swiper-item-layout">
                <view class="swiper-item-detail">
                  <view class="swiper-item-type">{{`${getDictName(item.notificationType, NotificationType)}`}}</view>
                  <view class="swiper-item-num">编号（{{item.noticeNo}}）</view>
                </view>
                <view class="swiper-item-status">{{`${getDictName(item.notificationStatus, NotificationStatus)}`}}</view>
              </view>
              <view class="swiper-item-btn">
                <u-button
                  v-if="item.notificationStatus === 'BecomeEffective'"
                  type="primary"
                  size="medium"
                  shape="circle"
                  @click="gotoNotice(item)"
                >查看</u-button>
                <u-button
                  v-if="item.notificationStatus === 'WaitBeSigned'"
                  type="primary"
                  size="medium"
                  shape="circle"
                  @click="gotoNotice(item)"
                >转发</u-button>
              </view>
            </view>
          </swiper-item>
        </swiper>
        <view class="indicator-dots">
          <view
            v-for="(item, i) in info.noticeList"
            :key="i"
            class="indicator-dots-item"
            :class="[currents == i ? 'indicator-dots-active' : '']"
          >
          </view>
        </view>
      </view>
    </view>

    <view class="info-four">
      <view class="info-four-title">退款信息</view>
      <view class="info-four-money">退款金额: 3000.00</view>
      <view class="info-four-msg">
        <view class="pay-list">收款账号
          <text class="pay-list-money">{{62100099999828828}}</text>
        </view>
        <view
          class="pay-list"
          style="padding-top: 10rpx"
        >收款人
          <text class="pay-list-money">皮小强</text>
        </view>
        <view
          class="pay-list"
          style="padding-top: 10rpx"
        >退款时间
          <text class="pay-list-money">2020-12-20 23:59:59</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getWechatNoticeInfoApi, getNotCheckNumApi } from "../../api/staff";
import { getAllByTypeApi } from "../../api/index";

export default {
  data() {
    return {
      info: {
        discountInformationResponseVo: {},
        noticeId: null,
        noticeNo: null,
        noticeList: [],
        purchaseInformation: {},
      },
      current: 0,
      currents: 0,
      noticeId: "",
      // show: false,
      payAuditNum: 0,
      Property: [],
      NotificationType: [],
      NotificationStatus: [],
    };
  },
  computed: {
    perceent() {
      if (this.obj?.discountInformationResponseVo?.paid) {
        const paid = Number(info.discountInformationResponseVo.paid);
        const amount =
          paid / Number(info.discountInformationResponseVo.paymentAmount);
        return amount * 100;
      }
    },
  },
  methods: {
    async getInfo(noticeId) {
      const res = await getWechatNoticeInfoApi({ noticeId });
      this.info = { ...res };
      this.payAuditNum = await getNotCheckNumApi({ noticeId });
    },
    // 预览
    gotoNotice(val) {
      if (val) {
        uni.navigateTo({
          url: `/staffPackage/noticePreview/index?id=${val.id}&tId=${val.templateId}&type=${val.notificationType}&sign=${val.notificationStatus}`,
        });
      }
    },
    change(e) {
      this.current = e.detail.current;
    },
    changemsg(e) {
      this.currents = e.detail.current;
    },
    payHistory(e) {
      uni.navigateTo({
        url: `/customerPackage/payHistory/index?id=${e}`,
      });
    },
    payAuditing(e) {
      uni.navigateTo({
        url: `/customerPackage/payAuditing/index?id=${e}`,
      });
    },
    // 字典翻译
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 字典匹配
    getDictName(code, list) {
      if (list.length) {
        const item = list.find((v) => v.code === code);
        return item?.name;
      }
    },
  },
  async onLoad(options) {
    this.noticeId = options.id;
    this.getInfo(options.id);
    this.NotificationType = await this.getDictAll("NotificationType");
    this.NotificationStatus = await this.getDictAll("NotificationStatus");
    this.Property = await this.getDictAll("Property");
  },
  async onShow() {},
};
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
  padding: 22rpx 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-first {
    background-color: #fff;
    width: 100%;
    font-family: PingFang SC;
    display: flex;
    flex-direction: column;
    &-title {
      height: 189rpx;
      background-color: #4881f9;
      color: #ffffff;
      position: relative;
      .background {
        width: 406rpx;
        height: 187rpx;
        background-image: url("../common/icon/coupon.png");
        background-size: cover;
        position: absolute;
        right: 0;
      }
      &::before {
        content: "";
        position: absolute;
        top: 176.5rpx;
        left: -12.5rpx;
        width: 25rpx;
        height: 25rpx;
        background: #f1f1f1;
        border-radius: 50%;
      }
      &::after {
        content: "";
        position: absolute;
        top: 176.5rpx;
        right: -12.5rpx;
        width: 25rpx;
        height: 25rpx;
        background: #f1f1f1;
        border-radius: 50%;
      }
    }
    &-way {
      font-size: 36rpx;
      position: absolute;
      top: 46rpx;
      left: 21rpx;
      font-weight: bold;
    }
    &-discount {
      font-size: 32rpx;
      position: absolute;
      top: 103rpx;
      left: 19rpx;
      font-weight: 400;
    }

    &-progress {
      font-size: 0;
      padding: 30rpx 6rpx 0 1rpx;
    }

    &-msg {
      padding-top: 23rpx;
      display: flex;
      justify-content: space-between;
      font-size: 24rpx;
      font-weight: 400;
      color: #666666;
    }

    &-paid {
      color: #333333;
      font-size: 32rpx;
      padding-top: 29rpx;
      font-weight: 600;
      font-family: PingFang SC;
    }

    &-money {
      // padding: 19rpx 0 0 2rpx;
      color: #ff0000;
      font-size: 36rpx;
      font-weight: 600;
    }

    &-detail {
      display: flex;
      flex-direction: row-reverse;
      padding-right: 1rpx;
      text {
        font-size: 26rpx;
        color: #000000;
        font-weight: 400;
        margin-right: 16rpx;
      }
    }

    &-audit {
      padding-right: 1rpx;
      padding-top: 53rpx;
      display: flex;
      flex-direction: row-reverse;
      .text {
        color: #000000;
        font-size: 24rpx;
        font-weight: 400;
        margin-right: 17rpx;
      }
    }

    &-btn {
      text-align: center;
      padding: 28rpx 0 20rpx 0;
    }
  }

  &-second {
    margin-top: 21rpx;
    background-color: #fff;
    width: 100%;

    &-title {
      height: 88rpx;
      font-size: 30rpx;
      font-weight: 400;
      color: #4881f9;
      border-bottom: 1px solid #f2f2f2f2;
      line-height: 88rpx;
      padding-left: 22rpx;
    }

    &-msg {
      padding: 29rpx 0 30rpx 0;
      margin: 0 19rpx;
      font-weight: 600;
      font-size: 32rpx;
      color: #333333;
      border-bottom: 1px solid #f2f2f2f2;
    }
    &-bottom {
      padding-top: 10rpx;
    }
    &-wrap {
      display: flex;
      flex-direction: column;
      padding-bottom: 33rpx;
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
    }
  }

  &-third {
    margin-top: 20rpx;
    background-color: #fff;
    width: 100%;

    &-title {
      height: 88rpx;
      line-height: 88rpx;
      font-size: 30rpx;
      font-weight: 400;
      border-bottom: 1px solid #f2f2f2f2;
      line-height: 88rpx;
      padding-left: 22rpx;
      display: flex;
      justify-content: space-between;
      .all {
        color: #606266;
        font-size: 30rpx;
        font-weight: 400;
      }
    }

    &-wrap {
      display: flex;
      flex-direction: column;
      padding: 30rpx 0rpx 32rpx 2rpx;
      .swiper {
        padding: 0 21rpx;
        height: 278rpx;
        &-item {
          padding-right: 5rpx;
          box-sizing: border-box;
          &-title {
            padding: 20rpx;
            text-align: center;
            font-size: 32rpx;
            font-weight: bold;
          }
          &-msg {
            background-color: #e6f1fc;
            display: flex;
            flex-direction: column;
            border-radius: 14rpx;
            height: 100%;
          }

          &-layout {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          &-detail {
            padding: 39rpx 0 0 27rpx;
          }

          &-type {
            font-weight: 600;
            font-size: 26rpx;
            padding-bottom: 20rpx;
            color: #1f1f1f;
          }
          &-num {
            color: #999999;
            font-size: 26rpx;
            padding-bottom: 48rpx;
          }
          &-status {
            font-weight: 600;
            font-size: 32rpx;
            padding: 36rpx 48rpx 0 0;
            color: #333333;
          }
          &-btn {
            text-align: center;
            padding-bottom: 31rpx;
          }
        }
      }
    }
  }

  &-four {
    margin-top: 31rpx;
    background-color: #fff;
    width: 100%;

    &-title {
      height: 88rpx;
      line-height: 88rpx;
      font-size: 30rpx;
      color: #4881f9;
      border-bottom: 1px solid #f2f2f2f2;
      padding-left: 22rpx;
    }

    &-money {
      margin: 0 21rpx;
      font-weight: 600;
      font-size: 26rpx;
      height: 81rpx;
      line-height: 81rpx;
      color: #1f1f1f;
      border-bottom: 1px solid #f2f2f2f2;
    }

    &-msg {
      padding: 39rpx 20rpx;
      color: #606266;
      .pay-list {
        position: relative;
        .pay-list-money {
          position: absolute;
          right: 0;
        }
      }
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
