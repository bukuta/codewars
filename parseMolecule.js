function parseMolecule(formula) {
  // do your science here
  formula=([ /\(([^\)]*)\)(\d*)/g, /\[([^\]]*)\](\d*)/g,/\{([^\}]*)\}(\d*)/g ]).reduce(function(prev,cur,index,arr){
    return prev.replace(cur,function(cap,$1,$2){
      var arr=new Array(1+(parseInt($2,10)||1));
      return arr.join($1)
      }); 
  },formula);
  var obj={};
  var r=formula.replace(/([A-Z][a-z]?)(\d*)/g,function(cap,$1,$2){
    obj[$1]=(obj[$1]||0)+(parseInt($2,10)||1);
    return cap;
  });
  console.log(obj);
  return obj
}
console.log(parseMolecule("Fe(NO3)2"));
console.log(parseMolecule("H2O"));
console.log(parseMolecule("K4[ON(SO3)2]2"));
console.log(parseMolecule("(C5H5)Fe(CO)2CH3"));
