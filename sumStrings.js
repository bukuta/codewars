function sumStrings(a,b){
  var _as=a.replace(/^0+/,'').split('').reverse(),_bs=b.replace(/^0+/,'').split('').reverse();
  var maxlen=Math.max(_as.length,_bs.length);
  var addopt=0;
  var r=[];
  for(var i=0;i<maxlen;i++){
    var sum=(parseInt(_as[i],10)||0)+(parseInt(_bs[i],10)||0)+addopt;
    var left=sum%10
    r.push(left)
    addopt=(sum>9)?1:0;
  }
  if(addopt){
    r.push(addopt);
  }
  r.reverse();
  return r.join('');
}
console.log(sumStrings('123456','876544'));
var a='0011111111111111111111111';
var b='0044444444444444444444444444';
console.log(right_align(a,30));
console.log(right_align(b,30));
console.log(right_align(sumStrings(a,b),30));
console.log(sumStrings('33333333333123456','876544'));

function right_align(string,length){
  if(string.length<length){
    return (new Array(length-string.length)).join(' ')+string
  }
}
