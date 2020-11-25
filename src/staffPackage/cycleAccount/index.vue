<!--
 * @Description: 联动周期结佣情况
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-25 10:30:30
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-25 10:43:31
-->
<template>
  <view class="cycle">
    <view class="cycle-search">
      <u-search
        :show-action="false"
        placeholder="日照香炉生紫烟"
        v-model="keyword"
        :clearabled="true"
      ></u-search>
    </view>
    <view class="cycle-list">
      <u-card
        :border="false"
        :show-foot="false"
        padding="20"
        class="ih-card"
        v-for="i in 3"
        :key="i"
      >
        <view
          slot="head"
          class="ih-card-head"
        >
          <view>保利时光里20200101-20200201</view>
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
};
</script>

<style lang="scss" scoped>
.cycle {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-search {
    position: fixed;
    padding: 10rpx 12rpx;
    background: #fff;
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
    font-weight: bold;
  }
  &-content {
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
}
</style>
