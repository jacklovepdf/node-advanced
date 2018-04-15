/**
 * Created by chengyong.lin on 18/4/13.
 */

'use strict';
var querystring = require('querystring');

function start(req, res) {
    var postHTML =
        '<html><head><meta charset="utf-8"><title>jack node post request demo</title></head>' +
        '<body>' +
        '<form method="post" action="/show" autocomplete="on" name="personMsg" target="_self">' +
        '网站名： <input name="name"><br>' +
        '网站URL： <input name="url"><br>' +
        '<input type="submit">' +
        '</form>' +
        '</body></html>';
    var ip = res.socket.remoteAddress;
    var port = res.socket.remotePort;
    res.write(postHTML);
    res.end(`你的IP地址是 ${ip}，你的源端口是 ${port}。`);

}

function show(req, res) {
    var body = "";
    console.log("req====>",req);
    console.log("res====>",res);
    // 如果调用 readable.setEncoding() 方法明确为流指定了默认编码，回调函数将接收到一个字符串，否则接收到的数据将是一个 Buffer 实例。
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        // 解析参数
        body = querystring.parse(body);
        // 设置响应头部信息及编码
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

        // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
        res.end();
    });
}

module.exports = {
    '/': start,
    "/show": show
};