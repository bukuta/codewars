function toChineseNumeral(num){
  var numerals = {
    "-":"负",
    ".":"点",
    0:"零",
    1:"一",
    2:"二",
    3:"三",
    4:"四",
    5:"五",
    6:"六",
    7:"七",
    8:"八",
    9:"九",
    10:"十",
    100:"百",
    1000:"千",
    10000:"万"
  };
  var negative=num<0;
  num=Math.abs(num);
  var whole_numbers=parseInt(num,10);
  var fractional_numbers=num-whole_numbers;
  var utils=['']
  while 

}
console.log(toChineseNumberal(-12345.5));
