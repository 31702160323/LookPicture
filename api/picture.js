import { get } from '@/utils/request'

export async function getPosts(page = 0){
	return get({
		url: `/api/picture/posts.php?page=${page}&per_page=5`
	});
}

export async function getDetail(id){
	return get({
		url: `/api/picture/detail.php?id=${id}`
	});
}