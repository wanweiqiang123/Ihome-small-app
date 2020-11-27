<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 20:02:11
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-27 20:35:11
-->
<template>
  <view class="protocol-details-wrapper">
    <view class="details-wrapper">
      <view class="title">协议信息</view>
      <view class="info-wrapper" v-for="(item, index) in infoList" :key="index">
        <view>{{item.type}}</view>
        <view class="u-text-right">{{item.value}}</view>
      </view>
      <view class="title u-margin-top-30">合同附件</view>
      <view class="annex-wrapper">
        <view class="annex-item" v-for="(item, index) in annexItem" :key="index">
          <view class="item-type">{{item.type}}</view>
          <view class="item-value">
            <u-image width="200rpx" height="200rpx" :src="item.value"></u-image>
          </view>
          <view class="item-download">下载附件</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      infoList: [
        {
          type: '协议编号',
          value: '79454987532165'
        },
        {
          type: '协议名称',
          value: '保利XX项目合作协议'
        },
        {
          type: '甲方',
          value: '保利爱家地产有限公司'
        }
      ],
      annexItem: [
        {
          type: '未盖章版协议',
          value: 'https://cdn.uviewui.com/uview/example/fade.jpg'
        },
        {
          type: '已盖章版协议',
          value: 'https://cdn.uviewui.com/uview/example/fade.jpg'
        }
      ]
    };
  },
  onLoad() {

  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .protocol-details-wrapper {
    width: 100%;
    height: 100vh;
    background-color: #F5F5F5;

    .details-wrapper {
      width: 100%;
      background-color: #FFFFFF;

      .title {
        font-size: 36rpx;
        font-weight: 600;
        padding: 20rpx 30rpx;
      }

      .info-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1rpx solid #999999;
        padding: 20rpx 30rpx;

        view {
          flex: 1;
          font-size: 28rpx;
          color: #999999;
        }
      }

      .annex-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        padding: 20rpx 30rpx;

        .annex-item {
          width: 30%;
          margin-right: 15rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;

          view {
            width: 200rpx;
            text-align: center;
          }

          .item-type {
            padding: 5rpx;
            font-size: 28rpx;
          }

          .item-download {
            height: 80rpx;
            line-height: 80rpx;
            font-size: 30rpx;
            background-color: #409EFF;
            color: #FFFFFF;
          }
        }
      }
    }
  }
</style>