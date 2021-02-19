<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2021-02-17 17:31:28
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-17 17:43:17
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-25 09:01:02
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-05 09:53:55
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
            @on-success="successChange($event, item.code)"
            @on-remove="removeChange($event, item.code)"
            :show-upload-list="true"
            :header="header"
            :show-progress="false"
            :file-list="item.showList"
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
import {
  postReportAttachmentApi,
  postReportAttachmentGetAllApi,
} from "@/api/channel";
import { getAllByTypeApi } from "@/api/index";
import { currentEnvConfig } from "../../env-config.js";
import storageTool from "../../common/storageTool.js";

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
      reportId: "",
    };
  },
  async onLoad(option) {
    this.reportId = option.id;
    this.ReportAttachment = await this.getDictAll("ReportAttachment");
    this.dictList = this.ReportAttachment.map((v) => ({
      code: v.code,
      id: v.id,
      name: v.name,
      fileList: [],
      showList: [],
    }));
    if (this.reportId) this.getReportList();
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
    async getReportList() {
      let obj = {};
      obj.reportId = this.reportId;
      const res = await postReportAttachmentGetAllApi(obj);
      res.forEach((v) => {
        this.dictList.forEach((j) => {
          if (v.type === j.code) {
            j.showList.push({
              fileId: v.fileId,
              fileName: v.fileName,
              type: v.type,
              url: `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${v.fileId}`,
            });
            j.fileList.push({
              fileId: v.fileId,
              fileName: v.fileName,
              type: v.type,
            });
          }
        });
      });
    },
    removeChange(index, code) {
      this.dictList.forEach((v) => {
        if (v.code === code) {
          v.fileList.splice(index, 1);
        }
      });
    },
    async successChange(data, code) {
      this.dictList.forEach((v) => {
        if (v.code === code) {
          if (v.fileList.length) {
            v.fileList.push({
              fileId: data.data[0].fileId,
              fileName:
                data.data[0].generateFileName +
                "." +
                data.data[0].generateFileType,
              type: code,
            });
          } else {
            v.fileList = [
              {
                fileId: data.data[0].fileId,
                fileName:
                  data.data[0].generateFileName +
                  "." +
                  data.data[0].generateFileType,
                type: code,
              },
            ];
          }
        }
      });
    },
    // 提交
    async handleSubmit() {
      let obj = {
        attachments: [],
        reportId: this.reportId,
      };
      this.dictList.forEach((v) => {
        obj.attachments = obj.attachments.concat(v.fileList);
      });
      await postReportAttachmentApi(obj);
      this.$tool.toast("提交成功");
      uni.navigateBack();
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
