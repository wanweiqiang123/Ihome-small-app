<!--
 * @Description: 优惠告知书列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 15:54:19
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-18 20:42:17
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
          @click="handleGoConfirm(i)"
        >
          <view class="notice-info">
            <view class="notice-title">{{i.notificationType | filterNoticeDict(noticeTypes)}}{{`(${i.noticeNo})`}}</view>
            <view v-if="i.buyUnitName && i.roomNumberName">{{`${i.projectName} ${i.buyUnitName}-${i.roomNumberName}`}}</view>
            <view v-else>{{`${i.projectName}`}}</view>
            <template v-for="(item, index) in i.ownerList">
              <view :key="index">{{item.ownerName || '-'}}</view>
            </template>
          </view>
          <view class="notice-identify">
            <text :class="['notice-color', {
            'success': i.notificationStatus == 'BecomeEffective',
            'primary': i.notificationStatus === 'WaitDetermine'
          }]">{{i.notificationStatus | filterNoticeDict(noticeStatus)}}</text>
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
      <view class="notice-btn safe-area-inset-bottom">
        <u-button
          shape="circle"
          type="primary"
          @click="handleGoCreate()"
        >生成优惠告知书</u-button>
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
        width="100%"
        :mask="false"
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
            label="栋座"
            :border-bottom="false"
          >
            <u-input
              v-model="queryPageParameters.unitName"
              placeholder="请选择栋座"
              :select-open="buildSelectShow"
              @click="handleShowBuild()"
              type="select"
              border
            />
          </u-form-item>
          <u-form-item
            label="房号"
            :border-bottom="false"
          >
            <u-input
              v-model="queryPageParameters.roomNo"
              :select-open="roomSelectShow"
              placeholder="请选择房号"
              @click="handleShowRoom()"
              type="select"
              border
            />
          </u-form-item>
          <u-form-item
            label="客户姓名"
            :border-bottom="false"
          >
            <u-input
              v-model="queryPageParameters.ownerName"
              placeholder="请输入客户姓名"
              border
            />
          </u-form-item>
          <u-form-item
            label="客户电话"
            :border-bottom="false"
          >
            <u-input
              v-model="queryPageParameters.ownerMobile"
              placeholder="请输入客户电话"
              border
            />
          </u-form-item>
          <u-form-item
            label="优惠告知书编号"
            :border-bottom="false"
          >
            <u-input
              v-model="queryPageParameters.noticeNo"
              placeholder="请输入优惠告知书编号"
              border
            />
          </u-form-item>
          <u-form-item
            label="优惠告知书类型"
            :border-bottom="false"
          >
            <IhCheckbox
              v-model="queryPageParameters.notificationTypes"
              :arr="noticeTypes"
              :alias="{name:'name',value:'code'}"
            ></IhCheckbox>
          </u-form-item>
          <u-form-item
            label="状态"
            :border-bottom="false"
          >
            <IhCheckbox
              v-model="queryPageParameters.notificationStatuses"
              :arr="noticeStatus"
              :alias="{name:'name',value:'code'}"
            ></IhCheckbox>
          </u-form-item>
        </u-form>
      </PopupSearch>
      <!-- 下拉框 -->
      <u-select
        v-model="buildSelectShow"
        :list="buildSelectList"
        safe-area-inset-bottom
        title="选择栋座"
        value-name="buildingId"
        label-name="buildingName"
        @confirm="buildConfirm"
      ></u-select>
      <u-select
        v-model="roomSelectShow"
        :list="roomSelectList"
        safe-area-inset-bottom
        title="选择房号"
        value-name="roomId"
        label-name="roomNo"
        @confirm="roomConfirm"
      ></u-select>
    </view>
  </LoginPage>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
import IhCheckbox from "../../components/IhCheckbox/index.vue";
import pagination from "../../mixins/pagination";
import { getAllByTypeApi } from "../../api/index";
import {
  postNoticeList,
  postBuildByProId,
  postRoomByProId,
} from "../../api/staff";

export default {
  name: "notice-list",
  components: {
    PopupSearch,
    IhCheckbox,
  },
  mixins: [pagination],
  data() {
    return {
      isShow: false,
      queryPageParameters: {
        proName: "",
        projectId: null,
        unitName: "",
        buyUnit: null,
        roomNo: "",
        roomNumberId: null,
        ownerName: null,
        ownerMobile: null,
        noticeNo: null,
        notificationStatuses: [],
        notificationTypes: [],
      },
      noticeTypes: [],
      noticeStatus: [],
      buildSelectShow: false,
      buildSelectList: [],
      roomSelectShow: false,
      roomSelectList: [],
    };
  },
  filters: {
    filterNoticeDict(type, data) {
      const item = data.find((i) => i.code === type);
      return item?.name;
    },
  },
  methods: {
    handleGoConfirm(item) {
      switch (item.notificationStatus) {
        case "WaitDetermine":
        case "WaitBeSigned":
          if (item.notificationType === "Notification") {
            uni.navigateTo({
              url: `/staffPackage/noticeCreate/index?id=${item.id}`,
            });
          } else {
            uni.navigateTo({
              url: `/staffPackage/noticePreview/index?id=${item.id}&tId=${item.templateId}&type=${item.notificationType}&sign=${item.notificationStatus}`,
            });
          }
          break;
        case "WaitPay":
          // 客户待支付
          break;
        case "WaitReview":
          // 分公司业管待审核
          uni.navigateTo({
            url: `/staffPackage/noticeConfirm/index?id=${item.id}`,
          });
          break;
        case "BecomeEffective":
          if (item.notificationType === "Notification") {
            // 优惠告知书
            uni.navigateTo({
              url: `/staffPackage/noticeInfo/index?id=${item.id}&tempType=${item.templateType}`,
            });
          } else {
            uni.navigateTo({
              url: `/staffPackage/noticePreview/index?id=${item.id}&tId=${item.templateId}&type=${item.notificationType}&sign=${item.notificationStatus}`,
            });
          }
          break;
        default:
          break;
      }
    },
    handleGoCreate() {
      uni.navigateTo({
        url: "/staffPackage/noticeCreate/index",
      });
    },
    handleToSearch() {
      getApp().globalData.searchParams = {
        api: "postProjectsApi",
        key: "proName",
        id: "proId",
        type: "project",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    buildConfirm(val) {
      let item = val[0];
      this.queryPageParameters.unitName = item.label;
      this.queryPageParameters.buyUnit = item.value;
      this.queryPageParameters.roomNumberId = null;
      this.queryPageParameters.roomNo = "";
    },
    async handleShowBuild() {
      if (!this.queryPageParameters.projectId) {
        this.$tool.toast("请先选择项目");
        return;
      }
      this.buildSelectList = await postBuildByProId({
        proId: this.queryPageParameters.projectId,
      });
      this.buildSelectShow = true;
    },
    roomConfirm(val) {
      let item = val[0];
      this.queryPageParameters.roomNumberId = item.value;
      this.queryPageParameters.roomNo = item.label;
    },
    async handleShowRoom() {
      if (!this.queryPageParameters.projectId) {
        this.$tool.toast("请先选择项目");
        return;
      }
      this.roomSelectList = await postRoomByProId({
        proId: this.queryPageParameters.projectId,
        buildingId: this.queryPageParameters.buyUnit,
      });
      this.roomSelectShow = true;
    },
    reset() {
      Object.assign(this.queryPageParameters, {
        proName: "",
        projectId: null,
        unitName: "",
        buyUnit: null,
        roomNo: "",
        roomNumberId: null,
        ownerName: null,
        ownerMobile: null,
        noticeNo: null,
        notificationStatuses: [],
        notificationTypes: [],
      });
    },
    async confirm() {
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.setPageDataMixin(await postNoticeList(this.queryPageParameters));
      // console.log(this.queryPageParameters);
    },
    async getListMixin() {
      this.setPageDataMixin(await postNoticeList(this.queryPageParameters));
    },
    async getDictName(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
  },
  async onLoad() {
    this.getListMixin();
    this.noticeTypes = await this.getDictName("NotificationType");
    this.noticeStatus = await this.getDictName("NotificationStatus");
  },
  onShow() {
    let item = getApp().globalData.searchBackData;
    if (item && item.type === "project") {
      this.queryPageParameters.projectId = item.data.proId;
      this.queryPageParameters.proName = item.data.proName;
    }
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
  padding: 20rpx 30rpx 116rpx;
  .notice-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 20rpx;
    background: #fff;
    .notice-info {
      color: #ccc;
      line-height: 50rpx;
      font-size: 26rpx;
      font-family: "Source Han Sans CN";
    }
    .notice-title {
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
    }
    .notice-identify {
      position: absolute;
      // z-index: 100;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
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
.notice-btn {
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
  z-index: 10;
}
</style>
