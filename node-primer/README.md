
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

1.about node

    node本质是运行时环境(runtime)和库的集合；js最早只能运行在浏览器端，然而浏览器只是给js提供一个上下文执行环境，这个执行环境定义js可以完成什么工作。
然而，js本身是一门完整的语言，其能力相对于其它语言有过之而无不及。nodejs的出现实际上是定义了另一种上下文，使它能够在后端运行。 因此nodejs的本质是一个运行时环境，使得js能够在服务器端解释执行，同时也是一个js库,里面封装了一些常用的功能。

1.1 




```bash
    .
    ├── README.md
    ├── index.js 入口文件
    ├── server.js 基础服务器文件
    └── router.js 路由模块文件
```