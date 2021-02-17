<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 19:34:30
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-17 10:17:43
-->
<template>
  <view class="add-broker-wrapper">
    <view class="form">
      <u-form :model="addForm" ref="addForm" :label-width="160">
        <u-form-item label="姓名" prop="name">
          <u-input
            v-model="addForm.name"
            placeholder="姓名"
            :clearable="true"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="手机号" prop="mobile">
          <u-input
            v-model="addForm.mobile"
            placeholder="手机号"
            :clearable="true"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="邮箱" prop="email">
          <u-input
            v-model="addForm.email"
            placeholder="邮箱"
            :clearable="true"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="账号状态" class="u-text-right" prop="status">
          <u-switch v-model="addForm.statusBtn"></u-switch>
        </u-form-item>
        <u-form-item
          label="结佣权限"
          class="u-text-right"
          prop="settlementFlag"
        >
          <u-switch v-model="addForm.settlementFlagBtn"></u-switch>
        </u-form-item>
      </u-form>
    </view>
    <view class="btn">
      <u-button type="primary" @click="handleSave">保存</u-button>
    </view>
  </view>
</template>

<script>
import {
  postChannelAgentAddApi,
  postChannelAgentEditApi,
  getChannelAgentGetidApi,
} from "../../../api/channel";
import { phoneValidator, emailValidato } from "@/common/validate";
import tool from "../../../common/tool";
import storageTool from "../../../common/storageTool";
export default {
  data() {
    return {
      addForm: {
        channelId: 0,
        email: "",
        id: 0,
        mobile: "",
        name: "",
        settlementFlag: "",
        settlementFlagBtn: false,
        status: "",
        statusBtn: true,
        userId: 0,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: ["change"],
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: ["change"],
          },
          {
            validator: phoneValidator,
            trigger: ["blur"],
            message: "请输入正确格式手机号码",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["change"],
          },
          {
            validator: emailValidato,
            trigger: ["blur"],
            message: "请输入正确格式邮箱",
          },
        ],
      },
      checked: true,
    };
  },
  async onLoad(options) {
    console.log(options.id);
    if (options.id == "undefined") {
      this.addForm.id = "";
    } else {
      const res = await getChannelAgentGetidApi(options.id);
      if (res.settlementFlag == "Has") {
        res.settlementFlagBtn = true;
      } else {
        res.settlementFlagBtn = false;
      }
      if (res.status == "Valid") {
        res.statusBtn = true;
      } else {
        res.statusBtn = false;
      }
      Object.assign(this.addForm, res);
      console.log(this.addForm);
    }
  },
  onReady() {
    this.$refs.addForm.setRules(this.rules);
  },
  methods: {
    // 保存
    handleSave() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          console.log("验证通过");
          if (this.addForm.statusBtn) {
            this.addForm.status = "Valid";
          } else {
            this.addForm.status = "Invalid";
          }
          if (this.addForm.settlementFlagBtn) {
            this.addForm.settlementFlag = "Has";
          } else {
            this.addForm.settlementFlag = "No";
          }

          if (this.addForm.statusBtn) {
            this.addForm.status = "Valid";
          } else {
            this.addForm.status = "Invalid";
          }
          let userInfo = storageTool.getUserInfo();

          this.addForm.channelId = userInfo?.channelId;
          this.addForm.userId = userInfo.id;
          if (this.addForm.id > 0) {
            await postChannelAgentEditApi(this.addForm);
            tool.toast("编辑成功");
            uni.redirectTo({
              url: `/channelPackage/myTab/channelPage/brokerList`,
            });
          } else {
            await postChannelAgentAddApi(this.addForm);
            tool.toast("新增成功");
            uni.redirectTo({
              url: `/channelPackage/myTab/channelPage/brokerList`,
            });
          }
        } else {
          console.log("验证失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-broker-wrapper {
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
</style>