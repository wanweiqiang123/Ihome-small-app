<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-14 11:37:21
-->
<template>
  <StaffTabBar>
    <view class="home-tab-container">
      <view class="nav-grid">
        <swiper
          @change="handleChangeSwiper"
          class="ih-grid-swiper"
        >
          <swiper-item
            v-for="(gridItem, i) in handleFilterList(8, gridList)"
            :key="i"
          >
            <u-grid
              :col="4"
              :border="false"
            >
              <u-grid-item
                v-for="(item, index) in gridItem"
                :index="item.path"
                :key="index"
                :custom-style="{padding:'20rpx 0'}"
                @click="handleGoto()"
              >
                <!-- <u-badge
                  count="0"
                  :offset="[15, 45]"
                ></u-badge> -->
                <u-icon
                  :name="item.icon"
                  :size="82"
                ></u-icon>
                <text class="grid-text">{{ item.item }}</text>
              </u-grid-item>
            </u-grid>
          </swiper-item>
        </swiper>
        <view class="indicator-dots">
          <template v-for="(item, index) in handleFilterList(8, gridList)">
            <view
              :class="['indicator-dots-item', {'indicator-dots-active': current === index}]"
              :key="index"
            ></view>
          </template>
        </view>
      </view>
      <view class="info-container">
        <view class="info-title">
          <view class="title"></view>
        </view>
        <u-line />
        <view class="info-content">
          <view class="info-data">
            <view class="item">
              <view>报备数</view>
              <text class="red">--</text>
            </view>
            <view class="item">
              <view>已到访</view>
              <text class="red">--</text>
            </view>
            <view class="item">
              <view>已成交</view>
              <text class="red">--</text>
            </view>
            <view class="item">
              <view>无效报备</view>
              <text class="red">--</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </StaffTabBar>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      gridList: [
        {
          icon: require("../common/icon/report.png"),
          path: "/staffPackage/reportConfirm/index",
          item: "报备确认",
        },
        {
          icon: require("../common/icon/visit.png"),
          path: "/staffPackage/visitConfirm/index",
          item: "到访确认",
        },
        {
          icon: require("../common/icon/deal.png"),
          path: "/staffPackage/dealConfirm/index",
          item: "成交确认",
        },
        {
          icon: require("../common/icon/notice.png"),
          path: "/staffPackage/noticeList/index",
          item: "优惠告知书",
        },
        {
          icon: require("../common/icon/client.png"),
          path: "/staffPackage/clientReport/index",
          item: "帮录报备",
        },
        {
          icon: require("../common/icon/performance.png"),
          path: "/staffPackage/performance/index",
          item: "业绩申报",
        },
        {
          icon: require("../common/icon/payment.png"),
          path: "/staffPackage/payment/index",
          item: "结佣付款",
        },
        {
          icon: require("../common/icon/receipt.png"),
          path: "/staffPackage/receipt/index",
          item: "收款管理",
        },
        {
          icon: require("../common/icon/code.png"),
          path: "/staffPackage/noticeCode/index",
          item: "查询优惠码",
        },
        {
          icon: require("../common/icon/channel.png"),
          path: "/staffPackage/channelAccount/index",
          item: "渠道结佣情况",
        },
        {
          icon: require("../common/icon/notice.png"),
          path: "/staffPackage/noticeSpecial/index",
          item: "审核优惠告知书",
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    handleFilterList(num, list) {
      let newList = [];
      let filterList = [...list];
      while (filterList.length > 0) {
        newList.push(filterList.splice(0, num));
      }
      return newList;
    },
    handleChangeSwiper(e) {
      this.current = e.detail.current;
    },
    handleGoto(url) {
      uni.navigateTo({
        url: url,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-tab-container {
  padding-top: 2rpx;
}
.nav-grid {
  // padding: 0 20rpx;
  background: #fff;
  font-size: 24rpx;
  .grid-text {
    margin-top: 15rpx;
    color: #333333;
  }
  .ih-grid-swiper {
    height: 330rpx;
  }
  /deep/ .u-grid-item-box {
    padding: 20rpx 0;
  }
  .indicator-dots {
    padding: 16rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .indicator-dots-item {
      background-color: $u-tips-color;
      height: 12rpx;
      width: 12rpx;
      border-radius: 20rpx;
      margin: 0 10rpx;
      &.indicator-dots-active {
        background-color: $u-type-primary;
      }
    }
  }
}
.info-container {
  margin-top: 30rpx;
  background: #fff;
  .info-title {
    height: 92rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      background: url("../common/icon/title.png");
      width: 692rpx;
      height: 54rpx;
      background-size: cover;
    }
  }
  .info-content {
    padding: 28rpx 80rpx;
  }
  .info-data {
    display: flex;
    flex-flow: wrap;
    .item {
      width: 50%;
      text-align: center;
      // height: 200rpx;
      // padding-top: 40rpx;
      // padding-bottom: 40rpx;
      padding: 40rpx 0;
      font-size: 36rpx;
      font-family: "Source Han Sans CN";
      font-weight: bold;
      color: #333333;
      line-height: 60rpx;
      .red {
        // padding-top: 15rpx;
        color: #ff0000;
      }
      &:nth-child(1) {
        border-bottom: 1px solid #f1f1f1;
        border-right: 1px solid #f1f1f1;
      }
      &:nth-child(2) {
        border-bottom: 1px solid #f1f1f1;
      }
      &:nth-child(3) {
        border-right: 1px solid #f1f1f1;
      }
    }
  }
}
</style>
<style lang="scss">
page {
  background: $u-bg-color;
}
</style>
