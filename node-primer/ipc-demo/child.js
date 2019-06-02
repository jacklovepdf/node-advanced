let path = require('path'),
    fs = require('fs'),
    infopath = path.resolve(process.cwd(), 'info.log');

process.stdin.on('data', function(thunk){
    let data = thunk.toString();
    try {
        if(typeof data === 'string'){
            let { type } = JSON.parse(data) || {}
            if(type === "getInfoLog"){
                console.time('readfile')
                let data = fs.readFileSync(infopath, {encodeing: 'utf8'});
                console.timeEnd('readfile');
                console.time('writestdout')
                process.stdout.write(data)
                console.timeEnd('writestdout');
            }
        }
    }catch(e){

    }
})