function Node(value){
  this._next;
  this.value=value;
}
Node.prototype.toString=function(){
  return this.value;
}
Node.prototype.getNext=function(){
  return this.next;
}
Node.prototype.setNext=function(next){
  this.next=next;
}
function create_list(){
  var last,head;
  for(var i=0;i<10;i++){
    var n=new Node(i);
    if(i==0){
      head=n;
      last=head;
    }
    if(i!=0){
      if(last){
        last.setNext(n);
      }
      last=n;
    }
  }
  return head;
}
var head=create_list();
function set_circle(head,n){
  var nth,last;
  var index=0;
  var nth=get_nth(head,n);
  while(head=head.getNext()){
    if(n==index){
      nth=head;
    }
    last=head;
  }
  last.setNext(nth);
}
function get_nth(head ,n){
  var index=0;
  var nth;
  while(head=head.getNext()){
    if(n==index){
      nth=head;
    }
    index++;
  }
  return nth;
}
function check_circle(head){
  var node_step1=head,node_step2=head;
  var index1=0,index2=0;
  var walk_step1=true,walk_step2=true;
  var loop=false;
  while(true){
    node_step1=node_step1.getNext();
    if(!node_step1){
      loop=false;
      break;
    }
    node_step2=node_step2.getNext()&&node_step2.getNext().getNext();
    if(!node_step2){
      loop=false;
      break;
    }
    if(node_step2==node_step1){
      loop=true;
      break;
    }
  }
  if(loop){
    var loop_length=0;
    do{
      loop_length++; 
    } while((node_step1=node_step1.getNext())!=node_step2)
    
    console.log('loop.length',loop_length);
  }
  console.log('loop',JSON.stringify(loop));
}
console.log(JSON.stringify(head,null,2));
set_circle(head,4);
check_circle(head);
function print_list(head){
  var r=[];
  console.log(head,head.getNext());
  while(!(head=head.getNext())){
    r.push(head.value); 
  }
  console.log(r.join('->'));
}
