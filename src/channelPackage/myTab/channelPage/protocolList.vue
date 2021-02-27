<!--
 * @Description:
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:38:31
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-27 16:22:22
-->
<template>
  <LoginPage>
    <view class="page">
      <view class="top">
        <u-input
          class="top-search"
          v-model="queryPageParameters.keyword"
          type="text"
          :border="true"
          placeholder="点击刷选项目"
          @click.stop="projectSearch"
        />
        <text class="reset" @click.stop="reset()">清空</text>
      </view>
      <view class="wrap">
        <view
          class="wrap-item"
          v-for="(item, index) in tablePage"
          :key="index"
          @click="goto(item)">
          <view class="wrap-item-left">
            {{ item.title }}
          </view>
          <view class="wrap-item-right">
            <u-icon name="arrow-right" size="40" color="#999"></u-icon>
          </view>
        </view>
        <!-- <EmptyLoading :total="tableTotal"></EmptyLoading> -->
        <u-loadmore :status="loadingStatus" />
      </view>
    </view>
  </LoginPage>
</template>

<script>
import pagination from "../../../mixins/pagination";
import { testPageApi } from "../../../api/index";
import { postDistributionAppletsChannelList } from "../../../api/channel";

import storageTool from "../../../common/storageTool";
export default {
  mixins: [pagination],
  data() {
    return {
      // loadingStatus: "loadmore",
      // tableTotal: null,
      // tablePage: [],

      queryPageParameters: {
        channelId: "",
        pageNum: 1,
        pageSize: 20,
        projectId: "",
      },
    };
  },

  async onShow() {
    let item = getApp().globalData.searchBackData;

    if (item && item.type === "project") {
      console.log(item.data.proId, item.data.proName);
      this.queryPageParameters.projectId = item.data.proId;
      this.queryPageParameters.keyword = item.data.proName;
      this.queryPageParameters.pageNum = 1;
      getApp().globalData.searchBackData = {};
      this.tablePage = null;
      this.tablePage = [];
      this.getListMixin();
    }
  },
  onLoad(option) {
    console.log("onLoad");
    console.log(option);
    let userInfo = storageTool.getUserInfo();
    this.queryPageParameters.channelId = userInfo?.channelId;
    this.getListMixin();
  },

  methods: {
    projectSearch() {
      console.log("projectSearch");
      getApp().globalData.searchParams = {
        api: "postProjectsApi",
        key: "proName",
        id: "proId",
        type: "project",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },

    async getListMixin() {
      console.log(this.queryPageParameters);
      this.setPageDataMixin(
        await postDistributionAppletsChannelList(this.queryPageParameters)
      );
    },
    goto(item) {
      // 分销协议附件通过列表返回的附件带过详情页，原因在于详情接口没返回未盖章版
      if (item && item.annexList && item.annexList.length) {
        getApp().globalData.protocolAnnexList = item.annexList;
      } else {
        getApp().globalData.protocolAnnexList = [];
      }
      uni.navigateTo({
        url: `/channelPackage/myTab/channelPage/protocolDetails?id=` + item.id,
      });
    },
    reset() {
      this.queryPageParameters.projectId = null;
      this.queryPageParameters.keyword = null;
      this.queryPageParameters.pageNum = 1;
      this.tablePage = null;
      this.tablePage = [];
      this.getListMixin();
    },
  },
};
</script>

<style lang="scss">
.page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.top {
  padding: 20rpx 20rpx 0 20rpx;
  width: 100%;
  display: flex;
  background: #eee;
  height: 112rpx;
}
.top-search {
  width: 100%;
  height: 72rpx;
  background: #fff;
}
.wrap {
  width: 100%;
}
.wrap-item {
  padding: 0 20rpx;
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  display: flex;
  border-bottom: 1px solid #eee;
}
.wrap-item-left {
  flex: 1;
}
.wrap-item-right {
  width: 40rpx;
}
.reset {
  width: 100rpx;
  text-align: right;
  line-height: 72rpx;
}
</style>
