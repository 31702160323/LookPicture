<script>
	import init from './utils/init.js'
	
	// #ifdef APP-PLUS
	import {
		addShortcuts
	} from './utils/shortcuts.js'
	// #endif
	export default {
		onLaunch: function() {
			init();
			
			// #ifndef APP-PLUS
			if (uni.getSystemInfoSync().platform == "android") {
				this.main = plus.android.runtimeMainActivity();
				//添加 Shortcuts 方法
				let res = addShortcuts(this.main, [{
					id: 'setting',
					icon: plus.io.convertLocalFileSystemURL('/static/logo.png'), //本地图片,要使用平台绝对路径
					path: '/pages/setting/setting',
					shortLabel: '系统设置',
					title: '系统设置'
				}]);
			}
			// #endif
		},
		onShow: function() {
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform == "android") {
				let intent = plus.android.invoke(this.main, 'getIntent');
				let url = plus.android.invoke(intent, 'getStringExtra', 'path'); // list 里面的 path
			
				//根据 path路径 进行跳转
				if (url === null) return;
				this.$nextTick(function() {
					uni.navigateTo({
						url
					});
				})
			}
			// #endif
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
    @import './common/common.css';
	
	
	page,
	view {
	    display: flex;
	}
	
	page {
	    display: flex;
	    min-height: 100%;
	    background-color: #EFEFEF;
	}
</style>
