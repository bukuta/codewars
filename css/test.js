var Promise=require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var Bcss=require("./imageresolve.js");

//var csspath = "/root/devspace/web/css/main_debug.css";
var csspath = "/root/devspace/css/ffan/main.css";
var bcss=new Bcss(csspath);
bcss.process().then(function(rs){
 console.log(rs); 
});
