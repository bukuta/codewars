var sass=require('node-sass');
var sass_file="./sass/base.sass"
sass.render({
  file:sass_file,
  success:onComplete
});
function onComplete(rs){
  console.log(rs);
}

