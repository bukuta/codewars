var wishlist = [
{name: "Mini Puzzle", size: "small", clatters: "yes", weight: "light"},
{name: "Toy Car", size: "medium", clatters: "a bit", weight: "medium"},
{name: "Card Game", size: "small", clatters: "no", weight: "light"}
];

var presents = [
{size: "medium", clatters: "a bit", weight: "medium"},
{size: "medium", clatters: "a bit", weight: "medium"},
{size: "small", clatters: "yes", weight: "light"}
];

var r=guessGifts(wishlist, presents); // must return ["Toy Car", "Mini Puzzle"]
console.log(r);
function guessGifts(wishlist,presents){
  var wishes={};
  var item,name;
  for(var i =0,len=wishlist.length;i<len;i++){
    item=wishlist[i];
    name=item['name'];
    delete item['name'];
    var key=JSON.stringify(item);
    wishes[key]=wishes[key]||[];
    wishes[key].push(name);
  }
  var r=[];
  presents.forEach(function(e){
    var key=JSON.stringify(e);
    if(wishes[key]){
      r.push(wishes[key]);
    }
  });
  r.uniqu()
  return r;
  /**
   *
   * Ambiguous Presents
   * Given wishlist 
   * [{"size":"medium","clatters":"yes","weight":"light"},{"size":"medium","clatters":"no","weight":"light"},{"size":"medium","clatters":"no","weight":"light"}] 
   * and presents 
   * [{"size":"medium","clatters":"no","weight":"light"},{"size":"medium","clatters":"yes","weight":"light"}]
   * Expected: ["cuddly toy","pullover","puzzle"], 
   * instead got: ["cuddly toy","puzzle"]
   *
   * Given wishlist [{"size":"small","clatters":"no","weight":"light"},{"size":"small","clatters":"yes","weight":"medium"}] and presents [{"size":"small","clatters":"no","weight":"light"},{"size":"small","clatters":"yes","weight":"medium"}] - Expected: ["card game","pack of marbles","socks"], instead got: ["pack of marbles","socks"]
   * No Duplicates
   *
   * Given wishlist [{"size":"small","clatters":"no","weight":"light"}] and presents [] - Expected: ["bobble hat","card game","socks"], instead got: []
   * Greater Wishlist
   * Given wishlist [{"size":"medium","clatters":"a bit","weight":"light"},{"size":"medium","clatters":"no","weight":"light"},{"size":"small","clatters":"yes","weight":"light"},{"size":"large","clatters":"no","weight":"heavy"},{"size":"medium","clatters":"a bit","weight":"medium"},{"size":"small","clatters":"no","weight":"light"},{"size":"small","clatters":"no","weight":"light"},{"size":"small","clatters":"a bit","weight":"light"},{"size":"large","clatters":"a bit","weight":"medium"},{"size":"medium","clatters":"yes","weight":"light"},{"size":"medium","clatters":"no","weight":"light"},{"size":"medium","clatters":"no","weight":"light"},{"size":"medium","clatters":"no","weight":"light"},{"size":"small","clatters":"no","weight":"light"},{"size":"medium","clatters":"a bit","weight":"medium"},{"size":"large","clatters":"a bit","weight":"heavy"},{"size":"small","clatters":"yes","weight":"medium"}] and presents [{"size":"large","clatters":"a bit","weight":"medium"},{"size":"medium","clatters":"a bit","weight":"medium"}] - Expected: ["backpack","bobble hat","card game","cuddly toy","game console","poster","pullover","puzzle","socks","toy car","train set"], instead got: ["game console","train set"]
   *
   *
   *
   */
}

