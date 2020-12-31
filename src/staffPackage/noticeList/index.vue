<!--
 * @Description: 优惠告知书列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 15:54:19
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-30 18:40:26
-->
<template>
  <view class="notice safe-area-inset-bottom">
    <view class="item-container">
      <view
        class="notice-item"
        v-for="(i, n) in tablePage"
        :key="n"
        @click="handleGoConfirm(i)"
      >
        <view class="notice-info">
          <view class="notice-title">{{i.notificationType | filterNoticeDict(noticeTypes)}}{{`(${i.noticeNo})`}}</view>
          <view>{{`${i.projectName} ${i.buyUnitName}栋-${i.roomNumberName}`}}</view>
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
      v-model="isShow"
      @reset="handleReset()"
      @confirm="handleConfirm()"
    >
      <u-form
        ref="notice"
        label-position="top"
        :border-bottom="false"
      >
        <u-form-item
          label="项目名称"
          prop="name"
          :border-bottom="false"
        >
          <u-input
            v-model="form.name"
            border
          />
        </u-form-item>
        <u-form-item
          label="房号"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            border
          />
        </u-form-item>
        <u-form-item
          label="客户姓名"
          prop="intro"
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
          prop="intro"
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
  </view>
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
        ownerName: null,
        ownerMobile: null,
        noticeNo: null,
        notificationStatuses: [],
        notificationTypes: [],
      },
      noticeTypes: [],
      noticeStatus: [],
    };
  },
  filters: {
    filterNoticeDict(type, data) {
      const { name } = data.find((i) => i.code === type);
      return name;
    },
  },
  methods: {
    handleGoConfirm(item) {
      if (item.notificationStatus === "WaitDetermine") {
        uni.navigateTo({
          url: `/staffPackage/noticeConfirm/index?id=${item.id}`,
        });
      } else {
        console.log("其他");
      }
      // switch () {
      //   case "WaitDetermine":

      //     break;
      //   default:
      //     break;
      // }
    },
    handleGoCreate() {
      uni.navigateTo({
        url: "/staffPackage/noticeCreate/index",
      });
    },
    async handleConfirm() {
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
