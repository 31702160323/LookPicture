export function Sheet(providerList, imageInfo) {
	if (providerList.length === 0) {
		uni.showModal({
			title: "当前环境无分享渠道!",
			showCancel: false
		})
		return;
	}
	let itemList = providerList.map(function(value) {
		return value.name
	})
	uni.showActionSheet({
		itemList: itemList,
		success: (res) => {
			uni.share({
				provider: providerList[res.tapIndex].id,
				scene: providerList[res.tapIndex].type && providerList[res.tapIndex].type === 'WXSenceTimeline' ?
					'WXSenceTimeline' : "WXSceneSession",
				type: 0,
				title: "uni-app模版",
				summary: imageInfo.title,
				imageUrl: imageInfo.img_src,
				href: "https://uniapp.dcloud.io",
				success: (res) => {
					console.log("success:" + JSON.stringify(res));
				},
				fail: (e) => {
					uni.showModal({
						content: e.errMsg,
						showCancel: false
					})
				}
			});
		}
	})
}