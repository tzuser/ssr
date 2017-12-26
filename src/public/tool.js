//数据和索引返回新的数组
export const toList=({data,keys})=>{
	let newList=[];
	keys.map((item)=>{
	  newList.push(data[item])
	})
	return newList;
}