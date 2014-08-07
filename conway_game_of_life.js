/*
 * 生成第N代
 * 放大数组范围,可能开拓新的地盘
 * 扫描原数组，每个位置的'气',判断在新位置的存活
 * 裁剪新数组<=是否固定范围？
 */
function getGeneration(cells,generations){
  //input cells: array of arrays 
  var gen=0;
  var new_cells;
  while(gen<generations){
    var rows=cells.length;
    var cols=cells[0].length;
    console.log(rows,cols);
    new_cells=makeArray(rows+2,cols+2); 
    evolve(new_cells,cells);
    console.log(new_cells);
    cells=clipArray(new_cells);
    gen++;
  }
  return new_cells;
}
function clipArray(cells){
  var left=cells[0].length-1,right=0;
  var top=cells.length,bottom=0;
  cells.forEach(function(row,row_index){
    row.forEach(function(item,col_index){
      if(item){
        if(row_index<top){top=row_index}
        if(row_index>bottom){bottom=row_index}
        if(col_index>right){right=col_index}
        if(col_index<left){left=col_index}
      }
    });
  });
  console.log(left,right,top,bottom);
  var r=cells.slice(top,bottom+1).map(function(row){return row.slice(left,right+1)});
  console.log('clip');
  print_array(r);
  return r;
}
function evolve(new_cells,cells){
  function liveable(row,col){
    var q=0;
    var cell=0;
    for(var row_index=Math.max(row-1,0),row_len=Math.min(row+1,cells.length-1);row_index<=row_len;row_index++){
      for(var col_index=Math.max(col-1,0),col_len=Math.min(col+1,cells[row_index].length-1);col_index<=col_len;col_index++){
        if(row_index==row&&col_index==col){
          if(cells[row_index][col_index]==1){
            cell=1;
          }
        }else{
          if(cells[row_index][col_index]==1){
            q++;
          }
        }
      }
    }
    //console.log(row,col,'=>',cell,q);
    if(cell){
      return q>=2&&q<=3;
    }else{
      return q===3;
    }
  }
  var r=0;
  for(var row=0,row_len=new_cells.length;row<row_len;row++){
    for(var col=0,col_len=new_cells[row].length;col<col_len;col++){
      new_cells[row][col]=liveable(row-1,col-1)?1:0;
    }
  }
}
function makeArray(rows,cols){
  var rs=[];
  for(var i=0;i<rows;i++){
    var r=new Array(cols);
    rs.push(r);
  }
  return rs;
}
var cells=[[1,0,0],[0,1,1],[1,1,0]];
print_array(cells);
var r=getGeneration(cells,3);
function print_array(arr){
  arr.forEach(function(item){
    console.log(item);
  });
}
