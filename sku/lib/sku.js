var colors=require('colors');
function SkuSelector(attrs,skus){
  this.cats={};
  this.attrs={};
  this.skus={};
  this.oriAttrs=attrs;
  this.oriSkus=skus;
  this.parseAttr();
  this.parseSKU();
}
SkuSelector.prototype.parseAttr=function(){
  var item;
  var attrs=this.oriAttrs;
  var cats=this.cats;
  var _attrs=this.attrs;
  for(var i=0,len=attrs.length;i<len;i++){
    item=attrs[i];
    cats[item['id']]=item;
    var values=item.attrValues;
    for(var j=0,jlen=values.length;j<jlen;j++){
      values[j].catid=item['id']
      _attrs[values[j].id]=values[j];
    }
  }
}

SkuSelector.prototype.parseSKU=function(){
  var skus=this.oriSkus;
  var _skus=this.skus;
  var _attrs=this.attrs;
  var _disabledSkus={};
  this.disabledSkus=_disabledSkus;
  var item;
  for(var k in skus){
    item=skus[k];
    var arr=k.split('_').filter(function (e,i){return !!e;});
    if(item.stockNum<=0){
      item.path=arr;
      item.pathmap={};
      _disabledSkus[item.id]=item;
      for(var i=0,len=arr.length;i<len;i++){
        item.pathmap[arr[i]]=1;
        _attrs[arr[i]].dskus=_attrs[arr[i]].skus||{};
        _attrs[arr[i]].dskus[item.id]=item;
      }
    }
    //首先将无pku的选项挑出，不允许设置
    item.path=arr;
    _skus[item.id]=item;
    //console.log(item.id,arr);
    for(var i=0,len=arr.length;i<len;i++){
      _attrs[arr[i]].skus=_attrs[arr[i]].skus||{};
      _attrs[arr[i]].skus[item.id]=item;
    }
  }
  //console.log(this.disabledSkus); 
}

function valuesAsMap(arr){
  var obj={};
  for(var i=0,len=arr.length;i<len;i++){
    obj[arr[i]]=1;
  }
  return obj;
}
function objKeys(obj){
  var keys=[];
  for(var k in obj){
    keys.push(k);
  }
  return keys;
}

SkuSelector.prototype.updateSKU=function(attrids){
  //console.log('------------------------------------'.green);
  //console.log('updateSKU',attrids);
  var dskus=this.disabledSkus;
  var idsmap=valuesAsMap(attrids);
  var disabledAttrs={};
  var arrs=[];
  for(var  k in dskus){
    var sku=dskus[k];
    var ands=setAndSet(sku.pathmap,idsmap);
    if(objKeys(ands).length==0){
      //不触发禁项
      continue; 
    }

    var ds=setSubSet(sku.pathmap,idsmap);
    var ids=objKeys(ds);
    if(ids.length==1){
      //console.log('the last one found'.red,ids);
      disabledAttrs= setOrSet(disabledAttrs,ds);
    }else if(ids.length>1){
      arrs.push(ds);
    }
  }
  //console.log('to judge',arrs);
  var rs=andArrays(arrs);
  //console.log('rs of judge'.bgBlack.white,rs); 
  if(objKeys(rs).length==1){ 
    disabledAttrs= setOrSet(disabledAttrs,andArrays(arrs));
  }
  //console.log('---------'.red,disabledAttrs);
  return;
}
function andArrays(arrs){
  var obj={};
  var item;
  for(var i=0,len=arrs.length;i<len;i++){
    item=arrs[i];
    if(i==0){
      obj=item;
    }else{
      obj=setAndSet(obj,item);
    }
  }
  return obj;
}
SkuSelector.prototype.getDisabledAttrs=function(){
  return this.disabledAttrs;
}
SkuSelector.prototype.getEnabledAttrs=function(){
  return this.enabledAttrs;
}

SkuSelector.prototype.addToEnabledAttrs=function(cat,enabled_attrs){
  var values=cat.attrValues;
  for(var i=0,len=values.length;i<len;i++){
    enabled_attrs[values[i].id]=1;
  }
}

SkuSelector.prototype.collectEnabledAttrs=function(skus,enabled_attrs){
  var tmp=enabled_attrs||{};
  for(var k in skus){
    var sku=this.skus[k];
    var path=sku.path;
    for(var index in path){
      tmp[path[index]]=1;
    }
  }
  return tmp;
}

function setAndSet(a,b){
  var obj={};
  for(var i in a){
    if(b[i]){
      obj[i]=1;
    }
  }
  return obj;
}
function setOrSet(a,b){
  var obj={};
  for(var i in a){
    obj[i]=1;
  }
  for(var i in b){
    obj[i]=1;
  }
  return obj;
}
function setSubSet(a,b){
  var obj={};
  for(var i in a){
    if(!b[i]){
      obj[i]=1;
    }
  } 
  return obj;
}
module.exports=SkuSelector;
