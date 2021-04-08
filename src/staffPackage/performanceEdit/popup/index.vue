<!--
 * @Description: 收派套餐选择层
 * @version: 
 * @Author: lsj
 * @Date: 2021-02-08 10:31:50
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-08 14:10:33
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
          @scrolltolower="lower"
          scroll-y="true"
          lower-threshold="80"
          v-if="tablePage.length">
          <view
            class="ih-card"
            v-for="(item, index) in tablePage"
            @click.native="handleSelectPackage(item)"
            :key="index">
            <view slot="head">
              <view class="item-title">
                <view class="title-left">收派标准{{index + 1}}</view>
                <view class="title-right">
                  <u-tag class="tag" :text="getDictName(item.transactionEnum, TransactionList)" type="info" />
                  <u-tag :text="getDictName(item.contractEnum, ContTypeList)" type="info" />
                </view>
              </view>
            </view>
            <view slot="body" class="ih-card-content">
              <view class="condition">条件：{{item.condition ? item.condition : '-'}}</view>
              <view class="money">金额：</view>
              <view class="info-content">
                <view class="info-data">
                  <view class="item">
                    <view>应收金额</view>
                    <text class="red">{{item.receivableAmout}}</text>
                  </view>
                  <view class="item">
                    <view>派佣金额</view>
                    <text class="red">{{item.sendAmount}}</text>
                  </view>
                  <view class="item">
                    <view>派内场奖励金额</view>
                    <text class="red">{{item.sendInAmount}}</text>
                  </view>
                  <view class="item">
                    <view>应收点数</view>
                    <text class="red">{{item.receivablePoint}}</text>
                  </view>
                  <view class="item">
                    <view>派佣点数</view>
                    <text class="red">{{item.sendPoint}}</text>
                  </view>
                  <view class="item">
                    <view>派内场奖励点数</view>
                    <text class="red">{{item.sendInPoint}}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view style="padding: 20rpx 0 10rpx 0">
            <u-loadmore :status="loadingStatus" v-if="isShow"/>
          </view>
        </scroll-view>
        <view v-if="searchNull" class="searchNull">
          <u-empty text="没有搜索结果" mode="search"></u-empty>
        </view>
      </view>
    </view>
    <view class="performance-btn safe-area-inset-bottom">
      <u-button shape="circle" type="primary" @click="handleReturn">返回</u-button>
    </view>
  </u-popup>
</template>

<script>
import {post_collectandsend_getCollectadnsendConditionMxByIds} from "@/api/staff";
import {getAllDictByType} from "@/api";
import pagination from "@/mixins/pagination";
const debounce = (function () {
  let timer;
  return function (fn, interval) {
    clearTimeout(timer);
    timer = setTimeout(fn, interval || 200);
  };
})();
export default {
  mixins: [pagination],
  name: "PopupIndex",
  props: {
    valueFlag: {
      type: Boolean,
      default: true,
    },
    queryData: {
      type: Object,
      default: () => {
        return {
          contType: null,
          distributionIds: [],
          feeType: null,
          partyACustomerId: null,
          property: null,
          subdivide: null,
          termId: null,
        };
      },
    },
  },
  data() {
    return {
      dictObj: {
        types: [
          "ContType",
          "Transaction"
        ]
      }, // 需要用到的字典类型参数
      dictList: null, // 部分字典数据
      ContTypeList: [],
      TransactionList: [],
      keyword: "",
      areaShow: false,
      queryPageParameters: {
        pageNum: 1,
        pageSize: 20,
      },
      searchNull: false,
      loadingStatus: "loading",
      isShow: false,
      total: 0,
      tablePage: [],
    };
  },
  watch: {
    keyword(v) {
      if (v) {
        debounce(this.searchData, 500);
      } else {
        this.queryPageParameters = {
          pageNum: 1,
          pageSize: 20,
        };
        this.tablePage = [];
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
  async created() {
    console.log('popup', this.queryData);
    this.dictList = await this.getAllDictByTypes(this.dictObj);
    this.ContTypeList = await this.getSignDict("ContType");
    this.TransactionList = await this.getSignDict("Transaction");
    this.getListMixin();
  },
  methods: {
    // 上拉加载
    lower() {
      this.isShow = true;
      if (this.total <= this.tablePage.length) return;
      this.loadingStatus = "loading";
      this.queryPageParameters.pageNum++;
      this.getListMixin('more');
    },
    async getListMixin(type) {
      let self = this;
      self.queryPageParameters = {
        ...self.queryPageParameters,
        ...self.queryData
      }
      let item = await post_collectandsend_getCollectadnsendConditionMxByIds(self.queryPageParameters);
      if (type && item.list && item.list.length) {
        if (this.tablePage.length) {
          this.tablePage.push(...item.list);
        } else {
          this.tablePage = item.list;
        }
      } else {
        this.tablePage = item.list;
      }
      if (this.tablePage.length) {
        this.searchNull = false;
      } else {
        this.searchNull = true;
      }
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
      // console.log('getSignDict:', list);
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
    // 选择收派标准
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
  //margin-top: 20rpx;
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
  //border-top: 1px solid #e4e7ed;
  padding: 10px 20rpx;
  //text-align: center;
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
  border: 2rpx solid $u-bg-color;
  //box-shadow: 2rpx 2rpx 6rpx rgba(0, 0, 0, .8);

  .item-title {
    width: 100%;
    box-sizing: border-box;
    padding: 10rpx;
    display: flex;
    flex-direction: row;
    font-size: 32rpx;

    .title-left {
      flex: 1;
    }

    .title-right {
      .tag {
        box-sizing: border-box;
        margin-right: 10rpx;
      }
    }
  }

  .ih-card-content {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 10rpx;

    .condition {
      font-size: 32rpx;
      box-sizing: border-box;
      margin-bottom: 10px;
    }

    .money {
      font-size: 32rpx;
    }

    .info-data {
      display: flex;
      flex-flow: wrap;
      .item {
        width: 32%;
        text-align: center;
        //padding: 40rpx 0;
        //font-size: 36rpx;
        font-family: "Source Han Sans CN";
        font-weight: bold;
        color: #333333;
        line-height: 60rpx;
        .red {
          // padding-top: 15rpx;
          color: #ff0000;
        }
        &:nth-child(1) {
          border-bottom: 1px solid #f1f1f1;
          border-right: 1px solid #f1f1f1;
        }
        &:nth-child(2) {
          border-right: 1px solid #f1f1f1;
          border-bottom: 1px solid #f1f1f1;
        }
        &:nth-child(3) {
          border-bottom: 1px solid #f1f1f1;
        }
        &:nth-child(4) {
          border-right: 1px solid #f1f1f1;
        }
        &:nth-child(5) {
          border-right: 1px solid #f1f1f1;
        }
        &:nth-child(5) {
          border-right: 1px solid #f1f1f1;
        }
      }
    }
  }
}
</style>
