
# node-primer
some basic concept and practice of node, review now!

## Table of Contents

- [Architecture for simple node applications](#arch-simple-node-app)
- [Event loop and EventEmitter](#event-loop-event-emitter)
- [Working with Functions](#working-with-functions)
- [Object and Prototype](#object-and-prototype)
- [Arrays and Dictionary](#arrays-and-dictionary)
- [Library and API Design](#library-and-api-design)
- [Concurrency](#concurrency)

## Architecture for simple node applications

1 about node

node本质是运行时环境(runtime)和库的集合；

> **Note**: js最早只能运行在浏览器端，然而浏览器只是给js提供一个上下文执行环境，这个执行环境定义js可以完成什么工作。
然而，js本身是一门完整的语言，其能力相对于其它语言有过之而无不及。nodejs的出现实际上是定义了另一种上下文，使它能够在后端运行。 
因此nodejs的本质是一个运行时环境，使得js能够在服务器端解释执行，同时也是一个js库,里面封装了一些常用的功能。


2 a architecture of simple node app

(1) node应用的不同模块

    任何应用都有一个入口文件，但把所有的代码放在一个文件中并不是一个好的实践，通常为了保持代码的可读性，可扩展性，我们会进行代码分离，将不同的功能的代码放在不同的模块中;

(2) http服务器--server.js提供web页面；

```javascript

function start(route, handle, port) {//高阶函数
    function onRequest(request, response) {//回调函数

        var postData = "";
        var pathname = url.parse(request.url).pathname;
        request.addListener("data", function (dataChunk) {
            postData = postData + dataChunk;
            console.log("postdata received!");
        });
        request.addListener("end", function () {
            //路由，根据请求的路径和方法，调用不同的请求处理函数；
            route(handle, pathname, response, request);
            console.log("postdata received finish!");
        });
    }
    if(typeof port !== "number"){
        port = 8081;
    }
    http.createServer(onRequest).listen(port);//闭包
    console.log("Server has started at port: " + port);
}
exports.start = start;

```

> **Note**: 无论何时当服务器收到一个请求，onRequest回调函数就会被调用来处理请求。nodejs是基于事件驱动的，任何时候有相应事件发生的时调用这个回调函数。

(3) 路由--routes.js

    根据请求路径不同调用不同的请求处理程序；router(handle, pathname, response);
    
```javascript
function route(handle, pathname, response, request) {
    console.log("about a route request for"+ pathname);
    if(typeof handle[pathname] === "function"){
        handle[pathname](response, request);
    }else {
        console.log("No request handle found for" + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
    }
}

exports.route = route;
```

(4) 请求处理程序--requestHandler.js

    对请求作出响应；请求处理程序中不要进行耗时的阻塞操作，对于阻塞操作，通过回调的方式来执行；handle(response);

```javascript
function start(response, request) {
    console.log("Request handler 'start' was called.");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
exports.handler = {
    "/": start,
    "/start": start
}
```
(5) 视图--views.js

    对不同的请求作出响应的时候，大部分情况下，需要把内容展示出来，此时请求处理程序可能需要调用视图来生成对应的展示；


```bash
    .
    ├─- README.md
    ├── index.js 入口文件
    ├── server.js 基础服务器文件
    └── router.js 路由模块文件
    |__ viwes 视图模块
    |__ requestHandler 请求处理模块
```
> **Note**: 划分模块的时候，尽量保证模块中高内聚，模块间松耦合；提高模块的可复用性，以及整个项目的可读性和可维护性；
nodejs是单线程的，它通过事件循环来实现并行操作；

<sup>[(back to table of contents)](#arch-simple-node-app)</sup>


## Event loop and EventEmitter

1. 事件循环
    Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。js 基本上所有的事件机制都是用设计模式中观察者模式实现。
   
<img src="./images/eventEmitter.png" height="240">

```javascript
    // 引入 events 模块
    var events = require('events');
    // 创建 eventEmitter 对象
    var eventEmitter = new events.EventEmitter();
    
    // 创建事件处理程序
    var connectHandler = function connected() {
       console.log('连接成功。');
       // 触发 data_received 事件 
       eventEmitter.emit('data_received');
    }
    
    // 绑定 connection 事件处理程序
    eventEmitter.on('connection', connectHandler);
     
    // 使用匿名函数绑定 data_received 事件
    eventEmitter.on('data_received', function(){
       console.log('数据接收成功。');
    });
    
    // 触发 connection 事件 
    eventEmitter.emit('connection');
    console.log("程序执行完毕。");
```

2. about EventEmitter
    
    Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件， 
    一个fs.readStream对象会在文件被打开的时候发出一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。

<table>
        <tr>
            <th>EventEmitter的api</th>
            <th>api的释义</th>
        </tr>
        <tr>
            <th>addListener(event, listener)</th>
            <th>为指定事件添加一个监听器到监听器数组的尾部。</th>
        </tr>
        <tr>
            <th>on(event, listener)</th>
            <th>on为addListener的别名，功能一样。</th>
        </tr>
        <tr>
            <th>once(event, listener)</th>
            <th>为指定事件注册一个单次监听器，即监听器最多只会触发一次；</th>
        </tr>
        <tr>
            <th>removeListener(event, listener)</th>
            <th>移除指定事件的某个监听器</th>
        </tr>
        <tr>
            <th>removeAllListeners([event])</th>
            <th>移除指定事件的所有监听器</th>
        </tr>
        <tr>
            <th>setMaxListeners(n)</th>
            <th>默认情况下，添加的监听器超过10个就会输出警告信息。 setMaxListeners用于提高监听器的默认数量限制。</th>
        </tr>
        <tr>
            <th>listeners(event)</th>
            <th>返回指定事件的监听器数组</th>
        </tr>
        <tr>
            <th>emit(event, [arg1], [arg2], [...])</th>
            <th>触发事件</th>
        </tr>
    </table>
    
 3. error事件
 
    EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，我们在遇到 异常的时候通常会触发 error 事件。当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。