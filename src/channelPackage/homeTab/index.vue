<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-15 14:49:15
-->
<template>
  <ChannelTabBar>
    <view class="home-page-wrapper">
      <view class="top-wrapper">
        <view class="top-location">
          <u-icon name="map-fill" size="50rpx" class="icon"></u-icon>
          <view>广州市</view>
        </view>
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
      </view>
      <view class="swiper-wrapper">
        <u-swiper :list="list" indicator-pos="bottomLeft" height="286rpx"></u-swiper>
      </view>
      <view>
        <u-grid :col="4" :border="false" @click="goToItem">
          <u-grid-item index="homeTab/pages/projectList">
            <u-image width="98rpx" height="98rpx" :src="icon_1"></u-image>
            <view class="grid-text">新房楼盘</view>
          </u-grid-item>
          <u-grid-item index="myTab/pages/myReport">
            <u-image width="98rpx" height="98rpx" :src="icon_2"></u-image>
            <view class="grid-text">我的报备</view>
          </u-grid-item>
          <u-grid-item index="homeTab/pages/reportClient">
            <u-image width="98rpx" height="98rpx" :src="icon_3"></u-image>
            <view class="grid-text">报备客户</view>
          </u-grid-item>
          <u-grid-item index="myTab/pages/dealList">
            <u-image width="98rpx" height="98rpx" :src="icon_4"></u-image>
            <view class="grid-text">成交记录</view>
          </u-grid-item>
        </u-grid>
      </view>
      <u-gap height="20" bg-color="#F1F1F1"></u-gap>
      <view class="title">
        <u-image width="100%" height="54rpx" :src="icon_5"></u-image>
      </view>
      <view class="content-wrapper">
        <view class="content" v-for="item in tablePage" :key="item.proId" @click="viewProjectDetail(item)">
          <view>
            <u-image width="242rpx" height="186rpx" :src="item.imgScr"></u-image>
          </view>
          <view class="content-right">
            <view class="title-wrapper">{{item.proName}}</view>
            <view class="tag-wrapper">
              <view class="tag">
                <text>{{item.district}}</text>
              </view>
            </view>
            <view class="price-wrapper">
              <span class="price">均价{{item.averagePrice}}</span>
              <span class="unit">元/m²</span>
            </view>
            <view class="rule">
              <span class="rule-tap">佣</span>
              <span class="rule-text">{{item.commissionRules}}</span>
            </view>
          </view>
        </view>
        <view class="loading-wrapper">
          <!-- <u-loadmore status="loading" />-->
          <u-divider half-width="100%">没有更多了</u-divider>
        </view>
      </view>
    </view>
  </ChannelTabBar>
</template>

<script>
  import pagination from "@/mixins/pagination";
  import { getImgUrl, getRecommendItemList } from "@/api/channel";
  export default {
    mixins: [pagination],
    data() {
      return {
        queryPageParameters: {
          location: '',
          projectName: ''
        },
        tableTotal: null, //总数
        tablePage: [], //列表数据
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
            image: require('@/channelPackage/common/img/banner_1.png'),
            title: '昨夜星辰昨夜风，画楼西畔桂堂东'
          },
          {
            image: require('@/channelPackage/common/img/banner_2.jpeg'),
            title: '身无彩凤双飞翼，心有灵犀一点通'
          },
          {
            image: require('@/channelPackage/common/img/banner_3.jpg'),
            title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
          }
        ],
        houseImg: require('@/channelPackage/common/img/house.jpg'),
        icon_1: require('@/channelPackage/common/icon/list.png'),
        icon_2: require('@/channelPackage/common/icon/myClient.png'),
        icon_3: require('@/channelPackage/common/icon/reportClient.png'),
        icon_4: require('@/channelPackage/common/icon/myReport.png'),
        icon_5: require('@/channelPackage/common/icon/recommend.png'),
      };
    },
    onLoad() {
      // uni.getLocation({
      //   type: 'wgs84',
      //   success: function (res) {
      //     console.log('当前位置的经度：', res);
      //   }
      // });
      this.getListMixin();
    },
    onShow() {
      console.log('onShow');
    },
    methods: {
      async getListMixin() {
        let data = await getRecommendItemList(this.queryPageParameters);
        if (data.length > 0) {
          data.forEach((item) => {
            if (item.attachAddr && item.attachAddr.fileId) {
              item.imgScr = getImgUrl(item.attachAddr.fileId);
            } else {
              item.imgScr = this.houseImg;
            }
          })
          this.tablePage = data;
        } else {
          this.tablePage = [];
        }
        // this.setPageDataMixin(await getRecommendItemList(this.queryPageParameters));
      },
      locationCallback(index) {
        this.queryPageParameters.location = this.locationList[index].text;
      },
      // 跳转Tabs页
      goToItem(index) {
        // console.log(index);
        uni.navigateTo({
          url: `/channelPackage/${index}`,
        })
      },
      // 查看项目详情
      viewProjectDetail(item) {
        uni.navigateTo({
          url: `/channelPackage/homeTab/pages/projectDetail?proId=${item.proId}`,

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
      height: 92rpx;
      box-sizing: border-box;
      padding: 10rpx 24rpx 10rpx 18rpx;
      display: flex;
      align-items: center;
      background-color: #F1F1F1;

      .top-location {
        //width: 160rpx;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #626262;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin-right: 32rpx;

        .icon {
          /deep/.u-icon__icon {
            filter: opacity(0.5);
          }
        }
      }

      .search {
        flex: 1;
        height: 72rpx;
      }
    }

    .swiper-wrapper {
      width: 100%;
      box-sizing: border-box;

      /deep/.u-list-image-wrap {
        //border-radius: inherit !important;
        border-radius: 0rpx !important;
      }
    }

    .grid-text {
      //width: 118rpx;
      //height: 29rpx;
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #626262;
      box-sizing: border-box;
      margin-top: 30rpx;
    }

    .title {
      height: 102rpx;
      text-align: center;
      box-sizing: border-box;
      padding: 23rpx 29rpx 25rpx 29rpx;
    }

    .content-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 20rpx 0rpx 20rpx;

      .content {
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx 0rpx;
        display: flex;
        flex-direction: row;
        align-items: center;


        &:not(:last-child) {
          border-bottom: 1px solid #f2f2f2;
        }

        .content-right {
          flex: 1;
          box-sizing: border-box;
          margin-left: 32rpx;

          .title-wrapper {
            height: 32rpx;
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1C1C1C;
            margin-bottom: 14rpx;
          }

          .tag-wrapper {
            margin-bottom: 18rpx;

            .tag {
              width: 84rpx;
              height: 32rpx;
              line-height: 32rpx;
              text-align: center;
              background: rgba(241, 241, 241, 1);

              text {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #666666;
              }
            }
          }

          .price-wrapper {
            width: 100%;
            color: #FD4918;
            margin-bottom: 16rpx;
            font-family: PingFang SC;

            .price {
              font-size: 32rpx;
              height: 32rpx;
              font-weight: 600;
            }

            .unit {
              font-size: 22rpx;
              box-sizing: border-box;
              display: inline-block;
              margin-left: 8rpx;
              font-weight: 400;
            }

            .two {
              vertical-align: super;
              font-size: 18rpx;
            }
          }

          .rule {
            width: 100%;
            font-family: PingFang SC;

            .rule-tap {
              width: 32rpx;
              height: 32rpx;
              line-height: 32rpx;
              text-align: center;
              display: inline-block;
              box-sizing: border-box;
              margin-right: 10rpx;
              background: #FC9C05;
              border-radius: 4rpx;
              font-size: 24rpx;
              font-weight: 600;
              color: #FFFFFF;
            }

            .rule-text {
              font-size: 24rpx;
              font-weight: 400;
              color: #666666;
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