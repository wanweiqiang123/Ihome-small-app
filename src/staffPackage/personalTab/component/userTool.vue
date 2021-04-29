<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-29 15:25:57
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-29 16:27:40
-->
<template>
  <view>
    <view class="user-search">
      <u-search
        style="flex: 1"
        :show-action="false"
        placeholder="请输入要查询用户账号"
        v-model="account"
        height="72"
        :clearabled="true"
        @search="getUserInfo"
      ></u-search>
      <view
        class="filter-btn"
        @click="getUserInfo"
      >
        <span>查询</span>
      </view>
    </view>
    <view class="user-info">
      <view class="item">
        <view class="label">用户姓名</view>
        <view>{{userData.name || '-'}}</view>
      </view>
      <view class="item">
        <view class="label">岗位</view>
        <view>{{userData.job ? (userData.job.name || '-') : '-'}}</view>
      </view>
      <view class="item">
        <view class="label">归属组织</view>
        <view>{{userData.org ? (userData.org.name || '-') : '-'}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getSessionUserByAccount } from "../../../api/staff";

export default {
  name: "userTool",
  data() {
    return {
      userData: {
        name: "",
        job: null,
        org: null,
        roleList: [],
        permissionOrgList: [],
      },
      account: "",
    };
  },
  methods: {
    async getUserInfo() {
      if (!this.account) {
        this.$tool.toast("账号名不能为空");
        return;
      }
      try {
        this.userData = await getSessionUserByAccount({
          account: this.account,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 10rpx 15rpx 10rpx 15rpx;
  .filter-btn {
    padding: 10rpx 14rpx;
    color: $u-type-primary;
  }
}
.user-info {
  width: 95%;
  margin: 0 auto;
  margin-top: 110rpx;
  padding: 20rpx 0;
  display: flex;
  background: #fff;
  .item {
    flex: 1;
    width: 33.33%;
    text-align: center;
  }
  .label {
    color: #cccccc;
    padding-bottom: 20rpx;
  }
}
</style>
<style lang="scss">
page {
  background-color: $u-bg-color;
}
</style>
