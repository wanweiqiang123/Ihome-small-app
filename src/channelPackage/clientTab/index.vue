<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-17 10:08:05
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-15 19:14:50
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
          v-model="queryPageParameters.name"></u-search>
        <view class="icon" @click="showAddWin = true">
          <u-icon name="plus" color="#888888" size="30"></u-icon>
        </view>
      </view>
      <view class="client-content-wrapper">
        <view class="client-content" v-for="item in tablePage" :key="item" @click="viewClientDetails(item)">
          <view class="client-avatar">王</view>
          <view class="client-info">
            <view class="client-name">{{ item.name }}</view>
            <view class="client-phone">{{ item.mobile }}</view>
            <view class="client-time">录入时间：{{ item.inputTime }}</view>
          </view>
        </view>
      </view>
      <u-mask
        @click="showAddWin = false"
        :show="showAddWin"
        :duration="400"
        :zoom="true" :custom-style="{background: 'rgba(255, 255, 255, 0.1)'}"></u-mask>
      <view class="client-add-wrapper" v-if="showAddWin">
        <view class="item border-bottom" @click="handleAdd('report')">客户报备</view>
        <view class="item" @click="handleAdd('enter')">录入客户</view>
      </view>
    </view>
  </ChannelTabBar>
</template>

<script>
import pagination from "@/mixins/pagination";
import { getCustomerList } from '@/api/channel'
export default {
  mixins: [pagination],
  data() {
    return {
      queryPageParameters: {
        name: '',
        mobile: ''
      },
      tableTotal: null, //总数
      tablePage: [], //列表数据
      showAddWin: false
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
      if (type === 'report') {
        // 报备客户
        uni.navigateTo({
          url: `/channelPackage/homeTab/pages/reportClient`
        });
      } else if (type === 'enter') {
        // 录入客户
        uni.navigateTo({
          url: `/channelPackage/clientTab/pages/enterClient`
        });
      }
      this.showAddWin = false;
    },
    // 查看客户详情
    viewClientDetails(item) {
      uni.navigateTo({
        url: `/channelPackage/clientTab/pages/clientDetails?id=${item.id}`
      });
    }
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
      background-color: #F1F1F1;

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
        background: #FFFFFF;
        border: 1rpx solid #DCDCDC;
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
          color: #FFFFFF;
        }

        .color-blur {
          background: $u-type-primary;
        }

        .color-yellow {
          background: #FCD639;
        }

        .color-orange {
          background: #EB7734;
        }

        .color-green {
          background: #8ED334;
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
            color: #1C1C1C;
          }
        }
      }
    }

    .client-add-wrapper {
      width: 250rpx;
      background-color: #FFFFFF;
      box-shadow: 8rpx 8rpx 6rpx #A9A9A9;
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