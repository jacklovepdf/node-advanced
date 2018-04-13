/**
 * Created by chengyong.lin on 18/4/13.
 */

'use strict';
var querystring = require('querystring');

function start(req, res) {
    var postHTML =
        '<html><head><meta charset="utf-8"><title>jack node post request demo</title></head>' +
        '<body>' +
        '<form method="post" action="/show" autocomplete="on" name="personMsg" target="_blank">' +
        '网站名： <input name="name"><br>' +
        '网站URL： <input name="url"><br>' +
        '<input type="submit">' +
        '</form>' +
        '</body></html>';

    res.write(postHTML);
    res.end();
}

function show(req, res) {
    console.log("show");
    var body = "";
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