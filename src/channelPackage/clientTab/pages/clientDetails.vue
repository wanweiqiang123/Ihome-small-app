<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-25 16:13:38
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-25 17:20:38
-->
<template>
  <view class="client-details-wrapper">
    <view class="client-info">
      <view class="name-wrapper">
        <view class="name-left">
          <span class="name">{{detailForm.name}}</span>
          <span>({{getDictName(detailForm.sex, sexList)}})</span>
        </view>
        <view>
          <u-icon name="edit-pen" size="45" @click="editClient"></u-icon>
        </view>
      </view>
      <view class="phone-wrapper">
        <span>{{detailForm.mobile}}</span>
        <u-icon class="icon-wrapper" name="phone" color="#04F21C" size="40"></u-icon>
      </view>
      <view class="time">录入时间：{{detailForm.inputTime}}</view>
      <view class="time">报备楼盘：{{detailForm.reportDetails.length}}</view>
    </view>
    <view class="tabs-wrapper">
      <u-tabs :list="list" :is-scroll="false" :current="current" @change="changeTabs"></u-tabs>
    </view>
    <view class="details-content-wrapper" v-show="current === 0">
      <view class="item">
        <view>意向区域：</view>
        <view class="item-right">
          {{getDictName(detailForm.intentionProvince, areaRegion)}}{{getDictName(detailForm.intentionCity, areaRegion)}}{{getDictName(detailForm.intentionCounty, areaRegion)}}
        </view>
      </view>
      <view class="item">
        <view>购房目的：</view>
        <view class="item-right">
          <text v-for="(item, index) in detailForm.purposeOfPurchases" :key="index">{{getDictName(item, targetList)}}</text>
        </view>
      </view>
      <view class="item">
        <view>意向面积：</view>
        <view class="item-right">
          <text v-for="(item, index) in detailForm.intentAreas" :key="index">{{getDictName(item, areaList)}}</text>
        </view>
      </view>
      <view class="item">
        <view>意向户型：</view>
        <view class="item-right">
          <text v-for="(item, index) in detailForm.intentAreas" :key="index">{{getDictName(item, unitTypeList)}}</text>
        </view>
      </view>
      <view class="item">
        <view>房屋装修：</view>
        <view class="item-right">
          <text v-for="(item, index) in detailForm.houseDecorations" :key="index">{{getDictName(item, decorationList)}}</text>
        </view>
      </view>
      <view class="item">
        <view>关注因素：</view>
        <view class="item-right">
          <text v-for="(item, index) in detailForm.factorsOfConcerns" :key="index">{{getDictName(item, factorList)}}</text>
        </view>
      </view>
    </view>
    <view class="details-content-wrapper" v-show="current === 1">
      <view class="item">
        <view>年龄段：</view>
        <view class="item-right">{{getDictName(detailForm.ageGroup, ageList)}}</view>
      </view>
      <view class="item">
        <view>现住区域：</view>
        <view class="item-right">
          {{getDictName(detailForm.nowliveProvince, areaRegion)}}{{getDictName(detailForm.nowliveCity, areaRegion)}}{{getDictName(detailForm.nowliveCounty, areaRegion)}}
        </view>
      </view>
      <view class="item">
        <view>工作区域：</view>
        <view class="item-right">
          {{getDictName(detailForm.workProvince, areaRegion)}}{{getDictName(detailForm.workCity, areaRegion)}}{{getDictName(detailForm.workCounty, areaRegion)}}
        </view>
      </view>
    </view>
    <view class="details-content-wrapper" v-show="current === 2">
      <view class="time-line-wrapper">
        <u-time-line>
          <u-time-line-item v-for="item in detailForm.reportCustomerFollowups" :key="item.id">
            <template v-slot:content>
              <view>
                <view class="lien-title">{{getDictName(item.type, followTypeList)}}跟进</view>
                <view class="lien-time">{{item.followTime}}</view>
                <view class="lien-des">跟进情况：{{item.describe}}</view>
              </view>
            </template>
          </u-time-line-item>
        </u-time-line>
      </view>
      <view class="time-btn">
        <u-button type="primary" size="medium" @click="handleFollow">写跟进</u-button>
      </view>
    </view>
    <view class="details-content-wrapper" v-show="current === 3">
      <view class="details-report-wrapper" v-for="item in [1,2,3,4,5,6]" :key="item">
        <view class="report-title">
          <view class="left">广州保利天际(335金融中心)</view>
          <view class="right">
            <u-button type="primary" size="mini">审核中</u-button>
          </view>
        </view>
        <view class="location">天河区</view>
        <view class="location">
          <span class="left">佣</span>佣金规则
        </view>
        <view class="location">2020-08-27 19:12:20</view>
        <view class="btn-wrapper">
          <u-button type="warning" size="mini" shape="circle" @click="uploadAttach">上传附件</u-button>
          <u-button type="primary" size="mini" shape="circle" @click="viewDetails">详情</u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {getAreaList, getCustomerById} from "@/api/channel";
import { getAllByTypeApi } from "@/api/index";
export default {
  data() {
    return {
      detailForm: {},
      list: [
        {
          name: '需求'
        },
        {
          name: '详情'
        },
        {
          name: '跟进'
        },
        {
          name: '报备'
        }
      ],
      current: 0,
      sexList: [],
      areaRegion: [],
      sourceList: [],
      targetList: [],
      areaList: [],
      unitTypeList: [],
      decorationList: [],
      factorList: [],
      ageList: [],
      followTypeList: [],
    };
  },
  async onLoad(option) {
    this.sexList = await this.getDictByType('SexType'); // 性别
    this.areaRegion = await this.getArea(); // 省市区
    this.sourceList = await this.getDictByType('CustomerSourceType'); // 客户来源
    this.targetList = await this.getDictByType('HousePurchaseType'); // 购房目的
    this.areaList = await this.getDictByType('IntentionSpaceType'); // 意向面积
    this.unitTypeList = await this.getDictByType('RoomType'); // 意向户型
    this.decorationList = await this.getDictByType('RenovatLevel'); // 房屋装修
    this.factorList = await this.getDictByType('FocusElementType'); // 关注因素
    this.ageList = await this.getDictByType('AgeType'); // 年龄
    this.followTypeList = await this.getDictByType('FollowUpType'); // 跟进
    if (option && option.id) {
      await this.initPage(option.id);
    }
  },
  methods: {
    // 点击tabs
    changeTabs(index) {
      this.current = index;
    },
    // 编辑客户
    editClient() {
      uni.navigateTo({
        url: `/channelPackage/clientTab/pages/enterClient?id=145`,

      });
    },
    // 上传附件
    uploadAttach() {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/uploadAttachment`
      });
    },
    // 详情
    viewDetails() {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/reportDetails`
      });
    },
    // 写跟进
    handleFollow() {
      uni.navigateTo({
        url: `/channelPackage/clientTab/pages/followUp`
      });
    },
    // 初始化详情页面
    async initPage(id) {
      const info = await getCustomerById(id);
      console.log('initPage', info);
      this.detailForm = info;
    },
    // 获取字典
    async getDictByType(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 获取对应字典name
    getDictName(code, list) {
      if (list.length) {
        const item = list.find(v => v.code === code);
        return item?.name;
      } else {
        return '';
      }
    },
    // 获取省市区
    async getArea() {
      let areaList = await getAreaList();
      return areaList;
    },
  },
};
</script>

<style lang="scss" scoped>
  .client-details-wrapper {
    width: 100%;
    box-sizing: border-box;

    .client-info {
      width: 100%;
      padding: 10rpx 30rpx;

      .name-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 20rpx 0rpx ;

        .name-left {
          flex: 1;

          .name {
            font-size: 38rpx;
            font-weight: 600;
            display: inline-block;
            margin-right: 30rpx;
          }
        }
      }

      .phone-wrapper {
        padding-bottom: 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;

        .icon-wrapper {
          display: inline-block;
          margin-left: 20rpx;
        }
      }

      .time {
        padding-bottom: 20rpx;
      }
    }

    .tabs-wrapper {
      width: 100%;
      height: 80rpx;
    }

    .details-content-wrapper {
      width: 100%;
      height: calc(100vh - 390rpx);
      overflow-y: auto;
      padding: 15rpx 30rpx;

      .item {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding-bottom: 20rpx;

        .item-right {
          flex: 1;
        }
      }

      .time-line-wrapper {
        padding: 0rpx 10rpx;

        .lien-title, .lien-time, .lien-des {
          padding-bottom: 10rpx;
        }

        .lien-title {
          font-weight: 600;
        }
      }

      .time-btn {
        width: 100%;
        text-align: center;
      }

      .details-report-wrapper {
        width: 100%;
        padding: 20rpx 5rpx;
        border-bottom: 2rpx solid #F2F2F2;

        .report-title {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-bottom: 10rpx;

          .left {
            flex: 1;
            font-weight: 600;
          }
        }

        .location {
          padding-bottom: 10rpx;

          .left {
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

        .btn-wrapper {
          width: 100%;
          text-align: right;

          /deep/.u-btn {
            margin-left: 20rpx;
          }
        }
      }
    }
  }
</style>