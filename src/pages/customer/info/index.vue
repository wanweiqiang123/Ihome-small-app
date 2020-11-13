<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-30 11:41:02
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-13 14:59:42
-->
<template>
  <view>
    <view>
      {{ id }}
    </view>
    <view style="margin: 20px 0">
      <u-button type="primary" @click="edit()">修改</u-button>
    </view>
    <view style="margin: 20px 0">
      <u-button type="primary" @click="add()">新增-头部追加</u-button>
    </view>
    <view style="margin: 20px 0">
      <u-button type="primary" @click="addInit()">新增-刷新列表</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      id: null,
    };
  },
  onLoad(option) {
    console.log(option.id);
    this.id = option.id;
  },
  methods: {
    edit() {
      let item = {
        id: this.id,
        name: "名称修改" + this.id,
      };
      this.$tool.back(null, { type: "update", data: item });
    },
    add() {
      let item = {
        id: 0,
        name: "名称新增" + 0,
        phone: "13511111111",
        time: "2020-11-13 14:52:36",
      };
      this.$tool.back(null, { type: "add", data: item });
    },
    addInit() {
      this.$tool.back(null, { type: "init", page: null });
    },
  },
};
</script>

<style lang="scss">
</style>