function formatDuration(seconds){
  var util=['second','minute','hour','day','month','year'];
  var utils=['seconds','minutes','hours','days','monthes','years'];
  var steps=[60,60,24,30,12,99999999999999999999999999];
  var results=[];
  var tmp=seconds;
  var depth=0;
  while(depth<steps.length){
    var left=tmp%steps[results.length];
    var up=Math.floor(tmp/steps[depth]);
    tmp=up;
    results.push(left);
    depth++;
    if(up<1){
      break;
    }
  }

  var formats=[];
  for(var i=0,len=results.length;i<len;i++){
    if(results[i]!=0){
      formats.push(results[i]+' '+([util,utils])[results[i]>1?1:0][i]);
    }
  }
  formats.reverse();
  if(formats.length>1){
    return ([formats.slice(0,formats.length-1).join(', '),formats[formats.length-1]]).join(' and ');
  }else{
    return formats.join('');
  }
}

var seconds=[0,1,2,10,100,200,1000,2000,36001,10000,100000,2000000,9999999,99999999,Math.floor(+new Date()/1000)];
for(var i=0;i<seconds.length;i++){
  console.log('-----------');
  console.log('-----------');
  var r=formatDuration(seconds[i]);
  console.log(seconds[i],r);
}
