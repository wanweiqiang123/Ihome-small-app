<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 16:36:50
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-01 17:33:01
-->
<template>
  <view class="commission-account-list-wrapper">
    <view class="management" @click="currentType = !currentType">{{
      currentType ? "管理" : "完成"
    }}</view>
    <view
      :class="
        currentType
          ? 'account-list-wrapper'
          : 'account-list-wrapper list-height'
      "
    >
      <view
        :class="flag === true ? 'list-item list-checked' : 'list-item'"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="left" v-if="!currentType">
          <u-checkbox
            v-model="item.checked"
            shape="circle"
            size="30rpx"
            @change="checkboxChange"
          ></u-checkbox>
        </view>
        <view class="right">
          <view>账户名称：{{ item.accountName }}</view>
          <view>开户银行：{{ item.branchName }}</view>
          <view>银行卡号：{{ item.accountNo }}</view>
          <view class="edit" v-if="currentType" @click="handleAdd(item)">
            <u-icon name="edit-pen" color="#66B1FF" size="28"></u-icon>编辑
          </view>
        </view>
      </view>
      <view class="add-wrapper" v-if="currentType" @click="handleAdd">
        <u-icon name="plus" size="46"></u-icon>
        <view class="add">新增账号</view>
      </view>
    </view>
    <view class="btn" v-if="!currentType">
      <u-button type="error" @click="deleteCheck()">删除</u-button>
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
</template>

<script>
import storageTool from "../../../common/storageTool";
import {
  getchannelBankByIdApi,
  postChannelBankBatchDeleteApi,
} from "../../../api/channel";
import tool from "../../../common/tool";
export default {
  data() {
    return {
      list: [],
      showPopup: false,
      currentType: true,
      flag: true,
    };
  },
  onLoad() {},
  async created() {
    let userInfo = storageTool.getUserInfo();
    console.log(userInfo);
    this.list = (await getchannelBankByIdApi(userInfo?.channelId)) || [];
    this.list.map((item) => {
      item.checked = item.checked || false;
    });
    console.log(this.list);
  },
  methods: {
    checkboxChange(item) {
      console.log("checkboxChange");
      this.$forceUpdate();
    },
    deleteCheck() {
      this.showPopup = true;
    },
    async handleSubmit() {
      let list = this.list.filter((item) => {
        return item.checked;
      });
      if (list.length > 0) {
        let userInfo = storageTool.getUserInfo();
        let p = {
          channelId: userInfo.channelId,
          ids: list.map((item) => item.id),
        };
        await postChannelBankBatchDeleteApi();
        tool.toast("删除成功");
        console.log(p);
        p.ids.forEach((item) => {
          this.remove(item);
        });
      }
    },
    remove(id) {
      for (let index = 0; index < this.list.length; index++) {
        const item = this.list[index];
        if (item.id == id) {
          this.list.splice(index, 1);
        }
      }
    },
    handleAdd(item) {
      console.log(item);
      uni.navigateTo({
        url:
          `/channelPackage/myTab/channelPage/addAccount?id=` + (item?.id || ""),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.commission-account-list-wrapper {
  width: 100%;
  background-color: #f5f5f5;

  .management {
    width: 100%;
    padding: 20rpx 20rpx;
    text-align: right;
    background-color: #ffffff;
  }

  .account-list-wrapper {
    width: 100%;
    padding: 20rpx;

    .list-item {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1rpx solid #429fff;
      border-radius: 20rpx;
      padding: 20rpx 20rpx;
      margin-bottom: 20rpx;
      background-color: #ffffff;

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        view {
          flex: 1;
          padding: 10rpx 0rpx;
          color: #666666;
        }

        .edit {
          font-size: 28rpx;
          text-align: right;
          color: #66b1ff;
        }
      }
    }

    .list-checked {
      border-color: #fb6260;
    }

    .add-wrapper {
      width: 100%;
      height: 240rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 2rpx dashed #e4e4e4;
      border-radius: 20rpx;
      margin-top: 20rpx;
      background-color: #f5f5f5;

      .add {
        font-size: 38rpx;
        font-weight: 600;
        color: #666666;
        margin-top: 10rpx;
      }
    }
  }

  .list-height {
    height: calc(100vh - 160rpx);
  }

  .btn {
    width: 100%;
    height: 90rpx;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    padding: 0rpx 50rpx;
  }
}
</style>