<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-24 09:58:09
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-24 15:12:36
-->
<template>
  <view class="report-client-wrapper">
    <view class="top-wrapper">
      <u-search
        class="search"
        shape="round"
        bg-color="white"
        border-color="#f2f2f2"
        :show-action="false"
        :clearabled="false"
        placeholder="请输入楼盘名称"
        v-model="queryPageParameters.projectName"></u-search>
      <view class="project-card">
        <view class="project-img">
          <u-image width="242rpx" height="186rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg"></u-image>
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
    <view class="info-wrapper">
      <view class="card">
        <view class="client-info">
          <view class="title">客户信息</view>
          <view class="btn">
            <u-button type="warning" shape="circle" size="mini" @click="handleImportClient">客户池导入</u-button>
          </view>
        </view>
        <view class="form-wrapper">
          <u-form :model="infoForm" ref="infoForm" :label-width="130">
            <u-form-item label="姓名" right-icon="arrow-right" required>
              <u-input v-model="infoForm.name" placeholder="姓名" :clearable="false" input-align="right" />
            </u-form-item>
            <u-form-item label="性别" required>
              <u-radio-group v-model="infoForm.sex" class="group-wrapper">
                <u-radio name="female">女</u-radio>
                <u-radio name="male">男</u-radio>
              </u-radio-group>
            </u-form-item>
            <u-form-item label="手机号" right-icon="arrow-right" required>
              <u-input v-model="infoForm.phone" placeholder="手机号" :clearable="false" input-align="right" />
            </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="card margin-top-20">
        <view class="client-info">
          <view class="title">报备信息</view>
        </view>
        <view class="form-wrapper">
          <u-form :model="visitForm" ref="visitForm" :label-width="190">
            <u-form-item label="预计到访人数" right-icon="arrow-right" required>
              <u-input v-model="visitForm.number" placeholder="预计到访人数" :clearable="false" input-align="right" />
            </u-form-item>
            <u-form-item label="预计到访时间" required class="hide-icon" right-icon="arrow-right">
              <u-input
                v-model="visitForm.time"
                type="select"
                @click="handleSelectTime"
                placeholder="预计到访时间" :clearable="false" input-align="right" />
            </u-form-item>
            <u-form-item label="备注" right-icon="arrow-right">
              <u-input v-model="visitForm.remark" placeholder="备注" :clearable="false" input-align="right" />
            </u-form-item>
          </u-form>
        </view>
      </view>
    </view>
    <view class="report-bottom-btn">
      <u-button type="primary" shape="circle" @click="handleReport">报备</u-button>
    </view>
    <u-picker v-model="showTime" mode="time" :params="timeParams" @confirm="handleConfirm"></u-picker>
    <u-popup v-model="showClient" mode="right" length="100%">
      <view class="client-search-wrapper">
        <u-search
          class="search"
          shape="round"
          bg-color="white"
          border-color="#f2f2f2"
          :show-action="false"
          :clearabled="false"
          placeholder="请输入姓名或电话"
          v-model="queryPageParameters.projectName"></u-search>
      </view>
      <view v-for="item in clientList" :key="item.phone" class="client-list" @click="handleImport(item)">
        <view class="client-name">{{item.name}}</view>
        <view class="client-phone">{{item.phone}}</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryPageParameters: {
          projectName: ''
        },
        infoForm: {
          name: '',
          sex: '',
          phone: ''
        },
        visitForm: {
          number: '',
          time: '',
          remark: ''
        },
        showTime: false,
        timeParams: {
          year: true,
          month: true,
          day: true,
          hour: true,
          minute: true,
          second: true
        },
        showClient: false,
        clientList: [
          {
            name: '张三',
            sex: 'male',
            phone: '13888888888'
          },
          {
            name: '李四',
            sex: 'male',
            phone: '13999999999'
          },
          {
            name: '小黄',
            sex: 'female',
            phone: '13000000000'
          },
          {
            name: '小红',
            sex: 'female',
            phone: '13222222222'
          }
        ]
      };
    },
    onLoad() {
    },
    methods: {
      // 导入客户
      handleImportClient() {
        this.showClient = true;
      },
      // 确定导入客户
      handleImport(item) {
        // console.log(item);
        this.showClient = false;
        this.infoForm = item;
      },
      // 选择到访时间
      handleSelectTime() {
        this.showTime = true;
      },
      // 确定选择时间
      handleConfirm(value) {
        // console.log(value);
        this.visitForm.time = `${value.year}-${value.month}-${value.day}  ${value.hour}:${value.minute}:${value.second}`
      },
      // 报备
      handleReport() {
        uni.redirectTo({
          url: `/intermediaryPackage/homeTab/index`,
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .report-client-wrapper {
    width: 100%;
    height: calc(100vh - 110rpx);
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 10rpx;
    background-color: #F1F1F1;

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
      padding: 0rpx 20rpx;
      margin-top: 10rpx;
      background-color: #FFFFFF;

      .search {
        height: 72rpx;

        /deep/ .u-content {
          height: 72rpx !important;
          border: 2rpx solid #DCDCDC;
        }
      }

      .project-card {
        width: 100%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        padding: 25rpx 0rpx 0rpx 24rpx;

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

    .info-wrapper {
      box-sizing: border-box;
      margin: 20rpx 30rpx 0rpx 30rpx;

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
          padding: 0rpx 30rpx;
          border: 2rpx solid #F1F1F1;

          .title {
            flex: 1;
            height: 30rpx;
            font-size: 30rpx;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #333333;
            line-height: 42rpx;
          }

          .btn {
            /deep/ .u-btn {
              width: 140rpx;
              height: 60rpx;
              background: #FCD639;
            }
          }
        }

        .form-wrapper {
          width: 100%;
          box-sizing: border-box;
          padding: 0rpx 20rpx;

          /deep/.u-radio {
            float: right!important;
          }
        }
      }

      .margin-top-20 {
        margin-top: 20rpx;
      }
    }

    .report-bottom-btn {
      width: 100%;
      height: 95rpx;
      line-height: 95rpx;
      box-sizing: border-box;
      padding: 5rpx 20rpx;
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
    }

    .client-search-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 15rpx 20rpx;
      background-color: #F1F1F1;

      .search {
        height: 72rpx;

        /deep/ .u-content {
          height: 72rpx !important;
          border: 2rpx solid #DCDCDC;
        }
      }
    }

    .client-list {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 30rpx;
      border: 2rpx solid #F1F1F1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .client-name,.client-phone {
        height: 50rpx;
        line-height: 50rpx;
        flex: 1;
      }

      .client-phone {
        text-align: right;
      }
    }
  }
</style>