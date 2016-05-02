var mysql      = require('mysql');
var async = require('async');
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
  var resData = {}
  var account = req.query.user
  var query = 'SELECT userName, userImg, gender, headline, description FROM users WHERE email = "' + account + '"'
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows[0])
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
  // to do 查询用户
  var data = req.body
  var account = data.account
  account = 10000
  var topicCat = data.topicCat
  // 不确定列名，会导致查询的结果中，topicName为空
  var query = 'SELECT topics.topicId, topics.topicName, topics.topicImg, topics.topicDesc, user_topic_relationship.userId FROM topics LEFT JOIN user_topic_relationship ON topics.topicId = user_topic_relationship.topicId && userId = ' + account + ' WHERE topicCat = "' + topicCat + '";'
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

function followTopic (req, res) {
  var data = req.body
  var account = 10000
  console.log(data);
  var topicId = data.topicId
  var query = 'INSERT INTO user_topic_relationship(userId, topicId) VALUE (' + account + ', ' + topicId + ')'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({data: rows})
  });
}

function unfollowTopic (req, res) {
  var data = req.body
  var account = 10000
  console.log(data);
  var topicId = data.topicId
  var query = 'DELETE FROM user_topic_relationship WHERE userId = "' + account + '" AND topicId = "' + topicId + '"'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({data: rows})
  });
}

function getAnswer (req, res) {
  var data = req.body
  var account = 10000
  console.log(data);
  var questionId = data.questionId
  var query = 'SELECT * FROM answers WHERE questionId = "' + questionId + '"'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({data: rows})
  });
}

function getQuestion (req, res) {
  var user = req.query.user
  var questionId = req.query.questionId
  var sqls = {
    tag: 'SELECT topicName FROM question_topic_relationship LEFT JOIN topics ON topics.topicId = question_topic_relationship.topicId WHERE questionId = "' + questionId + '"',
    question: 'SELECT * FROM questions WHERE questionId = "' + questionId + '"',
    answer: 'SELECT * FROM answers LEFT JOIN users on answers.answererId = users.userId WHERE questionId = "' + questionId + '"'
  }
  var data = {}
  async.forEachOf(sqls, function(value, key, callback) {
  // 遍历每条SQL并执行
    connection.query(value, function(err, results) {
      if(err) {
        callback(err);
      } else {
        data[key] = results;
        callback();
      }
    });
  }, function(err) {
    // 所有SQL执行完成后回调
    if(err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data)
    }
  });
}

function getIndex (req, res) {
  var user = req.query.user
  var query = 'SELECT * FROM answers LEFT JOIN questions ON answers.questionId = questions.questionerId LEFT JOIN users ON answers.answererId = users.userId LEFT JOIN question_topic_relationship ON questions.questionId = question_topic_relationship.questionId' + questionId + '"'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({data: rows})
  });
}

function answer (req, res) {
  var data = req.body
  console.log(data);
  var questionId = data.questionId
  var user = data.user
  var text = data.text
  var date = new Date()
  var query = 'INSERT INTO answers(answerText, answererId, questionId, date) VALUE ("' + text + '", ' + user + ', ' + questionId + ', "' + date + '")'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({data: rows})
  });
}

module.exports = function (app) {
  app.post('/signIn', signIn);
  app.post('/signUp', signUp);
  app.get('/queryUser', queryUser);
  app.post('/changeUserInfo', changeUserInfo);
  app.post('/getTopic', getTopic);
  app.get('/getTopicCat', getTopicCat);
  app.post('/getTopicQuestion', getTopicQuestion);
  app.post('/followTopic', followTopic);
  app.post('/unfollowTopic', unfollowTopic);
  app.post('/getAnswer', getAnswer);
  // 问题详情页
  app.get('/getQuestion', getQuestion);
  // 回答问题
  app.post('/answer', answer);
  // 首页
  app.get('/getIndex', getIndex);
};