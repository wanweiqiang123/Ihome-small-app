<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:38:31
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-28 15:22:10
-->
<template>
  <view class="page">
    <view class="top">
      <view class="position"
        >广州市
        <u-icon name="iconfont uicon-arrow-down"></u-icon>
      </view>
      <u-input
        class="search"
        v-model="search"
        :type="type"
        :border="border"
        placeholder="楼盘关键词"
      />
    </view>
    <view class="wrap">
      <u-swiper :list="list"></u-swiper>
    </view>
    <view class="navigation">
      <view class="item" v-for="(item,index) in navigationList" :key="index">
        <view class="item-ico">
          <u-image
            class="item-ico-img"
            width="100rpx"
            height="100rpx"
            :src="item.url"
          ></u-image>
        </view>
        <view class="item-text"> {{ item.text }}</view>
      </view>
    </view>
    <view class="house">
      <view class="house-top"> 推荐房源 </view>
      <view class="house-list">
        <view class="house-item" v-for="(item,index) in houseList" :key="index">
          <view class="house-item-left">
            <u-image width="160rpx" height="120rpx" :src="item.url"></u-image>
          </view>
          <view class="house-item-right">
            <view class="house-item-right-item-title">
              {{ item.text }}
            </view>
            <view class="house-item-right-item-position">
              {{ item.position }}
            </view>
            <view class="house-item-right-item-price">
              {{ item.price }}
            </view>
            <view class="house-item-right-item-rules">
              <view class="house-item-right-item-rules-left"> 佣 </view>
              <view class="house-item-right-item-rules-right">
                {{ item.rules }}
              </view>
            </view>
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
      title: "这是首页",
      search: "",
      type: "text",
      border: true,
      list: [
        {
          image: "/static/swiper/1.jpg",
          title: "蒹葭苍苍，白露为霜。所谓伊人，在水一方",
        },
        {
          image: "/static/swiper/2.jpg",
          title: "溯洄从之，道阻且长。溯游从之，宛在水中央",
        },
        {
          image: "/static/swiper/3.jpg",
          title: "蒹葭萋萋，白露未晞。所谓伊人，在水之湄",
        },
      ],
      navigationList: [
        {
          url: "/static/ico/1.jpg",
          text: "新房楼盘",
        },
        {
          url: "/static/ico/2.jpg",
          text: "我的客户",
        },
        {
          url: "/static/ico/3.jpg",
          text: "报备客户",
        },
        {
          url: "/static/ico/4.jpg",
          text: "我的报备",
        },
      ],
      houseList: [
        {
          url: "/static/img/house.jpg",
          text: "远洋招商",
          position: "天河区",
          price: "21000.00",
          rules: "佣金规则",
        },
        {
          url: "/static/img/house.jpg",
          text: "远洋招商",
          position: "天河区",
          price: "21000.00",
          rules: "佣金规则",
        },
        {
          url: "/static/img/house.jpg",
          text: "远洋招商",
          position: "天河区",
          price: "21000.00",
          rules: "佣金规则",
        },
        {
          url: "/static/img/house.jpg",
          text: "远洋招商",
          position: "天河区",
          price: "21000.00",
          rules: "佣金规则",
        },
      ],
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss">
.page {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.top {
  padding: 20rpx 20rpx 0 20rpx;
  width: 100%;
  display: flex;
}
.position {
  width: 160rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.search {
  flex: 1;
}
.wrap {
  width: 100%;
  padding: 10rpx 20rpx;
}
.navigation {
  display: flex;
  width: 100%;
}
.navigation .item {
  padding: 20rpx 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.navigation .item-text {
  line-height: 50rpx;
}

.house {
  width: 100%;
  border-top: 20rpx solid #eee;
}
.house-top {
  text-align: center;
  font-size: 36rpx;
  padding: 10rpx;
}
.house-list {
  width: 100%;
  border-bottom: 1px solid #eee;
}
.house-item {
  border-top: 1px solid #eee;
  display: flex;
}
.house-item-left {
  width: 200rpx;
  padding: 20rpx;
}
.house-item-right {
  flex: 1;
  padding: 20rpx 0;
}
.house-item-right-item-title {
  font-weight: 600;
}
.house-item-right-item-position {
  background: #eee;
  display: inline-block;
  padding: 0rpx 10rpx;
}
.house-item-right-item-price {
  color: orange;
}

.house-item-right-item-rules-left {
  background: orange;
  display: inline-block;
  color: #fff;
  padding: 0 4rpx;
}
.house-item-right-item-rules-right {
  display: inline-block;
  padding: 2rpx 10rpx;
}
</style>
