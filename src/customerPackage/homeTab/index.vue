<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-25 18:17:23
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
                <view class="receipt-title">{{item.projectName}}</view>
                <view>{{item.propertyType ? `${getDictName(item.propertyType, Property)}-${item.buyUnitName}-${item.roomNumberName}` : `${item.buyUnitName}-${item.roomNumberName}`}}</view>
              </view>
              <view>{{item.explain}}</view>
            </view>
          </view>
          <view
            class="ih-card-foot"
            slot="foot"
          >
            <view class="font-text">
              <text v-show="item.notificationStatus === 'WaitBeSigned'">您有一份协议待签署，请尽快处理</text>
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
      // uni.navigateTo({
      //   url: `/customerPackage/paySuccess/index?id=${id}`,
      // });
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
  .font-text {
    color: $u-type-error;
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