const url = require('url');
const path = require('path');

class MyPlugin {
  constructor(options) {
    this.routerConfig='';
    this.initals=[];
    this.tree=[];//关系树
    this.include='src';
    this.filename='router-config.json';
    if(options){
      if(options.include)this.include=options.include;
      if(options.filename)this.filename=options.filename;
    }
    this.record={};
    this.context='';
  }
  apply(compiler) {
    this.context = compiler.options.context;
    compiler.plugin("compilation", (compilation)=>{
      compilation.plugin("optimize", ()=>{

          let currTree=this.getImports(compilation)
          if(currTree.length>0){
            this.tree=this.tree.concat(currTree);
            this.tree=Array.from(new Set(this.tree));
            this.getInital(this.tree);
          }
      });
    })

    compiler.plugin("emit",(compilation,callback)=>{
      this.routerConfig+=JSON.stringify(this.initals);
      let str=this.routerConfig+'';
      let size=str.length;
      compilation.assets[this.filename] = {
        source: function() {
          return str;
        },
        size: function() {
          return size;
        }
      };
      callback()
    })
  }
  getInital(tree){
    tree.map(item=>{
      if(item[3]){
        if(!this.record[item[0]]){
          let parents=this.getParent(tree,[item])
          let routes=this.getParentRoutes(parents,item[4]);
          this.initals=this.initals.concat(routes);
          this.record[item[0]]=true;
        }
      }
    })
    
  }
  //从父级获取所有路由 并且写入加载地址
  getParentRoutes(parents,path){
    let routes=parents.filter(item=>!!item[2])
    let list=[]
    routes.map(item=>{
      let data=eval('('+item[2]+')');
      data.request=path;
      list.push(data);
    })
    return list
  }
  //获取所有parent
  getParent(tree,list,resList=[]){
    let data=list.shift()
    let path=data[0];
    tree.map(item=>{
      if(item[1]==path){//找到父级
        if(!item[2]){//没有路由则添加队列继续往下找
          list.push(item)
        }
        resList.push(item)//存储列表
      }
    })
    if(list.length==0){
      return resList
    }
    return this.getParent(tree,list,resList)
  }
  //获取加载树
  getImports(compilation){
    let list=[];
    compilation.chunks.forEach((chunk)=>{
     chunk.forEachModule((module)=>{
      if(module.resource && module.resource.includes(this.include)){
        let moduleSource=module._source._value;
        moduleSource=moduleSource.replace(/[\r\n]/g,'')
        let impRe=/import\(([^\)]+)\)/g;
        let reqRe=/require\(([^\)]+)\)/g;

        let importStr,requireStr
        //是否需要请求
        let isRequest=moduleSource.includes('initialRequest');

        while(importStr=impRe.exec(moduleSource)){

          let str=importStr[1].replace(/\/\*[^\*]*\*\//g,'')
          str=str.replace(/[\'\"\s]/g,'')
          let resList=this.getRoute(moduleSource+'',str+'')
          if(resList.length>0){
            resList.map(item=>{
              list.push([module.rawRequest,str,item,isRequest,module.userRequest])
            })
          }else{
             list.push([module.rawRequest,str,false,isRequest,module.userRequest])
          }
        }
        while(requireStr=reqRe.exec(moduleSource)){
          let str=requireStr[1].replace(/[\'\"]/g,'')
          let resList=this.getRoute(moduleSource+'',str+'')
          if(resList.length>0){
            resList.map(item=>{
              list.push([module.rawRequest,str,item,isRequest,module.userRequest])
            })
          }else{
             list.push([module.rawRequest,str,false,isRequest,module.userRequest])
          }
        }
      }
     })
   })
   return list;
  }
 
  getRoute(moduleSource,pathStr){
//module.issuer 父级
     let pathRe=pathStr.replace(/\./g,'\\.')
     pathRe=pathRe.replace(/\//g,'\\/')
     pathRe=pathRe.replace(/\:/g,'\\:')

     let re=new RegExp(`var (\\w+) =[^=^\;]*?${pathRe}`,"m");
     let reName=re.exec(moduleSource)
     if(reName)reName=reName[1];
     //直接引用处理
     let re3=new RegExp(`var (\\w+) =[^=^\;]*?${reName}`,"m");
     let re3Name=re3.exec(moduleSource)
     if(re3Name){
            reName= re3Name[1]
     }
     let re2=new RegExp(`(\{ [exact|path]+\:[^\}]+? component\: ${reName}[\.default]* \})`,"gm");
     let reObj;
     let resList=[];
     while(reObj=re2.exec(moduleSource)){
      if(reObj){
        reObj=reObj[1];
        reObj=reObj.replace(/, component\: [^}]+/,`, loader: '${pathStr}'`);
        resList.push(reObj)
      }
    }
    return resList
  }
}



module.exports = MyPlugin;



