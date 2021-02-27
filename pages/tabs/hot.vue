<template>
	<view class="box row wrap">
		<block v-for="(item, index) in list" :key="`${index}-${item.id}`">
			<card-image :item="item" span="2"></card-image>
		</block>
		<text class="loadMore">加载中...</text>
	</view>
</template>

<script>
	import {
		Sheet
	} from "@/utils/util.js"
	import {
		getPosts
	} from "@/api/picture.js"
	
	export default {
		data() {
			return {
				providerList: [],
				list: [],
				fetchPageNum: 1
			}
		},
		onLoad() {
			this.getData();
		},
		onReachBottom() {
			console.log("滑动到页面底部")
			this.getData();
		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.list = [];
			this.fetchPageNum = 1;
			this.getData();
		},
		methods: {
			async getData() {
				let {
					res,
					error
				} = await getPosts(this.fetchPageNum);

				if (error) {
					console.log('error', error)
					return;
				}
				if ( this.list[0] && res[0]['id'] === this.list[0]['id']) {
					uni.showToast({
						title: "已经最新",
						icon: "none",
					})
					return;
				}
				this.$set(this.$data, 'list', this.list.concat(res));
				this.fetchPageNum += 1;
				uni.stopPullDownRefresh()
			}
		}
	}
</script>

<style>

</style>
