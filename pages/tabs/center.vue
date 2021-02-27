<template>
	<view class="center">
		<view class="logo" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login ? uerInfo.avatarUrl :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{login ? uerInfo.name : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
			</view>
		</view>
		<template v-for="(item, index) in centerList">
			<view class="center-list" :key="index">
				<view class="center-list-item border-bottom">
					<text class="list-icon">{{ icon(item.top.icon) }}</text>
					<text class="list-text">{{ item.top.text }}</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
				<view class="center-list-item">
					<text class="list-icon">{{ icon(item.bottom.icon) }}</text>
					<text class="list-text">{{ item.bottom.text }}</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				avatarUrl: "../../static/logo.png",
				uerInfo: {}
			}
		},
		computed: {
			centerList: function() {
				return [{
						top: {
							icon: '&#xe60c;',
							text: '收藏图片'
						},
						bottom: {
							icon: '&#xe60d;',
							text: '收藏图集'
						}
					},
					{
						top: {
							icon: '&#xe60b;',
							text: '管理图片'
						},
						bottom: {
							icon: '&#xe61a;',
							text: '上传图片'
						}
					},
					{
						top: {
							icon: '&#xe603;',
							text: '关于'
						},
						bottom: {
							icon: '&#xe609;',
							text: '帐号管理'
						}
					}
				]
			}
		},
		methods: {
			icon(type) {
				let tmp = type;
				tmp = '\\' + 'u' + tmp.replace('&#x', '');
				tmp = tmp.substring(0, tmp.length - 1);
				return eval("'" + tmp + "'"); // 将内存中"\\ue715" 转成"\ue715"
			}
		}
	}
</script>

<style>
	/* 个人中心 */
	.center {
		flex-direction: column;
		min-height: 100vh;
	}

	.logo {
		width: 100%;
		height: 240rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #FF80AB;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
	}

	.logo-title {
		height: 150rpx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20rpx;
	}

	.uer-name {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 38rpx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		font-size: 38rpx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150rpx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20rpx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		width: 750rpx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90rpx;
		width: 750rpx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0rpx 20rpx;
	}

	.border-bottom {
		border-bottom-width: 1rpx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40rpx;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 34rpx;
		color: #FF80AB;
		text-align: center;
		font-family: texticons;
		margin-right: 20rpx;
	}

	.list-text {
		height: 90rpx;
		line-height: 90rpx;
		font-size: 34rpx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90rpx;
		width: 40rpx;
		line-height: 90rpx;
		font-size: 34rpx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>
