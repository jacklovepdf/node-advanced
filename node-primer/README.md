
# node-primer
some basic concept and practice of node, review now!

## Table of Contents

- [Architecture for simple node applications](#arch-simple-node-app)
- [Variable Scope](#variable-scope)
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


2 a simple node app

(1) node应用的不同模块

    任何应用都有一个入口文件，但把所有的代码放在一个文件中并不是一个好的实践，通常为了保持代码的可读性，可扩展性，我们会进行代码分离，将不同的功能的代码放在不同的模块中;

(2) http服务器--server.js提供web页面；

```javascript
    start(handle, route){ //闭包，高阶函数
        http.CreateServer(function(req,res){    
            var pathname = url.parse(request.url).pathname; 
            route(handle, pathname/req, response); 
        }).listen(8888);
    }
    exports.start = start;
```

创建一个监听8888端口的http服务器，并且向创建它的方法传递了一个函数（这个函数就是回调函数），无论何时当服务器收到一个请求，这个函数就会被调用来处理请求。nodejs是基于事件驱动的，任何时候有相应事件发生的时用这个函数来进行回调。

(2) 路由--routes.js
根据不同的请求调用不同的请求处理程序；
router(handle, pathname, response);

(3) 请求处理程序--requestHandler.js
对请求作出响应；
请求处理程序中不要进行耗时的阻塞操作，对于阻塞操作，通过回调的方式来执行；
handle(response);

(4) 视图--views.js
对不同的请求作出响应的时候，大部分情况下，需要把内容展示出来，此时请求处理程序可能需要调用视图
来生成对应的展示；

> **Note**: 划分模块的时候，尽量保证模块中高内聚，模块间松耦合；提高模块的可复用性，以及整个项目的可读性和可维护性；
nodejs是单线程的，它通过事件循环来实现并行操作；




```bash
    .
    ├── README.md
    ├── index.js 入口文件
    ├── server.js 基础服务器文件
    └── router.js 路由模块文件
```