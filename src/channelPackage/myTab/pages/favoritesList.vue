<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:38:31
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:37:21
-->
<template>
  <LoginPage>
    <view class="page">
      <view class="top">
        <u-input
          class="top-search"
          v-model="queryPageParameters.proName"
          type="text"
          :border="true"
          placeholder="项目名称"
          confirm-type="search"
          @confirm="search"
        />
        <view
          class="text-switch"
          @click="currentClick = !currentClick"
        >{{
          currentClick ? "完成" : "管理"
        }}</view>
      </view>
      <view class="wrap">
        <view
          class="wrap-item"
          v-for="(item, index) in tablePage"
          :key="index"
          @click="viewProjectDetail(item)"
        >
          <view class="wrap-item-left">
            <u-image
              width="160rpx"
              height="160rpx"
              :src="item.attachAddr"
            ></u-image>
          </view>
          <view class="wrap-item-right">
            <view class="wrap-item-right-name"> {{ item.proName | emptyFilter }} </view>
            <view class="wrap-item-right-phone wrap-item-right-block">
              {{ item.district  }}
            </view>
            <view
              class="wrap-item-right-time"
              style="color: #fd4918"
            >
              均价{{ item.averagePrice || "--" }}元/m²
            </view>
            <!-- <view class="wrap-item-right-time">
              <view class="wwrap-item-right-yong"> 佣 </view>
              {{ item.commissionRules || "" }}
            </view> -->
          </view>
          <view
            class="item-checked"
            v-show="currentClick"
          >
            <u-checkbox
              size="40rpx"
              v-model="item.checked"
              @change="checkboxChange"
            ></u-checkbox>
          </view>
        </view>
        <!-- <EmptyLoading :total="tableTotal"></EmptyLoading> -->
        <!-- <u-loadmore :status="loadingStatus" /> -->
      </view>
      <view
        class="bottom-btn"
        v-show="currentClick"
      >
        <u-button
          type="error"
          @click="deleteCheck()"
        >删除</u-button>
      </view>

      <u-modal
        v-model="showPopup"
        @confirm="handleSubmit"
        @cancel="showPopup = false"
        :show-confirm-button="true"
        :show-cancel-button="true"
        ref="uModal"
        content="是否确定删除？"
      ></u-modal>
    </view>
  </LoginPage>
</template>

<script>
import pagination from "../../../mixins/pagination";
import { testPageApi } from "../../../api/index";
import {
  postCollectAddOrUpdateApi,
  postCollectBatchUpdateApi,
  postCollectGetList,
} from "../../../api/channel";
import tool from "../../../common/tool";
export default {
  mixins: [pagination],
  data() {
    return {
      showPopup: false,
      checked: false,
      homeImg: require("@/channelPackage/common/img/house.jpg"),

      queryPageParameters: {
        proName: "",
      },
      currentClick: false,
    };
  },

  async created() {
    this.getListMixin();
  },

  onLoad(option) {
    console.log("onLoad");
    console.log(option);
  },
  onShow(option) {
    console.log("onShow");
  },

  methods: {
    async getListMixin() {
      this.setPageDataMixin(await postCollectGetList(this.queryPageParameters));
      this.tablePage.map((item) => {
		if (item.attachAddr) {
		  item.imgScr = tool.getFileUrl(item.attachAddr);
		} else {
		  item.imgScr = this.houseImg;
		}  
        item.checked = item.checked || false;
        return item;
      });
      console.log(this.tablePage);
    },
    async search() {
      console.log("search");
      this.tablePage = [];
      this.tableTotal = null;
      this.getListMixin();
    },
    checkboxChange(item) {
      console.log("checkboxChange", item);
      this.$forceUpdate();

      console.log(this.tablePage);
    },
    async handleSubmit() {
      let list = this.tablePage.filter((item) => {
        return item.checked;
      });
      console.log(list);
      if (list.length > 0) {
        let postData = {
          ids: list.map((item) => item.id),
          status: "Invalid",
        };
        console.log(postData);
        const res = await postCollectBatchUpdateApi(postData);
        tool.toast("删除成功");

        postData.ids.forEach((item) => {
          this.remove(item);
        });
        console.log(this.tablePage);
      }
    },
    async deleteCheck() {
      this.showPopup = true;
    },
    remove(id) {
      for (let index = 0; index < this.tablePage.length; index++) {
        const item = this.tablePage[index];
        if (item.id == id) {
          this.tablePage.splice(index, 1);
        }
      }
    },

    viewProjectDetail(item) {
      if (!this.currentClick) {
        uni.navigateTo({
          url: `/channelPackage/homeTab/pages/projectDetail?id=` + item.proId,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.top {
  padding: 20rpx 20rpx 0 20rpx;
  width: 100%;
  display: flex;
  background: #eee;
  height: 112rpx;
  position: fixed;
  top: 0px;
  z-index: 999;
}
.top-search {
  width: 100%;
  height: 72rpx;
  background: #fff;
}
.wrap {
  width: 100%;
  margin-top: 112rpx;
  margin-bottom: 100rpx;
}
.wrap-item {
  width: 100%;
  height: 202rpx;
  display: flex;
  border-bottom: 1px solid #eee;
}
.wrap-item-left {
  width: 160rpx;
  padding: 20rpx;
}
.wrap-item-right {
  padding: 0 20rpx;
  margin-left: 20rpx;
}
.wrap-item-right {
  flex: 1;
}
.wrap-item-right-name {
  font-weight: 600;
  line-height: 60rpx;
  font-size: 36rpx;
}
.wrap-item-right-block {
  background: #eeeeee;
  padding: 4rpx 10rpx;
  display: inline-block;
}
.wwrap-item-right-yong {
  background: #fc9c05;
  color: #fff;
  padding: 2rpx 8rpx;
  display: inline-block;
  margin-right: 10rpx;
}
.text-switch {
  width: 40px;
  margin-left: 10px;
  line-height: 40px;
}
.item-checked {
  margin-top: 80rpx;
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
</style>
