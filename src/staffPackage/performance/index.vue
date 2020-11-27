<!--
 * @Description: 业绩申报列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 14:54:27
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-27 10:33:09
-->
<template>
  <view class="performance safe-area-inset-bottom">
    <view class="performance-search">
      <u-search
        style="flex: 1"
        :show-action="false"
        bg-color="#fff"
        placeholder="日照香炉生紫烟"
        v-model="keyword"
        :clearabled="true"
      ></u-search>
      <view
        class="filter-btn"
        @click="isShow = true"
      >
        <span>筛选</span>
      </view>
    </view>
    <view class="performance-list">
      <u-card
        :border="false"
        class="ih-card"
        padding="15"
        margin="20rpx 30rpx"
        border-radius="4"
        v-for="i in 8"
        :key="i"
      >
        <view slot="head">
          <view class="item-title">
            <text class="title-text">成交报告编号：CJ38135843321</text>
            <text class="title-icon">待确认</text>
          </view>
        </view>
        <view
          slot="body"
          class="ih-card-content"
        >
          <view>项目周期：保利20200120-20200220</view>
          <view>合同类型：分销成交</view>
          <view>客户名称：陈先生</view>
          <view>成交阶段：认筹</view>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <u-button
            size="mini"
            type="error"
            class="foot-btn"
          >删除</u-button>
          <u-button
            size="mini"
            type="primary"
            class="foot-btn"
          >修改</u-button>
          <u-button
            size="mini"
            type="success"
            class="foot-btn"
          >详情</u-button>
        </view>
      </u-card>
    </view>
    <view class="performance-btn safe-area-inset-bottom">
      <u-button
        shape="circle"
        type="primary"
        @click="handleGo()"
      >业绩申报</u-button>
    </view>
    <!-- 筛选弹出 -->
    <PopupSearch
      v-model="isShow"
      @reset="handleReset()"
    >
      <u-form
        :model="form"
        ref="form"
        label-position="top"
        :border-bottom="false"
      >
        <u-form-item
          label="项目名称"
          prop="name"
          :border-bottom="false"
        >
          <u-input
            v-model="form.name"
            border
            placeholder="请选择项目"
            type="select"
          />
        </u-form-item>
        <u-form-item
          label="项目周期"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            border
            placeholder="请选择周期"
            type="select"
          />
        </u-form-item>
        <u-form-item
          label="合同类型"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            border
            placeholder="请选择合同类型"
            type="select"
          />
        </u-form-item>
        <u-form-item
          label="成交阶段"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            border
            placeholder="请选择成交阶段"
            type="select"
          />
        </u-form-item>
        <u-form-item
          label="成交状态"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            border
            placeholder="请选择成交状态"
            type="select"
          />
        </u-form-item>
      </u-form>
    </PopupSearch>
  </view>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
export default {
  name: "performance",
  components: {
    PopupSearch,
  },
  data() {
    return {
      isShow: false,
      form: {
        name: null,
      },
    };
  },
  methods: {
    handleGo() {
      uni.navigateTo({
        url: "/staffPackage/performanceEdit/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.performance {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-search {
    position: fixed;
    display: flex;
    align-items: center;
    padding: 10rpx 0 8rpx 30rpx;
    background: $u-bg-color;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .filter-btn {
    padding: 0 44rpx 0 47rpx;
    margin-left: 16rpx;
    width: 150rpx;
    line-height: 71rpx;
    background: #fcd639;
    color: #fff;
    border-radius: 50rpx 0 0 50rpx;
    font-size: 30rpx;
  }
  &-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: content-box;
    height: 90rpx;
    padding-top: 10rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    background: #fff;
    z-index: 100;
  }
}
.performance-list {
  padding-top: 70rpx;
  padding-bottom: 90rpx;
}
.ih-card {
  &-content {
    line-height: 42rpx;
    color: #606266;
    font-size: 26rpx;
  }
  &-foot {
    text-align: right;
    .foot-btn + .foot-btn {
      margin-left: 30rpx;
    }
  }
  .item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-icon {
      padding: 5rpx 10rpx;
      border-radius: 4rpx;
      color: #fff;
      white-space: nowrap;
      background: $u-type-success;
      box-sizing: border-box;
      font-size: 26rpx;
      line-height: 1;
    }
    .title-text {
      white-space: nowrap;
      font-weight: bold;
      font-size: 30rpx;
      font-weight: 600;
      line-height: 48rpx;
    }
  }
}
</style>
