<!--
 * @Description: 选择渠道分销合同
 * @version: 
 * @Author: lsj
 * @Date: 2021-04-19 14:18:10
 * @LastEditors: lsj
 * @LastEditTime: 2021-04-19 15:01:11
-->
<template>
  <u-popup
    v-model="valueFlag"
    mode="right"
    width="100%"
    close-icon-pos="top-left"
    :closeable="false"
    safe-area-inset-bottom>
    <view class="box">
      <view class="search-content">
        <scroll-view
          :style="{ height: `calc(100vh - 30rpx)`}"
          scroll-y="true"
          lower-threshold="80"
          v-if="list.length">
          <view
            class="ih-card"
            v-for="(item, index) in list"
            @click.native="handleSelectPackage(item)"
            :key="index">{{item.contractTitle}}</view>
        </scroll-view>
        <view v-if="!list.length" class="searchNull">
          <u-empty text="暂无渠道分销合同" mode="list"></u-empty>
        </view>
      </view>
    </view>
    <view class="performance-btn safe-area-inset-bottom">
      <u-button shape="circle" type="primary" @click="handleReturn">返回</u-button>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: "ContNoList",
  props: {
    valueFlag: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => {return []},
    }
  },
  data() {
    return {

    };
  },
  async created() {
    console.log('contNoList', this.list);
  },
  methods: {
    // 选择渠道分销合同
    handleSelectPackage(data) {
      this.$emit("finish", data);
    },
    // 返回
    handleReturn() {
      this.$emit("close");
    }
  },
};
</script>

<style lang="scss">
.box {
  display: flex;
  flex-flow: column nowrap;
}

.performance-btn {
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
.search-content {
  padding: 10px 20rpx;
  flex: 1;
}
.list-item {
  text-align: left;
  padding: 20rpx 10rpx 20rpx 20rpx;
  border-bottom: 1px solid #e4e7ed;
}
.searchNull {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
}
.ih-card {
  //border: 2rpx solid $u-bg-color;
  padding: 20rpx 0rpx;
  border-bottom: 1px solid $u-bg-color;
}
</style>
