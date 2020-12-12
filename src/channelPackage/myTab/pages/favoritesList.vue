<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 11:21:10
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-12 17:17:30
-->
<template>
  <view class="favorites-list-wrapper">
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
        placeholder="请输入项目名称"
        v-model="queryPageParameters.projectName"></u-search>
      <view class="filter-wrapper" @click="currentClick = !currentClick">{{currentClick ? '完成' : '管理'}}</view>
    </view>
    <view :class="currentClick ? 'list-wrapper list-height' : 'list-wrapper'">
      <view class="item" v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="item" @click="viewProjectDetail">
        <view>
          <u-image width="242rpx" height="186rpx" :src="homeImg"></u-image>
        </view>
        <view class="item-content">
          <view class="title-wrapper">远洋招商保利东湾经纪渠道</view>
          <view>
            <u-tag
              text="天河区"
              size="mini"
              :closeable="false"
              type="info" />
          </view>
          <view class="price-wrapper">
            <span class="price">均价23000</span>
            <span class="unit">元/m<span class="two">2</span></span>
          </view>
          <view class="rule">
            <span class="rule-tap">佣</span>
            <span>佣金规则</span>
          </view>
        </view>
        <view class="item-checked" v-show="currentClick">
          <u-checkbox size="40rpx" v-model="checked"></u-checkbox>
        </view>
      </view>
    </view>
    <view class="bottom-btn" v-show="currentClick">
      <u-button type="error">删除</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      homeImg: require('@/channelPackage/common/img/house.jpg'),
      currentClick: false,
      queryPageParameters: {
        projectName: ''
      },
      checked: false
    };
  },
  onLoad() {},
  methods: {
    // 查看项目详情
    viewProjectDetail() {
      uni.navigateTo({
        url: `/channelPackage/homeTab/pages/projectDetail`,
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  .favorites-list-wrapper {
    width: 100%;
    //background-color: #F5F5F5;

    .top-wrapper {
      width: 100%;
      height: 92rpx;
      box-sizing: border-box;
      padding: 10rpx 24rpx 10rpx 18rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFFFFF;

      .search {
        flex: 1;
        box-sizing: border-box;
        margin-right: 20rpx;
      }

      .filter-wrapper {
        color: $u-type-primary;
        font-size: 30rpx;
      }
    }

    .list-wrapper {
      width: 100%;
      height: calc(100vh - 100rpx);
      overflow: auto;

      .item {
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx 10rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #f2f2f2;

        .item-content {
          flex: 1;
          box-sizing: border-box;
          margin-left: 25rpx;

          view {
            box-sizing: border-box;
            margin-bottom: 10rpx;
          }

          .title-wrapper {
            font-size: 30rpx;
          }

          .price-wrapper {
            width: 100%;
            color: #FD4918;

            .price {
              font-size: 32rpx;
              color: #FD4918;
              font-weight: 600;
            }

            .unit {
              font-size: 22rpx;
              box-sizing: border-box;
              display: inline-block;
              margin-left: 8rpx;
            }

            .two {
              vertical-align: super;
              font-size: 18rpx;
            }
          }

          .rule {
            width: 100%;

            .rule-tap {
              width: 40rpx;
              height: 40rpx;
              line-height: 40rpx;
              text-align: center;
              display: inline-block;
              background-color: orange;
              color: white;
              box-sizing: border-box;
              margin-right: 8rpx;
              border-radius: 17%;
            }
          }
        }

        .item-checked {
          box-sizing: border-box;
        }
      }
    }

    .list-height {
      height: calc(100vh - 200rpx);
      overflow: auto;
    }

    .bottom-btn {
      width: 100%;
      height: 100rpx;
      box-sizing: border-box;
      padding: 10rpx 50rpx;
      background-color: #FFFFFF;
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      z-index: 9999;
    }
  }
</style>