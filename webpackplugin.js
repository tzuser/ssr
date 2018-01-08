const url = require('url');
const path = require('path');

class ReactSSRRequestPlugin {
  constructor(options) {
    this.routerConfig = '';
    this.initals = [];
    this.tree = []; //关系树
    this.include = 'src';
    this.filename = 'router-config.json';
    if (options) {
      if (options.include) this.include = options.include;
      if (options.filename) this.filename = options.filename;
    }
    this.record = {};
    this.context = ''; //context地址
  }
  apply(compiler) {
    this.include=this.context = compiler.options.context;

    compiler.plugin("compilation", (compilation) => {
      compilation.plugin("optimize", () => {
        let currTree = this.getTree(compilation)
        if (currTree.length > 0) {
          this.tree = this.tree.concat(currTree);
          this.tree = Array.from(new Set(this.tree)); //去重
          this.getInital(this.tree);
        }
      });
    })

    compiler.plugin("emit", (compilation, callback) => {
      this.routerConfig += JSON.stringify(this.initals);
      let str = this.routerConfig + '';
      let size = str.length;
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
  getInital(tree) {
    tree.map(item => {
      if (item.isRequest) {//如果需要初始请求
        if (!this.record[item.node]) {
          let parents = this.getParent(tree, [item])
          let routes = this.getParentRoutes(parents, item.file);
          if(routes.length==0 ){
            console.log(parents,'app',item);
            routes={path: '/',loader: item.node,request: item.file}
          }
          this.initals = this.initals.concat(routes);
          this.record[item.node] = true;
        }
      }
    })

  }
  //从父级获取所有路由 并且写入加载地址
  getParentRoutes(parents, path) {
    let routes = parents.filter(item => !!item.route)
    let list = []
    routes.map(item => {
      let data = eval('(' + item.route + ')');
      data.request = path;
      list.push(data);
    })
    return list
  }
  //获取所有parent
  getParent(tree, list, resList = []) {
    let data = list.shift()
    let path = data.node;
    tree.map(item => {
      if (item.child == path) { //找到父级
        if (!item.route) { //没有路由则添加队列继续往下找
          list.push(item)
        }
        resList.push(item) //存储列表
      }
    })
    if (list.length == 0) {
      return resList
    }
    return this.getParent(tree, list, resList)
  }
  //获取加载关系树
  getTree(compilation) {
    let list = [];
    compilation.chunks.forEach((chunk) => {
      chunk.forEachModule((module) => {
        if (module.resource && module.resource.includes(this.include)) {
          let moduleSource = module._source._value;
          //去掉换行
          moduleSource = moduleSource.replace(/[\r\n]/g, '')
          //去掉所有Import注释
          moduleSource = moduleSource.replace(/\/\*[^\*]*\*\//g, '')
          //查找所有引入
          let importRe = /[import|require]\([\s]*([\'\"][\.\/\w]+[\'\"])[\s]*\)/g;
          let importStr
          while (importStr = importRe.exec(moduleSource)) {
            let str = importStr[1];
            str = str.replace(/[\'\"\s]/g, '');
            let resList;
             resList= this.getRoute(moduleSource + '', str + '');
            //是否需要请求
            let isRequest = moduleSource.includes('initialRequest');

            if (resList.length > 0) {
              resList.map(item => {
                list.push({
                  node: module.rawRequest,
                  child: str,
                  route: item,
                  isRequest: isRequest,
                  file: module.userRequest
                })
              })
            } else {
              list.push({
                node: module.rawRequest,
                child: str,
                route: false,
                isRequest: isRequest,
                file: module.userRequest
              })
            }
          }
        }
      })
    })
    return list;
  }

  getRoute(moduleSource, pathStr) {
    //module.issuer 父级
    let pathRe = pathStr.replace(/\./g, '\\.')
    pathRe = pathRe.replace(/\//g, '\\/')
    pathRe = pathRe.replace(/\:/g, '\\:')

    let re = new RegExp(`var (\\w+) =[^=^\;]*?${pathRe}`, "m");
    let reName = re.exec(moduleSource)
    if (reName) reName = reName[1];
    //直接引用处理
    let re3 = new RegExp(`var (\\w+) =[^=^\;]*?${reName}`, "m");
    let re3Name = re3.exec(moduleSource)
    if (re3Name) {
      reName = re3Name[1]
    }
    let re2 = new RegExp(`(\{ [exact|path]+\:[^\}]+? component\: ${reName}[\.default]* \})`, "gm");
    let reObj;
    let resList = [];
    while (reObj = re2.exec(moduleSource)) {
      if (reObj) {
        reObj = reObj[1];
        reObj = reObj.replace(/, component\: [^}]+/, `, loader: '${pathStr}'`);
        resList.push(reObj)
      }
    }
    return resList
  }
}



module.exports = ReactSSRRequestPlugin;