<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-17 10:08:05
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:56:23
-->
<template>
  <ChannelTabBar>
    <view class="client-page-wrapper">
      <view class="top-wrapper">
        <u-search
          class="search"
          shape="round"
          height="72"
          placeholder-color="#BDBDBD"
          search-icon-color="#BDBDBD"
          bg-color="#FFFFFF"
          border-color="#FFFFFF"
          :show-action="false"
          @search="getListMixin()"
          placeholder="请输入客户姓名/电话"
          v-model="queryPageParameters.nameOrTel"
        ></u-search>
        <view
          class="icon"
          @click="showAddWin = true"
        >
          <u-icon
            name="plus"
            color="#888888"
            size="30"
          ></u-icon>
        </view>
      </view>
      <view class="client-content-wrapper">
        <view
          class="client-content"
          v-for="item in tablePage"
          :key="item"
          @click="viewClientDetails(item)"
        >
          <view class="client-avatar">{{item.name.substr(0, 1)}}</view>
          <view class="client-info">
            <view class="client-name">{{ item.name | emptyFilter }}</view>
            <view class="client-phone">{{ item.mobile | emptyFilter }}</view>
            <view class="client-time">录入时间：{{ item.inputTime | emptyFilter }}</view>
          </view>
        </view>
        <view
          class="empty-wrapper"
          v-if="tablePage.length === 0"
        >
          <u-empty
            text="暂无数据"
            mode="list"
          ></u-empty>
        </view>
      </view>
      <u-mask
        @click="showAddWin = false"
        :show="showAddWin"
        :duration="400"
        :zoom="true"
        :custom-style="{background: 'rgba(255, 255, 255, 0.1)'}"
      ></u-mask>
      <view
        class="client-add-wrapper"
        v-if="showAddWin"
      >
        <view
          class="item border-bottom"
          @click="handleAdd('report')"
        >客户报备</view>
        <view
          class="item"
          @click="handleAdd('enter')"
        >录入客户</view>
      </view>
    </view>
  </ChannelTabBar>
</template>

<script>
import pagination from "@/mixins/pagination";
import { getCustomerList } from "@/api/channel";
export default {
  mixins: [pagination],
  data() {
    return {
      queryPageParameters: {
        nameOrTel: "",
        name: "",
        mobile: "",
      },
      tableTotal: null, //总数
      tablePage: [], //列表数据
      showAddWin: false,
    };
  },
  onLoad() {
    this.getListMixin();
  },
  onShow() {},
  methods: {
    async getListMixin() {
      this.tableTotal = 0;
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.queryPageParameters.pageSize = 10;
      this.setPageDataMixin(await getCustomerList(this.queryPageParameters));
      // await getCustomerList(this.queryPageParameters)
    },
    // 录入客户/报备客户
    handleAdd(type) {
      if (type === "report") {
        // 报备客户
        uni.navigateTo({
          url: `/channelPackage/homeTab/pages/reportClient`,
        });
      } else if (type === "enter") {
        // 录入客户
        uni.navigateTo({
          url: `/channelPackage/clientTab/pages/enterClient`,
        });
      }
      this.showAddWin = false;
    },
    // 查看客户详情
    viewClientDetails(item) {
      uni.navigateTo({
        url: `/channelPackage/clientTab/pages/clientDetails?id=${item.id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.client-page-wrapper {
  width: 100%;
  box-sizing: border-box;

  .top-wrapper {
    width: 100%;
    height: 88rpx;
    box-sizing: border-box;
    padding: 0rpx 30rpx;
    display: flex;
    align-items: center;
    background-color: #f1f1f1;

    .search {
      flex: 1;
      box-sizing: border-box;
      margin-right: 20rpx;
    }

    .icon {
      width: 72rpx;
      height: 72rpx;
      line-height: 68rpx;
      text-align: center;
      background: #ffffff;
      border: 1rpx solid #dcdcdc;
      border-radius: 36rpx;
    }
  }

  .client-content-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 0rpx 30rpx;

    .client-content {
      width: 100%;
      height: 164rpx;
      box-sizing: border-box;
      //padding: 0rpx 30rpx;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      flex-direction: row;
      align-items: center;

      .client-avatar {
        width: 100rpx;
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        background: $u-type-primary;
        border-radius: 50%;
        font-size: 48rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #ffffff;
      }

      .color-blur {
        background: $u-type-primary;
      }

      .color-yellow {
        background: #fcd639;
      }

      .color-orange {
        background: #eb7734;
      }

      .color-green {
        background: #8ed334;
      }

      .client-info {
        flex: 1;
        box-sizing: border-box;
        margin-left: 32rpx;

        view {
          box-sizing: border-box;
          margin-bottom: 5rpx;
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 36rpx;
        }

        .client-name {
          font-size: 30rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1c1c1c;
        }
      }
    }

    .empty-wrapper {
      width: 100%;
      height: calc(100vh - 90rpx);
    }
  }

  .client-add-wrapper {
    width: 250rpx;
    background-color: #ffffff;
    box-shadow: 8rpx 8rpx 6rpx #a9a9a9;
    box-sizing: border-box;
    position: fixed;
    top: 82rpx;
    right: 40rpx;
    z-index: 12222;

    .item {
      height: 80rpx;
      line-height: 80rpx;
      box-sizing: border-box;
      text-align: center;
    }

    .border-bottom {
      border-bottom: 2rpx solid #797979;
    }
  }
}
</style>