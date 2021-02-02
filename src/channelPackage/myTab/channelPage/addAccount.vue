<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 17:13:50
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-02 14:57:00
-->
<template>
  <view class="add-account-wrapper">
    <view class="form">
      <u-form :model="addForm" ref="addForm" :label-width="160">
        <u-form-item label="账户名称" prop="accountName">
          <u-input
            v-model="addForm.accountName"
            placeholder="账户名称"
            :clearable="true"
            input-align="left"
          />
        </u-form-item>
        <u-form-item
          prop="branchName"
          label="开户银行"
          right-icon="arrow-right"
          class="hide-icon"
        >
          <u-input
            @click="gotosearch()"
            v-model="addForm.branchName"
            type="select"
            placeholder="开户银行"
            disabled
            :clearable="true"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="银行卡号" prop="accountNo">
          <u-input
            v-model="addForm.accountNo"
            placeholder="银行卡号"
            :clearable="true"
            input-align="left"
            type="number"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="btn">
      <u-button type="primary" @click="handleSave">保存</u-button>
    </view>
  </view>
</template>

<script>
import storageTool from "../../../common/storageTool";
import tool from "../../../common/tool";
import {
  postChannelBankAddApi,
  postChannelBankEditApi,
  getChannelBankGetApi,
} from "../../../api/channel";
export default {
  data() {
    return {
      addForm: {
        accountName: null, //账户名称
        accountNo: "", //账户号码
        accountType: "Commonly",
        branchName: "", //开户银行
        branchNo: "", //联行号
        channelId: "", //渠道商ID
      },
      rules: {
        accountName: [
          {
            required: true,
            message: "请输入账户名称",
            trigger: ["change"],
          },
        ],

        branchName: [
          {
            required: true,
            message: "请输入开户银行",
            trigger: ["change"],
          },
        ],
        accountNo: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: ["change"],
          },
        ],
      },

      showBank: false,

      queryPageParameters: {
        bankName: null,
      },
    };
  },
  async onLoad(options) {
    let userInfo = storageTool.getUserInfo();
    console.log(options.id);
    this.addForm.channelId = userInfo?.channelId;
    if (options.id != "") {
      const res = await getChannelBankGetApi(options.id);
      console.log(res);
      Object.assign(this.addForm, res);
    } else {
      this.addForm.id = null;
    }
  },
  onReady() {
    this.$refs.addForm.setRules(this.rules);
  },
  onShow() {
    let item = getApp().globalData.searchBackData;
    console.log(item);
    if (item) {
      switch (item.type) {
        case "branch":
          this.addForm.branchNo = item.data.branchNo;
          this.addForm.branchName = item.data.branchName;
          // this.addForm.provinceName = item.data.provinceName;
          // this.addForm.cityName = item.data.cityName;
          break;
      }
    }
  },
  methods: {
    gotosearch() {
      getApp().globalData.searchParams = {
        api: "postBankBranchApi",
        key: "branchName",
        id: "branchNo",
        type: "branch",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 保存
    async handleSave() {
      console.log("handleSave");
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          console.log("验证通过");

          if (this.addForm.id) {
            const res = await postChannelBankEditApi(this.addForm);
            console.log(res);
            tool.toast("修改成功");
          } else {
            const res = await postChannelBankAddApi(this.addForm);
            console.log(res);
            tool.toast("新增成功");
          }
          uni.redirectTo({
            url: `/channelPackage/myTab/channelPage/commissionAccount`,
          });
        } else {
          console.log("验证失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-account-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;

  .form {
    background-color: #ffffff;
    padding: 20rpx;
  }

  .btn {
    width: 100%;
    padding: 10rpx 50rpx;
    margin-top: 20rpx;
  }
}

.add-bank-list-wrapper {
  width: 100%;

  .top-wrapper {
    width: 100%;
    height: 92rpx;
    box-sizing: border-box;
    padding: 10rpx 24rpx 10rpx 18rpx;
    display: flex;
    background-color: #efeff4;

    .search {
      flex: 1;
      height: 72rpx;
    }
  }

  .bank-item {
    padding: 30rpx 10rpx;
    text-align: left;
    border-bottom: 1rpx solid #cccccc;
  }
}
</style>