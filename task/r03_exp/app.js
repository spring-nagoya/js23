// Expressを使ったプログラム
const exp = require('express');

// Expressのインスタンスを作成
const app = exp();
const port = 8083;
// ルートへのアクセスを処理
app.get('/', (req, res) => {
  res.send('Hello World.exp.js');
});

// サーバーを起動
app.listen(port, () => {
  console.log('Start server port: ' + port);
});