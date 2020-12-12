<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-26 10:15:18
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-12 17:03:50
-->
<template>
  <view class="commission-wrapper">
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
        placeholder="请输入结佣单号搜索"
        v-model="queryPageParameters.projectName"></u-search>
      <view class="filter-wrapper">筛选</view>
      <u-icon name="grid-fill" color="#3478F7" size="38" @click="showSearchWin = true"></u-icon>
    </view>
    <view class="list-wrapper">
      <view class="list-item" v-for="item in [1,2,3,4,5,6,7,8,9,10]" :key="item" @click="viewCommissionDetails">
        <view class="item-code u-padding-bottom-20">
          <view class="code">结佣申请单号：CJ38135843321</view>
          <view class="status">审核中</view>
        </view>
        <view class="price u-padding-bottom-10">申请佣金：1000.00</view>
        <view class="price u-padding-bottom-10">扣除金额：1000.00</view>
        <view class="price u-padding-bottom-10">实结佣金：1000.00</view>
        <view class="price u-padding-bottom-10">申请时间：2020-10-18 18:20:20</view>
        <view class="detail u-padding-bottom-10">
          <text>详情</text>
          <u-icon name="arrow-right" size="28"></u-icon>
        </view>
      </view>
    </view>
    <view class="bottom-btn">
      <u-button type="primary" @click="sponsorCommission">发起结佣申请</u-button>
    </view>
    <u-popup v-model="showSearchWin" mode="right" length="80%">
      <view class="commission-popup-wrapper">
        <view class="status u-padding-20">状态</view>
        <view class="search-item-wrapper u-padding-20">
          <view
            @click="selectType(item)"
            :class="item.checked ? 'item selected' : 'item'"
            v-for="(item, index) in searchList"
            :key="index">{{item.name}}</view>
        </view>
        <view class="btn-wrapper">
          <view class="reset" @click="showSearchWin = false">重置</view>
          <view class="submit" @click="showSearchWin = false">确定</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryPageParameters: {
        projectName: ''
      },
      showSearchWin: false,
      searchList: [
        {
          name: '已通过',
          checked: false
        },
        {
          name: '审核中',
          checked: false
        },
        {
          name: '驳回',
          checked: false
        }
      ]
    };
  },
  onLoad() {},
  methods: {
    // 发起结佣申请
    sponsorCommission() {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/initiateCommission`
      });
    },
    // 选择
    selectType(item) {
      item.checked = !item.checked;
    },
    // 结佣详情
    viewCommissionDetails() {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/commissionDetails`
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .commission-wrapper {
    width: 100%;
    background-color: #F5F5F5;

    .top-wrapper {
      width: 100%;
      height: 92rpx;
      box-sizing: border-box;
      padding: 10rpx 24rpx 10rpx 18rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #F1F1F1;

      .search {
        flex: 1;
        box-sizing: border-box;
        margin-right: 20rpx;
      }

      .filter-wrapper {
        color: $u-type-primary;
        font-size: 30rpx;
      }
    }

    .list-wrapper {
      width: 100%;
      height: calc(100vh - 230rpx);
      overflow-y: auto;
      background-color: #F1F1F1;

      .list-item {
        box-sizing: border-box;
        margin: 10rpx 20rpx 20rpx 20rpx;
        padding: 20rpx;
        background-color: #FFFFFF;
        //border: 1rpx solid #DADADA;

        .item-code {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .code {
            flex: 1;
            font-family: PingFang SC;
            font-weight: 600;
            color: #1F1F1F;
            line-height: 48rpx;
          }

          .status {
            width: 91rpx;
            background: #EB7734;
            border-radius: 4rpx;
            font-family: PingFang SC;
            font-size: 24rpx;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 46rpx;
            text-align: center;
          }
        }

        .detail {
          width: 100%;
          text-align: right;
          box-sizing: border-box;
          margin-right: 20rpx;
          font-size: 26rpx;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #888888;
          line-height: 42rpx;
          display: flex;
          flex-direction: row;

          text {
            flex: 1;
          }
        }

        .price {
          font-size: 26rpx;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #606266;
          line-height: 42rpx;
        }
      }
    }

    .bottom-btn {
      width: 100%;
      height: 100rpx;
      box-sizing: border-box;
      padding: 10rpx 50rpx;
      background-color: #FFFFFF;
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      z-index: 9999;
    }
  }

  .commission-popup-wrapper {
    width: 100%;
    height: 100vh;
    position: relative;

    .status {
      color: #999999;
    }

    .search-item-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .item {
        text-align: center;
        box-sizing: border-box;
        margin-right: 10rpx;
        padding: 15rpx 25rpx;
        background-color: #FFFFFF;
        border: 1rpx solid #F2F2F2;
      }

      .selected {
        border: 1rpx solid $u-type-primary;
        color: $u-type-primary;
      }
    }

    .btn-wrapper {
      width: 100%;
      position: absolute;
      left: 0rpx;
      bottom: 0rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      view {
        flex: 1;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
      }

      .reset {
        border-top: 1rpx solid #E4E4E4;
        background-color: #FFFFFF;
        color: $u-type-primary;
      }

      .submit {
        background-color: $u-type-primary;
        color: #FFFFFF;
      }
    }
  }
</style>