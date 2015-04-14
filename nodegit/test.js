var NodeGit=require('nodegit');
console.log(NodeGit);
var home="/root/devspace/web";

//var back=Git.prototype.rev_list;
/*
Git.prototype.rev_list=function(options,string,callback){
  console.log(options,string,callback);
  if(string=='master'){
  }else{
    back(options,string,callback);
  }
}
*/
/*
new Repo(home,{max_count:10000},function(err,repo){
  //console.log(err,repo);
  //console.log(repo.commits(100));
  repo.commits(function(err,commits){
    console.trace();
    //console.log('commits:',commits);
    //var commit;
    //for(var i=0,len=commits.length;i<len;i++){
      //commit=commits[i];
      //console.log('commit:',commit.committer.name,commit.committed_date,commit.id);
    //}
    commits.forEach(function(commit,index){
      console.log('commit:',commit.committer.name,commit.committed_date,commit.id);
      console.log(commit.filechanges);
      console.log(commit.tree);
    });
  });
  return;
  repo.commit_count('master',function(err,repo){
    Git.prototype.rev_list=back;
  });
  return;
  repo.commit('dd4e937970dbe72f87f5b1bb6c50cb76bd922428',function(err,commit){
    console.log(commit.id);
    console.log(commit.committer.name,commit.committed_date,'\n',commit.message);
  });
  return;
  repo.commit_count('master',function(err,count){
    console.log('count of master',count);
  });
});
*/
/*
var gg=new Git(home);
gg.rev_list({pretty:'raw'},'master',function(err,rev){
  console.log(err,rev);
});
*/
