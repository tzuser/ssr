export const OPEN_PHOTO='OPEN_PHOTO';//显示照片
export const CLOSE_PHOTO='CLOSE_PHOTO';//关闭
import {IMG_URL} from './public'
//打开照片详情
export const openPhoto=(items)=>(dispatch,getState)=>{
	items.map(item=>{
		item.src=IMG_URL+item.url
		item.w=800;
		item.h=600;
		return item
	})
	dispatch({
		type:OPEN_PHOTO,
		items
	})
}
export const closePhoto=()=>({
	type:CLOSE_PHOTO
})