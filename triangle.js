function pascalsTriangle(n) {
  //return a flat array representing the values of Pascal's Triangle to the n-th level
  var array=[];
  var starts=[];
  for(var row=0;row<n;row++){
  starts.unshift(array.length);
  var start=starts[1];
    for(var col=0;col<=row;col++){
      if(row<2||col==0||col==row){
        array.push(1);
        continue;
      }
      array.push(array[start+col-1]+array[start+col]);
    }
  }
  return array;
}
console.log(pascalsTriangle(4));

