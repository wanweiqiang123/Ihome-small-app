<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-24 11:47:20
-->
<template>
  <ChannelTabBar>
    <view class="home-page-wrapper">
      <!-- <view class="top-wrapper">
        <view class="top-location">
          <u-icon
            name="map-fill"
            size="50rpx"
            class="icon"
          ></u-icon>
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
          v-model="queryPageParameters.projectName"
        ></u-search>
      </view> -->
      <view class="swiper-wrapper">
        <u-swiper
          :list="list"
          indicator-pos="bottomLeft"
          height="286rpx"
        ></u-swiper>
      </view>
      <view v-if="isShowList">
        <u-grid
          :col="4"
          :border="false"
          @click="goToItem">
          <u-grid-item
            v-for="(item, index) in gridList"
            :key="index"
            :index="item.path"
            v-if="item.isShow">
            <u-image
              width="98rpx"
              height="98rpx"
              :src="item.icon"
            ></u-image>
            <view class="grid-text">{{item.name}}</view>
          </u-grid-item>
        </u-grid>
      </view>
      <u-gap
        v-if="isShowList"
        height="20"
        bg-color="#F1F1F1"
      ></u-gap>
      <view class="title">
        <u-image
          width="100%"
          height="54rpx"
          :src="icon_5"
        ></u-image>
      </view>
      <view class="content-wrapper">
        <view
          class="content"
          v-for="item in tablePage"
          :key="item.proId"
          @click="viewProjectDetail(item)"
        >
          <view>
            <u-image
              width="242rpx"
              height="186rpx"
              :src="item.imgScr"
            ></u-image>
          </view>
          <view class="content-right">
            <view class="title-wrapper">{{item.proName}}</view>
            <text class="tag-wrapper">{{item.districtName}}</text>
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
        <view
          class="loading-wrapper"
          v-if="tablePage.length"
        >
          <!-- <u-loadmore status="loading" />-->
          <u-divider half-width="100%">没有更多了</u-divider>
        </view>
        <view
          class="empty-wrapper"
          v-else
        >
          <u-empty
            text="暂无数据"
            mode="list"
          ></u-empty>
        </view>
      </view>
    </view>
  </ChannelTabBar>
</template>

<script>
import pagination from "@/mixins/pagination";
import { getRecommendItemList } from "@/api/channel";
import tool from "@/common/tool";

export default {
  mixins: [pagination],
  data() {
    return {
      queryPageParameters: {
        location: "",
        projectName: "",
      },
      tableTotal: null, //总数
      tablePage: [], //列表数据
      showLocation: false,
      locationList: [
        {
          text: "广州",
        },
        {
          text: "深圳",
        },
        {
          text: "肇庆",
        },
      ],
      list: [
        {
          image: require("@/channelPackage/common/img/banner_3.jpg"),
          title: "昨夜星辰昨夜风，画楼西畔桂堂东",
        },
      ],
      houseImg: require("@/channelPackage/common/img/house.jpg"),
      gridList: [
        {
          icon: require("@/channelPackage/common/icon/list.png"),
          path: "/channelPackage/homeTab/pages/projectList",
          name: "新房楼盘",
          isShow: this.$has("B.WXAPP.CHANNEL.HOMEPAGE.NEWPROPERTIES")
        },
        {
          icon: require("@/channelPackage/common/icon/myClient.png"),
          path: "/channelPackage/myTab/pages/myReport",
          name: "我的报备",
          isShow: this.$has("B.WXAPP.CHANNEL.HOMEPAGE.MYREPORT")
        },
        {
          icon: require("@/channelPackage/common/icon/reportClient.png"),
          path: "/channelPackage/homeTab/pages/reportClient",
          name: "报备客户",
          isShow: this.$has("B.WXAPP.CHANNEL.HOMEPAGE.REPORTTOCUSMERS")
        },
        {
          icon: require("@/channelPackage/common/icon/myReport.png"),
          path: "/channelPackage/myTab/pages/dealList",
          name: "成交记录",
          isShow: this.$has("B.WXAPP.CHANNEL.HOMEPAGE.DEALRECORD")
        },
      ],
      icon_5: require("@/channelPackage/common/icon/recommend.png"),
    };
  },
  computed: {
    isShowList() {
      let flag = false;
      if (this.gridList && this.gridList.length) {
        flag = this.gridList.some((list) => {
          return list.isShow;
        });
      }
      return flag;
    }
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
    console.log("onShow");
  },
  methods: {
    async getListMixin() {
      let data = await getRecommendItemList(this.queryPageParameters);
      if (data.length > 0) {
        data.forEach((item) => {
          if (item.attachAddr && item.attachAddr.fileId) {
            item.imgScr = tool.getFileUrl(item.attachAddr.fileId);
          } else {
            item.imgScr = this.houseImg;
          }
        });
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
    goToItem(url) {
      getApp().myReport = {};
      uni.navigateTo({
        url: url,
      });
    },
    // 查看项目详情
    viewProjectDetail(item) {
      uni.navigateTo({
        url: `/channelPackage/homeTab/pages/projectDetail?proId=${item.proId}`,
      });
    },
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
    background-color: #f1f1f1;

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
          //height: 32rpx;
          font-size: 30rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1c1c1c;
          margin-bottom: 14rpx;
        }

        .tag-wrapper {
          display: inline-block;
          padding: 0rpx 8rpx;
          margin-bottom: 14rpx;
          background: rgba(241, 241, 241, 1);
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #666666;
        }

        .price-wrapper {
          width: 100%;
          color: #fd4918;
          margin-bottom: 14rpx;
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
            background: #fc9c05;
            border-radius: 4rpx;
            font-size: 24rpx;
            font-weight: 600;
            color: #ffffff;
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

    .empty-wrapper {
      width: 100%;
      height: 300rpx;
    }
  }
}
</style>