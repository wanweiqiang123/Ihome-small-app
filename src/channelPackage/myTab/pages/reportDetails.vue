<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-24 16:24:02
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-24 17:32:17
-->
<template>
  <view class="report-detail-wrapper">
    <view class="top-wrapper">
      <view class="info-detail">
        <view class="name">
          陈某某
          <span class="name-right">(先生)</span>
        </view>
        <view class="phone">
          193****0646
          <span class="all-phone" @click="showPhone = true">补全号码</span>
        </view>
      </view>
      <view class="project-card">
        <view class="project-img">
          <u-image width="242rpx" height="186rpx" :src="homeImg"></u-image>
        </view>
        <view class="project-info">
          <view>远洋招商保利东湾经纪渠道</view>
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
    </view>
    <u-gap height="25" bg-color="#F5F5F5"></u-gap>
    <view class="step-wrapper">
      <view :class="currentStep === 0 ? 'step-item step-bg' : 'step-item'" @click="handleStep(0)">报备</view>
      <view>
        <u-line color="red" border-style="dashed" />
      </view>
      <view :class="currentStep === 1 ? 'step-item step-bg' : 'step-item'" @click="handleStep(1)">到访</view>
      <view>
        <u-line color="red" border-style="dashed" />
      </view>
      <view :class="currentStep === 2 ? 'step-item step-bg' : 'step-item'" @click="handleStep(2)">成交</view>
    </view>
    <view class="info-wrapper" v-show="currentStep === 0">
      <view class="card">
        <view class="client-info">
          <view class="title">报备信息</view>
        </view>
        <view class="info-item-wrapper">
          <view v-for="(item, index) in reportInfo" :key="index" class="item-wrapper">
            <view class="item-title">{{item.title}}</view>
            <view class="item-value">{{item.value}}</view>
          </view>
        </view>
      </view>
      <u-gap height="25" bg-color="#F5F5F5"></u-gap>
      <view class="card">
        <view class="client-info">
          <view class="title">报备审核</view>
        </view>
        <view class="info-item-wrapper">
          <view v-for="(item, index) in reportReviewInfo" :key="index" class="item-wrapper">
            <view class="item-title">{{item.title}}</view>
            <view class="item-value">{{item.value}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="info-wrapper" v-show="currentStep === 1">
      <view class="card">
        <view class="client-info">
          <view class="title">到访信息</view>
        </view>
        <view class="info-item-wrapper">
          <view v-for="(item, index) in visitInfo" :key="index" class="item-wrapper">
            <view class="item-title">{{item.title}}</view>
            <view class="item-value">{{item.value}}</view>
          </view>
        </view>
      </view>
      <u-gap height="25" bg-color="#F5F5F5"></u-gap>
      <view class="card">
        <view class="client-info">
          <view class="title">到访审核</view>
        </view>
        <view class="info-item-wrapper">
          <view v-for="(item, index) in visitReviewInfo" :key="index" class="item-wrapper">
            <view class="item-title">{{item.title}}</view>
            <view class="item-value">{{item.value}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="info-wrapper" v-show="currentStep === 2">
      <view class="card">
        <view class="client-info">
          <view class="title">成交信息</view>
        </view>
        <view class="info-item-wrapper">
          <view v-for="(item, index) in dealInfo" :key="index" class="item-wrapper">
            <view class="item-title">{{item.title}}</view>
            <view class="item-value">{{item.value}}</view>
          </view>
        </view>
      </view>
    </view>
    <u-popup width="80%" v-model="showPhone" mode="center">
      <view class="number-title">请补全号码</view>
      <view class="number-wrapper">
        <span>193</span>
        <u-message-input @finish="changePhone"></u-message-input>
        <span>0645</span>
      </view>
      <view class="number-btn">
        <u-button type="primary" shape="circle" size="mini" @click="savePhone">保存</u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        homeImg: require('@/channelPackage/common/img/house.jpg'),
        queryPageParameters: {
          projectName: ''
        },
        currentStep: 0, // 当前进度
        reportInfo: [
          {
            title: '报备人',
            value: '陈文杰'
          },
          {
            title: '联系电话',
            value: '13452664213'
          },
          {
            title: '报备时间',
            value: '2020-08-13 18:20:34'
          },
          {
            title: '所属公司',
            value: '广州聚恒信息科技有限公司'
          },
          {
            title: '所属门店',
            value: '保利爱家'
          },
          {
            title: '预计到访人数',
            value: '2'
          },
          {
            title: '预计到访时间',
            value: '2020-08-14 18:20'
          },
          {
            title: '备注信息',
            value: '暂无'
          }
        ],
        reportReviewInfo: [
          {
            title: '审核结果',
            value: '审核通过'
          },
          {
            title: '审核时间',
            value: '2020-08-13 18:20:34'
          }
        ],
        visitInfo: [
          {
            title: '所属代理',
            value: '无'
          },
          {
            title: '是否拍照',
            value: '是'
          },
          {
            title: '拍照上传时间',
            value: '2020-08-13 18:20:34'
          },
          {
            title: '到访时间',
            value: '2020-08-14 18:20'
          }
        ],
        visitReviewInfo: [
          {
            title: '审核结果',
            value: '审核通过'
          },
          {
            title: '审核时间',
            value: '2020-08-13 18:20:34'
          }
        ],
        dealInfo: [
          {
            title: '认购栋座',
            value: '19栋'
          },
          {
            title: '认购房号',
            value: '1904号'
          },
          {
            title: '是否拍照',
            value: '是'
          },
          {
            title: '拍照上传时间',
            value: '2020-08-13 18:20:34'
          },
          {
            title: '成交时间',
            value: '2020-08-14 18:20'
          }
        ],
        showPhone: false,
        allPhoneNumber: ''
      };
    },
    onLoad() {
    },
    methods: {
      // 当前进度
      handleStep(index) {
        this.currentStep = index;
      },
      changePhone(value) {
        console.log(value);
        this.allPhoneNumber = value;
      },
      // 补全号码
      savePhone() {
        console.log(this.allPhoneNumber);
        this.showPhone = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .report-detail-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 10rpx;
    //background-color: #F1F1F1;

    .top-wrapper {
      width: 100%;
      box-sizing: border-box;
      //padding: 0rpx 20rpx;
      margin-top: 10rpx;
      //background-color: #FFFFFF;

      .info-detail {
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx 30rpx;
        background-color: #F5F5F5;

        .name {
          font-size: 38rpx;
          font-weight: 600;
          box-sizing: border-box;
          margin-bottom: 15rpx;

          .name-right {
            font-size: 28rpx;
            font-weight: 500;
            display: inline-block;
            box-sizing: border-box;
            margin-left: 30rpx;
          }
        }

        .all-phone {
          color: #0079FE;
          display: inline-block;
          box-sizing: border-box;
          margin-left: 30rpx;
        }
      }

      .project-card {
        width: 100%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        padding: 25rpx 0rpx 0rpx 24rpx;
        background-color: #FFFFFF;

        .project-info {
          flex: 1;
          box-sizing: border-box;
          margin-left: 30rpx;

          view {
            box-sizing: border-box;
            margin-bottom: 10rpx;
          }

          .title-wrapper {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1C1C1C;
          }

          .price-wrapper {
            width: 100%;
            color: #FD4918;
            font-family: PingFang SC;

            .price {
              font-size: 32rpx;
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
            color: #666666;

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
    }

    .step-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 40rpx 10rpx 40rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #FFFFFF;

      view {
        flex: 1;
        text-align: center;
      }

      .step-item {
        width: 90rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 40rpx;
        border: 1rpx solid #10ACF1;
        color: #10ACF1;
        font-size: 26rpx;
      }

      .step-bg {
        background-color: #03A7F0;
        color: #FFF9FB;
      }
    }

    .info-wrapper {
      height: calc(100vh - 500rpx);
      overflow-y: auto;
      box-sizing: border-box;
      background-color: #FFFFFF;
      padding: 0rpx 30rpx 50rpx 0rpx;

      .card {
        width: 100%;
        background-color: #FFFFFF;

        .client-info {
          width: 100%;
          height: 46px;
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;
          padding: 0rpx 20rpx;
          //border: 2rpx solid #F1F1F1;

          .title {
            flex: 1;
            font-size: 30rpx;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #333333;
            line-height: 42rpx;
          }
        }

        .info-item-wrapper {
          width: 100%;
          box-sizing: border-box;

          .item-wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 2rpx solid #F5F5F5;
            padding: 20rpx 20rpx;

            .item-title {
              width: 230rpx;
              text-align: left;
            }

            .item-value {
              flex: 1;
              text-align: left;
            }
          }
        }
      }
    }
  }

  .number-title {
    line-height: 100rpx;
    font-weight: 500;
    text-align: center;
    background: $u-type-primary;
    color: #fff;
    border-bottom: 1px solid #eeeeee;
  }

  .number-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-top: 20rpx;
  }

  .number-btn {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 30rpx 30rpx;

    /deep/.u-btn {
      width: 100%;
      height: 60rpx;
    }
  }
</style>