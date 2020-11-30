<!--
 * @Description: 报备汇总
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-30 08:53:45
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-30 09:07:01
-->
<template>
  <StaffTabBar>
    <view class="report">
      <view class="report-search">
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
}
</style>