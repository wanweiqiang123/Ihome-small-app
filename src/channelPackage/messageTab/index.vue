<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-16 15:32:50
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:31:59
-->
<template>
  <ChannelTabBar>
    <view class="message-page-wrapper">
      <view
        class="message-item-wrapper"
        v-for="item in messageTypeList"
        :key="item.id"
        @click="viewMessageList(item)"
      >
        <view class="message-icon">
          <u-image
            width="30rpx"
            height="30rpx"
            :src="item.leftIcon"
          ></u-image>
        </view>
        <view class="message-type">{{item.typeName | emptyFilter}}</view>
        <view class="message-badge">
          <view class="badge">{{item.count | emptyFilter}}</view>
          <u-icon
            name="arrow-right"
            color="#888888"
            size="30rpx"
          ></u-icon>
        </view>
      </view>
    </view>
  </ChannelTabBar>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      messageTypeList: [
        {
          id: "1",
          leftIcon: require("@/channelPackage/common/icon/projectMsg.png"),
          typeName: "项目通知",
          count: 5,
        },
        {
          id: "2",
          leftIcon: require("@/channelPackage/common/icon/reportMsg.png"),
          typeName: "报备带看提醒",
          count: 5,
        },
        {
          id: "3",
          leftIcon: require("@/channelPackage/common/icon/commissionMsg.png"),
          typeName: "结佣提醒",
          count: 5,
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    // 查看对应的消息
    viewMessageList(item) {
      console.log(item);
      uni.navigateTo({
        url: `/channelPackage/messageTab/pages/messageIndex?typeId=${item.id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.message-page-wrapper {
  width: 100%;
  height: 100vh;
  background: #f1f1f1;
  box-sizing: border-box;
  padding: 30rpx;

  .message-item-wrapper {
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 34rpx 18rpx 36rpx 28rpx;
    margin-bottom: 20rpx;
    background: #ffffff;

    .message-icon {
      box-sizing: border-box;
      margin-right: 20rpx;
      text-align: center;
    }

    .message-type {
      flex: 1;
      box-sizing: border-box;
      padding: 30rpx 0rpx;
      font-size: 30rpx;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #333333;
      line-height: 42rpx;
    }

    .message-badge {
      display: flex;
      flex-direction: row;

      .badge {
        font-size: 28rpx;
        text-align: center;
        background-color: #fa3534;
        box-sizing: border-box;
        margin-right: 8rpx;
        padding: 2rpx 14rpx;
        border-radius: 50%;
        color: rgb(255, 255, 255);
      }
    }
  }
}
</style>