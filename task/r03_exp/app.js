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
// const server = http.createServer(function (req, res) {

// if (req.url != '/favicon.ico') {
// res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
// res.writeHead(200, {'Content-Type': 'text/html'});
// res.write('Hello World');

// var db_data = new Array();
var db_data = [];


// connect to mysql
const conn = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Passw0rd',
  database: '2023js23db'
});

conn.connect(function (err) {
  if (err != null) {
    console.log('Error: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + conn.threadId);



});
// }
// }).listen(8080);

// // ルートへのアクセスを処理
app.get('/', (req, res) => {
  db_data = [];
  //   // res.send('Hello World.exp.js');
  // res.sendFile(__dirname + '/public/top.html');
  //   // res.render関数(jsからhtml描画)を使う場合は、
  //   // app.set('view engine', 'ejs');が必要
  res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  const sql = 'SELECT * FROM user';
  conn.query(sql, (err, results, fields) => {
    if (err) {
      console.log('Error: ' + err.stack);
      return;
    }
    if (results.length) {
      // for (let result of results) {
      //   console.log(result);
      //   let tmpl = result.name + " " + result.age + "歳\n";
      //   res.write(tmpl);
      // }
      for (var i = 0; i < results.length; i++) {
        res.write(results[i].name);
        console.log(results[i]);
        db_data.push(results[i]);
      }

      res.end();
    }

  });
});
app.set('view engine', 'ejs');
app.get("/index_ejs", (req, res) => {
  var disp = "";
  if (db_data.length) {
    disp += "<table>";
    // for (var i = 0; i < db_data.length; i++) {
    //   disp += "<tr>";
    //   disp += "<td>" + db_data[i].user_id + "</td>";
    //   disp += "<td>" + db_data[i].name + "</td>";
    //   disp += "<td>" + db_data[i].age + "</td>";
    //   disp += "</tr>";
    // }
    db_data.forEach((key, val) => {
      disp += "<tr>";
      disp += "<td>" + key.user_id + "</td>";
      disp += "<td>" + key.name + "</td>";
      disp += "<td>" + key.age + "</td>";
      disp += "</tr>";
    });
    disp += "</table>";
  }
  else{
    disp = "データがありません";
  }

  data = {
    food: "からあげ",
    db_row: JSON.stringify(db_data),
    disp: disp,
  };
  res.render("index_ejs", data);
});

// conn.end(
//   function (err) {
//     if (err != null) {
//       console.log('Error: ' + err.stack);
//       return;
//     }
//     console.log('Connection closed');
//   });


// // サーバーを起動
app.listen(port, () => {
  console.log('Start server port: ' + port);
});