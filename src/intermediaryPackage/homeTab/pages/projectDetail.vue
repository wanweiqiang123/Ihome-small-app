<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-23 11:15:50
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-23 17:20:21
-->
<template>
  <view class="project-detail-wrapper">
    <view class="bg-wrapper"></view>
    <view class="detail-content-wrapper">
      <view class="tab-wrapper">
        <u-tabs
          :list="tabList"
          :current="tabCurrent"
          :font-size="35"
          bg-color=""
          inactive-color="#FFFFFF"
          active-color="#FFFFFF"
          @change="changeTab"
          :is-scroll="false"></u-tabs>
      </view>
      <view class="content-wrapper" v-show="tabCurrent === 0">
        <u-card :show-head="false" margin="0rpx" padding="20">
          <view class="" slot="body">
            <u-image width="100%" height="320rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg"></u-image>
            <view class="title">远洋招商保利东湾经纪渠道</view>
            <view class="price-wrapper">
              <span class="price">均价23000</span>
              <span class="unit">元/m<span class="square">2</span></span>
            </view>
            <view class="address-wrapper">
              <u-icon name="map-fill" size="40rpx"></u-icon>
              <view>广州市增城区增城大道</view>
            </view>
            <view class="rule-color">
              <view>佣金规则：</view>
              <view>保利国际广场位于成都市高新区金融城模板，是成都市2018年重点规划的城市CBD中心，丰富的配套等资源。</view>
            </view>
          </view>
        </u-card>
        <view class="home-info-wrapper">
          <view class="home-info-title">户型信息</view>
          <view class="home-info">
            <view class="info-item" @click="viewHomeDetail">
              <view>
                <u-image width="100%" height="130rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg"></u-image>
              </view>
              <view>
                底层2房68m<span class="square">2</span>
              </view>
              <view class="price-color">160万起</view>
            </view>
            <view class="info-item" @click="viewHomeDetail">
              <view>
                <u-image width="100%" height="130rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg"></u-image>
              </view>
              <view>
                底层2房68m<span class="square">2</span>
              </view>
              <view class="price-color">160万起</view>
            </view>
            <view class="info-item" @click="viewHomeDetail">
              <view>
                <u-image width="100%" height="130rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg"></u-image>
              </view>
              <view>
                底层2房68m<span class="square">2</span>
              </view>
              <view class="price-color">160万起</view>
            </view>
          </view>
        </view>
        <view class="home-info-wrapper padding-top-none">
          <view class="home-info-title">楼盘卖点</view>
          <view>
            <view>
              <u-tabs
                :list="sellingPointList"
                :current="sellingPointCurrent"
                active-color="#D9001B"
                @change="changeSelling"
                :is-scroll="false"></u-tabs>
            </view>
            <view>
              <view v-show="sellingPointCurrent === 0">18888元/m<span class="square">2</span>起</view>
              <view v-show="sellingPointCurrent === 1">98-128方二至四房</view>
              <view v-show="sellingPointCurrent === 2">社区委员会、居民健身房、医科大学</view>
              <view v-show="sellingPointCurrent === 3">复合物业管理 2.8元/m<span class="square">2</span>/月</view>
            </view>
          </view>
        </view>
      </view>
      <view class="content-wrapper" v-show="tabCurrent === 1">
        <u-card :show-head="false" margin="0rpx" padding="40">
          <view class="" slot="body">
            <view>
              <view class="home-info-title">报备规则</view>
              <view class="content-time">报备保护期: 3天</view>
              <view class="content-type">报备类型: 前三后四</view>
            </view>
            <view>
              <view class="home-info-title">到访规则</view>
              <view class="content-time">到访保护期: 3天</view>
              <view class="content-type">是否到访为王: 是</view>
            </view>
            <view>
              <view class="home-info-title">开发商界定规则</view>
              <view class="content-time">开发商界定规则详情说明....</view>
            </view>
          </view>
        </u-card>
      </view>
      <view class="content-wrapper" v-show="tabCurrent === 2">
        <u-card :show-head="false" margin="0rpx" padding="40">
          <view class="" slot="body">
            <view>
              <view class="home-info-title">客户年龄</view>
              <view class="content-type">26-35岁</view>
            </view>
            <view>
              <view class="home-info-title">购房目的</view>
              <view class="content-type">自住、投资</view>
            </view>
            <view>
              <view class="home-info-title">开发商界定规则</view>
              <view class="content-time">200-300万</view>
            </view>
          </view>
        </u-card>
      </view>
    </view>
    <view class="project-btn">
      <view class="btn-left">
        <view @click="isKeep">
          <u-icon :name="keepFlag ? 'star-fill' : 'star'" size="50rpx" :class="keepFlag ? 'keep-color' : ''"></u-icon>
        </view>
        <view class="keep">收藏</view>
      </view>
      <view class="btn-right">
        <u-button type="primary" shape="circle" @click="handleReport">报备</u-button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        tabList: [
          {
            name: '项目简介'
          },
          {
            name: '导客规则'
          },
          {
            name: '目标客户'
          }
        ],
        tabCurrent: 0,
        sellingPointList: [
          {
            name: '价格优势'
          },
          {
            name: '户型面积'
          },
          {
            name: '生活配套'
          },
          {
            name: '物业管理'
          }
        ],
        sellingPointCurrent: 0,
        keepFlag: false
      };
    },
    onLoad() {
    },
    methods: {
      changeTab(index) {
        this.tabCurrent = index;
      },
      changeSelling(index) {
        this.sellingPointCurrent = index;
      },
      // 收藏
      isKeep() {
        this.keepFlag = !this.keepFlag;
      },
      // 查看户型详情
      viewHomeDetail() {
        uni.navigateTo({
          url: `/intermediaryPackage/homeTab/pages/unitDetail`,
        })
      },
      // 报备
      handleReport() {
        uni.navigateTo({
          url: `/intermediaryPackage/homeTab/pages/reportClient`,
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
      padding: 20rpx 20rpx 0rpx 20rpx;

      .tab-wrapper {
        background-color: $uni-color-primary;
      }

      .content-wrapper {
        width: 100%;
        height: calc(100vh - 170rpx);
        overflow-y: auto;

        .title {
          box-sizing: border-box;
          margin: 18rpx 0rpx;
          font-size: 34rpx;
          font-weight: 600;
          color: #1C1C1C;
        }

        .price-wrapper {
          width: 100%;
          color: #FD4918;
          box-sizing: border-box;
          margin: 10rpx 0rpx;

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
        }

        .address-wrapper {
          width: 100%;
          height: 40rpx;
          line-height: 40rpx;
          box-sizing: border-box;
          margin-bottom: 15rpx;
          display: flex;
          align-items: center;
        }

        .rule-color {
          box-sizing: border-box;
          padding: 20rpx 30rpx;
          background-color: #FDEBEB;
          white-space: normal;
          word-break: break-all;
        }

        .content-time {
          box-sizing: border-box;
          margin: 20rpx 0rpx;
        }

        .content-type {
          box-sizing: border-box;
          margin-bottom: 60rpx;
        }
      }

      .home-info-wrapper {
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx;

        .home-info {
          width: 100%;
          box-sizing: border-box;
          margin-top: 20rpx;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;

          .info-item {
            flex: 1;
            box-sizing: border-box;

            &:not(:last-child) {
              margin-right: 30rpx;
            }

            view {
              margin-bottom: 10rpx;
            }
          }

          .price-color {
            color: #FD4918;
          }
        }
      }

      .padding-top-none {
        padding-top: 0rpx;
      }
    }

    .project-btn {
      width: 100%;
      height: 95rpx;
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      z-index: 9999;
      display: flex;
      background-color: #ffffff;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0rpx 30rpx;

      .btn-left {
        width: 30%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;

        .keep-color {
          color: #D9001B;
          //background-color: #D9001B;
        }

        .keep {
          margin-left: 20rpx;
          font-size: 38rpx;
        }
      }

      .btn-right {
        width: 70%;
      }
    }
  }
</style>