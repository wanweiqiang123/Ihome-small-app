<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-25 14:26:33
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-09 10:35:07
-->
<template>
  <view class="enter-client-wrapper">
    <view class="client-info-wrapper">
      <view class="title">客户信息</view>
      <view class="form-wrapper">
        <u-form
          :model="info"
          :rules="infoFormRules"
          ref="infoForm"
          :label-width="150"
        >
          <u-form-item
            label="姓名"
            required
            prop="name"
          >
            <u-input
              v-model="info.name"
              placeholder="姓名"
              :clearable="true"
              input-align="left"
            />
          </u-form-item>
          <u-form-item
            label="性别"
            required
            prop="sex"
          >
            <u-radio-group
              v-model="info.sex"
              class="group-wrapper"
            >
              <u-radio
                v-for="(item, index) in sexList"
                :key="index"
                :name="item.value"
              >{{item.label}}</u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item
            label="手机号"
            required
            prop="mobile"
          >
            <u-input
              type="number"
              v-model="info.mobile"
              placeholder="手机号"
              :clearable="true"
              input-align="left"
            />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="client-info-wrapper u-margin-top-30">
      <view class="title">客户来源</view>
      <view class="form-wrapper">
        <u-form
          :model="info"
          ref="info"
          :label-width="150"
        >
          <u-form-item
            label="来源渠道"
            right-icon="arrow-right"
            class="hide-icon"
          >
            <u-input
              @click="showSource = true"
              v-model="info.sourceName"
              type="select"
              placeholder="来源渠道"
              :clearable="true"
              input-align="left"
            />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="client-info-wrapper u-margin-top-30">
      <view class="title">客户需求</view>
      <view class="form-wrapper">
        <u-form
          :model="info"
          ref="info"
          :label-width="150"
        >
          <u-form-item
            label="意向区域"
            right-icon="arrow-right"
            class="hide-icon"
          >
            <u-input
              @click="selectRegion('intention')"
              v-model="info.region"
              type="select"
              placeholder="意向区域"
              :clearable="true"
              input-align="left"
            />
          </u-form-item>
          <u-form-item label="购房目的">
            <u-checkbox-group class="check-box-wrapper">
              <u-checkbox
                v-model="item.checked"
                v-for="(item, index) in targetList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
          <u-form-item label="意向面积">
            <u-checkbox-group class="check-box-wrapper">
              <u-checkbox
                v-model="item.checked"
                v-for="(item, index) in areaList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
          <u-form-item label="意向户型">
            <u-checkbox-group class="check-box-wrapper">
              <u-checkbox
                v-model="item.checked"
                v-for="(item, index) in unitTypeList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
          <u-form-item label="房屋装修">
            <u-checkbox-group class="check-box-wrapper">
              <u-checkbox
                v-model="item.checked"
                v-for="(item, index) in decorationList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
          <u-form-item label="关注因素">
            <u-checkbox-group class="check-box-wrapper">
              <u-checkbox
                v-model="item.checked"
                v-for="(item, index) in factorList"
                :key="index"
                :name="item.value"
              >
                {{ item.label }}
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="client-info-wrapper u-margin-top-30 u-margin-bottom-30">
      <view class="title">客户详情</view>
      <view class="form-wrapper">
        <u-form
          :model="info"
          ref="info"
          :label-width="150"
        >
          <u-form-item
            label="年龄段"
            right-icon="arrow-right"
            class="hide-icon"
          >
            <u-input
              @click="showAge = true"
              v-model="info.ageRange"
              type="select"
              placeholder="年龄段"
              :clearable="true"
              input-align="left"
            />
          </u-form-item>
          <u-form-item
            label="现住区域"
            right-icon="arrow-right"
            class="hide-icon"
          >
            <u-input
              @click="selectRegion('nowlive')"
              v-model="info.currentLocation"
              type="select"
              placeholder="现住区域"
              :clearable="true"
              input-align="left"
            />
          </u-form-item>
          <u-form-item
            label="工作区域"
            right-icon="arrow-right"
            class="hide-icon"
          >
            <u-input
              @click="selectRegion('work')"
              v-model="info.workLocation"
              type="select"
              placeholder="工作区域"
              :clearable="true"
              input-align="left"
            />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="bottom-btn">
      <u-button
        type="primary"
        @click="saveEnter"
      >保存</u-button>
    </view>
    <u-select
      v-model="showSource"
      :list="sourceList"
      @confirm="confirmSource"
    ></u-select>
    <u-select
      v-model="showRegion"
      mode="mutil-column-auto"
      :list="areaRegion"
      @confirm="confirmRegion"
    ></u-select>
    <u-select
      v-model="showAge"
      :list="ageList"
      @confirm="confirmAge"
    ></u-select>
  </view>
</template>

<script>
import {
  getAreaList,
  addCustomer,
  getCustomerById,
  editCustomer,
} from "@/api/channel";
import { getAllByTypeApi } from "@/api/index";
import { phoneValidator } from "@/common/validate";
export default {
  data() {
    return {
      info: {
        name: "",
        sex: "",
        mobile: "",
        sourceName: "",
        source: "",
        region: "",
        intentionProvince: "", // 省
        intentionCity: "", // 市
        intentionCounty: "", // 区
        target: "",
        area: "",
        unitType: "",
        decoration: "",
        factor: "",
        ageRange: "", // 年龄段显示值
        ageGroup: "", // 年龄段id
        currentLocation: "", // 现住城市
        nowliveProvince: "",
        nowliveCity: "",
        nowliveCounty: "",
        workLocation: "", // 工作城市
        workProvince: "",
        workCity: "",
        workCounty: "",
      },
      infoFormRules: {
        name: [
          { required: true, message: "请输入您的姓名", trigger: ["blur"] },
        ],
        sex: [{ required: true, message: "请选择您的性别", trigger: ["blur"] }],
        mobile: [{ validator: phoneValidator, trigger: ["blur"] }],
      },
      sexList: [],
      showSource: false,
      sourceList: [],
      areaRegion: [], // 省市区
      showRegion: false,
      targetList: [],
      areaList: [],
      unitTypeList: [],
      decorationList: [],
      factorList: [],
      currentSelectRegionType: "", // 意向区域、现住区域、工作区域类型
      showAge: false,
      ageList: [],
      areaDictList: [],
      addOrEdit: "",
      detailId: "",
    };
  },
  onReady() {
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    this.$refs.info.setRules(this.infoFormRules);
  },
  async onLoad(option) {
    this.sexList = await this.getDictByType("SexType");
    await this.getArea();
    this.sourceList = await this.getDictByType("CustomerSourceType");
    this.targetList = await this.getDictByType("HousePurchaseType");
    this.areaList = await this.getDictByType("IntentionSpaceType");
    this.unitTypeList = await this.getDictByType("RoomType");
    this.decorationList = await this.getDictByType("RenovatLevel");
    this.factorList = await this.getDictByType("FocusElementType");
    this.ageList = await this.getDictByType("AgeType");
    if (option.id) {
      this.detailId = option.id;
      uni.setNavigationBarTitle({
        title: "编辑客户",
      });
      this.addOrEdit = "edit";
      const res = await getCustomerById(option.id);
      this.info = {
        ...res,
        sourceName: res.source
          ? this.sourceList.find((v) => v.value === res.source).label
          : "",
        region:
          this.getDictName(res.intentionProvince, this.areaDictList) +
          this.getDictName(res.intentionCity, this.areaDictList) +
          this.getDictName(res.intentionCounty, this.areaDictList),
        ageRange: res.ageGroup
          ? this.ageList.find((v) => v.value === res.ageGroup).label
          : "",
        currentLocation:
          this.getDictName(res.nowliveProvince, this.areaDictList) +
          this.getDictName(res.nowliveCity, this.areaDictList) +
          this.getDictName(res.nowliveCounty, this.areaDictList),
        workLocation:
          this.getDictName(res.workProvince, this.areaDictList) +
          this.getDictName(res.workCity, this.areaDictList) +
          this.getDictName(res.workCounty, this.areaDictList),
      };
      this.targetList.forEach((j) => {
        if (res.purposeOfPurchases.includes(j.value)) {
          j.checked = true;
        } else {
          j.checked = false;
        }
      });
      this.areaList.forEach((j) => {
        if (res.intentAreas.includes(j.value)) {
          j.checked = true;
        } else {
          j.checked = false;
        }
      });
      this.unitTypeList.forEach((j) => {
        if (res.intentHouseTypes.includes(j.value)) {
          j.checked = true;
        } else {
          j.checked = false;
        }
      });
      this.decorationList.forEach((j) => {
        if (res.houseDecorations.includes(j.value)) {
          j.checked = true;
        } else {
          j.checked = false;
        }
      });
      this.factorList.forEach((j) => {
        if (res.factorsOfConcerns.includes(j.value)) {
          j.checked = true;
        } else {
          j.checked = false;
        }
      });
    } else {
      this.addOrEdit = "add";
    }
  },
  methods: {
    // 选择来源
    confirmSource(e) {
      if (e && e.length > 0) {
        this.info.sourceName = e[0].label;
        this.info.source = e[0].value;
      }
    },
    // 显示省市区下拉选项
    selectRegion(type = "") {
      if (!type) return;
      this.currentSelectRegionType = type;
      this.showRegion = true;
    },
    // 确认选择区域
    confirmRegion(e) {
      if (!this.currentSelectRegionType) return;
      if (e && e.length === 3) {
        switch (this.currentSelectRegionType) {
          case "intention":
            // 意向区域
            this.info.region = `${e[0].label}${e[1].label}${e[2].label}`;
            this.info.intentionProvince = e[0].value;
            this.info.intentionCity = e[1].value;
            this.info.intentionCounty = e[2].value;
            break;
          case "nowlive":
            // 现住区域
            this.info.currentLocation = `${e[0].label}${e[1].label}${e[2].label}`;
            this.info.nowliveProvince = e[0].value;
            this.info.nowliveCity = e[1].value;
            this.info.nowliveCounty = e[2].value;
            break;
          case "work":
            // 工作区域
            this.info.workLocation = `${e[0].label}${e[1].label}${e[2].label}`;
            this.info.workProvince = e[0].value;
            this.info.workCity = e[1].value;
            this.info.workCounty = e[2].value;
            break;
        }
      }
    },
    // 选择年龄段
    confirmAge(e) {
      if (e && e.length > 0) {
        this.info.ageRange = e[0].label;
        this.info.ageGroup = e[0].value;
      }
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
    // 保存
    saveEnter() {
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          // 构建参数
          let postData = {
            ...this.info,
            factorsOfConcerns: [], // 关注因素集合
            houseDecorations: [], // 房屋装修集合
            intentAreas: [], // 意向面积集合
            intentHouseTypes: [], // 意向户型集合
            purposeOfPurchases: [], // 购房目的集合
          };
          postData.factorsOfConcerns = this.getTargetList("factorList");
          postData.houseDecorations = this.getTargetList("decorationList");
          postData.intentAreas = this.getTargetList("areaList");
          postData.intentHouseTypes = this.getTargetList("unitTypeList");
          postData.purposeOfPurchases = this.getTargetList("targetList");
          this.handleSubmit(postData);
        } else {
          console.log("验证失败");
        }
      });
    },
    // 确定保存
    async handleSubmit(data) {
      if (this.addOrEdit === "add") {
        try {
          await addCustomer(data);
          uni.showToast({
            title: "录入成功",
            icon: "success",
          });
          uni.reLaunch({
            url: "/channelPackage/clientTab/index",
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await editCustomer(data);
          uni.showToast({
            title: "编辑成功",
            icon: "success",
          });
          uni.redirectTo({
            url: `/channelPackage/clientTab/pages/clientDetails?id=${this.detailId}`,
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    // 获取关注因素、房屋装修、意向面积、意向户型、购房目的多选值
    getTargetList(type = "") {
      if (!type) return [];
      let tempArr = [];
      if (this[type] && this[type].length > 0) {
        this[type].forEach((item) => {
          if (item.checked) {
            tempArr.push(item.value);
          }
        });
      }
      return tempArr;
    },
    // 获取对应类型的字典
    async getDictByType(type) {
      let tempArr = [];
      const dictList = await getAllByTypeApi({ type });
      if (dictList && dictList.length) {
        dictList.forEach((item) => {
          let obj = {
            value: item.code,
            label: item.name,
            checked: false,
          };
          tempArr.push(obj);
        });
      } else {
        tempArr = [];
      }
      return tempArr;
    },
    // 获取省市区
    async getArea() {
      let list = await getAreaList();
      this.areaDictList = list;
      let first = this.$u.deepClone(list[0]);
      list.splice(0, 1);
      list = list.map((v) => ({
        ...v,
        value: v.code,
        label: v.name,
      }));
      this.areaRegion = this.$tool.listToGruop(list, {
        rootId: first.code,
        children: "children",
        parentId: "parentCode",
        id: "value",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.enter-client-wrapper {
  width: 100%;
  height: calc(100vh - 120rpx);
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;

  .title {
    flex: 1;
    //height: 30rpx;
    font-size: 30rpx;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #333333;
    line-height: 42rpx;
  }

  .client-info-wrapper {
    width: 100%;
    background-color: #ffffff;
    padding: 20rpx;

    .form-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 0rpx 20rpx;

      .check-box-wrapper {
        display: flex;
        flex-direction: row;
        //justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
      }
    }
  }

  .bottom-btn {
    width: 100%;
    height: 100rpx;
    box-sizing: border-box;
    padding: 10rpx 50rpx;
    background-color: #ffffff;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    z-index: 9999;
  }
}
</style>