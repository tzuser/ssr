import {UPDATE_CREATION,ADD_CREATION_IMAGES,DID_CREATION_IMAGE,
DEL_CREATION_IMAGE,SAVE_CREATION,
OPEN_CREATION,CLOSE_CREATION
} from '../actions/creation'


//images {isLoad:true,name} || {isLoad:false,src,name}
let initState={rev:null,id:null,images:[],open:false,action:null}
export const creation = (state=initState,action)=>{
	switch(action.type){
		case OPEN_CREATION:
			return Object.assign({},state,{
				open:true,
				images:action.images,
				rev:action.rev,
				id:action.id,
				action:action.action,
			})
		case CLOSE_CREATION:
			return initState
		case UPDATE_CREATION://更新rev
			return Object.assign({},state,{rev:action.rev,id:action.id})
		case ADD_CREATION_IMAGES:
			return Object.assign({},state,{images:state.images.concat(action.images)})
		case DID_CREATION_IMAGE:
			var newImages=state.images.concat();
			let key=newImages.findIndex(item=>item.name==action.name);
			newImages[key]=Object.assign({},newImages[key],{
				isLoad:false,
				src:action.src
			});
			return Object.assign({},state,{images:newImages});
		case DEL_CREATION_IMAGE://删除图片
			return Object.assign({},state,{images:state.images.filter(item=>item.name!=action.name)});
		default :
			return state;
	}
}