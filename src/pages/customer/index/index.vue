<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:38:31
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-12 16:56:47
-->
<template>
  <TabBarPage>
    <view class="page">
      <view class="top">
        <u-input
          class="top-search"
          v-model="queryPageParameters.keyword"
          type="text"
          :border="true"
          placeholder="客户姓名/手机"
        />
      </view>
      <view class="wrap">
        <view
          class="wrap-item"
          v-for="(item, index) in tablePage"
          :key="index"
          @click="goto()"
        >
          <view class="wrap-item-left">
            <u-image
              width="160rpx"
              height="160rpx"
              src="/static/img/head.jpg"
            ></u-image>
          </view>
          <view class="wrap-item-right">
            <view class="wrap-item-right-name">
              {{ item.name }}
            </view>
            <view class="wrap-item-right-phone">
              {{ item.phone }}
            </view>
            <view class="wrap-item-right-time">
              {{ item.time }}
            </view>
          </view>
        </view>
        <u-loadmore :status="loadingStatus" />
      </view>
    </view>
  </TabBarPage>
</template>

<script>
import pagination from "../../../mixins/pagination";
import { testPageApi } from "../../../api/index";
export default {
  mixins: [pagination],
  data() {
    return {
      // loadingStatus: "loadmore",
      // tableTotal: null,
      // tablePage: [],
      queryPageParameters: {
        // pageNum: 1,
        // pageSize: 10,
      },
    };
  },

  onLoad() {},
  async created() {
    this.getListMixin();
  },

  methods: {
    async getListMixin() {
      this.setPageDataMixin(await testPageApi(this.queryPageParameters));
    },
    goto(item) {
      uni.navigateTo({
        url: "/pages/customer/info/index",
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
  width: 100%;
  height: 162rpx;
  display: flex;
  border-bottom: 1px solid #eee;
}
.wrap-item-left {
  width: 160rpx;
}
.wrap-item-right {
  padding: 0 20rpx;
}
.wrap-item-right {
  flex: 1;
}
.wrap-item-right-name {
  font-weight: 600;
  line-height: 60rpx;
  font-size: 36rpx;
}
</style>
