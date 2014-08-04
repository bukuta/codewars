function spinWords(strings){
  return strings.replace(/(\w{5,})/g,function(cap){
    return cap.split('').reverse().join('')
  })
}
console.log(spinWords("Hey fellow warriors"));
