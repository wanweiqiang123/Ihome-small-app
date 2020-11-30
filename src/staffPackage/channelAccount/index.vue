<!--
 * @Description: 渠道结佣情况
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-25 09:08:06
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-30 09:35:02
-->
<template>
  <view class="account">
    <view class="account-search">
      <u-search
        :show-action="false"
        bg-color="#fff"
        placeholder="日照香炉生紫烟"
        v-model="keyword"
        :clearabled="true"
        height="71"
        border-color="#DCDCDC"
      ></u-search>
    </view>
    <view class="account-list">
      <u-card
        :border="false"
        :show-foot="false"
        padding="20"
        class="ih-card"
        border-radius="4"
        v-for="i in 3"
        :key="i"
        @click="handleClick()"
      >
        <view
          slot="head"
          class="ih-card-head"
        >
          <view>链家地产经纪有限公司</view>
          <view class="sub-title">查看联动周期结佣情况
            <u-icon name="arrow-right" />
          </view>
        </view>
        <view
          slot="body"
          class="ih-card-content"
        >
          <view>
            <view>结佣总金额</view>
            <view>999</view>
          </view>
          <view>
            <view>已结佣金额</view>
            <view>999</view>
          </view>
          <view>
            <view>未结佣金额</view>
            <view>999</view>
          </view>
          <view>
            <view>审核中佣金</view>
            <view>999</view>
          </view>
        </view>
      </u-card>
    </view>
  </view>
</template>

<script>
export default {
  name: "channel-account",
  data() {
    return {
      keyword: null,
    };
  },
  methods: {
    handleClick() {
      uni.navigateTo({
        url: "/staffPackage/cycleAccount/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.account {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-search {
    position: fixed;
    padding: 10rpx 30rpx;
    background: $u-bg-color;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  &-list {
    padding-top: 80rpx;
    padding-bottom: 6rpx;
  }
}
.ih-card {
  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    .sub-title {
      color: $u-type-info;
      font-size: 24rpx;
      font-weight: normal;
    }
  }
  &-content {
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
}
</style>
