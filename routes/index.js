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
  });
  res.send(req.body);
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

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('Hello world');
  });
  app.post('/signIn', signIn);
  app.post('/signUp', signUp);
};