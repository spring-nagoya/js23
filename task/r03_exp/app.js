// Expressを使ったプログラム
const exp = require('express');

const mysql = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Passw0rd',
});
// Expressのインスタンスを作成
const app = exp();
const port = 8083;


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