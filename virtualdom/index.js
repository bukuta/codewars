var virtual=require('virtual-html');
var strinigfy=require('virtual-dom-stringify');
var html= "<!doctype html><html><head><title>title></title></head><body><h1 data-title="a3">header</h1><a><div id='id1'><p class='red'>'<aaa>tt</aaa>'ttt</p></div></body></html>";
console.log(html);
var dom=virtual(html);
console.log(dom);
console.log(strinigfy(dom));
