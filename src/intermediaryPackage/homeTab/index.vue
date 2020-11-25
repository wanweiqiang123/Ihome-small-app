<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-23 17:20:21
-->
<template>
  <IntermediaryTabBar>
    <view class="home-page-wrapper">
      <view class="top-wrapper">
        <view class="top-location">
          <u-icon name="map-fill" size="50rpx"></u-icon>
          <view>广州市</view>
        </view>
        <!--        <u-input-->
        <!--          class="select"-->
        <!--          type="select"-->
        <!--          v-model="queryPageParameters.location"-->
        <!--          :type="type"-->
        <!--          placeholder="请选择"-->
        <!--          @click="showLocation = true"-->
        <!--          :border="false"/>-->
        <u-search
          class="search"
          shape="round"
          bg-color="white"
          border-color="#f2f2f2"
          :show-action="false"
          placeholder="请输入项目名称"
          v-model="queryPageParameters.projectName"></u-search>
      </view>
      <view class="swiper-wrapper">
        <u-swiper :list="list" height="290rpx"></u-swiper>
      </view>
      <view>
        <u-grid :col="4" :border="false" @click="goToItem">
          <u-grid-item index="homeTab/pages/projectList">
            <u-icon name="hourglass" :size="66"></u-icon>
            <view class="grid-text">新房楼盘</view>
          </u-grid-item>
          <u-grid-item index="myTab/pages/myReport">
            <u-icon name="star" :size="66"></u-icon>
            <view class="grid-text">我的报备</view>
          </u-grid-item>
          <u-grid-item index="homeTab/pages/reportClient">
            <u-icon name="account" :size="66"></u-icon>
            <view class="grid-text">报备客户</view>
          </u-grid-item>
          <u-grid-item>
            <u-icon name="bag" :size="66"></u-icon>
            <view class="grid-text">成交记录</view>
          </u-grid-item>
        </u-grid>
      </view>
      <u-gap height="20" bg-color="#f2f2f2"></u-gap>
      <view class="content-wrapper">
        <view class="title">推荐房源</view>
        <view class="content" v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="item" @click="viewProjectDetail">
          <view>
            <u-image width="242rpx" height="186rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg"></u-image>
          </view>
          <view class="content-right">
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
        </view>
        <view class="loading-wrapper">
          <u-loadmore status="loading" />
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
          location: '',
          projectName: ''
        },
        showLocation: false,
        locationList: [
          {
            text: '广州'
          },
          {
            text: '深圳'
          },
          {
            text: '肇庆'
          }
        ],
        list: [
          {
            image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
            title: '昨夜星辰昨夜风，画楼西畔桂堂东'
          },
          {
            image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
            title: '身无彩凤双飞翼，心有灵犀一点通'
          },
          {
            image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
            title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
          }
        ]
      };
    },
    onLoad() {
    },
    methods: {
      locationCallback(index) {
        this.queryPageParameters.location = this.locationList[index].text;
      },
      goToItem(index) {
        console.log(index);
        uni.navigateTo({
          url: `/intermediaryPackage/${index}`,
        })
      },
      // 查看项目详情
      viewProjectDetail() {
        uni.navigateTo({
          url: `/intermediaryPackage/homeTab/pages/projectDetail`,
        })
      }
    },
  };
</script>

<style lang="scss" scoped>
  .home-page-wrapper {
    width: 100%;
    box-sizing: border-box;

    .top-wrapper {
      width: 100%;
      height: 72rpx;
      box-sizing: border-box;
      padding: 0rpx 20rpx;
      margin-top: 10rpx;
      display: flex;
      /*background-color: #f2f2f2;*/

      .top-location {
        width: 160rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        view {
          font-size: 30rpx;
        }
      }

      .select {
        width: 150rpx;
        height: 72rpx;
        background: #eee;
        box-sizing: border-box;
        padding-left: 8px;
        border-bottom-left-radius: 8rpx;
        border-top-left-radius: 8rpx;
        position: relative;

        &:before { /* | 效果*/
          content: "";
          width: 1px;
          position: absolute;
          height: 65%;
          top: 15%;
          right: 0;
          background: black;
        }
      }

      .search {
        flex: 1;
        height: 72rpx;

        /deep/ .u-content {
          height: 72rpx !important;
        }
      }
    }

    .swiper-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 0rpx 20rpx;
      margin: 8rpx 0rpx;
    }

    .content-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 20rpx 0rpx 20rpx;

      .title {
        text-align: center;
        font-size: 32rpx;
        box-sizing: border-box;
        margin-bottom: 20rpx;
      }

      .content {
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx 0rpx;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #f2f2f2;

        .content-right {
          flex: 1;
          box-sizing: border-box;
          margin-left: 25rpx;

          view {
            box-sizing: border-box;
            margin-bottom: 10rpx;
          }

          .title-wrapper {
            font-size: 32rpx;
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
      }

      .loading-wrapper {
        width: 100%;
        box-sizing: border-box;
        margin: 20rpx 0rpx;
      }
    }
  }
</style>