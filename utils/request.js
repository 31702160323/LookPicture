class Request {
	constructor() {
		this.isConnected = false;
		this.baseUrl = 'https://unidemo.dcloud.net.cn'

		uni.getNetworkType({
		    success: (networkRes) => {
		        this.isConnected = networkRes.networkType != 'none';
		    }
		});

		uni.onNetworkStatusChange((res) => {
			this.isConnected = res.isConnected;
			uni.showToast({
				title: res.isConnected ? '有网络' : '无网络',
				icon: 'none'
			})
		})
	}

	request = (object, method) => {
		if (!this.isConnected) {
			uni.showToast({
				title: '网络未连接',
				duration: 1000,
				icon: 'none'
			})
			return null
		}
		object.url = this.baseUrl + object.url;

		return new Promise((resolve, reject) => {
			uni.request({
				...object,
				method,
				success(response) {
					if (response.statusCode === 200) {
						// 处理业务
						resolve({ res: response.data });
					} else {
						reject({ error: response });
					}
				},
				fail(error) {
					reject({ error });
				},
				complete() {
					uni.hideLoading();
				}
			})
		});
	}

	get = (object) => {
		return this.request(object, "GET")
	}

	post = (object) => {
		return this.request(object, "POST")
	}

	put = (object) => {
		return this.request(object, "PUT")
	}
}

const instance = new Request();

const get = instance.get;
const post = instance.post;
const put = instance.put;

export {
	get,
	post,
	put
}
