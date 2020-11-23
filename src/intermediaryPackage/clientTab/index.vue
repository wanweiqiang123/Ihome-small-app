<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-17 10:08:05
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-17 11:11:55
-->
<template>
  <IntermediaryTabBar>
    <view class="client-page-wrapper">
      <view class="top-wrapper">
        <u-search
          class="search"
          shape="round"
          bg-color="white"
          border-color="#f2f2f2"
          :show-action="false"
          placeholder="请输入客户姓名/电话"
          v-model="queryPageParameters.projectName"></u-search>
        <u-icon name="plus" size="45"></u-icon>
      </view>
      <view class="client-content" v-for="item in [1, 2, 3, 4, 5, 6]" :key="item">
        <view class="client-avatar">
          <u-image
            width="150rpx"
            height="150rpx"
            shape="circle"
            src="https://cdn.uviewui.com/uview/swiper/2.jpg"></u-image>
        </view>
        <view class="client-info">
          <view class="client-name">陈经纪</view>
          <view class="client-phone">13455556666</view>
          <view class="client-time">录入时间：2020-08-16 10:00</view>
        </view>
      </view>
    </view>
  </IntermediaryTabBar>
</template>

<script>
export default {
  data() {
    return {
      queryPageParameters: {
        projectName: ''
      },
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
  .client-page-wrapper {
    width: 100%;
    box-sizing: border-box;

    .top-wrapper {
      width: 100%;
      height: 85rpx;
      box-sizing: border-box;
      padding: 0rpx 20rpx;
      margin-top: 10rpx;
      display: flex;
      align-items: center;
      background-color: #f2f2f2;

      .search {
        flex: 1;
        box-sizing: border-box;
        margin-right: 20rpx;

        /deep/ .u-content {
          height: 62rpx !important;
        }
      }
    }

    .client-content {
      /*width: 100%;*/
      box-sizing: border-box;
      margin: 0rpx 20rpx;
      padding: 20rpx 0rpx;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      flex-direction: row;
      align-items: center;

      .client-info {
        flex: 1;
        box-sizing: border-box;
        margin-left: 20rpx;

        view {
          box-sizing: border-box;
          margin-bottom: 10rpx;
        }

        .client-name {
          font-size: 38rpx;
          font-weight: 600;
        }
      }
    }
  }
</style>