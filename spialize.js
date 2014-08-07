function spiralize(size){
  var rr=init_array(size);
  var loop=0;
  var direction='right';//right,down,left,up,right,...
  var c_r='r',c_d='d',c_l='L',c_u='u';
  function get(x){
    return x;
  }
  function walk(startx,starty,endx,endy,direction){
    console.log(startx,starty,endx,endy,direction);
    switch(direction){
      case 'right':
        for(var x=startx;x<=endx;x++){
          rr[starty][x]=get(x)+c_r+get(starty);
        }
        rr[endy]&&(rr[endy][endx]=get(endx)+c_r.toUpperCase()+get(endy));
        break;
      case 'down':
        for(var y=starty;y<=endy;y++){
          rr[y][endx]=get(endx)+c_d+get(y);
        }
        rr[endy][startx]=get(startx)+c_d.toUpperCase()+get(endy);
        break;
      case 'left':
        for(var x=startx;x<endx;x++){
          rr[endy][x]=get(x)+c_l+get(endy);
        }
        rr[starty][startx]=get(startx)+c_l.toUpperCase()+get(starty);
        break;
      case 'up':
        for(var y=starty;y<endy;y++){
          rr[y][startx]=get(startx)+c_u+get(y);
        }
        rr[starty][endx]=get(endx)+c_u.toUpperCase()+get(starty);
        break;
    }
  }
  var startx,starty,endx,endy;
  var  padding_top,padding_right,padding_bottom,padding_left;
  while(1){
    var left=0,top=0;
    var width=size-1,height=size-1;
    //right;
    startx=loop*2,starty=loop*2,endx=width-loop*2,endy=loop*2+1;
    if(loop>0){
      endy=Math.min(endy,2*loop);
    }
    if(startx>endx||starty>endy){
      break;
    }
    walk(startx,starty,endx,endy,'right');
    //print(rr);
    //down; 
    startx=width-1-loop*2,starty=loop*2+2,endx=width-loop*2,endy=height-loop*2;

    if(loop>0){
      startx=Math.max(startx,2*loop+1)
    }
    if(startx>endx||starty>endy){
      break;
    }
    walk(startx,starty,endx,endy,'down');
    //print(rr);
    //left;
    startx=loop*2,starty=height-1-loop*2,endx=width-1-loop*2,endy=height-loop*2;
    if(startx>endx||starty>endy){
      break;
    }
    walk(startx,starty,endx,endy,'left');
    //print(rr);
    //up;
    startx=loop*2,starty=loop*2+2,endx=2*loop+1,endy=height-1-loop*2;
    if(startx>endx||starty>endy){
      break;
    }
    walk(startx,starty,endx,endy,'up');
    loop++;
  }
  return rr;
}



function init_array(size){
  var rr=[];
  for(var i=0;i<size;i++){
    var r=[];
    for(var j=0;j<size;j++){
      r[j]='000';
    }
    rr.push(r);
  }
  return rr;
}


print(spiralize(1));
print(spiralize(2));
console.log();
print(spiralize(3));
console.log();
print(spiralize(4));
console.log();
print(spiralize(5));
console.log();
print(spiralize(6));


function print(r){
  r.forEach(function(item){
    console.log(item);
  });
}
