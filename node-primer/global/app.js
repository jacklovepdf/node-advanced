/**
 * Created by chengyong.lin on 18/4/11.
 */

'use strict';

process.on('exit', function(code) {

    // 以下代码永远不会执行
    setTimeout(function() {
        console.log("该代码不会执行");
    }, 0);

    console.log('退出码为:', code);
});

// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过参数读取
process.argv.forEach(function(val, index) {
    console.log(index + ': ' + val);
});

// 获取执行路径
console.log(process.execPath);

// 平台信息
console.log(process.platform);

// 返回一个对象，成员为当前 shell 的环境变量
// console.log(process.env);

//node版本
console.log(process.version);

//当前进程的进程号。
console.log(process.pid);

//当前CPU的架构
console.log(process.arch);

console.log("程序执行结束");