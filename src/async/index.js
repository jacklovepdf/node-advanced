/**
 * Created by chengyong.lin on 17/8/22.
 */

'use strict';

process.nextTick(function () {
    console.log("nextTick延迟执行1");
});
process.nextTick(function () {
    console.log("nextTick延迟执行2");
});
setImmediate(function () {
    console.log("setImmediate延迟执行1");
    process.nextTick(function () {
        console.log("强势插入");
    });
});
setImmediate(function () {
    console.log("setImmediate延迟执行2");
});