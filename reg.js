var fun=function aa /*@#
*/(arg1,/*argc,*/ /*12
//argd,
()*/arg2){
/*this
//123
*/
//123()
var a=1,b=4;
console.log(123,a+b,/*a+
b,*/arg1+arg2);
};
var funstr=fun.toString();
console.log('-----------------------');
console.log(funstr);
console.log('-----------------------');
var skipcomments=funstr.replace(/\/\*(.|[\r\n])*\*\//g,'');
console.log(skipcomments);
console.log('-----------------------');
var skipcomments=funstr.replace(/\/\*(.|\n|\r)*?\*\//g,'');
//var skipcomments=funstr.replace(/(\/\*(\n|.)*?\*\/)/g,'');
console.log(skipcomments);
console.log('-----------------------');
skipcomments=skipcomments.replace(/\/{2,}.*(\r|\n)*/g,'');
console.log(skipcomments);
console.log('-----------------------');
skipcomments=skipcomments.replace(/\s*(\r|\n)*/g,'');
console.log(skipcomments);
var rs=skipcomments.replace(/^function\s*[^(]*?\(/,'');
console.log('-----------------------');
console.log(rs);
rs=rs.replace(/\).*/g,'').split(',')
console.log('-----------------------');
console.log(rs);
console.log('-----------------------');
console.log(funstr.toString()
    .replace(/\/\*(.|\n|\r)*?\*\//g,'')
    .replace(/\/{2,}.*(\r|\n)*/g,'')
    .replace(/\s*(\r|\n)*/g,'')
    .replace(/^function\s*[^(]*?\(/,'')
    .replace(/\).*/g,'')
    );
//process.exit(0);
console.log(funstr.toString()
    .replace(/\/\*(.|\n|\r)*?\*\//g,'')
    .replace(/\/{2,}.*(\r|\n)*/g,'')
    .replace(/\s*(\r|\n)*/g,'')
    .replace(/^function\s*[^(]*?\(/,'')
    .replace(/\).*/g,'')
    .split(','))
