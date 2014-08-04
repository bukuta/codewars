#! /usr/local/bin/node
function convertQueryToMap(query){
  var obj={};
  query.split('&').map(function(item,index){
    var key_value=item.split('=');
    var paths=key_value[0].split('.');
    var tmp=obj;
    paths.reduce(function(prev,cur,ind,array){
      if(ind==array.length-1){
        return prev;
      }
      prev=prev[cur]=prev[cur]||{};
      tmp=prev
      return prev
    },obj);
    tmp[paths.pop()]=decodeURIComponent(key_value[1])
  });
  return obj
}
var q = 'user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue';
var r=convertQueryToMap(q);
console.log(JSON.stringify(r,null,2));

var q = 'a=12&b=12&c.a=12';
var r=convertQueryToMap(q);
console.log(JSON.stringify(r,null,2));
