let { exec, spawn } = require('child_process');
let path = require('path');
let fs = require('fs');
let cwd = process.cwd();
let entryPath = path.resolve(__dirname, 'child.js');

let childProcess = exec(`node ${entryPath}`, {
    cwd,
    maxBuffer: 10*1024*1024
});
childProcess.stdout.setEncodeing = 'utf8';
childProcess.stdout.on('data', function(thunk){
    try {
        // let data = thunk.toString(),
        //     {type, res} = data;
        // if(type === "result"){
        //     console.log('res====>', res);
        // }
        let data = thunk.toString();
        console.log('data===>', data);
    } catch(e){

    }

})
childProcess.stdin.write(JSON.stringify({
    type: 'getInfoLog',
    args: {
        name: 'jack'
    }
}))
