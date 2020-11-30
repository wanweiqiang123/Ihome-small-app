<!--
 * @Description: 报备汇总
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-30 08:53:45
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-30 10:38:05
-->
<template>
  <StaffTabBar>
    <view class="report">
      <view class="report-search">
        <u-search
          :show-action="false"
          bg-color="#fff"
          placeholder="请输入周期名称"
          v-model="keyword"
          :clearabled="true"
          height="71"
          border-color="#DCDCDC"
        ></u-search>
      </view>
      <view class="report-list">
        <u-card
          :border="false"
          :show-foot="false"
          padding="20"
          class="ih-card"
          border-radius="4"
          v-for="i in 3"
          :key="i"
        >
          <view
            slot="head"
            class="ih-card-head"
          >
            <view>保利天悦20200101~2020201</view>
          </view>
          <view
            slot="body"
            class="ih-card-content"
          >
            <view>
              <view>报备数</view>
              <view>999</view>
            </view>
            <view>
              <view>已到访</view>
              <view>999</view>
            </view>
            <view>
              <view>已成交</view>
              <view>999</view>
            </view>
            <view>
              <view>无效</view>
              <view>999</view>
            </view>
          </view>
        </u-card>
      </view>
    </view>
  </StaffTabBar>
</template>

<script>
export default {
  name: "report-tab",
};
</script>

<style lang="scss" scoped>
.report {
  &-search {
    position: fixed;
    padding: 10rpx 30rpx 8rpx;
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
    font-weight: bold;
  }
  &-content {
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
}
</style>
<style lang="scss">
page {
  background: $u-bg-color;
}
</style>
