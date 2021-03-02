<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-26 10:15:18
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:35:26
-->
<template>
  <view class="commission-wrapper">
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
        placeholder="请输入结佣单号搜索"
        v-model="keyword"
        @search="confirm"
      ></u-search>
      <view
        class="filter-wrapper"
        @click="showSearchWin = true"
      >筛选</view>
    </view>
    <view
      class="list-wrapper"
      v-if="tablePage.length"
    >
      <view
        class="list-item"
        v-for="(item, index) in tablePage"
        :key="index"
        @click="viewCommissionDetails(item)"
      >
        <view class="item-code u-padding-bottom-20">
          <view class="code">结佣申请单号：{{item.applyCode | emptyFilter}}</view>
          <view
            class="status bg-red"
            v-if="item.rejectionMark === 'Yes'"
          >驳回</view>
          <view
            class="status"
            v-else-if="['Unconfirm', 'PlatformClerkUnreview', 'BranchBusinessManageUnreview', 'BranchFinanceUnreview', 'OAReviewing'].includes(item.status)"
          >审核中</view>
          <view
            class="status bg-success"
            v-else-if="item.status === 'ReviewPass'"
          >终审通过</view>
          <view
            class="status bg-success"
            v-else-if="item.status === 'ConfirmingPay'"
          >支付确认中</view>
          <view
            class="status bg-success"
            v-else-if="item.status === 'PaymentSuccessful'"
          >支付成功</view>
        </view>
        <view class="price u-padding-bottom-10">申请佣金：{{item.applyAmount | emptyFilter}}</view>
        <view class="price u-padding-bottom-10">扣除金额：{{item.deductAmount | emptyFilter}}</view>
        <view class="price u-padding-bottom-10">实结佣金：{{item.actualAmount | emptyFilter}}</view>
        <view class="price u-padding-bottom-10">申请时间：{{item.makerTime | emptyFilter}}</view>
        <view class="detail u-padding-bottom-10">
          <text>详情</text>
          <u-icon
            name="arrow-right"
            size="28"
          ></u-icon>
        </view>
      </view>
    </view>
    <view
      v-else
      class="list-wrapper"
    >
      <u-empty
        text="列表为空"
        mode="list"
      ></u-empty>
    </view>
    <view class="bottom-btn safe-area-inset-bottom">
      <u-button
        type="primary"
        @click="sponsorCommission"
      >发起结佣申请</u-button>
    </view>
    <PopupSearch
      v-model="showSearchWin"
      @reset="reset()"
      @confirm="confirm()"
    >
      <u-form
        label-position="top"
        :border-bottom="false"
      >
        <u-form-item
          label="状态"
          :border-bottom="false"
        >
          <IhCheckbox
            v-model="queryPageParameters.appletsChannelInquiryList"
            :arr="searchList"
            :alias="{ name: 'name', value: 'code' }"
          ></IhCheckbox>
        </u-form-item>
      </u-form>
    </PopupSearch>
  </view>
</template>

<script>
import PopupSearch from "../../../components/PopupSearch/index.vue";
import IhCheckbox from "../../../components/IhCheckbox/index";
import pagination from "../../../mixins/pagination";
import { getAllByTypeApi } from "../../../api/index";
import { payApplyList } from "../../../api/channel";

export default {
  components: {
    PopupSearch,
    IhCheckbox,
  },
  mixins: [pagination],
  data() {
    return {
      keyword: "",
      queryPageParameters: {
        appletsChannelInquiryList: [],
      },
      showSearchWin: false,
      searchList: [],
    };
  },
  methods: {
    // 发起结佣申请
    sponsorCommission() {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/initiateCommission`,
      });
    },
    // 结佣详情
    viewCommissionDetails(item) {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/commissionDetails?id=${item.id}`,
      });
    },
    checkText() {},
    reset() {
      Object.assign(this.queryPageParameters, {
        appletsChannelInquiryList: [],
      });
    },
    confirm() {
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.getListMixin();
    },
    async getDictName(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    async getListMixin() {
      this.setPageDataMixin(
        await payApplyList({
          ...this.queryPageParameters,
          applyCode: this.keyword,
        })
      );
    },
  },
  async onLoad() {
    this.getListMixin();
    this.searchList = await this.getDictName("AppletsChannelInquiry");
  },
};
</script>

<style lang="scss" scoped>
.commission-wrapper {
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
    background-color: #f1f1f1;

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
    height: calc(100vh - 230rpx);
    overflow-y: auto;
    background-color: #f1f1f1;

    .list-item {
      box-sizing: border-box;
      margin: 10rpx 20rpx 20rpx 20rpx;
      padding: 20rpx;
      background-color: #ffffff;
      //border: 1rpx solid #DADADA;

      .item-code {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .code {
          flex: 1;
          font-family: PingFang SC;
          font-weight: 600;
          color: #1f1f1f;
          line-height: 48rpx;
        }

        .status {
          width: 91rpx;
          background: #eb7734;
          border-radius: 4rpx;
          font-family: PingFang SC;
          font-size: 24rpx;
          font-weight: 600;
          color: #ffffff;
          line-height: 46rpx;
          text-align: center;
          &.bg-red {
            background: $u-type-error;
          }
          &.bg-success {
            background: $u-type-success;
          }
        }
      }

      .detail {
        width: 100%;
        text-align: right;
        box-sizing: border-box;
        margin-right: 20rpx;
        font-size: 26rpx;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #888888;
        line-height: 42rpx;
        display: flex;
        flex-direction: row;

        text {
          flex: 1;
        }
      }

      .price {
        font-size: 26rpx;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #606266;
        line-height: 42rpx;
      }
    }
  }

  .bottom-btn {
    height: 90rpx;
    box-sizing: content-box;
    padding-top: 10rpx;
    padding-left: 50rpx;
    padding-right: 50rpx;
    background-color: #ffffff;
    position: fixed;
    left: 0rpx;
    right: 0;
    bottom: 0rpx;
    z-index: 9999;
  }
}

.commission-popup-wrapper {
  width: 100%;
  height: 100vh;
  position: relative;

  .status {
    color: #999999;
  }

  .search-item-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .item {
      text-align: center;
      box-sizing: border-box;
      margin-right: 10rpx;
      padding: 15rpx 25rpx;
      background-color: #ffffff;
      border: 1rpx solid #f2f2f2;
    }

    .selected {
      border: 1rpx solid $u-type-primary;
      color: $u-type-primary;
    }
  }

  .btn-wrapper {
    width: 100%;
    position: absolute;
    left: 0rpx;
    bottom: 0rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    view {
      flex: 1;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
    }

    .reset {
      border-top: 1rpx solid #e4e4e4;
      background-color: #ffffff;
      color: $u-type-primary;
    }

    .submit {
      background-color: $u-type-primary;
      color: #ffffff;
    }
  }
}
</style>