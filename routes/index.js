var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hooper',
  password : 'hooper',
  database : 'hooper'
});

connection.connect();

function signIn(req, res) {
  var data = req.body
  console.log(data)
  var account = data.account
  var password = data.password
  var query = 'SELECT * FROM users WHERE email = "' + account + '"'
  console.log(query)
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows[0])
    if (!rows[0]) res.send({
      status: false,
      tips: '账户不存在,请重新输入'
    })
    else if (rows[0].password !== password) res.send({
      status: false,
      tips: '密码错误,请重新输入'
    })
    else res.send({
      status: true
    })
  });
}

function signUp(req, res) {
  var data = req.body
  console.log(data)
  var email = data.email
  var fullname = data.fullname
  var password = data.password
  var query = 'INSERT INTO users(email,userId,password) VALUE ("' + email + '","' + fullname + '","' + password + '")'
  console.log(query)
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
  });
  res.send(req.body);
}

function queryUser (req, res) {
  var data = req.body
  var resData = {}
  var account = data.account
  var query = 'SELECT * FROM users WHERE email = "' + account + '"'
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    resData.name = rows[0].userId
    resData.img = rows[0].userImg
    resData.gender = rows[0].gender
    resData.headline = rows[0].headline
    resData.description = rows[0].description

    res.send(resData)
  });
}

function changeUserInfo (req, res) {
  var data = req.body
  var account = data.account
  var query = 'UPDATE users SET ' + data.key + '= "' + data.val + '" WHERE email = "' + data.account + '"'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({status: true})
  });
}

function getTopic (req, res) {
  var data = req.body
  var account = data.account
  var topicCat = data.topicCat
  var query = 'SELECT * FROM topics WHERE topicCat = "' + topicCat + '"'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({data: rows})
  });
}

function getTopicCat (req, res) {
  var query = 'SELECT DISTINCT topicCat FROM topics'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({data: rows})
  });
}

function getTopicQuestion (req, res) {
  var query = 'SELECT DISTINCT topicCat FROM topics'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({data: rows})
  });
}

module.exports = function (app) {
  app.post('/signIn', signIn);
  app.post('/signUp', signUp);
  app.post('/queryUser', queryUser);
  app.post('/changeUserInfo', changeUserInfo);
  app.post('/getTopic', getTopic);
  app.get('/getTopicCat', getTopicCat);
  app.post('/getTopicQuestion', getTopicQuestion);
};