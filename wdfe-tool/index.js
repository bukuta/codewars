var fs=require('fs');
var path=require('path');
var htmlparser=require('htmlparser');
require('html-document');
console.log("wdfe-build...");

var npm=require('npm');
npm.load(function(err,rs){
  return;
  console.log('load',err,rs);
  npm.commands.install(['underscore'],function(err,rs){
    console.log('installed:',err,rs);  
    process.exit(0);
  });
});
//console.log(npm.commands);

var readInstalled=require('read-installed');
readInstalled('./',{depth:10},function(err,data){
  //console.log('installed',err,data);
  if(err){
    throw new Error(err)
  }
  var deps=data.dependencies;
  for(var i in deps){
    console.log(i,deps[i].version);

  }
});


const COM="bukuta-components";

//读取package.json,检索内部模块字段
var packagecontent=fs.readFileSync('package.json').toString();
packagejson=JSON.parse(packagecontent);
//console.log(packagejson);
//console.log(packagejson[COM]);
//
//main:入口文件
//遍历包内所有html,css,js,
//

var coms=(packagejson[COM])||{};
var html=coms.html,javascript=coms.javascript,css=coms.css;
//console.log(html,javascript,css);
return 0;
var htmlcontent=fs.readFileSync(html);
var div=document.createElement('div');
div.innerHTML=htmlcontent;
//console.log(div);
//console.log(div.innerHTML);

var ms=div._childNodes;
//console.log(ms);

var el=div.getElementsByTagName('meta');
//console.log(el);
if(el.length>0){
  el=el[0];
}
//el.removeChild();

//div.removeChild(el);
el._parentNode.removeChild(el);
//console.log(el);
console.log(div.innerHTML);
return 0;
process.exit(0);
//console.log(htmlcontent.toString());
var htmlhandler=new htmlparser.DefaultHandler(function(error,dom){
  if(error){
    throw error;
  }
  //console.log(dom);
},{ignoreWhitespace:true});
var parser=new htmlparser.Parser(htmlhandler);
parser.parseComplete(htmlcontent);
//console.log(htmlhandler.dom);
var metas=[];
var components=[];
walkdomlist(htmlhandler.dom,function(dom){
  console.log('filter:',dom.type,dom.type=='tag'?dom.name:'');
  if(dom.type=='tag'){
    if(dom.name=='meta'){
      metas.push(dom.attribs); 
    }
    if(dom.name=='text'){

    }
    if(dom.name=="wdfe:component"){
      components.push(dom.attribs);
    }
  }
});

console.log(metas);
console.log(components);
//遍历dom,移除特定Meta
function walkdomlist(domlist,filter){
  domlist.forEach(function(dom,index){
    filter(dom);
    if(dom.children&&dom.children.length){
      walkdomlist(dom.children,filter);
    }
  });
}
function transformdomlist(domlist,transform){
  domlist.forEach(function(dom,index){
    transform(dom,index,domlist);
    if(dom.children&&dom.children.length){
      transformdomlist(dom.children,transform);
    }
  });
}
transformdomlist(htmlhandler.dom,function(node,index,nodelist){
  console.log('--------transform------');
  console.log(index,node);
  if(node.tag=='tag'){
    nodelist.splice(index,1);
  }
});
console.log(htmlhandler.dom);
