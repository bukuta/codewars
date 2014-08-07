var str="Lorem  ipsum  dolor  sit amet, consectetur  adipiscing  elit.  Vestibulum    sagittis   dolor mauris,  at  elementum  ligula tempor  eget.  In quis rhoncus nunc,  at  aliquet orci. Fusce at   dolor   sit   amet  felis suscipit   tristique.   Nam  a imperdiet   tellus.  Nulla  eu vestibulum    urna.    Vivamus tincidunt  suscipit  enim, nec ultrices   nisi  volutpat  ac.  Maecenas   sit   amet  lacinia arcu,  non dictum justo. Donec sed  quam  vel  risus faucibus euismod.  Suspendisse  rhoncus rhoncus  felis  at  fermentum.  Donec lorem magna, ultricies a nunc    sit    amet,   blandit fringilla  nunc. In vestibulum velit    ac    felis   rhoncus pellentesque. Mauris at tellus enim.  Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi    sit   amet   hendrerit fringilla,   ante  odio  porta lacus,   ut   elementum  justo nulla et dolor.";

console.log(str);
var r=justify(str,25);
console.log(r);
function justify(strinput,length){
  function sep_lines(strinput,length){
    var words=strinput.split(/\s+/);
    var word_index=0;
    var line_length=0;
    var lines=[];
    while(word_index<words.length){
      var words_line=[];
      line_length=0;
      while(line_length<=length&&word_index<words.length){
        if(line_length==0){
          line_length+=words[word_index].length;
          words_line.push(words[word_index]);
          word_index++;
        }else{
          if(words[word_index].length+1+line_length<=length){
            line_length+=words[word_index].length+1;
            words_line.push(words[word_index]);
            word_index++;
          }else{
            break;
          }
        }
      }
      lines.push(words_line);
    }
    return lines;
  }
  var lines=sep_lines(strinput,length);
  var r=[];
  for(var i =0,len=lines.length;i<len;i++){
    if(i==len-1){
      r.push(lines[i].join(' '));
    }else{
      r.push(format(lines[i],length));
    }
  }
  return r.join("\n");
}
function format(words,length){
  var cur_length=words.join('').length;
  if(words.length==1){
    return words[0];
  }
  var lastword=words.pop();
  var spaces=length-words.join('').length-lastword.length;
  var left=spaces%words.length;
  var spaces_every=(spaces-left)/words.length;
  var sp=(new Array(40)).join(' ');
  var r="";
  for(var i=0,len=words.length;i<len;i++){
    if(i<left){
      r+=words[i]+sp.slice(0,spaces_every+1);
    }else{
      r+=words[i]+sp.slice(0,spaces_every);
    }
  }
  r+=lastword;
  return r;
}
