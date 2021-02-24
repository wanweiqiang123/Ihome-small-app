<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-26 09:02:05
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:25:37
-->
<template>
  <view class="follow-up-wrapper">
    <view class="client-info">
      <view class="name u-padding-bottom-20">{{info.name | emptyFilter}}</view>
      <view>{{info.mobile | emptyFilter}}</view>
    </view>
    <view class="client-info u-margin-top-30 u-padding-bottom-20">
      <view class="name u-padding-bottom-20">跟进方式</view>
      <view>
        <u-subsection
          active-color="#ff9900"
          :list="followTypeList"
          :current="currentType"
          @change="changeType"
        ></u-subsection>
      </view>
    </view>
    <view class="client-info u-margin-top-30">
      <view class="name u-padding-bottom-20">跟进情况</view>
      <view>
        <u-input
          :clearable="false"
          v-model="describe"
          type="textarea"
          :border="true"
          :height="150"
          :auto-height="false"
        />
      </view>
    </view>
    <view class="bottom-btn">
      <u-button
        type="primary"
        @click="saveEnter"
      >保存</u-button>
    </view>
  </view>
</template>

<script>
import { getInfoByIdApi, postReportCustomerFollowupApi } from "@/api/channel";
export default {
  data() {
    return {
      followTypeList: [
        {
          name: "电联",
          code: "Tel",
        },
        {
          name: "约看",
          code: "Look",
        },
        {
          name: "面谈",
          code: "Interview",
        },
      ],
      currentType: 0,
      followId: "",
      info: {},
      type: "Tel",
    };
  },
  onLoad(option) {
    this.followId = option.id;
    if (this.followId) this.getInfo();
  },
  methods: {
    async getInfo() {
      this.info = await getInfoByIdApi(this.followId);
    },
    // 选择跟进方式
    changeType(index) {
      this.currentType = index;
      this.type = this.followTypeList[index].code;
    },
    // 保存
    async saveEnter() {
      if (this.describe) {
        let obj = {};
        obj.reportCustomerId = this.followId;
        obj.describe = this.describe;
        obj.type = this.type;
        await postReportCustomerFollowupApi(obj);
        this.$tool.toast("保存成功");
        uni.redirectTo({
          url: `/channelPackage/clientTab/pages/clientDetails?id=${this.followId}`,
        });
      } else {
        this.$tool.toast("请填写跟进情况");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.follow-up-wrapper {
  width: 100%;
  height: calc(100vh - 120rpx);
  box-sizing: border-box;
  background-color: #f5f5f5;

  .name {
    font-size: 38rpx;
    font-weight: 600;
  }

  .client-info,
  .follow-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx;
    background-color: #fcfcfc;
  }

  .bottom-btn {
    width: 100%;
    height: 100rpx;
    box-sizing: border-box;
    padding: 10rpx 50rpx;
    background-color: #ffffff;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    z-index: 9999;
  }
}
</style>