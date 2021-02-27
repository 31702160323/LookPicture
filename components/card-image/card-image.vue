<template>
	<view>
		<view class="column card" :style="{ width: `calc(${ 100 / span }vw - 40rpx)` }" @click="goDetail(item)">
			<image class="card-image" :src="item.img_src" mode="widthFix" lazy-load />
			<text class="card-badge">{{ item.img_num }}P</text>
			<view class="row card-bottm">
				<view>{{ item.title }}</view>
				<view @click.stop="share(item)">分享</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'card-image',
		props: ['item', 'span'],
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: "/pages/detail/detail?data=" + encodeURIComponent(JSON.stringify(e))
				})
			},
			share(item) {
				Sheet(this.providerList, item);
			}
		}
	}
</script>

<style>
	.card {
		position: relative;
		margin: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.card-image {
		width: 100%;
	}

	.card-badge {
		line-height: 1;
		display: inline-block;
		padding: 3px 6px;
		font-size: 12px;
		border-radius: 15px;
		text-align: center;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 20upx;
		right: 20upx;
		color: #FFFFFF;
		background-color: #FF80AB;
	}

	.card-bottm {
		width: 100%;
		justify-content: center;
		align-items: center;
		padding: 20upx;
		font-size: 30upx;
	}

	.card-bottm view {
		flex: 1;
		padding: 14px 0px;
		align-items: center;
	}

	.card-bottm view:last-child {
		font-size: 30upx;
		padding-right: 40rpx;
		color: #FF80AB;
		justify-content: flex-end;
	}
</style>
