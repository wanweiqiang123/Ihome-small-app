<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-16 15:34:28
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-17 15:07:50
-->
<template>
  <IntermediaryTabBar>
    <view class="my-page-wrapper">
      <view class="my-avatar-wrapper">
        <view>
          <u-image
            width="150rpx"
            height="150rpx"
            shape="circle"
            src="https://cdn.uviewui.com/uview/swiper/2.jpg"></u-image>
        </view>
        <view>张小凡</view>
        <view>18600002222</view>
      </view>
      <view class="my-item-wrapper">
        <view class="my-item" v-for="item in itemList" :key="item.iconName" @click="goToItem(item)">
          <view class="item-icon">
            <u-icon :name="item.iconName" size="46"></u-icon>
          </view>
          <view class="item-name">{{item.name}}</view>
          <view class="item-arrow">
            <u-icon name="arrow-right" size="40"></u-icon>
          </view>
        </view>
      </view>
      <view class="my-item-wrapper margin-top">
        <view class="my-manage">渠道管理</view>
        <view class="my-item" v-for="item in manageList" :key="item.iconName" @click="goToItem(item)">
          <view class="item-icon">
            <u-icon :name="item.iconName" size="46"></u-icon>
          </view>
          <view class="item-name">{{item.name}}</view>
          <view class="item-arrow">
            <u-icon name="arrow-right" size="40"></u-icon>
          </view>
        </view>
      </view>
      <view class="my-btn">
        <u-button shape="circle" @click="handleLoginOut">退出登录</u-button>
      </view>
    </view>
    <u-popup
      v-model="showPopup"
      mode="center"
      width="70%"
      height="auto"
      border-radius="14"
      :closeable="false">
      <view class="popup-tips">提示</view>
      <view class="popup-info">确定要退出登录？</view>
      <view class="popup-btn-wrapper">
        <view @click="showPopup = false">取消</view>
        <view @click="handleSubmit">确定</view>
      </view>
    </u-popup>
  </IntermediaryTabBar>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        {
          iconName: 'setting-fill',
          name: '修改密码',
          url: ''
        },
        {
          iconName: 'list',
          name: '结佣列表',
          url: '/intermediaryPackage/myTab/pages/commissionList'
        },
        {
          iconName: 'star-fill',
          name: '我的收藏',
          url: '/intermediaryPackage/myTab/pages/favoritesList'
        },
        {
          iconName: 'clock-fill',
          name: '报备成交记录',
          url: '/intermediaryPackage/myTab/pages/dealList'
        }
      ],
      manageList: [
        {
          iconName: 'info-circle-fill',
          name: '公司信息',
          url: '/intermediaryPackage/myTab/channelPage/companyInfo'
        },
        {
          iconName: 'tags-fill',
          name: '结佣账号管理',
          url: '/intermediaryPackage/myTab/channelPage/commissionAccount'
        },
        {
          iconName: 'account-fill',
          name: '经纪人管理',
          url: '/intermediaryPackage/myTab/channelPage/brokerList'
        },
        {
          iconName: 'rmb-circle-fill',
          name: '项目结佣情况',
          url: '/intermediaryPackage/myTab/pages/projectCommDetails'
        },
        {
          iconName: 'list-dot',
          name: '分销协议列表',
          url: '/intermediaryPackage/myTab/channelPage/protocolList'
        },
      ],
      showPopup: false
    };
  },
  onLoad() {},
  methods: {
    // 退出登录
    handleLoginOut() {
      this.showPopup = true;
    },
    // 确定退出登录
    handleSubmit() {
      this.showPopup = false;
      this.$storageTool.loginOut();
    },
    // 跳转到具体页面
    goToItem(item) {
      if (!item.url) {
        return
      }
      uni.navigateTo({
        url: item.url
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .my-page-wrapper {
    width: 100%;
    height: 100%;
    background-color: #F1F1F1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .my-avatar-wrapper {
      width: 100%;
      height: 380rpx;
      box-sizing: border-box;
      padding-bottom: 38rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: $uni-color-primary;
      color: white;

      view {
        box-sizing: border-box;
        margin-bottom: 8rpx;
      }
    }

    .my-item-wrapper {
      width: 90%;
      box-sizing: border-box;
      margin-top: -50rpx;
      margin-bottom: 30rpx;
      padding: 20rpx;
      background-color: white;


      .my-item {
        width: 100%;
        display: flex;
        align-items: center;

        view {
          box-sizing: border-box;
          padding: 15rpx 0rpx;
        }

        .item-icon {
          width: 80rpx;
        }

        .item-name {
          flex: 1;
          font-size: 32rpx;
        }

        .item-arrow {
          width: 80rpx;
          text-align: right;
        }
      }

      .my-manage {
        width: 100%;
        font-size: 34rpx;
        box-sizing: border-box;
        font-weight: 600;
        padding: 15rpx 0rpx;
        border-bottom: 1px solid #f2f2f2;
      }
    }

    .margin-top {
      width: 90%;
      /*height: 550rpx;*/
      box-sizing: border-box;
      margin-top: 20rpx;
    }

    .my-btn {
      width: 90%;
      box-sizing: border-box;
      /*padding: 20rpx;*/
      /*background-color: white;*/
      margin-bottom: 30rpx;

      /deep/.u-btn {
        background-color: $uni-color-primary;
        color: white;
      }
    }
  }

  .popup-tips, .popup-info {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
  }

  .popup-tips {
    font-size: 30rpx;
    font-weight: 600;
  }

  .popup-btn-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-top: 20rpx;

    view {
      flex: 1;
      text-align: center;
      height: 90rpx;
      line-height: 90rpx;
      font-size: 32rpx;
      border: 1rpx solid #f1f1f1;
    }
  }
</style>