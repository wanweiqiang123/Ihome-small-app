<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-13 15:23:42
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-25 19:21:46
-->
<template>
  <view class="info safe-area-inset-bottom">
    <view class="info-first">
      <view class="info-first-title">
        <view>
          <view class="info-first-way">优惠方式</view>
          <view class="info-first-discount">{{info.discountInformationResponseVo.explain | emptyFilter}}</view>
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
          <view>已付{{ info.discountInformationResponseVo.paid | emptyFilter }}</view>
          <view>应付{{ info.discountInformationResponseVo.paymentAmount | emptyFilter }}</view>
        </view>
        <!-- 客户待签署 -->
        <template v-if="info.notificationStatus === 'WaitBeSigned'">
          <view
            class="receipt-text"
            style="color: #F56C6C"
            @click="gotoSign('Notification')"
          >您还未签署优惠告知书，点击前往处理</view>
        </template>
        <!-- 信息待确认 -->
        <template v-else-if="info.notificationStatus === 'WaitDetermine'">
          <view class="receipt-text">信息待确认</view>
        </template>
        <!-- 客户待支付 -->
        <template v-else-if="info.notificationStatus === 'WaitPay'">
          <template v-if="isRefund && isWaitBeSigned">
            <view
              style="color: #F56C6C"
              class="receipt-text"
              @click="handleToRefund()"
            >您有一份退款申请待签署，点击前往处理</view>
            <!-- gotoSign('RefundApplication') -->
          </template>
          <template v-else>
            <view class="info-first-paid">未付金额</view>
            <view class="info-first-money">{{ info.discountInformationResponseVo.unpaid | emptyFilter }}
              <text style="margin-left: 20rpx; font-size: 24rpx; font-weight: bold">元</text>
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
              <text class="text">您有
                <text style="color: #ff0000; padding: 0 5rpx">{{payAuditNum}}</text>
                笔付款正在审核中
              </text>
            </view>
            <view
              class="info-first-btn"
              v-if="configPay == 'On'"
            >
              <u-button
                v-if="
              Number(info.discountInformationResponseVo.paid) !==
              Number(info.discountInformationResponseVo.paymentAmount)
            "
                type="primary"
                size="medium"
                shape="circle"
                @click="gotoPay(info.discountInformationResponseVo)"
              >去付款</u-button>
            </view>
            <view
              class="info-first-btn"
              v-if="configPay == 'Off'"
            >
              <u-button
                v-if="
              Number(info.discountInformationResponseVo.paid) !==
              Number(info.discountInformationResponseVo.paymentAmount)
            "
                type="primary"
                size="medium"
                shape="circle"
                @click="gotoPay(info.discountInformationResponseVo)"
              >查看当前付款</u-button>
            </view>
          </template>
        </template>
        <!-- 客户已支付 -->
        <template v-else-if="info.notificationStatus === 'Paid'">
          <view
            style="margin-top: 20rpx"
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
          <view class="receipt-text">付款完成，优惠确认中</view>
        </template>
        <!-- 已生效 -->
        <template v-else-if="info.notificationStatus === 'BecomeEffective'">
          <view
            v-if="!isWaitBeSigned"
            style="margin-top: 20rpx"
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
            v-if="isWaitBeSigned"
            class="receipt-text"
          >待客户签署协议</view>
          <template v-else-if="isSupplementaryAgreementOne">
            <view
              style="color: #F56C6C"
              @click="gotoSign('SupplementaryAgreement')"
              class="receipt-text"
            >您有一份协议待签署，点击前往处理
            </view>
          </template>
          <template v-else-if="isSupplementaryAgreementMore">
            <view
              style="color: #F56C6C"
              @click="gotoSignMore()"
              class="receipt-text"
            >您有多份协议待签署，点击前往处理
            </view>
          </template>
          <template v-else>
            <view
              style="color: #19BE6B"
              class="receipt-text"
            >付款完成，优惠已生效</view>
          </template>
        </template>
        <!-- 失效 -->
        <template v-else-if="info.notificationStatus === 'Invalidation'">
          <view
            style="margin-top: 20rpx"
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
            style="color: #F56C6C"
            class="receipt-text"
          >协议已终止，此优惠无效</view>
        </template>
        <template v-else-if="item.notificationStatus === 'ReviewStatus'">
          <view
            style="margin-top: 20rpx"
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
            style="color: #F56C6C"
            class="receipt-text"
          >优惠告知书无效</view>
        </template>
      </view>
    </view>
    <view class="info-second">
      <view class="info-second-title">购房信息</view>
      <view class="info-second-msg">
        <view class="info-second-top">{{info.purchaseInformation.projectName | emptyFilter}}</view>
        <view>{{getDictName(info.purchaseInformation.propertyType, Property) | emptyFilter}} {{info.purchaseInformation.buyUnitName | emptyFilter}} {{info.purchaseInformation.roomNumberName | emptyFilter}}</view>
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
            <view class="swiper-item-title">{{  `${getDictName(info.ownerType, OwnerType)}${i + 1}` }}</view>
            <view class="swiper-item-msg">
              <view class="swiper-item-detail">{{info.ownerType === 'Personal' ? '业主姓名' : '公司名称'}}
                <text class="swiper-item-name">{{ item.ownerName | emptyFilter }}</text>
              </view>
              <view
                class="swiper-item-detail"
                style="padding-top: 20rpx"
              >{{info.ownerType === 'Personal' ? '身份证号' : '经办人号码'}}
                <text class="swiper-item-identity">{{item.ownerCertificateNo | emptyFilter}}</text>
              </view>
              <view
                class="swiper-item-detail"
                style="padding-top: 20rpx"
              >{{info.ownerType === 'Personal' ? '手机号' : '营业执照编号'}}
                <text class="swiper-item-phone">{{ item.ownerMobile | emptyFilter }}</text>
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
        <view style="color: #4881f9">优惠告知书信息</view>
        <view class="all">全部（
          <text style="color: #ff0000">{{ info.noticeList.length }}</text>
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
                  <view class="swiper-item-type">{{getDictName(item.notificationType, NotificationType) | emptyFilter}}</view>
                  <view class="swiper-item-status">{{getDictName(item.notificationStatus, NotificationStatus) | emptyFilter}}</view>
                </view>
                <view class="swiper-item-num">编号（{{ item.noticeNo }}）</view>
              </view>
              <view class="swiper-item-btn">
                <u-button
                  v-if="['BecomeEffective', 'WaitPay', 'WaitReview', 'Invalidation', 'Paid'].includes(item.notificationStatus)"
                  type="primary"
                  size="medium"
                  shape="circle"
                  @click="viewNotice(item)"
                >预览</u-button>
                <u-button
                  v-if="item.notificationStatus === 'WaitBeSigned'"
                  type="primary"
                  size="medium"
                  shape="circle"
                  @click="signNotice(item, 'sign')"
                >去签署</u-button>
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
      <view
        v-if='isSupplementaryAgreementMore'
        class="gotoSign"
        @click="gotoSignMore"
      >
        您有多份协议待签署，点击前往处理
      </view>
    </view>

    <view
      class="info-four"
      v-if="false"
    >
      <view class="info-four-title">退款信息</view>
      <view class="info-four-money">退款金额: 3000.00</view>
      <view class="info-four-msg">
        <view class="pay-list">收款账号
          <text class="pay-list-money">{{ 62100099999828828 }}</text>
        </view>
        <view
          class="pay-list"
          style="padding-top: 10rpx"
        >收款人
          <text class="pay-list-money">杨伟立</text>
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
import {
  getWechatNoticeInfoApi,
  getCheckIsExistNoPayApi,
  postDeleteByBusinessIdApi,
  getNotCheckNumApi,
  getPreviewApi,
} from "../../api/customer";
import { getAllByTypeApi } from "../../api/index";
import uImage from "../../uview-ui/components/u-image/u-image.vue";
export default {
  components: { uImage },
  data() {
    return {
      configPay: "Off",
      info: {
        discountInformationResponseVo: {
          paid: 0,
          noticeId: null,
          noticeNo: null,
          agentId: null,
          buyUnit: null,
          buyUnitName: null,
          cycleId: null,
          explain: null,
          groupId: null,
          partyAId: null,
          paymentAmount: null,
          projectId: null,
          roomNumberId: null,
          roomNumberName: null,
          unpaid: null,
        },
        noticeList: [],
        purchaseInformation: {
          buyUnit: null,
          buyUnitName: null,
          ownerWeChatList: [],
          projectName: null,
          propertyType: null,
          roomNumberId: null,
          roomNumberName: null,
        },
        refundInfoResponse: {},
      },
      current: 0,
      currents: 0,
      noticeId: "",
      payAuditNum: 0,
      Property: [],
      NotificationType: [],
      NotificationStatus: [],
      PayOpenFlag: [],
      OwnerType: [],
      isShowPayButton: false,
    };
  },
  async onLoad(options) {
    this.noticeId = options.id;
    this.NotificationType = await this.getDictAll("NotificationType");
    this.NotificationStatus = await this.getDictAll("NotificationStatus");
    this.Property = await this.getDictAll("Property");
    this.OwnerType = await this.getDictAll("ownerType");
    this.PayOpenFlag = await this.getDictAll("PayOpenFlag");
    this.configPay = this.PayOpenFlag.find((v) => v.code === "OpenFlag").tag;
  },
  onShow() {
    if (this.noticeId) {
      this.getInfo();
    }
  },
  computed: {
    percent() {
      debugger;
      if (
        this.info?.discountInformationResponseVo?.paid ||
        this.info?.discountInformationResponseVo?.paid === 0
      ) {
        const paid = Number(this.info.discountInformationResponseVo.paid);
        const amount =
          paid / Number(this.info.discountInformationResponseVo.paymentAmount);
        return amount * 100;
      }
    },
    isRefund() {
      return this.info.noticeList
        .map((i) => i.notificationType)
        .includes("RefundApplication");
    },
    isWaitBeSigned() {
      return this.info.noticeList
        .map((i) => i.notificationStatus)
        .includes("WaitBeSigned");
    },
    isSupplementaryAgreementOne() {
      let arr = [];
      arr = this.info.noticeList.filter((v) => {
        return v.notificationType === "SupplementaryAgreement";
      });
      if (arr.length === 1 && arr[0].notificationStatus === "WaitBeSigned") {
        return true;
      } else {
        return false;
      }
    },
    isSupplementaryAgreementMore() {
      let arr = [];
      arr = this.info.noticeList.filter((v) => {
        return v.notificationType === "SupplementaryAgreement";
      });
      let some = arr.some((v) => v.notificationStatus === "WaitBeSigned");
      if (arr.length > 1 && some) return true;
      else return false;
    },
  },
  methods: {
    async getInfo() {
      if (this.noticeId) {
        const res = await getWechatNoticeInfoApi({
          noticeId: this.noticeId,
        });
        this.info = { ...res };
        this.payAuditNum = await getNotCheckNumApi(this.noticeId);
      }
    },

    handleToRefund() {
      const arr = this.info.noticeList.filter(
        (v) => v.notificationType === "RefundApplication"
      );
      console.log(arr);
      uni.navigateTo({
        url: `/customerPackage/createRefund/index?id=${arr[0].id}`,
      });
    },

    gotoSign(type) {
      let item = this.info.noticeList.find((v) => v.notificationType === type);
      if (item) {
        this.signNotice(item, "sign");
      }
    },

    gotoSignMore() {
      getApp().signMoreData = this.info.noticeList.filter(
        (v) => v.notificationStatus === "WaitPay"
      );
      uni.navigateTo({
        url: `/customerPackage/signMore/index`,
      });
    },

    // 签署
    signNotice(val, type) {
      if (val.notificationType === "RefundApplication") {
        this.handleToRefund();
      } else {
        getApp().noticeInfo = { ...val, type: type };
        uni.navigateTo({
          url: `/customerPackage/notification/index`,
        });
      }
    },

    // 预览
    async viewNotice(val) {
      if (val.templateType !== "ElectronicTemplate") {
        if (val.noticeAttachmentList.length) {
          let preList = val.noticeAttachmentList.map((i) =>
            this.$tool.getFileUrl(i.fileNo)
          );
          uni.previewImage({
            urls: preList,
            current: 1,
          });
        } else {
          this.$tool.toast("附件为空");
        }
      } else {
        switch (val.notificationStatus) {
          case "WaitPay":
          case "WaitReview":
          case "Paid":
            const res = await getPreviewApi(this.noticeId);
            if (res) {
              getApp().globalData.webViewSrc = res;
              uni.navigateTo({
                url: `/pages/webView/preview/index`,
              });
            }
            break;
          case "BecomeEffective":
          case "Invalidation":
            let url = this.$tool.getFileUrl(val.templateId);
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
      }
    },
    async gotoPay(obj) {
      getApp().paidData = {
        ...obj,
        businessId: this.noticeId,
        businessCode: this.info.noticeNo,
      };
      uni.navigateTo({
        url: `/customerPackage/paymentMethod/index`,
      });
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
        return item?.name ? item.name : "";
      }
    },
  },
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
        background-image: url("../common/img/coupon.png");
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
      padding: 19rpx 0 0 2rpx;
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
            padding: 20rpx 38rpx;
          }
          &-detail {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 20rpx;
          }

          &-type {
            font-weight: 600;
            font-size: 26rpx;
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

.receipt-text {
  padding: 30rpx 0;
  text-align: center;
  color: $u-type-primary;
}

.gotoSign {
  text-align: center;
  color: #f56c6c;
  padding-bottom: 20rpx;
}
</style>