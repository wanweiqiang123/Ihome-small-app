<!--
 * @Description: 业绩申报
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-26 09:38:11
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-02 11:46:28
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
              v-model="postData.cycleName"
              @click="handleSelectCycle"
              type="select"
              placeholder="请选择项目周期"/>
          </u-form-item>
          <u-form-item
            label="细分业务模式"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.refineModelName"
              :select-open="showRefineModel"
              @click="handleShowRefineModel"
              type="select"
              placeholder="请选择细分业务模式"/>
          </u-form-item>
          <u-form-item
            label="成交阶段"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.stageName"
              :select-open="showStage"
              @click="showStage = true"
              type="select"
              placeholder="请选择成交阶段"/>
          </u-form-item>
          <u-form-item
            label="物业类型"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.propertyTypeName"
              :select-open="showPropertyType"
              @click="showPropertyType = true"
              type="select"
              placeholder="请选择物业类型"/>
          </u-form-item>
          <u-form-item
            label="栋 座"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.buildingName"
              :select-open="showBuild"
              @click="handleShowBuild"
              type="select"
              placeholder="请选择栋座"/>
          </u-form-item>
          <u-form-item
            label="房 号"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.roomNo"
              :select-open="showRoom"
              @click="handleShowRoom"
              type="select"
              placeholder="请选择房号"/>
          </u-form-item>
          <u-form-item
            label="合同类型"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.contTypeName"
              :select-open="showContType"
              @click="handleShowContType"
              type="select"
              placeholder="请选择合同类型"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal'"
            label="分销协议编号"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.contNo"
              :select-open="showContNo"
              @click="showContNo = true"
              type="select"
              placeholder="请选择分销协议编号"/>
          </u-form-item>
          <u-form-item
            v-if="postData.recordStr"
            label="报备信息">
            <u-input disabled v-model="postData.recordStr"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal'"
            label="渠道公司"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.agencyName"
              disabled
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
              type="select"/>
          </u-form-item>
          <u-form-item label="认购价格">
            <u-input
              disabled
              @click="handleInputPrice('subscribePrice')"
              v-model="postData.subscribePrice"
              placeholder="请输入认购价格"/>
          </u-form-item>
          <u-form-item
            label="认购日期"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.subscribeDate"
              :select-open="showDate"
              @click="handleSelectDate('subscribeDate')"
              type="select"
              placeholder="请选择认购日期"/>
          </u-form-item>
          <u-form-item label="签约价格">
            <u-input
              disabled
              @click="handleInputPrice('signPrice')"
              v-model="postData.signPrice"
              placeholder="请输入签约价格"/>
          </u-form-item>
          <u-form-item
            label="签约日期"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.signDate"
              :select-open="showDate"
              @click="handleSelectDate('signDate')"
              type="select"
              placeholder="请选择签约日期"/>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">
          <text>优惠告知书信息</text>
          <view v-if="hasAddNoticeFlag">
            <u-icon name="plus" />添加
          </view>
        </view>
        <u-form label-width="170">
          <u-form-item
            :label="getDictName(item.notificationType, NotificationTypeList)"
            v-for="(item, index) in postData.offerNoticeVO" :key="index">
            <view>{{item.noticeNo}}</view>
            <u-icon slot="right" name="close-circle-fill" color="#fa3534" size="40"></u-icon>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">
          <text>客户信息</text>
          <view>
            <u-icon name="plus" />添加
          </view>
        </view>
        <u-form label-width="170">
          <u-form-item
            :label="item.customerName"
            v-for="(item, index) in postData.customerVO" :key="index">
            <view>{{item.customerPhone}}</view>
            <u-icon slot="right" name="close-circle-fill" color="#fa3534" size="40"></u-icon>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">收派金额</view>
        <view v-if="postData.agentReceiveVO.length">
          <view class="form-title u-border-bottom">代理费套餐</view>
          <u-form label-width="170">
            <u-form-item
              v-for="(item, index) in postData.agentReceiveVO" :key="index"
              :label="item.partyACustomerName">
              <view v-if="item.packageId">收派标准</view>
              <view v-else>请选择收派标准</view>
              <u-icon slot="right" name="arrow-right"></u-icon>
            </u-form-item>
          </u-form>
        </view>
        <view v-if="postData.serviceReceiveVO.length">
          <view class="form-title u-border-bottom">服务费套餐</view>
          <u-form label-width="170">
            <u-form-item
              v-for="(item, index) in postData.serviceReceiveVO" :key="index"
              :label="item.partyACustomerName">
              <view v-if="item.packageId">收派标准</view>
              <view v-else>请选择收派标准</view>
              <u-icon slot="right" name="arrow-right"></u-icon>
            </u-form-item>
          </u-form>
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
        <view class="annex-list-wrapper" v-for="(item, infoIndex) in postData.documentVO" :key="item.id">
          <view class="annex-type">
            <text v-if="item.subType === 'must'"
                  class="annex-required">*</text>
            {{item.name}}
          </view>
          <view class="upload-file-wrapper">
            <template v-if="item.fileList.length > 0">
              <view class="file-list-wrapper" v-for="list in item.fileList" :key="list.fileId">
                <u-icon
                  @click="deleteImg(infoIndex, list)"
                  class="icon" name="close-circle-fill" color="#FA3534" size="50"></u-icon>
                <u-image
                  @click="viewImg(list)"
                  width="100%" height="100%" :src="list.fileUrls ? list.fileUrls : imgUrl + list.fileId"></u-image>
              </view>
            </template>
            <view class="upload-icon" @click="uploadByType(item)">
              <u-icon name="plus" color="#606266" size="40"></u-icon>
              <view class="select">选择文件</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="performance-btn">
      <u-button shape="circle" type="primary">确认</u-button>
    </view>
    <!-- 下拉框 -->
    <u-select
      v-model="showRefineModel"
      :list="refineModelList"
      safe-area-inset-bottom
      title="请选择细分业务模式"
      value-name="code"
      label-name="name"
      @confirm="confirmRefineModel"
    ></u-select>
    <u-select
      v-model="showStage"
      :list="stageList"
      safe-area-inset-bottom
      title="请选择成交阶段"
      value-name="code"
      label-name="name"
      @confirm="confirmStage"
    ></u-select>
    <u-select
      v-model="showPropertyType"
      :list="propertyTypeList"
      safe-area-inset-bottom
      title="请选择物业类型"
      value-name="code"
      label-name="name"
      @confirm="confirmPropertyType"
    ></u-select>
    <u-select
      v-model="showBuild"
      :list="buildSelectList"
      safe-area-inset-bottom
      title="请选择栋座"
      value-name="buildingId"
      label-name="buildingName"
      @confirm="confirmBuild"
    ></u-select>
    <u-select
      v-model="showRoom"
      :list="roomSelectList"
      safe-area-inset-bottom
      title="请选择房号"
      value-name="roomId"
      label-name="roomNo"
      @confirm="confirmRoom"
    ></u-select>
    <u-select
      v-model="showContType"
      :list="ContTypeList"
      safe-area-inset-bottom
      title="请选择合同类型"
      value-name="code"
      label-name="name"
      @confirm="confirmContType"
    ></u-select>
    <u-select
      v-model="showContNo"
      :list="contNoList"
      safe-area-inset-bottom
      title="请选择分销协议"
      value-name="contractNo"
      label-name="contractNo"
      @confirm="confirmContNo"
    ></u-select>
    <u-picker
      v-model="showDate"
      mode="time"
      @confirm="confirmDate"
      :params="params"></u-picker>
    <!-- 数字键盘 -->
    <u-keyboard
      ref="uKeyboard"
      mode="number"
      v-model="keyBoardShow"
      :mask="false"
      @change="keyChange"
      safe-area-inset-bottom
      @backspace="backSpace"
      :show-tips="false"
      :cancel-btn="false"
    ></u-keyboard>
    <u-modal
      @confirm="handleDelete"
      @cancel="showDeleteWin = false"
      :mask-close-able="true"
      :show-cancel-button="true"
      v-model="showDeleteWin" content="您确定要删除此项吗？"></u-modal>
  </view>
</template>

<script>
import {
  post_buModelContType_subList,
  post_buModelContType_getList,
  post_pageData_dealCheckNotice,
  post_pageData_initBasic,
  getBaseDealInfo,
  postBuildByProId,
  postRoomByProId,
} from "@/api/staff";
import {getAllDictByType} from "@/api";
import tool from "@/common/tool";
import {getImgUrl} from "@/api/channel";
export default {
  name: "performanceEdit",
  data() {
    return {
      showDeleteWin: false, // 删除图片提示框
      deleteIndex: null,
      deleteItem: null,
      keyBoardShow: false, // 价格键盘
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
      NotificationTypeList: [],
      FeeTypeList: [],
      dictList: null, // 部分字典数据
      showRefineModel: false,
      refineModelList: [],
      showStage: false,
      stageList: [],
      showPropertyType: false,
      propertyTypeList: [],
      showBuild: false,
      buildSelectList: [],
      showRoom: false,
      roomSelectList: [],
      showContType: false,
      ContTypeList: [],
      showContNo: false,
      showDate: false,
      currentDateType: null, // 当前选择日期的类型
      currentPriceType: null, // 当前输入价格的input框
      params: {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      },
      contNoList: [], // 分销协议列表---initPage接口
      postData: {
        cycleId: null, // 接口用到的id
        cycleName: null,
        modelCode: null,
        refineModel: null,
        refineModelName: null,
        stage: null,
        stageName: null,
        propertyType: null,
        propertyTypeName: null,
        buildingId: null,
        buildingName: null,
        roomNo: null, // 房号
        roomId: null, // 房号ID
        contType: null,
        contTypeName: null,
        contNo: null,
        recordStr: null,
        subscribePrice: '',
        subscribeDate: null,
        signPrice: '',
        signDate: null,
        dealOrgName: null,
        dealOrgId: null,
        isMat: null,
        agencyId: null, // 渠道公司Id
        agencyName: null, // 渠道公司
        channelLevel: null, // 渠道等级Id
        channelLevelName: null, // 渠道等级
        brokerId: null, // 渠道经纪人Id
        brokerName: null, // 渠道经纪人
        recordState:null,
        area:null,
        room:null,
        hall:null,
        toilet:null,
        propertyNo:null,
        signType:null,
        returnRatio:null,
        dataSign:null,
        offerNoticeVO: [], // 优惠告知书
        customerVO: [], // 客户信息
        agencyVO: [], // 渠道信息
        agentReceiveVO: [], // 收派金额 --- 代理费vo
        serviceReceiveVO: [], // 收派金额 --- 服务费vo
        receiveAchieveVO: [], // 应收信息
        documentVO: [], // 附件信息
      },
      packageIdsList: [], // 收派套餐ids：分销模式---选择分销协议后获取；非分销协议---请求接口获取
      baseInfoByTerm: {
        chargeEnum: null,
        proId: null, // 项目id --- 用于查询分销协议列表
        termId: null, // 项目周期id
        termStageEnum: null, // 项目周期阶段
        selectableChannelIds: [], // 可选的渠道商ids
      }, // 通过项目周期id获取到的初始化成交基础信息
      baseInfoInDeal: {
        hasRecord: false,
        contType: null,
        notice: [], // 优惠告知书
        myReturnVO: {
          houseVO: {},
          customerVOS: {},
          dealVO: {},
          dataSign: ''
        }, // 明源数据
        noticePDF: [], // 优惠告知书PDF
        customerIds: [], // 业主身份证
        visitConfirmForms: [], // 来访确认书
        dealConfirmForms: [], // 成交确认书
        customerAddVOS: [], // 客户信息
        selectableChannelIds: [], // 可选的渠道商ids
        dealNoticeStatus: null, // 同房号是否存在多份优惠告知书(NoneNotice-没有优惠告知书、OneNotice-一份优惠告知书、MultipleNotice-多份优惠告知书)
      }, // 通过initPage接口获取到的成交信息(项目周期 + 房号)
      hasAddNoticeFlag: true, // 是否有添加(删除)优惠告知书的标识：true-可以；false-不可以
      action: "",
      fileList: [
        {
          url: "http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg",
        },
      ],
    };
  },
  async onLoad() {
    this.dictList = await this.getAllDictByTypes(this.dictObj);
    this.NotificationTypeList = await this.getSignDict("NotificationType");
    this.FeeTypeList = await this.getSignDict("FeeType");
  },
  async onShow() {
    let item = getApp().globalData.searchBackData;
    // console.log('item', item);
    if (item && item.type === "term") {
      this.postData.cycleId = item.data.termId;
      this.postData.cycleName= item.data.termName;
      await this.getBaseDealInfo(item.data.termId);
      getApp().globalData.searchBackData = {};
    }
  },
  methods: {
    // 选择细分业务模式
    handleShowRefineModel() {
      if (!this.postData.cycleId) {
        this.$tool.toast("请先选择项目周期");
        return;
      }
      if (this.postData.modelCode === "TotalBagDistrModel") {
        this.showRefineModel = true;
      }
    },
    // 确定选择细分业务模式
    confirmRefineModel(item) {
      if (item && item.length) {
        this.postData.refineModelName = item[0].label;
        this.postData.refineModel = item[0].value;
      }
    },
    // 确定选择成交阶段
    confirmStage(item) {
      if (item && item.length) {
        this.postData.stageName = item[0].label;
        this.postData.stage = item[0].value;
      }
    },
    // 确定选择物业类型
    async confirmPropertyType(item) {
      if (item && item.length) {
        this.postData.propertyTypeName = item[0].label;
        this.postData.propertyType = item[0].value;
        this.buildSelectList = await postBuildByProId({
          proId: this.baseInfoByTerm.proId,
          propertyEnum: item[0].value,
        });
        console.log('this.buildSelectList', this.buildSelectList);
      }
    },
    // 选择栋座
    handleShowBuild() {
      if (!this.postData.propertyType) {
        this.$tool.toast("请先选择物业类型");
        return;
      }
      this.showBuild = true;
    },
    // 确定选择栋座
    async confirmBuild(item) {
      if (item && item.length) {
        this.postData.buildingName = item[0].label;
        this.postData.buildingId = item[0].value;
        this.roomSelectList = await postRoomByProId({
          proId: this.baseInfoByTerm.proId,
          buildingId: item[0].value,
          exDeal: 0
        });
        console.log('this.roomSelectList', this.roomSelectList);
      }
    },
    // 选择房号
    handleShowRoom() {
      if (!this.postData.buildingId) {
        this.$tool.toast("请先选择栋座");
        return;
      }
      this.showRoom = true;
    },
    // 确定选择房号
    async confirmRoom(item) {
      if (item && item.length) {
        this.postData.roomNo = item[0].label;
        this.postData.roomId = item[0].value;
        await this.initPageById(this.baseInfoByTerm.termId, item[0].value, this.postData.propertyType);
      }
    },
    // 选择合同类型
    handleShowContType() {
      if (this.baseInfoInDeal.contType === 'DistriDeal' && this.baseInfoInDeal.hasRecord) {
        return ;
      }
      this.showContType = true;
    },
    // 确定合同类型
    async confirmContType(item) {
      console.log(item);
      if (item && item.length) {
        if (item[0].value === "DistriDeal" && !this.baseInfoInDeal.hasRecord && this.postData.roomId) {
          this.$tool.toast("系统查询不到此房号的已成交报备信息，请先维护报备信息！");
          return;
        }
        this.postData.contTypeName = item[0].label;
        this.postData.contType = item[0].value;
        // 初始化收派套餐
        await this.initReceive();
        // 选择房号后构建附件表格数据
        await this.getDocumentList(item[0].value);
        // 判断是否可以手动添加优惠告知书
        await this.canAddNoticeItem(this.baseInfoByTerm.chargeEnum, this.postData.contType, this.baseInfoInDeal.dealNoticeStatus);
      }
    },
    // 确定选择分销协议
    confirmContNo(item) {
      this.postData.isMat = null;
      this.packageIdsList = [];
      let isVoidFlag = false;
      if (item && item.length) {
        this.postData.contNo = item[0].value;
        if (this.contNoList && this.contNoList.length) {
          this.contNoList.forEach((item) => {
            if (item.contractNo === item[0].value) {
              // 是否垫佣
              this.postData.isMat = item.advancementSituation;
              // 分销模式下获取分销协议返回的收派套餐id
              this.packageIdsList = item.packageMxIds && item.packageMxIds.length ? item.packageMxIds : [];
              isVoidFlag = item.voidService;
            }
          });
        }
      }
      // 初始化收派套餐
      this.initReceive();
      // 判断是否可以手动添加优惠告知书
      this.canAddNoticeItem(this.baseInfoByTerm.chargeEnum, this.postData.contType, this.baseInfoInDeal.dealNoticeStatus, isVoidFlag);
    },
    // 选择时间
    handleSelectDate(type) {
      this.currentDateType = type;
      this.showDate = true;
    },
    // 确定选择时间
    confirmDate(item) {
      console.log(item);
      if (this.currentDateType) {
        this.postData[this.currentDateType] = `${item.year}-${item.month}-${item.day}`;
      }
    },
    // 输入价格
    handleInputPrice(type) {
      this.currentPriceType = type;
      this.keyBoardShow = true;
    },
    // 合同类型、分销协议编号、细分业务模式、认购价格、签约价格改变之后要初始化收派金额
    initReceive() {
      if (this.postData.receiveVO.length) {
        this.postData.receiveVO = this.resetReceiveVOS(this.postData.receiveVO);
      }
    },
    // 判断是否可以手动添加优惠告知书
    canAddNoticeItem(charge = '', contType = '', Status = '', isVoidService = null) {
      let postData = {
        charge: charge, // 启动模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)
        contType: contType, // 合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)
        dealNoticeStatus: Status, // 优惠告知书情况(NoneNotice-没有优惠告知书、OneNotice-一份优惠告知书、MultipleNotice-多份优惠告知书)
        isVoidService: isVoidService, // 是否免受服务费
      }
      post_pageData_dealCheckNotice(postData).then((res) => {
        console.log(res);
        this.hasAddNoticeFlag = res;
      }).catch((err) => {
        console.log(err);
        this.hasAddNoticeFlag = false;
      });
    },
    // 重置收派金额信息：去掉id、收派套餐、价格
    resetReceiveVOS(list = []) {
      list.forEach((item) => {
        item.showData = [];
        item.packageId = null;
        item.packgeName = null;
        item.receiveAmount = 0;
        item.commAmount = 0;
        item.rewardAmount = 0;
        item.totalPackageAmount = 0;
        item.distributionAmount = 0;
        item.otherChannelFees = 0;
      });
      return list;
    },
    // 选择项目周期
    handleSelectCycle() {
      getApp().globalData.searchParams = {
        api: "postAllTermApi",
        key: "termName",
        id: "termId",
        type: "term",
        other: {
          auditEnum: 'ConstractAdopt', // 只显示合同审核通过的
          state: 'Start', // 只显示启用
        }
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 通过项目周期id获取基础信息
    async getBaseDealInfo(id = "") {
      if (!id) return;
      let baseInfo = await getBaseDealInfo({cycleId: id});
      console.log('baseInfo', baseInfo);
      this.baseInfoByTerm = JSON.parse(JSON.stringify(baseInfo));
      // 给postData赋值对应数据
      if (baseInfo) {
        this.postData.modelCode = baseInfo.busEnum; // 业务模式code
        this.refineModelList = await this.getRefineModelList(baseInfo.busEnum); // 获取细分业务模式下拉项
        this.postData.refineModel = await this.getRefineModel(baseInfo.busEnum); // 赋值细分业务模式
        this.ContTypeList = await this.getContTypeList(baseInfo.busEnum); // 获取合同类型
        // 是否市场化项目
        this.postData.isMarketProject = baseInfo.exMarket === 1 ? 'Yes' : 'No';
        // 物业类型
        this.propertyTypeList = await this.initPropertyType(baseInfo.propertyEnums);
        // 是否代销
        this.postData.isConsign = baseInfo.exConsignment === 1 ? 'Yes' : 'No';
        // 成交阶段的选项
        this.stageList = [];
        if (baseInfo.termStageEnum) {
          let stageList = await this.getSignDict('DealStage');
          console.log('stageList', stageList);
          if (stageList && stageList.length > 0) {
            switch(baseInfo.termStageEnum){
              case 'Subscription':
                // 认购周期 --- 只有认购+签约
                this.stageList = stageList.filter((item) => {
                  return item.code !== 'Recognize';
                });
                break;
              case 'Recognize':
                // 数据标志 --- 非明源
                this.postData.dataSign = "NoMingYuan";
                // 清空优惠告知书 --- 认筹周期需要自己手动添加
                this.postData.offerNoticeVO = [];
                // 认筹周期 --- 全部
                this.stageList = JSON.parse(JSON.stringify(stageList));
                break;
            }
          }
        }
        // 收派金额部分信息 --- 服务费
        this.postData.agentReceiveVO = [];
        if (baseInfo.chargeEnum !== 'Service') {
          let tempList = [];
          tempList.push(
            {
              type: 'AgencyFee', // 代理费
              partyACustomer: null,
              partyACustomerName: '客户',
              packgeName: null,
              packageId: null,
              receiveAmount: null,
              commAmount: null,
              rewardAmount: null,
              totalPackageAmount: null,
              distributionAmount: null,
              otherChannelFees: null,
            }
          );
          let list = this.initReceiveVOS(tempList);
          this.$nextTick(() => {
            this.postData.agentReceiveVO.push(...list);
          });
        }
        // 初始化附件信息
        await this.initDocument(baseInfo);
      }
    },
    // 初始化附件表格数据
    async initDocument(info) {
      let fileList = await this.getSignDict('DealFileType'); // 附件类型
      console.log(fileList);
      // 附件类型增加key
      if (fileList.length > 0) {
        fileList.forEach((vo) => {
          vo.defaultFileList = []; // 存放原来的数据
          vo.fileList = []; // 存放新上传的数据
        });
      }
      // 隐藏来访确认单和成交确认单
      fileList = fileList.filter((item) => {
        return !["VisitConfirForm", "DealConfirForm"].includes(item.code);
      });
      if (info.chargeEnum === 'Agent') {
        // 项目周期的收费模式为代理费的话，隐藏优惠告知书
        fileList = fileList.filter((item) => {
          return item.code !== "Notice";
        });
      }
      this.postData.documentVO = JSON.parse(JSON.stringify(fileList));
    },
    // 初始化收派金额信息，置为0
    initReceiveVOS(data = []) {
      if (data && data.length > 0) {
        data.forEach((item) => {
          this.$set(item, 'showData', []);
          item.receiveAmount = item.receiveAmount ? item.receiveAmount : 0;
          item.commAmount = item.commAmount ? item.commAmount : 0;
          item.rewardAmount = item.rewardAmount ? item.rewardAmount : 0;
          item.totalPackageAmount = item.totalPackageAmount ? item.totalPackageAmount : 0;
          item.distributionAmount = item.distributionAmount ? item.distributionAmount : 0;
          item.otherChannelFees = item.otherChannelFees ? item.otherChannelFees : 0;
        })
      }
      return data;
    },
    // 处理物业类型
    async initPropertyType(propertyEnumsList = []) {
      let tempList = [];
      const typeList = await this.getSignDict('Property');
      if (propertyEnumsList.length > 0 && typeList && typeList.length > 0) {
        propertyEnumsList.forEach((enu) => {
          typeList.forEach((list) => {
            if (enu === list.code) {
              tempList.push(list);
            }
          })
        });
      }
      return tempList;
    },
    // 获取细分业务模式的值
    getRefineModel(value= '') {
      let returnValue = '';
      switch(value){
        case 'TotalBagModel' :
          // 总包
          returnValue = 'All';
          break;
        case 'DistriModel' :
          // 分销
          returnValue = 'District';
          break;
        case 'TotalBagDistrModel' :
          // 总包+分销
          returnValue = '';
          break;
        default:
          returnValue = '';
          break;
      }
      this.postData.refineModelName = this.getDictName(returnValue, this.refineModelList);
      return returnValue;
    },
    // 根据业务模式获取细分业务模式选项
    async getRefineModelList(code) {
      if (!code) return [];
      let subdivideList = await this.getSignDict('Subdivide'); // 细分业务类型字典
      console.log('subdivideList', subdivideList);
      let list = await post_buModelContType_subList({modelCode: code});
      let refineModelList = [];
      if (list && list.length > 0 && subdivideList && subdivideList.length > 0) {
        list.forEach((list) => {
          subdivideList.forEach((item) => {
            if (list === item.code) {
              refineModelList.push(item);
            }
          });
        });
      }
      return refineModelList;
    },
    // 根据业务模式获取合同类型选项
    async getContTypeList(code) {
      if (!code) return [];
      let ContType = await this.getSignDict('ContType');
      let list = await post_buModelContType_getList({modelCode: code});
      let contTypeList = []; // 初始化
      if (list && list.length > 0 && ContType && ContType.length > 0) {
        if (list[0].contTypeList && list[0].contTypeList.length > 0) {
          list[0].contTypeList.forEach((list) => {
            ContType.forEach((item) => {
              if (list === item.code) {
                contTypeList.push(item);
              }
            });
          });
        }
      }
      return contTypeList;
    },
    // 根据项目周期和房号初始化页面数据
    async initPageById(cycleId, roomId, propertyType = '') {
      if (!cycleId || !roomId || !propertyType) return;
      let params = {
        cycleId: cycleId,
        roomId: roomId,
        isMainDeal: true, // 是否主成交
        property: propertyType, // 物业类型
      };
      let baseInfo = await post_pageData_initBasic(params);
      this.baseInfoInDeal = JSON.parse(JSON.stringify(baseInfo || {}));
      console.log('baseInfobaseInfo', this.baseInfoInDeal);
      // 处理数据
      // 纯提示
      if (baseInfo.customerIsDifferent) {
        this.$tool.toast("明源客户与优惠告知书客户有差异");
      }
      // 多分优惠告知书情况
      // console.log(this.postData.offerNoticeVO);
      this.postData.contNo = null; // 重置选择的编号
      this.postData.contNoName = null; // 重置选择的编号
      if (baseInfo.dealNoticeStatus === 'MultipleNotice') {
        this.$tool.toast("同房号存在多份已生效的优惠告知书");
      } else {
        // 分销协议编号
        if (baseInfo.contracts && baseInfo.contracts.length > 0) {
          this.contNoList = baseInfo.contracts;
        } else {
          this.contNoList = [];
        }
        // 优惠告知书
        if (!this.postData.offerNoticeVO.length) {
          this.postData.offerNoticeVO = baseInfo.notice && baseInfo.notice.length ? baseInfo.notice : [];
        }
      }
      // 分销成交和非分销成交不一样
      if (baseInfo.contType === 'DistriDeal') {
        // 分销成交模式
        // 1. 初始化渠道商/渠道公司
        await this.initAgency(baseInfo.agencyVOs, true);
      } else if (['SelfChannelDeal', 'NaturalVisitDeal'].includes(baseInfo.contType)) {
        // 非分销成交模式 --- 自然来访 / 自渠成交
        await this.initAgency(baseInfo.agencyVOs, false);
      }
      // 栋座
      if (baseInfo.buildingId && !this.postData.buildingId) {
        this.postData.buildingId = baseInfo.buildingId;
        this.postData.buildingName = baseInfo.buildingName;
      }
      // 合同类型
      if (baseInfo.contType) {
        let list = await this.getSignDict('ContType');
        this.postData.contType = baseInfo.contType;
        this.postData.contTypeName = this.getDictName(baseInfo.contType, list);
      }
      // 备案情况
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.recordState) {
        this.postData.recordState = baseInfo?.myReturnVO?.dealVO?.recordState;
      }
      // 报备信息
      if (baseInfo.recordStr) {
        this.postData.recordStr = baseInfo.recordStr;
      }
      // 建筑面积
      if (baseInfo.myReturnVO && baseInfo.myReturnVO.houseVO && baseInfo.myReturnVO.houseVO.area) {
        this.postData.area = baseInfo?.myReturnVO?.houseVO?.area;
      }
      // 户型
      if (baseInfo.myReturnVO && baseInfo.myReturnVO.houseVO && baseInfo.myReturnVO.houseVO.room) {
        this.postData.room = baseInfo?.myReturnVO?.houseVO?.room;
      }
      if (baseInfo.myReturnVO && baseInfo.myReturnVO.houseVO && baseInfo.myReturnVO.houseVO.hall) {
        this.postData.hall = baseInfo?.myReturnVO?.houseVO?.hall;
      }
      if (baseInfo.myReturnVO && baseInfo.myReturnVO.houseVO && baseInfo.myReturnVO.houseVO.toilet) {
        this.postData.toilet = baseInfo?.myReturnVO?.houseVO?.toilet;
      }
      // 预售合同编号
      this.postData.propertyNo = baseInfo.myReturnVO.houseVO?.propertyNo;
      // 签约类型
      if (baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.signType) {
        this.postData.signType = baseInfo?.myReturnVO?.dealVO?.signType;
      }
      // 成交阶段
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealStage) {
        this.postData.stage = baseInfo.myReturnVO.dealStage;
      }
      // 明源房款回笼比例(%)
      this.postData.returnRatio = baseInfo.myReturnVO.dealVO?.returnRatio;
      // 认购价格
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.subscribePrice) {
        this.postData.subscribePrice = baseInfo?.myReturnVO?.dealVO?.subscribePrice;
      }
      // 认购日期
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.subscribeDate) {
        this.postData.subscribeDate = baseInfo?.myReturnVO?.dealVO?.subscribeDate;
      }
      // 签约价格
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.signPrice) {
        this.postData.signPrice = baseInfo?.myReturnVO?.dealVO?.signPrice;
      }
      // 签约日期
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.signDate) {
        this.postData.signDate = baseInfo?.myReturnVO?.dealVO?.signDate;
      }
      // 数据标志
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dataSign) {
        this.postData.dataSign = baseInfo?.myReturnVO?.dataSign;
      }
      // 客户信息
      this.postData.customerVO = baseInfo.customerAddVOS && baseInfo.customerAddVOS.length ? baseInfo.customerAddVOS : [];
      // 收派金额 --- 代理费
      this.postData.serviceReceiveVO = [];
      if (baseInfo.receiveVOS && baseInfo.receiveVOS.length) {
        let tempList = await this.initReceiveVOS(baseInfo.receiveVOS);
        if (this.postData.serviceReceiveVO && this.postData.serviceReceiveVO.length) {
          this.postData.serviceReceiveVO.push(...tempList);
        } else {
          this.postData.serviceReceiveVO = tempList;
        }
      }
      // 初始化上传附件表格数据
      await this.getDocumentList(this.postData.contType);
    },
    // 修改合同类型后构建附件表格数据
    getDocumentList(type) {
      // 回显房号带出来的值
      let baseInfo = JSON.parse(JSON.stringify(this.baseInfoInDeal));
      if (type === "DistriDeal") {
        this.postData.documentVO.push(...this.tempList);
        if (this.postData.documentVO.length) {
          this.postData.documentVO.forEach((list) => {
            switch(list.code) {
              case "VisitConfirForm":
                // 来访确认单
                if (baseInfo.visitConfirmForms && baseInfo.visitConfirmForms.length) {
                  this.baseInfoInDeal.visitConfirmForms.forEach((item) => {
                    item.name = item.fileName;
                  });
                }
                list.defaultFileList = this.postData.roomId && baseInfo.visitConfirmForms && baseInfo.visitConfirmForms.length ? baseInfo.visitConfirmForms : [];
                break;
              case "DealConfirForm":
                // 成交确认书
                if (baseInfo.dealConfirmForms && baseInfo.dealConfirmForms.length) {
                  baseInfo.dealConfirmForms.forEach((item) => {
                    item.name = item.fileName;
                  });
                }
                list.defaultFileList = this.postData.roomId && baseInfo.dealConfirmForms && baseInfo.dealConfirmForms.length ? baseInfo.dealConfirmForms : [];
                break;
            }
          });
        }
      } else {
        this.postData.documentVO = this.postData.documentVO.filter((item) => {
          return !["VisitConfirForm", "DealConfirForm"].includes(item.code);
        });
      }
      this.postData.documentVO.forEach((list) => {
        switch(list.code) {
          case "Notice":
            // 优惠告知书PDF
            if (baseInfo.noticePDF && baseInfo.noticePDF.length) {
              baseInfo.noticePDF.forEach((item) => {
                item.name = item.fileName;
              });
            }
            list.defaultFileList = this.postData.roomId && baseInfo.noticePDF && baseInfo.noticePDF.length  ? baseInfo.noticePDF : [];
            break;
          case "OwnerID":
            // 业主身份证
            if (baseInfo.customerIds && baseInfo.customerIds.length) {
              baseInfo.customerIds.forEach((item) => {
                item.name = item.fileName;
              });
            }
            list.defaultFileList = this.postData.roomId && baseInfo.customerIds && baseInfo.customerIds.length ? baseInfo.customerIds : [];
            break;
        }
      });
    },
    // 初始化渠道商(渠道公司) --- 分销成交模式才有渠道商
    async initAgency(data = [], flag = false) {
      if (flag) {
        // 分销成交模式
        if(data.length > 0) {
          let channelList = await this.getSignDict('ChannelLevel');
          this.postData.agencyId = data[0].agencyId; // 渠道公司Id
          this.postData.agencyName = data[0].agencyName; // 渠道公司
          this.postData.channelLevel = data[0].channelLevel; // 渠道等级Id
          if (channelList && channelList.length > 0 && data[0].channelLevel) {
            channelList.forEach((list) => {
              if (list.code === data[0].channelLevel) {
                this.postData.channelLevelName= list.name; // 渠道等级
              }
            });
          }
          this.postData.brokerId= data[0].brokerId; // 渠道经纪人Id
          this.postData.brokerName= data[0].brokerName || data[0].broker; // 渠道经纪人
        }
      } else {
        // 非分销成交模式 --- 没有渠道相关信息
        let list = ['agencyId', 'agencyName', 'channelLevel', 'channelLevelName', 'brokerId', 'brokerName'];
        this.resetObject('postData', list); // 重置值
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
      return name
    },
    /*
    * 重置值方法
    * params: objName: string --- data中存在的对象 eg:postData
    * params: keyList: array --- 需要重置对象值的key数组 eg:['a', 'b']
    * */
    resetObject(objName = '', keyList = []) {
      if (!objName || !this[objName]) return;
      if (keyList.length > 0) {
        keyList.forEach((item) => {
          this[objName][item] = null;
        })
      } else {
        for (let keys in this[objName]) {
          this[objName][keys] = null;
        }
      }
    },
    // 键盘退格键被点击
    backSpace() {
      if (this.postData[this.currentPriceType].length) {
        this.postData[this.currentPriceType] = this.postData[this.currentPriceType].substr(
          0,
          this.postData[this.currentPriceType].length - 1
        );
      }
    },
    // 数字键盘改变值
    keyChange(e) {
      if (this.postData[this.currentPriceType]?.includes(".")) {
        if (e != ".") {
          let arr = this.postData[this.currentPriceType].split(".");
          if (arr[1].length < 2) {
            this.postData[this.currentPriceType] += e;
          }
        }
      } else {
        this.postData[this.currentPriceType] += e;
      }
    },
    // 删除图片/文件
    deleteImg(index, item) {
      console.log(item);
      this.showDeleteWin = true;
      this.deleteIndex = index;
      this.deleteItem = item;
    },
    // 确定删除图片/文件
    handleDelete() {
      this.postData.documentVO[this.deleteIndex].fileList = this.postData.documentVO[this.deleteIndex].fileList.filter((list) => {
        return list.fileId !== this.deleteItem.fileId;
      });
      tool.toast('移除成功');
    },
    // 预览图片
    viewImg(file) {
      let url = '';
      if (file.fileUrls) {
        url = file.fileUrls;
      } else {
        url = getImgUrl(file.fileId);
      }
      uni.previewImage({
        urls: [url]
      })
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
