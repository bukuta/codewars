/*
 * css样式处理框架：
 * 传入cssfilapath
 * 启动读取文本
 * 解析成ast
 * 处理ast:
 *    如果有image,处理image
 *      取得image路径，
 *      处理成绝对路径
 *      文件是否存在，上传，取得fid,
 *      替换image路径
 *      是否都处理完成
 * 处理完成，
 *    输出格式化文本
 */
var css = require("css");
var Promise=require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var path = require("path");
var upload=Promise.promisify(require('./upload.js').UploadFile);

module.exports=BCSS;
function BCSS(filepath){
  this._filepath=filepath;
}
BCSS.prototype.appendTransfer=function(transfer){

}
BCSS.prototype.process=function(){
  var that=this;
  return fs.readFileAsync(this._filepath).then(function(data){
    that._csscontent=data.toString();
    that._ast=parseAST(that._csscontent,that._filepath);
    //console.log(that._ast);
    return that._ast;
  }).then(function(ast){
    that._promises=[];
    var _transfer=transfer.bind(that);
    ruleswalker(ast.stylesheet.rules,that._filepath, _transfer);
    return Promise.all(that._promises).then(function(){
      return css.stringify(that._ast);
    }).catch(function(e){
      console.log('catch',e); 
    });
  });
}
BCSS.prototype.toString=function(format){
  return "";
}

function parseAST(content,filepath){
  return css.parse(content, { source: filepath });
}

var stop=0;
function ruleswalker(rules,filepath, transfer) {
  //记录路径:
  rules.forEach(function(rule, index) {
    if (rule.rules && rule.rules.length > 0) {
      ruleswalker(rule.rules,filepath, transfer);
    } else {
      transfer(rule,filepath);
    }
  });
}

var property_re = /background(-.*)?/g;
function isBackground(property) {
  var lowerp = property.toLowerCase();
  var r=!!lowerp.match(property_re);
  //console.log('isBackground',r,property)
  return  r;
}

var image_re = /url\s*\(\s*(['"]?)(.*)\1\)/gi;

function getImagepath(files,cb){
  var csspath=files[1],imagepath=files[0];
  //console.log(files,csspath,imagepath);
  var _file=path.resolve(csspath,imagepath);
  //console.log('getImagepath',csspath,imagepath,_file); 
  return fs.statAsync(_file).then(function(data){
    //console.log('exists',data);
    return upload({file:_file,content_type:'image/jpeg',url:'http://api.ffan.com/ffan/v1/uploadpicture'}).then(function(fid){
      //console.log('uploaded:',_file,fid);
      return fid;
    });
  }).catch(function(err){
      return true;
    });
}

function transfer(cssrule,csspath) {
  var that=this;
  if (cssrule.type == "rule") {
    cssrule.declarations && cssrule.declarations.forEach(function(declaration, index) {
      that._promises.push(transerImageUrl(declaration,csspath));
    });
  }
}

function transerImageUrl(declaration,csspath){
  //if(stop){return}
  if (isBackground(declaration.property)) {
    var value=declaration.value;
    var image_re = /url\s*\(\s*(['"]?)(.*)\1\)/gi;
    var r = image_re.exec(value);
    //console.log('isImage',!!(r&&r.length),value);
    var cssbase=path.dirname(csspath);
    if (r) {
      //stop=1;
      var image = r[2];
      //console.log('image:',image);
      //插入标记
      return getImagepath([image,cssbase]).then(function(newimage){
        //清除标记
        //console.log('newimage',newimage);
        declaration.value=value.replace(image,buildUrl(newimage,image));
        //console.log(declaration.value);
      });
    }else{
      return true;
    }
  }else{
    return true;
  }
}
function buildUrl(fid,originurl){
  return "http://img"+(Math.round(Math.random()*10)%5+1)+".ffan.com/orig/"+fid+'#'+originurl;
}
