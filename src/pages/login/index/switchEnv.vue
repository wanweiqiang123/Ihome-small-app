<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-20 11:42:13
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-20 14:49:49
-->
<template>
  <view>
    <view class="btn"> 当前环境：{{ currentEnv }}</view>
    <view class="btn">
      <u-button type="primary" @click="switchEnv('dev')">dev</u-button>
    </view>
    <view class="btn">
      <u-button type="primary" @click="switchEnv('int')">int</u-button>
    </view>
    <view class="btn">
      <u-button type="primary" @click="switchEnv('uat')">uat</u-button>
    </view>
    <!-- <view class="btn">
      <u-button type="primary" @click="switchEnv('prd')">prd</u-button>
    </view> -->
    <view class="btn">
      <u-button type="error" @click="cleanEnv()">清空</u-button>
    </view>
    <view class="btn" style="color: red; font-size: 30px"> 注意： </view>
    <view class="btn">
      操作成功后，请重右上角菜单中选择重新进入小程序后，切换到新的环境。
    </view>
    <view class="btn">
      具体环境在控制台打印日志中会出现一行【当前api地址：+${请求地址}】
    </view>
    <view class="btn"> 生产环境不具备此功能！体验版默认是uat环境 </view>
  </view>
</template>

<script>
import storageTool from "../../../common/storageTool";
import tool from "../../../common/tool";
export default {
  data() {
    return {
      currentEnv: "",
    };
  },
  onShow() {
    this.currentEnv = storageTool.getEnv();
  },
  methods: {
    cleanEnv() {
      storageTool.removeEnv();
      this.currentEnv = "";
      tool.toast(
        "清除成功,请重右上角菜单中选择重新进入小程序后，切换到新的环境"
      );
    },
    switchEnv(env) {
      storageTool.setEnv(env);
      this.currentEnv = env;
      tool.toast(
        "切换成功,请重右上角菜单中选择重新进入小程序后，切换到新的环境"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  margin: 40rpx;
}
</style>