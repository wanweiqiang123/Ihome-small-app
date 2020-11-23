/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-30 09:06:57
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-23 11:23:14
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		tabBarList: [
			{
				pagePath: "/pages/home/index/index",
				iconPath: "home",
				selectedIconPath: "home-fill",
				text: "首页",
				count: 2,
				isDot: true,
				customIcon: false,
			},
			{
				pagePath: "/pages/customer/index/index",
				iconPath: "photo",
				selectedIconPath: "photo-fill",
				text: "客户",
				customIcon: false,
			},

			{
				pagePath: "/pages/message/index/index",
				iconPath: "play-right",
				selectedIconPath: "play-right-fill",
				text: "消息",
				customIcon: false,
			},
			{
				pagePath: "/pages/personal/index/index",
				iconPath: "account",
				selectedIconPath: "account-fill",
				text: "我的",
				count: 23,
				isDot: false,
				customIcon: false,
			},
		],
		areaList: [],
	},
	mutations: {
		setTabBarList(state, data) {
			state.tabBarList = data;
		},
		setAreaList(state, data) {
			state.areaList = data;
		}
	},
	actions: {},
	getters: {
		tabBarList: (state) => state.tabBarList,
		areaList: (state) => state.areaList,
	},
})
export default store