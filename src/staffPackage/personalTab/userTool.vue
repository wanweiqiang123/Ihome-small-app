<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-29 15:25:57
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-29 20:26:03
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
        clearabled
        :focus="true"
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
        <view style="font-size: 28rpx">{{userData.name || '-'}}</view>
      </view>
      <view class="item">
        <view class="label">岗位</view>
        <view style="font-size: 28rpx">{{userData.job ? (userData.job.name || '-') : '-'}}</view>
      </view>
      <view class="item">
        <view class="label">归属组织</view>
        <view style="font-size: 28rpx">{{userData.org ? (userData.org.name || '-') : '-'}}</view>
      </view>
    </view>
    <view>
      <u-subsection
        :list="list"
        :current="curNow"
        @change="tabChange"
      ></u-subsection>
      <view v-if="curNow === 0">
        <view class="search-title">
          <view class="search">
            <u-search
              style="flex: 1"
              placeholder="输入关键字筛选"
              v-model="keyword1"
              clearabled
              :show-action="false"
            ></u-search>
          </view>
        </view>
        <view class="search-content">
          <scroll-view
            scroll-y="true"
            style="height: calc(100vh - 480rpx)"
            lower-threshold="50"
            v-if="roleList.length"
          >
            <template v-for="(item, i) in roleList">
              <view
                :key="i"
                class="list-item"
              >
                <view>{{item.name}}</view>
                <view>{{item.code}}</view>
              </view>
            </template>
          </scroll-view>
          <view
            v-else
            class="searchNull"
          >
            <u-empty
              :key="i"
              text="没有搜索结果"
              mode="search"
            ></u-empty>
          </view>
        </view>
      </view>
      <view v-show="curNow === 1">
        <view class="search-title">
          <view class="search">
            <u-search
              style="flex: 1"
              placeholder="输入关键字筛选"
              v-model="keyword2"
              clearabled
              :show-action="false"
            ></u-search>
          </view>
        </view>
        <view class="search-content">
          <scroll-view
            style="height: calc(100vh - 480rpx)"
            scroll-y="true"
            lower-threshold="50"
            v-if="permissionOrgList.length"
          >
            <template v-for="(item, i) in permissionOrgList">
              <view
                class="list-item"
                :key="i"
              >
                <veiw>{{item.name}}</veiw>
              </view>
            </template>
          </scroll-view>
          <view
            v-else
            class="searchNull"
          >
            <u-empty
              :key="i"
              text="没有搜索结果"
              mode="search"
            ></u-empty>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getSessionUserByAccount } from "../../api/staff";
import { getAllByTypeApi } from "../../api/index";

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
      list: [
        {
          name: "功能权限",
          code: "roleList",
        },
        {
          name: "组织权限",
          code: "permissionOrgList",
        },
      ],
      keyword1: "",
      keyword2: "",
      curNow: 0,
      loadingStatus: "loading",
      OrgType: [],
    };
  },
  computed: {
    permissionOrgList() {
      let arr = this.userData.permissionOrgList.length
        ? this.userData.permissionOrgList.filter((v, i) => {
            return v.name.includes(this.keyword2.trim());
          })
        : [];
      return arr;
    },
    roleList() {
      let arr = this.userData.roleList.length
        ? this.userData.roleList.filter((v) => {
            return v.name.includes(this.keyword1.trim());
          })
        : [];
      return arr;
    },
  },
  async onLoad() {
    this.OrgType = await this.getDictAll("OrgType");
  },
  methods: {
    // 字典翻译
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 字典匹配
    getDictName(code, list) {
      if (list.length) {
        const item = list.find((v) => v.code === code);
        return item?.name;
      }
    },
    async getUserInfo() {
      if (!this.account) {
        this.$tool.toast("账号名不能为空");
        return;
      }
      try {
        const res = await getSessionUserByAccount({
          account: this.account.trim(),
        });
        if (res) {
          this.userData = res;
          this.userData.permissionOrgList = this.userData.permissionOrgList.filter(
            (v) => {
              return ["Department", "Group"].includes(v.orgType);
            }
          );
        } else {
          this.userData = {
            name: "",
            job: null,
            org: null,
            roleList: [],
            permissionOrgList: [],
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
    // tab切换
    tabChange(index) {
      this.curNow = index;
      this.keyword1 = "";
      this.keyword2 = "";
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
.search-title {
  padding: 20rpx 20rpx 0 20rpx;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 10;
}
.search {
  display: flex;
  width: 100%;
  padding-bottom: 10rpx;
}
.search-content {
  border-top: 1px solid #e4e7ed;
  padding: 0 10rpx 24rpx 24rpx;
  text-align: center;
  flex: 1;
}
.list-item {
  padding: 20rpx;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
}
.searchNull {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}
</style>
<style lang="scss">
page {
  background-color: $u-bg-color;
}
</style>
