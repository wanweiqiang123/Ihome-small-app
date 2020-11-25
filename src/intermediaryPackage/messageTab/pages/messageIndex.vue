<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-25 11:25:00
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-25 13:10:00
-->
<template>
  <view class="message-index-wrapper">
    <view class="message-item-wrapper" v-for="item in [1,2,3,4,5]" :key="item">
      <view class="message-title">
        <view class="title-icon">
          <u-icon name="chat" size="30"></u-icon>
        </view>
        <view class="title-name">项目启动通知</view>
        <view class="title-badge"></view>
      </view>
      <view class="message-content">
        <view v-if="typeId === '1'">保利天汇联动项目立项成功将于2020年1月10日正式启动</view>
        <view v-if="typeId === '2'">
          <view class="content">客户信息：陈先生 (13888888888)</view>
          <view class="content">报备有效，赶紧去跟进客户吧</view>
        </view>
        <view v-if="typeId === '3'">
          <view class="content">您的结佣单(JY0001)已经审核通过！</view>
          <view class="content">结佣金额：8000.00</view>
        </view>
      </view>
      <view class="message-time">
        <view>
          <u-icon name="clock" size="30"></u-icon>
        </view>
        <view class="time">2019-08-23 22:31</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        typeId: ''
      };
    },
    onLoad(option) {
      console.log('option.typeId', option.typeId);
      this.typeId = option.typeId;
      if (this.typeId === '1') {
        uni.setNavigationBarTitle({
          title: '项目通知'
        })
      } else if (this.typeId === '1') {
        uni.setNavigationBarTitle({
          title: '报备带看提醒'
        })
      } else if (this.typeId === '1') {
        uni.setNavigationBarTitle({
          title: '结佣提醒'
        })
      }
    },
    methods: {

    }
  };
</script>

<style lang="scss" scoped>
  .message-index-wrapper {
    width: 100%;
    height: 100vh;
    background-color: #F5F5F5;

    .message-item-wrapper {
      //width: 100%;
      box-sizing: border-box;
      padding: 20rpx 30rpx;
      margin: 20rpx;
      background-color: #FFFFFF;

      .message-title, .message-content, .message-time {
        padding: 8rpx 0rpx;
      }

      .message-title {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .title-icon {
          width: 30rpx;
        }

        .title-name {
          flex: 1;
          box-sizing: border-box;
          margin-left: 20rpx;
        }

        .title-badge {
          width: 15rpx;
          height: 15rpx;
          background-color: #fa3534;
          border-radius: 50%;
        }
      }

      .message-content {
        color: #999999;
        box-sizing: border-box;
        padding-left: 50rpx;

        .content {
          padding: 5rpx 0rpx;
        }
      }

      .message-time {
        display: flex;
        flex-direction: row;
        align-items: center;

        .time {
          color: #CCCCCC;
          box-sizing: border-box;
          margin-left: 20rpx;
        }
      }
    }
  }
</style>