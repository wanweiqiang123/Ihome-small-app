<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-24 10:45:20
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-09 17:09:29
-->
<template>
  <LoginPage>
    <view class="pay safe-area-inset-bottom">
      <view class="pay-title margin-top">付款信息</view>
      <view class="pay-msg margin-top">
        <view class="pay-item">
          <u-field
            label-width="150"
            v-model="payData.paymentAmount"
            label="应付服务费"
            disabled
          ></u-field>
          <u-field
            label-width="150"
            v-model="payData.paid"
            label="已付服务费"
            disabled
          ></u-field>
          <u-field
            label-width="150"
            v-model="payData.unpaid"
            label="未付服务费"
            disabled
          ></u-field>
          <u-field
            label-width="150"
            v-model="payNum"
            label="付款金额"
            :clearable="false"
            placeholder="请输入付款金额"
            focus
            type="number"
          ></u-field>
        </view>
      </view>

      <view
        class="pay-title"
        v-if="!hidePayStatus"
      >付款方式</view>
      <view
        class="pay-msg margin-top"
        v-if="!hidePayStatus"
      >
        <u-radio-group v-model="payType">
          <view
            class="pay-type"
            v-for="(item, i) in payTypeOptions"
            :key="i"
          >
            <view class="pay-type-image">
              <u-image
                height="60rpx"
                width="60rpx"
                :src="require(`../common/img/${item.code}.png`)"
              ></u-image>
              <text class="pay-type-name">{{ item.name | emptyFilter }}</text>
            </view>
            <u-radio
              active-color="#18B566"
              class="pay-type-radio"
              :name="item.code"
              @change="radioChange"
            ></u-radio>
          </view>
        </u-radio-group>
      </view>
      <view
        class="my-btn"
        v-if="!hidePayStatus"
      >
        <u-button
          shape="square"
          @click="payGoto"
          :loading="buttonLoading"
        >{{
            `${getDictName(payType, payTypeOptions)} ￥${payNum ? payNum : 0}`
          }}
        </u-button>
      </view>
      <view
        class="pay-hint"
        v-if="!hidePayStatus"
      >
        付款成功后可能存在延迟，请耐心等待1~2分钟！
        如付款成功后长时间还未更新记录请及时联系工作人员。
      </view>
      <view
        class="my-btn"
        v-if="hidePayStatus"
      >
        <u-button
          shape="square"
          @click="goBack"
        > 返回 </u-button>
      </view>

      <u-keyboard
        ref="uKeyboard"
        mode="number"
        v-model="show"
        :mask="false"
        @change="keyChange"
        safe-area-inset-bottom
        @backspace="backspace"
        :show-tips="false"
        :cancel-btn="false"
      ></u-keyboard>
      <BankTransfer v-model="bankTransferShow"></BankTransfer>
      <POS
        v-model="POSShow"
        :payId="posId"
      ></POS>
      <Linkto
        v-model="linktoShow"
        :payId="linktoId"
        :payType="linktoType"
      ></Linkto>
    </view>
  </LoginPage>
</template>
<script>
import {
  postAddServiceApi,
  postUnionPayParameterApi,
  postUnionPayUrlApi,
  getWeChatJsApi,
  getUnpaidOrderOrAmountPaidApi,
  postPaymentupdateApi,
  getBusinessIdApi,
  postWechatNoticeListApi,
} from "../../api/customer";
import { getAllByTypeApi } from "../../api/index";
// import { tool } from "../../common/tool";
import BankTransfer from "./bankTransfer.vue";
import POS from "./POS.vue";
import Linkto from "./linkto.vue";
export default {
  components: { BankTransfer, POS, Linkto },
  data() {
    return {
      hidePayStatus: true,
      payData: {},
      payType: "Pos",
      payNum: 0,
      payTypeOptions: [],
      payParam: {},
      show: false,
      open: true,
      buttonLoading: false,
      bankTransferShow: false,
      POSShow: false,
      posId: "",
      linktoType: "",
      linktoId: "",
      linktoShow: false,
    };
  },
  watch: {
    payNum(v) {
      // if (Number(v) > Number(this.payData.unpaid)) {
      //   this.payNum = this.payData.unpaid + "";
      // }
    },
  },
  async onLoad() {
    this.payData = { ...getApp().paidData };
    console.log(this.payData);
  },
  async onShow() {
    this.hidePayStatus = this.$storageTool.hidePay();
    const userInfo = this.$storageTool.getUserInfo();
    let resList = await postWechatNoticeListApi({
      pageNum: 1,
      pageSize: 10,
    });
    if (!this.hidePayStatus && (resList.list || []).length > 0) {
      this.payTypeOptions = await getAllByTypeApi({
        type: "PayType",
        tag: "Customer",
      });
    }
    const res = await getUnpaidOrderOrAmountPaidApi(this.payData.businessId);
    this.payData.paid = res.amountPaid;
    this.payData.unpaid = (
      Number(this.payData.paymentAmount) - Number(res.amountPaid)
    ).toFixed(2);
    this.payNum =
      (Number(this.payData.paymentAmount) - Number(res.amountPaid)).toFixed(2) +
      "";
    this.payType = res.payType ? res.payType : "Pos";
  },
  methods: {
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
    payNumChange(v) {
      console.log(v);
      let num = v.target.value;
      let amount = this.payData.paymentAmount + "";
      if (Number(num) > Number(this.payData.paymentAmount)) {
        this.payNum = num.substring(0, amount.length);
      }
    },
    keyChange(e) {
      console.log(e);
      if (this.open) {
        this.payNum = "";
        this.open = false;
      }
      if (this.payNum?.includes(".")) {
        if (e != ".") {
          let arr = this.payNum.split(".");
          if (arr[1].length < 2) {
            this.payNum += e;
          }
        }
      } else {
        this.payNum += e;
      }
    },

    backspace() {
      if (this.payNum.length) {
        this.payNum = this.payNum.substr(0, this.payNum.length - 1);
      }
    },
    radioChange(e) {
      this.payType = e;
    },
    goBack() {
      uni.navigateBack();
    },
    async payGoto() {
      this.buttonLoading = true;
      let obj = {};
      obj.amount = Number(this.payNum);
      obj.businessId = this.payData.businessId;
      obj.businessCode = this.payData.businessCode;
      obj.groupId = this.payData.groupId;
      obj.operator = this.payData.agentId;
      obj.payType = this.payType;
      obj.payer = "Customer";
      obj.proId = this.payData.projectId;
      obj.roomId = this.payData.roomNumberId;
      obj.serviceAmount = this.payData.paymentAmount;
      obj.serviceFeePaid = this.payData.paid;
      obj.termId = this.payData.cycleId;
      obj.unpaidServiceFee = this.payData.unpaid;
      obj.terminal = "WeChatApp";
      obj.dealCode = this.payData.dealCode;
      obj.dealId = this.payData.dealId;
      // 假数据
      // obj.groupId = 15;
      // obj.operator = 15;
      // obj.proId = 1;
      // obj.termId = 3;
      console.log(obj);

      // 判断是否存在待支付订单
      const isPay = await getBusinessIdApi(this.payData.businessId);
      if (isPay) {
        obj.id = isPay;
      }
      let res = {};
      switch (this.payType) {
        case "UnionPay":
        case "Alipay":
          if (!isPay) {
            try {
              res = await postAddServiceApi(obj);
              this.buttonLoading = false;
            } catch (err) {
              this.buttonLoading = false;
            }
          } else {
            try {
              res = await postPaymentupdateApi(obj);
              this.buttonLoading = false;
            } catch (err) {
              this.buttonLoading = false;
            }
          }
          if (res.data) {
            this.linktoId = res.data;
            this.linktoType = this.payType;
            this.linktoShow = true;
            // uni.navigateTo({
            //   url: `/customerPackage/paymentMethod/zhifubaoPay?id=${res.data}&type=${this.payType}`,
            // });
          }
          break;
        case "Pos":
          if (!isPay) {
            try {
              res = await postAddServiceApi(obj);
              this.buttonLoading = false;
            } catch (err) {
              this.buttonLoading = false;
            }
          } else {
            try {
              res = await postPaymentupdateApi(obj);
              this.buttonLoading = false;
            } catch (err) {
              this.buttonLoading = false;
            }
          }
          if (res.data) {
            this.POSShow = true;
            this.posId = res.data;
            // uni.navigateTo({
            //   url: `/customerPackage/paymentMethod/POS?id=${res.data}`,
            // });
          }
          break;
        case "Transfer":
          getApp().bankTransferData = {
            cycleId: this.payData.cycleId,
            payNum: this.payNum,
            addOrUpdate: isPay ? "update" : "add",
            id: isPay,
          };
          this.buttonLoading = false;
          this.bankTransferShow = true;
          // uni.navigateTo({
          //   url: `/customerPackage/paymentMethod/bankTransfer?id=${isPay}`,
          // });
          break;
        case "WeChatPay":
          if (!isPay) {
            try {
              res = await postAddServiceApi(obj);
              this.buttonLoading = false;
            } catch (err) {
              this.buttonLoading = false;
            }
          } else {
            try {
              res = await postPaymentupdateApi(obj);
              this.buttonLoading = false;
            } catch (err) {
              this.buttonLoading = false;
            }
          }
          if (res.data) {
            const item = await getWeChatJsApi(res.data);
            const weChatData = JSON.parse(item).response.msgBody.wcPayData;
            uni.getProvider({
              service: "payment",
              success: (reson) => {
                uni.requestPayment({
                  provider: reson.provider[0],
                  appId: weChatData.appId,
                  timeStamp: weChatData.timeStamp,
                  nonceStr: weChatData.nonceStr,
                  package: weChatData.pkg,
                  signType: weChatData.signType,
                  paySign: weChatData.paySign,
                  success: () => {
                    uni.showToast({
                      title: "支付成功",
                      icon: "success",
                    });
                    uni.navigateTo({
                      url: `/customerPackage/paySuccess/index`,
                    });
                  },
                  fail: () => {
                    uni.showToast({
                      title: "支付失败",
                      icon: "none",
                    });
                  },
                });
              },
            });
          }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pay {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-msg {
    width: 90%;
    box-sizing: border-box;
    margin-bottom: 30rpx;
    padding: 0 20rpx;
    background-color: white;
  }

  &-title {
    width: 90%;
  }

  &-item {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    /deep/ .u-field {
      padding: 20rpx 0;
    }
    /deep/ .u-field__input-wrap {
      text-align: center;
    }
  }
  &-list {
    height: 80rpx;
    line-height: 80rpx;
    border-bottom: 1px solid #f2f2f2;
    position: relative;

    &-money {
      position: absolute;
      left: 50%;
    }
  }

  &-type {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;

    &-image {
      line-height: 80rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    &-name {
      margin-left: 20rpx;
    }

    &-radio {
      display: flex;
      justify-content: space-evenly;
      /deep/ .u-radio__icon-wrap {
        width: 40rpx !important;
        height: 40rpx !important;
      }
    }
  }

  &-hint {
    width: 90%;
    height: 100rpx;
    color: $uni-color-error;
  }
}

.margin-top {
  width: 90%;
  box-sizing: border-box;
  margin-top: 20rpx;
}

.my-btn {
  width: 90%;
  box-sizing: border-box;
  margin-bottom: 30rpx;

  /deep/.u-btn {
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
  }
}
</style>