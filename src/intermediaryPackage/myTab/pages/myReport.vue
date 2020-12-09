<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-24 15:22:09
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-08 19:41:20
-->
<template>
  <view class="my-report-wrapper">
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
        :clearabled="false"
        placeholder="请输入客户姓名/电话"
        v-model="queryPageParameters.projectName"></u-search>
    </view>
    <view class="my-report-tabs-wrapper">
      <view class="tabs-item" v-for="(item, index) in tabsList" :key="item.id" @click="changeTabs(item, index)">
        <text :class="currentTabs === index ? 'name activating' : 'name'">{{item.name}}</text>
      </view>
    </view>
    <view class="my-report-list">
      <view class="list-item-wrapper" v-for="item in [1, 2, 3, 4, 5, 6, 7]" :key="item">
        <view class="item-info">
          <view class="name-wrapper">
            <view class="name">陈小明</view>
            <view class="status">审核中</view>
          </view>
          <view class="phone">18300015234</view>
          <view class="location">广州保利天际(335金融中心)</view>
          <view class="time">2020-08-27 19:12:20</view>
        </view>
        <view class="item-btn u-padding-right-20">
          <u-button shape="circle" type="primary" @click="viewDetails">查看详情</u-button>
          <u-button shape="circle" type="warning" @click="uploadAttachment">上传附件</u-button>
          <u-button shape="circle" type="error" @click="handleDealRegister" v-show="currentTabs === 1">成交登记</u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryPageParameters: {
          projectName: ''
        },
        tabsList: [
          {
            id: 1,
            name: '已报备'
          },
          {
            id: 2,
            name: '已到访'
          },
          {
            id: 3,
            name: '已成交'
          },
          {
            id: 4,
            name: '无效单'
          }
        ],
        currentTabs: 0
      };
    },
    onLoad() {
    },
    methods: {
      // 切换tabs
      changeTabs(item, index) {
        console.log(item);
        this.currentTabs = index;
      },
      // 成交登记
      handleDealRegister() {
        uni.navigateTo({
          url: `/intermediaryPackage/homeTab/pages/reportClient?type=dealReg`,
        })
      },
      // 上传附件
      uploadAttachment() {
        uni.navigateTo({
          url: `/intermediaryPackage/myTab/pages/uploadAttachment`,
        })
      },
      // 查看详情
      viewDetails() {
        uni.navigateTo({
          url: `/intermediaryPackage/myTab/pages/reportDetails`,
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .my-report-wrapper {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    background-color: #F1F1F1;

    .top-wrapper {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      box-sizing: border-box;
      padding: 0rpx 30rpx;
    }

    .my-report-tabs-wrapper {
      width: 100%;
      height: 78rpx;
      background: #FFFFFF;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;

      .tabs-item {
        flex: 1;
        font-size: 30rpx;
        font-family: PingFang SC;
        color: #303133;

        .name {
          width: 128rpx;
          height: 42rpx;
          border-radius: 21rpx;
          display: inline-block;
        }
      }

      .activating {
        font-weight: bold;
        background: $u-type-primary;
        color: #FFFFFF;
        transition-duration: 0.5s;
      }
    }

    .my-report-list {
      width: 100%;
      height: calc(100vh - 170rpx);
      overflow-y: auto;
      box-sizing: border-box;
      padding: 18rpx 30rpx;

      .list-item-wrapper {
        width: 100%;
        //height: 322rpx;
        box-sizing: border-box;
        margin-bottom: 20rpx;
        background-color: #FFFFFF;

        .item-info {
          width: 100%;
          //height: 222rpx;
          box-sizing: border-box;
          padding: 28rpx 0rpx 34rpx 32rpx;
          border-bottom: 2rpx dashed #F1F1F1;

          .name-wrapper {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: center;

            .name {
              flex: 1;
              font-size: 30rpx;
              font-weight: 600;
              font-family: PingFang SC;
              font-weight: 600;
              color: #1F1F1F;
              line-height: 48rpx;
            }

            .status {
              width: 106rpx;
              height: 44rpx;
              line-height: 44rpx;
              text-align: center;
              border-top-left-radius: 20rpx;
              border-bottom-left-radius: 20rpx;
              background: #00C777;
              color: #FFFFFF;
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 600;
            }
          }

          .phone, .location, .time {
            width: 100%;
            box-sizing: border-box;
            font-size: 26rpx;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #606266;
            line-height: 40rpx;
          }
        }

        .item-btn {
          width: 100%;
          height: 100rpx;
          line-height: 100rpx;
          text-align: right;
          box-sizing: border-box;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;

          /deep/.u-btn {
            width: 200rpx;
            height: 66rpx;
            margin-left: 20rpx;
          }
        }
      }
    }
  }
</style>