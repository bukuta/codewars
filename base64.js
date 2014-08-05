(function(){
  //http://zh.wikipedia.org/wiki/Base64
  //utf-8 unsafe
  var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
  var charscode={};
  chars.forEach(function(char,code){ charscode[char]=code; });

  function chars3to4(chars_3){
    var chars3code=0;
    var out="";
    if(chars_3.length==3){
      chars3code=(chars_3.charCodeAt(0)<<16)|(chars_3.charCodeAt(1)<<8)|(chars_3.charCodeAt(2));
      out=''
  + chars[(chars3code>>18)&0x3f]
  + chars[(chars3code>>12)&0x3f]
  + chars[(chars3code>>6)&0x3f]
  + chars[chars3code&0x3f];
    }else if(chars_3.length==2){
      chars3code=(chars_3.charCodeAt(0)<<10)|(chars_3.charCodeAt(1)<<2);
      out=''
  + chars[(chars3code>>12)&0x3f]
  + chars[(chars3code>>6)&0x3f]
  + chars[chars3code&0x3f]
  + '=';
    }else if(chars_3.length==1){
      chars3code=(chars_3.charCodeAt(0)<<4);
      out=
        + chars[(chars3code>>6)&0x3f]
        + chars[chars3code&0x3f]
        + '==';
    }else{

    }
    return out;
  }
  function chars4to3(chars_4){
    var chars4code=0;
    var out="";
    if(chars_4[4]=='='){
      if(chars_4[3]=='='){
        chars4code=0
          | charscode[chars_4[0]]<<2
          | charscode[chars_4[1]]>>4;
        out=''
          + String.fromCharCode((chars4code)&0xff);
      }else{
        chars4code=0
          | charscode[chars_4[0]]<<10
          | charscode[chars_4[1]]<<4
          | charscode[chars_4[2]]>>2;
        out=''
          + String.fromCharCode((chars4code>>>8)&0xff)
          + String.fromCharCode((chars4code)&0xff);
      }
    }else{
      chars4code=0
        | charscode[chars_4[0]]<<18
        | charscode[chars_4[1]]<<12
        | charscode[chars_4[2]]<<6
        | charscode[chars_4[3]];
      out=''
        + String.fromCharCode((chars4code>>>16)&0xff)
        + String.fromCharCode((chars4code>>>8)&0xff)
        + String.fromCharCode((chars4code)&0xff);
    }
    return out;
  }
  String.prototype.toBase64=function(){
    var cur=0;
    var length=this.length;
    var chars_3="";
    var out="";
    while(cur<length){
      chars_3=this.slice(cur,cur+3); 
      out+=chars3to4(chars_3);
      cur+=3;
    }
    return out;
  }
  String.prototype.fromBase64=function(){
    var cur=0;
    var length=this.length;
    var chars_4="";
    var out="";
    while(cur<length){
      chars_4=this.slice(cur,cur+4); 
      cur+=4;
      out+=chars4to3(chars_4);
    }
    return out;
  }
})();

var assert=require('assert');

assert.equal('this is a string!!'.toBase64(),'dGhpcyBpcyBhIHN0cmluZyEh',"base64 encode error");
assert.equal('dGhpcyBpcyBhIHN0cmluZyEh'.fromBase64(),'this is a string!!',"base64 decode error");
