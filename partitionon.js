function partitionOn(pred, items) {
  var fs=[];
  var ts=[];
  //items.forEach(item){
  var item;
  for(var i=0,len=items.length;i<len;i++){
    item=items[i];  
    console.log(item,pred(item));
    (([fs,ts])[pred(item)?0:1]).push(item);
  }
  items=fs.concat(ts);
  return fs.length;
}
var items = [1, 2, 3, 4, 5, 6];
function isEven(n) {return n % 2 == 0}
var i = partitionOn(isEven, items);
console.log(i,items);
var Test={
  assertEquals:function(target,wish,msg){
    if(target==wish){
      console.log(msg);
    }else{
      console.log('error');
    }
  },
  assertSimilar:function(target,wish){
  console.log(JSON.stringify(target),JSON.stringify(wish));
}
}
Test.assertEquals( i, 3, 'partioned at 3' );
Test.assertSimilar( items.slice(0, i), [1, 3, 5] );
Test.assertSimilar( items.slice(i),    [2, 4, 6] );
/*
* Expected: 
* [16,[1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,3,5,6,9,10,12,15,18,20,21,24,25,27,30]], 
* instead got: 
* [16,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]]
*
 */


