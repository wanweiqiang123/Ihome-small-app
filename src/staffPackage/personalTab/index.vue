<!--
 * @Description: 案场个人中心
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 11:22:52
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-07 09:08:55
-->
<template>
  <StaffTabBar>
    <view class="person-page-wrapper">
      <view class="person-avatar-wrapper">
        <view>
          <u-image
            width="150rpx"
            height="150rpx"
            shape="circle"
            src="https://cdn.uviewui.com/uview/swiper/2.jpg"
          ></u-image>
        </view>
        <view>张小凡</view>
        <view>18600002222</view>
      </view>
      <view class="person-item-wrapper">
        <u-cell-group>
          <u-cell-item
            icon="rmb-circle"
            title="我的购房信息"
            :arrow="true"
          ></u-cell-item>

          <u-cell-item
            @click="userSwitchClick()"
            icon="account"
            title="切换用户"
            :arrow="true"
          ></u-cell-item>
        </u-cell-group>
      </view>

      <view class="btn-container">
        <u-button
          shape="circle"
          type="primary"
          @click="handleLoginOut"
        >退出账号</u-button>
      </view>
    </view>
    <u-action-sheet
      v-model="isShow"
      :list="list"
      :tips="tips"
      @click="submit"
      safe-area-inset-bottom
    ></u-action-sheet>

    <u-action-sheet
      v-model="showSwitchUser"
      :list="switchList"
      :tips="switchUseTips"
      @click="submitSwitchUser"
      safe-area-inset-bottom
    ></u-action-sheet>
  </StaffTabBar>
</template>

<script>
import storageTool from "../../common/storageTool";
import { userSwitchApi, getUserInfoApi } from "../../api/index";
export default {
  name: "personal-tab",
  data() {
    return {
      userSwitchShow: false,
      userTypeList: [],
      isShow: false,
      tips: {
        text: "确定要退出当前账号？",
        color: "#909399",
      },
      list: [
        {
          text: "退出登录",
          color: "#fa3534",
          fontSize: 28,
        },
      ],

      showSwitchUser: false,
      switchUseTips: {
        text: "请选择需要切换的用户",
        color: "#000",
      },
      switchList: [],
    };
  },
  methods: {
    // 退出登录
    handleLoginOut() {
      this.isShow = true;
    },
    submit(index) {
      switch (index) {
        case 0:
          storageTool.loginOut();
          break;
      }
    },
    async submitSwitchUser(index) {
      let item = this.switchList[index];
      console.log(index, item);
      const res = await userSwitchApi({
        change_type: item.loginUserType,
        access_token: storageTool.getToken(),
      });
      console.log(res);

      storageTool.setToken(res.access_token, res.expires_in);
      const userInfo = await getUserInfoApi();
      storageTool.setUserInfo(userInfo);
      uni.showToast({
        title: "切换成功",
      });
      setTimeout(() => {
        storageTool.goHome();
      }, 500);
    },
    userSwitchClick() {
      let userInfo = storageTool.getUserInfo();
      let userTypeList = userInfo?.userTypeList || [];
      console.log(userTypeList);
      if (userTypeList && userTypeList.length > 0) {
        this.switchList = [];
        for (let index = 0; index < userTypeList.length; index++) {
          const element = userTypeList[index];
          let color =
            userInfo.loginUserType == element.userType ? "#4881f9" : "#666";
          let userTypeName =
            userInfo.loginUserType == element.userType
              ? element.userTypeName + " √"
              : element.userTypeName;
          this.switchList.push({
            text: userTypeName,
            color: color,
            fontSize: 28,
            loginUserType: element.userType,
          });
        }

        this.showSwitchUser = true;
      } else {
        uni.showToast({
          title: "暂无用户可切换",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.person-page-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $u-bg-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  .person-avatar-wrapper {
    width: 100%;
    height: 380rpx;
    box-sizing: border-box;
    padding-bottom: 38rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $u-type-primary;
    color: white;

    view {
      box-sizing: border-box;
      margin-bottom: 8rpx;
    }
  }
  .person-item-wrapper {
    width: 90%;
    box-sizing: border-box;
    margin-top: -50rpx;
    background: #fff;
  }

  .btn-container {
    width: 90%;
    margin-top: 100rpx;
  }
  .login-select-select {
    line-height: 100rpx;
    border-bottom: 1px solid #eeeeee;
    text-align: center;
    font-weight: 500;
  }
  .login-select-select-title {
    font-weight: 600 !important;
    background: $u-type-primary;
    color: #fff;
  }
}
</style>
