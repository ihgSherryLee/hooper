// //注册全局对象gdds
// require("./hooper.js");

// //添加依赖模块
// var express = require('express');
// var http = require('http');
// var fs=require('fs');
// var path=require('path');
// var _=require('underscore');
// var async=require('async');

// //定义对象属性
// var app = express();
// var server=undefined;
// var sessionStore=undefined;

// /**获取指定目录下所有js文件信息，此方法不会递归查找子目录*/
// var getAllJSFileInfos=function(dir){
//     var fileNames=fs.readdirSync(dir);
//     var fileInfos=[];
//     fileNames.forEach(function(fileName){
//         var index=fileName.lastIndexOf(".js");
//         if(index!=-1){
//             var fileInfo={};
//             fileInfo.fileName=fileName.substring(0,index);
//             fileInfo.filePath=path.join(dir,fileName);
//             fileInfos.push(fileInfo);
//         }
//     });
//     return fileInfos;
// }

// /**启动服务器，调用app的生命周期方法*/
// var startServer = function () {
//     async.series([
//             async.apply(initDataStore),
//             async.apply(startListening)
//         ],
//         function (err, results) {
//             if (err) {
//                 console.log("error")
//                 // stopServer();
//             } else {
//             }
//         });
// }

// /**停止服务器，同时退出进程*/
// // var stopServer=function(){
// //     if(server){
// //         logger.info('开始停止服务器');
// //         //http处理完请求后退出进程，如果在此处添加了关闭事件回调函数，Server可能不会触发close事件
// //         //调用以下方法后，子进程与主进程会断开连接，因此后续日志信息不会显示
// //         server.close(exitProcess);
// //     }

// //     setTimeout(exitProcess,ServerConfig.STOP_TIMEOUT);//保证强制退出进程
// //     function exitProcess(){
// //         logger.info('服务器进程退出，进程号"%d"',process.pid);
// //         process.exit(1);
// //     }
// // }

// var initDataStore=function(next){
//     //因为创建Store对象可能抛出异常，为了能捕捉此异常，所以在此处创建这些对象
//     hooper.sqlStore=hooper.SqlStore({
//   host     : 'localhost',
//   user     : 'hooper',
//   password : 'hooper',
//   database : 'hooper'
// });
    
// }

// /**注册服务类，默认注册'lib/service'目录下所有module*/
// // var registerService=function(next){
// //     var serviceDir=ServerConfig.SERVICE_DIR;
// //     var fileInfos=getAllJSFileInfos(serviceDir);
// //     for(var i= 0,len=fileInfos.length;i<len;i++){
// //         var fileInfo=fileInfos[i];
// //         if(_.indexOf(ServerConfig.IGNORE_SERVICE,fileInfo.fileName)!=-1)
// //             continue;

// //         var m=require(fileInfo.filePath);
// //         if(!m)continue;

// //         var rootUrl = '/' + fileInfo.fileName;
// //         logger.verbose("注册服务类：" + rootUrl);

// //         //如果返回值是函数，则自行注册监听路径
// //         //暂不允许注册自定义服务，避免访问路径混乱
// // /*        if(_.isFunction(m)){
// //             logger.verbose("注册自定义服务类："+fileInfo.fileName);
// //             m(app);
// //             continue;
// //         }*/

// //         //使用mapping注册监听器
// //         var mappings= m.mapping;
// //         if(_.isObject(m)&&mappings&& _.isArray(mappings)){
// //             for(var j=0;j<mappings.length;j++){
// //                 var mp=mappings[j];
// //                 var method=mp[0];
// //                 var url=mp[1];

// //                 if(!method||!url)
// //                     continue;

// //                 var bSuccess = true;
// //                 var arrayFn = [];
// //                 // 把fn函数添加到数组里(运用了递归)
// //                 var addFnToArray = function(element) {
// //                     if(_.isArray(element)) {
// //                         for(var key in element) {
// //                             addFnToArray(element[key]);
// //                         }
// //                     } else if(_.isFunction(element)) {
// //                         arrayFn.push(element);
// //                     } else {
// //                         bSuccess = false;
// //                     }
// //                 };
// //                 for(var k=2; k<mp.length; k++) {
// //                     // 遍历mapping数组的2到结束所有元素,再递归把里面所有的函数添加到arrayFn数组里
// //                     var element = mp[k];
// //                     addFnToArray(element);
// //                 }
// //                 if(!bSuccess || arrayFn.length == 0) {
// //                     logger.error('注册服务"%s","%s"失败,请检查对应的路由函数代码', method, rootUrl + url);
// //                     continue;
// //                 }

// //                 if(url=='/'){
// //                     url='';
// //                 }else if(url.indexOf('/')!=0){
// //                     url='/'+url;
// //                 }
// //                 if(fileInfo.fileName!=ServerConfig.HOME_SERVICE){
// //                     url=rootUrl+url;
// //                 } else {
// //                     if(url == '') {
// //                         url = '/';
// //                     }
// //                 }

// //                 logger.verbose('注册服务"%s","%s"',method,url);
// //                 app[method](url,arrayFn);
// //             }
// //             continue;
// //         }

// //         //使用文件名称做为访问路径注册服务
// //         if(_.isFunction(m.doGet)){
// //             logger.verbose('注册默认服务"get","%s"',rootUrl);
// //             app.get(rootUrl,m.doGet);
// //         }

// //         if(_.isFunction(m.doPost)){
// //             logger.verbose('注册默认服务"post","%s"',rootUrl);
// //             app.post(rootUrl,m.doPost);
// //         }

// //     }

// //     next();
// // }

// var startListening=function(next){
//     var port=8083;
//     server=http.createServer(app);
//     server.on('listening',function(){
//         next();
//     });
//     server.listen(port);
//     console.log('server start')
// }

// // process.on("uncaughtException",function(err){
// //     stopServer();
// // });

// //执行来自cluster进程的命令
// // process.on('message',function(cmd){
// //     if(cmd=='stop')stopServer();
// // });

// startServer();

// /** 增加一个判断,用来输出app被测试模块require时,需要导出app对象*/
// if(module !== require.main) {
//     module.exports = app;
// }


var express = require('express');
var app = express();
// body-parser能够获取到req.body
var bodyParser = require('body-parser');
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'hooper',
//   password : 'hooper',
//   database : 'hooper'
// });

// connection.connect();

app.use(bodyParser.json()); 

var routes = require('./routes')(app);

app.listen(8083);