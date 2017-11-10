/**
 * Created by chengyong.lin on 17/8/23.
 */

'use strict';

var showMem = function () {
    var mem = process.memoryUsage();
    function formate(bytes) {
        return parseInt(bytes/1024/1024) + "MB          ";
    }
    console.log("process heapTotal: " + formate(mem.heapTotal) + "heapUsed: " + formate(mem.heapUsed) + "rss: " + formate(mem.rss));
    console.log('.............................................................................................');
};

var useMem = function () {
    var size = 20*1024*1024;
    var arr = new Array(size);
    for(var  i=0; i<size; i++){
        arr[i] = 0;
    }
    return arr;
};

var total = [];
for(var j=0; j<20; j++){
    showMem();
    total.push(useMem());
}