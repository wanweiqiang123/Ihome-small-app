<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-17 15:26:33
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-22 11:43:42
-->
<template>
  <view class="project-list-wrapper">
    <view class="top-wrapper">
      <view
        class="top-location"
        @click="cityChange"
      >
        <u-icon
          name="map-fill"
          size="50rpx"
        ></u-icon>
        <view>{{getDictName(city, areaRegion)}}</view>
      </view>
      <u-search
        class="search"
        shape="round"
        bg-color="white"
        border-color="#f2f2f2"
        :show-action="false"
        placeholder="请输入项目名称"
        v-model="keyword"
        @search="searchSomething"
      ></u-search>
    </view>
    <view>
      <u-dropdown
        ref="uDropdown"
        @close="dropdownClose"
      >
        <u-dropdown-item :title="dropDownList[0].title">
          <view class="slot-content slot-wrapper">
            <scroll-view
              scroll-y="true"
              style="height: 800rpx;"
            >
              <view
                @click="handleDrop(item.value)"
                class="slot-item-wrapper"
                v-for="item in dropDownList[0].options"
                :key="item.value"
              >
                <view class="type">{{item.label}}</view>
                <view class="icon">
                  <u-icon
                    v-show="dropDownList[0].value === item.value"
                    name="checkbox-mark"
                    size="32rpx"
                  ></u-icon>
                </view>
              </view>
            </scroll-view>
          </view>
        </u-dropdown-item>
        <u-dropdown-item :title="dropDownList[1].title">
          <view class="slot-content slot-wrapper">
            <view>
              <view
                @click="handleChange(1, 'value', item.value)"
                class="slot-item-wrapper"
                v-for="item in dropDownList[1].options"
                :key="item.value"
              >
                <view class="type">{{item.label}}</view>
                <view class="icon">
                  <u-icon
                    v-show="dropDownList[1].value === item.value"
                    name="checkbox-mark"
                    size="32rpx"
                  ></u-icon>
                </view>
              </view>
              <view class="input-wrapper">
                <view class="title">自定义</view>
                <view class="input">
                  <input
                    type="text"
                    class="input-u"
                    v-model="dropDownList[1].minPrice"
                    @input="changePrice"
                    placeholder="最小价格"
                  />
                  <span class="input-gap">-</span>
                  <input
                    type="text"
                    class="input-u"
                    v-model="dropDownList[1].maxPrice"
                    @input="changePrice"
                    placeholder="最大价格"
                  />
                </view>
                <view class="btn">
                  <u-button
                    type="error"
                    size="mini"
                    @click="closeDropdown"
                  >确定</u-button>
                </view>
              </view>
            </view>
          </view>
        </u-dropdown-item>
        <u-dropdown-item :title="dropDownList[2].title">
          <view class="slot-content slot-wrapper">
            <view>
              <view
                @click="handleChange(2, 'value', item.value)"
                class="slot-item-wrapper"
                v-for="item in dropDownList[2].options"
                :key="item.value"
              >
                <view class="type">{{item.label}}</view>
                <view
                  class="icon"
                  v-show="dropDownList[2].value.includes(item.value)"
                >
                  <u-icon
                    name="checkbox-mark"
                    size="32rpx"
                  ></u-icon>
                </view>
              </view>
            </view>
          </view>
        </u-dropdown-item>
        <u-dropdown-item :title="dropDownList[3].title">
          <view class="slot-content slot-more-wrapper">
            <view class="type-wrapper">
              <view class="name">类型</view>
              <view class="type">
                <view
                  v-for="item in dropDownList[3].typeOptions"
                  :key="item.value"
                  :class="dropDownList[3].type === item.value ? 'item item-selected' : 'item'"
                  @click="handleChange(3, 'type', item.value)"
                >{{item.label}}</view>
              </view>
            </view>
            <view class="type-wrapper">
              <view class="name">排序</view>
              <view class="type">
                <view
                  v-for="item in dropDownList[3].sortOptions"
                  :key="item.value"
                  :class="dropDownList[3].sort === item.value ? 'item item-selected' : 'item'"
                  @click="handleChange(3, 'sort', item.value)"
                >{{item.label}}</view>
              </view>
            </view>
            <view class="type-wrapper no-border-bottom">
              <view class="name">装修</view>
              <view class="type">
                <view
                  v-for="item in dropDownList[3].decorationOptions"
                  :key="item.value"
                  :class="dropDownList[3].decoration === item.value ? 'item item-selected' : 'item'"
                  @click="handleChange(3, 'decoration', item.value)"
                >{{item.label}}</view>
              </view>
            </view>
            <view class="btn-wrapper">
              <view
                class="info"
                @click="handleReset"
              >恢复默认</view>
              <view
                class="error"
                @click="closeDropdown"
              >确定</view>
            </view>
          </view>
        </u-dropdown-item>
      </u-dropdown>
      <view class="tag-wrapper">
        <u-tag
          v-for="(item) in tagList"
          :key="item.id"
          :text="item.label"
          @close="closeTag(item)"
          :closeable="true"
          type="info"
        />
      </view>
    </view>
    <view class="project-list">
      <view
        class="content"
        v-for="(item, i) in tablePage"
        :key="i"
        @click="viewProjectDetail(item.proId)"
      >
        <view>
          <u-image
            width="242rpx"
            height="186rpx"
            :src="item.attachAddr"
          ></u-image>
        </view>
        <view class="content-right">
          <view class="title-wrapper">{{item.proName}}</view>
          <view>
            <u-tag
              :text="item.districtName"
              size="mini"
              :closeable="false"
              type="info"
            />
          </view>
          <view class="price-wrapper">
            <span class="price">{{item.averagePrice}}</span>
            <span class="unit">元/m<span class="two">2</span></span>
          </view>
        </view>
      </view>
    </view>
    <u-select
      v-model="selectcity"
      :list="selectList"
      @confirm="confirmCity"
    ></u-select>
  </view>
</template>

<script>
import { getGradeCitiesByChannelIdApi, getAreaList } from "@/api/channel";
import { getAllByTypeApi, getYDProjectListApi } from "@/api/index";
import pagination from "../../../mixins/pagination";
export default {
  mixins: [pagination],
  data() {
    return {
      keyword: "",
      areaRegion: [],
      cityList: [],
      city: "",
      selectcity: false,
      selectList: [],
      dropDownList: [
        {
          value: "", // 单选
          title: "区域",
          options: [],
        },
        {
          value: "", // 单选
          title: "均价",
          minPrice: "", // 最小值
          maxPrice: "", // 最大值
          titleName: "average",
          options: [
            {
              label: "0-1万",
              value: "1",
              minPrice: "0",
              maxPrice: "1",
            },
            {
              label: "1-2万",
              value: "2",
              minPrice: "1",
              maxPrice: "2",
            },
            {
              label: "2-3万",
              value: "3",
              minPrice: "2",
              maxPrice: "3",
            },
            {
              label: "3-4万",
              value: "4",
              minPrice: "3",
              maxPrice: "4",
            },
            {
              label: "4-5万",
              value: "5",
              minPrice: "4",
              maxPrice: "5",
            },
            {
              label: "5万以上",
              value: "6",
              minPrice: "",
              maxPrice: "",
            },
          ],
        },
        {
          value: [],
          title: "户型", // 多选
          titleName: "unit",
          options: [
            {
              label: "一室",
              value: "One",
            },
            {
              label: "二室",
              value: "Two",
            },
            {
              label: "三室",
              value: "Three",
            },
            {
              label: "四室",
              value: "Four",
            },
            {
              label: "五室",
              value: "Five",
            },
            {
              label: "五室以上",
              value: "FivePlus",
            },
          ],
        },
        {
          type: "", // 类型-单选
          sort: "", // 排序-单选
          decoration: "", // 装修-单选
          title: "更多",
          titleName: "more",
          typeOptions: [
            {
              label: "住宅",
              value: "Residence",
            },
            {
              label: "别墅",
              value: "Villa",
            },
            {
              label: "公寓",
              value: "Apartment",
            },
            {
              label: "写字楼",
              value: "Office",
            },
            {
              label: "商铺",
              value: "Shop",
            },
          ],
          sortOptions: [
            {
              label: "均价从高到低",
              value: "AverageDesc",
            },
            {
              label: "均价从低到高",
              value: "AverageAsc",
            },
          ],
          decorationOptions: [
            {
              label: "毛胚",
              value: "Rough",
            },
            {
              label: "装修",
              value: "Simple",
            },
            {
              label: "精装",
              value: "HardBound",
            },
          ],
        },
      ],
      homeImg: require("@/channelPackage/common/img/house.jpg"),
    };
  },
  computed: {
    tagList() {
      return this.initTag();
    },
  },
  async onLoad() {
    this.areaRegion = await this.getArea();
    const channelId = this.$storageTool.getUserInfo().channelId;
    this.cityList = await getGradeCitiesByChannelIdApi(channelId);
    if (this.cityList.length) {
      this.city = this.cityList[0];
      this.getChildCity(this.city);
    }
    this.getListMixin();
  },
  // onShow() {
  //   let item = getApp().globalData.searchBackData;
  //   if (item && item.type === "project") {
  //     this.keyword = item.data.proName;
  //     this.queryPageParameters.proId = item.data.proId;
  //     getApp().globalData.searchBackData = {};
  //     this.getListMixin();
  //   }
  // },
  methods: {
    // 获取列表页
    async getListMixin() {
      this.queryPageParameters.cityCode = this.city;
      let res = await getYDProjectListApi(this.queryPageParameters);
      const item = {
        ...res,
        list: res.list.map((v) => ({
          ...v,
          attachAddr: this.$tool.getFileUrl(v.attachAddr),
        })),
      };
      this.setPageDataMixin(item);
    },
    searchSomething() {
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.queryPageParameters.proName = this.keyword;
      this.getListMixin();
    },
    // 项目跳转搜索页
    // projectSearch() {
    //   getApp().globalData.searchParams = {
    //     api: "getFuzzySearchByCityApi",
    //     key: "proName",
    //     id: "proId",
    //     type: "project",
    //     other: {
    //       city: this.city,
    //     },
    //   };
    //   uni.navigateTo({
    //     url: "/pages/search/index/index",
    //   });
    // },
    // 获取字典
    async getDictByType(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 获取省市区
    async getArea() {
      let areaList = await getAreaList();
      return areaList;
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
    // 根据城市编号获取下级区域
    async getChildCity(code) {
      const list = this.areaRegion.filter((v) => v.parentCode === code);
      this.dropDownList[0].options = list.map((v) => ({
        label: v.name,
        value: v.code,
      }));
    },
    // 城市变更
    cityChange() {
      this.selectcity = true;
      this.selectList = this.cityList.map((v) => ({
        label: this.getDictName(v, this.areaRegion),
        value: v,
      }));
    },
    confirmCity(v) {
      this.getChildCity(v[0].value);
    },
    // 手动关闭下拉菜单
    closeDropdown() {
      this.$refs.uDropdown && this.$refs.uDropdown.close();
    },
    // 区域方法
    handleDrop(value) {
      this.dropDownList[0].value = value;
      this.initTag();
    },
    // 构建选中的tag
    initTag() {
      let tagList = [];
      if (this.dropDownList.length > 0) {
        this.dropDownList.forEach((list, index) => {
          switch (index) {
            case 0: // 区域 - 单选
              if (list.value) {
                list.options.forEach((option) => {
                  if (option.value === list.value) {
                    tagList.push({
                      id: new Date().getTime() + tagList.length,
                      index: index,
                      label: option.label,
                      value: option.value,
                    });
                  }
                });
              }
              break;
            case 1: // 均价 - 单选
              if (list.value) {
                list.options.forEach((option) => {
                  if (option.value === list.value) {
                    tagList.push({
                      id: new Date().getTime() + tagList.length,
                      index: index,
                      minPrice: "",
                      maxPrice: "",
                      label: option.label,
                      value: option.value,
                    });
                  }
                });
              } else {
                if (list.minPrice && list.maxPrice) {
                  // tagList.push(`${list.minPrice}-${list.maxPrice}万`);
                  tagList.push({
                    id: new Date().getTime() + tagList.length,
                    index: index,
                    minPrice: list.minPrice,
                    maxPrice: list.maxPrice,
                    label: `${list.minPrice}-${list.maxPrice}万`,
                    value: "",
                  });
                }
              }
              break;
            case 2: // 户型 - 多选
              if (list.value && list.value.length > 0) {
                list.value.forEach((item) => {
                  list.options.forEach((option) => {
                    if (option.value === item) {
                      tagList.push({
                        id: new Date().getTime() + tagList.length,
                        index: index,
                        value: option.value,
                        label: option.label,
                      });
                    }
                  });
                });
              }
              break;
            case 3: // 更多 - 单选
              if (list.type) {
                // 类型
                list.typeOptions.forEach((option) => {
                  if (option.value === list.type) {
                    tagList.push({
                      id: new Date().getTime() + tagList.length,
                      type: "type",
                      index: index,
                      value: option.value,
                      label: option.label,
                    });
                  }
                });
              }
              if (list.sort) {
                // 排序
                list.sortOptions.forEach((option) => {
                  if (option.value === list.sort) {
                    tagList.push({
                      id: new Date().getTime() + tagList.length,
                      type: "sort",
                      index: index,
                      value: option.value,
                      label: option.label,
                    });
                  }
                });
              }
              if (list.decoration) {
                // 装饰
                list.decorationOptions.forEach((option) => {
                  if (option.value === list.decoration) {
                    tagList.push({
                      id: new Date().getTime() + tagList.length,
                      type: "decoration",
                      index: index,
                      value: option.value,
                      label: option.label,
                    });
                  }
                });
              }
              break;
          }
        });
      }
      return tagList;
    },
    // 改变最小价格和最大价格事件
    changePrice(event) {
      if (
        this.dropDownList[1].options &&
        this.dropDownList[1].options.length > 0
      ) {
        let flag = false;
        this.dropDownList[1].options.forEach((option) => {
          if (
            option.minPrice === this.dropDownList[1].minPrice &&
            option.maxPrice === this.dropDownList[1].maxPrice
          ) {
            flag = true;
            this.dropDownList[1].value = option.value;
          }
        });
        if (!flag) {
          this.dropDownList[1].value = "";
        }
      }
    },
    // 下拉框自定义方法click事件
    handleChange(index, key, value) {
      switch (index) {
        case 2: // 户型 - 多选
          if (
            this.dropDownList[index][key] &&
            this.dropDownList[index][key].length > 0
          ) {
            if (this.dropDownList[index][key].includes(value)) {
              this.dropDownList[index][key] = this.dropDownList[index][
                key
              ].filter((item) => {
                return item !== value;
              });
            } else {
              this.dropDownList[index][key].push(value);
            }
          } else {
            this.dropDownList[index][key].push(value);
          }
          break;
        default:
          // 均价和更多
          if (this.dropDownList[index][key] === value) {
            this.dropDownList[index][key] = "";
            if (index === 1) {
              this.dropDownList[index].minPrice = "";
              this.dropDownList[index].maxPrice = "";
            }
          } else {
            this.dropDownList[index][key] = value;
            if (index === 1) {
              // 自定义的显示值
              if (
                this.dropDownList[index].options &&
                this.dropDownList[index].options.length > 0
              ) {
                this.dropDownList[index].options.forEach((option) => {
                  if (option.value === value) {
                    this.dropDownList[index].minPrice = option.minPrice;
                    this.dropDownList[index].maxPrice = option.maxPrice;
                  }
                });
              }
            }
          }
          break;
      }
    },
    // 恢复默认
    handleReset() {
      this.dropDownList[3].type = "";
      this.dropDownList[3].sort = "";
      this.dropDownList[3].decoration = "";
    },
    // 关闭Tag
    closeTag(item) {
      if (!item.id) return;
      // 删除对应的选项
      switch (item.index) {
        case 0: // 区域 - 单选
          this.dropDownList[item.index].value = "";
          break;
        case 1: // 均价 - 单选
          if (item.value) {
            this.dropDownList[item.index].value = "";
            this.dropDownList[item.index].minPrice = "";
            this.dropDownList[item.index].maxPrice = "";
          } else {
            if (item.minPrice && item.maxPrice) {
              this.dropDownList[item.index].minPrice = "";
              this.dropDownList[item.index].maxPrice = "";
            }
          }
          break;
        case 2: // 户型 - 多选
          if (
            this.dropDownList[item.index].value &&
            this.dropDownList[item.index].value.length > 0
          ) {
            this.dropDownList[item.index].value = this.dropDownList[
              item.index
            ].value.filter((v) => {
              return v !== item.value;
            });
          }
          break;
        case 3: // 更多 - 单选
          this.dropDownList[item.index][item.type] = "";
          break;
      }
      this.queryPageParameters = {
        pageNum: 1,
        pageSize: 10,
      };
      this.dropdownClose();
    },
    // 关闭弹层时触发
    dropdownClose() {
      if (this.tagList.length) {
        let arr = [];
        this.tagList.forEach((v) => {
          if (v.index === 0) {
            this.queryPageParameters.district = v.value;
          } else if (v.index === 1) {
            if (Number(v.value) !== 6) {
              this.queryPageParameters.minPrice = v.minPrice
                ? Number(v.minPrice)
                : Number(v.value) - 1;
              this.queryPageParameters.maxPrice = v.maxPrice
                ? Number(v.maxPrice)
                : Number(v.value);
            } else {
              this.queryPageParameters.maxPrice = 0;
              this.queryPageParameters.minPrice = 5;
            }
          } else if (v.index === 2) {
            arr.push(v.value);
            this.queryPageParameters.roomTypeEnums = arr;
          } else if (v.index === 3) {
            if (v.type === "type") {
              this.queryPageParameters.propertyEnum = v.value;
            } else if (v.type === "sort") {
              this.queryPageParameters.proSortEnum = v.value;
            } else if (v.type === "decoration") {
              this.queryPageParameters.decoration = v.value;
            }
          }
        });
        this.tablePage = [];
        this.queryPageParameters.pageNum = 1;
        this.getListMixin();
      }
    },
    // 查看项目详情
    viewProjectDetail(id) {
      uni.navigateTo({
        url: `/channelPackage/homeTab/pages/projectDetail?proId=${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.project-list-wrapper {
  width: 100%;
  box-sizing: border-box;

  .top-wrapper {
    width: 100%;
    height: 72rpx;
    box-sizing: border-box;
    padding: 0rpx 20rpx;
    margin-top: 10rpx;
    display: flex;

    .top-location {
      width: 160rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      view {
        font-size: 30rpx;
      }
    }

    .search {
      flex: 1;
      height: 72rpx;

      /deep/ .u-content {
        height: 72rpx !important;
      }
    }
  }

  .slot-wrapper {
    width: 100%;
    background-color: #ffffff;

    .slot-item-wrapper {
      box-sizing: border-box;
      padding: 10rpx 32rpx;
      font-size: 28rpx;
      line-height: 54rpx;
      color: #606266;
      display: flex;
      flex-direction: row;
      align-items: center;

      .type {
        flex: 1;
      }

      .icon {
        /deep/.u-icon__icon {
          color: #2979ff;
        }
      }
    }
  }

  .input-wrapper,
  .input {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .title {
      width: 180rpx;
    }

    .input-u {
      width: 180rpx;
      height: 70rpx;
      line-height: 70rpx;
      box-sizing: border-box;
      padding: 1rpx 22rpx;
      border: 1rpx solid #dcdfe6;
    }

    .input-gap {
      width: 30rpx;
      text-align: center;
    }
  }

  .btn {
    width: 150rpx;
    text-align: right;

    /deep/.u-btn {
      height: 60rpx;
      padding: 0rpx 50rpx;
    }
  }

  .input-wrapper {
    box-sizing: border-box;
    padding: 20rpx 32rpx;
    font-size: 28rpx;
    line-height: 54rpx;
    color: #606266;
  }

  .slot-more-wrapper {
    width: 100%;
    background-color: #ffffff;

    .type-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 32rpx;
      border-bottom: 1px solid black;

      .name {
        font-size: 34rpx;
        box-sizing: border-box;
        padding: 20rpx 0rpx;
      }

      .type {
        box-sizing: border-box;
        margin-bottom: 20rpx;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        view {
          height: 60rpx;
          line-height: 20rpx;
          box-sizing: border-box;
          margin-right: 30rpx;
          margin-bottom: 30rpx;
          padding: 20rpx 20rpx;
          background-color: #f2f2f2;
        }
      }
    }

    .no-border-bottom {
      border-bottom: none;
    }

    .btn-wrapper {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      view {
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex: 1;
        text-align: center;
      }

      .info {
        border-color: #f2f2f2;
        background-color: #f2f2f2;
      }

      .error {
        color: #fff;
        border-color: #fa3534;
        background-color: #fa3534;
      }
    }

    .item-selected {
      border: 2rpx solid #d9001b;
      color: #d9001b;
    }
  }

  .tag-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 8rpx 20rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-bottom: 1rpx solid #f1f1f1;

    /deep/.u-tag {
      box-sizing: border-box;
      margin-right: 10rpx;
      margin-bottom: 10rpx;
    }
  }

  .project-list {
    width: 100%;
    box-sizing: border-box;
    padding: 2rpx 20rpx;

    .project-scroll-view {
      min-height: 500rpx;
    }

    .content {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 0rpx;
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #f2f2f2;

      .content-right {
        flex: 1;
        box-sizing: border-box;
        margin-left: 25rpx;

        view {
          box-sizing: border-box;
          margin-bottom: 10rpx;
        }

        .title-wrapper {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1c1c1c;
        }

        .price-wrapper {
          width: 100%;
          color: #fd4918;
          font-family: PingFang SC;

          .price {
            font-size: 32rpx;
            font-weight: 600;
          }

          .unit {
            font-size: 22rpx;
            box-sizing: border-box;
            display: inline-block;
            margin-left: 8rpx;
          }

          .two {
            vertical-align: super;
            font-size: 18rpx;
          }
        }

        .rule {
          width: 100%;

          .rule-tap {
            width: 40rpx;
            height: 40rpx;
            line-height: 40rpx;
            text-align: center;
            display: inline-block;
            background-color: orange;
            color: white;
            box-sizing: border-box;
            margin-right: 8rpx;
            border-radius: 17%;
          }
        }
      }
    }
  }
}
</style>