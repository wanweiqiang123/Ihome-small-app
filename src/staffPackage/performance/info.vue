<!--
 * @Description: 业绩申报-详情
 * @version: 
 * @Author: lsj
 * @Date: 2021-02-09 15:47:25
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-09 16:25:33
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
              type="select"/>
          </u-form-item>
          <u-form-item
            label="细分业务模式"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.refineModelName"
              disabled
              type="select">
          </u-form-item>
          <u-form-item
            label="成交阶段"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.stageName"
              disabled
              type="select"/>
          </u-form-item>
          <u-form-item
            label="物业类型"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.propertyTypeName"
              disabled
              type="select"/>
          </u-form-item>
          <u-form-item
            label="栋 座"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.buildingName"
              disabled
              type="select"/>
          </u-form-item>
          <u-form-item
            label="房 号"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.roomNo"
              disabled
              type="select"/>
          </u-form-item>
          <u-form-item
            label="合同类型"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.contTypeName"
              disabled
              type="select"/>
          </u-form-item>
          <u-form-item
            v-if="postData.contType === 'DistriDeal'"
            label="分销协议编号"
            class="hide-icon"
            right-icon="arrow-right" prop="contNo">
            <u-input
              v-model="postData.contNo"
              disabled
              type="select"/>
          </u-form-item>
          <u-form-item v-if="postData.recordStr" label="报备信息">
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
            required
            label="经纪人"
            class="hide-icon"
            right-icon="arrow-right">
            <u-input
              v-model="postData.brokerName"
              disabled
              type="select"/>
          </u-form-item>
          <u-form-item label="认购价格" prop="subscribePrice">
            <u-input
              disabled
              v-model="postData.subscribePrice"/>
          </u-form-item>
          <u-form-item
            :required="['Subscribe', 'SignUp'].includes(postData.stage)"
            label="认购日期"
            class="hide-icon"
            right-icon="arrow-right" prop="subscribeDate">
            <u-input
              v-model="postData.subscribeDate"
              disabled
              type="select"/>
          </u-form-item>
          <u-form-item label="签约价格" prop="signPrice">
            <u-input
              disabled
              v-model="postData.signPrice"
              placeholder="请输入签约价格"/>
          </u-form-item>
          <u-form-item
            label="签约日期"
            class="hide-icon"
            right-icon="arrow-right" prop="signDate">
            <u-input
              v-model="postData.signDate"
              disabled
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
        <view v-if="postData.agentReceiveVO.length">
          <view class="form-title u-border-bottom">代理费套餐</view>
          <u-form label-width="170">
            <u-form-item
              class="hide-icon"
              right-icon="arrow-right"
              v-for="(item, index) in postData.agentReceiveVO" :key="index"
              :label="item.partyACustomerName">
              <view :class="item.packageId ? 'active-package' : ''">
                {{item.packageId ? "收派标准" : "请选择收派标准"}}
              </view>
            </u-form-item>
          </u-form>
        </view>
        <view v-if="postData.serviceReceiveVO.length">
          <view class="form-title u-border-bottom">服务费套餐</view>
          <u-form label-width="170">
            <u-form-item
              class="hide-icon"
              right-icon="arrow-right"
              v-for="(item, index) in postData.serviceReceiveVO" :key="index"
              :label="item.partyACustomerName">
              <view :class="item.packageId ? 'active-package' : ''">
                {{item.packageId ? "收派标准" : "请选择收派标准"}}
              </view>
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
                <u-image
                  @click="viewImg(list)"
                  width="100%" height="100%" :src="list.fileUrls ? list.fileUrls : imgUrl + list.fileId"></u-image>
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
  get_deal_get__id
} from "@/api/staff";
import {getAllDictByType} from "@/api";
import {getImgUrl} from "@/api/channel";
import {currentEnvConfig} from "@/env-config";
export default {
  name: "performanceInfo",
  data() {
    return {
      id: null, // 成交id-编辑用
      imgUrl:`${currentEnvConfig['protocol']}://${currentEnvConfig['apiDomain']}/sales-api/sales-document-cover/file/browse/`,
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
      contNoList: [], // 分销协议列表---initPage接口
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
        contNo: '',
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
      baseInfoByTerm: {
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
        noticePDF: [], // 优惠告知书PDF
        customerIds: [], // 业主身份证
        visitConfirmForms: [], // 来访确认书
        dealConfirmForms: [], // 成交确认书
        customerAddVOS: [], // 客户信息
        selectableChannelIds: [], // 可选的渠道商ids
        dealNoticeStatus: '', // 同房号是否存在多份优惠告知书(NoneNotice-没有优惠告知书、OneNotice-一份优惠告知书、MultipleNotice-多份优惠告知书)
      }, // 通过initPage接口获取到的成交信息(项目周期 + 房号)
      tempList: [], // 临时的收派金额信息
      // 编辑功能相关字段
      editBaseInfo: null, // 编辑初始化页面数据
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
    this.dictList = await this.getAllDictByTypes(this.dictObj);
    this.NotificationTypeList = await this.getSignDict("NotificationType");
    this.FeeTypeList = await this.getSignDict("FeeType");
    if (option && option.id) {
      await this.init(option.id);
    }
  },
  methods: {
    // 初始化页面
    init(id) {
      let info  = get_deal_get__id({id: id});
      console.log(info);
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
    // 返回
    handleBack() {
      uni.redirectTo({
        url: "/staffPackage/performance/index",
      });
    }
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
.active-package {
  color: $u-type-primary;
  text-decoration: underline;
}
</style>
