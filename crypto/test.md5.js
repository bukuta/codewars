var fs=require('fs');
var crypto=require('crypto');
var md5=crypto.createHash('md5');
md5.update('1234');
var r=md5.digest('hex');
console.log(r);
//fs.readFile('./logo.svg',function(err,data){
fs.readFile('./avatar.jpeg',function(err,data){
  if(err){
    throw err;
  }
  console.log(data.length);
  var md5=crypto.createHash('md5');
  md5.update(data);
  console.log(md5.digest('hex'));
})
