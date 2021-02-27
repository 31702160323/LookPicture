function init() {
	getProvider();
}

async function getProvider() {
	const providerType = {
		weixin: {
			name: '分享到微信好友',
			id: 'weixin',
		},
		qq: [{
				name: '分享到QQ',
				id: 'qq'
			},
			{
				name: '分享到微信朋友圈',
				id: 'weixin',
				type: 'WXSenceTimeline'
			}
		]
	};
	const [, e] = await uni.getProvider({service: "share"});
	
	const providerList = [];
	for (let i = 0; i < e.provider.length; i++) {
		providerList.push(providerType[e.provider[i]])
	}
	
	return providerList;
}

export default init
