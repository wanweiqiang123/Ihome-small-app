<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-17 09:23:15
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-17 18:08:50
-->
<template>
  <view>
    <u-card
      :border="false"
      padding="20"
      margin="30rpx 30rpx 0 30rpx"
    >
      <view
        class="head"
        slot="head"
      >
        <view>
          <img
            class="head-img"
            :src="src"
            alt=""
          >
        </view>
        <view class="head-title">退款信息</view>
      </view>
      <view
        class="body"
        slot="body"
      >
        <view class="body-msg">
          <view class="">项目名称</view>
          <view class="color">保利大都会</view>
        </view>
        <view class="body-msg">
          <view class="">优惠方式</view>
          <view class="color">5万抵10万优惠折扣</view>
        </view>
        <view class="body-msg">
          <view class="">服务费金额</view>
          <view class="color">¥50000.00</view>
        </view>
        <view class="body-msg">
          <view class="">购买单位</view>
          <view class="color">10栋601房</view>
        </view>
        <view class="body-msg">
          <view class="">业主姓名</view>
          <view class="color">皮小强</view>
        </view>
        <view class="body-msg">
          <view class="">手机号码</view>
          <view class="color">13855318999</view>
        </view>
        <view class="body-msg">
          <view class="">身份证号码</view>
          <view class="color">440221199902220666</view>
        </view>
      </view>
    </u-card>
    <u-gap
      height="20"
      bg-color="#f3f4f6"
    ></u-gap>
    <view class="owner">
      <u-form
        :model="form"
        ref="uForm"
        label-width="150"
      >
        <u-form-item
          required
          label="开户人"
          prop="name"
        >
          <u-input
            v-model="form.name"
            placeholder="请输入开户人姓名"
          />
        </u-form-item>
        <u-form-item
          required
          label="银行帐号"
          prop="zhanghao"
        >
          <u-input
            v-model="form.zhanghao"
            placeholder="请输入银行帐号"
          />
        </u-form-item>
        <u-form-item
          required
          label="银行名称"
          prop="yinhangname"
        >
          <u-input
            v-model="form.yinhangname"
            placeholder="请输入银行名称"
          />
        </u-form-item>
        <u-form-item
          required
          label="银行省市"
          prop="shenshi"
          right-icon="arrow-right"
        >
          <u-input
            class="hide-icon"
            v-model="form.shenshi"
            type="select"
            placeholder="请选择开户银行省市"
            @click="areaShow = true"
          ></u-input>
        </u-form-item>
        <u-form-item
          label="支行名称"
          required
          prop="zhihangmingcheng"
        >
          <u-input
            v-model="form.zhihangmingcheng"
            placeholder="请输入支行名称"
          />
        </u-form-item>
      </u-form>
    </view>
    <u-select
      title="请选择省市"
      v-model="areaShow"
      :list="list"
      confirm-color="#dd524d"
      mode="mutil-column-auto"
      @confirm="confirm"
    ></u-select>
    <view class="button">
      <u-button
        type="primary"
        size="medium"
        @click="submit"
      >保存并预览退款申请书</u-button>
    </view>
  </view>
</template>

<script>
import { getAreaApi } from "../../api/index";
export default {
  data() {
    return {
      src: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
      form: {
        name: "",
        zhanghao: "",
        yinhangname: "",
        shenshi: "",
        zhihangmingcheng: "",
      },
      areaShow: false,
      list: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入开户人姓名",
            trigger: "change",
          },
        ],
        zhanghao: [
          {
            required: true,
            message: "请输入银行帐号",
            trigger: "change",
          },
        ],
        yinhangname: [
          {
            required: true,
            message: "请输入银行名称",
            trigger: "change",
          },
        ],
        shenshi: [
          {
            required: true,
            message: "请选择开户银行省市",
            trigger: "change",
          },
        ],
        zhihangmingcheng: [
          {
            required: true,
            message: "请输入支行名称",
            trigger: "change",
          },
        ],
      },
    };
  },
  onLoad() {
    this.getAreaOption();
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    async getAreaOption() {
      let data = await getAreaApi();
      let first = this.$u.deepClone(data[0]);
      data.splice(0, 1);
      data = data.map((v) => ({
        ...v,
        value: v.code,
        label: v.name,
      }));
      data = data.filter((v) => v.level !== 3);
      this.list = this.$tool.listToGruop(data, {
        rootId: first.code,
        children: "children",
        parentId: "parentCode",
        id: "value",
      });
    },
    confirm(e) {
      if (e.length) {
        this.form.shenshi = e[0].label + e[1].label;
      }
    },
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          console.log("验证通过");
        } else {
          console.log("验证失败");
        }
      });
    },
  },
};
</script>

<style lang="scss">
.head {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &-img {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
  }
  &-title {
    margin-left: 30rpx;
    font-weight: bold;
    font-size: 16px;
  }
}

.body {
  &-msg {
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.owner {
  padding: 0 50rpx;
}

.button {
  padding: 50rpx 0;
  text-align: center;
}

.color {
  color: #999999;
}
</style>