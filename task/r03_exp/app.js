// Expressを使ったプログラム
const exp = require('express');
const mysql = require('mysql2');



// another connection
// conn.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });


// Expressのインスタンスを作成
const app = exp();

let http = require('http');

const port = 8080;


app.use(exp.static('public'));

// Web表示
const server = http.createServer(function (req, res) {
  
  if (req.url != '/favicon.ico') {
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
    // res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World \n');

    // connect to mysql
    const conn = mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'mysql',
      database: '2023js23db'
    });

    conn.connect(function (err) {
      if (err != null) {
        console.log('Error: ' + err.stack);
        return;
      }
      console.log('Connected as id ' + conn.threadId);

      const sql = 'SELECT * FROM user';
      conn.query(sql, (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        if (results.length) {
          for(let result of results){
            console.log(result);
            let tmpl = result.name+ " " +result.age + "歳\n";
            res.write(tmpl);
          }
        }
        res.end();
      });
      conn.end(
        function (err) {
          if (err != null) {
            console.log('Error: ' + err.stack);
            return;
          }
          console.log('Connection closed');
        });
    });
  }
  // res.end();
}).listen(8080);

// // ルートへのアクセスを処理
// app.get('/', (req, res) => {
//   // res.send('Hello World.exp.js');
//   res.sendFile(__dirname + '/public/top.html');
//   // res.render関数(jsからhtml描画)を使う場合は、
//   // app.set('view engine', 'ejs');が必要
// });

// // サーバーを起動
// app.listen(port, () => {
//   console.log('Start server port: ' + port);
// });