<!--
 * @Description: 购房优惠收款
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 14:10:55
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-19 19:16:23
-->
<template>
  <view class="receipt safe-area-inset-bottom">
    <view
      class="item-list"
      v-if="list.length"
    >
      <u-card
        :border="false"
        :show-head="false"
        :foot-border-top="false"
        padding="15"
        margin="20rpx 30rpx"
        :foot-style="{paddingTop: '0'}"
        class="ih-card"
        border-radius="4"
        v-for="(i, n) in list"
        :key="n"
      >
        <view
          slot="body"
          class="ih-card-content"
        >
          <view>
            <view class="receipt-title">{{i.projectName}}</view>
            <view v-if="i.buyUnitName && i.roomNumberName">{{i.propertyType | filterDict(property)}}-{{i.buyUnitName}}-{{i.roomNumberName}}</view>
            <view v-else>{{i.propertyType | filterDict(property)}}</view>
          </view>
          <view>{{i.explain}}</view>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <view class="font-text">
            <text v-show="i.notificationStatus === 'WaitBeSigned'">客户尚未完成付款</text>
          </view>
          <u-button
            size="mini"
            type="primary"
            shape="circle"
            :custom-style="{ padding: '0 40rpx' }"
            @click="handleGoto(i.noticeId)"
          >查看</u-button>
        </view>
      </u-card>
    </view>
    <view
      v-else
      style="height: 100vh"
    >
      <u-empty
        text="暂无数据"
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
    <!-- 筛选弹出层 -->
    <PopupSearch
      width="100%"
      :mask="false"
      v-model="isShow"
      @reset="reset()"
      @confirm="confirm()"
    >
      <u-form
        label-position="top"
        :border-bottom="false"
      >
        <u-form-item
          label="楼盘名称"
          :border-bottom="false"
        >
          <u-input
            v-model="form.proName"
            @click="handleToSearch()"
            placeholder="请选择楼盘名称"
            type="select"
            border
          />
        </u-form-item>
        <u-form-item
          label="栋座"
          :border-bottom="false"
        >
          <u-input
            v-model="form.unitName"
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
            v-model="form.roomNo"
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
            v-model="form.name"
            border
            placeholder="请输入客户姓名"
          />
        </u-form-item>
        <u-form-item
          label="客户电话"
          :border-bottom="false"
        >
          <u-input
            v-model="form.ownerMobile"
            border
            placeholder="请输入客户电话"
          />
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
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
import { getAllByTypeApi } from "../../api/index";
import {
  postWechatNotice,
  postBuildByProId,
  postRoomByProId,
} from "../../api/staff";

export default {
  name: "receipt",
  components: { PopupSearch },
  data() {
    return {
      isShow: false,
      form: {
        ownerMobile: "",
        proName: "",
        projectId: null,
        roomNo: "",
        roomNumberId: null,
        unitName: "",
        buyUnit: null,
      },
      list: [],
      property: [],
      buildSelectShow: false,
      buildSelectList: [],
      roomSelectShow: false,
      roomSelectList: [],
    };
  },
  filters: {
    filterDict(type, data) {
      const item = data.find((i) => i.code === type);
      return item ? item.name : "-";
    },
  },
  methods: {
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
    handleGoto(id) {
      uni.navigateTo({
        url: `/staffPackage/receiptInfo/index?id=${id}`,
      });
    },
    handleShowBuild() {
      if (!this.form.projectId) {
        this.$tool.toast("请先选择项目");
        return;
      }
      this.buildSelectShow = true;
    },
    async buildConfirm(val) {
      let item = val[0];
      this.form.unitName = item.label;
      this.form.buyUnit = item.value;
      this.form.roomNumberId = null;
      this.form.roomNo = "";
      this.roomSelectList = await postRoomByProId({
        proId: this.form.projectId,
        buildingId: this.form.buyUnit,
      });
    },
    handleShowRoom() {
      if (!this.form.projectId) {
        this.$tool.toast("请先选择项目");
        return;
      }
      this.roomSelectShow = true;
    },
    roomConfirm(val) {
      let item = val[0];
      this.form.roomNumberId = item.value;
      this.form.roomNo = item.label;
    },
    reset() {
      Object.assign(this.form, {
        ownerMobile: "",
        proName: "",
        projectId: null,
        roomNo: "",
        roomNumberId: null,
        unitName: "",
        buyUnit: null,
      });
    },
    confirm() {
      this.getList();
    },
    async getList() {
      this.list = await postWechatNotice(this.form);
    },
    async getDictName(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
  },
  async onLoad() {
    this.getList();
    this.property = await this.getDictName("Property");
  },
  async onShow() {
    let item = getApp().globalData.searchBackData;
    if (item && item.type === "project") {
      this.form.projectId = item.data.proId;
      this.form.proName = item.data.proName;
      this.buildSelectList = await postBuildByProId({
        proId: this.form.projectId,
      });
      getApp().globalData.searchBackData = {};
    }
  },
};
</script>

<style lang="scss" scoped>
.receipt {
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
}
.item-list {
  padding-top: 1rpx;
  padding-bottom: 6rpx;
}
.ih-card {
  &-content {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    font-size: 26rpx;
  }
  .receipt-title {
    font-weight: bold;
    font-size: 32rpx;
    margin-bottom: 16rpx;
  }
  &-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .font-text {
    color: $u-type-error;
  }
}
</style>
