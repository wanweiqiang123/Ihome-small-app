<!--
 * @Description: 添加收款记录
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-19 18:44:57
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-22 11:32:28
-->
<template>
  <view class="receipt">
    <view class="receipt-form">
      <view class="form-title u-border-bottom">收款信息</view>
      <u-form
        :model="form"
        ref="uForm"
        label-width="170"
      >
        <u-form-item
          label="收款方式"
          class="hide-icon"
          right-icon="arrow-right"
          prop="payTypeName"
          required
        >
          <u-input
            v-model="form.payTypeName"
            type="select"
            placeholder="选择收款方式"
            @click="payeeShow = true"
          />
        </u-form-item>
        <template v-if="form.payType === 'PosNoOrder'">
          <u-form-item
            label="交易参考号"
            prop="orderNo"
            required
          >
            <u-input
              v-model="form.orderNo"
              placeholder="请输入参考号"
            />
            <u-button
              slot="right"
              type="success"
              size="mini"
              @click="getOrder()"
            >检查</u-button>
          </u-form-item>
          <u-form-item
            label="收款日期"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.payTime"
              type="select"
              placeholder="选择日期"
            />
          </u-form-item>
          <u-form-item label="收款金额">
            <u-input
              v-model="form.amount"
              :disabled="form.payType === 'PosNoOrder'"
              placeholder="请输入收款金额"
            />
          </u-form-item>
        </template>
        <template v-else-if="form.payType === 'Transfer'">
          <u-form-item
            label="收款金额"
            required
            prop="amount"
          >
            <u-input
              v-model="form.amount"
              placeholder="请输入收款金额"
              disabled
              @click="keyBoardShow = true"
            />
          </u-form-item>
          <u-form-item
            label="转账凭证"
            label-position="top"
            required
            prop="attachments"
          >
            <u-upload
              width="150"
              height="150"
              name="files"
              :action="action"
              :header="header"
              :show-progress="false"
              :before-upload="beforeUpload"
              @on-success="successChange"
              @on-remove="removeChange"
            ></u-upload>
          </u-form-item>
        </template>
      </u-form>
    </view>
    <u-button
      shape="circle"
      type="primary"
      @click="submit()"
    >提 交</u-button>
    <!-- 选择器 -->
    <!-- <u-picker
      mode="time"
      v-model="isShow"
      safe-area-inset-bottom
      title="收款日期"
      :show-time-tag="false"
      :params="{
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      }"
      @confirm="timeConfirm"
    ></u-picker> -->
    <u-select
      v-model="payeeShow"
      :list="payTypeList"
      safe-area-inset-bottom
      title="收款方式"
      value-name="code"
      label-name="name"
      @confirm="payeeConfirm"
    ></u-select>
    <!-- 数字键盘 -->
    <u-keyboard
      ref="uKeyboard"
      mode="number"
      v-model="keyBoardShow"
      :mask="false"
      @change="keyChange"
      safe-area-inset-bottom
      @backspace="backspace"
      :show-tips="false"
      :cancel-btn="false"
    ></u-keyboard>
  </view>
</template>

<script>
import { currentEnvConfig } from "../../env-config.js";
import storageTool from "../../common/storageTool.js";
import { getAllByTypeApi } from "../../api/index";
import {
  getNoOrderInfo,
  postAddPayServe,
  getBankInfoApi,
} from "../../api/staff";

export default {
  name: "receipt-add",
  data() {
    return {
      form: {
        orderNo: "",
        payTypeName: "",
        payType: "",
        payTime: "",
        attachments: [],
        amount: "",
      },
      rules: {
        orderNo: [
          {
            required: true,
            message: "请输入12位交易参考号",
            trigger: "change",
          },
          { max: 12, message: "长度不能超过12位", trigger: "change" },
          {
            pattern: /^[0-9a-zA-Z]*$/g,
            transform(value) {
              return String(value);
            },
            message: "只能输入数字或者字母",
            trigger: "change",
          },
        ],
        payTypeName: [
          {
            required: true,
            message: "请选择收款方式",
            trigger: "change",
          },
        ],
        amount: [
          {
            required: true,
            message: "请输入收款金额",
            trigger: "change",
          },
        ],
        // attachments: [
        //   {
        //     // required: true,
        //     message: "请上传转账凭证",
        //     trigger: "change",
        //   },
        // ],
      },
      action: `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/upload`,
      header: {
        Authorization: "bearer " + storageTool.getToken(),
      },
      // isShow: false,
      payTypeList: [],
      payeeShow: false,
      backInfo: {
        payeeAccount: "",
        payeeName: "",
      },
      keyBoardShow: false,
    };
  },
  methods: {
    // handleShowTime(bool) {
    //   if (!bool) {
    //     this.isShow = true;
    //   }
    // },
    // timeConfirm(val) {
    //   this.form.name = `${val.year}-${val.month}-${val.day}`;
    // },
    backspace() {
      if (this.form.amount.length) {
        this.form.amount = this.form.amount.substr(
          0,
          this.form.amount.length - 1
        );
      }
    },
    keyChange(e) {
      console.log(e);
      if (this.form.amount?.includes(".")) {
        if (e != ".") {
          let arr = this.form.amount.split(".");
          if (arr[1].length < 2) {
            this.form.amount += e;
          }
        }
      } else {
        this.form.amount += e;
      }
    },
    payeeConfirm(val) {
      let item = val[0];
      this.form.payTypeName = item.label;
      this.form.payType = item.value;
      Object.assign(this.form, {
        orderNo: "",
        payTime: "",
        attachments: [],
        amount: "",
      });
      if (item.value === "Transfer") {
        this.getBank();
      }
    },
    async getBank() {
      let cycleId = getApp().paidData.cycleId;
      let info = await getBankInfoApi(cycleId);
      this.backInfo = {
        payeeAccount: info.payeeAccount,
        payeeName: info.payeeName,
      };
    },
    async getOrder() {
      if (this.form.orderNo) {
        try {
          const info = await getNoOrderInfo({ orderNo: this.form.orderNo });
          Object.assign(this.form, info);
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$tool.toast("交易参考号不能为空");
      }
    },
    beforeUpload() {
      uni.showToast({
        icon: "loading",
        title: "正在上传...",
        duration: 500000000000,
      });
      return true;
    },
    successChange(data, index, lists, name) {
      this.form.attachments[index] = {
        fileId: lists[index].response.data[0].fileId,
        fileName:
          lists[index].response?.data[0].generateFileName +
          "." +
          lists[index].response?.data[0].generateFileType,
        type: "Evidence",
      };
    },
    removeChange(index, lists, name) {
      this.form.attachments.splice(index, 1);
    },
    submit() {
      const payData = { ...getApp().paidData };
      let params = {
        businessId: payData.businessId,
        businessCode: payData.businessCode,
        groupId: payData.groupId,
        operator: payData.agentId,
        proId: payData.projectId,
        roomId: payData.roomNumberId,
        serviceAmount: payData.paymentAmount,
        serviceFeePaid: payData.paid,
        termId: payData.cycleId,
        unpaidServiceFee: payData.unpaid,
        payer: "Customer",
        terminal: "WeChatApp",
      };
      // 假数据
      // params.groupId = 15;
      // params.operator = 15;
      // params.termId = 3;
      this.$refs.uForm.validate(async (val) => {
        if (val) {
          try {
            if (
              this.form.payType === "Transfer" &&
              !this.form.attachments.length
            ) {
              this.$tool.toast("请上传转账凭证");
              return;
            }
            let data =
              this.form.payType === "Transfer"
                ? { ...params, ...this.form, ...this.backInfo }
                : { ...params, ...this.form };
            await postAddPayServe(data);
            this.$tool.toast("提交成功");
            this.$tool.back(null, { type: "init", page: null });
          } catch (error) {
            console.log(error);
          }
        } else {
          return false;
        }
      });
    },
    async getDictName(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  async onLoad() {
    let list = await this.getDictName("PayType");
    this.payTypeList = list.filter((i) => i.tag.includes("Staff"));
  },
};
</script>

<style lang="scss" scoped>
.receipt {
  padding: 20rpx 30rpx 0;
}
.receipt-form {
  background: #fff;
  margin-bottom: 30rpx;
  .form-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92rpx;
    padding: 0 24rpx;
    color: $u-type-primary;
    font-family: "Source Han Sans CN";
  }
}
</style>
<style lang="scss">
page {
  background-color: $u-bg-color;
}
</style>
