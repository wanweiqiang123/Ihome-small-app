<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 20:02:11
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-03 19:13:03
-->
<template>
  <view class="protocol-list-wrapper">
    <view class="top-wrapper">
      <u-search
        class="search"
        shape="round"
        height="72"
        placeholder-color="#BDBDBD"
        search-icon-color="#BDBDBD"
        bg-color="#FFFFFF"
        border-color="#DCDCDC"
        :show-action="false"
        placeholder="搜索"
        v-model="queryPageParameters.projectName"
        @focus="projectSearch"
      ></u-search>
    </view>
    <view class="list-wrapper">
      <view
        class="item-wrapper"
        v-for="item in [1, 2, 3, 4, 5]"
        :key="item"
        @click="viewProtocolDetails"
      >
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
        channelId: "467",
        pageNum: 1,
        pageSize: 10,
        projectId: "",
      },
    };
  },
  onLoad() {},
  async onShow() {
    let item = getApp().globalData.searchBackData;
    console.log(item);
    if (item && item.type === "project") {
      getApp().globalData.searchBackData = {};
      // if (this.pageType) {
      //   this.buildSelectList = await postBuildByProId({
      //     proId: this.info.proId,
      //   });
      // }
    }
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
    // 查看协议详情
    viewProtocolDetails() {
      uni.navigateTo({
        url: `/channelPackage/myTab/channelPage/protocolDetails`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.protocol-list-wrapper {
  width: 100%;

  .top-wrapper {
    width: 100%;
    height: 92rpx;
    box-sizing: border-box;
    padding: 10rpx 24rpx 10rpx 18rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;

    .search {
      flex: 1;
      box-sizing: border-box;
      margin-right: 20rpx;
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
      border-bottom: 1rpx solid #cccccc;

      .item-title {
        flex: 1;
        font-size: 32rpx;
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