<!--
 * @Description: 特殊的审核优惠告知书
 * @version: 
 * @Author: ywl
 * @Date: 2021-02-06 10:22:41
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-06 16:39:55
-->
<template>
  <LoginPage>
    <view class="notice safe-area-inset-bottom">
      <view
        class="item-container"
        v-if="tablePage.length"
      >
        <view
          class="notice-item"
          v-for="(i, n) in tablePage"
          :key="n"
          @click="handleGo(i)"
        >
          <view class="notice-info">
            <text
              class="notice-title"
              :user-select="true"
            >优惠告知书{{`(${i.noticeNo})`}}</text>
            <view
              v-if="i.buyUnitName && i.roomNumberName"
              class="notice-text"
            >{{`${i.projectName} ${i.buyUnitName}-${i.roomNumberName}`}}</view>
            <view
              v-else
              class="notice-text"
            >{{`${i.projectName}`}}</view>
            <template v-for="(item, index) in i.ownerList">
              <view :key="index">{{item.ownerName || '-'}}</view>
            </template>
          </view>
          <view class="notice-identify">
            <text :class="['notice-color', {
            'success': i.reviewStatus == 'Audited',
          }]">{{i.reviewStatus | filterNoticeDict(noticeReview)}}</text>
            <u-icon
              name="arrow-right"
              color="#888"
            ></u-icon>
          </view>
        </view>
      </view>
      <view
        v-else
        style="height: 100vh"
      >
        <u-empty
          text="列表为空"
          mode="list"
        ></u-empty>
      </view>
      <!-- 筛选按钮 -->
      <view
        class="fliter"
        @click="isShow = true"
      >
        <view>筛选</view>
      </view>
      <!-- 筛选弹出 -->
      <PopupSearch
        width="85%"
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
            label="优惠告知书状态"
            :border-bottom="false"
          >
            <IhRadio
              v-model="queryPageParameters.notificationStatus"
              :arrData="noticeStatus"
            ></IhRadio>
          </u-form-item>
          <u-form-item
            label="审核状态"
            :border-bottom="false"
          >
            <IhRadio
              v-model="queryPageParameters.reviewStatus"
              :arrData="noticeReview"
            ></IhRadio>
          </u-form-item>
        </u-form>
      </PopupSearch>
    </view>
  </LoginPage>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
import IhRadio from "../../components/IhRadio/index";
import pagination from "../../mixins/pagination";
import { getAllByTypeApi } from "../../api/index";
import { postNoticeListByPending } from "../../api/staff";

export default {
  name: "notice-special",
  components: {
    PopupSearch,
    IhRadio,
  },
  mixins: [pagination],
  data() {
    return {
      isShow: false,
      queryPageParameters: {
        notificationStatus: null,
        reviewStatus: null,
      },
      noticeStatus: [],
      noticeReview: [],
    };
  },
  filters: {
    filterNoticeDict(type, data) {
      const item = data.find((i) => i.code === type);
      return item?.name || "";
    },
  },
  methods: {
    handleGo(item) {
      if (item.reviewStatus === "Pending") {
        uni.navigateTo({
          url: `/staffPackage/noticeConfirm/index?id=${item.id}`,
        });
      }
    },
    reset() {
      Object.assign(this.queryPageParameters, {
        notificationStatus: null,
        reviewStatus: null,
      });
    },
    async confirm() {
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.setPageDataMixin(
        await postNoticeListByPending(this.queryPageParameters)
      );
    },
    async getListMixin() {
      this.setPageDataMixin(
        await postNoticeListByPending(this.queryPageParameters)
      );
    },
    async getDictName(type, isAll) {
      let dictList = await getAllByTypeApi({ type });
      if (isAll) {
        dictList.unshift({ name: "全部", code: null });
      }
      return dictList;
    },
  },
  async onLoad() {
    this.getListMixin();
    let statusList = await this.getDictName("NotificationStatus", true);
    this.noticeStatus = statusList.filter((i) => i !== "BecomeEffective");
    this.noticeReview = await this.getDictName("ReviewStatus", true);
  },
};
</script>

<style lang="scss" scoped>
.notice {
  background: $u-bg-color;
  min-height: 100vh;
}
.fliter {
  position: fixed;
  top: 20rpx;
  right: 0;
  z-index: 100;
  color: #fff;
  background: #f6d45b;
  width: 150rpx;
  line-height: 71rpx;
  border-radius: 50rpx 0 0 50rpx;
  padding: 0 44rpx 0 47rpx;
  font-size: 30rpx;
  // .fliter-btn {
  //   padding: 20rpx 30rpx;
  // }
}
.item-container {
  padding: 20rpx 30rpx 10rpx;
  .notice-item {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    position: relative;
    padding: 20rpx;
    background: #fff;
    .notice-text {
      padding-bottom: 20rpx;
      word-break: break-word;
    }
    .notice-info {
      color: #606265;
      font-size: 26rpx;
      font-family: "Source Han Sans CN";
    }
    .notice-title {
      display: block;
      padding-bottom: 20rpx;
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
    }
    .notice-identify {
      margin-top: 20rpx;
      padding-top: 20rpx;
      font-size: 24rpx;
      text-align: right;
      border-top: 1px solid $u-border-color;
      // position: absolute;
      // z-index: 100;
      // right: 20rpx;
      // top: 50%;
      // transform: translateY(-50%);
    }
    .notice-color {
      color: #f91c11;
      &.primary {
        color: #0099ff;
      }
      &.success {
        color: #18b566;
      }
    }
  }
  .notice-item + .notice-item {
    margin-top: 20rpx;
  }
}
</style>
