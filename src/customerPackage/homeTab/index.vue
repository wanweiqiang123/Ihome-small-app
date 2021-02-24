<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:45:38
-->
<template>
  <view>
    <CustomerTabBar>
      <view
        class="box"
        v-if="tablePage.length"
      >
        <u-card
          :border="false"
          v-for="(item, i) in tablePage"
          :key="i"
          class="ih-card"
          :show-head="false"
          :foot-border-top="false"
          :foot-style="{
            padding: '10rpx 30rpx'
          }"
        >
          <view slot="body">
            <view class="ih-card-content">
              <view>
                <view class="receipt-title">{{item.projectName | emptyFilter}}</view>
                <view>{{getDictName(item.propertyType, Property) | emptyFilter}} {{item.buyUnitName | emptyFilter}} {{item.roomNumberName | emptyFilter}}</view>
              </view>
              <view>{{item.explain | emptyFilter}}</view>
            </view>
          </view>
          <view
            class="ih-card-foot"
            slot="foot"
          >
            <view>
              <text
                v-if="item.notificationStatus === 'WaitBeSigned'"
                class="color-error"
              >您有协议待签署，请处理</text>
              <text
                v-else-if="item.notificationStatus === 'WaitDetermine'"
                class="color-primary"
              >信息待确认</text>
              <text
                v-else-if="item.notificationStatus === 'WaitPay'"
                class="color-error"
              >您还未完成付款</text>
              <text
                v-else-if="item.notificationStatus === 'Paid'"
                class="color-success"
              >付款完成，优惠确认中</text>
              <text
                v-else-if="item.notificationStatus === 'Invalidation'"
                class="color-error"
              >协议已终止，此优惠无效</text>
              <text
                v-else-if="item.notificationStatus === 'ReviewStatus'"
                class="color-error"
              >优惠告知书无效</text>
              <template v-else-if="item.notificationStatus === 'BecomeEffective'">
                <text
                  v-if="isHasNotification(item.supplementNoticeList)"
                  class="color-error"
                >您有协议待签署，请处理</text>
                <text
                  v-else
                  class="color-success"
                >付款完成，优惠已生效</text>
              </template>
            </view>
            <u-button
              class="home-button"
              throttle-time="500"
              shape="circle"
              type="primary"
              size="medium"
              @click="routerTo(item.noticeId)"
            >查看</u-button>
          </view>
        </u-card>
      </view>
      <view
        v-else
        style="height: 80vh;"
      >
        <u-empty
          text="暂无数据"
          mode="list"
        ></u-empty>
      </view>
    </CustomerTabBar>
  </view>
</template>

<script>
import pagination from "../../mixins/pagination";
import { postWechatNoticeListApi } from "../../api/customer";
import { getAllByTypeApi } from "../../api/index";
export default {
  name: "PageingSearch",
  mixins: [pagination],
  components: {},
  data() {
    return {
      show: false,
      Property: [],
    };
  },
  onLoad() {
    this.getListMixin();
  },
  async onShow() {
    this.Property = await this.getDictAll("Property");
  },
  methods: {
    async getListMixin() {
      this.setPageDataMixin(
        await postWechatNoticeListApi(this.queryPageParameters)
      );
    },
    routerTo(id) {
      uni.navigateTo({
        url: `/customerPackage/discountsInfo/index?id=${id}`,
      });
    },
    isHasNotification(val) {
      let isHasSign = val.some((v) => v.notificationStatus === "WaitBeSigned");
      if (isHasSign) return true;
      else return false;
    },
    // 字典翻译
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 字典匹配
    getDictName(code, list) {
      if (list.length) {
        const item = list.find((v) => v.code === code);
        return item?.name;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  overflow: hidden;
  min-height: 100vh;
  background-color: #f1f1f1;
}
.ih-card {
  &-content {
    display: flex;
    justify-content: space-between;
  }
  .receipt-title {
    font-weight: bold;
    font-size: 40rpx;
    margin-bottom: 10rpx;
  }
  &-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .color-success {
    color: $u-type-success;
  }
  .color-error {
    color: $u-type-error;
  }
  .color-primary {
    color: $u-type-primary;
  }
}
.home-button {
  /deep/ .u-btn {
    padding: 0 50rpx;
    height: 60rpx;
    line-height: 60rpx;
  }
}
</style>