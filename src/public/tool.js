import {EXIF} from 'exif-js';
import format from 'date-fns/format';
//数据和索引返回新的数组
export const toList=({data,keys})=>{
	let newList=[];
	keys.map((item)=>{
	  newList.push(data[item])
	})
	return newList;
};

//通过src获取高宽
export const getSrcSize=(src)=>{
    let sizeStr=src.substring(src.lastIndexOf('_')+1,src.lastIndexOf('.'));
    let size=sizeStr.split('x');
    return {src,width:size[0],height:size[1]}
};

//通过blob生成图片名
export const getImageName=(blob)=>{
    let file=blob.file;
    let name=file.name.substring(0,file.name.lastIndexOf('.'));
    let ext=file.name.substring(file.name.lastIndexOf('.'),file.name.length);
    return `${name}${file.size}_${blob.width}x${blob.height}${ext}`
};

export const countImage=(file)=>{
		return new Promise((resolve,reject)=>{
				const reader = new FileReader();
				reader.onload=function (){
					let result = this.result;
					let img = new Image();  
					img.src = result;
					if (img.complete) {
                       compress(img,file).then(data=>{
			             resolve(data);
                       })
			        } else {  
			          img.onload = ()=>{
                        compress(img,file).then(data=>{
                         resolve(data);
                        })
			          };  
			        }

				}

				reader.readAsDataURL(file); 
		})
		 
}

const compress=(img,file)=>{
	let Orientation,
	imgWidth=img.naturalWidth,
	imgHeight=img.naturalHeight;

	var rFilter = /^(image\/jpeg)$/i;
	if(!rFilter.test(file.type)){
		return new Promise((resolve)=>resolve({
            blob:file,
            file,
            width:imgWidth,
            height:imgHeight
        }))
	}

	EXIF.getData(img, function() {
	    Orientation = EXIF.getTag(this, "Orientation");
	});
	let canvas = document.createElement("canvas");  
	let ctx = canvas.getContext("2d");
	canvas.width = imgWidth;
	canvas.height = imgHeight;

	ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
	if(Orientation && Orientation != 1){  
        switch(Orientation){  
            case 6://需要顺时针（向左）90度旋转  
                canvas=rotateImg(img,'left',canvas);  
                break;  
            case 8://需要逆时针（向右）90度旋转   
                canvas=rotateImg(img,'right',canvas);  
                break;  
            case 3://需要180度旋转   
                canvas=rotateImg(img,'right',canvas);//转两次  
                canvas=rotateImg(img,'right',canvas);  
                break;  
        }         
    }  
    return new Promise((resolve,reject)=>{
    	canvas.toBlob((blob)=>{
    		resolve({
                blob,
                file,
                width:canvas.width,
                height:canvas.height
            })
    	},"image/jpeg", 0.8);
    })
    
}
//对图片旋转处理 added by lzk  
function rotateImg(img, direction,canvas) {
    //alert(img);  
    //最小与最大旋转方向，图片旋转4次后回到原方向    
    var min_step = 0;    
    var max_step = 3;    
    //var img = document.getElementById(pid);    
    if (img == null)return;    
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
    var height = img.height;    
    var width = img.width;    
    //var step = img.getAttribute('step');    
    var step = 2;    
    if (step == null) {    
        step = min_step;    
    }    
    if (direction == 'right') {    
        step++;    
        //旋转到原位置，即超过最大值    
        step > max_step && (step = min_step);    
    } else {    
        step--;    
        step < min_step && (step = max_step);    
    }    
    //旋转角度以弧度值为参数    
    var degree = step * 90 * Math.PI / 180;    
    var ctx = canvas.getContext('2d');    
    switch (step) {    
        case 0:    
            canvas.width = width;    
            canvas.height = height;    
            ctx.drawImage(img, 0, 0);    
            break;    
        case 1:    
            canvas.width = height;    
            canvas.height = width;    
            ctx.rotate(degree);    
            ctx.drawImage(img, 0, -height);    
            break;    
        case 2:    
            canvas.width = width;    
            canvas.height = height;    
            ctx.rotate(degree);    
            ctx.drawImage(img, -width, -height);    
            break;    
        case 3:    
            canvas.width = height;    
            canvas.height = width;    
            ctx.rotate(degree);    
            ctx.drawImage(img, -width, 0);    
            break;    
    } 
    return canvas
}
//贴子时间格式化 date时间戳
export const postDate=(date)=>{
    let now=new Date().valueOf();
    let span=now-date;
    if(span<60*1000){
        return '刚刚'
    }else if(span<60*60*1000){
        let M=parseInt(span/60/1000)
        return `${M}分钟前`
    }else if(span<24*60*60*1000){
        let H=parseInt(span/60/60/1000)
        return `${H}小时前`
    }else if(span<30*24*60*60*1000){
        let D=parseInt(span/24/60/60/1000)
        return `${D}天前`
    }else{
        return format(new Date(date),'YYYY/MM/DD')
    }

}