<!--
 * @Description: 报备汇总
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-30 08:53:45
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-08 11:08:49
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
      ></u-tabs>
      <scroll-view
        scroll-x="true"
        class="scroll-view-h"
      >
        <view class="item-container">
          <view class="item">
            <view class="item-num">2000
              <u-icon name="arrow-upward" />
            </view>
            <view>今日报备总数</view>
          </view>
          <view class="item warning">
            <view class="item-num">2000
              <u-icon name="arrow-upward" />
            </view>
            <view>今日到访总数</view>
          </view>
          <view class="item primary">
            <view class="item-num">2000
              <u-icon name="arrow-upward" />
            </view>
            <view>今日成交总数</view>
          </view>
          <view class="item error">
            <view class="item-num">2000
              <u-icon name="arrow-upward" />
            </view>
            <view>今日无效总数</view>
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
          border-color="#DCDCDC"
          search-icon=""
          margin="0 0 0 50rpx"
          shape="square"
        ></u-search>
      </view>
      <view class="report-table">
        <u-table :th-style="{backgroundColor:'#4881F9',color:'#FFFFFF'}">
          <u-tr>
            <u-th>
              <view style="width: 300rpx">项目周期</view>
            </u-th>
            <u-th width="10%">报备</u-th>
            <u-th width="10%">到访</u-th>
            <u-th width="10%">成交</u-th>
            <u-th width="10%">无效</u-th>
          </u-tr>
          <u-tr>
            <u-td>
              <view style="width: 300rpx">保利天悦20200101~20200201</view>
            </u-td>
            <u-td>300</u-td>
            <u-td>200</u-td>
            <u-td>50</u-td>
            <u-td>100</u-td>
          </u-tr>
          <u-tr>
            <u-td>
              <view style="width: 300rpx">保利天悦20200101~20200201</view>
            </u-td>
            <u-td>300</u-td>
            <u-td>200</u-td>
            <u-td>50</u-td>
            <u-td>100</u-td>
          </u-tr>
          <u-tr>
            <u-td>
              <view style="width: 300rpx">保利天悦20200101~20200201</view>
            </u-td>
            <u-td>300</u-td>
            <u-td>200</u-td>
            <u-td>50</u-td>
            <u-td>100</u-td>
          </u-tr>
          <u-tr>
            <u-td>
              <view style="width: 300rpx">保利天悦20200101~20200201</view>
            </u-td>
            <u-td>300</u-td>
            <u-td>200</u-td>
            <u-td>50</u-td>
            <u-td>100</u-td>
          </u-tr>
          <u-tr>
            <u-td>
              <view style="width: 300rpx">保利天悦20200101~20200201</view>
            </u-td>
            <u-td>300</u-td>
            <u-td>200</u-td>
            <u-td>50</u-td>
            <u-td>100</u-td>
          </u-tr>
          <u-tr>
            <u-td>
              <view style="width: 300rpx">保利天悦20200101~20200201</view>
            </u-td>
            <u-td>300</u-td>
            <u-td>200</u-td>
            <u-td>50</u-td>
            <u-td>100</u-td>
          </u-tr>
          <u-tr>
            <u-td>
              <view style="width: 300rpx">保利天悦20200101~20200201</view>
            </u-td>
            <u-td>300</u-td>
            <u-td>200</u-td>
            <u-td>50</u-td>
            <u-td>100</u-td>
          </u-tr>
          <u-tr>
            <u-td>
              <view style="width: 300rpx">保利天悦20200101~20200201</view>
            </u-td>
            <u-td>300</u-td>
            <u-td>200</u-td>
            <u-td>50</u-td>
            <u-td>100</u-td>
          </u-tr>
          <u-tr>
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
    };
  },
  methods: {
    tabChange(index) {
      this.current = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.report {
  .scroll-view-h {
    background: #fff;
  }
  .item-container {
    display: inline-flex;
    padding: 30rpx 0 30rpx 30rpx;
  }
  .item {
    width: 300rpx;
    height: 160rpx;
    background: $u-type-primary;
    color: #fff;
    margin-right: 30rpx;
    border-radius: 20rpx;
    padding: 30rpx;
    &.warning {
      background: $u-type-warning;
    }
    &.error {
      background: $u-type-error;
    }
    &.success {
      background: $u-type-success;
    }
    &.primary {
      background: $u-type-primary-dark;
    }
    .item-num {
      font-size: 40rpx;
      font-weight: bold;
    }
  }
  &-content {
    padding: 20rpx 30rpx 0;
  }
  &-title {
    margin-top: 20rpx;
    height: 100rpx;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24rpx;
    color: $u-type-primary;
    font-family: "Source Han Sans CN";
  }
  &-table {
    padding: 0 20rpx 20rpx;
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
</style>
<style lang="scss">
page {
  background: $u-bg-color;
}
</style>
