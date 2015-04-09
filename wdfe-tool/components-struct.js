exports.HtmlResource=HtmlResource;

/**
 * 一个组件包含：
 *  html,tpl/text,css,js,image,video,mp3等资源
 *    以及资源的引用方式,引用顺序
 *     
 */

function ComponentResource(packagejson){
   this._resources=[]; 
}

/**
 * 资源：
 *  html,css,js.image,等有物理意义的前端实体
 *  存储路径
 *  目标类型，html,text,js,css,image,video,mp3...
 *  当前类型：tpl,coffee,less/sass,sprite,等等
 *    当前类型需要转化器转化成目标类型之后才可用。
 *    不同目标类型使用方式不同，加载方式不同
 *  依赖分析
 *
 *
 */
function Resource(filepath,type){
  this._filepath=filepath; 
  this._resolvedfilepath=this.resolveFilePath(this._filepath);
  this._dependcies=[];
  this._status=0;
  /*
   * 状态：
   * 0：new
   * 1：初始化
   * 10：模块加载完成
   * 依赖分析完成
   * 依赖解决
   *
   *
   */
}
Resource.prototype.setType=function(type){

}
/**
 * html资源内容：
 *  dom
 *
 *  meta
 *  require
 *  
 */
//htmlresource
function HtmlResource(filepath){
  this._filepath=filepath;
}

//jsresource
function JavascriptResource(filepath){

}

//style resource
//plaint resource
//octstream resource
