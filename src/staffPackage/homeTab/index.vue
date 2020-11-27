<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-27 11:56:10
-->
<template>
  <StaffTabBar>
    <view>
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
                  :size="98"
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
      <u-gap bg-color="#f1f1f1"></u-gap>
      <view class="info-container">
        <view class="info-title">今日业务数据</view>
        <u-line />
        <view class="info-content">
          <view class="info-data">
            <view class="item">
              <p>报备数</p>
              <text>999</text>
            </view>
            <view class="item">
              <p>已到访</p>
              <text>999</text>
            </view>
            <view class="item">
              <p>已成交</p>
              <text>999</text>
            </view>
            <view class="item">
              <p>无效报备</p>
              <text>999</text>
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
          icon: "integral",
          path: "/staffPackage/reportConfirm/index",
          item: "报备确认",
        },
        {
          icon: "account-fill",
          path: "/staffPackage/visitConfirm/index",
          item: "到访确认",
        },
        {
          icon: "grid-fill",
          path: "/staffPackage/dealConfirm/index",
          item: "成交确认",
        },
        {
          icon: "photo",
          path: "/staffPackage/noticeList/index",
          item: "优惠告知书",
        },
        {
          icon: "scan",
          path: "/staffPackage/clientReport/index",
          item: "帮录报备",
        },
        {
          icon: "file-text",
          path: "/staffPackage/performance/index",
          item: "业绩申报",
        },
        {
          icon: "rmb-circle",
          path: "/staffPackage/payment/index",
          item: "结佣付款",
        },
        {
          icon: "red-packet",
          path: "/staffPackage/receipt/index",
          item: "收款管理",
        },
        {
          icon: "fingerprint",
          path: "/staffPackage/noticeCode/index",
          item: "查询优惠码",
        },
        {
          icon: "order",
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
.nav-grid {
  padding: 0 20rpx;
  padding-bottom: 10rpx;
  font-size: 28rpx;
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
  .info-title {
    padding-left: 26rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    font-weight: 900;
  }
  .info-content {
    padding: 0 26rpx;
    padding-top: 20rpx;
  }
  .info-data {
    display: flex;
    flex-flow: wrap;
    .item {
      width: 50%;
      text-align: center;
      font-size: 40rpx;
      height: 200rpx;
      padding-top: 50rpx;
      &:nth-child(1) {
        border-bottom: 1rpx solid $u-border-color;
        border-right: 1rpx solid $u-border-color;
      }
      &:nth-child(2) {
        border-bottom: 1rpx solid $u-border-color;
      }
      &:nth-child(3) {
        border-right: 1rpx solid $u-border-color;
      }
    }
  }
}
</style>