var fs=require('fs');
var UglifyJS=require('uglifyjs');
//console.log(UglifyJS);
fs.readFile('./test.define.js',function(err,data){
  //console.log(data.toString());
  var datastr=data.toString();
  var toplevel=UglifyJS.parse(datastr,{
    filename:'./test.define.js',
      toplevel:toplevel
  });
  toplevel.figure_out_scope();
  //compress(toplevel);
  walk(toplevel);
});

function walk(toplevel){
  var walker=new UglifyJS.TreeWalker(function(node){
    var expression=node.expression||{};
    if(node instanceof UglifyJS.AST_Call){
      console.log(node.TYPE);
      //console.log(node.TYPE,expression.name);
      if(expression.expression){
        console.log(expression.expression.name,expression.property);
      }else{
        
      }
      //console.log(expression);
      for(var i in node){
        //console.log(i,typeof node[i]);
      }
      //process.exit(0);
      //console.log('--------');
      //console.log(node.body);
      //return true;
    }else{
      console.log(node.TYPE);
      //log(node);
      //console.log(node);
      //console.log('--------');
    }
  });
  //toplevel.walk(walker);
  console.log(UglifyJS.describe_ast(toplevel));
}
var logged={};
function log(node){
  if(!logged[node.TYPE]){
      logged[node.TYPE]=1;
      console.log(node);
  }
}
function compress(toplevel){
  var compressor=UglifyJS.Compressor({});
  var compressed_ast=toplevel.transform(compressor);
  compressed_ast.figure_out_scope();
  compressed_ast.compute_char_frequency();
  compressed_ast.mangle_names();
  var compressed=compressed_ast.print_to_string();
  console.log(compressed);
}
