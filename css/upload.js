var fs=require('fs');
var http=require('http');
var url=require('url');
var FormData=require('form-data');
var Thunk=require('thunks')();
exports.UploadFile=UploadFileTFS;

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
      //console.log('ondata',data);
      bfs.push(data);
    });
    res.on('end',function(err,data){
      var rs=Buffer.concat(bfs).toString();
      rs=JSON.parse(rs);
      //console.log(rs);
      var fid=0;
      if(rs){
        fid=rs.data&&rs.data.name;
      }else{
      }
      if(fid){
        cb&&cb(undefined,fid)
      }else{
        cb&&cb(rs&&rs.msg||"error");
      }
    });
  });
  return;
}
function UploadFileTFS(opts,cb){
  //console.log(opts);
  var _url=opts.url;
  delete opts.url;
  if(cache[opts.file]){
    console.log('cached',opts.file,cache[opts.file]);
    cb&&cb(null,cache[opts.file]);
    return;
  }
  var content=fs.readFileSync(opts.file);
  //console.log(content.length);
  var queryobj=url.parse(_url);
  var request=http.request({
    hostname:queryobj.host,
      path:queryobj.path,
      method:'POST',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':content.length
      }
  }, function(res){
    //console.log('onres');
    var bfs=[];
    res.on('data',function(data){
      //console.log('data',data);
      bfs.push(data);
    });
    res.on('end',function(err,data){
      //console.log('end',err,data);
      var rs=Buffer.concat(bfs).toString();
      //console.log(rs);
      //rs=JSON.parse(rs);
      var fid=0;
      fid=rs;
      if(fid){
        cache[opts.file]=fid;
        cb&&cb(undefined,fid)
      }else{
        cb&&cb('error');
      }
    });
  });
  request.on('error',function(er){
    cb&&cb(er);
  });
  request.write(content);
  request.end();
  return;
}
