function removeZeros(array){
  // no temp arr,obj,or array.slice,array.splice.pop,push,...
  var total=0;
  var length=array.length;
  for(var i=0,len=array.length;i<len;i++){
    if(total>=length-1){
      break;
    }
    if(array[i]==0||array[i]=='0'){
      move2end(array,i);
      total++;
      i--;
    }else{
      total++; 
    }
  }
  return array;
  function move2end(array,index){
    var temp=array[index];
    for(var i=index,len=array.length;i<len-1;i++){
      array[i]=array[i+1];
    }
    array[i]=temp;
    return array;
  }
}

var a=[1,0,'0',2,3,4,5];
var r=move2end(a,3);
console.log(r);
var r=removeZeros(a);
console.log(r);
