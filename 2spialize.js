function spiralize(size){
  var rr=init_array(size);
  var loop=0;
  var direction='right_down';
  var c_r='r',c_d='d',c_l='L',c_u='u';
  if(this.debug){
    c_r=c_d=c_l=c_u=1;
  }else{
    c_r=c_d=c_l=c_u=1;
  }

  function init_array(size){
    var rr=[];
    var c=this.debug?'.':0;
    for(var i=0;i<size;i++){
      var r=[];
      for(var j=0;j<size;j++){
        r[j]=c;
      }
      rr.push(r);
    }
    return rr;
  }
  function walk(left,top,width,height,direction){
    switch(direction){
      case 'right_down':
        for(var x=left;x<=width;x++){
          rr[top][x]=c_r;
        }
        for(var y=top;y<=height;y++){
          rr[y][width]=c_d;
        }
        break;
      case 'left_up':
        for(var x=left;x<=width;x++){
          rr[height][x]=c_l;
        }
        for(var y=top;y<=height;y++){
          rr[y][left]=c_u;
        }
        break;
    }
  }
  var  padding_top=0,padding_right=0,padding_bottom=0,padding_left=0;
  var width=size-1,height=size-1;

  while(1){
    var left=0,top=0;
    // right_down
    left=padding_left;
    top=padding_top;
    right=width-padding_right;
    bottom=height-padding_bottom;
    if(left>right||top>bottom){
      break;
    }
    walk(left,top,right,bottom,'right_down');
    padding_top+=2;
    padding_right+=1;
    padding_left+=(loop==0)?0:1;
    //left-up; 
    left=padding_left;
    top=padding_top;
    right=width-padding_right;
    bottom=height-padding_bottom;
    if(left>right||top>bottom){
      break;
    }
    walk(left,top,right,bottom,'left_up');
    padding_left+=1;
    padding_bottom+=2;
    padding_right+=1;
    loop++;
  }
  return rr;
}

for(var i=1;i<20;i++){
  console.log('');
print(spiralize(i));
}
function print(r){
  r.forEach(function(item){
    //console.log(JSON.stringify(item));
    console.log(item.join(' '));
  });
}
