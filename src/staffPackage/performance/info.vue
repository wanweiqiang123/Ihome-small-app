<!--
 * @Description: 业绩申报-详情
 * @version: 
 * @Author: lsj
 * @Date: 2021-02-09 15:47:25
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-20 17:44:36
-->
<template>
  <view class="performance">
    <view class="form-content">
      <view class="performance-form">
        <view class="form-title u-border-bottom">成交信息</view>
        <u-form :model="postData" ref="uForm" label-width="190">
          <u-form-item
            label="项目周期"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              disabled
              v-model="postData.cycleName"
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item
            label="细分业务模式"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.refineModelName"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item
            label="成交阶段"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.stageName"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item
            label="物业类型"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.propertyTypeName"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item
            label="栋 座"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.buildingName"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item
            label="房 号"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.roomNo"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item
            label="合同类型"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.contTypeName"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal'"
            label="公司类型"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.companyKindName"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal'"
            label="渠道公司"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.agencyName"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal'"
            label="经纪人"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.brokerName"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal'"
            label="渠道分销合同"
            class="hide-icon"
            right-icon="arrow-right" prop="contNo">
            <u-input
              v-model="postData.contTitle"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item label="认购价格" prop="subscribePrice">
            <u-input
              disabled
              v-model="postData.subscribePrice"/>
          </u-form-item>
          <u-form-item
            label="认购日期"
            class="hide-icon"
            right-icon="arrow-right" prop="subscribeDate">
            <u-input
              v-model="postData.subscribeDate"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
          <u-form-item label="签约价格" prop="signPrice">
            <u-input
              disabled
              v-model="postData.signPrice"
              placeholder=" "/>
          </u-form-item>
          <u-form-item
            label="签约日期"
            class="hide-icon"
            right-icon="arrow-right" prop="signDate">
            <u-input
              v-model="postData.signDate"
              disabled
              placeholder=" "
              type="select"/>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">
          <text>优惠告知书信息</text>
        </view>
        <u-form label-width="170">
          <u-form-item
            :label="getDictName(item.notificationType, NotificationTypeList)"
            v-for="(item, index) in postData.offerNoticeVO" :key="index">
            <view>{{item.noticeNo}}</view>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">
          <text>客户信息</text>
        </view>
        <u-form label-width="170">
          <u-form-item
            :label="item.customerName"
            v-for="(item, index) in postData.customerVO" :key="index">
            <view>{{item.customerPhone}}</view>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">收派金额</view>
        <view v-if="postData.serviceReceiveVO.length">
          <view
            class="receive-wrapper"
            v-for="(item, index) in postData.serviceReceiveVO" :key="index">
            <view class="left">
              <view class="title">{{item.partyACustomerName}}</view>
              <view :class="item.packageId ? 'name active-package' : 'name'">
                {{item.packageId ? "收派标准" : "请选择收派标准"}}
              </view>
            </view>
            <view class="right">
              <u-icon name="arrow-right" color="#C0C4CC" size="30"></u-icon>
            </view>
          </view>
        </view>
        <view v-if="postData.agentReceiveVO.length">
          <view
            class="receive-wrapper"
            v-for="(item, index) in postData.agentReceiveVO" :key="index">
            <view class="left">
              <view class="title">{{item.partyACustomerName}}</view>
              <view :class="item.packageId ? 'active-package name' : 'name'">
                {{item.packageId ? "收派标准" : "请选择收派标准"}}
              </view>
            </view>
            <view class="right">
              <u-icon name="arrow-right" color="#C0C4CC" size="30"></u-icon>
            </view>
          </view>
        </view>
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
            <u-td>{{serviceTotal.receivableAmout}}</u-td>
            <u-td>{{serviceTotal.sendAmount}}</u-td>
            <u-td>{{serviceTotal.sendInAmount}}</u-td>
          </u-tr>
          <u-tr>
            <u-td>代理费</u-td>
            <u-td>{{agentTotal.receivableAmout}}</u-td>
            <u-td>{{agentTotal.sendAmount}}</u-td>
            <u-td>{{agentTotal.sendInAmount}}</u-td>
          </u-tr>
          <u-tr>
            <u-td>合计</u-td>
            <u-td>{{$tool.add(serviceTotal.receivableAmout, agentTotal.receivableAmout)}}</u-td>
            <u-td>{{$tool.add(serviceTotal.sendAmount, agentTotal.sendAmount)}}</u-td>
            <u-td>{{$tool.add(serviceTotal.sendInAmount, agentTotal.sendInAmount)}}</u-td>
          </u-tr>
        </u-table>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">上传附件</view>
        <view class="annex-list-wrapper" v-for="(item, infoIndex) in postData.documentVO" :key="item.id">
          <view class="annex-type">{{item.name}}</view>
          <view class="upload-file-wrapper">
            <template v-if="item.fileList.length > 0">
              <view class="file-list-wrapper" v-for="list in item.fileList" :key="list.fileId">
                <u-image
                  @click="viewImg(list, item)"
                  width="100%" height="100%" :src="list.fileUrls ? list.fileUrls : getUrl(list.fileId)"></u-image>
              </view>
            </template>
          </view>
        </view>
      </view>
    </view>
    <view class="performance-btn">
      <u-button shape="circle" type="primary" @click="handleBack">返回</u-button>
    </view>
  </view>
</template>

<script>
import {
  get_deal_get__id,
  post_notice_customer_information
} from "@/api/staff";
import {getAllDictByType, getAllByTypeApi} from "@/api/index";
import tool from "@/common/tool";
export default {
  name: "performanceInfo",
  data() {
    return {
      pdfImg: require('@/channelPackage/common/img/pdf.jpg'),
      excelImg: require('@/channelPackage/common/img/excel.png'),
      wordImg: require('@/channelPackage/common/img/word.jpg'),
      id: null, // 成交id-编辑用
      dictObj: {
        types: [
          "BusinessModel",
          "ContType",
          "Subdivide",
          "Property",
          "DealFileType",
          "DealStage",
          "ChannelLevel",
          "DealFileType",
          "FeeType",
          "NotificationType"
        ]
      }, // 需要用到的字典类型参数
      SubdivideList: [],
      DealStageList: [],
      PropertyList: [],
      ContTypeList: [],
      AgencyTypeList: [],
      DealFileTypeList: [],
      NotificationTypeList: [],
      FeeTypeList: [],
      dictList: null, // 部分字典数据
      postData: {
        cycleId: '', // 接口用到的id
        cycleName: '',
        modelCode: '',
        refineModel: '',
        refineModelName: '',
        stage: '',
        stageName: '',
        propertyType: '',
        propertyTypeName: '',
        buildingId: '',
        buildingName: '',
        roomNo: '', // 房号
        roomId: '', // 房号ID
        contType: '',
        contTypeName: '',
        agencyType: '',
        companyKindName: '',
        contNo: '',
        contTitle: '',
        recordStr: '',
        subscribePrice: '',
        subscribeDate: '',
        signPrice: '',
        signDate: '',
        dealOrgName: '',
        dealOrgId: '',
        isMat: '',
        agencyId: '', // 渠道公司Id
        agencyName: '', // 渠道公司
        channelLevel: '', // 渠道等级Id
        channelLevelName: '', // 渠道等级
        brokerId: '', // 渠道经纪人Id
        brokerName: '', // 渠道经纪人
        recordState:'',
        area: '',
        room: '',
        hall: '',
        toilet: '',
        propertyNo: '',
        signType: '',
        returnRatio: '',
        dataSign: '',
        oneAgentTeam: '',
        oneAgentTeamId: '',
        offerNoticeVO: [], // 优惠告知书
        customerVO: [], // 客户信息
        agencyVO: [], // 渠道信息
        agentReceiveVO: [], // 收派金额 --- 代理费vo
        serviceReceiveVO: [], // 收派金额 --- 服务费vo
        receiveAchieveVO: [], // 应收信息
        documentVO: [], // 附件信息
      },
    };
  },
  computed: {
    serviceTotal() {
      let obj = {
        receivableAmout: 0, // 本单应收 - 服务费
        sendAmount: 0,
        sendInAmount: 0,
        achieveAmount: 0, // 本单业绩 - 服务费
        otherChannelFees: 0, // 其他渠道费用 - 服务费
      }
      // this.$tool.addArr(arr)
      let receivableAmoutArr = [];
      let sendAmountArr = [];
      let sendInAmountArr = [];
      let achieveAmountArr = [];
      let otherChannelFeesArr = [];
      if (this.postData.serviceReceiveVO && this.postData.serviceReceiveVO.length) {
        this.postData.serviceReceiveVO.forEach((vo) => {
          if (vo.receiveAmount) {
            receivableAmoutArr.push(vo.receiveAmount);
          }
          if (vo.commAmount) {
            sendAmountArr.push(vo.commAmount);
            achieveAmountArr.push(vo.commAmount);
          }
          if (vo.rewardAmount) {
            sendInAmountArr.push(vo.rewardAmount);
            achieveAmountArr.push(vo.rewardAmount);
          }
          if (vo.totalPackageAmount) {
            achieveAmountArr.push(vo.totalPackageAmount);
          }
          if (vo.distributionAmount) {
            achieveAmountArr.push(vo.distributionAmount);
          }
          if (vo.otherChannelFees) {
            otherChannelFeesArr.push(vo.otherChannelFees);
          }
        });
        obj = {
          receivableAmout: receivableAmoutArr.length ? this.$tool.addArr(receivableAmoutArr) : 0,
          sendAmount: sendAmountArr.length ? this.$tool.addArr(sendAmountArr) : 0,
          sendInAmount: sendInAmountArr.length ? this.$tool.addArr(sendInAmountArr) : 0,
          achieveAmount: achieveAmountArr.length ? this.$tool.addArr(achieveAmountArr) : 0,
          otherChannelFees: otherChannelFeesArr.length ? this.$tool.addArr(otherChannelFeesArr) : 0,
        }
      }
      return obj;
    },
    agentTotal() {
      let obj = {
        receivableAmout: 0, // 本单应收 - 代理费
        sendAmount: 0,
        sendInAmount: 0,
        achieveAmount: 0, // 本单业绩 - 代理费
        otherChannelFees: 0, // 其他渠道费用 - 代理费
      }
      // this.$tool.addArr(arr)
      let receivableAmoutArr = [];
      let sendAmountArr = [];
      let sendInAmountArr = [];
      let achieveAmountArr = [];
      let otherChannelFeesArr = [];
      if (this.postData.agentReceiveVO && this.postData.agentReceiveVO.length) {
        this.postData.agentReceiveVO.forEach((vo) => {
          if (vo.receiveAmount) {
            receivableAmoutArr.push(vo.receiveAmount);
          }
          if (vo.commAmount) {
            sendAmountArr.push(vo.commAmount);
            achieveAmountArr.push(vo.commAmount);
          }
          if (vo.rewardAmount) {
            sendInAmountArr.push(vo.rewardAmount);
            achieveAmountArr.push(vo.rewardAmount);
          }
          if (vo.totalPackageAmount) {
            achieveAmountArr.push(vo.totalPackageAmount);
          }
          if (vo.distributionAmount) {
            achieveAmountArr.push(vo.distributionAmount);
          }
          if (vo.otherChannelFees) {
            otherChannelFeesArr.push(vo.otherChannelFees);
          }
        });
        obj = {
          receivableAmout: receivableAmoutArr.length ? this.$tool.addArr(receivableAmoutArr) : 0,
          sendAmount: sendAmountArr.length ? this.$tool.addArr(sendAmountArr) : 0,
          sendInAmount: sendInAmountArr.length ? this.$tool.addArr(sendInAmountArr) : 0,
          achieveAmount: achieveAmountArr.length ? this.$tool.addArr(achieveAmountArr) : 0,
          otherChannelFees: otherChannelFeesArr.length ? this.$tool.addArr(otherChannelFeesArr) : 0,
        }
      }
      return obj;
    }
  },
  async onLoad(option) {
    // 获取公司类型选项
    await this.getCompanyTypeList();
    this.dictList = await this.getAllDictByTypes(this.dictObj);
    this.SubdivideList = await this.getSignDict("Subdivide");
    this.DealStageList = await this.getSignDict("DealStage");
    this.PropertyList = await this.getSignDict("Property");
    this.ContTypeList = await this.getSignDict("ContType");
    this.DealFileTypeList = await this.getSignDict("DealFileType");
    this.NotificationTypeList = await this.getSignDict("NotificationType");
    this.FeeTypeList = await this.getSignDict("FeeType");
    if (option && option.id) {
      await this.init(option.id);
    }
  },
  methods: {
    // 获取公司类型
    async getCompanyTypeList() {
      this.AgencyTypeList = await getAllByTypeApi({
        tag:"Channel",
        type:"CompanyKind",
        valid:"Valid",
      });
    },
    // 初始化页面
    async init(id) {
      let info  = await get_deal_get__id({id: id});
      console.log(info);
      this.postData.cycleName = info?.cycleName;
      this.postData.refineModelName = info?.refineModel ? this.getDictName(info?.refineModel, this.SubdivideList) : '';
      this.postData.refineModel = info?.refineModel ? info?.refineModel : '';
      this.postData.stageName = info?.stage ? this.getDictName(info?.stage, this.DealStageList) : '';
      this.postData.stage = info?.stage ? info?.stage : '';
      this.postData.propertyTypeName = info?.house?.propertyType ? this.getDictName(info?.house?.propertyType, this.PropertyList) : '';
      this.postData.buildingName = info?.house?.buildingName ? info?.house?.buildingName : '';
      this.postData.buildingId = info?.house?.buildingId ? info?.house?.buildingId : '';
      this.postData.roomNo = info?.house?.roomNo ? info?.house?.roomNo : '';
      this.postData.contTypeName = info?.contType ? this.getDictName(info?.contType, this.ContTypeList) : '';
      this.postData.contType = info?.contType ? info?.contType : '';
      this.postData.contNo = info?.contNo ? info?.contNo : '';
      this.postData.contTitle = info?.contTitle ? info?.contTitle : '';
      this.postData.recordStr = info?.recordStr ? info?.recordStr : '';
      if (info.agencyList && info.agencyList.length) {
        this.postData.agencyName = info.agencyList[0].agencyName;
        this.postData.brokerName = info.agencyList[0].broker;
        this.postData.companyKindName = info.agencyList[0].companyKind ? this.getDictName(info.agencyList[0].companyKind, this.AgencyTypeList) : '';
      }
      this.postData.subscribeDate = info?.subscribeDate ? info?.subscribeDate : '';
      this.postData.subscribePrice = info?.subscribePrice ? info?.subscribePrice : '';
      this.postData.signDate = info?.signDate ? info?.signDate : '';
      this.postData.signPrice = info?.signPrice ? info?.signPrice : '';
      // 优惠告知书
      await this.getInformation(info?.id);
      // 客户
      this.postData.customerVO = info.customerList;
      // 收派金额
      this.postData.agentReceiveVO = [];
      this.postData.serviceReceiveVO = [];
      if (info.receiveList && info.receiveList.length) {
        info.receiveList.forEach((list) => {
          if (list.type === "AgencyFee") {
            this.postData.agentReceiveVO.push(list);
          }
          if (list.type === "ServiceFee") {
            this.postData.serviceReceiveVO.push(list);
          }
        });
      }
      // 附件
      this.postData.documentVO = [];
      if (info.documentList && info.documentList.length) {
        this.postData.documentVO = this.initDocumentList(info.documentList);
      }
    },
    // 获取优惠告知书列表
    async getInformation(id = '') {
      if (!id) return ;
      let list = await post_notice_customer_information({dealId: id});
      if (list && list.length > 0) {
        this.postData.offerNoticeVO = list;
      } else {
        this.postData.offerNoticeVO = [];
      }
    },
    // 构建附件信息
    initDocumentList(list = []) {
      let fileList = JSON.parse(JSON.stringify(this.DealFileTypeList)); // 附件类型
      // 附件类型增加key
      if (fileList.length > 0 && list.length > 0) {
        fileList.forEach((vo) => {
          vo.fileList = []; // 存放新上传的数据
          list.forEach((item) => {
            if (vo.code === item.fileType) {
              vo.fileList.push(
                {
                  ...item,
                  fileUrls: this.getFileUrls(item, 'url'), // 获取对应文件的默认图片
                  type: this.getFileUrls(item, 'type'), // 获取文件类型：excel、word、pdf
                  name: item.fileName
                }
              );
            }
          });
        });
      }
      return fileList;
    },
    getFileUrls(file, getType = '') {
      let url = '';
      let type = '';
      if (file.fileId && file.fileName) {
        if (file.fileName.endsWith(".pdf")) {
          // pdf
          url = this.pdfImg;
          type = "pdf";
        } else if (file.fileName.endsWith(".doc")) {
          // word
          url = this.wordImg;
          type = "doc";
        } else if (file.fileName.endsWith(".docx")) {
          // word
          url = this.wordImg;
          type = "docx";
        } else if (file.fileName.endsWith(".xls")) {
          // excel
          url = this.excelImg;
          type = "xls";
        } else if (file.fileName.endsWith(".xlsx")) {
          // excel
          url = this.excelImg;
          type = "xlsx";
        } else {
          // 默认是图片
          url = "";
          type = "";
        }
      }
      if (getType === 'url') {
        // 返回默认文件图片
        return url;
      } else {
        // 返回文件类型
        return type
      }
    },
    // 获取对应类型的字典集合
    async getAllDictByTypes(obj) {
      const dictList = await getAllDictByType(obj);
      return dictList;
    },
    // 获取单个类型字典
    async getSignDict(type = '') {
      let list = [];
      if (this.dictList) {
        Object.keys(this.dictList).forEach((key) => {
          if (key === type) {
            list = this.dictList[key];
          }
        });
      }
      // console.log('getSignDict:', list);
      return list;
    },
    // 获取字典的name
    getDictName(type = "", list = []) {
      let name = '';
      if (type && list && list.length) {
        list.forEach((item) => {
          if (item.code === type) {
            name = item.name;
          }
        });
      }
      return name;
    },
    // 预览图片
    viewImg(file, item) {
      console.log(file);
      console.log(item);
      // return ;
      if (file.fileUrls) {
        // 说明是文件
        this.openFile(file);
      } else {
        // 图片
        let urls = [];
        let current = 0;
        if (item.fileList && item.fileList.length) {
          item.fileList.forEach((list) => {
            if (!list.fileUrls) {
              urls.push(tool.getFileUrl(list.fileId));
            }
          });
        }
        if (urls && urls.length) {
          urls.forEach((item, index) => {
            if (item === tool.getFileUrl(file.fileId)) {
              current = index;
            }
          });
        }
        uni.previewImage({
          urls: urls,
          current: current,
        });
      }
    },
    // 在线打开文件
    openFile(item) {
      if (!item.type) {
        uni.showToast({
          title: '无法打开该文档',
          duration: 3000
        });
        return ;
      }
      uni.downloadFile({
        url: tool.getFileDownloadUrl(item.fileId),
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('下载成功', res.tempFilePath);
            uni.openDocument({
              filePath: res.tempFilePath,
              fileType: item.type,
              showMenu: true,
              success: (res) => {
                console.log('打开文档成功');
              },
              fail: (err) => {
                console.log('打开文档出错', err);
                uni.showToast({
                  title: '无法打开该文档',
                  duration: 3000
                });
              }
            });
          }
        },
        fail: (err) => {
          console.log('下载出错', err);
          uni.showToast({
            title: '下载出错',
            duration: 3000
          });
        }
      });
    },
    // 返回
    handleBack() {
      uni.redirectTo({
        url: "/staffPackage/performance/index",
      });
    },
    // 获取图片完整路径
    getUrl(id) {
      if (!id) return '';
      let url = tool.getFileUrl(id);
      return url;
    },
  }
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
      font-family: "Source Han Sans CN";
    }
    & + & {
      margin-top: 20rpx;
    }

    .receive-wrapper {
      width: 100%;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 14rpx 24rpx;
      //height: 90rpx;
      border-bottom: 1rpx solid #e4e7ed;

      .left {
        flex: 1;

        .title {
          font-size: 14px;
          box-sizing: border-box;
        }

        .name {
          font-size: 12px;
          color: grey;
        }

        .active-package {
          color: $u-type-primary;
          text-decoration: underline;
        }
      }

      .right {

      }
    }

    .annex-list-wrapper {
      width: 100%;
      padding: 0rpx 20rpx 20rpx 20rpx;

      &:not(:last-child) {
        border-bottom: 1rpx solid #F1F1F1;
      }

      .annex-type {
        font-size: 30rpx;
        padding: 20rpx 0rpx 10rpx 0rpx;

        .annex-required {
          //position: absolute;
          //left: -16rpx;
          vertical-align: middle;
          color: #fa3534;
          padding-top: 6rpx;
        }
      }

      .upload-file-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .file-list-wrapper {
          width: 200rpx;
          height: 200rpx;
          margin: 4rpx;
          border-radius: 8rpx;
          position: relative;

          .icon {
            position: absolute;
            top: 4rpx;
            right: 4rpx;
            z-index: 10;
          }
        }

        .upload-icon {
          width: 200rpx;
          height: 200rpx;
          margin: 4rpx;
          border-radius: 8rpx;
          background: #f4f5f6;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .select {
            box-sizing: border-box;
            margin-top: 10rpx;
            font-size: 28rpx;
            color: #606266;
          }
        }
      }
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
    font-family: "Source Han Sans CN";
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
