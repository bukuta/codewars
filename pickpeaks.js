function pickPeaks(arr){
  console.log('-------------------')
  console.log(arr);
  var pos=[];
  var peaks=[];
  var cur_pos=0,cur_hight=arr[0];
  var last_pos=0,last_peak=arr[0];
  var length=arr.length;
  var direction=0;
  var states=[];
  function get_last_states(){

  }
  function get_last_2_states(){

  }
  function push_last_states(state){
    states.push(state);
  }
  while(cur_pos<length){
    if(direction==0){
      if(cur_pos==0){
        console.log('begin');
      }
      if(cur_pos>0){
        if(arr[cur_pos]>cur_hight){
          direction='up';
          push_last_states(direction);
          console.log(cur_pos==1?'begin':'land',' turn up',JSON.stringify([cur_pos,arr[cur_pos]]),cur_hight);
        }else if(arr[cur_pos]<cur_hight){
          direction='down';
          push_last_states(direction);
          console.log(cur_pos==1?'begin':'land','turn down',JSON.stringify([cur_pos,arr[cur_pos]]),cur_pos-1,cur_hight);
        }
      }
    }else if(direction=='up') {
      if(arr[cur_pos]<cur_hight){
        //turn down
        direction='down';
        push_last_states(direction);
        console.log('turn down ',JSON.stringify([cur_pos,arr[cur_pos]]),'top:',JSON.stringify([cur_pos-1,cur_hight]));
      }else if(arr[cur_pos]==cur_hight){
        //turn 0
        direction=0;
        console.log('turn land ',JSON.stringify([cur_pos,arr[cur_pos]]),'top:',JSON.stringify([cur_pos-1,cur_hight]));
        push_last_states(direction);
      }
    }else if(direction=='down'){
      if(arr[cur_pos]>cur_hight){
        //turn up
        direction='up';
        push_last_states(direction);
        console.log('turn up',JSON.stringify([cur_pos,arr[cur_pos]]),cur_hight);
      }else if(arr[cur_pos]==cur_hight){
        //turn 0
        direction=0;
        console.log('turn land ',JSON.stringify([cur_pos,arr[cur_pos]]),'top:',JSON.stringify([cur_pos-1,cur_hight]));
        push_last_states(direction);
      }
    }
    cur_hight=arr[cur_pos]
      /*
         if(arr[cur_pos]>cur_high){
         cur_high=arr[cur_pos];
         last_pos=cur_pos;
         last_peak=cur_high
         }
         */
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
