<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-16 15:32:50
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-17 11:35:20
-->
<template>
  <IntermediaryTabBar>
    <view class="message-page-wrapper">
      <view class="message-item-wrapper" v-for="item in messageTypeList" :key="item.id" @click="viewMessageList(item)">
        <view class="message-icon">
          <u-icon
            :size="item.leftIconSize"
            :name="item.leftIcon"></u-icon>
        </view>
        <view class="message-type">{{item.typeName}}</view>
        <view class="message-badge">
          <view class="badge">{{item.count}}</view>
          <u-icon name="arrow-right" size="33rpx"></u-icon>
        </view>
      </view>
    </view>
  </IntermediaryTabBar>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      messageTypeList: [
        {
          id: '1',
          leftIcon: 'volume-fill',
          leftIconSize: '50rpx',
          typeName: '项目通知',
          count: 5,
        },
        {
          id: '2',
          leftIcon: 'chat-fill',
          leftIconSize: '50rpx',
          typeName: '报备带看提醒',
          count: 5
        },
        {
          id: '3',
          leftIcon: 'bell-fill',
          leftIconSize: '50rpx',
          typeName: '结佣提醒',
          count: 5
        }
      ]
    };
  },
  onLoad() {},
  methods: {
    // 查看对应的消息
    viewMessageList(item) {
      console.log(item);
      uni.navigateTo({
        url: `/intermediaryPackage/messageTab/pages/messageIndex?typeId=${item.id}`,
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  .message-page-wrapper {
    width: 100%;

    .message-item-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      box-sizing: border-box;
      padding: 0rpx 20rpx;

      .message-icon {
        box-sizing: border-box;
        margin-right: 20rpx;
        text-align: center;
      }

      .message-type {
        flex: 1;
        box-sizing: border-box;
        padding: 30rpx 0rpx;
        font-size: 36rpx;
        font-weight: 600;
        color: gray;
      }

      .message-badge {
        display: flex;
        flex-direction: row;

        .badge {
          font-size: 3633;
          text-align: center;
          background-color: #fa3534;
          box-sizing: border-box;
          margin-right: 8rpx;
          padding: 6rpx 16rpx;
          border-radius: 50%;
          color: rgb(255, 255, 255);
          line-height: 33rpx;
        }
      }
    }
  }
</style>