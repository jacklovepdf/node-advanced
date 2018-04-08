/**
 * Created by chengyong.lin on 18/4/8.
 */

'use strict';

var fs = require("fs");
var readData = '';
var writeData = 'i am a pretty girl!';
// 创建可读流
var readerStream = fs.createReadStream('./data/input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
    readData += chunk;
});

readerStream.on('end',function(){
    console.log(readData);
});

readerStream.on('error', function(err){
    console.log(err.stack);
});

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('./data/output.txt');

// 使用 utf8 编码写入数据
writerStream.write(writeData,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
    console.log(err.stack);
});

console.log("程序执行完毕");