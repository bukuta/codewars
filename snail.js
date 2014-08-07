var snail = function(array) {
  // enjoy
  function turn_right(arr){
    var _r=[];
    var rows=arr.length,cols=arr[0].length;    
    for(var j=cols-1;j>=0;j--){
      var _row=[]
        for(var i=0;i<rows;i++){
          _row.push(arr[i][j])
        }
      _r.push(_row);
    }
    return _r;
  }

  var result=[]
    while(array.length>0){
      var r=array.shift();
      result=result.concat(r) ;
      if(array.length==0){
        break;
      }
      array=turn_right(array)
    }
  return result;
}
var array = [[1,2,3],
    [4,5,6],
    [7,8,9]];
var r=snail(array);
console.log('-----------');
console.log(r);
