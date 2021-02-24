<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-16 15:34:28
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 15:27:44
-->
<template>
  <ChannelTabBar>
    <view class="my-page-wrapper">
      <view class="my-page-bg"></view>
      <view class="my-page-content">
        <view class="my-avatar-wrapper">
          <view class="avatar">
            <u-image
              width="150rpx"
              height="150rpx"
              shape="circle"
              :src="myAvatar"
            ></u-image>
          </view>
          <view class="name">{{ userInfo.name | emptyFilter }}</view>
          <view class="phone">{{ userInfo.mobilePhone | emptyFilter }}</view>
        </view>
        <view
          v-if="isShowGridList"
          class="my-item-wrapper u-padding-right-14"
        >
          <u-grid
            :col="3"
            :border="false"
            @click="goToGrid"
          >
            <template v-for="item in gridList">
              <u-grid-item
                v-if="item.isShow"
                :key="item.id"
                :index="item.url">
                <u-image
                  width="64rpx"
                  height="64rpx"
                  :src="item.icon"
                ></u-image>
                <view class="grid-text">{{ item.name }}</view>
              </u-grid-item>
            </template>
          </u-grid>
        </view>
        <u-gap
          v-if="isShowGridList"
          height="20"
          bg-color="#F1F1F1"
        ></u-gap>
        <view
          v-if="isShowManageList"
          class="my-item-wrapper"
        >
          <view class="my-manage">渠道管理</view>
          <template v-for="item in manageList">
            <view
              class="my-item"
              :key="item.id"
              v-if="item.isShow"
              @click="goToItem(item)">
              <view class="item-icon">
                <u-image
                  width="40rpx"
                  height="40rpx"
                  :src="item.icon"
                ></u-image>
              </view>
              <view class="item-name">{{ item.name | emptyFilter }}</view>
              <view class="item-arrow">
                <u-icon
                  name="arrow-right"
                  color="#888888"
                  size="40"
                ></u-icon>
              </view>
            </view>
          </template>
        </view>
        <u-gap
          v-show="isShowManageList"
          height="20"
          bg-color="#F1F1F1"
        ></u-gap>
        <view class="my-item-wrapper">
          <view
            class="my-item"
            v-for="item in myBuyList"
            :key="item.id"
            @click="userSwitchClick"
          >
            <view class="item-icon">
              <u-image
                width="40rpx"
                height="40rpx"
                :src="item.icon"
              ></u-image>
            </view>
            <view class="item-name">{{ item.name }}</view>
            <view class="item-arrow">
              <u-icon
                name="arrow-right"
                color="#888888"
                size="40"
              ></u-icon>
            </view>
          </view>
        </view>

        <view class="person-item-wrapper">
          <u-cell-group>
            <u-cell-item
              v-if="qrcodeShow"
              @click="qrcodeGoto()"
              icon="share"
              title="模拟二维码跳转"
              :arrow="true"
            ></u-cell-item>
          </u-cell-group>
        </view>

        <view class="my-btn">
          <u-button
            shape="circle"
            @click="handleLoginOut"
          >退出登录</u-button>
        </view>
      </view>
    </view>

    <!-- 退出 -->
    <u-action-sheet
      v-model="isShow"
      :list="list"
      :tips="tips"
      @click="submit"
      safe-area-inset-bottom
    ></u-action-sheet>

    <!-- 切换用户 -->
    <u-action-sheet
      v-model="showSwitchUser"
      :list="switchList"
      :tips="switchUseTips"
      @click="submitSwitchUser"
      safe-area-inset-bottom
    ></u-action-sheet>
  </ChannelTabBar>
</template>

<script>
import storageTool from "@/common/storageTool";
import switchUser from "@/mixins/switchUser";

export default {
  mixins: [switchUser],
  data() {
    return {
      myAvatar: require("@/channelPackage/common/icon/avatar.png"),
      gridList: [
        // {
        //   id: 1,
        //   icon: require("@/channelPackage/common/icon/password.png"),
        //   name: "修改密码",
        //   url: "",
        // },
        {
          id: 2,
          icon: require("@/channelPackage/common/icon/money.png"),
          name: "结佣列表",
          url: "/channelPackage/myTab/pages/commissionList",
          isShow: this.$has("B.WXAPP.CHANNEL.CENTER.COMMISSIONLIST"),
        },
        {
          id: 3,
          icon: require("@/channelPackage/common/icon/star.png"),
          name: "我的收藏",
          url: "/channelPackage/myTab/pages/favoritesList",
          isShow: this.$has("B.WXAPP.CHANNEL.CENTER.MYCOLLECTION"),
        },
        {
          id: 4,
          icon: require("@/channelPackage/common/icon/record.png"),
          name: "报备成交记录",
          url: "/channelPackage/myTab/pages/dealList",
          isShow: this.$has("B.WXAPP.CHANNEL.CENTER.TRANSACTIONLIST"),
        },
      ],
      manageList: [
        {
          id: 1,
          icon: require("@/channelPackage/common/icon/company.png"),
          name: "公司信息",
          url: "/channelPackage/myTab/channelPage/companyInfo",
          isShow: this.$has("B.WXAPP.CHANNEL.CENTER.COMPANYINFO"),
        },
        {
          id: 2,
          icon: require("@/channelPackage/common/icon/count.png"),
          name: "结佣账号管理",
          url: "/channelPackage/myTab/channelPage/commissionAccount",
          isShow: this.$has("B.WXAPP.CHANNEL.CENTER.COMMISSION"),
        },
        {
          id: 3,
          icon: require("@/channelPackage/common/icon/broker.png"),
          name: "经纪人管理",
          url: "/channelPackage/myTab/channelPage/brokerList",
          isShow: this.$has("B.WXAPP.CHANNEL.CENTER.BROKERMANAGE"),
        },
        // {
        //   id: 4,
        //   icon: require("@/channelPackage/common/icon/project.png"),
        //   name: "项目结佣情况",
        //   url: "/channelPackage/myTab/pages/projectCommDetails"
        //   isShow: false
        // },
        {
          id: 5,
          icon: require("@/channelPackage/common/icon/distribution.png"),
          name: "分销协议列表",
          url: "/channelPackage/myTab/channelPage/protocolList",
          isShow: this.$has("B.WXAPP.CHANNEL.CENTER.DISTRIBUTIONLIST"),
        },
      ],
      myBuyList: [
        // {
        //   id: 1,
        //   icon: require('@/channelPackage/common/icon/myHouse.png'),
        //   name: '我的购房信息',
        //   url: '/customerPackage/homeTab/index'
        // },
        {
          id: 2,
          icon: require("@/channelPackage/common/icon/myHouse.png"),
          name: "切换用户",
          url: "",
        },
      ],
      showPopup: false,
      userInfo: {
        name: "",
        mobilePhone: "",
      },
    };
  },
  computed: {
    isShowGridList() {
      let flag = false;
      if (this.gridList && this.gridList.length) {
        flag = this.gridList.some((list) => {
          return list.isShow;
        });
      }
      return flag;
    },
    isShowManageList() {
      let flag = false;
      if (this.manageList && this.manageList.length) {
        flag = this.manageList.some((list) => {
          return list.isShow;
        });
      }
      return flag;
    },
  },
  onLoad() {
    this.userInfo = storageTool.getUserInfo();
    // console.log('this.userInfo', this.userInfo);
  },
  methods: {
    // 跳转
    goToGrid(index) {
      // console.log(index);
      uni.navigateTo({
        url: index,
      });
    },

    // 确定退出登录
    handleSubmit() {
      this.showPopup = false;
      this.$storageTool.loginOut();
    },
    // 跳转到具体页面
    goToItem(item) {
      if (!item.url) {
        return;
      }
      uni.navigateTo({
        url: item.url,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-page-wrapper {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  position: relative;

  .my-page-bg {
    width: 100%;
    height: 346rpx;
    background-color: $u-type-primary;
    position: absolute;
    top: 0rpx;
    left: 0rpx;
    right: 0rpx;
    bottom: 0rpx;
    z-index: 0;
  }

  .my-page-content {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0rpx;
    left: 0rpx;
    right: 0rpx;
    bottom: 0rpx;
    z-index: 100;
    padding: 0rpx 30rpx;

    .my-avatar-wrapper {
      width: 100%;
      height: 278rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #ffffff;

      view {
        box-sizing: border-box;
        color: #ffffff;
        font-family: PingFang SC;
      }

      .avatar {
        margin-bottom: 12rpx;
      }

      .name {
        font-size: 30rpx;
        font-weight: 500;
        margin-bottom: 10rpx;
      }

      .phone {
        font-size: 24rpx;
        font-weight: 400;
      }
    }

    .my-item-wrapper {
      width: 100%;
      background-color: #ffffff;

      .grid-text {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        box-sizing: border-box;
        margin-top: 20rpx;
      }

      .my-manage {
        width: 100%;
        height: 88rpx;
        line-height: 42rpx;
        font-size: 24rpx;
        box-sizing: border-box;
        padding: 28rpx 0rpx 36rpx 30rpx;
        font-weight: bold;
        background: #ffffff;
        font-family: Source Han Sans CN;
        color: #666666;
        border-bottom: 2rpx solid #f1f1f1;
      }

      .my-item {
        width: 100%;
        height: 88rpx;
        padding: 28rpx 16rpx 22rpx 20rpx;
        display: flex;
        align-items: center;

        &:not(:last-child) {
          border-bottom: 2rpx solid #f1f1f1;
        }

        view {
          box-sizing: border-box;
          padding: 15rpx 0rpx;
        }

        .item-icon {
          box-sizing: border-box;
          margin-right: 20rpx;
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
    }

    .my-btn {
      width: 100%;
      box-sizing: border-box;
      margin: 32rpx 0rpx;

      /deep/.u-btn {
        height: 92rpx;
        background-color: $u-type-primary;
        color: white;
      }
    }
  }
}

.popup-tips,
.popup-info {
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