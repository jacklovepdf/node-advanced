#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const imgExt = {
    'png': true,
    'jpeg': true
};
if(typeof process.argv[2] === "string"){
    let imgPath = process.argv[2],
        ext = path.extname(imgPath);

    if(imgExt[ext]){
        let imageData = fs.readFileSync(imgPath),
            ext = ext.slice(1),
            imageBase64 = imageData.toString("base64");

        imageBase64 = `data:image/${ext};base64,` + imageBase64;
        return imageBase64;
    }else {
        console.error('current file is not image');
    }
}else {
    console.error('transfer error, args is not right');
}

export function imgToBase64(fileUrl){
    try {
        let { fs, path } = window._byted,
            imageData = fs.readFileSync(fileUrl), // 例：fileUrl="D:\\test\\test.bmp"
            ext = path.extname(fileUrl).slice(1),
            imageBase64 = imageData.toString("base64");

        imageBase64 = `data:image/${ext};base64,` + imageBase64;
        return imageBase64;
    }catch (e) {
        console.error("imgToBase64 error:",e);
        return '';
    }

}