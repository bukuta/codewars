var UglifyJS=require('uglifyjs');
// in this hash we will map string to a variable name//strings将存储字符串名到变量名的映射
var strings = {};

// here's the transformer: //转换器开始：
var consolidate = new UglifyJS.TreeTransformer(null, function(node){
  console.log('..inut node.',node.TYPE);
    if (node instanceof UglifyJS.AST_Toplevel) {
        // since we get here after the toplevel node was processed,进到这里，源码分析结束。。。
        // that means at the end, we'll just create the var definition,在这里创建var变量声名
        // or better yet, "const", and insert it as the first statement. 或者使用const，并将其插入作为第1个语句
        console.log('toplevel-------');
        var defs = new UglifyJS.AST_Const({         //定义1个常量声名语句
            definitions: Object.keys(strings).map(function(key){  //常量定义
                var x = strings[key];
                return new UglifyJS.AST_VarDef({      //变量定义：
                    name  : new UglifyJS.AST_SymbolConst({ name: x.name }),
                    value : x.node, // the original AST_String
                });
            })
        });
        node.body.unshift(defs);   //toplevel的body是一系列语句。故最前塞入新定义的常量
        return node;
    }
    if (node instanceof UglifyJS.AST_String) {  //遇到字符串定义。
        console.log('--ast_string-------');
        // when we encounter a string, we give it an unique            遇到字符串，返回一个新的符号引用，替换原来的字符串字面量。
        // variable name (see the getStringName function below)        符号引用定义：开始位置，结束位置，符号名（变量名）
        // and return a symbol reference instead.                         getSringName(Node)
        return new UglifyJS.AST_SymbolRef({
            start : node.start,
            end   : node.end,
            name  : getStringName(node).name,
        });
    }
});

var count = 0;
function getStringName(node) {                                          //getStringName(node)
    var str = node.getValue(); // node is AST_String                    //取回字符串的字面值，
    if (strings.hasOwnProperty(str)) return strings[str];               //检查字符串池是否有，有直接返回池中变量的符号名
    var name = "_" + (++count);                                         //没找到，取个新名，插入字符串池中，并返回
    return strings[str] = { name: name, node: node };                   //池中存内容：变量名，对应的原始node(start,end,value等)
}

// now let's try it.
var ast = UglifyJS.parse(function foo() {
    console.log("This is a string");
    console.log("Another string");
    console.log("Now repeat");
    var x = "This is a string", y = "Another string";
    var x = x + y + "Now repeat";
    alert("Now repeat".length);
    alert("Another string".length);
    alert("This is a string".length);
}.toString());

// transform and print
var ast2 = ast.transform(consolidate);                                //应用变换
console.log(ast2.print_to_string({ beautify: true }));                //格式化输出

// also, the change is non-destructive; the original AST remains the same:
console.log("Original:");
console.log(ast.print_to_string({ beautify: true }));
