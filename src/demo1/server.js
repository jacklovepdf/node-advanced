/**
 * Created by qitmac000447 on 16/10/9.
 */

//构建基础服务器
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        request.addListener("data", function (dataChunk) {
            postData = postData + dataChunk;
            console.log("postdata received!");
        });
        request.addListener("end", function () {
            route(handle, pathname, response, request);
            console.log("postdata received finish!");
        });
    }
    http.createServer(onRequest).listen(8081);
    console.log("Server has started.");
}
exports.start = start;
