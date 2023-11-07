console.log("Hello World!");

var http = require('http');     // webサーバーを起動させる
var fs = require('fs');         // ファイル読み込み用のライブラリ


const SERVER_ADDR = 8082;

const health = (w) => {
    w.writeHead(200,{'Content-type': 'text/plain'});
    w.end('health ok');
}

const badRequest = (w) => {
    w.writeHead(404,{'Content-type': 'text/plain'});
    w.end('bad request');
}

const view = (w,target) => {
    fs.readFile(target,'utf-8',function(err,data){
        if (err != null) {  
            w.writeHead(500,{'Content-type': 'text/plain'});
            w.end('internal server error');
            return ;
        }
        w.writeHead(200,{'Content-type': 'text/html'});
        w.end(data);
    })
}

// ポートの指定 r => request w => responseWriter
var server = http.createServer(function(r,w){
    // URLをもとに読み込むファイルを指定
    var target = '';
    switch( r.url ){
        case "/health":
            health(w);
            break;
        case "/index":
            target = "index.html";
            view(w,target);
            break;
        case "/next":
            target = "next.html";
            view(w,target);
            break;
        default:
            badRequest(w);
            return;
    }
});

server.listen(SERVER_ADDR);
console.log("Server Listening ... at http://localhost:%d/",SERVER_ADDR)
console.log("health check         at http://localhost:%d/health",SERVER_ADDR)
console.log("index page           at http://localhost:%d/index",SERVER_ADDR)
console.log("next page            at http://localhost:%d/next",SERVER_ADDR)