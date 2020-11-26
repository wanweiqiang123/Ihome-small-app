<!--
 * @Description: 业绩申报
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-26 09:38:11
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-26 16:27:06
-->
<template>
  <view class="performance">
    <view class="form-content">
      <view class="performance-form">
        <view class="form-title u-border-bottom">成交信息</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="170"
        >
          <u-form-item
            label="项目周期"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择项目周期"
            />
          </u-form-item>
          <u-form-item
            label="合同类型"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择合同类型"
            />
          </u-form-item>
          <u-form-item
            label="成交阶段"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择成交阶段"
            />
          </u-form-item>
          <u-form-item label="认购价格">
            <u-input
              v-model="form.sex"
              placeholder="请输入价格"
            />
          </u-form-item>
          <u-form-item
            label="认购日期"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择认购日期"
            />
          </u-form-item>
          <u-form-item label="签约价格">
            <u-input
              v-model="form.sex"
              placeholder="请输入价格"
            />
          </u-form-item>
          <u-form-item
            label="签约日期"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择签约日期"
            />
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">房产信息</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="170"
        >
          <u-form-item
            label="物业类型"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择物业类型"
            />
          </u-form-item>
          <u-form-item
            label="栋 座"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择栋座"
            />
          </u-form-item>
          <u-form-item
            label="房 号"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择房号"
            />
          </u-form-item>
          <u-form-item label="优惠告知书">
            <view class="form-link">
              <u-link
                href="http://www.uviewui.com"
                :under-line="true"
              >优惠告知书(YH001)</u-link>
            </view>
            <view class="form-link">
              <u-link
                href="http://www.uviewui.com"
                :under-line="true"
              >补充协议</u-link>
            </view>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">
          <text>客户信息</text>
          <view>
            <u-icon name="plus" /> 添加
          </view>
        </view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="170"
        >
          <u-form-item
            label="张小刚"
            right-icon="close-circle-fill"
          >
            <view>18333334444</view>
          </u-form-item>
          <u-form-item
            label="李大爷"
            right-icon="close-circle-fill"
          >
            <view>18333334444</view>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">
          <text>中介信息</text>
          <view>
            <u-icon name="plus" /> 添加
          </view>
        </view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="170"
        >
          <u-form-item
            label="张小刚"
            right-icon="close-circle-fill"
          >
            <view>链家房产有限公司</view>
          </u-form-item>
          <u-form-item
            label="李大爷"
            right-icon="close-circle-fill"
          >
            <view>链家房产有限公司</view>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-title">业绩申报</view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">代理费套餐</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="170"
        >
          <u-form-item
            label="甲方A"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择套餐标准"
            />
          </u-form-item>
          <u-form-item
            label="甲方B"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择套餐标准"
            />
          </u-form-item>
          <u-form-item
            label="甲方C"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择套餐标准"
            />
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">服务费套餐</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="170"
        >
          <u-form-item
            label="客户A"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择套餐标准"
            />
          </u-form-item>
          <u-form-item
            label="客户B"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择套餐标准"
            />
          </u-form-item>
          <u-form-item
            label="客户C"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              placeholder="请选择套餐标准"
            />
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-table">
        <u-table :th-style="{backgroundColor:'#4881F9',color:'#FFFFFF'}">
          <u-tr>
            <u-th>费用类型</u-th>
            <u-th>应收</u-th>
            <u-th>派佣</u-th>
            <u-th>派内场奖励</u-th>
          </u-tr>
          <u-tr>
            <u-td>服务费</u-td>
            <u-td>1000.00</u-td>
            <u-td>1000.00</u-td>
            <u-td>1000.00</u-td>
          </u-tr>
          <u-tr>
            <u-td>代理费</u-td>
            <u-td>1000.00</u-td>
            <u-td>1000.00</u-td>
            <u-td>1000.00</u-td>
          </u-tr>
          <u-tr>
            <u-td>合计</u-td>
            <u-td>1000.00</u-td>
            <u-td>1000.00</u-td>
            <u-td>1000.00</u-td>
          </u-tr>
        </u-table>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">上传附件</view>
        <view class="form-upload">
          <u-upload
            :action="action"
            :file-list="fileList"
          ></u-upload>
        </view>
      </view>
    </view>
    <view class="performance-btn">
      <u-button
        shape="circle"
        type="primary"
      >确认</u-button>
    </view>
  </view>
</template>

<script>
export default {
  name: "performanceEdit",
  data() {
    return {
      form: {},
      action: "",
      fileList: [
        {
          url: "http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.performance {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-form {
    background: #fff;
    .form-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 92rpx;
      padding: 0 24rpx;
      color: $u-type-primary;
    }
    & + & {
      margin-top: 20rpx;
    }
  }
  &-table {
    margin-top: 25rpx;
    margin-bottom: 15rpx;
  }
  &-title {
    margin-top: 20rpx;
    margin-bottom: 10rpx;
    height: 92rpx;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 24rpx;
    color: $u-type-primary;
  }
  &-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90rpx;
    box-sizing: content-box;
    padding-top: 10rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    z-index: 10;
    background: #fff;
  }
}
.form-content {
  padding: 30rpx 30rpx 110rpx;
}
.form-upload {
  padding: 10rpx 12rpx;
}
</style>
<style lang="scss">
.performance-form {
  .u-form-item {
    padding-left: 23rpx !important;
    padding-right: 23rpx !important;
  }
}
</style>
