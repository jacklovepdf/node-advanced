# 了不起的node.js笔记

  some basic practice and demo to learn node

## Table of Contents

- [node中的js](#node-javascript)
- [命令行工具](#node-api)
- [tcp以及http](#tcp-http)
- [web开发](#node-web)
- [数据库](#node-db)
- [关于自动化测试](#node-test)

## node中的js

1.node的安装；

 在linux平台下安装node,可以直接用二进制包进行安装；也可以通过手动编译安装；

2.node repl（交互式解释器）

 在终端输入node即可，方便用于验证node api和js api是否正确；

3.node包

 node在前端领域主要有两大用途，一个是服务器端应用（主要是web,接口转发，洗数据），另一个是用于前端工程化，前端工具构建；

4.全局对象

  (1) global和process
  任何global对象上的属性都可以被全局访问到(作用域-空间)；
  所有在全局执行上下文中的内容都在process对象中(作用范围-时间)；

 （2）浏览器中负责事件相关的dom api
  addEventListener, removeEventListener, dispatchEvent;

  (3) node中暴露了Event EmitterAPI来进行事件的监听和分发；
  demo详见：[events](./node-primer/events/app.js)

5.buffer

   buffer表示的固定内存分配的全局对象（类似于字节数组），主要用于node二进制数据的处理；
   eg.可以用来对数据进行编码转换: [buffer](./node-primer/buffer/index.js)

## 命令行工具-cli(stdio以及fs)

1.process.stdio
  除非有io等待，否则node程序总会在执行完毕之后自动退出；
```
    process.stdin.resume() //标准输入流默认是暂停 (pause) 的，所以必须要调用 process.stdin.resume() 来恢复接收:

    process.stdin.setEncoding('utf8'); //设置流的编码

    process.stdout.write(); // 向标准输出写入若干字符

    process.argv //返回当前命令行所有参数，为数组;

    process.cwd() //返回当前进程的工作目录;

    process.env //获取当前系统环境变量对象；

    process.exit([code]) // 终止当前进程并返回给定的 code;

    process.pid //获得当前进程的pid

    process.kill(pid, [signal]) //结束对应某pid的进程并发送一个信号

    process.title //获取或设置当前进程的标题名称

    process.nextTick(callback)//表示在事件循环（EventLoop）的下一次循环中调用 callback 回调函数。
```


2.fs
  fs是node核心模块中唯一一个同时提供同步和异步api的模块;

3.stream
  当持续不断的对数据进行读写操作的时候，流的概念就产生了，在node中有很多流，比如文件流，http请求，tcp套接字等等；
  流中一个重要的概念是编码问题，对流设置编码会得到编码之后的字符串，而不是原始的buffer作为事件的参数；




## tcp以及http

    1.tcp
    node http服务是基于node tcp服务的，从编码的角度来说就是http.server是继承自net.server;

    1.1 tcp的特征
    (1) 面向连接的通信和保证通信顺序；
    tcp协议的是基于ip协议，ip协议传输的数据报是无序的；为了保证数据传输的顺序，所以才有了tcp协议；

    (2) 面向字节的
    tcp对字符以及字符编码完全是无感知的（没有任何限制），不同的编码会导致传输的字节数不同；eg, tcp允许数据以ascii字符（每个字符一个字节）
    或者unicode（每个字符4个字节）进行传输；

    (3) 可靠性

    (4) 流控制
    解决通信双方速度不匹配的问题

    (5) 拥堵控制

    1.2 tcp


    2.http
    http协议是构建在请求和响应的基础上的；对应的是nodejs中的http.ServerRequest和http.ServerResponse两中类型的对象；当用户代理浏览网站的时候，
    会创建一个请求，该请求通过tcp协议发送给web服务器;


    2.1 请求包括请求头和请求体；
    (1) 请求对象包含的属性(<http.IncomingMessage>)

    属性         |       含义              |
    req.url     |      包括主机名后所有内容  |
    req.method  |      请求方法            |
    req.headers |     请求头信息          |


    2.2 响应包括响应头和响应体；
    (1) 响应头信息

    响应头信息字段       |           含义                              |
    ------------       |:          ----:                            |
    'Content-Type'     |           响应内容(默认为text/plain)         |
    'Transfer-Encoding'|           传输编码(默认为chunked)            |
    'Connection'       |           连接(默认值为keep-alive)           |

    (2) 响应对象（<http.ServerResponse>）




 ```javascript
    // {'Transfer-Encoding': 'chunked'}
    http.createServer(function(req, res){
        res.writeHead(200);
        res.write('hello world!');
        setTimeout(function(){
            res.end('hello');
        }, 200)
    })
 ```
    **注意**： 由于node天生的异步机制，在调用end之前，我们可以多次调用write方法来发送数据，为了尽可能响应客户端，在首次调用write方法时，node会把所有的
    响应头信息和第一块数据（'hello world!'）发送出去；发送数据块的方式在涉及文件系统的时候会非常高效;
    demo详见：[http-chunked](./node-primer/http-demo/file-chunked.js)

## web开发

    1. connect

        绝大部分的网络应用都需要完成一些类似的操作，这些的操作你一定不想每次都基于原始的api实现，connect是一套基于http服务器的工具集；它提供了一套新的组织
    代码的方式来与请求响应对象交互，称做中间件（middleware）,**这样有利于代码的复用**；


```javascript
    connect中间件，记录超时日志；
    module.exports = function(opt = {}){
        var time = opt.time || 100;
        let timer = setTimeout(function(){
            console.log("timeout:", req.url, req.method);
        }, time);

        let end = res.end;
        res.end = function(){
            res.end = end;
            res.end(chunk, encoding);
            clearTimeout(timer);
        }
    }
```


    2.express


    3.koa



## 数据库

    1.mysql


    2.redis



## 关于自动化测试


