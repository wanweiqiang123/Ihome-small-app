<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-13 16:47:03
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-16 17:43:55
-->
<template>
  <u-popup
    v-model="show"
    ref="popup"
    mode="top"
    height="100%"
    class="safe-area-inset-bottom"
  >
    <view class="box">
      <view class="search-title">
        <view class="search">
          <u-icon
            style="width: 50rpx"
            name="arrow-leftward"
            size="30"
            @click="show = false"
          ></u-icon>
          <u-search
            style="flex: 1"
            placeholder="请输入关键字"
            v-model="keyword"
            clearabled
            action-text="搜索"
            :focus="focus"
            @search="searchSomething"
            @custom="searchSomething"
            @change="searchSomething"
          ></u-search>
        </view>
        <view class="district">
          <view
            class="district-item"
            @click="areaShow=true"
          >
            <view>{{province}}
              <u-icon
                name="arrow-down"
                size="28"
              ></u-icon>
            </view>
            <view>{{city}}
              <u-icon
                name="arrow-down"
                size="28"
              ></u-icon>
            </view>
            <view>{{area}}
              <u-icon
                name="arrow-down"
                size="28"
              ></u-icon>
            </view>
          </view>
          <u-select
            title="请选择地区"
            v-model="areaShow"
            :list="list"
            confirm-color="#dd524d"
            mode="mutil-column-auto"
            @confirm="confirm"
          ></u-select>
        </view>
      </view>
      <view class="search-content">
        <scroll-view
          @scrolltolower="lower"
          scroll-y="true"
        >
          <view>
            <view
              class="list-item"
              v-for="index in 30"
              :key="index"
            >
              第{{index}}个Item
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </u-popup>
</template>
<script>
import { getAreaApi } from "../api/index";
export default {
  data() {
    return {
      show: false,
      keyword: "",
      focus: false,
      areaShow: false,
      list: [],
      province: "选择省",
      city: "选择市",
      area: "选择区",
    };
  },
  watch: {
    show(v) {
      if (v) this.focus = true;
      else this.focus = false;
    },
  },
  methods: {
    open() {
      this.show = true;
      this.getAreaOption();
    },
    async getAreaOption() {
      let data = await getAreaApi();
      let first = this.$u.deepClone(data[0]);
      data.splice(0, 1);
      data = data.map((v) => ({
        ...v,
        value: v.code,
        label: v.name,
      }));
      this.list = this.$tool.listToGruop(data, {
        rootId: first.code,
        children: "children",
        parentId: "parentCode",
        id: "value",
      });
    },
    confirm(e) {
      if (e.length) {
        this.province = e[0].label;
        this.city = e[1].label;
        this.area = e[2].label;
      }
    },
    lower(e) {
      console.log(e, "xxxx");
    },
    searchSomething(e) {
      console.log(e, "搜索");
    },
  },
};
</script>
<style lang="scss">
.box {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
}
.search-title {
  padding: 20rpx 20rpx 0 20rpx;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 10;
}
.search {
  display: flex;
  width: 100%;
}
.district {
  padding-top: 20rpx;
  height: 80rpx;
  line-height: 80rpx;
  box-sizing: content-box;
}
.district-item {
  display: flex;
  justify-content: space-around;
  u-icon {
    margin-left: 10rpx;
  }
}
.search-content {
  padding: 0 24rpx 24rpx 24rpx;
  text-align: center;
  flex: 1;
}
.list-item {
  text-align: left;
  padding-left: 20rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-top: 1px solid #e4e7ed;
}
</style>
