var mysql      = require('mysql');
var async = require('async');
var fs = require('fs');
var url = require('url');
var path = require('path');
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
  var topicId = req.query.topicId
  var user = req.query.user
  console.log(topicId);
  var sqls = {
    topic: 'SELECT topicId, topicName, topicImg FROM topics WHERE topicId = ' + topicId,
    question: 'SELECT questions.questionId, questionTitle FROM questions LEFT JOIN question_topic_relationship ON questions.questionId = question_topic_relationship.questionId WHERE topicId = ' + topicId,
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
      async.forEachOf(data.question, function(value, key, callback) {
      // 遍历每条SQL并执行
        var query = 'SELECT * FROM answers LEFT JOIN users ON answers.answererId = users.userId WHERE questionId = ' + value.questionId + ' LIMIT 3'
        connection.query(query, function(err, results) {
          if(err) {
            callback(err);
          } else {
            value.answer = results;
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
  var query = 'SELECT topics.topicId, topicName, topicImg, answerId, answererId, userName, headline, answerText, questions.questionId, questionTitle, upNum, downNum, date FROM answers LEFT JOIN users ON answers.answererId = users.userId LEFT JOIN questions ON answers.questionId = questions.questionId LEFT JOIN question_topic_relationship ON questions.questionId = question_topic_relationship.questionId LEFT JOIN topics ON question_topic_relationship.topicId = topics.topicId WHERE questions.questionId in (SELECT questionId FROM question_topic_relationship WHERE topicId IN  (SELECT topicId FROM users LEFT JOIN  user_topic_relationship ON users.userId = user_topic_relationship.userId WHERE users.userId = ' + user + '))'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send(rows)
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

function uploadIcon (req, res) {
  // to do 删除原来的头像
  req.pipe(req.busboy);
  //接收文件上传，就执行后面匿名函数方法
  // fieldname字段名字、file文件对象、filename文件名字、encoding使用的编码、mimetype文件类型
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
    // new Date().getTime()表示当前时间戳，然后转换字符串
    // path.extname获取文件的后缀名
    var newFilename = String(new Date().getTime()) + path.extname(filename);
    var filePath = 'static/uploads/icon/' + newFilename;
    console.log(filePath)
    var url = 'static/uploads/icon/' + newFilename; //上传文件新的路径
    //将文件转换成管道形式，以流的形式写进指定路径
    file.pipe(fs.createWriteStream(filePath));

    //文件写完结束后，执行以下函数返回信息
    file.on('end', function(){
      var fullpath = req.headers.origin + '/' + url;
      //res.json({success: true, url: url});
      res.send(fullpath); //返回文件url绝对路径

    });
  });
}

function uploadPhoto (req, res) {
  req.pipe(req.busboy);
  //接收文件上传，就执行后面匿名函数方法
  // fieldname字段名字、file文件对象、filename文件名字、encoding使用的编码、mimetype文件类型
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
    // new Date().getTime()表示当前时间戳，然后转换字符串
    // path.extname获取文件的后缀名
    var newFilename = String(new Date().getTime()) + path.extname(filename);
    var filePath = 'static/uploads/photo/' + newFilename;
    console.log(filePath)
    var url = 'static/uploads/photo/' + newFilename; //上传文件新的路径
    //将文件转换成管道形式，以流的形式写进指定路径
    file.pipe(fs.createWriteStream(filePath));

    //文件写完结束后，执行以下函数返回信息
    file.on('end', function(){
      var fullpath = req.headers.origin + '/' + url;
      //res.json({success: true, url: url});
      res.send(fullpath); //返回文件url绝对路径

    });

  });
}

function up (req, res) {
  // to do 检测同一用户点赞
  var answerId = req.query.answerId
  var upNum = parseInt(req.query.upNum) + 1
  var query = 'UPDATE answers SET upNum = ' + upNum + ' WHERE answerId = ' + answerId
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({status: true})
  });
}

function search (req, res) {
  // to do 检测同一用户点赞
  var type = req.query.type
  var keyword = req.query.keyword
  var query
  if (type === 'content') {
    query = 'SELECT answerId, answererId, userName, headline, answerText, questions.questionId, questionTitle, upNum, downNum, date FROM answers LEFT JOIN users ON answers.answererId = users.userId LEFT JOIN questions ON answers.questionId = questions.questionId WHERE answers.answerText LIKE %' + keyword + '%'
  } else if (type === user) {
    query = 'SELECT userId, userName, userImg, headline FROM users WHERE userName LIKE "%' + keyword + '%"'
  } else {
    query = 'SELECT topicId, topicName, topicImg FROM topics WHERE topicName LIKE %' + keyword + '% OR topicDesc LIKE "%' + keyword + '%"' 
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send(rows)
  });
}

module.exports = function (app) {
  app.post('/signIn', signIn);
  app.post('/signUp', signUp);
  app.get('/queryUser', queryUser);
  app.post('/changeUserInfo', changeUserInfo);
  app.post('/getTopic', getTopic);
  app.get('/getTopicCat', getTopicCat);
  // 话题下的问题
  app.get('/getTopicQuestion', getTopicQuestion);
  app.post('/followTopic', followTopic);
  app.post('/unfollowTopic', unfollowTopic);
  app.post('/getAnswer', getAnswer);
  // 问题详情页
  app.get('/getQuestion', getQuestion);
  // 回答问题
  app.post('/answer', answer);
  // 首页
  app.get('/getIndex', getIndex);
  app.post('/uploadIcon', uploadIcon);
  app.post('/uploadPhoto', uploadPhoto);
  // 赞同
  app.get('/up', up);
  // 查询
  app.get('/search', search);
};