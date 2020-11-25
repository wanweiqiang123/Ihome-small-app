<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-24 15:22:09
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-25 10:55:55
-->
<template>
  <view class="my-report-wrapper">
    <view class="top-wrapper">
      <u-search
        class="search"
        bg-color="white"
        shape="square"
        border-color="#f2f2f2"
        :show-action="false"
        :clearabled="false"
        placeholder="请输入客户姓名/电话"
        v-model="queryPageParameters.projectName"></u-search>
    </view>
    <view>
      <u-tabs :list="list" :is-scroll="false" :current="current" @change="changeTabs"></u-tabs>
    </view>
    <view class="my-report-list">
      <view class="list-item-wrapper" v-for="item in [1, 2, 3, 4, 5, 6, 7]" :key="item">
        <view class="item-info">
          <view class="name-wrapper">
            <view class="name">陈</view>
            <view class="btn">
              <u-button type="primary" size="mini">审核中</u-button>
            </view>
          </view>
          <view class="phone">18300015234</view>
          <view class="location">广州保利天际(335金融中心)</view>
          <view class="time">2020-08-27 19:12:20</view>
        </view>
        <view class="item-btn">
          <u-button size="mini" shape="circle" type="error" @click="handleDealRegister" v-show="current === 1">成交登记</u-button>
          <u-button size="mini" shape="circle" type="warning" @click="uploadAttachment">上传附件</u-button>
          <u-button size="mini" shape="circle" type="primary" @click="viewDetails">查看详情</u-button>
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
        list: [
          {
            name: '已报备'
          },
          {
            name: '已到访'
          },
          {
            name: '已成交'
          },
          {
            name: '无效单'
          }
        ],
        current: 0
      };
    },
    onLoad() {
    },
    methods: {
      // 切换tabs
      changeTabs(index) {
        this.current = index;
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
    //height: calc(100vh - 110rpx);
    //overflow-y: auto;
    box-sizing: border-box;
    //padding-bottom: 10rpx;
    //background-color: #F1F1F1;
    background-color: #EFEFF4;

    .square {
      vertical-align: super;
      font-size: 18rpx;
    }

    .price-color {
      color: #FD4918;
    }

    .top-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 20rpx;
      margin-top: 10rpx;

      .search {
        height: 72rpx;

        /deep/ .u-content {
          height: 72rpx !important;
          border: 2rpx solid #DCDCDC;
        }
      }
    }

    .my-report-list {
      width: 100%;
      height: calc(100vh - 175rpx);
      overflow-y: auto;
      box-sizing: border-box;
      padding: 10rpx 20rpx;

      .list-item-wrapper {
        width: 100%;
        box-sizing: border-box;
        padding: 30rpx 30rpx;
        margin-bottom: 20rpx;
        background-color: #FFFFFF;
        border-radius: 20rpx;

        .item-info {
          width: 100%;
          box-sizing: border-box;
          border-bottom: 2rpx dashed #797979;

          .name-wrapper {
            width: 100%;
            box-sizing: border-box;
            padding-bottom: 15rpx;
            display: flex;
            flex-direction: row;
            align-items: center;

            .name {
              flex: 1;
              font-size: 36rpx;
              font-weight: 600;
            }

            .btn {
              text-align: right;
            }
          }

          .phone, .location, .time {
            width: 100%;
            box-sizing: border-box;
            padding-bottom: 15rpx;
          }

          .time {
            font-size: 26rpx;
            color: #AAB2C8;
            text-align: right;
          }
        }

        .item-btn {
          width: 100%;
          text-align: right;
          margin-top: 20rpx;
          box-sizing: border-box;

          /deep/.u-btn {
            margin-left: 20rpx;
          }
        }
      }
    }
  }
</style>