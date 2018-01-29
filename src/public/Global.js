import {DB_URL} from '../actions/public';
import PouchDB  from 'pouchdb-browser';
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
        this.db = new PouchDB(`${DB_URL}web`, {
          ajax: {
            cache: true,
            timeout: 10000,
          }
        });
    }
    getDB(){//获取数据库
    	return this.db
    }

}
export default Global;