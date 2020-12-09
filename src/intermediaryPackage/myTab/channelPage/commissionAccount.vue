<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 16:36:50
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-27 17:12:50
-->
<template>
  <view class="commission-account-list-wrapper">
    <view class="management" @click="currentType = !currentType">{{currentType ? '管理' : '完成'}}</view>
    <view :class="currentType ? 'account-list-wrapper' : 'account-list-wrapper list-height'">
      <view
        @click="handleAdd"
        :class="flag === true ?'list-item list-checked' : 'list-item'"
        v-for="(item, index) in accountList" :key="index">
        <view class="left" v-if="!currentType">
          <u-checkbox v-model="flag" shape="circle" size="30rpx"></u-checkbox>
        </view>
        <view class="right">
          <view>账户名称：{{item.name}}</view>
          <view>开户银行：{{item.local}}</view>
          <view>银行卡号：{{item.code}}</view>
          <view class="edit" v-if="currentType">
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
      <u-button type="error">删除</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentType: true,
      flag: true,
      accountList: [
        {
          name: '广州市择食电子商务有限责任公司',
          local: '中国银行独山县支行',
          code: '4431-3465-4687-3100-12445'
        },
        {
          name: '广州市择食电子商务有限责任公司',
          local: '中国银行独山县支行',
          code: '4431-3465-4687-3100-12445'
        },
        {
          name: '广州市择食电子商务有限责任公司',
          local: '中国银行独山县支行',
          code: '4431-3465-4687-3100-12445'
        }
      ]
    };
  },
  onLoad() {

  },
  methods: {
    // 新增/编辑账号
    handleAdd() {
      uni.navigateTo({
        url: `/intermediaryPackage/myTab/channelPage/addAccount`
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .commission-account-list-wrapper {
    width: 100%;
    background-color: #F5F5F5;

    .management {
      width: 100%;
      padding: 20rpx 20rpx;
      text-align: right;
      background-color: #FFFFFF;
    }

    .account-list-wrapper {
      width: 100%;
      padding: 20rpx;

      .list-item {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 1rpx solid #429FFF;
        border-radius: 20rpx;
        padding: 20rpx 20rpx;
        margin-bottom: 20rpx;
        background-color: #FFFFFF;

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
            color: #66B1FF;
          }
        }
      }

      .list-checked {
        border-color: #FB6260;
      }

      .add-wrapper {
        width: 100%;
        height: 240rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2rpx dashed #E4E4E4;
        border-radius: 20rpx;
        margin-top: 20rpx;
        background-color: #F5F5F5;

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