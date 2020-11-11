<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:38:31
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-11 16:50:16
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
          v-for="(item, index) in resPageInfo.list"
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
              {{ item.name }}{{ item.id }}
            </view>
            <view class="wrap-item-right-phone">
              {{ item.phone }}
            </view>
            <view class="wrap-item-right-time">
              {{ item.time }}
            </view>
          </view>
        </view>
        <u-loadmore :status="status" />
      </view>
    </view>
  </TabBarPage>
</template>

<script>
import pagination from "../../../mixins/pagination";
export default {
  mixins: [pagination],
  data() {
    return {
      title: "这是客户页",
      status: "loadmore",
      list: [],
      page: 0,
      total: 50,
      queryPageParameters: {
        pageNum: 1,
        pageSize: 20,
        keyword: null,
      },
      resPageInfo: {
        total: 55,
        list: [],
      },
    };
  },
  onReachBottom() {
    console.log("上拉加载");
    if (this.total <= this.resPageInfo.list.length) return;
    this.status = "loading";
    this.queryPageParameters.pageNum = this.queryPageParameters.pageNum++;
    setTimeout(() => {
      this.getData();

      if (this.total <= this.resPageInfo.list.length) {
        this.status = "nomore";
      } else {
        this.status = "loading";
      }
    }, 500);
  },
  onPullDownRefresh() {
    console.log("下拉刷新");
    setTimeout(() => {
      uni.stopPullDownRefresh();
      this.resPageInfo.total = 0;
      this.resPageInfo.list = [];
      this.getData();
    }, 500);
  },
  onLoad() {
    console.log(this.message);
    this.getData();
  },
  methods: {
    getListMixin() {
      console.log("getListMixin");
    },
    getData() {
      setTimeout(() => {
        let count = this.resPageInfo.list.length + 20;
        for (let index = 0; index < count; index++) {
          const element = {
            id: 1 + index,
            title: "xxx" + index + this.resPageInfo.list.length + 1,
            src: "/static/img/head.jpg",
            name: "张大大",
            phone: "15511111111",
            time: "2020-10-12 16:54:21",
          };
          this.resPageInfo.list.push(element);
        }
      }, 500);
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
