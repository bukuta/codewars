var Promise=require('bluebird');
var upload=Promise.promisify(require('./upload.js').UploadFile);
var files={
  '/root/devspace/web/css/common.css':'text/css',
  '/root/devspace/javascript/ffan/pages/myffan/car/mycar.js':'text/javascript'
};
for(var _file in files){
  (function(_file){
  upload({file:_file,content_type:'text/javascript',url:'http://tfs.intra.ffan.com/tfs/v1/files'}).then(function(fid){
    console.log(fid,buildUrl(fid,_file));
  });
  })(_file);
}
function buildUrl(fid,originurl){
  return "http://api.ffan.com/tfs/v1/files/"+fid+'#'+originurl;
}
