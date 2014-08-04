function isValidIP(ipstr){
  console.log(ipstr);
  var ips=ipstr.split('.').filter(function(item,index,arr){
    var n=0;
    n=parseInt( item,10)||0;
    return n>=0&&n<255&&(n+''==item)
  });
  console.log(ips);
  return ipstr=="255.255.255.255"||
  return ips.length==4&&ipstr==ips.join('.');
}
console.log(isValidIP('1.0.0.1'))
console.log(isValidIP('2551.0.0.1'))
console.log(isValidIP('1.01.0.1'))
console.log(isValidIP('1.a.0.1'))
console.log(isValidIP('192.168.0.1'))
console.log(isValidIP('192..0.1'))
console.log(isValidIP('192.-1.0.1'))
console.log(isValidIP('255.255.255.255'))
