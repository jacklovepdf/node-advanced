/**
 * Created by qitmac000447 on 16/10/9.
 */

//构建基础服务器
var http = require("http");
var url = require("url");
/*
* 基础服务器模块，主要负责创建一个http服务器
*参数route：路由器模块，
* 参数handle：请求处理模块
* */
function start(route, handle, port) {//高阶函数
    function onRequest(request, response) {//回调函数

        var postData = "";
        var pathname = url.parse(request.url).pathname;
        request.addListener("data", function (dataChunk) {
            postData = postData + dataChunk; //内存字符串
            console.log("postdata received!");
        });
        request.addListener("end", function () {
            route(handle, pathname, response, request);
            console.log("postdata received finish!");
        });
    }
    if(typeof port !== "number"){
        port = 8000;
    }
    http.createServer(onRequest).listen(port);//闭包
    console.log("Server has started at port: " + port);
}
exports.start = start;
