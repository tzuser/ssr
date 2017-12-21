import {
	LOAD,
} from '../actions/public';

const loads = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			let newState=Object.assign({},state);
			newState[action.name]=action.isLoad;
			return newState
		default:
			return state
	}
}
export default loads