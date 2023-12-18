// Expressを使ったプログラム
const exp = require('express');
const mysql = require('mysql2');



const conn = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'js23',
  password: 'js23',
  database: '2023js23db'
});

// connect to mysql
conn.connect(function(err){
  if (err != null) {
    console.log('Error: ' + err.stack);
    return ;
  }
  console.log('Connected as id ' + conn.threadId);
});

// Expressのインスタンスを作成
const app = exp();
const port = 8080;


app.use(exp.static('public'));

// ルートへのアクセスを処理
app.get('/', (req, res) => {
  // res.send('Hello World.exp.js');
  res.sendFile(__dirname + '/public/top.html');
  // res.render関数(jsからhtml描画)を使う場合は、
  // app.set('view engine', 'ejs');が必要
});

// サーバーを起動
app.listen(port, () => {
  console.log('Start server port: ' + port);
});