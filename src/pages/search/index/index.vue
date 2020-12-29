<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-20 17:03:55
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-28 19:48:16
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
    <template #searchlist="{ scrollData, label, value }">
      <view
        class="list-item"
        :key="scrollData[paramsId]"
        @click="goBackPage(scrollData)"
      >
        {{scrollData[label]}} {{scrollData[value]}}
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
  onLoad(option) {
    console.log(option);
    this.searchApi = option.api;
    this.paramsKey = option.key;
    this.paramsId = option.idName;
  },
  onShow() {
    this.searchApi = getApp().globalData.searchParams.api;
    this.paramsKey = getApp().globalData.searchParams.key;
    this.paramsId = getApp().globalData.searchParams.id;
    this.type = getApp().globalData.searchParams.type;
  },
  mounted() {},
  methods: {
    goBackPage(data) {
      this.$tool.back(null, { type: this.type, data });
    },
  },
};
</script> 
<style lang="scss" scoped>
.list-item {
  text-align: left;
  padding-left: 20rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-bottom: 1px solid #e4e7ed;
}
</style>