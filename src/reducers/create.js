import {SET_CREATE,ADD_CREATE_IMAGES,DID_CREATE_IMAGE,
DEL_CREATE_IMAGE} from '../actions/post'
//images {isLoad:true,name} || {isLoad:false,src,name}
export const create = (state={rev:null,id:null,text:null,images:[]},action)=>{
	switch(action.type){
		case SET_CREATE:
			return Object.assign({},state,{rev:action.rev,id:action.id})
		case ADD_CREATE_IMAGES:
			return Object.assign({},state,{images:state.images.concat(action.images)})
		case DID_CREATE_IMAGE:
			var newImages=state.images.concat();
			let key=newImages.findIndex(item=>item.name==action.name);
			newImages[key]=Object.assign({},newImages[key],{isLoad:false,src:action.src});
			return Object.assign({},state,{images:newImages});
		case DEL_CREATE_IMAGE://删除图片
			return Object.assign({},state,{images:state.images.filter(item=>item.name!=action.name)});
		default :
			return state;
	}
}