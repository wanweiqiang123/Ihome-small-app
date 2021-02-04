<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:38:31
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-03 20:13:30
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
          placeholder="搜索"
          @focus="projectSearch"
        />
      </view>
      <view class="wrap">
        <view
          class="wrap-item"
          v-for="(item, index) in tablePage"
          :key="index"
          @click="goto(item)"
        >
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
      this.queryPageParameters.projectId;
      this.queryPageParameters.pageNum = 1;
      getApp().globalData.searchBackData = {};
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
      uni.navigateTo({
        url: `/channelPackage/myTab/channelPage/protocolDetails?id=` + item.id,
      });
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
</style>
