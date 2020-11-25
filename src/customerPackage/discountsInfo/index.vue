<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-13 15:23:42
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-25 11:49:10
-->
<template>
  <view class="info safe-area-inset-bottom">
    <view class="info-first">
      <view class="info-first-title">
        <view class="info-first-way">优惠方式</view>
        <view class="info-first-discount">5万抵10万优惠折扣</view>
      </view>
      <view class="info-first-progress">
        <u-line-progress
          active-color="#2979ff"
          :percent="70"
        ></u-line-progress>
      </view>
      <view class="info-first-msg">
        <view>已付30000.00</view>
        <view>应付50000.00</view>
      </view>
      <view class="info-first-paid">未付金额</view>
      <view class="info-first-money">20000.00
        <text style="margin-left:20rpx;font-size: 24rpx">元</text>
      </view>
      <view
        class="info-first-detail"
        @click="payHistory"
      >
        <u-icon
          name="arrow-right"
          size="28"
        ></u-icon>
        付款明细
      </view>
      <view
        class="info-first-audit"
        @click="payAuditing"
      >
        <u-icon
          name="arrow-right"
          size="28"
        ></u-icon>
        <text>您有
          <text style="color:#FF0000">2</text>
          笔付款正在审核中
        </text>
      </view>
      <view class="info-first-btn">
        <u-button
          type="primary"
          size="medium"
          shape="circle"
          @click="gotoPay"
        >去付款</u-button>
      </view>
    </view>
    <view class="info-second">
      <view class="info-second-title">购房信息</view>
      <view class="info-second-msg">
        <view class="info-second-top">保利拾光年</view>
        <view class="info-second-bottom">住宅-3栋-1908号</view>
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
            v-for="(item, i) in ownerList"
            :key="i"
          >
            <view class="swiper-item-title">{{item.title}}</view>
            <view class="swiper-item-msg">
              <view class="swiper-item-detail">姓名
                <text class="swiper-item-name">{{item.name}}</text>
              </view>
              <view class="swiper-item-detail">身份证号
                <text class="swiper-item-identity">{{item.identity}}</text>
              </view>
              <view class="swiper-item-detail">手机号码
                <text class="swiper-item-phone">{{item.phone}}</text>
              </view>
            </view>
          </swiper-item>
        </swiper>
        <view class="indicator-dots">
          <view
            v-for="(item, i) in ownerList"
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
        <view>全部（
          <text style="color: #FF0000">{{notification.length + 1}}</text>
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
            v-for="(item, i) in notification"
            :key="i"
          >
            <view class="swiper-item-title">{{item.title}}</view>
            <view class="swiper-item-msg">
              <view class="swiper-item-layout">
                <view class="swiper-item-detail">
                  <view class="swiper-item-type">{{item.title}}</view>
                  <view class="swiper-item-num">编号（{{item.num}}）</view>
                </view>
                <view class="swiper-item-status">{{item.status}}</view>
              </view>
              <view class="swiper-item-btn">
                <u-button
                  type="primary"
                  size="medium"
                  shape="circle"
                >预览</u-button>
              </view>
            </view>
          </swiper-item>
        </swiper>
        <view class="indicator-dots">
          <view
            v-for="(item, i) in notification"
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
        <view class="info-four-msg-item">
          <view class="pay-list">收款账号
            <text class="pay-list-money">{{62100099999828828}}</text>
          </view>
          <view class="pay-list">收款人
            <text class="pay-list-money">皮小强</text>
          </view>
          <view class="pay-list">退款时间
            <text class="pay-list-money">1111-11-11 11:11:11</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      ownerList: [
        {
          title: "业主1",
          name: "皮小强",
          identity: "441424199302050555",
          phone: "15119337611",
        },
        {
          title: "业主2",
          name: "皮小强1",
          identity: "44142419930205055x",
          phone: "15119337612",
        },
      ],
      notification: [
        {
          title: "购房优惠告知书",
          num: "899722334783",
          status: "已签署",
        },
        {
          title: "补充协议",
          num: "899722334783",
          status: "已签署",
        },
      ],
      current: 0,
      currents: 0,
    };
  },
  methods: {
    gotoPay() {
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
    payHistory() {
      uni.navigateTo({
        url: `/customerPackage/payHistory/index`,
      });
    },
    payAuditing() {
      uni.navigateTo({
        url: `/customerPackage/payAuditing/index`,
      });
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
    padding: 0 19rpx;
    &-title {
      height: 200rpx;
      background-color: #4881f9;
      color: #fff;
      position: relative;
    }
    &-way {
      font-size: 36rpx;
      position: absolute;
      top: 46rpx;
      left: 21rpx;
    }
    &-discount {
      font-size: 32rpx;
      position: absolute;
      top: 103rpx;
      left: 19rpx;
    }

    &-progress {
      padding-top: 19rpx;
    }

    &-msg {
      padding-top: 23rpx;
      display: flex;
      justify-content: space-between;
      color: #666666;
    }

    &-paid {
      color: #333333;
      font-size: 32rpx;
      font-weight: bold;
      padding-top: 20rpx;
    }

    &-money {
      padding-top: 19rpx;
      color: #ff0000;
      font-size: 36rpx;
    }

    &-detail {
      color: #000000;
      font-size: 26rpx;
      display: flex;
      flex-direction: row-reverse;
    }

    &-audit {
      color: #000000;
      font-size: 24rpx;
      padding-top: 53rpx;
      display: flex;
      flex-direction: row-reverse;
    }

    &-btn {
      text-align: center;
      padding: 20rpx 0;
    }
  }

  &-second {
    margin-top: 20rpx;
    background-color: #fff;
    width: 100%;

    &-title {
      height: 88rpx;
      font-size: 30rpx;
      color: #4881f9;
      border-bottom: 1px solid #f2f2f2f2;
      line-height: 88rpx;
      padding-left: 19rpx;
    }

    &-msg {
      padding: 29rpx 19rpx;
      font-weight: bold;
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
      padding-bottom: 30rpx;
      .swiper {
        padding: 0 20rpx;
        height: 330rpx;
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
            background-color: $u-type-primary-disabled;
            box-sizing: border-box;
            border-radius: 20rpx;
          }
          &-detail {
            padding: 20rpx;
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
      font-size: 30rpx;
      border-bottom: 1px solid #f2f2f2f2;
      line-height: 88rpx;
      padding-left: 19rpx;
      display: flex;
      justify-content: space-between;
    }

    &-wrap {
      display: flex;
      flex-direction: column;
      padding-bottom: 30rpx;
      .swiper {
        padding: 0 20rpx;
        height: 320rpx;
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
            background-color: $u-type-primary-disabled;
            display: flex;
            flex-direction: column;
            border-radius: 20rpx;
          }

          &-layout {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          &-detail {
            padding: 20rpx;
          }

          &-type {
            font-weight: bold;
            font-size: 26rpx;
            padding-bottom: 20rpx;
          }
          &-num {
            color: #999999;
            font-size: 26rpx;
            padding-bottom: 20rpx;
          }
          &-status {
            font-weight: bold;
            font-size: 32rpx;
            padding-top: 20rpx;
          }
          &-btn {
            text-align: center;
            padding-bottom: 20rpx;
          }
        }
      }
    }
  }

  &-four {
    margin-top: 20rpx;
    background-color: #fff;
    width: 100%;

    &-title {
      height: 88rpx;
      font-size: 30rpx;
      color: #4881f9;
      border-bottom: 1px solid #f2f2f2f2;
      line-height: 88rpx;
      padding-left: 19rpx;
    }

    &-money {
      padding: 29rpx 19rpx;
      font-weight: bold;
      font-size: 26rpx;
      color: #333333;
      border-bottom: 1px solid #f2f2f2f2;
    }

    &-msg {
      &-item {
        padding: 0 20rpx;
      }
      .pay-list {
        height: 60rpx;
        line-height: 60rpx;
        border-bottom: 1px solid #f2f2f2;
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
  margin-top: 25rpx;
}

.indicator-dots-item {
  background-color: $u-tips-color;
  height: 6px;
  width: 6px;
  border-radius: 10px;
  margin: 0 3px;
}

.indicator-dots-active {
  background-color: $u-type-primary;
}
</style>