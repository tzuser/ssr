import {
	LOAD,
} from '../actions/public';

const loads = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			return Object.assign({},state,{[action.name]:action.isLoad});
		default:
			return state
	}
}
export default loads