<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 08:42:30
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-09 15:58:50
-->
<template>
  <view class="project-comm-detail-wrapper">
    <view class="top-wrapper">
      <u-search
        class="search"
        shape="round"
        height="72"
        placeholder-color="#BDBDBD"
        search-icon-color="#BDBDBD"
        bg-color="#FFFFFF"
        border-color="#DCDCDC"
        :show-action="false"
        placeholder="请输入联动周期搜索"
        v-model="queryPageParameters.projectName"></u-search>
    </view>
    <view class="project-comm-list" v-for="item in [1,2,3,4]" :key="item">
      <view class="project-name">保利天悦20200101~2020201</view>
      <view class="comm-wrapper">
        <view class="comm-item">
          <view class="u-padding-10">结佣总金额</view>
          <view>999</view>
        </view>
        <view class="comm-item">
          <view class="u-padding-10">已结佣金额</view>
          <view>666</view>
        </view>
        <view class="comm-item">
          <view class="u-padding-10">未结佣金额</view>
          <view>50</view>
        </view>
        <view class="comm-item">
          <view class="u-padding-10">审核中佣金</view>
          <view>399</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryPageParameters: {
        projectName: ''
      }
    };
  },
  onLoad() {},
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .project-comm-detail-wrapper {
    width: 100%;

    .top-wrapper {
      width: 100%;
      height: 92rpx;
      box-sizing: border-box;
      padding: 10rpx 24rpx 10rpx 18rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #EFEFF4;

      .search {
        flex: 1;
        box-sizing: border-box;
        margin-right: 20rpx;
      }
    }

    .project-comm-list {
      width: 100%;
       border-bottom: 1rpx solid #E4E4E4;

      .project-name {
        width: 100%;
        color: #FFFDFF;
        background-color: $u-type-primary;
        box-sizing: border-box;
        padding: 20rpx;
        font-weight: 600;
      }

      .comm-wrapper {
        width: 100%;
        padding: 25rpx 18rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .comm-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: center;
          color: #999999;

          &:not(:last-child) {
            margin-right: 8rpx;
          }
        }
      }
    }
  }
</style>