function validateBattlefield(field){
  var ships={};
  var r=true;
  var shipsobj={};
  r&&check_rows();
  r&&check_cols();
  console.log(JSON.stringify(shipsobj,null,2));
  return r&&check_ships();
  function check_rows(){
    console.log('check_rows',field.length);
    var stack=[];
    out_for:
      for(var row_index=0,row_len=field.length;row_index<row_len;row_index++){
        var row=field[row_index];
        stack.length=0;
        if(!r)continu;
        for(var col_index=0,col_len=row.length;col_index<col_len;col_index++){
          var item=row[col_index];
          if(item==0){
            is_ship(stack);
          }else{
            if(has_siblings(row_index,col_index,'row')){
              if(stack.length!=0){
                r=false;  
                break out_for;
              }
            }else{
              stack.push([row_index,col_index]);
            }
          }
        }
      }
  }
  function check_cols(){
    console.log('check_cols');
    var stack=[];
    out:
      for(var col_index=0,col_len=field[0].length;col_index<col_len;col_index++){
        stack.length=0;
        for(var row_index=0,row_len=field.length;row_index<row_len;row_index++){
          var item=field[row_index][col_index];
          if(item==0){
            is_ship(stack);
          }else{
            if(has_siblings(row_index,col_index,'col')){
              if(stack.length!=0){
                r=false;  
                break out;
              }
            }else{
              stack.push([row_index,col_index]);
            }
          }
        }
      }
  }
  function has_siblings(row_index,col_index,direction){
    var targets=[];
    if(direction=='row'){
      /*
       *  000
       *  x1x
       *  000
       */
      var pre_row_index=row_index-1;
      if(pre_row_index>=0){
        targets=targets.concat(field[pre_row_index].slice(col_index-1>0?col_index-1:0,col_index+1<field[0].length?col_index+1:field[0].length));
      }
      var next_row_index=row_index+1;
      if(next_row_index<field.length){
        targets=targets.concat(field[next_row_index].slice(col_index-1>0?col_index-1:0,col_index+1<field[0].length?col_index+1:field[0].length));
      }
    }else if(direction=='col'){
      /*
       *  0x0
       *  010
       *  0x0
       */
      var pre_col_index=col_index-1;
      if(pre_col_index>=0){
        targets=targets.concat(field.slice(Math.max(row_index-1,0),Math.min(row_index+2,field.length)).map(function(row,row_ind){
          return row[pre_col_index];  
        }));
      }
      var next_col_index=col_index+1;
      if(next_col_index<field[0].length){
        targets=targets.concat(field.slice(Math.max(row_index-1,0),Math.min(row_index+2,field.length)).map(function(row,row_ind){
          return row[next_col_index];
        }));
      }
    }
    var r=! targets.every(function(item){
      return item!=1;
    });
    //console.log('has_siblings',row_index,col_index,direction,r,targets.length);
    return r;
  }
  function is_ship(stack){
    if(stack.length>0){
      var ship=JSON.stringify(stack);
      if(!(shipsobj[ship])){
        shipsobj[ship]=1;
        console.log('discover:',ship);
        ships[stack.length]= ships[stack.length]||0;
        ships[stack.length]++;
      }
    }
    stack.length=0;
  }

  function check_ships(){
    return ships[1]==4&&ships[2]==3&&ships[3]==2&&ships[4]==1;
  }
}
var assert=require('assert');
assert.equal(validateBattlefield(
      [
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]),true,"The result should be true")

