const fs = require('fs');
const __cwd= process.cwd();
const stdin = process.stdin;
const stdout = process.stdout;
const path = require('path');

function getFiles() {
    return new Promise((resolve, reject) => {
        fs.readdir(__cwd, function (err, files) {
            if(err){
                console.error("get files error:", err);
                reject(err);
            }
            if(!files.length) {
                console.error("current dir has no files");
                reject("current dir has no files");
            }
            resolve(files);
        })
    });
}

function printFiles(files){
    return new Promise((resolve, reject) => {
        try {
            console.log(' \033[31mSelect which file or directory you want to see: \033[39m ');
            files.forEach((file, index) => {
                console.log(`${index}: ${file}`);
            });
            stdout.write('  \033[31mEnter your choice: \033[39m' );
            stdin.resume();             //  开始从标准输入流读取数据，因此进程不会exit
            stdin.setEncoding('utf8');
            resolve(files)
        }catch (e) {
            reject(e);
        }
    })
}

function readInput(files){
    return new Promise((resolve, reject) => {
        if(files.length){
            stdin.on('data', (data) => {
                let index = Number(data);
                if(typeof index === "number" && index < files.length ){
                    let fileName = files[index];
                    if(!fileName){
                        stdout.write('  \033[31mEnter your choice: \033[39m');
                    }else {
                        let filePath = path.join(__cwd, fileName)
                        stdin.pause();
                        fs.readFile(filePath, 'utf8', function (error, data) {
                            if(error){
                                console.error(error);
                                reject(error);
                            }else{
                                console.log(data);
                                reject()
                            }
                        })
                    }
                }else {
                    stdout.write('  \033[31mEnter your choice: \033[39m');
                    reject()
                }
            })
        }else {
            reject("has no files");
        }
    })
}
getFiles().then(printFiles).then(readInput).catch((error) => {if(error){console.error(error)}});