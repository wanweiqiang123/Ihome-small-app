<!--
 * @Description: 查询购房优惠码
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 17:10:39
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-31 16:42:54
-->
<template>
  <view class="notice">
    <view class="notice-select">
      <u-cell-group>
        <u-cell-item
          title="项目周期"
          :value="termName || '请选择项目周期'"
          :arrow="true"
          @click="handleToSearch()"
        ></u-cell-item>
      </u-cell-group>
    </view>
    <view class="notice-list">
      <u-card
        :border="false"
        :show-foot="false"
        class="ih-card"
        v-for="(i, n) in codeList"
        :key="n"
        @click="handleCode(i)"
      >
        <view
          slot="head"
          class="ih-card-head"
        >
          <view>{{`优惠套餐${n+1}`}}</view>
          <view class="sub-title">查看优惠二维码
            <u-icon name="arrow-right" />
          </view>
        </view>
        <view
          slot="body"
          class="ih-card-content"
        >
          <view>优惠方式说明：{{i.modeDescription}}</view>
          <view>需支付服务费：{{i.premiumReceived}}元</view>
        </view>
      </u-card>
    </view>
    <!-- 二维码弹出层 -->
    <u-popup
      v-model="isShow"
      mode="center"
      closeable
      width="600rpx"
      class="ih-popup"
    >
      <view>
        <view class="head">优惠二维码</view>
        <view class="code">
          <u-image
            width="100%"
            height="100%"
            :src="src"
          ></u-image>
        </view>
        <view class="btn">
          <u-button
            type="primary"
            :loading="loading"
            @click="downloadCode()"
          >下载二维码</u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { getMannerListByTermId } from "../../api/staff";
import { currentEnvConfig } from "../../env-config.js";

export default {
  name: "notice-code",
  data() {
    return {
      isShow: false,
      termId: null,
      termName: null,
      codeList: [],
      src: "",
      fileId: null,
      loading: false,
      codeUrl: `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/download/`,
    };
  },
  methods: {
    handleCode(item) {
      this.src = `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${item.preferentialAddr}`;
      this.fileId = item.preferentialAddr;
      this.isShow = true;
    },
    downloadCode() {
      this.loading = true;
      uni.downloadFile({
        url: `${this.codeUrl}${this.fileId}`,
        success: (res) => {
          let filePath = res.tempFilePath;
          console.log(filePath);
          uni.saveImageToPhotosAlbum({
            filePath: filePath,
            success: () => {
              this.$u.toast("保存成功");
              this.loading = false;
            },
          });
        },
      });
    },
    handleToSearch() {
      getApp().globalData.searchParams = {
        api: "postTermApi",
        key: "termName",
        id: "termId",
        type: "term",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    async getCodeList(id) {
      try {
        this.codeList = await getMannerListByTermId({ id });
      } catch (error) {
        console.log(error);
      }
    },
  },
  onShow() {
    let item = getApp().globalData.refreshListData;
    if (item && item.type === "term") {
      this.termId = item.data.termId;
      this.termName = item.data.termName;
      this.getCodeList(item.data.termId);
    }
  },
};
</script>

<style lang="scss" scoped>
.notice {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-select {
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  &-list {
    padding-top: 100rpx;
    padding-bottom: 6rpx;
    .sub-title {
      color: $u-type-info;
    }
  }
}
.ih-card {
  &-content {
    line-height: 40rpx;
  }
  &-head {
    display: flex;
    justify-content: space-between;
  }
}
.ih-popup {
  .head {
    padding-left: 30rpx;
    line-height: 90rpx;
  }
  .code {
    background: #f1f1f1;
    width: 100%;
    height: 500rpx;
    // margin: 0 auto 20rpx;
  }
  .btn {
    padding: 20rpx 30rpx;
  }
}
</style>
