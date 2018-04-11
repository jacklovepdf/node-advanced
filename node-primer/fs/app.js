/**
 * Created by chengyong.lin on 18/4/11.
 */

'use strict';

var fs = require("fs");

// 异步读取
// 异步打开文件
console.log("准备打开文件！");
fs.open('./data/input.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("文件打开成功！");
});

console.log("程序执行完毕。");