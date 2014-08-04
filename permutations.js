function permutations(string){
  var rs=[];
  gen('',string);
  return rs;
  function gen(prev,substrings){
    var atoms=get_atoms(substrings);
    if(atoms.length==1){
      rs.push(prev+substrings);
    }else{
      for(var i=0,len=atoms.length;i<len;i++){
        gen(prev+atoms[i],remove_atoms(substrings,atoms[i]));
      }
    }
  }
  function remove_atoms(string,c){
    return string.replace(c,'');
  }
  function get_atoms(string){
    var cs=string.split('');
    var obj={};
    for(var i=0,len=cs.length;i<len;i++){
      obj[cs[i]]=1;
    }
    var r=[];
    for(var i in obj){
      r.push(i); 
    }
    return r;
  }
}

var r=permutations('abab');
console.log(r.length);
var r=permutations('cbcb');
console.log(r.length);
var r=permutations('aaaaabbbaaabababbababbbbbbba');
console.log(r.length);
