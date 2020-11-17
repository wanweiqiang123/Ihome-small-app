<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-17 15:45:01
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
      <u-gap bg-color="#f3f4f6"></u-gap>
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
          icon: "man-add",
          path: "/staffPackage/visitConfirm/index",
          item: "到访确认",
        },
        {
          icon: "rmb-circle",
          path: "/staffPackage/dealConfirm/index",
          item: "成交确认",
        },
        {
          icon: "integral",
          path: "",
          item: "报备确认",
        },
        {
          icon: "integral",
          path: "",
          item: "报备确认",
        },
        {
          icon: "integral",
          path: "",
          item: "报备确认",
        },
        {
          icon: "integral",
          path: "",
          item: "报备确认",
        },
        {
          icon: "integral",
          path: "",
          item: "报备确认",
        },
        {
          icon: "integral",
          path: "",
          item: "报备确认",
        },
        {
          icon: "integral",
          path: "",
          item: "报备确认",
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
    border: 1px solid $u-border-color;
    border-radius: 10rpx;
    .item {
      width: 25%;
      text-align: center;
      line-height: 46rpx;
      p {
        font-weight: bold;
      }
    }
  }
}
</style>