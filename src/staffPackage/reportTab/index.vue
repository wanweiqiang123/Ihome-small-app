<!--
 * @Description: 报备汇总
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-30 08:53:45
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-16 09:28:34
-->
<template>
  <StaffTabBar>
    <view class="report">
      <u-tabs
        :list="tabList"
        :is-scroll="false"
        :current="current"
        :bold="false"
        duration="0.2"
        @change="tabChange"
        height="70"
        :bar-style="{
          bottom: '-8rpx'
        }"
      ></u-tabs>
      <scroll-view
        scroll-x="true"
        class="scroll-view-h"
      >
        <view class="item-container">
          <view class="item">
            <view class="item-title">今日报备总数</view>
            <view class="item-num">
              <view>2000</view>
              <view class="icon"></view>
            </view>
          </view>
          <view class="item warning">
            <view class="item-title">今日到访总数</view>
            <view class="item-num">
              <view>2000</view>
              <view class="icon down"></view>
            </view>
          </view>
          <view class="item">
            <view class="item-title">今日成交总数</view>
            <view class="item-num">
              <view>2000</view>
              <view class="icon"></view>
            </view>
          </view>
          <view class="item warning">
            <view class="item-title">今日无效总数</view>
            <view class="item-num">
              <view>2000</view>
              <view class="icon down"></view>
            </view>
          </view>
        </view>
      </scroll-view>
      <!-- <view class="report-content"> -->
      <view class="report-title">
        <text>周期报备详情</text>
        <u-search
          style="flex: 1"
          :show-action="false"
          placeholder="按周期名称搜索"
          v-model="keyword"
          :clearabled="true"
          height="72"
          bg-color="#fff"
          border-color="#DCDCDC"
          margin="0 0 0 60rpx"
        ></u-search>
      </view>
      <view class="report-table">
        <u-table
          :th-style="{
            backgroundColor:'#E2E1E2',
            color:'#333333',
            borderColor: '#E2E1E2',
            height: '68rpx',
            fontFamily: 'Source Han Sans CN'
          }"
          border-color="#fff"
          color="#606266"
          font-size="24"
          class="ihome-table"
        >
          <u-tr>
            <u-th>
              <view style="width: 300rpx">项目周期</view>
            </u-th>
            <u-th width="10%">报备</u-th>
            <u-th width="10%">到访</u-th>
            <u-th width="10%">成交</u-th>
            <u-th width="10%">无效</u-th>
          </u-tr>
          <u-tr
            v-for="i in 10"
            :key="i"
            class="ihome-tr"
          >
            <u-td>
              <view style="width: 300rpx">保利天悦20200101~20200201</view>
            </u-td>
            <u-td>300</u-td>
            <u-td>200</u-td>
            <u-td>50</u-td>
            <u-td>100</u-td>
          </u-tr>
        </u-table>
      </view>
      <!-- </view> -->
    </view>
    <!-- 日历 -->
    <u-calendar
      v-model="isShow"
      mode="range"
      @change="change"
      :safe-area-inset-bottom="true"
    ></u-calendar>
  </StaffTabBar>
</template>

<script>
export default {
  name: "report-tab",
  data() {
    return {
      tabList: [
        { name: "今天" },
        { name: "昨天" },
        { name: "近7天" },
        { name: "近30天" },
        { name: "自定义" },
      ],
      current: 0,
      keyword: null,
      isShow: false,
    };
  },
  methods: {
    tabChange(index) {
      this.current = index;
      if (this.current === 4) {
        this.isShow = true;
      }
    },
    change(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.report {
  .scroll-view-h {
    border-top: 1px solid #f1f1f1;
    background: #fff;
  }
  .item-container {
    display: inline-flex;
    padding: 20rpx 0 40rpx 30rpx;
  }
  .item {
    width: 320rpx;
    height: 168rpx;
    background: linear-gradient(113deg, #62abfd, #4881f9);
    box-shadow: 0px 6px 10px 0px rgba(72, 129, 249, 0.26);
    color: #fff;
    margin-right: 30rpx;
    border-radius: 24rpx;
    padding: 30rpx;
    font-family: "Source Han Sans CN";
    &.warning {
      background: linear-gradient(113deg, #fec03d, #ff9900);
    }
    .item-num {
      display: flex;
      align-items: flex-end;
      font-size: 52rpx;
      font-weight: 800;
      .icon {
        position: relative;
        margin-left: 16rpx;
        bottom: 12rpx;
        width: 12rpx;
        height: 27rpx;
        background: url("../common/icon/up.png") no-repeat;
        background-size: cover;
        &.down {
          background: url("../common/icon/down.png") no-repeat;
          background-size: cover;
        }
      }
    }
    .item-title {
      font-size: 24rpx;
    }
  }
  &-content {
    padding: 20rpx 30rpx 0;
  }
  &-title {
    height: 74rpx;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 26rpx;
    color: #333333;
    font-family: "Source Han Sans CN";
  }
  &-table {
    padding: 10rpx 0 20rpx;
    background: #ffffff;
  }
}
.ih-card {
  &-head {
    font-weight: bold;
  }
  &-content {
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
}
.ihome-table .ihome-tr {
  /deep/ .u-tr {
    border-bottom: 1px solid #f1f1f1;
  }
}
</style>
