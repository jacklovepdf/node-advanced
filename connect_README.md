# Connect源码解读

  connect是node中一个可扩展的HTTP服务器框架（感觉叫框架不太合适），虽然目前已被express，koa这样的框架逐渐取代，但是connect中提出的通过中间件层进行代码模块的
  划分和复用的思想在后面的框架中被大量使用，并且connect的源码较少，很适合用来进行研读，本文正是基于这样的场景来进行源码的解读；

## 1.首先找入口
   对于任何一个大型的框架或者是一个功能模块，我们总是试图从它的入口文件的初始执行位置开始逐步进行功能的划分；幸运的是，
   connect的入口文件非常清晰且只有一个js文件，我们只需要找到入口位置即可：

```javascript
    //模块暴露的接口
    module.exports = createServer;
    function createServer() {
      function app(req, res, next){ app.handle(req, res, next); }
      merge(app, proto);
      merge(app, EventEmitter.prototype);
      app.route = '/';
      app.stack = [];
      return app;
    }
```

```
    proto.use = function use(route, fn) {
      //use方法本质上只做了一件事，就是将中间件压入app的stack数组中
      this.stack.push({ route: path, handle: handle });
      // 链式调用
      return this;
    };
```

