import {OPEN_DIALOG,CLOSE_DIALOG} from '../constants';

export const open=({title,content,btns})=>({
			type:OPEN_DIALOG,
			title,
			content,
			btns,
		});

export const close=()=>({type:CLOSE_DIALOG})