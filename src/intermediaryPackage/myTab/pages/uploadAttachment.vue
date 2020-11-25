<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-25 09:01:02
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-25 10:19:09
-->
<template>
  <view class="upload-attachment-wrapper">
    <view class="upload-type-wrapper">
      <view class="title">附件类型</view>
      <view class="form-wrapper">
        <u-form :model="typeForm" ref="typeForm" :label-width="140">
          <u-form-item label="附件类型" right-icon="arrow-right" required class="hide-icon">
            <u-input v-model="typeForm.type" type="select" @click="selectType('type')" placeholder="附件类型" :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="具体附件" right-icon="arrow-right" required class="hide-icon">
            <u-input v-model="typeForm.specific" type="select" @click="selectType('value')" placeholder="具体附件" :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="upload-type-wrapper margin-top-30">
      <view class="title">附件图片</view>
      <view>
        <u-upload :action="action" :file-list="fileList" ></u-upload>
      </view>
    </view>
    <view class="upload-bottom-btn">
      <u-button type="primary" shape="square" @click="handleSubmit">提交</u-button>
    </view>
    <u-select v-model="showUploadType" :list="typeList" @confirm="confirmType"></u-select>
    <u-select v-model="showUploadTypeValue" :list="typeValueList" @confirm="confirmTypeValue"></u-select>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        typeForm: {
          type: '',
          specific: ''
        },
        showUploadType: false,
        typeList: [
          {
            value: '1',
            label: '到访附件',
            extra: [
              {
                value: '1',
                label: '转介客户确认单',
              }
            ]
          },
          {
            value: '2',
            label: '认筹附件',
            extra: [
              {
                value: '1',
                label: '优惠告知书',
              },
              {
                value: '1',
                label: 'pos小票',
              }
            ]
          },
          {
            value: '3',
            label: '认购附件',
            extra: [
              {
                value: '1',
                label: '新房认购书',
              },
              {
                value: '1',
                label: '定金收据',
              },
              {
                value: '1',
                label: '身份证',
              }
            ]
          },
          {
            value: '4',
            label: '签约附件',
            extra: [
              {
                value: '1',
                label: '网签证明',
              }
            ]
          },
        ],
        showUploadTypeValue: false,
        typeValueList: [],
        action: '',
        fileList: []
      };
    },
    onLoad() {
    },
    methods: {
      selectType(value) {
        if (value === 'type') {
          this.showUploadType = true;
        } else {
          this.showUploadTypeValue = true;
        }
      },
      // 选择类型
      confirmType(e) {
        console.log(e);
        if (e && e.length > 0) {
          this.typeForm.type = e[0].label;
          this.typeValueList = e[0].extra
        }
      },
      // 选择具体类型值
      confirmTypeValue(e) {
        console.log(e);
        if (e && e.length > 0) {
          this.typeForm.specific = e[0].label;
        }
      },
      // 提交
      handleSubmit() {
        uni.navigateTo({
          url: `/intermediaryPackage/myTab/pages/myReport`,
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .upload-attachment-wrapper {
    width: 100%;
    height: calc(100vh - 130rpx);
    overflow-y: auto;
    background-color: #F5F5F5;

    .upload-type-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 30rpx 40rpx 30rpx 50rpx;
      background-color: #FFFFFF;

      .title {
        font-size: 30rpx;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #333333;
        line-height: 42rpx;
      }
    }

    .margin-top-30 {
      margin-top: 30rpx;
    }

    .upload-bottom-btn {
      width: 100%;
      height: 120rpx;
      box-sizing: border-box;
      padding: 20rpx 50rpx;
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      z-index: 998;
    }
  }
</style>