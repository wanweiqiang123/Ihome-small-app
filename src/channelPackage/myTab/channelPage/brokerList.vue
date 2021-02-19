<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:38:31
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-19 11:26:25
-->
<template>
  <LoginPage>
    <view class="page">
      <view class="top">
        <u-input
          class="top-search"
          v-model="queryPageParameters.nameOrMobile"
          type="text"
          :border="true"
          placeholder="经纪人 手机号码"
          confirm-type="search"
          @confirm="search"
        />
        <view class="text-switch">
          <text @click="searchPopup = !searchPopup"> 筛选</text>
          <text style="margin: 0 5px"> |</text>
          <text @click="currentClick = !currentClick">
            {{ currentClick ? "完成" : "管理" }}</text
          >
        </view>
      </view>
      <view class="wrap">
        <checkbox-group @change="changeCheck">
          <view
            class="wrap-item"
            v-for="(item, index) in tablePage"
            :key="index"
          >
            <view class="list-item">
              <view class="list-item-left">
                <checkbox
                  v-show="currentClick"
                  :value="item.id"
                  :checked="item.checked"
                  style="transform: scale(0.8)"
                />

                <text style="padding-right: 20rpx">{{ item.name }}</text>
                <text>{{ item.mobile }}</text>
              </view>
              <view class="list-item-right" v-show="!currentClick">
                <view v-if="item.status == 'Valid'" style="color: #4881f9">
                  <text>{{ item.settlementFlag | settlementFlagFilter }}</text>
                </view>
                <view style="color: red">
                  <text>{{ item.status | statusFilter }}</text>
                </view>
                <view style="margin-top: 40rpx" @click="addBroker(item)">
                  编辑
                </view>
              </view>
            </view>
          </view>
        </checkbox-group>
        <!-- <EmptyLoading :total="tableTotal"></EmptyLoading> -->
        <u-loadmore :status="loadingStatus" />
      </view>

      <view class="bottom-btn" v-show="!currentClick">
        <u-button type="primary" @click="addBroker()">添加经纪人</u-button>
      </view>
      <view class="bottom-btn" v-show="currentClick">
        <u-button type="error" @click="removeBatch()">删除</u-button>
      </view>

      <PopupSearch
        width="80%"
        :mask="true"
        v-model="searchPopup"
        @reset="reset()"
        @confirm="searchConfirm()"
      >
        <u-form ref="notice" label-position="top" :border-bottom="false">
          <u-form-item label="状态" :border-bottom="false">
            <IhRadio
              v-model="queryPageParameters.status"
              :arrData="statusList"
            ></IhRadio>
          </u-form-item>

          <u-form-item label="结佣权限" :border-bottom="false">
            <IhRadio
              v-model="queryPageParameters.settlementFlag"
              :arrData="settlementFlagList"
              @change="settlementFlagChange"
            ></IhRadio>
          </u-form-item>
        </u-form>
      </PopupSearch>
      <u-modal
        :show-confirm-button="true"
        :show-cancel-button="true"
        v-model="removeShow"
        @confirm="confirm"
        @cancel="removeShow = false"
        ref="uModal"
        content="是否删除数据？"
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
  postChannelAgentGetListApi,
  postChannelDeleteApi,
  postChannelBatchDeleteApi,
} from "../../../api/channel";
import tool from "../../../common/tool";
import PopupSearch from "../../../components/PopupSearch/index.vue";
import IhRadio from "../../../components/IhRadio/index.vue";
import IhCheckbox from "../../../components/IhCheckbox/index.vue";
import storageTool from "../../../common/storageTool";
export default {
  components: { PopupSearch, IhRadio, IhCheckbox },
  mixins: [pagination],
  filters: {
    statusFilter(type) {
      let r = "";
      if (type == "Valid") {
        r = "";
      } else if (type == "Invalid") {
        r = "停用";
      }
      return r;
    },
    settlementFlagFilter(type) {
      let r = "";
      if (type == "Has") {
        r = "允许发起结佣";
      } else if (type == "No") {
        r = "";
      }
      return r;
    },
  },
  data() {
    return {
      selectRemoveList: [],
      removeShow: false,
      statusList: [
        { name: "不限", code: "" },
        { name: "有效", code: "Valid" },
        { name: "无效", code: "Invalid" },
      ],
      settlementFlagList: [
        { name: "不限", code: "" },
        { name: "有", code: "Has" },
        { name: "无", code: "No" },
      ],

      searchPopup: false,
      showPopup: false,
      checked: false,
      homeImg: require("@/channelPackage/common/img/house.jpg"),

      queryPageParameters: {
        channelId: "",
        mobile: "",
        name: "",
        nameOrMobile: "",
        pageNum: 1,
        pageSize: 20,
        settlementFlag: "",
        status: "",
      },
      currentClick: false,
    };
  },

  async created() {},

  async onLoad(option) {
    let userInfo = storageTool.getUserInfo();

    this.queryPageParameters.channelId = userInfo.channelId;

    console.log("onLoad");
    console.log(option);
    this.getListMixin();
  },
  onShow(option) {
    console.log("onShow");
  },

  methods: {
    settlementFlagChange(item) {
      console.log(item);
    },
    reset() {
      Object.assign(this.queryPageParameters, {
        mobile: "",
        name: "",
        nameOrMobile: "",
        pageNum: 1,
        pageSize: 20,
        settlementFlag: "",
        status: "",
      });
    },

    async confirm() {
      if (this.selectRemoveList.length > 0) {
        let userInfo = storageTool.getUserInfo();
        let postData = {
          channelId: userInfo.channelId,
          ids: this.selectRemoveList,
        };
        console.log(postData);
        const res = await postChannelBatchDeleteApi(postData);
        tool.toast("删除成功");

        postData.ids.forEach((item) => {
          this.remove(item);
        });
        console.log(this.tablePage);
      } else {
        tool.toast("请选勾选需要删除的数据");
      }
    },
    async getListMixin() {
      this.setPageDataMixin(
        await postChannelAgentGetListApi(this.queryPageParameters)
      );
      this.tablePage.map((item) => {
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

    addBroker(item) {
      if (item) {
        uni.navigateTo({
          url: `/channelPackage/myTab/channelPage/addBroker?id=` + item.id,
        });
      } else {
        uni.navigateTo({
          url: `/channelPackage/myTab/channelPage/addBroker`,
        });
      }
    },
    async removeBatch() {
      if (this.selectRemoveList.length > 0) {
        this.removeShow = true;
      } else {
        tool.toast("请选勾选需要删除的数据");
      }
    },
    changeCheck(e) {
      this.selectRemoveList = e.detail.value;
    },
    async searchConfirm() {
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.getListMixin();
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
  height: 162rpx;
  display: flex;
  border-bottom: 1px solid #eee;
}

.text-switch {
  width: 100px;
  margin-left: 10px;
  line-height: 40px;
}
.item-checked {
  margin-top: 40rpx;
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
.list-item {
  display: flex;
  width: 100%;
  padding: 20rpx;
}
.list-item-left {
  flex: 1;
  margin-top: 40rpx;
}
.list-item-right {
  width: 220rpx;
  text-align: right;
}
</style>
