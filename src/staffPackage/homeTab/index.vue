<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-10 11:25:31
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
                @click="handleGoto()"
              >
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
              <text class="red">999</text>
            </view>
            <view class="item">
              <view>已到访</view>
              <text class="red">999</text>
            </view>
            <view class="item">
              <view>已成交</view>
              <text class="red">999</text>
            </view>
            <view class="item">
              <view>无效报备</view>
              <text class="red">999</text>
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
          icon: require("@/static/staffIcon/report.png"),
          path: "/staffPackage/reportConfirm/index",
          item: "报备确认",
        },
        {
          icon: require("@/static/staffIcon/visit.png"),
          path: "/staffPackage/visitConfirm/index",
          item: "到访确认",
        },
        {
          icon: require("@/static/staffIcon/deal.png"),
          path: "/staffPackage/dealConfirm/index",
          item: "成交确认",
        },
        {
          icon: require("@/static/staffIcon/notice.png"),
          path: "/staffPackage/noticeList/index",
          item: "优惠告知书",
        },
        {
          icon: require("@/static/staffIcon/client.png"),
          path: "/staffPackage/clientReport/index",
          item: "帮录报备",
        },
        {
          icon: require("@/static/staffIcon/performance.png"),
          path: "/staffPackage/performance/index",
          item: "业绩申报",
        },
        {
          icon: require("@/static/staffIcon/payment.png"),
          path: "/staffPackage/payment/index",
          item: "结佣付款",
        },
        {
          icon: require("@/static/staffIcon/receipt.png"),
          path: "/staffPackage/receipt/index",
          item: "收款管理",
        },
        {
          icon: require("@/static/staffIcon/code.png"),
          path: "/staffPackage/noticeCode/index",
          item: "查询优惠码",
        },
        {
          icon: require("@/static/staffIcon/channel.png"),
          path: "/staffPackage/channelAccount/index",
          item: "渠道结佣情况",
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
  padding-bottom: 10rpx;
  font-size: 24rpx;
  .grid-text {
    margin-top: 15rpx;
  }
  .ih-grid-swiper {
    height: 370rpx;
  }
  .indicator-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    .indicator-dots-item {
      background-color: $u-tips-color;
      height: 12rpx;
      width: 12rpx;
      border-radius: 20rpx;
      margin: 0 6rpx;
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
      background: url("../../static/staffIcon/title.png");
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
