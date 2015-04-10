#include<node.h>
#include<v8.h>
using namespace v8;
static Persistent<Function> s_callback;

Handle<Value> Say(const Arguments& args){
  HandleScope scope;
  const unsigned argc=2;
  //String arg2=String::New("Hello");
  if(!s_callback.IsEmpty()){
    Local<Value> argv[argc]={
      Local<Value>::New(Number::New(123))
      ,
      Local<Value>::New(String::New("Hello"))
    };
    s_callback->Call(Context::GetCurrent()->Global(),argc,argv);
  }
  return scope.Close(String::New("Hello" ));
}

Handle<Value> SetCallback(const Arguments& args){
  HandleScope scope;
  if(args.Length()<1 || !args[0]->IsFunction()){
    return ThrowException(Exception::TypeError(String::New("Invalid parameter.")));
  }else{
    s_callback.Dispose();
    s_callback=Persistent<Function>::New(Local<Function>::Cast(args[0]));
  }
  return scope.Close(Undefined());
}

void init(Handle<Object> exports){
  exports->Set(String::NewSymbol("say"), FunctionTemplate::New(Say)->GetFunction());
  exports->Set(String::NewSymbol("setCallback"), FunctionTemplate::New(SetCallback)->GetFunction());
}

NODE_MODULE(myhello,init)
