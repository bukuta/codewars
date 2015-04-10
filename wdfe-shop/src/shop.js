var dom=require('@wdfe/dom');
var ajax=require('@wdfe/ajax#0.1.1');

var $wrapper=dom('[data-role=shop-wrapper]');
var $goodslist=dom('ul',$wrapper);

var goodsitem_template=require('goodsitem.tpl#jstemplate').compile();
var error_template=require('loaderror.tpl#jstemplate');

$wrapper.on('click','[data-role=goods]',function(e){
  var $this=$(this);
  var goodid=$this.data('goodsid');
  ajax.fetch({url:'/goodsinfo',data:{goodsid:goodsid}}
    .then(function(rs){
      console.log(rs);
      var htmls;
      htmls=rs.data.goods.map(function(goodsitem,index){
        return goodsitem_template(goodsitem);
      });
      $goodslist.append(htmls.join(''));
    },function(err){
      $goodslist.append('error'); 
    });
});
