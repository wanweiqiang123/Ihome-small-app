<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-26 10:15:18
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-26 11:20:18
-->
<template>
  <view class="commission-wrapper">
    <view class="top-wrapper">
      <u-search
        class="search"
        shape="round"
        bg-color="#F1F1F2"
        border-color="#f2f2f2"
        :show-action="false"
        placeholder="请输入结佣单号搜索"
        v-model="queryPageParameters.projectName"></u-search>
      <view class="filter-wrapper">筛选</view>
      <u-icon name="grid-fill" color="#3478F7" size="38" @click="showSearchWin = true"></u-icon>
    </view>
    <view class="list-wrapper">
      <view class="list-item" v-for="item in [1,2,3,4,5,6,7,8,9,10]" :key="item">
        <view class="item-code u-padding-bottom-20">
          <view class="code">结佣申请单号：CJ38135843321</view>
          <u-button type="primary" size="mini">审核中</u-button>
          <view class="detail">详情</view>
          <u-icon name="arrow-right" size="30"></u-icon>
        </view>
        <view class="price u-padding-bottom-20">申请佣金：1000.00</view>
        <view class="price u-padding-bottom-20">扣除金额：1000.00</view>
        <view class="price u-padding-bottom-20">实结佣金：1000.00</view>
        <view class="price u-text-right">申请时间：2020-10-18 18:20:20</view>
      </view>
    </view>
    <view class="bottom-btn">
      <u-button type="primary" @click="sponsorCommission">发起结佣申请</u-button>
    </view>
    <u-popup v-model="showSearchWin" mode="right" length="80%">
      <view class="popup-wrapper">
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
        url: `/intermediaryPackage/myTab/pages/initiateCommission`
      });
    },
    // 选择
    selectType(item) {
      item.checked = !item.checked;
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
      height: 85rpx;
      box-sizing: border-box;
      padding: 0rpx 20rpx;
      margin-top: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFFFFF;

      .search {
        flex: 1;
        box-sizing: border-box;
        margin-right: 20rpx;

        /deep/ .u-content {
          height: 62rpx !important;
        }
      }

      .filter-wrapper {
        color: #3478F7;
        font-size: 30rpx;
      }
    }

    .list-wrapper {
      width: 100%;
      height: calc(100vh - 230rpx);
      overflow-y: auto;
      background-color: #F5F5F5;

      .list-item {
        box-sizing: border-box;
        margin: 20rpx;
        padding: 20rpx;
        background-color: #FFFFFF;
        border: 1rpx solid #DADADA;

        .item-code {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .code {
            flex: 1;
          }

          .detail {
            box-sizing: border-box;
            margin: 0rpx 10rpx;
          }
        }

        .price {
          color: #999999;
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

  .popup-wrapper {
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
        border: 1rpx solid #278DFE;
        color: #278DFE;
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
        color: #0079FE;
      }

      .submit {
        background-color: #0079FE;
        color: #FFFFFF;
      }
    }
  }
</style>