<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-17 10:08:05
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-25 14:26:33
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
        <u-icon name="plus" size="45" @click="showAddWin = true"></u-icon>
      </view>
      <view class="client-content" v-for="item in [1, 2, 3, 4, 5, 6]" :key="item" @click="viewClientDetails">
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
      <u-mask
        @click="showAddWin = false"
        :show="showAddWin"
        :duration="400"
        :zoom="true" :custom-style="{background: 'rgba(255, 255, 255, 0.1)'}"></u-mask>
      <view class="client-add-wrapper" v-if="showAddWin">
        <view class="item border-bottom" @click="handleAdd('report')">客户报备</view>
        <view class="item" @click="handleAdd('enter')">录入客户</view>
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
      showAddWin: false
    };
  },
  onLoad() {},
  methods: {
    // 录入客户/报备客户
    handleAdd(type) {
      if (type === 'report') {
        uni.navigateTo({
          url: `/intermediaryPackage/clientTab/pages/enterClient`
        });
      } else if (type === 'enter') {
        uni.navigateTo({
          url: `/intermediaryPackage/clientTab/pages/enterClient`
        });
      }
      this.showAddWin = false;
    },
    // 查看客户详情
    viewClientDetails() {
      uni.navigateTo({
        url: `/intermediaryPackage/clientTab/pages/clientDetails`
      });
    }
  },
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

    .client-add-wrapper {
      width: 250rpx;
      background-color: #FFFFFF;
      box-shadow: 8rpx 8rpx 6rpx #A9A9A9;
      box-sizing: border-box;
      position: fixed;
      top: 75rpx;
      right: 45rpx;
      z-index: 11177;

      .item {
        height: 80rpx;
        line-height: 80rpx;
        box-sizing: border-box;
        text-align: center;
      }

      .border-bottom {
        border-bottom: 2rpx solid #797979;
      }
    }
  }
</style>