<template>
	<view class="box">
		<swiper @change="swpierChange" class="swiper">
			<block v-for="(value,index) in images" :key="index">
				<swiper-item @click="preImg(index)" class="flex centre" style="background-color: #000;">
					<image :src="value" mode="widthFix" style="width: 100%;"></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- #ifndef H5 -->
		<view class="detail-btn-view">
			<view class="download" @click="download"></view>
			<!-- #ifdef APP-PLUS -->
			<view v-if="showBtn" class="setting" @click="setting">设为壁纸</view>
			<!-- #endif -->
			<view class="collect" @click="collect"></view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		Sheet
	} from "@/utils/util.js"
	import {
		getDetail
	} from "@/api/picture.js"
	export default {
		data() {
			return {
				index: 0,
				showBtn: uni.getSystemInfoSync().platform == "android",
				providerList: [],
				images: [],
				screenHeight: uni.getSystemInfoSync().windowHeight
			}
		},
		onLoad(e) {
			this.detailDec = e.data;
			let data = JSON.parse(decodeURIComponent(e.data));
			this.imgLength = data.img_num;
			this.images.push(data.img_src);
			this.getData(data.id);
			uni.setNavigationBarTitle({
				title: "1/" + this.imgLength
			});
		},
		// #ifndef APP-PLUS||H5
		onShareAppMessage() {
			return {
				title: "欢迎使用uni-app看图模板",
				path: '/pages/detail/detail?data=' + this.detailDec,
				imageUrl: this.images[this.index]
			}
		},
		// #endif
		// #ifdef APP-PLUS
		onNavigationBarButtonTap(item) {
			if (item.index === 1) {
				this.collect();
				return;
			}
			Sheet(this.providerList, item);
		},
		// #endif
		methods: {
			async getData(id) {
				let {
					res,
					error
				} = await getDetail(id);

				if (error) {
					uni.showModal({
						content: "请求失败，失败原因：" + error,
						showCancel: false
					})
					return;
				}
				console.log(res)

				this.$set(this.$data, 'images', this.images.concat(res.data))
			},
			swpierChange(e) {
				this.index = e.detail.current;
				uni.setNavigationBarTitle({
					title: e.detail.current + 1 + "/" + this.imgLength
				})
			},
			preImg(index) {
				uni.previewImage({
					current: this.images[index],
					urls: this.images
				})
			},
			async download() {
				let [error, res] = await uni.downloadFile({
					url: this.images[this.index]
				})
				if (error) {
					uni.showModal({
						content: "下载失败，" + e.errMsg,
						showCancel: false
					})
					return
				}

				const [saveImageError, saveImageRes] = await uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath
				});

				uni.showToast({
					icon: "none",
					title: `保存到手机相册${saveImageError ? "失败" : "成功" }`
				})
			},
			//#ifdef APP-PLUS
			setting() {
				uni.showLoading({
					title: '正在设为壁纸'
				});
				setTimeout(async () => {
					const Main = plus.android.runtimeMainActivity();
					const wallpaperManager = plus.android.invoke('android.app.WallpaperManager', 'getInstance', Main);
					const [error, res] = await uni.downloadFile({ url: this.images[this.index] })
					let type = "失败";
					try {
						if (error) throw new Error(error);
						const tempFilePath = plus.io.convertLocalFileSystemURL(res.tempFilePath);
						const bitmap = plus.android.invoke('android.graphics.BitmapFactory', 'decodeFile', tempFilePath);
						plus.android.invoke(wallpaperManager, 'setBitmap', bitmap)
						type = "成功"
					} catch (e) {
						console.log(e)
					}
					uni.showToast({
						icon: "none",
						title: `壁纸设置${type}`
					})
				}, 100)
			},
			//#endif
			collect() {
				uni.showToast({
					icon: "none",
					title: "点击收藏按钮"
				})
			},
		}
	}
</script>

<style>
	.detail-btn-view {
		width: 750upx;
		position: fixed;
		bottom: 75upx;
		font-size: 28upx;
		justify-content: space-between;
	}

	.detail-btn-view view {
		opacity: 0.75;
		height: 80upx;
		border-radius: 80upx;
		width: 80upx;
		justify-content: center;
		align-items: center;
		line-height: 80upx;
		margin: 0 30upx;
		font-family: texticons;
		background: #eee;
		color: #555;
	}

	.detail-btn-view view text {
		margin-left: 10upx;
	}

	.detail-btn-view .download:before {
		content: '\e617';
	}

	.detail-btn-view .collect:before {
		content: '\e68d';
	}

	.detail-btn-view .setting {
		flex: 1;
	}
</style>
