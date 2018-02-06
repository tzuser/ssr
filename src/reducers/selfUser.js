import {
	LOGIN,
	GET_SELF_INFO,
	INIT_SELF,
	SET_SELF_SUBSCRIBE_UID
} from '../actions/selfUser';
const selfUserInfo={subscribe_uid_list:[]};
const selfUser = (state = selfUserInfo, action) => {
	switch (action.type) {
		case LOGIN:
			return Object.assign({},state,{isLogin:true,token:action.token});
		case GET_SELF_INFO:
			return Object.assign({},state,action.data);
		case INIT_SELF:
			return selfUserInfo
		case SET_SELF_SUBSCRIBE_UID:
			return Object.assign({},state,{subscribe_uid_list:action.list});
		default:
			return state
	}
}
export default selfUser