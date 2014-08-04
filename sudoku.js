function Grid(presets){
  var grids=[];
  var that=this;
  presets.forEach(function(row,index,arr){
    grids.push(row.map(function(col,ind,a){
      return new Node(index,ind,col,that);
    }))
  })
  this._grids=grids;

}
Grid.prototype.guessall=function(){
  var that=this;
  var grids=this._grids;
  grids.forEach(function(rows,row_index,arr){
    rows.forEach(function(node,col,arr){
      if(node.state==3){
        that.chancesat(row_index,col); 
      }
    });
  });
  if(!this.complete()){
    this.guessall();
  }
}
Grid.prototype.complete=function(){
  var grids=this._grids;
  var completed =grids.every(function(rows){
    return rows.every(function(node){
      return node.state<3;
    })
  })
  return completed;
}
Grid.prototype.chancesat=function(row,col){
  //console.log('---------------------------------')
  var chances=[1,2,3,4,5,6,7,8,9];
  var grids=this._grids;
  var row_items=grids.slice(row,row+1)[0];

  var items=row_items.concat(grids.map(function(rows,index,arr){
    return rows[col];
  }));
  //x,y所在3x3方格
  var _row_3=Math.floor(row/3),_col_3=Math.floor(col/3);
  grids.slice(_row_3*3,_row_3*3+3).forEach(function(rows,index,arr){
    rows.slice(_col_3*3,_col_3*3+3).forEach(function(node){
      items.push(node);
    })
  })
  
  items.forEach(function(node,index,arr){
    if(node.state<3){
      var value;
      value=node.value;
      var pos=chances.indexOf(value);
      //console.log(value,pos);
      if(pos!=-1){
        chances.splice(pos,1);
      }
    }    
  });
  grids[row][col]._value=chances;
  if(chances.length==1){
    grids[row][col].setvalue(chances[0]);
  }
  //console.log('---------------------------------')
}
Grid.prototype.asArray=function(){
  var r=this._grids.map(function(rows){
    return rows.map(function(node){
      return node.value;
    });
  });
  return r;
}
Grid.prototype.print=function(){
  this._grids.forEach(function(rows,index,arr){
    console.log(rows.toString());
  })
}
function Node(row_index,col_index,value,grid){
  Node.total=Node.total||1;
  this._grid=grid;
  this.row=row_index;
  this.col=col_index;
  this.value=value;
  this._values=[];
  this.state=value==0?3:1;//1,preset,2:fixed,3unshure

}
Node.prototype.setvalue=function(value){
  this.value=value;
  this.state=value==0?3:2;//1,preset,2:fixed,3unshure
}
Node.prototype.removechance=function(value){
  var pos=this._values.indexOf(value);
  if(pos!=-1){
    this._values.splice(pos,1);
  }
}
Node.prototype.toString=function(){
  return "["+this.row+':'+this.col+':'+(this.state<3?this.value:0)+"]"; 
};
var puzzle = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  //[4,0,0,8,5,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]];

var grid=new Grid(puzzle);
grid.print();
grid.guessall();
grid.print();
var r=grid.complete();
console.log(r);
console.log(grid.asArray());
//循环 知道全部确认填充
//取得可能选项最少的节点
//选项数为1，即可确认
//更新相关行/列 选项=>到棋盘都更新一遍
//i 
