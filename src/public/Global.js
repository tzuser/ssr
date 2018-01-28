//单例模式
class Global{  
    static instance;  
    static getInstance() {  
	    if (Global.instance == null) {  
	        Global.instance = new Global();  
	    }  
	    return Global.instance;  
    }
    constructor(){
    	console.log('初始化')
    }
    getDB(){//获取数据库
    	return "数据库"
    }

}
export default Global;