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
  var email = data.email
  var password = data.password
  var query = 'SELECT * FROM users WHERE email = "' + email + '"'
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
      status: true,
      userId: rows[0].userId
    })
  });
}

function signUp(req, res) {
  var data = req.body
  console.log(data)
  var email = data.email
  var fullname = data.fullname
  var password = data.password
  var query = 'INSERT INTO users(email,userName,password) VALUE ("' + email + '","' + fullname + '","' + password + '");'
  console.log(query)
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err)
    } else {
      query = 'SELECT LAST_INSERT_ID();'
      console.log(query)
      connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows[0]);
        res.send({userId:rows[0]['LAST_INSERT_ID()']})
      });
    }
  });
}

function queryUser (req, res) {
  var user = req.query.user
  var query = 'SELECT userId, userName, password, userImg, gender, headline, description FROM users WHERE userId = ' + user + ''
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows[0])
  });
}

function changeUserInfo (req, res) {
  var data = req.body
  var query = 'UPDATE users SET ' + data.key + '= "' + data.val + '" WHERE userId = ' + data.user + ''
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({status: true})
  });
}

function getTopic (req, res) {
  var user = req.query.user
  var topicCat = req.query.topicCat
  // 不确定列名，会导致查询的结果中，topicName为空
  var query = 'SELECT topics.topicId, topics.topicName, topics.topicImg, topics.topicDesc, followTopic FROM topics LEFT JOIN user_topic_relationship ON topics.topicId = user_topic_relationship.topicId && userId = ' + user + ' WHERE topicCat = "' + topicCat + '";'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.send(rows)
  });
}

function getTopicCat (req, res) {
  var query = 'SELECT DISTINCT topicCat FROM topics'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send(rows)
  });
}

function getTopicQuestion (req, res) {
  var topicId = req.query.topicId
  var user = req.query.user
  console.log(user);
  var sqls = {
    topic: 'SELECT topics.topicId, topicName, topicImg, followTopic FROM topics LEFT JOIN user_topic_relationship ON topics.topicId = user_topic_relationship.topicId && user_topic_relationship.userId = ' + user + ' WHERE topics.topicId = ' + topicId,
    question: 'SELECT questions.questionId, questionTitle, followQuestion FROM questions LEFT JOIN question_topic_relationship ON questions.questionId = question_topic_relationship.questionId LEFT JOIN user_follow_question ON questions.questionId = user_follow_question.questionId && userId = ' + user + ' WHERE topicId = ' + topicId,
  }
  console.log(sqls);
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
        var query = 'SELECT answerId, answererId, userName, headline, answerText, upNum, date, upAnswerId FROM answers LEFT JOIN user_answer_up ON answers.AnswerId = user_answer_up.upAnswerId && user_answer_up.userId = ' + user + ' LEFT JOIN users ON answers.answererId = users.userId WHERE answers.questionId = ' + value.questionId + ' LIMIT 3'
        console.log(query);
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
  var type = req.query.type
  var user = req.query.user
  console.log(user);
  var topicId = req.query.topicId
  var query
  if(type === 'follow') {
    query = 'INSERT INTO user_topic_relationship(userId, topicId, followTopic) VALUE (' + user + ', ' + topicId + ', 1)'
  } else {
    query = 'DELETE FROM user_topic_relationship WHERE userId = ' + user + ' AND topicId = ' + topicId
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    
    res.send(rows)
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
    tag: 'SELECT topics.topicId, topicName FROM question_topic_relationship LEFT JOIN topics ON topics.topicId = question_topic_relationship.topicId WHERE questionId = "' + questionId + '"',
    question: 'SELECT questions.questionId, questionTitle, questionDesc, followQuestion FROM questions LEFT JOIN user_follow_question ON questions.questionId = user_follow_question.questionId WHERE questions.questionId = "' + questionId + '"',
    answer: 'SELECT answerId, answererId, userName, headline, answerText, upNum, date, upAnswerId FROM answers LEFT JOIN user_answer_up ON answers.AnswerId = user_answer_up.upAnswerId && user_answer_up.userId = ' + user + ' LEFT JOIN users on answers.answererId = users.userId WHERE questionId = "' + questionId + '"',
    myAnswer: 'SELECT answerId, answerText FROM answers WHERE answererId = ' + user
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
  var query = 'SELECT DISTINCT topics.topicId, topicName, topicImg, answerId, answererId, userName, headline, answerText, questions.questionId, questionTitle, upNum, downNum, date, upAnswerId, followQuestion FROM answers LEFT JOIN user_answer_up ON answers.AnswerId = user_answer_up.upAnswerId && user_answer_up.userId = ' + user + ' LEFT JOIN users ON answers.answererId = users.userId LEFT JOIN questions ON answers.questionId = questions.questionId LEFT JOIN user_follow_question ON answers.questionId = user_follow_question.questionId && user_follow_question.userId = ' + user + ' LEFT JOIN question_topic_relationship ON questions.questionId = question_topic_relationship.questionId LEFT JOIN topics ON question_topic_relationship.topicId = topics.topicId WHERE questions.questionId in (SELECT questionId FROM question_topic_relationship WHERE topicId IN  (SELECT topicId FROM users LEFT JOIN  user_topic_relationship ON users.userId = user_topic_relationship.userId WHERE users.userId = ' + user + ')) GROUP BY answerId'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send(rows)
  });
}

function answer (req, res) {
  var type = req.query.type
  var data = req.body
  console.log(data);
  var questionId = data.questionId
  var user = data.user
  var text = data.text
  var query
  if (type === 'insert') {
    query = "INSERT INTO answers(answerText, answererId, questionId, date) VALUE ('" + text + "', " + user + ", " + questionId + ", now())"
  } else {
    var answerId = data.answerId
    query = "UPDATE answers SET answerText = '" + text + "' WHERE answerId = " + answerId
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send({data: rows})
  });
}

function uploadIcon (req, res) {
  // to do 删除原来的头像
  var user = req.query.user
  var query
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
      query = 'UPDATE users SET userImg = "' + fullpath + '" WHERE userId = ' + user
      console.log(query);
      connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        res.send(fullpath); //返回文件url绝对路径
      });

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

function updateUp (req, res) {
  // to do 检测同一用户点赞
  var type = req.query.type
  var user = req.query.user
  var answerId = req.query.answerId
  var upNum, update, insert
  if (type === 'up') {
    upNum = parseInt(req.query.upNum) + 1
    insert = 'INSERT INTO user_answer_up(userId,upAnswerId) VALUE (' + user + ',' + answerId + ')'
  } else {
    upNum = parseInt(req.query.upNum) - 1
    insert = 'DELETE FROM user_answer_up WHERE userId = ' + user + ' AND upAnswerId = ' + answerId
  }
  update = 'UPDATE answers SET upNum = ' + upNum + ' WHERE answerId = ' + answerId
  console.log(insert);
  console.log(update);
  connection.query(insert, function(err, rows, fields) {
    if (err) throw err;
    connection.query(update, function(err, rows, fields) {
      if (err) throw err;
      
      res.send('OK')
    });
  });
}

function search (req, res) {
  // to do 检测同一用户点赞
  var user = req.query.user
  var type = req.query.type
  var keyword = req.query.keyword
  var query
  if (type === 'content') {
    query = 'SELECT answerId, answererId, userName, headline, answerText, questions.questionId, questionTitle, upNum, downNum, date, upAnswerId, followQuestion FROM answers LEFT JOIN users ON answers.answererId = users.userId LEFT JOIN user_answer_up ON user_answer_up.upAnswerId = answers.answerId && user_answer_up.userId = ' + user + ' LEFT JOIN questions ON answers.questionId = questions.questionId LEFT JOIN user_follow_question on questions.questionId = user_follow_question.questionId && user_follow_question.userId = ' + user + ' WHERE answers.answerText LIKE "%' + keyword + '%"'
  } else if (type === 'user') {
    query = 'SELECT users.userId, userName, userImg, headline, friendship.followFriend FROM users LEFT JOIN friendship ON users.userId = friendship.friendId && friendship.userId = ' + user + ' WHERE userName LIKE "%' + keyword + '%"'
  } else {
    query = 'SELECT topics.topicId, topicName, topicImg, followTopic FROM topics LEFT JOIN user_topic_relationship ON topics.topicId = user_topic_relationship.topicId && user_topic_relationship.userId = '+ user + ' WHERE topicName LIKE "%' + keyword + '%" OR topicDesc LIKE "%' + keyword + '%"' 
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.send(rows)
  });
}

function getUser (req, res) {
  // 用户近况
  var user = req.query.user
  var me = req.query.me
  var sqls = {
    user: 'SELECT users.userId, userName, userImg, gender, headline, description, followFriend FROM users LEFT JOIN friendship ON users.userId = friendship.friendId && friendship.userId = ' + me + ' WHERE users.userId = ' + user,
    friend: 'SELECT friendship.userId, friendId, userName, userImg, headline, friendship.followFriend FROM friendship LEFT JOIN users ON users.userId = friendship.friendId WHERE friendship.userId = ' + me,
    question: 'SELECT * FROM questions WHERE questionerId = ' + user + ' LIMIT 3',
    answer: 'SELECT answers.questionId, questionTitle, answers.answerId, answerText, upNum, date, upAnswerId, followQuestion FROM answers LEFT JOIN questions ON answers.questionId = questions.questionId LEFT JOIN user_answer_up ON answers.answerId = user_answer_up.upAnswerId && user_answer_up.userId = ' + me + ' LEFT JOIN user_follow_question ON answers.questionId = user_follow_question.questionId && user_follow_question.userId = '+ me + ' WHERE answererId = ' + user + ' LIMIT 3'
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

function searchTopic (req, res) {
  var topic = req.query.topic
  var query = 'SELECT topicId, topicName, topicImg FROM topics WHERE topicName LIKE "%' + topic + '%"'
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.send(rows)
  });
}

function question(req, res) {
  var data = req.body
  console.log(data)
  var user = req.query.user
  var questionTitle = data.questionTitle
  var questionDesc = data.questionDesc
  var topics = data.topics
  console.log(topics);
  var sqls = {
    insert: 'INSERT INTO questions(questionTitle,questionDesc,questionerId) VALUE ("' + questionTitle + '","' + questionDesc + '",' + user + ');',
    questionId: 'SELECT LAST_INSERT_ID() '
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
      var questionId = data.questionId[0]['LAST_INSERT_ID()']
      topics.forEach(function (element) {
        var query = 'INSERT INTO question_topic_relationship(questionId, topicId) VALUE (' + questionId + ',' + element.topicId + ')'
        connection.query(query, function(err, results) {
          if(err) {
            throw err
          } else {
            console.log(query);
          }
        });
      })
      console.log(questionId);
      res.send({questionId: questionId})
    }
  });
  // var query = 'INSERT INTO questions(questionTitle,questionDesc,questionerId) VALUE ("' + questionTitle + '","' + questionDesc + '",' + user + ');SELECT MAX(questionId) FROM questions;'
  // console.log(query)
  // connection.query(query, function(err, rows, fields) {
  //   if (err) throw err;
  //   console.log(rows);
  //   res.send(rows[0]);
  // });
}

function followUser (req, res) {
  var type = req.query.type
  var user = req.query.user
  var friendId = req.query.friendId
  var query
  if (type === 'follow') {
    query = 'INSERT INTO friendship(userId, friendId, followFriend) VALUE (' + user + ', ' + friendId + ', 1)'
  } else {
    query = 'DELETE FROM friendship WHERE userId = ' + user + ' AND friendId = ' + friendId
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send(rows)
  });
}

function unfollowUser (req, res) {
  var user = req.query.user
  var friendId = req.query.friendId
  var query = 'DELETE FROM friendship WHERE userId = "' + user + '" AND friendId = "' + friendId + '"'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send(rows)
  });
}

function getMessage (req, res) {
  var user = req.query.user
  var type = req.query.type
  var query
  if (type === 'answer') {
    query = 'SELECT answerId, answererId, userName, answers.questionId, questionTitle, date FROM answers LEFT JOIN users ON answers.answererId = users.userId LEFT JOIN questions ON answers.questionId = questions.questionId WHERE answers.questionId IN (SELECT questionId FROM user_follow_question WHERE userId = ' + user + ') ORDER BY date LIMIT 20'
  } else {
    query = 'SELECT users.userId, userName FROM friendship LEFT JOIN users ON friendship.userId = users.userId WHERE friendId = ' + user + ' LIMIT 20'
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    res.send(rows)
  });
}

function followQuestion (req, res) {
  var type = req.query.type
  var user = req.query.user
  console.log(user);
  var questionId = req.query.questionId
  var query
  if(type === 'follow') {
    query = 'INSERT INTO user_follow_question(userId, questionId, followQuestion) VALUE (' + user + ', ' + questionId + ', 1)'
  } else {
    query = 'DELETE FROM user_follow_question WHERE userId = ' + user + ' AND questionId = ' + questionId
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    
    res.send(rows)
  });
}

module.exports = function (app) {
  app.post('/signIn', signIn);
  app.post('/signUp', signUp);
  app.get('/queryUser', queryUser);
  app.post('/changeUserInfo', changeUserInfo);
  app.get('/getTopic', getTopic);
  app.get('/getTopicCat', getTopicCat);
  // 话题下的问题
  app.get('/getTopicQuestion', getTopicQuestion);
  app.get('/followTopic', followTopic);
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
  app.get('/updateUp', updateUp);
  // 查询
  app.get('/search', search);
  // 用户页数据
  app.get('/getUser', getUser);
  // 提问页查询选择话题
  app.get('/searchTopic', searchTopic);
  // 提问
  app.post('/question', question);
  app.get('/followUser', followUser);
  app.get('/unfollowUser', unfollowUser);
  app.get('/getMessage', getMessage);
  app.get('/followQuestion', followQuestion);
};