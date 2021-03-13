<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-20 17:03:55
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-10 16:16:57
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
          :focus="true"
          @search="searchSomething"
          @custom="searchSomething"
          @clear="searchData"
        ></u-search>
      </view>
      <view
        class="district"
        v-if="isArea"
      >
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
      <scroll-view
        :style="{ height: `calc(100vh - ${isArea? 212 : 102}rpx)`}"
        @scrolltolower="lower"
        scroll-y="true"
        lower-threshold="50"
        v-if="tablePage.length"
      >
        <view v-if="!cssType">
          <template v-for="(item, i) in tablePage">
            <view
              :key="i"
              class="list-item"
              @click="goBackPage(item)"
            >{{item[paramsKey]}}
            </view>
          </template>
        </view>
        <view v-else>
          <!--选择优惠告知书 start-->
          <view v-if="cssType === 'notice'">
            <template v-for="(item, i) in tablePage">
              <view
                :key="i"
                class="list-item"
                @click="goBackPage(item)">
                <view class="notice-title">{{getDictName(item.notificationType, NotificationTypeList)}} ({{item.noticeNo}})</view>
                <view class="notice-explain">优惠方式：{{item.explain | emptyFilter}}</view>
                <view class="notice-explain">项目周期：{{item.cycleName | emptyFilter}}</view>
                <view class="notice-explain">业主信息：{{item.ownerInfoStr | emptyFilter}}</view>
              </view>
            </template>
          </view>
          <!--选择优惠告知书 end-->
          <!--选择客户 start-->
          <view v-if="cssType === 'custom'">
            <template v-for="(item, i) in tablePage">
              <view
                :key="i"
                class="list-item item-flex"
                @click="goBackPage(item)">
                <view>{{item.custName | emptyFilter}}</view>
                <view class="phone">{{item.custTel | emptyFilter}}</view>
              </view>
            </template>
          </view>
          <!--选择客户 end-->
        </view>
        <view style="padding: 20rpx 0 10rpx 0">
          <u-loadmore
            v-if="isShow"
            :status="loadingStatus"
          />
        </view>
      </scroll-view>
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
import * as apiList from "../../../api/index";
import pagination from "../../../mixins/pagination";
import {getAllDictByType} from "@/api";
const debounce = (function () {
  let timer;
  return function (fn, interval) {
    clearTimeout(timer);
    timer = setTimeout(fn, interval || 200);
  };
})();
export default {
  mixins: [pagination],
  components: {},
  data() {
    return {
      cssType: '', // 自定义要展示的内容名字
      dictObj: {
        types: [
          "NotificationType"
        ]
      }, // 需要用到的字典类型参数
      dictList: null, // 部分字典数据
      NotificationTypeList: [], // 优惠告知书类型字典
      isArea: false,
      keyword: "",
      areaShow: false,
      province: "选择省",
      city: "选择市",
      area: "选择区",
      queryPageParameters: {
        pageNum: 1,
        pageSize: 20,
      },
      searchNull: false,
      loadingStatus: "loading",
      isShow: false,
      total: 0,
      tablePage: [],
      paramsKey: "",
      paramsId: "",
      type: "",
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
      debounce(this.searchData, 500);
    },
    tablePage(v) {
      if (v.length) {
        this.searchNull = false;
      } else {
        this.searchNull = true;
      }
    },
  },
  async onLoad() {
    this.cssType = getApp()?.globalData?.searchParams?.cssType;
    // 根据需要获取字典
    if (['notice'].includes(this.cssType)) {
      this.dictList = await this.getAllDictByTypes(this.dictObj);
      this.NotificationTypeList = await this.getSignDict("NotificationType");
      console.log('NotificationTypeList', this.NotificationTypeList);
    }
    this.paramsKey = getApp().globalData.searchParams.key;
    this.paramsId = getApp().globalData.searchParams.id;
    this.type = getApp().globalData.searchParams.type;
    if (this.isArea && !this.areaList?.length) {
      await this.getAreaOption();
    }
    await this.getListMixin();
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
      this.isShow = true;
      if (this.total <= this.tablePage.length) return;
      this.loadingStatus = "loading";
      this.queryPageParameters.pageNum++;
      this.getListMixin();
    },
    searchSomething(e) {
      if (e) {
        this.searchData();
      }
    },
    // 搜索方法与加载分开
    searchData() {
      this.tablePage = [];
      this.queryPageParameters = {
        pageNum: 1,
        pageSize: 20,
      };
      this.getListMixin();
    },
    // 返回到上一页
    goBackPage(data) {
      getApp().globalData.searchBackData = { type: this.type, data };
      uni.navigateBack();
    },

    // 搜索内容请求
    async getListMixin() {
      let params = {
        ...this.queryPageParameters,
        ...getApp().globalData.searchParams.other,
      };
      if (this.keyword) {
        params[this.key] = this.keyword;
      } else {
        params[this.key] = "";
      }
      let item = await apiList[getApp().globalData.searchParams.api](params);
      this.setPageDataMixin(item);
      this.total = item.total;
      if (this.tablePage.length) {
        this.searchNull = false;
      } else {
        this.searchNull = true;
      }
      // 处理选择优惠告知书展示的业主信息
      if (this.cssType === 'notice' && this.tablePage && this.tablePage.length) {
        await this.initNoticeTable();
      }
      this.$forceUpdate();
    },

    // 处理选择优惠告知书展示的业主信息
    initNoticeTable() {
      this.tablePage.forEach((item) => {
        let nameArr = [];
        let nameStr = '';
        if (item.ownerList && item.ownerList.length) {
          item.ownerList.forEach((list) => {
            nameArr.push(`${list.ownerName ? list.ownerName : '---'} (${list.ownerMobile ? list.ownerMobile : '---'})`);
          });
        }
        if (nameArr && nameArr.length) {
          nameStr = nameArr.join('；');
        }
        this.$set(item, 'ownerInfoStr', nameStr);
      });
    },

    // 获取对应类型的字典集合
    async getAllDictByTypes(obj) {
      const dictList = await getAllDictByType(obj);
      return dictList;
    },
    // 获取单个类型字典
    async getSignDict(type = '') {
      let list = [];
      if (this.dictList) {
        Object.keys(this.dictList).forEach((key) => {
          if (key === type) {
            list = this.dictList[key];
          }
        });
      }
      return list;
    },
    // 获取字典的name
    getDictName(type = "", list = []) {
      let name = '';
      if (type && list && list.length) {
        list.forEach((item) => {
          if (item.code === type) {
            name = item.name;
          }
        });
      }
      return name
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
  padding-bottom: 10rpx;
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
  padding: 0 10rpx 24rpx 24rpx;
  text-align: center;
  flex: 1;
}
.list-item {
  text-align: left;
  padding: 20rpx 10rpx 20rpx 20rpx;
  border-bottom: 1px solid #e4e7ed;

  .notice-title {
    font-weight: bold;
    margin-bottom: 10rpx;
  }

  .notice-explain {
    font-size: 24rpx;
    color: #606266;
    margin-top: 6rpx;
  }
}

.item-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  view {
    flex: 1;
  }

  .phone {
    text-align: right;
  }
}

.searchNull {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
}
</style>