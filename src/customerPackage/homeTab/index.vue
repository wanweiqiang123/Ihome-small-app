<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-12 17:44:23
-->
<template>
  <view :class="{ 'box-height': !info.length }">
    <CustomerTabBar v-if="info.length">
      <view class="box">
        <u-card
          :border="false"
          v-for="(item, i) in info"
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
                <view>{{`${getDictName(item.propertyType, Property)}-${item.buyUnitName}-${item.roomNumberName}`}}</view>
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
    </CustomerTabBar>
    <u-empty
      text="暂无数据"
      mode="list"
      v-else
      style="height: 80vh"
    ></u-empty>
  </view>
</template>

<script>
import { postWechatNoticeListApi } from "../../api/customer";
import { getAllByTypeApi } from "../../api/index";
import storageTool from "../../common/storageTool";
export default {
  name: "PageingSearch",
  components: {},
  data() {
    return {
      info: [],
      show: false,
      Property: [],
    };
  },
  onLoad() {
    this.getInfo();
  },
  async onShow() {
    this.Property = await this.getDictAll("Property");
  },
  methods: {
    async getInfo() {
      const userInfo = storageTool.getUserInfo();
      this.info = await postWechatNoticeListApi({
        ownerMobile: userInfo.mobilePhone,
      });
    },
    routerTo(id) {
      // uni.navigateTo({
      //   url: `/customerPackage/discountsInfo/index?id=${id}`,
      // });
      uni.navigateTo({
        url: `/customerPackage/paySuccess/index?id=${id}`,
      });
    },
    // 字典翻译
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 字典匹配
    getDictName(code, list) {
      if (list.length) {
        const { name } = list.find((v) => v.code === code);
        return name;
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
.box-height {
  height: 80vh;
}
</style>