<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 20:02:11
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-27 20:35:11
-->
<template>
  <view class="protocol-list-wrapper">
    <view class="top-wrapper">
      <u-search
        class="search"
        shape="round"
        bg-color="#F1F1F2"
        border-color="#f2f2f2"
        :show-action="false"
        placeholder="请输入经纪人姓名或手机号码"
        v-model="queryPageParameters.projectName"></u-search>
    </view>
    <view class="list-wrapper">
      <view class="item-wrapper" v-for="item in [1,2,3,4,5]" :key="item" @click="viewProtocolDetails">
        <view class="item-title">保利XXXX项目合作协议</view>
        <view class="item-detail">详情</view>
        <u-icon name="arrow-right" color="#999999" size="28"></u-icon>
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
      }
    };
  },
  onLoad() {

  },
  methods: {
    // 查看协议详情
    viewProtocolDetails() {
      uni.navigateTo({
        url: `/intermediaryPackage/myTab/channelPage/protocolDetails`
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .protocol-list-wrapper {
    width: 100%;

    .top-wrapper {
      width: 100%;
      height: 85rpx;
      box-sizing: border-box;
      padding: 0rpx 20rpx;
      margin-top: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFFFFF;

      .search {
        flex: 1;
        box-sizing: border-box;
        margin-right: 20rpx;

        /deep/ .u-content {
          height: 62rpx !important;
        }
      }
    }

    .list-wrapper {
      width: 100%;
      height: calc(100vh - 110rpx);
      overflow-y: auto;

      .item-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 30rpx 36rpx;
        border-bottom: 1rpx solid #CCCCCC;

        .item-title {
          flex: 1;
          font-size: 34rpx;
          color: #666666;
          font-weight: 600;
        }

        .item-detail {
          color: #999999;
          margin-right: 10rpx;
          font-size: 28rpx;
        }
      }
    }
  }
</style>