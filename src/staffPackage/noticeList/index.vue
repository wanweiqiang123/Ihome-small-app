<!--
 * @Description: 优惠告知书列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 15:54:19
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-16 15:34:49
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
            <text
              class="notice-title"
              :user-select="true"
            >{{i.notificationType | filterNoticeDict(noticeTypes)}}{{`(${i.noticeNo})`}}</text>
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
        width="90%"
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
            label="栋座"
            :border-bottom="false"
          >
            <u-input
              v-model="queryPageParameters.unitName"
              placeholder="请选择栋座"
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
            label="业管审核状态"
            :border-bottom="false"
          >
            <u-input
              v-model="queryPageParameters.reviewText"
              :select-open="reviewSelShow"
              placeholder="请选择"
              @click="reviewSelShow = true"
              type="select"
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
        v-model="reviewSelShow"
        :list="noticeReview"
        safe-area-inset-bottom
        title="业管审核状态"
        value-name="code"
        label-name="name"
        @confirm="reviewConfirm"
      ></u-select>
    </view>
  </LoginPage>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
import IhCheckbox from "../../components/IhCheckbox/index.vue";
import pagination from "../../mixins/pagination";
import { getAllByTypeApi } from "../../api/index";
import { postNoticeList } from "../../api/staff";

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
        reviewStatus: "",
        reviewText: "",
      },
      noticeTypes: [],
      noticeStatus: [],
      reviewSelShow: false,
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
        default:
          if (item.notificationType === "Notification") {
            // 优惠告知书
            uni.navigateTo({
              url: `/staffPackage/noticeInfo/index?id=${item.id}`,
            });
          } else {
            let url = this.$tool.getFileUrl(item.templateId);
            // getApp().globalData.webViewSrc = url;
            // uni.navigateTo({
            //   url: `/customerPackage/webView/index`,
            // });
            uni.downloadFile({
              url: url,
              success: function (res) {
                var filePath = res.tempFilePath;
                uni.openDocument({
                  filePath: filePath,
                  fileType: "pdf",
                  showMenu: true,
                  success: function (res) {
                    console.log("打开文档成功");
                  },
                });
              },
            });
          }
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
        searchTip: "输入项目",
        api: "postProjectsApi",
        key: "proName",
        id: "proId",
        type: "project",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    projectConfirm(item) {
      this.queryPageParameters.projectId = item.proId;
      this.queryPageParameters.proName = item.proName;
      this.queryPageParameters.unitName = "";
      this.queryPageParameters.buyUnit = null;
      this.queryPageParameters.roomNumberId = null;
      this.queryPageParameters.roomNo = "";
    },
    reviewConfirm(val) {
      let item = val[0];
      this.queryPageParameters.reviewText = item.label;
      this.queryPageParameters.reviewStatus = item.value;
    },
    buildConfirm(val) {
      this.queryPageParameters.unitName = val.buildingName;
      this.queryPageParameters.buyUnit = val.buildingId;
      this.queryPageParameters.roomNumberId = null;
      this.queryPageParameters.roomNo = "";
    },
    handleShowBuild() {
      if (!this.queryPageParameters.projectId) {
        this.$tool.toast("请先选择项目");
        return;
      }
      getApp().globalData.searchParams = {
        searchTip: "输入栋座",
        api: "postBuildByProId",
        key: "buildingName",
        id: "buildingId",
        type: "building",
        other: {
          proId: this.queryPageParameters.projectId,
        },
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    roomConfirm(item) {
      this.queryPageParameters.roomNumberId = item.roomId;
      this.queryPageParameters.roomNo = item.roomNo;
    },
    handleShowRoom() {
      if (
        !this.queryPageParameters.projectId ||
        !this.queryPageParameters.buyUnit
      ) {
        this.$tool.toast("请先选择项目, 栋座");
        return;
      }
      getApp().globalData.searchParams = {
        searchTip: "输入房号",
        api: "postRoomByProId",
        key: "roomNo",
        id: "roomId",
        type: "roomNo",
        other: {
          proId: this.queryPageParameters.projectId,
          buildingId: this.queryPageParameters.buyUnit,
        },
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
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
    this.noticeReview = await this.getDictName("ReviewStatus");
  },
  async onShow() {
    let item = getApp().globalData.searchBackData;
    if (item && item.type === "project") {
      this.projectConfirm(item.data);
      getApp().globalData.searchBackData = {};
    }
    if (item && item.type === "building") {
      this.buildConfirm(item.data);
      getApp().globalData.searchBackData = {};
    }
    if (item && item.type === "roomNo") {
      this.roomConfirm(item.data);
      getApp().globalData.searchBackData = {};
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
