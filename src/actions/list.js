export const SET_LIST = 'SET_LIST';
export const setList=(name,data,page)=>({
	type:SET_LIST,
	name,
	data,
	page
})