<!--
 * @Description: 生成优惠告知书
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 09:42:46
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-03 20:18:56
-->
<template>
  <LoginPage>
    <view class="notice safe-area-inset-bottom">
      <view class="notice-info">
        <view class="title">
          <u-image
            width="80rpx"
            height="80rpx"
            src="http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg"
            shape="circle"
          ></u-image>
          <text class="title-text">优惠信息</text>
        </view>
      </view>
      <view class="form-content">
        <view class="form-color">
          <u-form
            :model="form"
            ref="baseFrom"
            label-width="190"
            :error-type="['message']"
          >
            <u-form-item
              label="项目联动周期"
              class="hide-icon"
              right-icon="arrow-right"
              required
              prop="cycleName"
            >
              <u-input
                v-model="form.cycleName"
                type="select"
                placeholder="请选择项目联动周期"
                @click="handleClick"
              />
            </u-form-item>
            <u-form-item
              label="优惠方式"
              class="hide-icon"
              right-icon="arrow-right"
              required
              prop="manner"
            >
              <u-input
                v-model="form.manner"
                type="select"
                placeholder="请选择优惠折扣方式"
                @click="handleShowSelect"
              />
            </u-form-item>
            <template v-if="isOther">
              <u-form-item
                label="优惠说明"
                required
                prop="explain"
              >
                <u-input
                  v-model="form.explain"
                  placeholder="请输入优惠说明"
                />
              </u-form-item>
              <u-form-item
                label="服务费金额"
                required
                prop="paymentAmount"
              >
                <u-input
                  v-model="form.paymentAmount"
                  placeholder="请输入服务费金额"
                />
              </u-form-item>
              <u-form-item label="业管审核状态">
                <view v-if="form.reviewStatus">{{ form.reviewStatus | filterDict(distri)}}</view>
                <view v-else>待审核</view>
              </u-form-item>
            </template>
            <template v-else>
              <u-form-item label="服务费金额">
                <u-input
                  v-model="form.paymentAmount"
                  placeholder="服务费金额"
                  disabled
                />
              </u-form-item>
            </template>
          </u-form>
        </view>
        <view class="form-color">
          <u-form
            :model="form"
            label-width="190"
            ref="roomFrom"
            :error-type="['message']"
          >
            <u-form-item
              label="选择栋座"
              class="hide-icon"
              right-icon="arrow-right"
              :required="!isRecognize"
              prop="buyUnitName"
            >
              <u-input
                v-model="form.buyUnitName"
                type="select"
                :placeholder="`${isRecognize ? '认筹阶段可不选择房号': '请选择栋座'}`"
                @click="handleShowBuild"
              />
            </u-form-item>
            <u-form-item
              label="选择房号"
              class="hide-icon"
              right-icon="arrow-right"
              :required="!isRecognize"
              prop="roomNumberName"
            >
              <u-input
                v-model="form.roomNumberName"
                type="select"
                :placeholder="`${isRecognize ? '认筹阶段可不选择房号':'请选择房号'}`"
                @click="handleShowRoom"
              />
            </u-form-item>
            <u-form-item label="业主类型">
              <u-radio-group
                v-model="form.ownerType"
                @change="changeOwner"
              >
                <u-radio name="Personal">个人</u-radio>
                <u-radio name="Enterprise">企业</u-radio>
              </u-radio-group>
            </u-form-item>
          </u-form>
        </view>
        <!-- 个人部分 -->
        <template v-if="form.ownerType == 'Personal'">
          <view class="owner-tilte">
            <view class="owner-tilte-right">如有多个业主通过右侧“
              <u-icon
                name="plus-circle"
                size="32"
              ></u-icon>
              ”按钮新增
            </view>
          </view>
          <template v-for="(item, i) in ownerInfo">
            <view
              class="form-layout"
              :key="i"
            >
              <u-form
                :model="item"
                :ref="`uForm`"
                class="owner-msg"
                :error-type="['message']"
                label-width="160"
              >
                <u-form-item
                  label="业主姓名"
                  prop="ownerName"
                  required
                >
                  <u-input
                    v-model="item.ownerName"
                    placeholder="请输入姓名"
                    clearable
                  />
                </u-form-item>
                <u-form-item
                  label="手机号码"
                  prop="ownerMobile"
                  required
                >
                  <u-input
                    v-model="item.ownerMobile"
                    placeholder="请输入手机号码"
                    clearable
                  />
                </u-form-item>
                <u-form-item
                  label="身份证号"
                  prop="ownerCertificateNo"
                  required
                >
                  <u-input
                    v-model="item.ownerCertificateNo"
                    placeholder="请输入身份证号"
                    clearable
                  />
                </u-form-item>
              </u-form>
              <view
                v-if="i === 0"
                class="owner-icon"
                @click="addOwner"
              >
                <u-icon
                  name="plus-circle"
                  color="#2979ff"
                  size="48"
                ></u-icon>
              </view>
              <view
                v-else
                class="owner-icon"
                @click="subtractOwner(i)"
              >
                <u-icon
                  name="close-circle"
                  color="#2979ff"
                  size="48"
                ></u-icon>
              </view>
            </view>
          </template>
          <view class="form-title u-border-bottom">
            <view>{{`切换为${isType ? '纸质' : '电子'}优惠告知书`}}</view>
            <u-switch
              v-model="isType"
              @change="(isActive) => {
                if (isActive) form.noticeAttachmentList = []
              }"
            ></u-switch>
          </view>
          <view
            class="form-color"
            v-if="!isType"
          >
            <u-form
              label-width="220"
              label-position="top"
            >
              <u-form-item label="优惠告知书附件">
                <u-upload
                  width="180"
                  height="180"
                  name="files"
                  :action="$tool.getUploadUrl()"
                  :header="header"
                  :show-progress="false"
                  :before-upload="beforeUpload"
                  :before-remove="beforeRemove"
                  :file-list="fileList"
                  @on-success="successChange"
                  @on-remove="removeChange"
                ></u-upload>
              </u-form-item>
            </u-form>
          </view>
        </template>
        <!-- 企业部分 -->
        <template v-else>
          <view class="form-color">
            <u-form
              :model="enterpriseFrom"
              ref="enterprise"
              label-width="220"
              :error-type="['message']"
            >
              <u-form-item
                label="公司名称"
                prop="ownerName"
                required
              >
                <u-input
                  v-model="enterpriseFrom.ownerName"
                  placeholder="请输入公司名称"
                />
              </u-form-item>
              <u-form-item
                label="经办人号码"
                prop="ownerMobile"
                required
              >
                <u-input
                  v-model="enterpriseFrom.ownerMobile"
                  placeholder="请输入经办人号码"
                />
              </u-form-item>
              <u-form-item
                label="营业执照编号"
                prop="ownerCertificateNo"
                required
              >
                <u-input
                  v-model="enterpriseFrom.ownerCertificateNo"
                  placeholder="请输入营业执照编号"
                />
              </u-form-item>
              <u-form-item
                label="优惠告知书附件"
                label-position="top"
              >
                <u-upload
                  width="180"
                  height="180"
                  name="files"
                  :action="$tool.getUploadUrl()"
                  :header="header"
                  :show-progress="false"
                  :before-upload="beforeUpload"
                  :before-remove="beforeRemove"
                  @on-success="successChange"
                  @on-remove="removeChange"
                ></u-upload>
              </u-form-item>
            </u-form>
          </view>
        </template>
        <view
          class="form-color"
          v-if="isOther"
        >
          <u-form
            label-width="220"
            label-position="top"
          >
            <u-form-item label="认购书附件">
              <u-upload
                width="180"
                height="180"
                name="files"
                :action="$tool.getUploadUrl()"
                :header="header"
                :show-progress="false"
                :before-upload="beforeUpload"
                :file-list="subFileList"
                :before-remove="beforeRemove"
                @on-success="subscriptionSuccess"
                @on-remove="subscriptionRemove"
              ></u-upload>
            </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="notice-btn safe-area-inset-bottom">
        <u-button
          shape="circle"
          type="primary"
          @click="submit()"
          v-if="isSubmit"
        >保存并预览优惠告知书</u-button>
        <template v-else>
          <view class="edit-btn">
            <u-button
              shape="circle"
              type="error"
              class="ih-btn"
              @click="isRemoveShow = true"
            >删 除</u-button>
            <u-button
              shape="circle"
              type="primary"
              class="ih-btn"
              @click="update()"
            >保 存</u-button>
          </view>
        </template>
      </view>
      <!-- 选择器 -->
      <u-select
        v-model="selectShow"
        :list="selectList"
        safe-area-inset-bottom
        title="选择优惠折扣方式"
        value-name="valueObj"
        label-name="modeDescription"
        :default-value="[0]"
        @confirm="selectConfirm"
      ></u-select>
      <u-select
        v-model="buildSelectShow"
        :list="buildSelectList"
        safe-area-inset-bottom
        title="选择栋座"
        value-name="buildingId"
        label-name="buildingName"
        @confirm="buildConfirm"
      ></u-select>
      <u-select
        v-model="roomSelectShow"
        :list="roomSelectList"
        safe-area-inset-bottom
        title="选择房号"
        value-name="roomId"
        label-name="roomNo"
        @confirm="roomConfirm"
      ></u-select>
      <!-- 模态框 -->
      <u-modal
        v-model="isOtherShow"
        content="修改优惠折扣说明需要提供正确的材料附件，请悉知"
        confirm-color="#fa3534"
        @confirm="otherConfirm"
      ></u-modal>
      <u-modal
        v-model="isRemoveShow"
        content="优惠告知书创建3天仍未签署的才可以删除, 确认删除此优惠告知书吗?"
        show-cancel-button
        confirm-color="#fa3534"
        :async-close="true"
        @confirm="removeConfirm"
      ></u-modal>
      <u-modal
        v-model="isShowRoomTip"
        content="已有相同房号的优惠告知书，是否要继续生成?"
        show-cancel-button
        confirm-color="#fa3534"
        @confirm="isUpdate ? updateMethod() : submieMethod()"
      ></u-modal>
    </view>
  </LoginPage>
</template>

<script>
import {
  phoneValidator,
  validIdentityCard,
  noTrim,
  isNumberValidato,
} from "../../common/validate.js";
import storageTool from "../../common/storageTool.js";
import { getAllByTypeApi } from "../../api/index.js";
import {
  getMannerListByTermId,
  postBuildByProId,
  postRoomByProId,
  postNoticeCreate,
  getNoticeInfo,
  postNoticeUpdate,
  postCheckRoom,
  postNoticeDelete,
  getRecognizeById,
  postDelFile,
} from "../../api/staff";

export default {
  name: "notice-create",
  data() {
    return {
      isSubmit: true,
      proId: null,
      selectShow: false,
      isRecognize: false,
      selectList: [],
      buildSelectShow: false,
      buildSelectList: [],
      roomSelectShow: false,
      roomSelectList: [],
      isOther: false,
      isType: true,
      form: {
        channel: "CustomerService",
        cycleId: null,
        cycleName: null,
        promotionMethod: null,
        manner: "",
        explain: "",
        paymentAmount: "",
        buyUnit: "",
        buyUnitName: "",
        roomNumberId: "",
        roomNumberName: "",
        ownerType: "Personal",
        refundDays: null,
        templateType: null,
        ownerList: [],
        noticeAttachmentList: [],
        reviewStatus: "",
        exPreferentialItem: 1,
      },
      baseRules: {
        cycleName: [
          { required: true, message: "请选择项目联动周期", trigger: "change" },
        ],
        manner: [
          { required: true, message: "请选择优惠折扣方式", trigger: "change" },
        ],
        explain: [
          { required: true, message: "请输入优惠说明", trigger: "change" },
        ],
        paymentAmount: [
          { required: true, message: "请输入服务费金额", trigger: "change" },
          { validator: noTrim, trigger: "change" },
          {
            pattern: /^\d+$|^\d*\.\d+$/g,
            message: "金额只能输入数字和小数点",
            trigger: "change",
          },
        ],
      },
      roomRules: {
        buyUnitName: [
          {
            required: true,
            message: "请选择栋座",
            trigger: "change",
          },
        ],
        roomNumberName: [
          {
            required: true,
            message: "请选择房号",
            trigger: "change",
          },
        ],
      },
      enterpriseFrom: {
        ownerCertificateNo: null,
        ownerMobile: null,
        ownerName: null,
      },
      enterpriseRules: {
        ownerName: [
          { required: true, message: "请输入公司名称", trigger: "change" },
        ],
        ownerMobile: [
          { required: true, message: "请输入经办人号码", trigger: "change" },
          { validator: isNumberValidato, trigger: "change" },
          { max: 12, message: "长度不能超过12位", trigger: "change" },
        ],
        ownerCertificateNo: [
          { required: true, message: "请输入营业执照编号", trigger: "change" },
          {
            pattern: /^[A-Za-z0-9]{18}$/,
            message: "请输入正确的18位营业执照编号",
            trigger: "change",
          },
        ],
      },
      ownerInfo: [
        {
          ownerName: "",
          ownerMobile: "",
          ownerCertificateNo: "",
        },
      ],
      personRules: {
        ownerName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change",
          },
        ],
        ownerMobile: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "change",
          },
          { validator: phoneValidator, trigger: "change" },
        ],
        ownerCertificateNo: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "change",
          },
          { validator: validIdentityCard, trigger: "change" },
        ],
      },
      header: {
        Authorization: "bearer " + storageTool.getToken(),
      },
      subscriptionFile: [],
      subFileList: [],
      fileList: [],
      isRemoveShow: false,
      isShowRoomTip: false,
      isUpdate: false,
      distri: [],
      isOtherShow: false,
    };
  },
  filters: {
    filterDict(type, data) {
      const item = data.find((i) => i.code === type);
      return item ? item.name : "";
    },
  },
  methods: {
    addOwner() {
      this.ownerInfo.push({
        ownerName: "",
        ownerMobile: "",
        ownerCertificateNo: "",
      });
      this.$nextTick(() => {
        this.$refs.uForm[this.ownerInfo.length - 1].setRules(this.personRules);
      });
    },
    subtractOwner(i) {
      this.ownerInfo.splice(i, 1);
    },
    refForm(index, err) {
      let res = new Promise((resolve, reject) => {
        this.$refs.uForm[index].validate((valid) => {
          if (valid) {
            resolve();
          } else {
            reject(err);
          }
        });
      });
      this.arr.push(res);
    },
    changeOwner(val) {
      if (val === "Enterprise") {
        this.$nextTick(() => {
          this.$refs.enterprise.setRules(this.enterpriseRules);
        });
      }
      this.form.noticeAttachmentList = [];
    },
    handleClick() {
      getApp().globalData.searchParams = {
        api: "postTermApi",
        key: "termName",
        id: "termId",
        type: "term",
        other: {
          auditEnums: [
            "TermAdopt",
            "ConstractWait",
            "ConstractConduct",
            "ConstractAdopt",
            "ConstractReject",
          ],
          excludeChargeEnum: "Agent",
        },
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    otherConfirm() {
      this.isOther = true;
      this.form.promotionMethod = "Manual";
      this.form.manner = "自定义";
      this.form.exPreferentialItem = 1;
      this.form.explain = null;
      this.form.paymentAmount = "";
    },
    selectConfirm(val) {
      let item = val[0];
      if (item.value.premiumReceived === "other") {
        this.isOtherShow = true;
      } else {
        this.isOther = false;
        this.form.promotionMethod = "Automatic";
        this.form.manner = item.label;
        this.form.explain = item.label;
        this.form.paymentAmount = item.value.premiumReceived;
        this.form.exPreferentialItem = item.value.exPreferentialItem;
      }
    },
    handleShowSelect() {
      if (!this.form.cycleId) {
        this.$tool.toast("请先选择联动周期");
        return;
      }
      this.selectShow = true;
    },
    async getMannerList() {
      const list = [
        {
          modeDescription: "自定义",
          valueObj: {
            premiumReceived: "other",
            exPreferentialItem: 1,
          },
        },
      ];
      let res = await getMannerListByTermId({ id: this.form.cycleId });

      if (this.form.channel === "CustomerService") {
        this.selectList = res
          .map((i) => {
            return {
              modeDescription: i.modeDescription,
              valueObj: {
                premiumReceived: i.premiumReceived,
                exPreferentialItem: i.exPreferentialItem,
              },
            };
          })
          .concat(list);
      }
    },
    buildConfirm(val) {
      let item = val[0];
      this.form.buyUnitName = item.label;
      this.form.buyUnit = item.value;
      this.form.roomNumberName = "";
      this.form.roomNumberId = null;
      this.getRoomList();
    },
    handleShowBuild() {
      if (!this.proId) {
        this.$tool.toast("请先选择联动周期");
        return;
      }
      this.buildSelectShow = true;
    },
    async getBuildList() {
      this.buildSelectList = await postBuildByProId({ proId: this.proId });
    },
    roomConfirm(val) {
      let item = val[0];
      this.form.roomNumberId = item.value;
      this.form.roomNumberName = item.label;
    },
    handleShowRoom() {
      if (!this.proId) {
        this.$tool.toast("请先选择联动周期");
        return;
      }
      this.roomSelectShow = true;
    },
    async getRoomList() {
      this.roomSelectList = [];
      this.roomSelectList = await postRoomByProId({
        proId: this.proId,
        buildingId: this.form.buyUnit,
        exDeal: 0,
      });
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
      this.form.noticeAttachmentList[index] = {
        fileNo: lists[index].response.data[0].fileId,
        attachmentSuffix:
          lists[index].response?.data[0].generateFileName +
          "." +
          lists[index].response?.data[0].generateFileType,
        type: "NoticeAttachment",
      };
    },
    beforeRemove(index, lists) {
      if (lists[index].response) {
        return true;
      } else {
        return false;
      }
    },
    removeChange(index, lists, name) {
      this.form.noticeAttachmentList.splice(index, 1);
    },
    subscriptionSuccess(data, index, lists, name) {
      this.subscriptionFile[index] = {
        fileNo: lists[index].response.data[0].fileId,
        attachmentSuffix:
          lists[index].response?.data[0].generateFileName +
          "." +
          lists[index].response?.data[0].generateFileType,
        type: "Subscription",
      };
    },
    beforeSubRemove(index, lists) {
      let url = lists[0].url;
      let number = url.lastIndexOf("/");
      let fileNo = url.substring(number + 1, url.length);
      console.log(index, lists, fileNo);
      return new Promise((resolve, reject) => {
        postDelFile(fileNo)
          .then(resolve())
          .catch((err) => {
            reject(0);
          });
      });
    },
    subscriptionRemove(index, lists, name) {
      this.subscriptionFile.splice(index, 1);
    },
    dataVerify() {
      this.arr = [];
      const baseRes = new Promise((resolve, reject) => {
        this.$refs.baseFrom.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      const roomRes = new Promise((resolve, reject) => {
        this.$refs.roomFrom.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      this.arr.push(baseRes, roomRes);
      if (this.form.ownerType === "Personal") {
        this.ownerInfo.forEach((v, i) => {
          this.refForm(i, this.ownerInfo[i]);
        });
        this.form.templateType = this.isType
          ? "ElectronicTemplate"
          : "PaperTemplate";
        this.form.ownerList = this.ownerInfo;
      } else {
        const enterprise = new Promise((resolve, reject) => {
          this.$refs.enterprise.validate((val) => {
            val ? resolve() : reject(err);
          });
        });
        this.arr.push(enterprise);
        this.form.templateType = "PaperTemplate";
        this.form.ownerList = [{ ...this.enterpriseFrom }];
      }
      return this.arr;
    },
    submit() {
      this.$refs.roomFrom.setRules(this.roomRules);
      let verifyArr = this.dataVerify();
      Promise.all(verifyArr)
        .then(async () => {
          console.log("全部通过", this.form);
          if (this.isOther && !this.subscriptionFile.length) {
            this.$tool.toast("认购书附件不能为空");
            return;
          }
          if (this.isRecognize) {
            // 认筹阶段不需要判断房号
            this.submieMethod();
          } else {
            try {
              let isBool = await this.isShowTis(this.form.roomNumberId);
              if (isBool) {
                this.submieMethod();
              } else {
                this.isShowRoomTip = true;
                this.isUpdate = false;
              }
            } catch (error) {
              console.log(error);
            }
          }
        })
        .catch(() => {
          console.log("不通过");
        });
    },
    update() {
      this.$refs.roomFrom.setRules(this.roomRules);
      let verifyArr = this.dataVerify();
      Promise.all(verifyArr)
        .then(async () => {
          console.log("全部通过", this.form);
          if (this.isOther && !this.subscriptionFile.length) {
            this.$tool.toast("认购书附件不能为空");
            return;
          }
          if (this.isRecognize) {
            // 认筹阶段不需要判断房号
            this.updateMethod();
          } else {
            try {
              let isBool = await this.isShowTis(this.form.roomNumberId);
              if (isBool) {
                this.updateMethod();
              } else {
                this.isShowRoomTip = true;
                this.isUpdate = true;
              }
            } catch (error) {
              console.log(error);
            }
          }
        })
        .catch(() => {
          console.log("不通过");
        });
    },
    async submieMethod() {
      try {
        this.form.noticeAttachmentList = this.form.noticeAttachmentList.concat(
          this.subscriptionFile
        );
        const res = await postNoticeCreate(this.form);
        this.$tool.toast("保存成功");
        if (this.form.templateType === "ElectronicTemplate") {
          uni.redirectTo({
            url: `/staffPackage/noticePreview/index?id=${res.noticeId}&tId=${res.templateId}&type=Notification`,
          });
        } else {
          this.$tool.back(null, { type: "init", page: null });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async updateMethod() {
      this.form.ownerEditList = this.form.ownerList;
      let list = this.form.noticeAttachmentList.filter((i) => !!i);
      let subList = this.subscriptionFile.filter((i) => !!i);
      list = list.concat(subList);
      try {
        const res = await postNoticeUpdate({
          ...this.form,
          notificationStatus: "WaitBeSigned",
          noticeAttachmentList: list,
          exDeal: 0,
        });
        this.$tool.toast("保存成功");
        if (this.form.templateType === "ElectronicTemplate") {
          uni.redirectTo({
            url: `/staffPackage/noticePreview/index?id=${this.form.noticeId}&tId=${res.templateId}&type=Notification`,
          });
        } else {
          this.$tool.back(null, {
            type: "update",
            data: {
              ...this.form,
              id: this.form.noticeId,
              notificationStatus: "WaitBeSigned",
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async isShowTis(roomNumberId) {
      const is = await postCheckRoom(roomNumberId);
      return is;
    },
    async removeConfirm() {
      try {
        await postNoticeDelete({ id: this.form.noticeId });
        this.isRemoveShow = false;
        this.$tool.toast("删除成功");
        this.$tool.back(null, { type: "init", page: null });
      } catch (error) {
        console.log(error);
        this.isRemoveShow = false;
      }
    },
    async getDictList(type) {
      const list = await getAllByTypeApi({ type });
      return list;
    },
    async getInfo(id) {
      const info = await getNoticeInfo({ id });
      console.log(info);
      this.form = {
        channel: info.channel,
        cycleId: info.cycleId,
        cycleName: info.cycleName,
        promotionMethod: info.promotionMethod,
        manner: info.explain,
        explain: info.explain,
        paymentAmount: info.paymentAmount + "",
        buyUnit: info.buyUnit,
        buyUnitName: info.buyUnitName || "",
        roomNumberId: info.roomNumberId,
        roomNumberName: info.roomNumberName || "",
        ownerType: info.ownerType,
        templateType: info.templateType,
        ownerList: info.ownerList,
        noticeId: info.id,
        templateId: info.templateId,
        refundDays: info.refundDays,
        noticeAttachmentList: [],
        reviewStatus: info.reviewStatus,
      };
      info.ownerType === "Personal"
        ? (this.ownerInfo = info.ownerList)
        : (this.enterpriseFrom = info.ownerList[0]);
      this.proId = info.projectId;
      // 是否电子版
      this.isType = info.templateType === "ElectronicTemplate";
      this.fileList = info.noticeAttachmentList
        .filter((i) => i.type === "NoticeAttachment")
        .map((val) => ({
          url: this.$tool.getFileUrl(val.fileNo),
        }));
      // 是不是自定义
      if (info.promotionMethod === "Manual") {
        this.isOther = true;
        this.form.manner = "自定义";
        this.subFileList = info.subscriptionAnnex.map((val) => ({
          ...val,
          url: this.$tool.getFileUrl(val.fileNo),
        }));
      }
      try {
        this.isRecognize = await getRecognizeById(info.cycleId);
      } catch (error) {
        console.log(error);
      }
      this.roomRules = {
        buyUnitName: [
          {
            required: !this.isRecognize,
            message: "请选择栋座",
            trigger: "change",
          },
        ],
        roomNumberName: [
          {
            required: !this.isRecognize,
            message: "请选择房号",
            trigger: "change",
          },
        ],
      };
      this.getMannerList();
      this.getBuildList();
      this.getRoomList();
    },
  },
  onReady() {
    this.$refs.baseFrom.setRules(this.baseRules);
    this.$refs.roomFrom.setRules(this.roomRules);
    if (this.form.ownerType === "Personal") {
      this.$refs.uForm[0].setRules(this.personRules);
    } else {
      this.$refs.enterprise.setRules(this.enterpriseRules);
    }
  },
  onShow() {
    let item = getApp().globalData.searchBackData;
    if (item) {
      switch (item.type) {
        case "term":
          this.form.cycleId = item.data.termId;
          this.form.cycleName = item.data.termName;
          this.proId = item.data.proId;
          this.form.refundDays = item.data.partyARefundDays;
          this.isRecognize = item.data.termStageEnum === "Recognize";
          this.roomRules = {
            buyUnitName: [
              {
                required: !this.isRecognize,
                message: "请选择栋座",
                trigger: "change",
              },
            ],
            roomNumberName: [
              {
                required: !this.isRecognize,
                message: "请选择房号",
                trigger: "change",
              },
            ],
          };
          // 根据周期的不同 清空根据周期刷选的条件
          Object.assign(this.form, {
            buyUnit: "",
            buyUnitName: "",
            roomNumberId: "",
            roomNumberName: "",
            manner: "",
            explain: "",
            paymentAmount: "",
          });
          this.getMannerList();
          this.getBuildList();
          this.getRoomList();
          // 清空搜索出来周期
          getApp().globalData.searchBackData = {};
          break;

        default:
          break;
      }
    }
  },
  async onLoad(option) {
    this.isSubmit = true;
    this.distri = await this.getDictList("ReviewStatus");
    if (option.id) {
      this.getInfo(option.id);
      uni.setNavigationBarTitle({
        title: "修改优惠告知书",
      });
      this.isSubmit = false;
    }
  },
  // onHide() {
  //   // 清空搜索出来周期
  //   getApp().globalData.searchBackData = {};
  // },
};
</script>

<style lang="scss" scoped>
.notice {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-info {
    padding: 40rpx 30rpx;
    background: #fff;
    .title {
      font-size: 40rpx;
      font-weight: bold;
      display: flex;
      align-items: center;
      &-text {
        margin-left: 20rpx;
      }
    }
  }
}
.form-title {
  margin-top: 20rpx;
  height: 92rpx;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24rpx;
  color: $u-type-primary;
  font-family: "Source Han Sans CN";
}
.form-content {
  padding: 20rpx 30rpx 110rpx;
  .form-color {
    background: #fff;
    &:nth-child(2),
    &:nth-child(3) {
      margin-top: 30rpx;
    }
  }
}
.owner-tilte {
  display: flex;
  padding: 10rpx 0;
  justify-content: flex-end;
  &-right {
    color: $u-type-error;
  }
}
.form-layout {
  display: flex;
  align-items: center;
  background: #fff;
  .owner-msg {
    flex: 1;
  }
  .owner-icon {
    padding: 8rpx;
  }
  & + & {
    margin-top: 30rpx;
  }
}
.notice-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90rpx;
  box-sizing: content-box;
  padding-top: 10rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background: #fff;
  z-index: 10;
}
.edit-btn {
  display: flex;
  .ih-btn {
    flex: 1;
  }
  .ih-btn + .ih-btn {
    padding-left: 20rpx;
  }
}
</style>
<style lang="scss">
.form-color,
.form-layout {
  .u-form-item {
    padding-left: 20rpx !important;
    padding-right: 20rpx !important;
  }
}
</style>
