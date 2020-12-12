<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 20:02:11
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-12 17:32:15
-->
<template>
  <view class="protocol-details-wrapper">
    <view class="details-wrapper">
      <view class="title">协议信息</view>
      <u-form :model="infoForm" ref="infoForm" :label-width="170">
        <u-form-item label="协议编号">
          <u-input
            v-model="infoForm.code"
            placeholder="协议编号" disabled :clearable="false" input-align="left" />
        </u-form-item>
        <u-form-item label="协议名称">
          <u-input
            v-model="infoForm.name"
            placeholder="协议名称" disabled :clearable="false" input-align="left" />
        </u-form-item>
        <u-form-item label="甲方">
          <u-input
            v-model="infoForm.type"
            placeholder="甲方" disabled :clearable="false" input-align="left"/>
        </u-form-item>
      </u-form>
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
      infoForm: {
        code: '79454987532165',
        name: '保利XX项目合作协议',
        type: '保利爱家地产有限公司'
      },
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
            background-color: $u-type-primary;
            color: #FFFFFF;
          }
        }
      }
    }
  }
</style>