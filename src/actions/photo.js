export const OPEN_PHOTO='OPEN_PHOTO';//显示照片
export const CLOSE_PHOTO='CLOSE_PHOTO';//关闭
import {IMG_URL} from './public'
//打开照片详情
/*
items.map(item=>{
	list.push({
		src:IMG_URL+item.url,
		w:item.width,
		h:item.height,
		title:item.title
	})
})
*/
export const openPhoto=(items)=>(dispatch,getState)=>{
	let list=[]
	dispatch({
		type:OPEN_PHOTO,
		items:list
	})
};
export const openDocPhoto=(doc)=>(dispatch,getState)=>{
	let list=[]
	doc.list.map(item=>{
	  list.push({
	    src:IMG_URL+item.url,
	    w:item.width,
	    h:item.height,
	    title:doc.title
	  })
	})
	dispatch({
		type:OPEN_PHOTO,
		items:list
	})
}
export const closePhoto=()=>({
	type:CLOSE_PHOTO
})