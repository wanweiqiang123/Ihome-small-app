<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-26 14:24:10
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-26 15:18:36
-->
<template>
  <view class="initiate-commission-wrapper">
    <view class="initiate-title">
      <view class="title">待结佣成交列表</view>
      <view class="btn">
        <u-button type="primary" size="mini" @click="showProject = true">添加</u-button>
      </view>
    </view>
    <view class="commission-item-wrapper" v-for="item in [1,2]" :key="item">
      <view class="item-project-name u-padding-15">
        <view>爱特城(20200101~20200130)</view>
        <view>结佣总额：600.00</view>
      </view>
      <view class="item-code-list u-padding-15" v-for="list in [1,2,3,4]" :key="list" @click="viewDealDetail">
        <view class="list-left">
          <view>成交报告编号：CJ138979352876</view>
          <view class="price">本单佣金：200.00</view>
        </view>
        <view class="list-right">
          <u-icon name="close-circle" size="45"></u-icon>
        </view>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">收款信息</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="收款帐号" right-icon="arrow-right" class="hide-icon">
            <u-input
              @click="showAccount = true"
              v-model="paymentForm.account" type="select"
              placeholder="收款帐号" :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="发票类型" right-icon="arrow-right" class="hide-icon">
            <u-input
              @click="showInvoiceType = true"
              v-model="paymentForm.invoiceType" type="select"
              placeholder="发票类型" :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="发票税率" right-icon="arrow-right" class="hide-icon">
            <u-input
              @click="showInvoiceTaxRate = true"
              v-model="paymentForm.invoiceTaxRate" type="select"
              placeholder="发票税率" :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">佣金结算</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="本单佣金" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.estateName"
              placeholder="本单佣金" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="不含税金额" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.roof"
              placeholder="不含税金额" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="税额" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.room"
              placeholder="税额" disabled :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">附件信息</view>
      <view class="form-img">
        <view class="img-item">
          <view class="img-upload">
            <u-upload :action="action" :file-list="fileList" ></u-upload>
          </view>
          <view class="img-type">发票</view>
        </view>
        <view class="img-item">
          <view class="img-upload">
            <u-upload :action="action" :file-list="fileList" ></u-upload>
          </view>
          <view class="img-type">请款单</view>
        </view>
        <view class="img-item">
          <view class="img-upload">
            <u-upload :action="action" :file-list="fileList" ></u-upload>
          </view>
          <view class="img-type">结算明细</view>
        </view>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">说明</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="申请说明" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.estateName"
              placeholder="申请说明" :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="btn-wrapper">
      <u-button type="primary" shape="circle" @click="handleSubmit">提交</u-button>
    </view>
    <u-popup v-model="showProject" mode="right" length="100%">
      <view class="add-project-list-wrapper">
        <view class="title">
          <view class="selected">
            <u-checkbox shape="circle">全选</u-checkbox>
          </view>
          <view class="filter-wrapper">筛选</view>
          <u-icon name="grid-fill" color="#3478F7" size="38" @click="showProjectCase = true"></u-icon>
        </view>
        <view class="add-list-item-wrapper" v-for="item in [1,2,3,4,5,6,7,8,9,10]" :key="item">
          <view class="item-select">
            <u-checkbox shape="circle"></u-checkbox>
          </view>
          <view class="item-info" @click="viewProjectCommDetails">
            <view class="item-code u-padding-bottom-15">
              <view>CJ18919873</view>
              <view class="u-text-right">可结佣金：200.00</view>
            </view>
            <view class="u-padding-bottom-15">爱特城项目(20200130~20200228)</view>
            <view class="u-padding-bottom-15">成交日期：2020-11-26 16:33:33</view>
          </view>
        </view>
        <view class="add-btn-wrapper">
          <view class="left" @click="showProject = false">取消</view>
          <view class="right" @click="showProject = false">确认</view>
        </view>
      </view>
    </u-popup>
    <u-popup v-model="showProjectCase" mode="right" :z-inde="15000" length="70%">
      <view class="project-case-wrapper">
        <view>
          <u-form :model="projectCaseForm" ref="projectCaseForm" :label-width="190">
            <u-form-item label="项目名称" right-icon="arrow-right" class="hide-icon">
              <u-input
                @click="showProjectName = true"
                v-model="projectCaseForm.name" type="select"
                placeholder="项目名称" :clearable="false" input-align="right" />
            </u-form-item>
            <u-form-item label="项目周期" right-icon="arrow-right" class="hide-icon">
              <u-input
                @click="showProjectCycle = true"
                v-model="projectCaseForm.cycle" type="select"
                placeholder="项目周期" :clearable="false" input-align="right" />
            </u-form-item>
            <u-form-item label="成交报告编号" right-icon="arrow-right">
              <u-input
                v-model="projectCaseForm.code"
                placeholder="成交报告编号" :clearable="false" input-align="right" />
            </u-form-item>
          </u-form>
        </view>
        <view class="add-btn-wrapper">
          <view class="left" @click="showProjectCase = false">重置</view>
          <view class="right" @click="showProjectCase = false">确定</view>
        </view>
      </view>
    </u-popup>
    <u-select v-model="showProjectName" z-index="20000" :list="projectNameList" @confirm="confirmProjectName"></u-select>
    <u-select v-model="showProjectCycle" z-index="20000" :list="projectCycleList" @confirm="confirmProjectCycle"></u-select>
    <u-popup v-model="showAccount" mode="right" length="100%">
      <view class="account-list-wrapper">
        <view
          @click="selectAccount(index)"
          :class="currentAccountIndex === index ? 'account-list selected-color' : 'account-list'"
          v-for="(item, index) in [1,2,3,4,5]" :key="index">
          <view>账户名称：广州市择食电子商务有限责任公司</view>
          <view>开户银行：中国银行独山县支行</view>
          <view>银行卡号：4431-3466-4687-3100-12445</view>
        </view>
      </view>
    </u-popup>
    <u-select v-model="showInvoiceType" :list="invoiceTypeList" @confirm="confirmInvoiceType"></u-select>
    <u-select v-model="showInvoiceTaxRate" :list="invoiceTaxRateList" @confirm="confirmInvoiceTaxRate"></u-select>
  </view>
</template>

<script>
export default {
  data() {
    return {
      paymentForm: {
        account: '',
        invoiceType: '',
        invoiceTaxRate: ''
      },
      showProject: false,
      showProjectCase: false,
      projectCaseForm: {
        name: '',
        cycle: '',
        code: ''
      },
      showProjectName: false,
      projectNameList: [
        {
          value: '1',
          label: '富力新城'
        },
        {
          value: '2',
          label: '保利爱立信'
        },
        {
          value: '3',
          label: '富力广场'
        },
        {
          value: '4',
          label: '增值税普通发票'
        }
      ],
      showProjectCycle: false,
      projectCycleList: [
        {
          value: '1',
          label: '0130~0228'
        },
        {
          value: '2',
          label: '0228~0330'
        },
        {
          value: '3',
          label: '0330~0443'
        },
        {
          value: '4',
          label: '0443~0552'
        },
      ],
      showAccount: false,
      currentAccountIndex: 1,
      showInvoiceType: false,
      invoiceTypeList: [
        {
          value: '1',
          label: '增值税普通发票'
        },
        {
          value: '2',
          label: '增值税专用发票'
        }
      ],
      showInvoiceTaxRate: false,
      invoiceTaxRateList: [
        {
          value: '1',
          label: '1%'
        },
        {
          value: '2',
          label: '3%'
        },
        {
          value: '3',
          label: '5%'
        },
        {
          value: '4',
          label: '6%'
        },
        {
          value: '5',
          label: '9%'
        },
        {
          value: '5',
          label: '13%'
        }
      ],
      action: 'http://www.example.com/upload',
      fileList: []
    };
  },
  onLoad() {},
  methods: {
    // 选择账号
    selectAccount(index) {
      this.currentAccountIndex = index;
      this.showAccount = false;
    },
    // 选择项目名称
    confirmProjectName(e) {
      this.projectCaseForm.name = e[0].label;
    },
    // 选择项目周期
    confirmProjectCycle(e) {
      this.projectCaseForm.cycle = e[0].label;
    },
    // 选择发票类型
    confirmInvoiceType(e) {
      this.paymentForm.invoiceType = e[0].label;
    },
    // 选择发票税率
    confirmInvoiceTaxRate(e) {
      this.paymentForm.invoiceTaxRate = e[0].label;
    },
    // 查看项目结佣情况
    viewProjectCommDetails() {
      uni.navigateTo({
        url: `/intermediaryPackage/myTab/pages/projectCommDetails`
      });
    },
    // 查看结佣成交详情
    viewDealDetail(item) {
      console.log(item);
      uni.navigateTo({
        url: `/intermediaryPackage/myTab/pages/dealDetails`
      });
    },
    // 提交
    handleSubmit() {
      uni.redirectTo({
        url: `/intermediaryPackage/myTab/pages/commissionList`
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .initiate-commission-wrapper {
    width: 100%;
    background-color: #F5F5F5;

    .initiate-title {
      width: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 30rpx;

      .title {
        flex: 1;
      }
    }

    .commission-item-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 15rpx 15rpx 0rpx 15rpx;

      .item-project-name {
        width: 100%;
        box-sizing: border-box;
        color: #FFFFFF;
        background-color: #02A7F0;

        view {
          padding: 10rpx;
          font-weight: 600;
        }
      }

      .item-code-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #FFFFFF;

        &:not(:last-child) {
          border-bottom: 1rpx solid #CCCCCC;
        }

        .list-left {
          flex: 1;

          view {
            padding: 10rpx;
          }

          .price {
            color: #999999;
          }
        }
      }
    }

    .form-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 30rpx 0rpx 30rpx;

      .form {
        background-color: #FFFFFF;
        border: 1rpx solid #E4E4E4;
        box-sizing: border-box;
        padding: 0rpx 30rpx;
        margin: 20rpx 0rpx;
      }

      .form-img {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .img-item {
          width: 30%;
          display: flex;
          flex-direction: column;

          .img-upload,.img-type {
            flex: 1;
          }

          .img-type {
            height: 65rpx;
            line-height: 65rpx;
            background-color: #FFFFFF;
            text-align: center;
          }
        }
      }
    }

    .btn-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 50rpx;
      margin-bottom: 30rpx;
    }
  }

  .add-project-list-wrapper {
    width: 100%;
    height: calc(100vh - 90rpx);
    overflow-y: auto;
    //position: relative;

    .title {
      width: 100%;
      padding: 20rpx 10rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1rpx solid #E4E4E4;

      .selected {
        flex: 1;
      }

      .filter-wrapper {
        color: #3478F7;
        font-size: 30rpx;
      }
    }

    .add-list-item-wrapper {
      width: 100%;
      padding: 20rpx 10rpx;
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      .item-info {
        flex: 1;

        .item-code {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;

          view {
            flex: 1;
          }
        }
      }
    }

    .add-btn-wrapper {
      width: 100%;
      //position: absolute;
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      display: flex;
      flex-direction: row;
      align-items: center;

      view {
        height: 80rpx;
        line-height: 80rpx;
        flex: 1;
        text-align: center;
      }

      .left {
        color: #999999;
        background-color: #FFFFFF;
      }

      .right {
        color: #FFFFFF;
        background-color: #0079FE;
      }
    }
  }

  .project-case-wrapper {
    width: 100%;
    padding: 20rpx 30rpx;

    .add-btn-wrapper {
      width: 100%;
      //position: absolute;
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      display: flex;
      flex-direction: row;
      align-items: center;

      view {
        height: 80rpx;
        line-height: 80rpx;
        flex: 1;
        text-align: center;
      }

      .left {
        color: #999999;
        background-color: #FFFFFF;
      }

      .right {
        color: #FFFFFF;
        background-color: #0079FE;
      }
    }
  }

  .account-list-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx;

    .account-list {
      box-sizing: border-box;
      padding: 20rpx;
      border: 1rpx dashed #E4E4E4;
      margin-bottom: 20rpx;

      view {
        padding-bottom: 15rpx;
      }
    }

    .selected-color {
      border-color: #1ABC9C;
    }
  }
</style>