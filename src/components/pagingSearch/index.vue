<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-13 16:47:03
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-25 17:14:50
-->
<template>
  <view class="box">
    <view class="search-title">
      <view class="search">
        <u-search
          style="flex: 1"
          placeholder="请输入关键字"
          v-model="keyword"
          clearabled
          action-text="搜索"
          :focus="focus"
          @search="searchSomething"
          @custom="searchSomething"
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
          :list="areaList"
          confirm-color="#dd524d"
          mode="mutil-column-auto"
          @confirm="confirm"
        ></u-select>
      </view>
    </view>
    <view class="search-content">
      <view class="scrollView">
        <scroll-view
          @scrolltolower="lower"
          scroll-y="true"
          lower-threshold="100"
          v-if="tablePage.length"
        >
          <template v-for="(item, i) in tablePage">
            <view
              v-if="Object.keys($scopedSlots).length"
              :key="i"
            >
              <slot
                name="searchlist"
                :data="item"
              ></slot>
            </view>
            <view
              v-else
              :key="i"
              class="list-item"
              @click="goBackPage(item)"
            >{{item.name}}</view>
          </template>
        </scroll-view>
      </view>
      <!-- <u-loadmore :status="loadingStatus" /> -->
      <view
        v-if="searchNull"
        class="searchNull"
      >
        <u-empty
          :key="i"
          text="没有搜索结果"
          mode="search"
        ></u-empty>
      </view>
    </view>
  </view>
</template>
<script>
import * as apiList from "../../api/index";
import pagination from "../../mixins/pagination";
const debounce = (function () {
  let timer;
  return function (fn, interval) {
    clearTimeout(timer);
    timer = setTimeout(fn, interval || 200);
  };
})();
export default {
  mixins: [pagination],
  props: {
    searchApi: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: () => "",
    },
    paramsKey: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      keyword: "",
      areaShow: false,
      province: "选择省",
      city: "选择市",
      area: "选择区",
      searchOptions: {
        list: [],
      },
      queryPageParameters: {
        pageNum: 1,
        pageSize: 20,
      },
      searchNull: false,
    };
  },
  computed: {
    areaList() {
      return this.$store.getters.areaList;
    },
    key() {
      return this.paramsKey ? this.paramsKey : "name";
    },
  },
  watch: {
    keyword(v) {
      if (!v) {
        this.tablePage = [];
      } else {
        debounce(this.getListMixin, 500);
      }
    },
    tablePage(v) {
      if (v.length) {
        this.searchNull = false;
      } else {
        this.searchNull = true;
      }
    },
  },
  created() {
    if (!this.areaList?.length) {
      this.getAreaOption();
    }
  },
  methods: {
    async getAreaOption() {
      let data = await apiList["getAreaApi"]();
      let first = this.$u.deepClone(data[0]);
      data.splice(0, 1);
      data = data.map((v) => ({
        ...v,
        value: v.code,
        label: v.name,
      }));
      const arr = this.$tool.listToGruop(data, {
        rootId: first.code,
        children: "children",
        parentId: "parentCode",
        id: "value",
      });
      this.$store.commit("setAreaList", arr);
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
      if (e) {
        this.getListMixin();
      }
    },
    // 返回到上一页
    goBackPage(v) {
      this.$tool.back(null, { type: "init", data: v });
    },
    async getListMixin() {
      let params = { ...this.queryPageParameters };
      params[this.key] = this.keyword;
      let item = await apiList[this.searchApi](params);
      this.tablePage = item.list;
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-flow: column nowrap;
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
  border-top: 1px solid #e4e7ed;
  padding: 0 24rpx 24rpx 24rpx;
  text-align: center;
  flex: 1;
  .scrollView {
    padding-top: 10rpx;
  }
}
.list-item {
  text-align: left;
  padding-left: 20rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-bottom: 1px solid #e4e7ed;
}
.searchNull {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
}
</style>
