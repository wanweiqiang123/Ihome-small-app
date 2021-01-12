<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-20 17:03:55
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-12 20:58:51
-->
<template>
  <PageingSearch
    ref="search"
    :props="{
      label: paramsKey,
      value: paramsId
    }"
    :search-api="searchApi"
    :params-key="paramsKey"
  >
    <template #searchlist="{ scrollData, label }">
      <view
        class="list-item"
        :key="scrollData[paramsId]"
        @click="goBackPage(scrollData)"
      >
        {{scrollData[label]}}
      </view>
    </template>
  </PageingSearch>
</template>
<script>
import PageingSearch from "../../../components/pagingSearch/index.vue";
export default {
  components: { PageingSearch },
  data() {
    return {
      searchApi: "",
      paramsKey: "",
      paramsId: "",
      type: "",
    };
  },
  onLoad() {
    this.searchApi = getApp().globalData.searchParams.api;
    this.paramsKey = getApp().globalData.searchParams.key;
    this.paramsId = getApp().globalData.searchParams.id;
    this.type = getApp().globalData.searchParams.type;
  },
  mounted() {},
  methods: {
    goBackPage(data) {
      getApp().globalData.searchBackData = { type: this.type, data };
      uni.navigateBack();
    },
  },
};
</script> 
<style lang="scss" scoped>
.list-item {
  text-align: left;
  padding: 20rpx 10rpx 20rpx 20rpx;
  border-bottom: 1px solid #e4e7ed;
}
</style>