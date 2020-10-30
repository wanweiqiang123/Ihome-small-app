/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-30 09:06:57
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-30 10:16:50
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		tabBarList:[]
	},
	mutations: {
		setTabBarList(state, data) {
			state.tabBarList = data;
		},
	},
	actions: {},
	getters: {
		tabBarList: (state) => state.tabBarList,
	}
})
export default store