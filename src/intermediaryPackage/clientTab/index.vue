<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-17 10:08:05
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-08 18:43:10
-->
<template>
  <IntermediaryTabBar>
    <view class="client-page-wrapper">
      <view class="top-wrapper">
        <u-search
          class="search"
          shape="round"
          height="72"
          placeholder-color="#BDBDBD"
          search-icon-color="#BDBDBD"
          bg-color="#FFFFFF"
          border-color="#FFFFFF"
          :show-action="false"
          placeholder="请输入客户姓名/电话"
          v-model="queryPageParameters.projectName"></u-search>
        <view class="icon" @click="showAddWin = true">
          <u-icon name="plus" color="#888888" size="30"></u-icon>
        </view>
      </view>
      <view class="client-content-wrapper">
        <view class="client-content" v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="item" @click="viewClientDetails">
          <view class="client-avatar">王</view>
          <view class="client-info">
            <view class="client-name">陈经纪</view>
            <view class="client-phone">13455556666</view>
            <view class="client-time">录入时间：2020-08-16 10:00</view>
          </view>
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
      height: 88rpx;
      box-sizing: border-box;
      padding: 0rpx 30rpx;
      display: flex;
      align-items: center;
      background-color: #F1F1F1;

      .search {
        flex: 1;
        box-sizing: border-box;
        margin-right: 20rpx;
      }

      .icon {
        width: 72rpx;
        height: 72rpx;
        line-height: 68rpx;
        text-align: center;
        background: #FFFFFF;
        border: 1rpx solid #DCDCDC;
        border-radius: 36rpx;
      }
    }

    .client-content-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 0rpx 30rpx;

      .client-content {
        width: 100%;
        height: 164rpx;
        box-sizing: border-box;
        //padding: 0rpx 30rpx;
        border-bottom: 1px solid #f2f2f2;
        display: flex;
        flex-direction: row;
        align-items: center;

        .client-avatar {
          width: 100rpx;
          height: 100rpx;
          line-height: 100rpx;
          text-align: center;
          background: #4881F9;
          border-radius: 50%;
          font-size: 48rpx;
          font-family: PingFang SC;
          font-weight: 600;
          color: #FFFFFF;
        }

        .color-blur {
          background: #4881F9;
        }

        .color-yellow {
          background: #FCD639;
        }

        .color-orange {
          background: #EB7734;
        }

        .color-green {
          background: #8ED334;
        }

        .client-info {
          flex: 1;
          box-sizing: border-box;
          margin-left: 32rpx;

          view {
            box-sizing: border-box;
            margin-bottom: 5rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 36rpx;
          }

          .client-name {
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1C1C1C;
          }
        }
      }
    }

    .client-add-wrapper {
      width: 250rpx;
      background-color: #FFFFFF;
      box-shadow: 8rpx 8rpx 6rpx #A9A9A9;
      box-sizing: border-box;
      position: fixed;
      top: 82rpx;
      right: 40rpx;
      z-index: 12222;

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