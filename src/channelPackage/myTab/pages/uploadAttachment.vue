<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-25 09:01:02
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-04 15:15:44
-->
<template>
  <view class="upload-attachment-wrapper">
    <view class="upload-type-wrapper">
      <view class="pay-upload">
        <view
          v-for="(item, i) in dictList"
          :key="i"
        >
          <text class="upload-title">{{item.name}}</text>
          <u-upload
            max-count="10"
            class="upload"
            width="160"
            height="160"
            :action="action"
            @on-success="successChange"
            @on-remove="removeChange"
            :show-upload-list="true"
            :header="header"
            :show-progress="false"
            :before-upload="beforeUpload(i)"
            name="files"
          ></u-upload>
        </view>
      </view>
    </view>
    <view class="upload-bottom-btn">
      <u-button
        type="primary"
        shape="square"
        @click="handleSubmit"
      >提交</u-button>
    </view>
  </view>
</template>

<script>
import { postReportAttachmentApi } from "@/api/channel";
import { getAllByTypeApi } from "@/api/index";
import { currentEnvConfig } from "../../../env-config.js";
import storageTool from "../../../common/storageTool.js";
export default {
  data() {
    return {
      ReportAttachment: [],
      action:
        currentEnvConfig["protocol"] +
        "://" +
        currentEnvConfig["apiDomain"] +
        "/sales-api/sales-document-cover/file/upload",
      dictList: [],
      showUploadList: true,
      header: {
        Authorization: "bearer " + storageTool.getToken(),
      },
      uploadArr: [],
    };
  },
  async onLoad() {
    this.ReportAttachment = await this.getDictAll("ReportAttachment");
    this.dictList = this.ReportAttachment.map((v) => ({
      code: v.code,
      id: v.id,
      name: v.name,
      fileList: [],
    }));
  },
  methods: {
    // 获取字典
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 获取对应字典name
    getDictName(code, list) {
      if (list.length) {
        const item = list.find((v) => v.code === code);
        return item?.name;
      } else {
        return "";
      }
    },
    beforeUpload(index) {
      console.log(index);
      uni.showToast({
        icon: "loading",
        title: "正在上传...",
        duration: 500000000000,
      });
      return true;
    },
    removeChange(index, lists, name) {
      console.log(index, lists, name);
      // this.uploadArr.splice(index, 1);
    },
    async successChange(data, index, lists, name) {
      // this.uploadArr[index] = {
      //   fileId: lists[index].response.data[0].fileId,
      //   fileName:
      //     lists[index].response?.data[0].generateFileName +
      //     "." +
      //     lists[index].response?.data[0].generateFileType,
      // };
      console.log(data, index, lists, name);
    },
    // 提交
    async handleSubmit() {
      let obj = {};
      await postReportAttachmentApi(obj);
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/myReport`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-attachment-wrapper {
  width: 100%;
  height: calc(100vh - 130rpx);
  overflow-y: auto;
  background-color: #f5f5f5;

  .upload-type-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx;
    background-color: #ffffff;
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
.pay-upload {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20rpx;

  .upload-title {
    margin-left: 10rpx;
  }
}
</style>