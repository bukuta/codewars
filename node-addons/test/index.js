var hello=require('myhello.node');
console.log(hello);
hello.setCallback(function(){console.log('callback:',arguments);});
console.log(hello.say());
