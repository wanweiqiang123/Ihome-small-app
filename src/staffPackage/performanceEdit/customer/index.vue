<!--
 * @Description: 新增客户
 * @version: 
 * @Author: lsj
 * @Date: 2021-03-27 14:46:52
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-27 15:46:52
-->
<template>
  <view class="add-customer-wrapper">
    <u-form :model="addFrom" ref="addFrom" label-width="190">
      <u-form-item
        label="客户姓名"
        required
        prop="custName">
        <u-input
          maxlength="20"
          v-model="addFrom.custName"
          placeholder="请输入客户姓名"/>
      </u-form-item>
      <u-form-item
        label="手机号码"
        required
        prop="custTel">
        <u-input
          type="number"
          maxlength="11"
          v-model="addFrom.custTel"
          placeholder="请输入手机号码"/>
      </u-form-item>
      <u-form-item
        label="客户来源"
        class="hide-icon"
        right-icon="arrow-right"
        required
        prop="custOrgName">
        <u-input
          v-model="addFrom.custOrgName"
          @click="showCustomerOrg = true"
          type="select"
          placeholder="请选择客户来源"/>
      </u-form-item>
      <u-form-item
        label="客户类型"
        class="hide-icon"
        right-icon="arrow-right"
        required
        prop="custTypeName">
        <u-input
          v-model="addFrom.custTypeName"
          @click="showCustType = true"
          type="select"
          placeholder="请选择客户类型"/>
      </u-form-item>
      <u-form-item
        label="证件类型"
        class="hide-icon"
        right-icon="arrow-right"
        required
        prop="cardTypeName">
        <u-input
          v-model="addFrom.cardTypeName"
          @click="handleSelectCardType"
          type="select"
          placeholder="请选择证件类型"/>
      </u-form-item>
      <u-form-item
        label="证件编号"
        required
        prop="certificateNumber">
        <u-input
          v-model="addFrom.certificateNumber"
          placeholder="请输入证件编号"/>
      </u-form-item>
      <u-form-item label="电子邮箱" prop="email">
        <u-input
          v-model="addFrom.email"
          placeholder="请输入电子邮箱(选填)"/>
      </u-form-item>
    </u-form>
    <view style="margin-top: 60rpx">
      <u-button type="primary" shape="circle" @click="submitAdd">保存并使用</u-button>
    </view>
    <u-select
      v-model="showCustomerOrg"
      :list="CustomerOrgList"
      value-name="code"
      label-name="name"
      @confirm="confirmCustomerOrg"
    ></u-select>
    <u-select
      v-model="showCustType"
      :list="CustTypeList"
      value-name="code"
      label-name="name"
      @confirm="confirmCustType"
    ></u-select>
    <u-select
      v-model="showCardType"
      :list="CardTypeList"
      value-name="code"
      label-name="name"
      @confirm="confirmCardType"
    ></u-select>
  </view>
</template>

<script>
import {addCustomerApi} from "@/api/staff";
import {getAllDictByType} from "@/api";
import {phoneValidator, emailOrNullValidato} from "@/common/validate";
export default {
  name: "add_customer",
  data() {
    const validCertificateNumber = (rule, value, callback) => {
      const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      if (this.addFrom.cardType === "IDCard") {
        if (!reg.test(value)) {
          callback(new Error('请输入有效的证件号'));
        } else {
          callback();
        }
      } else {
        if (!value) {
          callback(new Error('请输入证件编号'));
        } else {
          callback();
        }
      }
    }
    return {
      dictObj: {
        types: [
          "CustomerOrg", // 客户来源
          "CustType", // 客户类型
          "CardType", // 证件类型
        ]
      }, // 需要用到的字典类型参数
      dictList: [], // 部分字典数据
      CustomerOrgList: [], // 客户来源选择项
      CustTypeList: [], // 客户类型选择项
      CardTypeList: [], // 证件类型选择项
      showCustomerOrg: false,
      showCustType: false,
      showCardType: false,
      addFrom: {
        custName: '',
        custTel: '',
        custOrg: '',
        custOrgName: '',
        custType: '',
        custTypeName: '',
        cardType: '',
        cardTypeName: '',
        certificateNumber: '',
        email: '',
      },
      addFromRules: {
        custName: [
          { required: true, message: "请输入客户姓名", trigger: ["blur"] },
        ],
        custTel: [
          { validator: phoneValidator, trigger: ["blur"] }
        ],
        custOrgName: [
          { required: true, message: "请选择客户来源", trigger: ["blur"] }
        ],
        custTypeName: [
          { required: true, message: "请选择客户类型", trigger: ["blur"] }
        ],
        cardTypeName: [
          { required: true, message: "请选择证件类型", trigger: ["blur"] }
        ],
        certificateNumber: [
          // { validator: validCertificateNumber, trigger: ["blur"] },
          { required: true, message: "请输入证件编号", trigger: ["blur"] }
        ],
        email: [
          { validator: emailOrNullValidato, trigger: ["blur"] }
        ],
      }
    };
  },
  onReady() {
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    this.$refs.addFrom.setRules(this.addFromRules);
  },
  async onLoad(option) {
    console.log(option);
    this.dictList = await this.getAllDictByTypes(this.dictObj);
    this.CustomerOrgList = await this.getSignDict("CustomerOrg");
    this.CustTypeList = await this.getSignDict("CustType");
  },
  methods: {
    // 确定选择客户来源
    confirmCustomerOrg(item) {
      if (item && item.length) {
        this.addFrom.custOrg = item[0].value;
        this.addFrom.custOrgName = item[0].label;
      }
    },
    // 确定选择客户类型
    async confirmCustType(item) {
      if (item && item.length) {
        this.addFrom.custType = item[0].value;
        this.addFrom.custTypeName = item[0].label;
        // 初始化证件类型的值
        this.addFrom.cardType = "";
        this.addFrom.cardTypeName = "";
        await this.initCartType(this.addFrom.custType);
      }
    },
    // 根据客户类型初始化证件类型选项
    async initCartType(custType = '') {
      console.log(custType);
      if (!custType) {
        this.CustTypeList = [];
      } else {
        let CardList = await this.getSignDict("CardType");
        if (custType === "Individual") {
          // 个人
          this.CardTypeList = CardList.filter((item) => {
            return item.code !== "Businesslicense";
          });
          this.addFrom.cardType = "IDCard"; // 个人默认选中居民身份证
          this.addFrom.cardTypeName = await this.getDictName('IDCard', CardList);
        } else {
          // 公司
          this.CardTypeList = CardList.filter((item) => {
            return ['Businesslicense', "Others"].includes(item.code);
          });
          this.addFrom.cardType = "Businesslicense"; // 公司默认选中营业执照
          this.addFrom.cardTypeName = await this.getDictName('Businesslicense', CardList);
        }
      }
    },
    // 选择证件类型
    handleSelectCardType(item) {
      if (!this.addFrom.custTypeName) {
        this.$tool.toast("请先选择客户类型");
        return;
      }
      this.showCardType = true;
    },
    // 确定选择证件类型
    confirmCardType(item) {
      if (item && item.length) {
        this.addFrom.cardType = item[0].value;
        this.addFrom.cardTypeName = item[0].label;
      }
    },
    // 保存并使用
    submitAdd() {
      this.$refs.addFrom.validate(valid => {
        console.log('submitAdd', valid);
        if (valid) {
          this.submit();
        } else {
          console.log('验证失败');
          this.$tool.toast("请完善信息");
        }
      });
    },
    // 确定提交
    async submit() {
      let postData = {
        cardType: this.addFrom.cardType,
        certificateNumber: this.addFrom.certificateNumber,
        custName: this.addFrom.custName,
        custOrg: this.addFrom.custOrg,
        custTel: this.addFrom.custTel,
        custType: this.addFrom.custType,
        email: this.addFrom.email,
      }
      let data = await addCustomerApi(postData);
      console.log(data);
      if (data && data.id) {
        this.$tool.toast("新增成功");
        getApp().globalData.searchBackData = { type: "custom", data };
        uni.navigateBack({
          delta: 2 // 返回到业绩申报页面
        });
      } else {
        this.$tool.toast("新增失败");
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
  },
};
</script>

<style lang="scss">
.add-customer-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 10rpx;
}
</style>
