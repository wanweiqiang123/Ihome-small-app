<!--
 * @Description: 业绩申报
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-26 09:38:11
 * @LastEditors: lsj
 * @LastEditTime: 2021-04-16 10:48:50
-->
<template>
  <view class="performance">
    <view class="form-content">
      <view class="performance-form">
        <view class="form-title u-border-bottom">成交信息</view>
        <u-form :model="postData" ref="uForm" label-width="190">
          <u-form-item
            label="项目周期"
            required
            class="hide-icon"
            right-icon="arrow-right" prop="cycleName">
            <u-input
              v-model="postData.cycleName"
              @click="handleSelectCycle"
              type="select"
              placeholder="请选择项目周期"/>
          </u-form-item>
          <u-form-item
            label="细分业务模式"
            required
            class="hide-icon"
            right-icon="arrow-right" prop="refineModelName">
            <u-input
              v-model="postData.refineModelName"
              :select-open="showRefineModel"
              @click="handleShowRefineModel"
              type="select"
              placeholder="请选择细分业务模式"/>
          </u-form-item>
          <u-form-item
            label="成交阶段"
            required
            class="hide-icon"
            right-icon="arrow-right" prop="stageName">
            <u-input
              v-model="postData.stageName"
              :select-open="showStage"
              @click="handleShowStage"
              type="select"
              placeholder="请选择成交阶段"/>
          </u-form-item>
          <u-form-item
            label="物业类型"
            required
            class="hide-icon"
            right-icon="arrow-right" prop="propertyTypeName">
            <u-input
              v-model="postData.propertyTypeName"
              :select-open="showPropertyType"
              @click="handleSelectProperty"
              type="select"
              placeholder="请选择物业类型"/>
          </u-form-item>
          <u-form-item
            :required="!isNoRequired"
            label="栋 座"
            class="hide-icon"
            right-icon="arrow-right" prop="buildingName">
            <u-input
              v-model="postData.buildingName"
              @click="handleShowBuild"
              type="select"
              placeholder="请选择栋座"/>
          </u-form-item>
          <u-form-item
            :required="!isNoRequired"
            label="房 号"
            class="hide-icon"
            right-icon="arrow-right" prop="roomNo">
            <u-input
              v-model="postData.roomNo"
              @click="handleShowRoom"
              type="select"
              placeholder="请选择房号"/>
          </u-form-item>
          <u-form-item
            label="合同类型"
            required
            class="hide-icon"
            right-icon="arrow-right" prop="contTypeName">
            <u-input
              v-model="postData.contTypeName"
              :select-open="showContType"
              @click="handleShowContType"
              type="select"
              placeholder="请选择合同类型"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal'"
            label="公司类型"
            required
            class="hide-icon"
            right-icon="arrow-right" prop="companyKind">
            <u-input
              v-model="postData.companyKindName"
              :select-open="showAgencyType"
              @click="showAgencyType = true"
              type="select"
              placeholder="请选择公司类型"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal'"
            required
            label="渠道公司"
            class="hide-icon"
            right-icon="arrow-right" prop="agencyName">
            <u-input
              v-model="postData.agencyName"
              @click="handleSelectAgency"
              type="select"
              placeholder="请选择渠道公司"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal' && postData.companyKind === 'ChannelCompany'"
            required
            label="经纪人"
            class="hide-icon"
            right-icon="arrow-right" prop="brokerName">
            <u-input
              v-model="postData.brokerName"
              @click="handleSelectBroker"
              type="select"
              placeholder="请选择经纪人"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal'"
            label="渠道分销合同"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.contTitle"
              :select-open="showContNo"
              @click="handleSelectContNo"
              type="select"
              placeholder="请选择渠道分销合同"/>
          </u-form-item>
          <u-form-item
            :required="['Subscribe', 'SignUp'].includes(postData.stage)"
            label="认购价格" prop="subscribePrice">
            <u-input
              disabled
              @click="handleInputPrice('subscribePrice')"
              v-model="postData.subscribePrice"
              placeholder="请输入认购价格"/>
          </u-form-item>
          <u-form-item
            :required="['Subscribe', 'SignUp'].includes(postData.stage)"
            label="认购日期"
            class="hide-icon"
            right-icon="arrow-right" prop="subscribeDate">
            <u-input
              v-model="postData.subscribeDate"
              :select-open="showDate"
              @click="handleSelectDate('subscribeDate')"
              type="select"
              placeholder="请选择认购日期"/>
          </u-form-item>
          <u-form-item
            :required="['SignUp'].includes(postData.stage)"
            label="签约价格" prop="signPrice">
            <u-input
              disabled
              @click="handleInputPrice('signPrice')"
              v-model="postData.signPrice"
              placeholder="请输入签约价格"/>
          </u-form-item>
          <u-form-item
            :required="['SignUp'].includes(postData.stage)"
            label="签约日期"
            class="hide-icon"
            right-icon="arrow-right" prop="signDate">
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
          <view
            v-if="canAddNoticeFlag"
            @click="handleSelectNotice">
            <u-icon name="plus" />添加
          </view>
        </view>
        <u-form label-width="170">
          <u-form-item
            :label="getDictName(item.notificationType, NotificationTypeList)"
            v-for="(item, index) in postData.offerNoticeVO" :key="index">
            <view class="notice-under-line" @click="handleViewNotice(item)">{{item.noticeNo}}</view>
            <u-icon
              v-show="index === 0 && canAddNoticeFlag"
              @click.native="deleteNotice(index)"
              slot="right"
              name="close-circle-fill"
              color="#fa3534" size="40"></u-icon>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">
          <text>客户信息</text>
          <view
            v-if="!baseInfoInDeal.customerAddVOS.length"
            @click="handleSelectCustomer">
            <u-icon name="plus" />添加
          </view>
        </view>
        <u-form label-width="170">
          <u-form-item
            :label="item.customerName"
            v-for="(item, index) in postData.customerVO" :key="index">
            <view>{{item.customerPhone}}</view>
            <u-icon
              v-show="!baseInfoInDeal.customerAddVOS.length"
              @click.native="deleteCustom(index)"
              slot="right"
              name="close-circle-fill"
              color="#fa3534" size="40"></u-icon>
          </u-form-item>
        </u-form>
      </view>
      <view class="performance-form">
        <view class="form-title u-border-bottom">收派金额</view>
        <view v-if="postData.serviceReceiveVO.length">
          <view
            class="receive-wrapper"
            v-for="(item, index) in postData.serviceReceiveVO" :key="index"
            @click.native="handleSelectPackage(item, 'serviceReceiveVO', index)">
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
            v-for="(item, index) in postData.agentReceiveVO" :key="index"
            @click.native="handleSelectPackage(item, 'agentReceiveVO', index)">
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
          <view class="annex-type">
            <text v-if="item.subType === 'must'"
                  class="annex-required">*</text>
            {{item.name}}
          </view>
          <view class="upload-file-wrapper">
            <template v-if="item.fileList.length > 0">
              <view class="file-list-wrapper" v-for="list in item.fileList" :key="list.fileId">
                <u-icon
                  v-show="!list.canDelete"
                  @click="deleteImg(infoIndex, list)"
                  class="icon" name="close-circle-fill" color="#FA3534" size="50"></u-icon>
                <u-image
                  @click="viewImg(list, item)"
                  width="100%" height="100%" :src="list.fileUrls ? list.fileUrls : getUrl(list.fileId)"></u-image>
              </view>
            </template>
            <view class="upload-icon" @click="uploadByType(item)" v-if="item.code !== 'ContractInfo'">
              <u-icon name="plus" color="#606266" size="40"></u-icon>
              <view class="select">选择文件</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="performance-btn">
      <u-button shape="circle" type="primary" @click="handleSubmit">提交</u-button>
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
      v-model="showContType"
      :list="ContTypeList"
      safe-area-inset-bottom
      title="请选择合同类型"
      value-name="code"
      label-name="name"
      @confirm="confirmContType"
    ></u-select>
    <u-select
      v-model="showAgencyType"
      :list="AgencyTypeList"
      safe-area-inset-bottom
      title="请选择公司类型"
      value-name="code"
      label-name="name"
      @confirm="confirmAgencyType"
    ></u-select>
    <!-- 选择渠道分销合同页面 -->
    <ContNoList
        @finish="confirmContNo"
        @close="showContNo = false"
        v-if="showContNo"
        :list="contNoList"></ContNoList>
    <u-picker
      v-model="showDate"
      mode="time"
      :default-time="defaultTime"
      @confirm="confirmDate"
      :params="params"></u-picker>
    <!-- 数字键盘 -->
    <u-keyboard
      ref="uKeyboard"
      mode="number"
      v-model="keyBoardShow"
      :mask="true"
      @change="keyChange"
      safe-area-inset-bottom
      @backspace="backSpace"
      :show-tips="false"
      :cancel-btn="false"
    ></u-keyboard>
    <!-- 删除提示 -->
    <u-modal
      @confirm="handleDelete"
      @cancel="showDeleteWin = false"
      :mask-close-able="true"
      :show-cancel-button="true"
      v-model="showDeleteWin" content="您确定要删除此项吗？"></u-modal>
    <!-- 收派套餐页面 -->
    <PopupIndex
      @finish="finishSelectPackage"
      @close="closeSelectPackage"
      v-if="showPackage"
      :query-data="packageData"></PopupIndex>
    <!-- 选择上传附件类型菜单 -->
    <u-action-sheet
      :safe-area-inset-bottom="true"
      :list="actionList"
      v-model="showActionShow"
      @click="handleUpload"></u-action-sheet>
    <!-- 签约阶段提示 -->
    <u-modal
      @confirm="confirmSubmit"
      @cancel="showSubmitWin = false"
      :mask-close-able="true"
      :show-cancel-button="true"
      v-model="showSubmitWin" content="签约阶段的业绩申报提交后将由文员跟进，提交后如需修改信息请联系文员。"></u-modal>
  </view>
</template>

<script>
import PopupIndex from "./popup/index.vue";
import ContNoList from "./popup/contNoList.vue";
import {
  post_buModelContType_subList,
  post_buModelContType_getList,
  post_notice_deal_details__noticeId,
  post_pageData_calculateReceiveAmount,
  post_pageData_initBasic,
  post_deal_entryDealBasicInf,
  post_deal_updateDealBasicInf,
  getBaseDealInfo,
  get_deal_get__id,
  post_notice_customer_information,
  post_distributionmx_receive_detail
} from "@/api/staff";
import {getAllByTypeApi} from "@/api/index";
import {getAllDictByType} from "@/api";
import tool from "@/common/tool";
import storageTool from "@/common/storageTool";
export default {
  name: "performanceEdit",
  components: { PopupIndex, ContNoList },
  data() {
    // 栋座
    let buildingNameValidator = (rule, value, callback) => {
      if (this.baseInfoByTerm.termStageEnum === "Recognize" && this.postData.stage === "Recognize") {
        callback();
        return;
      } else {
        if (!value) {
          callback(new Error('栋座必选'));
          return;
        } else {
          callback();
          return;
        }
      }
    }
    // 房号
    let roomNoValidator = (rule, value, callback) => {
      if (this.baseInfoByTerm.termStageEnum === "Recognize" && this.postData.stage === "Recognize") {
        callback();
        return;
      } else {
        if (!value) {
          callback(new Error('房号必选'));
          return;
        } else {
          callback();
          return;
        }
      }
    }
    // 认购价格
    let subscribePriceValidator = (rule, value, callback) => {
      if (['Subscribe', 'SignUp'].includes(this.postData.stage)) {
        if (!value) {
          callback(new Error('认购价格不能为空'));
          return;
        } else {
          callback();
          return;
        }
      } else {
        callback();
        return;
      }
    }
    // 认购日期
    let subscribeDateValidator = (rule, value, callback) => {
      if (['Subscribe', 'SignUp'].includes(this.postData.stage)) {
        if (!value) {
          callback(new Error('认购日期不能为空'));
          return;
        } else {
          callback();
          return;
        }
      } else {
        callback();
        return;
      }
    }
    // 签约价格
    let signPriceValidator = (rule, value, callback) => {
      if (['SignUp'].includes(this.postData.stage)) {
        if (!value) {
          callback(new Error('签约价格不能为空'));
          return;
        } else {
          callback();
          return;
        }
      } else {
        callback();
        return;
      }
    }
    // 签约日期
    let signDateValidator = (rule, value, callback) => {
      if (['SignUp'].includes(this.postData.stage)) {
        if (!value) {
          callback(new Error('签约日期不能为空'));
          return;
        } else {
          callback();
          return;
        }
      } else {
        callback();
        return;
      }
    }
    // 公司类型
    let agencyTypeValidator = (rule, value, callback) => {
      if (this.postData.contType === 'DistriDeal') {
        // 分销成交必选
        if (!value) {
          callback(new Error('请选择公司类型'));
          return;
        } else {
          callback();
          return;
        }
      } else {
        callback();
        return;
      }
    }
    // 渠道公司
    let agencyNameValidator = (rule, value, callback) => {
      if (this.postData.contType === 'DistriDeal') {
        if (!value) {
          callback(new Error('请选择渠道公司'));
          return;
        } else {
          callback();
          return;
        }
      } else {
        callback();
        return;
      }
    }
    // 经纪人
    let brokerNameValidator = (rule, value, callback) => {
      if (this.postData.contType === 'DistriDeal' && this.postData.companyKind === 'ChannelCompany') {
        if (!value) {
          callback(new Error('请选择经纪人'));
          return;
        } else {
          callback();
          return;
        }
      } else {
        callback();
        return;
      }
    }
    return {
      pdfImg: require('@/channelPackage/common/img/pdf.jpg'),
      excelImg: require('@/channelPackage/common/img/excel.png'),
      wordImg: require('@/channelPackage/common/img/word.jpg'),
      id: null, // 成交id-编辑用
      showPackage: false, // 选择收派套餐弹窗标识
      showSubmitWin: false, // 签约阶段提示弹窗标识
      packageData: {}, // 收派套餐查询条件
      currentUploadType: null, // 上传的附件类型
      showActionShow: false, // 上传附件类型菜单
      actionList: [
        {
          text: '上传图片',
          color: '',
          fontSize: 30,
          subText: '大小不能超过10M'
        },
        {
          text: '上传文件',
          color: '',
          fontSize: 30,
          subText: 'pdf、word、excel文件，大小不能超过10M'
        }
      ],
      showDeleteWin: false, // 删除图片提示框
      deleteIndex: null,
      deleteItem: null,
      defaultTime: '',
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
      DealFileTypeList: [],
      SubdivideList: [],
      DealStageList: [],
      PropertyList: [],
      NotificationTypeList: [],
      FeeTypeList: [],
      dictList: null, // 部分字典数据
      showRefineModel: false,
      refineModelList: [],
      showStage: false,
      stageList: [],
      showPropertyType: false,
      propertyTypeList: [],
      showContType: false,
      showAgencyType: false,
      ContTypeList: [],
      AgencyTypeList: [],
      showContNo: false,
      showDate: false,
      currentDateType: '', // 当前选择日期的类型
      currentPriceType: '', // 当前输入价格的input框
      hasPrice: false, // 价格input框是否有值
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
        dealCode: '',
        proId: '', // 接口用到的proId
        cycleId: '', // 接口用到的cycleId
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
        companyKind: '', // 公司类型
        companyKindName: '', // 公司类型name
        contNo: '', // 渠道分销合同
        contTitle: '', // 渠道分销合同name
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
        sceneSales: '',
        offerNoticeVO: [], // 优惠告知书
        customerVO: [], // 客户信息
        agencyVO: [], // 渠道信息
        agentReceiveVO: [], // 收派金额 --- 代理费vo
        serviceReceiveVO: [], // 收派金额 --- 服务费vo
        receiveAchieveVO: [], // 应收信息
        documentVO: [], // 附件信息
      },
      rules: {
        cycleName: [
          {required: true, message: "项目周期必选", trigger: "change"},
        ],
        contTypeName: [
          {required: true, message: "合同类型必选", trigger: "change"},
        ],
        companyKind: [
          {validator: agencyTypeValidator, trigger: "change"},
        ],
        refineModelName: [
          {required: true, message: "细分模式必选", trigger: "blur"},
        ],
        stageName: [
          {required: true, message: "成交阶段必选", trigger: "change"},
        ],
        propertyTypeName: [
          {required: true, message: "物业类型必选", trigger: "change"},
        ],
        buildingName: [
          {validator: buildingNameValidator, trigger: "change"},
        ],
        roomNo: [
          {validator: roomNoValidator, trigger: "change"},
        ],
        // contNo: [
        //   {required: true, message: "渠道分销合同必选", trigger: "change"},
        // ],
        subscribePrice: [
          {validator: subscribePriceValidator, trigger: "change"},
        ],
        subscribeDate: [
          {validator: subscribeDateValidator, trigger: "change"},
        ],
        signPrice: [
          {validator: signPriceValidator, trigger: "change"},
        ],
        signDate: [
          {validator: signDateValidator, trigger: "change"},
        ],
        agencyName: [
          {validator: agencyNameValidator, trigger: "change"},
        ],
        brokerName: [
          {validator: brokerNameValidator, trigger: "change"},
        ],
        notEmpty: []
      },
      packageIdsList: [], // 收派套餐ids：分销模式---选择分销协议后获取；非分销协议---请求接口获取
      baseInfoByTerm: {
        startDivisionId: null, // 启动事业部ID
        exMinyuan: '', // 是否明源源：1---是，0---否
        chargeEnum: '',
        proId: '', // 项目id --- 用于查询分销协议列表
        termId: '', // 项目周期id
        termStageEnum: '', // 项目周期阶段
        selectableChannelIds: [], // 可选的渠道商ids
      }, // 通过项目周期id获取到的初始化成交基础信息
      baseInfoInDeal: {
        hasRecord: false,
        contType: '',
        notice: [], // 优惠告知书
        myReturnVO: {
          houseVO: {},
          customerVOS: {},
          dealVO: {},
          dataSign: ''
        }, // 明源数据
        docs: [], // 返回的所有的附件值
        noticePDF: [], // 优惠告知书PDF
        customerIds: [], // 业主身份证
        visitConfirmForms: [], // 来访确认书
        dealConfirmForms: [], // 成交确认书
        customerAddVOS: [], // 客户信息
        selectableChannelIds: [], // 可选的渠道商ids
        dealNoticeStatus: '', // 同房号是否存在多份优惠告知书(NoneNotice-没有优惠告知书、OneNotice-一份优惠告知书、MultipleNotice-多份优惠告知书)
      }, // 通过initPage接口获取到的成交信息(项目周期 + 房号)
      canAddNoticeFlag: true, // 是否有添加(删除)优惠告知书的标识：true-可以；false-不可以
      tempList: [], // 临时的收派金额信息
      tempDocumentList: [], // 记录来访确认单和成交确认单
      currentPackageType: '', // 当前收派金额类型
      currentPackageIndex: '', // 当前收派金额序号
      uploadHeader: {}, // 请求header
      uploadName: 'files', // 供后端取值用
      // 编辑功能相关字段
      editBaseInfo: {
        parentId: null,
      }, // 编辑初始化页面数据
    };
  },
  computed: {
    // 服务费合计
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
    // 代理费合计
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
    },
    // 判断栋座、房号是否必填项
    isNoRequired() {
      let flag = true;
      if (this.baseInfoByTerm.termStageEnum === "Recognize" && this.postData.stage === "Recognize") {
        // 项目周期是认筹 + 成交阶段是认筹，则是非必填
        flag = true;
      } else {
        flag = false;
      }
      return flag;
    }
  },
  async onLoad(option) {
    console.log('performanceEdit:', option);
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
    await this.getToken();
    if (option && option.id) {
      this.id = option.id;
      await this.initEditPage(option.id);
    }
  },
  async onShow() {
    let item = getApp().globalData.searchBackData;
    // console.log('item', item);
    if (item && item.type === "term") {
      await this.confirmSelectCycle(item.data);
      getApp().globalData.searchBackData = {};
    }
    if (item && item.type === "custom") {
      await this.finishAddCustomer(item.data);
      getApp().globalData.searchBackData = {};
    }
    if (item && item.type === "notice") {
      await this.finishAddNotice(item.data);
      getApp().globalData.searchBackData = {};
    }
    if (item && item.type === "agency") {
      await this.finishAddAgency(item.data);
      getApp().globalData.searchBackData = {};
    }
    if (item && item.type === "broker") {
      await this.finishAddBroker(item.data);
      getApp().globalData.searchBackData = {};
    }
    if (item && item.type === "building") {
      await this.finishAddBuilding(item.data);
      getApp().globalData.searchBackData = {};
    }
    if (item && item.type === "roomNo") {
      await this.finishAddRoomNo(item.data);
      getApp().globalData.searchBackData = {};
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
    // 编辑 - 初始化页面
    async initEditPage(id) {
      let info  = await get_deal_get__id({id: id});
      this.editBaseInfo = JSON.parse(JSON.stringify(info || {}));
      console.log(info);
      // 获取渠道分销合同的值
      this.packageIdsList = [];
      if (info.agencyList && info.agencyList.length) {
        if (info.agencyList[0].agencyId) {
          await this.getOneAgentTeamContNo(info.agencyList[0].agencyId, info.cycleId, info.agencyList[0].companyKind);
        } else {
          this.contNoList = [];
        }
        // 获取对应的渠道分销合同的ids
        if (this.contNoList && this.contNoList.length) {
          this.contNoList.forEach((list) => {
            if (list.contractNo === info.contNo) {
              this.packageIdsList = this.getIdsList(list.distributionMxList);
            }
          });
        }
      }
      this.postData = {
        ...this.postData,
        ...info
      }
      this.postData.dealCode = info?.dealCode;
      this.postData.dataSign = info?.dataSign;
      this.postData.dealOrgId = info?.dealOrgId;
      this.postData.isConsign = info?.isConsign;
      this.postData.isMarketProject = info?.isMarketProject;
      // this.postData.isMat = info?.isMat;
      this.postData.modelCode = info?.modelCode;
      this.postData.oneAgentTeamId = info?.oneAgentTeamId;
      this.postData.recordState = info?.recordState;
      this.postData.reportId = info?.reportId;
      this.postData.sceneSales = info?.sceneSales;
      // 分割
      this.postData.proId = info?.projectId;
      this.postData.cycleId = info?.cycleId;
      this.postData.cycleName = info?.cycleName;
      this.postData.refineModelName = info?.refineModel ? this.getDictName(info?.refineModel, this.SubdivideList) : '';
      this.postData.refineModel = info?.refineModel ? info?.refineModel : '';
      this.postData.stageName = info?.stage ? this.getDictName(info?.stage, this.DealStageList) : '';
      this.postData.stage = info?.stage ? info?.stage : '';
      this.postData.propertyType = info?.house?.propertyType ? info?.house?.propertyType : '';
      this.postData.propertyTypeName = info?.house?.propertyType ? this.getDictName(info?.house?.propertyType, this.PropertyList) : '';
      this.postData.buildingName = info?.house?.buildingName ? info?.house?.buildingName : '';
      this.postData.buildingId = info?.house?.buildingId ? info?.house?.buildingId : '';
      this.postData.roomId = info?.house?.roomId ? info?.house?.roomId : '';
      this.postData.roomNo = info?.house?.roomNo ? info?.house?.roomNo : '';
      this.postData.area = info?.house?.area ? info?.house?.area : '';
      this.postData.contType = info?.contType ? info?.contType : '';
      this.postData.contTypeName = info?.contType ? this.getDictName(info?.contType, this.ContTypeList) : '';
      this.postData.contNo = info?.contNo ? info?.contNo : '';
      this.postData.contTitle = info?.contTitle ? info?.contTitle : '';
      this.postData.recordStr = info?.recordStr ? info?.recordStr : '';
      if (info.agencyList && info.agencyList.length) {
        if (info.agencyList[0].companyKind === 'InfieldCompany') {
          // 内部公司和外部公司不一样
          this.postData.agencyName = info.agencyList[0].companyName;
        } else {
          this.postData.agencyName = info.agencyList[0].agencyName;
        }
        this.postData.agencyId = info.agencyList[0].agencyId;
        this.postData.channelLevel = info.agencyList[0].channelLevel;
        this.postData.brokerName = info.agencyList[0].broker;
        this.postData.brokerId = info.agencyList[0].brokerId;
        this.postData.companyKind = info.agencyList[0].companyKind;
        this.postData.companyKindName = info.agencyList[0].companyKind ? this.getDictName(info.agencyList[0].companyKind, this.AgencyTypeList) : '';
      }
      this.postData.subscribeDate = info?.subscribeDate ? info?.subscribeDate : '';
      this.postData.subscribePrice = info?.subscribePrice ? info?.subscribePrice : '0';
      this.postData.signDate = info?.signDate ? info?.signDate : '';
      this.postData.signPrice = info?.signPrice ? info?.signPrice : '0';
      // 优惠告知书
      await this.getInformation(info?.id, info?.cycleId);
      // 客户
      this.postData.customerVO = info.customerList;
      // 收派金额
      this.postData.agentReceiveVO = [];
      this.postData.serviceReceiveVO = [];
      if (info.receiveList && info.receiveList.length) {
        info.receiveList.forEach((list) => {
          if (list.type === "AgencyFee") {
            this.postData.agentReceiveVO.push(
              {
                ...list,
                showData: [list.collectandsendDetailDealVO]
              }
            );
          }
          if (list.type === "ServiceFee") {
            this.postData.serviceReceiveVO.push(
              {
                ...list,
                showData: [list.collectandsendDetailDealVO]
              }
            );
          }
        });
      }
      // 附件
      this.postData.documentVO = [];
      this.postData.documentVO = this.initDocumentList(info.charge, info.contType, info.documentList);
      console.log(this.postData.documentVO);
      // 通过项目周期id获取基础信息
      await this.editBaseDealInfo(info.cycleId, info?.house?.buildingId, info?.house?.propertyType);
      await this.editPageById(info.cycleId, info?.house?.roomId, info?.house?.propertyType, info?.parentId, info?.refineModel);
    },
    // 编辑 - 通过项目周期id获取基础信息
    async editBaseDealInfo(id = "", buildingId, property) {
      if (!id) return;
      let baseInfo = await getBaseDealInfo({cycleId: id});
      console.log('baseInfo', baseInfo);
      this.baseInfoByTerm = JSON.parse(JSON.stringify(baseInfo));
      this.refineModelList = await this.getRefineModelList(baseInfo.busEnum);
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
              // 认筹周期 --- 全部
              this.stageList = JSON.parse(JSON.stringify(stageList));
              break;
          }
        }
      }
      // 处理优惠告知书是否可以添加
      if (baseInfo.chargeEnum === 'Agent') {
        this.canAddNoticeFlag = false; // 纯代理费没有优惠告知书
      } else {
        this.canAddNoticeFlag = true; // 其他情况有优惠告知书
      }
      // 物业类型
      this.propertyTypeList = await this.initPropertyType(baseInfo.propertyEnums);
      this.ContTypeList = await this.getContTypeList(baseInfo.busEnum); // 获取合同类型
    },
    // 编辑 - 根据项目周期和房号初始化页面数据
    async editPageById(cycleId, roomId, propertyType = '', parentId = '', refineModel = '') {
      if (!cycleId || !roomId || !propertyType || !refineModel) return;
      let params = {
        parentId: parentId,
        cycleId: cycleId,
        roomId: roomId,
        isMainDeal: true, // 是否主成交
        property: propertyType, // 物业类型
        refineModel: refineModel, // 细分业务模式
      };
      let baseInfo = await post_pageData_initBasic(params);
      this.baseInfoInDeal = JSON.parse(JSON.stringify(baseInfo || {}));
      // 判断是否可以添加优惠告知书逻辑
      switch (baseInfo.dealNoticeStatus) {
        case "NoneNotice":
          // 没有优惠告知书
          this.canAddNoticeFlag = true;
          break;
        case "OneNotice":
          // 有一份优惠告知书
          this.canAddNoticeFlag = false;
          break;
        case "MultipleNotice":
          // 有多份优惠告知书
          this.canAddNoticeFlag = true;
          break;
      }
    },
    // 编辑 - 获取优惠告知书列表
    async getInformation(id = '', cycleId = '') {
      if (!id || !cycleId) return ;
      let list = await post_notice_customer_information({dealId: id, cycleId: cycleId});
      if (list && list.length > 0) {
        this.postData.offerNoticeVO = list;
      } else {
        this.postData.offerNoticeVO = [];
      }
    },
    /*
    * 编辑 --- 构建上传附件数据
    * charge：收费模式
    * contType：合同类型
    * list：回显的值
    * */
    initDocumentList(charge = '', contType = '', list = []) {
      let fileList = JSON.parse(JSON.stringify(this.DealFileTypeList)); // 附件类型
      // 根据收费模式过滤
      if (charge === 'Agent') {
        // 项目周期的收费模式为代理费的话，隐藏优惠告知书
        fileList = fileList.filter((item) => {
          return item.code !== "Notice";
        });
      }
      // 根据合同类型过滤
      if (contType !== 'DistriDeal') {
        // 合同类型不是分销成交的话隐藏
        fileList = fileList.filter((item) => {
          return !["VisitConfirForm", "DealConfirForm"].includes(item.code);
        });
      }
      // 附件类型增加key
      if (fileList.length > 0) {
        fileList.forEach((vo) => {
          vo.fileList = []; // 存放新上传的数据
          if (list && list.length) {
            list.forEach((item) => {
              if (vo.code === item.fileType) {
                vo.fileList.push(
                  {
                    ...item,
                    name: item.fileName,
                    fileUrls: this.getFileUrls(item, 'url'), // 获取对应文件的默认图片
                    type: this.getFileUrls(item, 'type'), // 获取文件类型：excel、word、pdf
                    canDelete: true
                  }
                );
              }
            });
          }
        });
      }
      return fileList;
    },
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
      let self = this;
      if (item && item.length) {
        this.postData.refineModelName = item[0].label;
        this.postData.refineModel = item[0].value;
        // 初始化收派套餐
        this.$nextTick(async () => {
          if (self.postData.roomId) {
            await this.initReceiveByRoom();
          } else {
            await this.initReceive();
          }
        });
      }
    },
    // 改变了细分业务模式需要重置收派套餐信息
    async initReceiveByRoom() {
      if (!this.postData.cycleId || !this.postData.roomId || !this.postData.propertyType) return;
      let params = {
        parentId: this.id ? this.editBaseInfo.parentId : null,
        cycleId: this.postData.cycleId,
        roomId: this.postData.roomId,
        isMainDeal: true, // 是否主成交
        property: this.postData.propertyType, // 物业类型
        refineModel: this.postData.refineModel, // 细分业务模式
      };
      let baseInfo = await post_pageData_initBasic(params);
      this.postData.agentReceiveVO = []; // 清空代理费类型收派
      if (baseInfo && baseInfo.receiveVOS && baseInfo.receiveVOS.length) {
        let tempList = await this.initReceiveVOS(baseInfo.receiveVOS);
        if (this.postData.agentReceiveVO && this.postData.agentReceiveVO.length) {
          this.postData.agentReceiveVO.push(...tempList);
        } else {
          this.postData.agentReceiveVO = tempList;
        }
      }
    },
    // 选择成交阶段
    handleShowStage() {
      let flag = false;
      flag = this.isDisabled('dealStage', 'dealVO'); // 判断明源是否有该字段
      if (!flag) {
        this.showStage = true;
      }
    },
    // 确定选择成交阶段
    confirmStage(item) {
      if (item && item.length) {
        this.postData.stageName = item[0].label;
        this.postData.stage = item[0].value;
      }
    },
    // 选择物业类型
    handleSelectProperty() {
      if (!this.postData.cycleId) {
        this.$tool.toast("请先选择项目周期");
        return ;
      }
      this.showPropertyType = true;
    },
    // 确定选择物业类型
    async confirmPropertyType(item) {
      if (item && item.length) {
        this.postData.propertyTypeName = item[0].label;
        this.postData.propertyType = item[0].value;
        this.postData.roomId = '';
        this.postData.roomNo = '';
        this.postData.buildingId = '';
        this.postData.buildingName = '';
        this.baseInfoInDeal.customerAddVOS = []; // 重置客户数据
        await this.initDocument(this.baseInfoByTerm);
        await this.resetReceiveVO();
        await this.resetData();
      }
    },
    // 物业类型、栋座、房号改变，收派金额模块只需要清空代理费
    resetReceiveVO() {
      this.postData.agentReceiveVO = [];
    },
    // 选择栋座
    handleShowBuild() {
      if (!this.postData.propertyType) {
        this.$tool.toast("请先选择物业类型");
        return;
      }
      getApp().globalData.searchParams = {
        searchTip: "输入栋座",
        api: "postBuildByProId",
        key: "buildingName",
        id: "buildingId",
        type: "building",
        other: {
          proId: this.postData.proId,
          propertyEnum: this.postData.propertyType
        }
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 确定选择栋座
    async finishAddBuilding(data) {
      console.log(data);
      if (data && data.buildingId) {
        this.postData.buildingId = data?.buildingId;
        this.postData.buildingName = data?.buildingName;
      }
      this.postData.roomId = '';
      this.postData.roomNo = '';
      await this.resetReceiveVO();
      await this.initDocument(this.baseInfoByTerm);
      await this.resetData();
    },
    // 选择房号
    handleShowRoom() {
      if (!this.postData.buildingId) {
        this.$tool.toast("请先选择栋座");
        return;
      }
      getApp().globalData.searchParams = {
        searchTip: "输入房号",
        api: "postRoomByProId",
        key: "roomNo",
        id: "roomId",
        type: "roomNo",
        other: {
          proId: this.postData.proId,
          buildingId: this.postData.buildingId,
          exDeal: 0
        }
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 确定选择房号
    async finishAddRoomNo(data) {
      console.log(data);
      if (data && data.roomId) {
        this.postData.roomId = data?.roomId;
        this.postData.roomNo = data?.roomNo;
      }
      await this.resetReceiveVO();
      await this.resetData(); // 重置数据
      await this.initPageById(this.baseInfoByTerm.termId, data?.roomId, this.postData.propertyType);
    },
    /*
    * 判断字段是否可以修改
    * 条件(both)：1.关联明源数据（全部、部分）； 2.数据是明源带出来的（有值）。
    * params: key: string --- 需要判断的字段
    * params: type: string --- 该字段在明源Vo中的类型：houseVO、customerVOS、dealVO
    * */
    isDisabled(key = '', type = '') {
      const data = this.baseInfoInDeal.myReturnVO;
      let isMingYuanFlag = this.baseInfoByTerm?.exMinyuan === 1;
      if (!key || !type || !data[type]?.[key]) return false;
      let flag = false;
      // 对应明源字段是否有值
      if (type === 'houseVO') {
        // 针对房间vo特殊判断
        if (data[type][key] && this.postData.roomId && isMingYuanFlag) {
          flag = true;
        } else {
          flag = false;
        }
      } else {
        // 其他vo的判断
        if (data[type][key] && this.postData.roomId) {
          flag = true;
        } else {
          flag = false;
        }
      }
      return flag;
    },
    // 选择合同类型
    handleShowContType() {
      // 选择的房号查询是否存在已成交报备信息，如果存在则将合同类型设置为分销成交，不可修改 --- 2021-03-27 新需求暂时屏蔽
      // if (this.baseInfoInDeal.contType === 'DistriDeal' && this.baseInfoInDeal.hasRecord && this.postData.roomId) {
      //   return ;
      // }
      this.showContType = true;
    },
    // 确定合同类型
    async confirmContType(item) {
      console.log(item);
      this.postData.companyKindName = "";
      this.postData.companyKind = "";
      this.postData.agencyId = '';
      this.postData.agencyName = '';
      this.postData.contNo = '';
      this.postData.contTitle = '';
      this.postData.isMat = '';
      if (item && item.length) {
        this.postData.contTypeName = item[0].label;
        this.postData.contType = item[0].value;
        // 初始化收派套餐
        await this.initReceive();
        // 构建附件表格数据
        await this.getDocumentList(item[0].value);
      }
    },
    // 确定公司类型
    async confirmAgencyType(item) {
      console.log(item);
      if (item && item.length) {
        this.postData.companyKindName = item[0].label;
        this.postData.companyKind = item[0].value;
      }
      // 1. 先初始化收派信息
      this.initReceive();
      this.packageIdsList = [];
      // 2. 初始化渠道公司和经纪人
      this.postData.agencyId = '';
      this.postData.agencyName = '';
      this.postData.brokerId = '';
      this.postData.brokerName = '';
      this.postData.contNo = '';
      this.postData.contTitle = '';
      this.postData.isMat = "";
    },
    // 选择渠道公司
    handleSelectAgency() {
      if (!this.postData.cycleId) {
        // 没有选周期不能选渠道公司
        this.$tool.toast("请先选择项目周期");
        return ;
      }
      if (!this.postData.companyKind) {
        // 没有公司类型不能选渠道公司
        this.$tool.toast("请先选择公司类型");
        return ;
      }
      // 内部公司还是外部公司
      if (this.postData.companyKind === "InfieldCompany") {
        // 内部公司
        getApp().globalData.searchParams = {
          searchTip: "输入公司名称",
          api: "getAgencyListByInApi",
          key: "name",
          id: "id",
          type: "agency"
        };
      } else {
        // 外部
        getApp().globalData.searchParams = {
          searchTip: "输入公司名称",
          api: "getAgencyListApi",
          key: "name",
          id: "id",
          type: "agency",
          other: {
            departmentOrgId: this.baseInfoByTerm.startDivisionId
          }
        };
      }
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 确定选择渠道公司
    async finishAddAgency(data) {
      console.log(data);
      this.postData.agencyId = data?.id;
      this.postData.agencyName = data?.name;
      // 1. 先初始化收派信息
      this.initReceive();
      this.packageIdsList = [];
      this.postData.brokerId = '';
      this.postData.brokerName = '';
      this.postData.contNo = '';
      this.postData.contTitle = '';
      this.postData.isMat = '';
      await this.getOneAgentTeamContNo(this.postData.agencyId, this.postData.cycleId, this.postData.companyKind);
    },
    // 选择经纪人
    handleSelectBroker() {
      if (!this.postData.agencyId) {
        // 没有选渠道公司不能选经纪人
        this.$tool.toast("请先选择渠道公司");
        return ;
      }
      getApp().globalData.searchParams = {
        searchTip: "输入经纪人姓名或手机号码",
        cssType: 'broker',
        api: "getBrokerListApi",
        key: "name",
        id: "id",
        type: "broker",
        other: {
          channelId: this.postData.agencyId
        }
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 确定选择经纪人
    finishAddBroker(data) {
      console.log(data);
      if (data && data.id) {
        this.postData.brokerId = data?.userId;
        this.postData.brokerName = data?.name;
      }
    },
    // 选择分销协议
    async handleSelectContNo() {
      if (!this.postData.agencyId) {
        this.$tool.toast("请先选择渠道公司");
        return;
      }
      this.showContNo = true;
    },
    /*
    * 获取渠道分销合同
    * channelCompanyId: String。渠道公司id
    * cycleId: String。项目周期id
    * companyKind: String。渠道公司类型 AgencyCompany
    * */
    async getOneAgentTeamContNo(channelCompanyId = '', cycleId = '', companyKind = '') {
      let postData = {
        channelCompanyId: channelCompanyId,
        channelCompanyKind: companyKind,
        cycleId: cycleId,
      }
      this.contNoList = await post_distributionmx_receive_detail(postData);
      console.log(this.contNoList);
    },
    // 确定选择渠道分销合同
    confirmContNo(option) {
      console.log(option);
      this.postData.isMat = '';
      this.packageIdsList = [];
      this.showContAnnexList([]);
      if (option && option.contractNo) {
        this.postData.contNo = option.contractNo;
        this.postData.contTitle = option.contractTitle;
        this.postData.isMat = option.advancementSituation;
        // 分销模式下获取分销协议返回的收派套餐id
        this.packageIdsList = this.getIdsList(option.distributionMxList);
        // 回显合同附件信息
        this.showContAnnexList(option.annexList);
      } else {
        this.postData.contNo = "";
        this.postData.contTitle = "";
        this.packageIdsList = [];
      }
      // 初始化收派套餐
      this.initReceive();
      this.showContNo = false;
    },
    // 获取合同中收派信息的idsList
    getIdsList(list = []) {
      let idList = [];
      if (list && list.length > 0) {
        list.forEach((item) => {
          idList.push(item.conditionId);
        });
      }
      return idList;
    },
    // 回显合同附件信息
    showContAnnexList(annexList = []) {
      // 添加对应的合同附件
      if (this.postData && this.postData.documentVO && this.postData.documentVO.length) {
        this.postData.documentVO.forEach((vo) => {
          if (vo.code === 'ContractInfo') {
            let tempList = [];
            if (annexList && annexList.length) {
              annexList.forEach((list) => {
                list.fileName = list.attachmentSuffix;
                list.fileId = list.fileNo;
                tempList.push(
                  {
                    ...list,
                    // fileId: list.fileNo,
                    name: list.attachmentSuffix,
                    fileType: 'ContractInfo', // 合同信息
                    fileUrls: this.getFileUrls(list, 'url'), // 获取对应文件的默认图片
                    type: this.getFileUrls(list, 'type'), // 获取文件类型：excel、word、pdf
                    canDelete: true, // 是否可以删除
                  }
                )
              });
            }
            vo.fileList = tempList;
          }
        });
      }
    },
    // 选择时间
    handleSelectDate(type) {
      let flag = false;
      flag = this.isDisabled(type, 'dealVO');
      if (!flag) {
        this.currentDateType = type;
        this.defaultTime = this.postData[type] ? this.postData[type] : ''; // 设置选中日期
        this.showDate = true;
      }
    },
    // 确定选择时间
    confirmDate(item) {
      console.log(item);
      let selectDateTime = new Date(`${item?.year}-${item?.month}-${item?.day}`).getTime();
      let currentDateTime = new Date().getTime();
      console.log('selectDateTime', selectDateTime);
      console.log('currentDateTime', currentDateTime);
      this.$nextTick(() => {
        if (selectDateTime > currentDateTime) {
          this.showDate = true;
          this.$tool.toast("选择的日期不能在今天之后");
        } else {
          if (this.currentDateType) {
            this.postData[this.currentDateType] = `${item.year}-${item.month}-${item.day}`;
          }
        }
      });
    },
    // 输入价格
    handleInputPrice(type) {
      let flag = false;
      flag = this.isDisabled(type, 'dealVO');
      if (!flag) {
        this.currentPriceType = type;
        this.keyBoardShow = true;
        if (['', undefined, null].includes(this.postData[type])) {
          this.hasPrice = false;
        } else {
          this.hasPrice = true;
        }
      }
    },
    // 键盘退格键被点击
    backSpace() {
      console.log('backSpace');
      if (!['', undefined, null].includes(this.postData[this.currentPriceType])) {
        if (this.postData[this.currentPriceType].toString().length) {
          this.postData[this.currentPriceType] = this.postData[this.currentPriceType].toString();
          this.postData[this.currentPriceType] = this.postData[this.currentPriceType].substr(
            0,
            this.postData[this.currentPriceType].length - 1
          );
        }
      }
    },
    // 数字键盘改变值
    keyChange(e) {
      if (this.hasPrice) {
        // 原本有值
        if (e != "." && e != 0) {
          this.postData[this.currentPriceType] = '' + e;
          this.hasPrice = false; // 保证能连续输入
        }
      } else {
        if (['', null, undefined].includes(this.postData[this.currentPriceType])) {
          this.postData[this.currentPriceType] = '' + e;
        } else {
          this.postData[this.currentPriceType] = this.postData[this.currentPriceType].toString();
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
        }
      }
    },
    // 合同类型、分销协议编号、细分业务模式、认购价格、签约价格改变之后要初始化收派金额
    initReceive() {
      if (this.postData.agentReceiveVO.length) {
        this.postData.agentReceiveVO = this.resetReceiveVOS(this.postData.agentReceiveVO);
      }
      if (this.postData.serviceReceiveVO.length) {
        this.postData.serviceReceiveVO = this.resetReceiveVOS(this.postData.serviceReceiveVO);
      }
    },
    // 重置收派金额信息：去掉id、收派套餐、价格
    resetReceiveVOS(list = []) {
      list.forEach((item) => {
        item.showData = [];
        item.packageId = '';
        item.packgeName = '';
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
        searchTip: "输入项目周期搜索",
        api: "postAllTermApi",
        key: "termName",
        id: "termId",
        type: "term",
        other: {
          // auditEnum: 'ConstractAdopt', // 只显示合同审核通过的
          state: 'Start', // 只显示启用
        }
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 确定选择项目周期
    async confirmSelectCycle(data) {
      if (data.termId) {
        if (this.postData.cycleId) {
          this.postData.agentReceiveVO = []; // 收派金额 - 代理费
          this.postData.serviceReceiveVO = []; // 收派金额 - 服务费
          this.postData.documentVO = []; // 上传附件
          this.postData.oneAgentTeam = '';
          this.postData.oneAgentTeamId = '';
          this.postData.refineModel = '';
          this.postData.refineModelName = '';
          this.postData.stage = '';
          this.postData.stageName = '';
          this.postData.propertyType = '';
          this.postData.propertyTypeName = '';
          this.postData.buildingId = '';
          this.postData.buildingName = '';
          this.postData.roomId = '';
          this.postData.roomNo = '';
          await this.resetData();
        }
        this.$nextTick(async () => {
          this.postData.proId = data?.proId;
          this.postData.cycleId = data?.termId;
          this.postData.cycleName= data?.termName;
          await this.getBaseDealInfo(data.termId);
        });
      }
    },
    // 清空数据 - 主要是和初始化数据有关的数据
    resetData() {
      this.tempSubscribePrice = '';
      this.tempSignPrice = '';
      this.contNoList = []; // 分销协议编号
      this.packageIdsList = []; // ids
      this.postData.customerVO = []; // 客户信息
      this.baseInfoInDeal.customerAddVOS = []; // 重置客户数据
      this.postData.offerNoticeVO = []; // 优惠告知书
      // this.postData.documentVO = []; // 上传附件
      let list = ['contType', 'contTypeName', 'contNo', 'recordState', 'recordStr', 'area', 'room', 'hall',
        'toilet', 'propertyNo', 'signType', 'returnRatio', 'subscribePrice', 'subscribeDate',
        'signPrice', 'signDate', 'agencyId', 'agencyName', 'channelLevel']
      this.resetObject('postData', list);
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
        this.postData.serviceReceiveVO = [];
        if (baseInfo.chargeEnum !== 'Agent') {
          let tempList = [];
          tempList.push(
            {
              type: 'ServiceFee', // 服务费
              partyACustomer: '',
              partyACustomerName: '客户',
              packgeName: '',
              packageId: '',
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
            this.postData.serviceReceiveVO.push(...list);
          });
        }
        // 处理优惠告知书的nav
        this.postData.offerNoticeVO = []; //
        if (baseInfo.chargeEnum === 'Agent') {
          this.canAddNoticeFlag = false; // 纯代理费没有优惠告知书
        } else {
          this.canAddNoticeFlag = true; // 其他情况有优惠告知书
        }
        // 归属组织
        this.postData.dealOrgId = baseInfo.groupId;
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
      // 保存来访确认单和成交确认单
      this.tempDocumentList = [];
      this.tempDocumentList = fileList.filter((item) => {
        return ["VisitConfirForm", "DealConfirForm"].includes(item.code);
      });
      if (info.chargeEnum === 'Agent') {
        // 项目周期的收费模式为代理费的话，隐藏优惠告知书
        fileList = fileList.filter((item) => {
          return item.code !== "Notice";
        });
      }
      // 隐藏来访确认单和成交确认单
      fileList = fileList.filter((item) => {
        return !["VisitConfirForm", "DealConfirForm"].includes(item.code);
      });
      this.postData.documentVO = JSON.parse(JSON.stringify(fileList));
      console.log('documentVO', this.postData.documentVO);
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
        parentId: this.id ? this.editBaseInfo.parentId : null,
        cycleId: cycleId,
        roomId: roomId,
        isMainDeal: true, // 是否主成交
        property: propertyType, // 物业类型
        refineModel: this.postData.refineModel, // 细分业务模式
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
      this.postData.contNo = ''; // 重置选择的编号
      this.postData.contTitle = ''; // 重置选择的编号名字
      // 同房号是否存在多份优惠告知书
      this.postData.offerNoticeVO = [];
      switch (baseInfo.dealNoticeStatus) {
        case "NoneNotice":
          // 没有优惠告知书
          this.canAddNoticeFlag = true;
          break;
        case "OneNotice":
          // 有一份优惠告知书
          this.canAddNoticeFlag = false;
          this.postData.offerNoticeVO = baseInfo.notice && baseInfo.notice.length ? baseInfo.notice : [];
          break;
        case "MultipleNotice":
          // 有多份优惠告知书
          this.canAddNoticeFlag = true;
          this.$tool.toast("同房号存在多份已生效的优惠告知书");
          break;
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
      this.postData.area = baseInfo?.myReturnVO?.houseVO?.area;
      // if (baseInfo.myReturnVO && baseInfo.myReturnVO.houseVO && baseInfo.myReturnVO.houseVO.area) {
      //   this.postData.area = baseInfo?.myReturnVO?.houseVO?.area;
      // }
      // 户型
      this.postData.room = baseInfo?.myReturnVO?.houseVO?.room;
      // if (baseInfo.myReturnVO && baseInfo.myReturnVO.houseVO && baseInfo.myReturnVO.houseVO.room) {
      //   this.postData.room = baseInfo?.myReturnVO?.houseVO?.room;
      // }
      this.postData.hall = baseInfo?.myReturnVO?.houseVO?.hall;
      // if (baseInfo.myReturnVO && baseInfo.myReturnVO.houseVO && baseInfo.myReturnVO.houseVO.hall) {
      //   this.postData.hall = baseInfo?.myReturnVO?.houseVO?.hall;
      // }
      this.postData.toilet = baseInfo?.myReturnVO?.houseVO?.toilet;
      // if (baseInfo.myReturnVO && baseInfo.myReturnVO.houseVO && baseInfo.myReturnVO.houseVO.toilet) {
      //   this.postData.toilet = baseInfo?.myReturnVO?.houseVO?.toilet;
      // }
      // 预售合同编号
      this.postData.propertyNo = baseInfo.myReturnVO.houseVO?.propertyNo;
      // 签约类型
      if (baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.signType) {
        this.postData.signType = baseInfo?.myReturnVO?.dealVO?.signType;
      }
      // 成交阶段
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.dealStage) {
        this.postData.stage = baseInfo.myReturnVO.dealVO.dealStage;
        this.postData.stageName = this.getDictName(this.postData.stage, this.stageList);
      }
      // 现场销售
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.sceneSales) {
        this.postData.sceneSales = baseInfo.myReturnVO.dealVO.sceneSales;
      }
      // 明源房款回笼比例(%)
      this.postData.returnRatio = baseInfo.myReturnVO.dealVO?.returnRatio;
      // 认购价格
      this.postData.subscribePrice = baseInfo?.myReturnVO?.dealVO?.subscribePrice;
      // if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.subscribePrice) {
      //   this.postData.subscribePrice = baseInfo?.myReturnVO?.dealVO?.subscribePrice;
      // }
      // 认购日期
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.subscribeDate) {
        this.postData.subscribeDate = baseInfo?.myReturnVO?.dealVO?.subscribeDate;
      }
      // 签约价格
      this.postData.signPrice = baseInfo?.myReturnVO?.dealVO?.signPrice;
      // if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.signPrice) {
      //   this.postData.signPrice = baseInfo?.myReturnVO?.dealVO?.signPrice;
      // }
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
      this.postData.agentReceiveVO = [];
      if (baseInfo.receiveVOS && baseInfo.receiveVOS.length) {
        let tempList = await this.initReceiveVOS(baseInfo.receiveVOS);
        if (this.postData.agentReceiveVO && this.postData.agentReceiveVO.length) {
          this.postData.agentReceiveVO.push(...tempList);
        } else {
          this.postData.agentReceiveVO = tempList;
        }
      }
      // 初始化上传附件表格数据
      await this.getDocumentList(this.postData.contType);
    },
    // 只有一个分销协议的时候默认选中
    initContNo(item = '') {
      if (!item) return;
      this.postData.isMat = null;
      this.packageIdsList = [];
      this.postData.contNo = item.contractNo;
      // 是否垫佣
      this.postData.isMat = item.advancementSituation;
      // 分销模式下获取分销协议返回的收派套餐id
      this.packageIdsList = item.packageMxIds && item.packageMxIds.length ? item.packageMxIds : [];
    },
    // 修改合同类型后构建附件表格数据
    getDocumentList(type) {
      // 先显示对应的附件类型
      if (type === "DistriDeal") {
        // 分销成交
        this.postData.documentVO.push(...this.tempDocumentList);
      } else {
        // 非分销成交
        this.postData.documentVO = this.postData.documentVO.filter((item) => {
          return !["VisitConfirForm", "DealConfirForm"].includes(item.code);
        });
      }
      // 回显房号带出来的附件
      let docs = [];
      if (this.postData.roomId && this.baseInfoInDeal && this.baseInfoInDeal.docs && this.baseInfoInDeal.docs.length) {
        docs = this.baseInfoInDeal.docs;
      }
      // 放入对应的文件
      if (this.postData.documentVO && this.postData.documentVO.length) {
        this.postData.documentVO.forEach((list) => {
          list.fileList = [];
          docs.forEach((item) => {
            if (list.code === item.fileType) {
              list.fileList.push(
                {
                  ...item,
                  name: item.fileName,
                  fileUrls: this.getFileUrls(item, 'url'), // 获取对应文件的默认图片
                  type: this.getFileUrls(item, 'type'), // 获取文件类型：excel、word、pdf
                  canDelete: true, // 是否可以删除
                }
              )
            }
          });
        });
      }
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
    // 初始化渠道商(渠道公司) --- 分销成交模式才有渠道商
    async initAgency(data = [], flag = false) {
      if (flag) {
        // 分销成交模式
        if(data.length > 0) {
          this.postData.agencyId = data[0].agencyId; // 渠道公司Id
          this.postData.agencyName = data[0].agencyName; // 渠道公司
          this.postData.channelLevel = data[0].channelLevel; // 渠道等级Id
          this.postData.brokerId= data[0].brokerId; // 渠道经纪人Id
          this.postData.brokerName= data[0].brokerName || data[0].broker; // 渠道经纪人
        }
      } else {
        // 非分销成交模式 --- 没有渠道相关信息
        let list = ['agencyId', 'agencyName', 'channelLevel', 'brokerId', 'brokerName'];
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
          this[objName][item] = "";
        })
      } else {
        for (let keys in this[objName]) {
          this[objName][keys] = "";
        }
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
    // 上传
    uploadByType(item) {
      console.log(item);
      this.currentUploadType = item.code;
      this.showActionShow = true;
    },
    // 上传选择
    handleUpload(index) {
      let self = this;
      if (index === 0) {
        uni.chooseImage({
          count: 9, // 默认9
          success: (res) => {
            console.log(res);
            if (res && res.tempFiles && res.tempFiles.length > 0) {
              let flag = false;
              flag = self.validFileSizeAndType(res.tempFiles, 'img');
              if (!flag) {
                tool.toast('图片大小不能超过10M!');
                return;
              }
              // 上传
              res.tempFilePaths.forEach((path) => {
                uni.uploadFile({
                  url: tool.getUploadUrl(),
                  filePath: path,
                  name: self.uploadName,
                  header: self.uploadHeader,
                  success: (res) => {
                    let data = JSON.parse(res.data);
                    console.log('图片：', data);
                    self.postData.documentVO.forEach((item) => {
                      if (item.code === self.currentUploadType) {
                        item.fileList.push(
                          {
                            ...data.data[0],
                            fileUrls: '',
                            fileName: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                            type: data?.data[0]?.generateFileType,
                            name: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                          }
                        )
                      }
                    });
                  },
                  fail: (error) => {
                    tool.toast('上传失败，请重新上传' + error);
                    console.log(error);
                  }
                });
              });
            }
          }
        });
      } else {
        wx.chooseMessageFile({
          count: 9, // 最大可选
          type: 'file',
          success: (res) => {
            // console.log(res);
            if (res && res.tempFiles && res.tempFiles.length > 0) {
              let flag = false;
              flag = self.validFileSizeAndType(res.tempFiles, 'file');
              if (!flag) {
                tool.toast('请上传符合要求的文件！');
                return;
              }
              // 上传
              res.tempFiles.forEach((list) => {
                uni.uploadFile({
                  url: tool.getUploadUrl(),
                  filePath: list.path,
                  name: self.uploadName,
                  header: self.uploadHeader,
                  success: (res) => {
                    let data = JSON.parse(res.data);
                    // console.log('文件：', data);
                    self.postData.documentVO.forEach((item) => {
                      if (item.code === self.currentUploadType) {
                        item.fileList.push(
                          {
                            ...data.data[0],
                            fileUrls: self.getFileImg(data.data[0]),
                            fileName: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                            type: data?.data[0]?.generateFileType,
                            name: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                          }
                        )
                      }
                    });
                  },
                  fail: (error) => {
                    tool.toast('上传失败，请重新上传' + error);
                    console.log(error);
                  }
                });
              });
            }
          },
        })
      }
    },
    // 校验上传的图片的大小和类型是否符合要求
    validFileSizeAndType(fileList = [], type = '') {
      if (fileList.length > 0) {
        const FILE_SIZE = 10 * 1024 * 1024; // 文件大小
        const RegStr = /.doc$|.docx$|.xls$|.xlsx$|.pdf$/i; // 上传文件的类型 --- 图片不校验类型
        let sizeList = [];
        let typeList = [];
        if (type === 'img') {
          // 校验图片
          sizeList = fileList.filter((list) => {
            return list.size > FILE_SIZE;
          });
          if (sizeList.length > 0) {
            return false;
          } else {
            return true;
          }
        } else {
          // 校验文件
          fileList.forEach((list) => {
            if (list.size > FILE_SIZE) {
              sizeList.push(list);
            }
            if (!RegStr.test(list.name)) {
              typeList.push(list);
            }
          })
          if (sizeList.length > 0 || typeList.length > 0) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        return false;
      }
    },
    // 获取文件的图片
    getFileImg(file) {
      let url = '';
      let pdfReg = /pdf/i;
      let wordReg = /doc|docx/i;
      let excelReg = /xls|xlsx/i;
      let fileTypes = '';
      if (pdfReg.test(file.generateFileType)) {
        fileTypes = 'pdf';
        url = this.pdfImg;
      }
      if (wordReg.test(file.generateFileType)) {
        fileTypes = 'word';
        url = this.wordImg;
      }
      if (excelReg.test(file.generateFileType)) {
        fileTypes = 'excel';
        url = this.excelImg;
      }
      return url;
    },
    // 获取token
    getToken() {
      this.uploadHeader = {
        'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${storageTool.getToken()}`
      };
    },
    // 添加优惠告知书
    handleSelectNotice() {
      getApp().globalData.searchParams = {
        cssType: 'notice',
        searchTip: '输入业主姓名或电话',
        api: "postNoticeDealList",
        key: "costInfo",
        id: "id",
        type: "notice",
        other: {
          dealId: this.id ? this.id : null,
          cycleId: this.baseInfoByTerm.termId,
          projectId: this.baseInfoByTerm.proId,
          buyUnit: this.postData.buildingId, // 栋座
          roomNumberId: this.postData.roomId, // 多分优惠告知书下需要通过房号去限制
          notificationTypes: ['Notification'], // 只查优惠告知书
          notificationStatuses: ['BecomeEffective'] // 主成交下优惠告知书要是已生效状态
        }
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 确定添加优惠告知书
    async finishAddNotice(data) {
      console.log(data);
      if (!data.id) return;
      let postData = {
        noticeId: data.id
      }
      let noticeInfo = await post_notice_deal_details__noticeId(postData);
      if (noticeInfo.dealNotices && noticeInfo.dealNotices.length) {
        noticeInfo.dealNotices.forEach((item) => {
          // 附件增加fileId
          if (item.annexList && item.annexList.length) {
            item.annexList.forEach((list) => {
              list.canDelete = true;
              list.fileId = list.fileNo; // 统一id
              list.fileName = list.attachmentSuffix; // 统一名字
              list.name = list.attachmentSuffix; // 统一名字
              list.fileUrls = this.getFileUrls(list.attachmentSuffix, 'url'); // 获取文件图片
              list.type = this.getFileUrls(list.attachmentSuffix, 'type'); // 获取文件类型
            });
          }
          item.noticeId = item.id;
          item.addType = "manual";
        });
      }
      if (noticeInfo.customerConvertResponse && noticeInfo.customerConvertResponse.length) {
        noticeInfo.customerConvertResponse.forEach((item, index) => {
          if (index === 0) {
            item.isCustomer = "Yes";
          } else {
            item.isCustomer = "No";
          }
          item.addId = item.id; // 手动添加的时候保存id --- 为了回显收派金额
        });
      }
      let copyList = JSON.parse(JSON.stringify(this.postData.offerNoticeVO || []));
      // 先清除原优惠告知书带出的附件
      this.deleteNoticeAnnex(copyList);
      this.$nextTick(() => {
        this.postData.offerNoticeVO = noticeInfo.dealNotices;
        this.postData.customerVO = noticeInfo.customerConvertResponse;
        // 需要把对应附件展示在上传附件信息模块中
        this.addNoticeAnnex(noticeInfo.dealNotices);
      });
    },
    /* 删除优惠告知书带出的优惠告知书类型附件
    *  delList：Array，当前删除的优惠告知书信息。
    * */
    deleteNoticeAnnex(delList = []) {
      if (delList && delList.length && this.postData.documentVO && this.postData.documentVO.length) {
        this.postData.documentVO.forEach((vo) => {
          // 只需要遍历上传附件类型为优惠告知书的类型
          if (vo.code === 'Notice' && vo.fileList && vo.fileList.length) {
            delList.forEach((list) => {
              if (list.annexList && list.annexList.length) {
                list.annexList.forEach((item) => {
                  vo.fileList = vo.fileList.filter((voList) => {
                    return voList.fileId !== item.fileId;
                  });
                })
              }
              if (list.noticeAttachmentList && list.noticeAttachmentList.length) {
                list.noticeAttachmentList.forEach((item) => {
                  vo.fileList = vo.fileList.filter((voList) => {
                    return voList.fileId !== item.fileId;
                  });
                })
              }
            });
          }
        });
      }
    },

    /* 需要把对应附件展示在上传附件信息模块中
    *  addList：Array，当前添加的优惠告知书信息。
    * */
    addNoticeAnnex(addList = []) {
      if (addList && addList.length && this.postData.documentVO && this.postData.documentVO.length) {
        this.postData.documentVO.forEach((vo) => {
          // 只需要遍历上传附件类型为优惠告知书的类型
          if (vo.code === 'Notice') {
            addList.forEach((list) => {
              if (list.annexList && list.annexList.length) {
                list.annexList.forEach((L) => {
                  L.fileType = 'Notice';
                  L.canDelete = true;
                  vo.fileList.push(L);
                });
              }
            });
          }
        });
      }
    },
    // 预览优惠告知书
    handleViewNotice(item) {
      console.log(item);
      if (item.templateType === "ElectronicTemplate") {
        // pdf文件
        let url = this.$tool.getFileUrl(item.templateId);
        uni.downloadFile({
          url: url,
          success: function (res) {
            let filePath = res.tempFilePath;
            uni.openDocument({
              filePath: filePath,
              fileType: "pdf",
              showMenu: true,
              success: function (res) {
                console.log("打开文档成功");
              },
            });
          },
        });
      } else {
        // 图片
        let imgList = item.noticeAttachmentList || item.annexList;
        if (imgList && imgList.length) {
          let preList = imgList.noticeAttachmentList.map((i) =>
            this.$tool.getFileUrl(i.fileNo)
          );
          uni.previewImage({
            urls: preList,
            current: 1,
          });
        } else {
          this.$tool.toast("附件为空");
        }
      }
    },
    // 删除优惠告知书
    deleteNotice() {
      this.postData.offerNoticeVO = [];
      if (this.baseInfoInDeal.dealNoticeStatus === 'MultipleNotice') {
        // 多份优惠告知书下，删除了优惠告知书，对应的客户也要删除
        this.postData.customerVO = [];
      }
    },
    // 添加客户
    handleSelectCustomer() {
      getApp().globalData.searchParams = {
        cssType: 'custom',
        isAddCustomer: true,
        searchTip: '输入客户姓名或者电话',
        api: "postCustomerGetCustList",
        key: "custInfo",
        id: "id",
        type: "custom",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 确定添加客户
    finishAddCustomer(data) {
      if (!data.id) return;
      let customData = {
        addId: data.id, // 手动添加的时候保存id --- 为了回显收派金额
        cardNo: data.certificateNumber,
        cardType: data.cardType,
        customerName: data.custName,
        customerNo: data.custCode,
        customerPhone: data.custTel,
        customerType: data.custType,
        email: data.email,
        isCustomer: null // 是否主要客户
      }
      if (this.postData.customerVO.length > 0) {
        customData.isCustomer = "No";
        this.postData.customerVO.push(customData);
      } else {
        customData.isCustomer = "Yes";
        this.postData.customerVO.push(customData);
      }
    },
    // 删除客户
    deleteCustom(deleteIndex) {
      if (this.postData.customerVO && this.postData.customerVO.length) {
        this.postData.customerVO = this.postData.customerVO.filter((item, index) => {
          return index !== deleteIndex;
        });
      }
    },
    // 选择收派套餐
    handleSelectPackage(item, type, index) {
      // console.log(item);
      if (['', null, undefined].includes(this.postData?.signPrice) && ['', null, undefined].includes(this.postData?.subscribePrice)) {
        this.$tool.toast("认购价格、签约价格不能都为空！");
        return;
      }
      this.currentPackageType = type;
      this.currentPackageIndex = index;
      this.packageData = {
        cycleId: this.baseInfoByTerm.termId, // 项目周期id
        contType: this.postData.contType, // 合同类型
        // hasRecord: this.postData.hasRecord, // 是否有成交报备(是否分销成交)
        // contNo: this.postData.contNo, // 分销协议编号
        packageMxIds: this.packageIdsList, // 分销成交 --- 选择分销协议后的ids
        costTypeEnum: item.type, // 费用类型
        partyAId: item.partyACustomer, // 甲方或客户
        property: this.postData.propertyType, // 物业类型
        subdivide: this.postData.refineModel, // 细分业务模式
      };
      this.showPackage = true;
    },
    // 确定选择收派套餐
    async finishSelectPackage(data) {
      console.log('finishSelectPackage', data);
      if (!data.packageId) return;
      let dataObj = data;
      delete dataObj['typeName']; // 删除typeName属性
      let postData = {
        detail: dataObj,
        signPrice: this.postData.signPrice ? this.postData.signPrice : null,
        subscribePrice: this.postData.subscribePrice ? this.postData.subscribePrice : null
      }
      let info = await post_pageData_calculateReceiveAmount(postData);
      // console.log(info);
      if (this.postData[this.currentPackageType] && this.postData[this.currentPackageType].length > 0) {
        this.postData[this.currentPackageType].forEach((vo, index) => {
          if (index === this.currentPackageIndex) {
            vo.showData = [data];
            vo.packageId = data.packageMxId;
            vo.receiveAmount = info.receiveAmount;
            vo.commAmount = info.comm;
            vo.rewardAmount = info.reward;
            vo.totalPackageAmount = info.totalBag;
            vo.distributionAmount = info.distri;
            vo.otherChannelFees = info.other;
          }
        });
      }
      console.log('package', this.postData[this.currentPackageType]);
      this.showPackage = false;
    },
    // 取消选择收派套餐
    closeSelectPackage() {
      this.showPackage = false;
    },
    // 提交
    handleSubmit() {
      console.log('handleSubmit', this.postData);
      if(this.postData.stage === "SignUp") {
        this.showSubmitWin = true;
      } else {
        this.confirmSubmit();
      }
    },
    // 确定提交 - 签约
    confirmSubmit() {
      let self = this;
      self.$refs.uForm.setRules(self.rules);
      self.$nextTick(() => {
        // 1.校验收派金额是都有收派套餐
        let flag = self.validReceiveData();
        // console.log('flag', flag);
        if (!flag) {
          self.$tool.toast("请先完善收派金额信息！");
          return;
        }
        self.$refs.uForm.validate(valid => {
          if (valid) {
            this.submit();
          } else {
            console.log('验证失败');
          }
        });
      });
      // console.log(self.postData.documentVO);
    },
    // 确定提交
    async submit() {
      let postData = this.getPostData();
      if (this.id) {
        postData.dealVO.dealCode = this.editBaseInfo?.dealCode;
        postData.dealVO.id = this.editBaseInfo?.id;
        postData.dealVO.parentId = this.editBaseInfo?.parentId;
        postData.dealVO.entryDate = this.editBaseInfo?.entryDate;
        postData.dealVO.entryPersonId = this.editBaseInfo?.entryPersonId;
        await post_deal_updateDealBasicInf(postData);
        this.$tool.toast("修改成功");
      } else {
        await post_deal_entryDealBasicInf(postData);
        this.$tool.toast("新增成功");
      }
      uni.redirectTo({
        url: "/staffPackage/performance/index",
      });
    },
    // 检验收派金额是否都有收派套餐
    validReceiveData() {
      let flag = false; // 默认无
      let tempList = [...this.postData.agentReceiveVO, ...this.postData.serviceReceiveVO];
      if (tempList && tempList.length) {
        flag = tempList.every((item) => {
          return (item.showData && item.showData.length > 0);
        });
      }
      return flag;
    },
    // 构建参数
    getPostData() {
      let obj = {
        agencyVO: [], // 渠道商信息
        customerVO: [], // 客户信息
        dealVO: {
          "businessType": "",
          "charge": "",
          "contNo": "",
          "contType": "",
          "proId": "", // 2021-03-13 需要增加
          "cycleId": '',
          "dataSign": "",
          "dealOrgId": '',
          "isConsign": "",
          "isMarketProject": "",
          "isMat": "",
          "modelCode": "",
          // "noticeIds": [],
          "notices": [],
          "receiveServiceFee": "",
          "oneAgentTeamId": "",
          "recordState": "",
          "refineModel": "",
          "reportId": '',
          "sceneSales": "",
          "signDate": "",
          "signPrice": '',
          "signType": "",
          "stage": "",
          "status": "",
          "subscribeDate": "",
          "subscribePrice": ""
        }, // 成交基础信息
        documentVO: [], // 上传附件
        houseVO: {
          address: "",
          area: "",
          buildingId: "",
          hall: "",
          propertyNo: "",
          propertyType: "",
          room: "",
          roomId: "",
          roomNo: "",
          toilet: ""
        }, // 房屋信息
        receiveAchieveVO: [], // 收派金额 --- 汇总
        receiveVO: [] // 收派金额
      }
      // 1. 渠道商信息 --- 分销成交才会有
      if (this.postData.contType === 'DistriDeal') {
        if (this.id) {
          obj.agencyVO.push(
            {
              dealId: this.id,
              agencyId: this.postData.agencyId,
              brokerId: this.postData.brokerId,
              companyKind: this.postData.companyKind
            }
          )
        } else {
          obj.agencyVO.push(
            {
              agencyId: this.postData.agencyId,
              brokerId: this.postData.brokerId,
              companyKind: this.postData.companyKind
            }
          )
        }
        obj.dealVO.contNo = this.postData.contNo;
        obj.dealVO.isMat = this.postData.isMat;
      }
      // 2. 客户信息
      if (this.postData.customerVO.length > 0) {
        this.postData.customerVO.forEach((item, index) => {
          if (index === 0) {
            item.isCustomer = 'Yes';
          } else {
            item.isCustomer = 'No';
          }
          if (this.id) {
            item.dealId = this.id;
          }
        });
        obj.customerVO = this.postData.customerVO;
      }
      // 3.基础信息
      if (this.postData.serviceReceiveVO && this.postData.serviceReceiveVO.length) {
        obj.dealVO.receiveServiceFee = this.postData.serviceReceiveVO[0].receiveAmount;
      } else {
        obj.dealVO.receiveServiceFee = null;
      }
      obj.dealVO.businessType = this.baseInfoByTerm.busTypeEnum;
      obj.dealVO.charge = this.baseInfoByTerm.chargeEnum;
      obj.dealVO.contType = this.postData.contType;
      obj.dealVO.proId = this.postData.proId;
      obj.dealVO.cycleId = this.postData.cycleId;
      obj.dealVO.dataSign = this.postData.dataSign;
      obj.dealVO.dealOrgId = this.postData.dealOrgId;
      obj.dealVO.isConsign = this.postData.isConsign;
      obj.dealVO.isMarketProject = this.postData.isMarketProject;
      obj.dealVO.modelCode = this.postData.modelCode;
      // 优惠告知书ids
      if (this.postData.offerNoticeVO.length > 0) {
        let firstNoticeList = []; // 类型为优惠告知书的id列表
        let firstId = null; // 第一个类型为优惠告知书的id
        // 需要拿到优惠告知书信息列表中第一个类型为优惠告知书的id
        firstNoticeList = this.postData.offerNoticeVO.find((item) => {
          return item.notificationType === "Notification";
        });
        if (firstNoticeList.length) {
          firstId = firstNoticeList[0].noticeId;
          obj.dealVO.notices.push(
            {
              dealId: firstNoticeList[0].dealId,
              noticeId: firstNoticeList[0].noticeId,
              noticeNo: firstNoticeList[0].noticeNo,
              notificationStatus: firstNoticeList[0].notificationStatus,
              notificationType: firstNoticeList[0].notificationType,
              paymentAmount: firstNoticeList[0].paymentAmount,
              templateId: firstNoticeList[0].templateId,
              templateType: firstNoticeList[0].templateType
            }
          );
        }
        this.postData.offerNoticeVO.forEach((vo) => {
          if (vo.noticeId !== firstId) {
            obj.dealVO.notices.push(
              {
                dealId: vo.dealId,
                noticeId: vo.noticeId,
                noticeNo: vo.noticeNo,
                notificationStatus: vo.notificationStatus,
                notificationType: vo.notificationType,
                paymentAmount: vo.paymentAmount,
                templateId: vo.templateId,
                templateType: vo.templateType
              }
            );
          }
        });
      }
      obj.dealVO.oneAgentTeamId = this.postData.oneAgentTeamId;
      obj.dealVO.recordState = this.postData.recordState;
      obj.dealVO.refineModel = this.postData.refineModel;
      obj.dealVO.reportId = this.baseInfoInDeal.recordId;
      obj.dealVO.sceneSales = this.postData.sceneSales;
      obj.dealVO.signDate = this.postData.signDate;
      obj.dealVO.signPrice = this.postData.signPrice;
      obj.dealVO.signType = this.postData.signType;
      obj.dealVO.stage = this.postData.stage;
      if (['Recognize', 'Subscribe'].includes(this.postData.stage)) {
        obj.dealVO.status = 'Draft'; // 草稿
      } else if (this.postData.stage === 'SignUp') {
        obj.dealVO.status = 'AchieveDeclareUnconfirm'; // 业绩申报待确认
      }
      obj.dealVO.subscribeDate = this.postData.subscribeDate;
      obj.dealVO.subscribePrice = this.postData.subscribePrice;
      obj.houseVO.address = this.postData.address;
      obj.houseVO.area = this.postData.area;
      obj.houseVO.buildingId = this.postData.buildingId;
      obj.houseVO.hall = this.postData.hall;
      obj.houseVO.hall = this.postData.hall;
      obj.houseVO.propertyNo = this.postData.propertyNo;
      obj.houseVO.propertyType = this.postData.propertyType;
      obj.houseVO.room = this.postData.room;
      obj.houseVO.roomId = this.postData.roomId;
      obj.houseVO.roomNo = this.postData.roomId ? this.postData.roomNo : null;
      obj.houseVO.toilet = this.postData.toilet;
      if (this.id) {
        obj.houseVO.id = this.editBaseInfo?.house?.id;
        obj.houseVO.dealId = this.id;
      }
      // 附件信息
      if (this.postData.documentVO.length > 0) {
        // console.log('this.postData.documentVO', this.postData.documentVO);
        this.postData.documentVO.forEach((item) => {
          // 重新上传的
          if (item.fileList.length > 0) {
            item.fileList.forEach((list) => {
              obj.documentVO.push(
                {
                  fileId: list.fileId,
                  fileName: list.name,
                  fileType: item.code
                }
              )
            });
          }
        });
        console.log('obj.documentVO', obj.documentVO);
      }
      if (this.id && obj.documentVO && obj.documentVO.length) {
        // 编辑情况
        obj.documentVO.forEach((vo) => {
          vo.dealId = this.id;
        });
      }
      // 派发金额合计
      if (this.id) {
        // 编辑情况
        if (this.editBaseInfo && this.editBaseInfo.receiveAchieveList && this.editBaseInfo.receiveAchieveList.length) {
          obj.receiveAchieveVO.push(
            {
              dealId: this.editBaseInfo.receiveAchieveList[0].dealId,
              id: this.editBaseInfo.receiveAchieveList[0].id,
              achieveAmount: this.$tool.add(this.agentTotal?.achieveAmount, this.serviceTotal?.achieveAmount),
              otherChannelFees: this.$tool.add(this.agentTotal?.otherChannelFees, this.serviceTotal?.otherChannelFees),
              receiveAmount: this.$tool.add(this.agentTotal?.receivableAmout, this.serviceTotal?.receivableAmout),
            }
          )
        } else {
          obj.receiveAchieveVO.push(
            {
              dealId: null,
              id: null,
              achieveAmount: this.$tool.add(this.agentTotal?.achieveAmount, this.serviceTotal?.achieveAmount),
              otherChannelFees: this.$tool.add(this.agentTotal?.otherChannelFees, this.serviceTotal?.otherChannelFees),
              receiveAmount: this.$tool.add(this.agentTotal?.receivableAmout, this.serviceTotal?.receivableAmout),
            }
          )
        }
      } else {
        // 新增情况
        obj.receiveAchieveVO.push(
          {
            achieveAmount: this.$tool.add(this.agentTotal?.achieveAmount, this.serviceTotal?.achieveAmount),
            otherChannelFees: this.$tool.add(this.agentTotal?.otherChannelFees, this.serviceTotal?.otherChannelFees),
            receiveAmount: this.$tool.add(this.agentTotal?.receivableAmout, this.serviceTotal?.receivableAmout),
          }
        )
      }
      // 派发金额
      let tempList = [...this.postData.agentReceiveVO, ...this.postData.serviceReceiveVO];
      obj.receiveVO = JSON.parse(JSON.stringify(tempList));
      if (obj.receiveVO.length) {
        obj.receiveVO.forEach((vo) => {
          if (vo.type === 'AgentFee' && [null, undefined, 0, ""].includes(vo.otherChannelFees)) {
            vo.otherChannelFees = null; // 后台要置null
          }
        });
      }
      return obj;
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
.notice-under-line {
  color: $u-type-primary;
  text-decoration: underline;
}
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
.active-package {
  color: $u-type-primary;
  text-decoration: underline;
}
</style>
