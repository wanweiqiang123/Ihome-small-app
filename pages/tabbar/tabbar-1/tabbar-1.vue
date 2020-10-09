<template>
	<view class="page">
		<view class="wrap">
			<u-swiper :list="list"></u-swiper>
		</view>
	</view>

</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		onLoad() {

		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			}

		}
	}
</script>

<style lang="scss" scoped>
	.page {
		margin: 20rpx;
	}

	.wrap {
		padding: 0rpx;
	}
</style>
