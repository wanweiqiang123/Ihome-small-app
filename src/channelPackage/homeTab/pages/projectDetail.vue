<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-23 11:15:50
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:52:30
-->
<template>
  <view class="project-detail-wrapper">
    <view class="bg-wrapper"></view>
    <view class="detail-content-wrapper">
      <view class="tab-wrapper">
        <u-tabs
          :list="tabList"
          :current="tabCurrent"
          bar-width="170"
          :font-size="32"
          bg-color=""
          inactive-color="#FFFFFF"
          active-color="#FFFFFF"
          @change="changeTab"
          :is-scroll="false"
        ></u-tabs>
      </view>
      <view
        class="content-wrapper"
        v-show="tabCurrent === 0"
      >
        <view>
          <u-image
            width="100%"
            height="324rpx"
            border-radius="4"
            :src="banner"
          ></u-image>
          <view class="title">{{detailInfo.proName | emptyFilter}}</view>
          <view class="price-wrapper">
            <span class="price">均价{{detailInfo.averagePrice | emptyFilter}}</span>
            <span class="unit">元/m²</span>
          </view>
          <view class="address-wrapper">
            <u-icon
              name="map-fill"
              size="40rpx"
              class="icon"
            ></u-icon>
            <view class="text">{{detailInfo.provinceName | emptyFilter}}{{detailInfo.cityName | emptyFilter}}{{detailInfo.districtName | emptyFilter}}</view>
          </view>
          <!-- <view class="rule-color">
            <view>佣金规则：</view>
            <view>{{detailInfo.commissionRules}}</view>
          </view> -->
        </view>
        <view class="home-info-wrapper u-margin-top-80">
          <view class="home-info-title">户型信息</view>
          <view class="home-info">
            <view
              class="info-item"
              v-for="(item, index) in detailInfo.houseTypeDetailVos"
              :key="index"
              @click="viewHomeDetail(item)"
            >
              <view>
                <u-image
                  width="100%"
                  height="160rpx"
                  :src="item.picAddr"
                ></u-image>
              </view>
              <view class="title-tip">{{item.houseName | emptyFilter}}</view>
              <view class="price-color">{{item.averagePrice | emptyFilter}}万起</view>
            </view>
          </view>
        </view>
        <view class="home-info-wrapper u-margin-top-80">
          <view class="home-info-title">楼盘卖点</view>
          <view class="u-margin-top-42">
            <view class="selling-point-tabs">
              <view
                v-for="(item, index) in sellingPointList"
                :key="index"
                @click="showPoints(item, index)"
              >
                <text :class="sellingPointCurrent === index ? 'tabs-item' : ''">{{item.name | emptyFilter}}</text>
              </view>
            </view>
            <view class="u-margin-top-36">
              <u-parse :html="content"></u-parse>
            </view>
          </view>
        </view>
      </view>
      <view
        class="content-wrapper"
        v-show="tabCurrent === 1"
      >
        <view class="u-padding-30">
          <view class="u-margin-bottom-50">
            <view class="home-info-title">报备规则</view>
            <view class="content-time">报备保护期: {{detailInfo.customerReportRule.developerProtectionPeriod ? detailInfo.customerReportRule.developerProtectionPeriod: 0}}天</view>
            <view class="content-time">报备类型: {{getDictName(detailInfo.customerReportRule.reportTypeEnum, ReportType) | emptyFilter}}</view>
          </view>
          <view class="u-margin-bottom-50">
            <view class="home-info-title">到访规则</view>
            <view class="content-time">到访保护期: {{detailInfo.customerReportRule.customerProtectionPeriod ? detailInfo.customerReportRule.customerProtectionPeriod: 0}}天</view>
            <view class="content-time">是否到访为王: {{detailInfo.customerReportRule.exVisit ? '是' : '否'}}</view>
          </view>
          <view>
            <view class="home-info-title">开发商界定规则</view>
            <view class="content-time">{{detailInfo.customerReportRule.developersRules | emptyFilter}}</view>
          </view>
        </view>
      </view>
      <view
        class="content-wrapper"
        v-show="tabCurrent === 2"
      >
        <view class="u-padding-30">
          <view class="u-margin-bottom-50">
            <view class="home-info-title">客户年龄</view>
            <view class="content-time">{{detailInfo.promotionVO.customerAge | emptyFilter}}</view>
          </view>
          <view class="u-margin-bottom-50">
            <view class="home-info-title">购房目的</view>
            <view class="content-time">{{detailInfo.promotionVO.housePurchasing | emptyFilter}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="project-btn">
      <view
        class="btn-left"
        @click="collect"
      >
        <view>
          <u-icon
            :name="keepFlag ? 'star-fill' : 'star'"
            size="50rpx"
            :class="keepFlag ? 'keep-color' : ''"
          ></u-icon>
        </view>
        <view class="keep">收藏</view>
      </view>
      <view class="btn-right">
        <u-button
          type="primary"
          shape="circle"
          @click="handleReport"
        >报备</u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { getProDetail, addOrUpdateApi } from "@/api/channel";
import { getAllByTypeApi } from "../../../api/index";
export default {
  data() {
    return {
      currentProId: null, // 项目的id
      detailInfo: {
        houseTypeDetailVos: [], // 户型信息
        customerReportRule: {}, // 导客规则信息
        promotionVO: {},
        promotion: [], // 楼盘卖点
        proId: "",
        proName: "",
      }, // 详情信息
      banner: require("@/channelPackage/common/img/house.jpg"),
      homeImg: require("@/channelPackage/common/img/house.jpg"),
      tabList: [
        {
          name: "项目简介",
        },
        {
          name: "导客规则",
        },
        {
          name: "目标客户",
        },
      ],
      tabCurrent: 0,
      sellingPointList: [
        {
          name: "价格优势",
          content: "18888元/m²起",
        },
        {
          name: "生活配套",
          content:
            "社区委员会、居民健身房、医科大学社区委员会、居民健身房、医科大学",
        },
        {
          name: "物业管理",
          content: "复合物业管理 2.8元/m²/月",
        },
      ],
      sellingPointCurrent: 0,
      content: "18888元/m²起",
      keepFlag: false,
      ReportType: [],
    };
  },
  onLoad(option) {
    if (option && option.proId) {
      this.currentProId = option.proId;
      this.init();
    }
  },
  async onShow() {
    this.ReportType = await this.getDictAll("ReportType");
  },
  methods: {
    // 初始化页面
    async init() {
      if (!this.currentProId) return;
      this.detailInfo = await getProDetail(this.currentProId);
      // console.log('detailInfo', this.detailInfo);
      if (
        this.detailInfo.promotion &&
        this.detailInfo.promotion.priceAdvantage
      ) {
        this.sellingPointList[0].content = this.detailInfo.promotion.priceAdvantage;
      }
      if (
        this.detailInfo.promotion &&
        this.detailInfo.promotion.lifeFacilities
      ) {
        this.sellingPointList[1].content = this.detailInfo.promotion.lifeFacilities;
      }
      if (
        this.detailInfo.promotion &&
        this.detailInfo.promotion.propertyManagement
      ) {
        this.sellingPointList[2].content = this.detailInfo.promotion.propertyManagement;
      }
    },
    changeTab(index) {
      this.tabCurrent = index;
    },
    changeSelling(index) {
      this.sellingPointCurrent = index;
    },
    showPoints(item, index) {
      this.sellingPointCurrent = index;
      this.content = item.content;
    },
    // 收藏
    async collect() {
      let obj = {
        proId: this.detailInfo.proId,
        proName: this.detailInfo.proName,
      };
      if (this.keepFlag) {
        obj.status = "Invalid";
      } else {
        obj.status = "Valid";
      }
      await addOrUpdateApi(obj);
      this.keepFlag = !this.keepFlag;
    },
    // 查看户型详情
    viewHomeDetail(item) {
      uni.navigateTo({
        url: `/channelPackage/homeTab/pages/unitDetail?id=${item.houseTypeId}`,
      });
    },
    // 报备
    handleReport() {
      getApp().myReport = {
        proId: this.detailInfo.proId,
        proName: this.detailInfo.proName,
        projectPic: this.detailInfo.projectPic,
        district: this.detailInfo.districtName,
        exMarket: this.detailInfo.exMarket,
      };
      uni.navigateTo({
        url: `/channelPackage/homeTab/pages/reportClient`,
      });
    },
    // 字典翻译
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 字典匹配
    getDictName(code, list) {
      if (list.length) {
        const item = list.find((v) => v.code === code);
        return item?.name;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.project-detail-wrapper {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  font-family: PingFang SC;

  .home-info-title {
    height: 30rpx;
    line-height: 30rpx;
    text-align: left;
    border-left: 6rpx solid $u-type-primary;
    padding-left: 20rpx;
    font-size: 30rpx;
    box-sizing: border-box;
    font-family: PingFang SC;
    font-weight: 400;
    color: #1c1c1c;
  }

  .bg-wrapper {
    width: 100%;
    height: 338rpx;
    position: absolute;
    left: 0rpx;
    top: 0rpx;
    z-index: -1;
    background-color: $u-type-primary;
  }

  .detail-content-wrapper {
    width: 100%;
    position: absolute;
    left: 0rpx;
    top: 0rpx;
    z-index: 500;
    box-sizing: border-box;
    padding: 18rpx 30rpx 0rpx 30rpx;

    .tab-wrapper {
      /deep/.u-tab-item {
        font-size: 32rpx !important;
        font-family: PingFang SC !important;
        color: #ffffff !important;
      }
    }

    .content-wrapper {
      width: 100%;
      height: calc(100vh - 200rpx);
      overflow-y: auto;
      background-color: #ffffff;
      // padding: 5rpx 10rpx 0 10rpx;

      .title {
        box-sizing: border-box;
        font-size: 36rpx;
        font-weight: 500;
        color: #1c1c1c;
        margin-top: 24rpx;
        margin-bottom: 22rpx;
        padding: 0 10rpx;
      }

      .price-wrapper {
        width: 100%;
        color: #fd4918;
        box-sizing: border-box;
        margin-bottom: 16rpx;
        padding: 0 10rpx;

        .price {
          font-size: 32rpx;
          font-weight: 600;
        }

        .unit {
          font-size: 22rpx;
          box-sizing: border-box;
          display: inline-block;
          margin-left: 8rpx;
          font-weight: 400;
        }
      }

      .address-wrapper {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 16rpx;
        display: flex;
        align-items: center;

        .icon {
          /deep/.u-icon__icon {
            filter: opacity(0.5);
          }
        }

        .text {
          margin-left: 10rpx;
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #666666;
        }
      }

      .rule-color {
        line-height: 36rpx;
        box-sizing: border-box;
        padding: 20rpx 25rpx 20rpx 38rpx;
        white-space: normal;
        word-break: break-all;
        background: rgba(254, 235, 235, 0.9);
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #303133;
      }

      .content-time {
        box-sizing: border-box;
        margin: 20rpx 0rpx;
      }
    }

    .home-info-wrapper {
      width: 100%;
      box-sizing: border-box;

      .home-info {
        width: 100%;
        box-sizing: border-box;
        margin-top: 30rpx;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;

        .info-item {
          width: 32%;
          box-sizing: border-box;

          &:not(:last-child) {
            margin-right: 34rpx;
          }

          view {
            margin-bottom: 16rpx;
          }
        }

        .title-tip {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #666666;
        }

        .price-color {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 600;
          color: #fd4918;
        }
      }

      .selling-point-tabs {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

        view {
          height: 42rpx;
          font-size: 30rpx;
          text-align: center;
          font-family: PingFang SC;
          font-weight: 400;
          color: #626262;
          box-sizing: border-box;
          flex: 1;
        }

        .tabs-item {
          width: 153rpx;
          height: 42rpx;
          display: inline-block;
          background: $u-type-primary;
          border-radius: 21rpx;
          color: #ffffff;
          transition-duration: 0.5s;
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
        color: #d9001b;
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