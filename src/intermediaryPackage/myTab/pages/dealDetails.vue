<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 08:14:50
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-27 08:42:20
-->
<template>
  <view class="deal-details-wrapper">
    <view class="form-wrapper">
      <view class="title">客户信息</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="张小刚" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.account"
              placeholder="张小刚" disabled :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="title">房产信息</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="楼盘名称" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.account"
              placeholder="楼盘名称" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="物业类型" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.invoiceType"
              placeholder="物业类型" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="栋座" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.invoiceTaxRate"
              placeholder="栋座" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="房号" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.invoiceTaxRate"
              placeholder="房号" disabled :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="form-wrapper" v-if="detailsType === 'commission'">
      <view class="title">结佣信息</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="可结佣金" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.estateName"
              placeholder="可结佣金" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="已结佣金" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.roof"
              placeholder="已结佣金" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="未结佣金" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.room"
              placeholder="未结佣金" disabled :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="在结佣金" right-icon="arrow-right">
            <u-input
              v-model="paymentForm.room"
              placeholder="在结佣金" disabled :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="form-wrapper" v-if="detailsType === 'commission'">
      <view class="title">结佣记录</view>
      <view class="form u-padding-0">
        <view class="record-list" v-for="item in [2,3,4,5,6]" :key="item">
          <view class="record-code">
            <view class="code">JY013246683</view>
            <view class="price">结佣金额：500.00</view>
          </view>
          <view class="record-time">2020-10-08 12:15:30</view>
        </view>
      </view>
    </view>
    <view class="form-wrapper" v-if="detailsType === 'report'">
      <view class="title">结佣信息</view>
      <view class="u-margin-20">
        <u-table>
          <u-tr>
            <u-th v-for="thItem in tableData.thList" :key="thItem.id">{{thItem.name}}</u-th>
          </u-tr>
          <u-tr v-for="trItem in tableData.trList" :key="trItem.id">
            <u-td v-for="tdItem in trItem.value" :key="tdItem.id">{{tdItem}}</u-td>
          </u-tr>
        </u-table>
      </view>
    </view>
    <view class="form-wrapper" v-if="detailsType === 'report'">
      <view class="title">附件信息</view>
      <view class="form-img">
        <view class="img-item" v-for="(item, index) in annexList" :key="index">
          <view class="img-upload">
            <u-upload :action="action" :file-list="fileList" ></u-upload>
          </view>
          <view class="img-type">{{item.typeName}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      detailsType: '',
      paymentForm: {
        account: '',
        invoiceType: '',
        invoiceTaxRate: ''
      },
      tableData: {
        thList: [
          {
            id: '1',
            name: '结佣类型'
          },
          {
            id: '2',
            name: '可结佣'
          },
          {
            id: '3',
            name: '已结佣'
          },
          {
            id: '4',
            name: '未结佣'
          }
        ],
        trList: [
          {
            id: '1',
            value: ['服务费', '1000.00', '1000.00', '1000.00']
          },
          {
            id: '2',
            value: ['代理费', '2000.00', '2000.00', '2000.00']
          },
          {
            id: '3',
            value: ['合计', '3000.00', '3000.00', '3000.00']
          }
        ]
      },
      annexList: [
        {
          typeName: '来访确认单'
        },
        {
          typeName: '成交确认单'
        },
        {
          typeName: '签约凭证'
        },
        {
          typeName: 'POS单'
        },
        {
          typeName: '业主身份证'
        }
      ],
      action: 'http://www.example.com/upload',
      fileList: []
    };
  },
  onLoad(option) {
    console.log('dealDetails', option);
    this.detailsType = option.type;
    if (option.type === 'report') {
      // 报备成交详情
      uni.setNavigationBarTitle({
        title: '报备成交信息详情'
      });
    } else {
      // 结佣成交详情
      uni.setNavigationBarTitle({
        title: '成交详情'
      });
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .deal-details-wrapper {
    width: 100%;
    background-color: #F5F5F5;

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

        .record-list {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 20rpx 30rpx;
          border-bottom: 1rpx solid #E4E4E4;

          .record-code {
            display: flex;
            flex-direction: column;

            view {
              padding: 5rpx 0rpx;
            }

            .code {
              color: rgb(41, 121, 255);
              text-decoration: underline;
            }

            .price {
              color: #999999;
            }
          }
        }
      }

      .form-img {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 20rpx;
        //justify-content: space-between;

        .img-item {
          //width: 30%;
          display: flex;
          flex-direction: column;
          margin-right: 10rpx;

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
  }
</style>