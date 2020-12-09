<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-20 17:03:55
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-09 08:57:40
-->
<template>
  <PageingSearch
    ref="search"
    :search-api="searchApi"
    :params-key="paramsKey"
  >
    <template #searchlist="{ scrollData }">
      <view
        class="list-item"
        :key="scrollData.id"
        @click="goBackPage(scrollData)"
      >
        {{scrollData.name}} {{scrollData.id}}
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
    };
  },
  onLoad(option) {
    this.searchApi = option.api;
  },
  mounted() {},
  methods: {
    goBackPage(data) {
      this.$tool.back(null, { type: "init", data });
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