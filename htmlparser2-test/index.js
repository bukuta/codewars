var htmlparser=require('htmlparser2');
var parser=new htmlparser.Parser({
  onopentag:function(name,attribs){
    console.log('tagopen>>',name,attribs);
            },
    ontext:function(text){
             console.log('-->',text);
           },
    onclosetag:function(tagname){
                 console.log('<<tagclose:',tagname);

               }

},{decodeEntities:true});
parser.write("<!doctype html><html><head><title>title></title></head><body><h1>header</h1><a><div id='id1'><p class='red'>'<aaa>tt</aaa>'ttt</p></div></body></html>");
parser.end();
console.log('---------');
console.log(parser);
