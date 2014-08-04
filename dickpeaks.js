function pickPeaks(arr){
  console.log('-------------------');
  console.log(arr);
  var pos=[];
  var peaks=[];
  var cur_pos=0,cur_hight=arr[0];
  var length=arr.length;
  var direction="begin";
  var stacks=[];
  while(cur_pos<length){
    switch(direction){
      case "begin":
        if(arr[cur_pos]>cur_hight){
          direction="up";
          stacks.push([cur_pos,arr[cur_pos]]);
        }
        break;
      case "up":
        if(arr[cur_pos]>cur_hight){
          stacks.push([cur_pos,arr[cur_pos]]);
        }else if(arr[cur_pos]<cur_hight){
          direction="down";
          if(stacks.length>0){
            var temp=stacks.pop();
            console.log('catch peak',temp);
            pos.push(temp[0]);
            peaks.push(temp[1]);
          }
          stacks.length=0;
        }
        break;
      case "down":
        if(arr[cur_pos]>cur_hight){
          direction="up";
          stacks.push([cur_pos,arr[cur_pos]]);
        }
        break;
    }
    cur_hight=arr[cur_pos];
    cur_pos++;
  }
  return {pos:pos,peaks:peaks}
}

console.log(pickPeaks([1,2,2,3,2,1]));
console.log(pickPeaks([1,2,2,2,1]));
console.log(pickPeaks([5,4,3,2,1]));
console.log(pickPeaks([1,2,3,4,5]));
console.log(pickPeaks([1,2,3,2,4,3,1]));
console.log(pickPeaks([1,2,1,2,1,3,1]));
console.log(pickPeaks([1,2,1,2,2,3,3]));
