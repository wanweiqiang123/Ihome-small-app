<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-23 17:30:18
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-12 15:43:20
-->
<template>
  <view class="project-detail-wrapper">
    <view class="bg-wrapper"></view>
    <view class="detail-content-wrapper">
      <view class="content-wrapper">
        <u-card :show-head="false" margin="0rpx" padding="20">
          <view class="" slot="body">
            <u-image width="100%" height="320rpx" :src="banner"></u-image>
            <view class="title">低层洋房87m<span class="square">2</span></view>
          </view>
        </u-card>
        <view class="home-info-wrapper">
          <view class="home-info-title">户型详情</view>
          <view class="home-info">
            <u-row gutter="8">
              <u-col span="7">
                <view class="home-col-wrapper">
                  <view class="home-label">户型</view>
                  <view class="home-value">2室 1厅 1厨 1卫</view>
                </view>
              </u-col>
              <u-col span="5">
                <view class="home-col-wrapper">
                  <view class="home-label">售价</view>
                  <view class="home-value">200万起</view>
                </view>
              </u-col>
              <u-col span="7">
                <view class="home-col-wrapper">
                  <view class="home-label">户型面积</view>
                  <view class="home-value">87m²</view>
                </view>
              </u-col>
              <u-col span="5">
                <view class="home-col-wrapper">
                  <view class="home-label">朝向</view>
                  <view class="home-value">南</view>
                </view>
              </u-col>
              <u-col span="7">
                <view class="home-col-wrapper">
                  <view class="home-label">物业类型</view>
                  <view class="home-value">住宅</view>
                </view>
              </u-col>
              <u-col span="5">
                <view class="home-col-wrapper">
                  <view class="home-label">物业费</view>
                  <view class="home-value">2.8元/m²</view>
                </view>
              </u-col>
              <u-col span="7">
                <view class="home-col-wrapper">
                  <view class="home-label">产权年限</view>
                  <view class="home-value">70年</view>
                </view>
              </u-col>
              <u-col span="5">
                <view class="home-col-wrapper">
                  <view class="home-label">装修级别</view>
                  <view class="home-value">精装</view>
                </view>
              </u-col>
            </u-row>
          </view>
        </view>
      </view>
      <u-gap height="28" bg-color="#F2F2F2"></u-gap>
      <view class="content-wrapper">
        <view class="home-info-wrapper">
          <view class="home-info-title">同楼盘其他户型</view>
          <view class="home-info-other" v-for="item in [1, 2, 3]" :key="item" @click="viewHomeDetail">
            <view class="home-img">
              <u-image width="170rpx" height="130rpx" :src="homeImg"></u-image>
            </view>
            <view class="home-info-right">
              <view class="info-title">
                <view>底层洋房101m²</view>
                <veiw class="price-color">284万起</veiw>
              </view>
              <view class="info-size">101m²</view>
              <view class="info-location">北</view>
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
        banner: require('@/channelPackage/common/img/banner_1.png'),
        homeImg: require('@/channelPackage/common/img/house.jpg'),
        homeForm: {}
      };
    },
    onLoad() {
    },
    methods: {
      // 查看户型详情
      viewHomeDetail() {
        uni.navigateTo({
          url: `/channelPackage/homeTab/pages/unitDetail`,
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .project-detail-wrapper {
    width: 100%;
    box-sizing: border-box;
    position: relative;

    .square {
      vertical-align: super;
      font-size: 18rpx;
    }

    .price-color {
      color: #FD4918;
    }

    .home-info-title {
      height: 30rpx;
      line-height: 30rpx;
      text-align: left;
      border-left: 10rpx solid $uni-color-primary;
      padding-left: 15rpx;
      font-size: 30rpx;
      font-weight: 600;
      color: #333333;
      box-sizing: border-box;
      margin: 10rpx 0rpx;
    }

    .bg-wrapper {
      width: 100%;
      height: 380rpx;
      position: absolute;
      left: 0rpx;
      top: 0rpx;
      z-index: -1;
      background-color: $uni-color-primary;
    }

    .detail-content-wrapper {
      width: 100%;
      position: absolute;
      left: 0rpx;
      top: 0rpx;
      z-index: 500;
      box-sizing: border-box;
      padding: 20rpx 0rpx 0rpx 0rpx;

      .content-wrapper {
        width: 100%;
        box-sizing: border-box;
        padding: 0rpx 20rpx;

        .title {
          box-sizing: border-box;
          margin: 18rpx 0rpx;
          font-size: 34rpx;
          font-weight: 600;
          color: #1C1C1C;
        }
      }

      .home-info-wrapper {
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx;

        .home-info {
          width: 100%;
          box-sizing: border-box;

          .home-col-wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
            margin: 10rpx 0rpx;

            .home-label {
              width: 120rpx;
              display: block;
              font-size: 26rpx;
              text-align-last: justify;
            }

            .home-value {
              flex: 1;
              box-sizing: border-box;
              margin-left: 15rpx;
            }
          }
        }

        .home-info-other {
          width: 100%;
          display: flex;
          flex-direction: row;

          &:not(:last-child) {
            margin-bottom: 10rpx;
          }

          .home-info-right {
            flex: 1;
            box-sizing: border-box;
            margin-left: 20rpx;

            .info-title, .info-size, .info-location {
              height: 40rpx;
              box-sizing: border-box;
              margin-bottom: 8rpx;
            }

            .info-title {
              display: flex;
              flex-direction: row;

              view {
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
</style>