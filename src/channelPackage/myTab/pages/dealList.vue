<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 13:05:22
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:36:58
-->
<template>
  <view class="deal-list-wrapper">
    <view class="top-wrapper">
      <u-search
        class="search"
        shape="round"
        height="72"
        placeholder-color="#BDBDBD"
        search-icon-color="#BDBDBD"
        bg-color="#FFFFFF"
        border-color="#DCDCDC"
        :show-action="false"
        placeholder="请输入客户姓名或手机号码"
        @search="getListMixin()"
        v-model="keyword"
      ></u-search>
      <view
        class="filter-wrapper"
        @click="isShow = true"
      >筛选</view>
      <u-icon
        name="grid-fill"
        color="#3478F7"
        size="38"
        @click="isShow = true"
      ></u-icon>
    </view>
    <view class="list-wrapper">
      <view
        class="list-item"
        v-for="(item, i) in tablePage"
        :key="i"
        @click="viewDealDetail(item.dealCode)"
      >
        <view class="item-code u-padding-bottom-20">
          <view class="code">{{item.dealCode | emptyFilter}}</view>
          <view class="detail">详情</view>
          <u-icon
            name="arrow-right"
            color="#999999"
            size="28"
          ></u-icon>
        </view>
        <view class="item-content">
          <view class="content-left">
            <view>项目名称：{{item.projectName | emptyFilter}}</view>
            <view>客户姓名：{{item.customerName | emptyFilter}}</view>
            <view>客户号码：{{item.customerPhone | emptyFilter}}</view>
          </view>
          <view class="content-right">
            <view class="right-top">
              <view class="title">可结佣</view>
              <view class="border">{{item.unpaidCommAmount ? item.unpaidCommAmount : 0}}</view>
            </view>
            <view class="right-bottom">
              <view class="title">已结佣</view>
              <view class="border">{{item.paidCommAmount ? item.paidCommAmount : 0}}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="empty-wrapper" v-if="!tablePage.length">
        <u-empty text="暂无数据" mode="list"></u-empty>
      </view>
    </view>
    <PopupSearch
      width="80%"
      :mask="true"
      v-model="isShow"
      @reset="reset()"
      @confirm="confirm()"
    >
      <u-form
        ref="notice"
        label-position="top"
        :border-bottom="false"
      >
        <u-form-item
          label="项目名称"
          :border-bottom="false"
        >
          <u-input
            v-model="queryPageParameters.proName"
            @click="handleToSearch"
            placeholder="请选择项目"
            type="select"
            border
          />
        </u-form-item>
        <u-form-item
          label="成交阶段"
          :border-bottom="false"
        >
          <u-input
            v-model="queryPageParameters.stageName"
            placeholder="请选择成交阶段"
            :select-open="stageShow"
            @click="stageShow = true"
            type="select"
            border
          />
        </u-form-item>
      </u-form>
    </PopupSearch>
    <u-select
      v-model="stageShow"
      z-index="20000"
      :list="projectStageList"
      @confirm="confirmStage"
    ></u-select>
  </view>
</template>

<script>
import { postDealListApi } from "@/api/channel";
import pagination from "../../../mixins/pagination";
import PopupSearch from "../../../components/PopupSearch/index.vue";
import storageTool from "@/common/storageTool";
export default {
  mixins: [pagination],
  components: {
    PopupSearch,
  },
  data() {
    return {
      keyword: "",
      queryPageParameters: {
        proName: "",
        stageName: "",
      },
      stageShow: false,
      isShow: false,
      projectStageList: [
        {
          value: "Recognize",
          label: "认筹",
        },
        {
          value: "Subscribe",
          label: "认购",
        },
        {
          value: "SignUp",
          label: "签约",
        },
      ],
      userInfo: {
        channelId: ''
      },
    };
  },
  onLoad() {
    this.userInfo = storageTool.getUserInfo();
    console.log('userInfo', this.userInfo);
    this.getListMixin();
  },
  onShow() {
    let item = getApp().globalData.searchBackData;
    if (item && item.type === "project") {
      this.queryPageParameters.projectCycle = item.data.proId;
      this.queryPageParameters.proName = item.data.proName;
      getApp().globalData.searchBackData = {};
    }
  },
  methods: {
    async getListMixin() {
      this.tableTotal = 0;
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.queryPageParameters.pageSize = 10;
      if (this.keyword) {
        this.queryPageParameters.phoneOrCusName = this.keyword;
      } else {
        this.queryPageParameters.phoneOrCusName = "";
      }
      this.queryPageParameters.agencyId = this.userInfo?.channelId;
      this.setPageDataMixin(await postDealListApi(this.queryPageParameters));
    },
    handleToSearch() {
      getApp().globalData.searchParams = {
        api: "getFuzzySearchByCityApi",
        key: "proName",
        id: "proId",
        type: "project",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    reset() {
      Object.assign(this.queryPageParameters, {
        projectCycle: "",
        proName: "",
        stageName: "",
        stage: "",
      });
    },
    async confirm() {
      this.getListMixin();
    },
    confirmStage(e) {
      this.queryPageParameters.stageName = e[0].label;
      this.queryPageParameters.stage = e[0].value;
    },
    // 查看中介报备成交详情
    viewDealDetail(code) {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/dealDetails?type=report&&code=${code}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.deal-list-wrapper {
  width: 100%;
  background-color: #f5f5f5;

  .top-wrapper {
    width: 100%;
    height: 92rpx;
    box-sizing: border-box;
    padding: 10rpx 24rpx 10rpx 18rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;

    .search {
      flex: 1;
      box-sizing: border-box;
      margin-right: 20rpx;
    }

    .filter-wrapper {
      color: $u-type-primary;
      font-size: 30rpx;
    }
  }

  .list-wrapper {
    width: 100%;
    height: calc(100vh - 95rpx);
    overflow-y: auto;
    background-color: #f5f5f5;

    .list-item {
      box-sizing: border-box;
      margin: 20rpx;
      padding: 20rpx;
      background-color: #ffffff;
      border: 1rpx solid #dadada;

      .item-code {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .code {
          flex: 1;
          font-weight: 600;
        }

        .detail {
          box-sizing: border-box;
          margin: 0rpx 10rpx;
          color: #999999;
        }
      }

      .item-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;

        .content-left {
          flex: 1;

          view {
            box-sizing: border-box;
            padding: 10rpx 0rpx 5rpx 0rpx;
          }
        }

        .content-right {
          display: flex;
          flex-direction: column;
          font-size: 26rpx;

          .right-top,
          .right-bottom {
            //flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;

            view {
              padding: 10rpx;
            }

            .border {
              color: #999999;
              border: 1rpx solid #999999;
              width: 120rpx;
              text-align: center;
            }
          }

          .right-top {
            .title {
              text-align: center;
              color: #ffffff;
              border: 1rpx solid #fe9400;
              background-color: #fe9400;
            }
          }

          .right-bottom {
            .title {
              text-align: center;
              color: #ffffff;
              border: 1rpx solid #4bd863;
              background-color: #4bd863;
            }
          }
        }
      }
    }
  }

  .empty-wrapper {
    width: 100%;
    height: calc(100vh - 95rpx);
  }
}

.project-case-wrapper {
  width: 100%;
  padding: 20rpx 30rpx;

  .add-btn-wrapper {
    width: 100%;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    view {
      height: 80rpx;
      line-height: 80rpx;
      flex: 1;
      text-align: center;
    }

    .left {
      color: #999999;
      background-color: #ffffff;
    }

    .right {
      color: #ffffff;
      background-color: $u-type-primary;
    }
  }
}
</style>