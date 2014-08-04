var DI=function(dependency){
  this.dependency=dependency;
}
DI.prototype.inject=function(func){
  var func_str=func.toString();
  console.log(func_str);
  var re=/^\s*function\s*\(((\s*\w+\s*,?)*)\s*\)/gm;
  var rs=func_str.match(re);
  console.log('$1',RegExp.$1);
  var args=RegExp.$1.trim().split(/\W+/);
  var that=this;
  var _args=args.forEach(function(item){return that.dependency[item]});
  console.log(_args);
  func.applay(this,_args);
};
var deps = {
  'dep1': function () {return 'this is dep1';},
  'dep2': function () {return 'this is dep2';},
  'dep3': function () {return 'this is dep3';},
  'dep4': function () {return 'this is dep4';}
};

var di = new DI(deps);

var myFunc = di.inject(function (dep3, dep1, dep2) {
  return [dep1(), dep2(), dep3()].join(' -> ');
});
console.log(myFunc);
//'this is dep1 -> this is dep2 -> this is dep3'


var myFunc2=di.inject(function(){});
console.log(myFunc2);
var rr=/abc(\w*)/g
var ss="abcddddd";
var r=ss.match(rr)
  console.log(r);
  console.log(RegExp.$1);
  console.log(RegExp.$2);
