<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-20 17:03:55
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-23 18:09:52
-->
<template>
  <PageingSearch
    ref="search"
    :search-api="searchApi"
    :params-key="paramsKey"
  >
    <template #searchlist="{ data }">
      <view
        class="list-item"
        :key="data.id"
        @click="goBackPage(data)"
      >{{data.name}} {{data.id}}
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
      paramsKey: "aaa",
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