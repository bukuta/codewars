var fs=require('fs');
var FormData=require('form-data');
var Thunk=require('thunks')();
exports.UploadFile=UploadFile;

/**
 *
 */
var cache={};
function UploadFile(opts,cb){
  //console.log(opts);
  var url=opts.url;
  delete opts.url;
  var form=new FormData();
  form.append('paramname','image');
  form.append('image',fs.createReadStream(opts.file));
  form.submit(url,function(err,res){
    if(err){
      cb&&cb(err);
      return;
    }
    var bfs=[];
    res.on('data',function(data){
      bfs.push(data);
    });
    res.on('end',function(err,data){
      var rs=Buffer.concat(bfs).toString();
      rs=JSON.parse(rs);
      //console.log(rs);
      var fid=0;
      if(rs.status==0){
        fid=rs.data&&rs.data.name;
        cb&&cb(undefined,fid)
      }else{
        cb&&cb(rs.msg);
      }
    });
  });
  return;
}
