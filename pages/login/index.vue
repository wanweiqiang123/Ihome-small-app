<template>
	<view class="page">
		<view class="content">
			<view class="form-item-title">
				爱家经纪云
			</view>
			<view class="form-item form-item-buttom">
				<view class="form-item-left">账号</view>
				<view class="form-item-right">
					<input placeholder="账号" />
				</view>
			</view>
			<view class="form-item form-item-buttom">
				<view class="form-item-left">密码</view>
				<view class="form-item-right">
					<input type="text" password placeholder="密码" />
				</view>
			</view>
			<view style="margin-top:40upx">
				<button   type="primary" @click="loginBtn()">登录</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad() {
			console.log('登录页面')

		},
		data() {
			return {

			};
		},
		methods: {
			loginBtn() {
				console.log('loginBtn')
				uni.switchTab({
					url: '../tabbar/tabbar-4/tabbar-4'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 30upx;
	}

	.content {}

	.form-item-title {
		font-weight: 600;
		text-align: center;
		line-height: 80upx;
	}

	.form-item {
		display: flex;
		height: 80upx;
		line-height: 80upx;
	}

	.form-item-left {
		width: 120upx;
		text-align: right;
		margin-right: 40upx;
	}

	.form-item-right {
		flex: 1;

		input {
			line-height: 80upx;
			height: 80upx;
			padding: 0upx;
		}
	}

	.form-item-buttom {
		border-bottom: 1px solid #ccc;
	}

	.form-item-top {
		border-top: 1px solid #ccc;
	}
</style>
