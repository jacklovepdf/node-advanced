const machine = require("@byted/headless_micro_app");

machine.captureScreen({
    sourcePath: '/Users/linchengyong/bytedance/project/headless_micro_app/demo/tmapp.zip',
    resultPath: '/Users/linchengyong/bytedance/project/headless_micro_app/dist/',
    appType: 'headless_micro_app'
}).then(function(){
    console.log("success");
}).catch(function(e){
    console.log("error");
});