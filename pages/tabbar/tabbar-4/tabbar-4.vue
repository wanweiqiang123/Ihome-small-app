<template>
	<view class="page">
		<view class="page-top">
			<view class="page-top-left">
				<image style="width: 100px; height: 100px; background-color: #eeeeee;" :mode="mode" :src="headUrl" ></image>
			</view>
			<view class="page-top-right">
				<button style="width:200upx" type="default" @click="gotoLogin()">点击登录</button>
			</view>
			
		</view>
		
		 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello' ,
				mode:'aspectFit',
				headUrl:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2319772070,3114389419&fm=26&gp=0.jpg'
			}
		},
		onLoad() {

		},
		methods: {
			gotoLogin(){
				uni.navigateTo({
					url:'../../login/index'
				})
			}

		}
	}
</script>

<style>
	.page{
		margin: 20upx;
	}
	.page-top{
		display: flex;
	}
	.page-top-left{
		flex: 1;
	}
	.page-top-right{
		flex: 3;
		text-align: left;
	}
</style>
