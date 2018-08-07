const fs = require('fs');
const __cwd= process.cwd();

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
    // const len = files.length;
    files.forEach((file) => {
        console.log(file);
    });
    process.stdout.write("select your choice: ");
    process.stdin.resume();
}

getFiles().then((files) => {
    printFiles(files);
});