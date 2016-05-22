/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : hooper

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2016-05-17 20:54:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `answers`
-- ----------------------------
DROP TABLE IF EXISTS `answers`;
CREATE TABLE `answers` (
  `answerId` int(11) NOT NULL AUTO_INCREMENT,
  `answerText` longtext CHARACTER SET utf8 NOT NULL,
  `answererId` int(11) NOT NULL,
  `answerName` varchar(255) CHARACTER SET utf8 NOT NULL,
  `questionId` int(11) NOT NULL,
  `upNum` int(11) NOT NULL,
  `downNum` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`answerId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of answers
-- ----------------------------
INSERT INTO `answers` VALUES ('2', '习惯按Ctrl+S⋯⋯有时候看网页看着看着就Ctrl+S一下，之后突然反应过来不对⋯⋯看到bug就想改⋯⋯即使不是自己的bug⋯⋯还喜欢找bug，看到登录框就想试试能不能SQL注入⋯⋯有时候还会抓包或者发假包⋯⋯看到一个软件就会想自己要做的话怎么做⋯⋯', '10001', '', '1', '116', '2', '2016-05-16 15:50:41');
INSERT INTO `answers` VALUES ('3', '习惯按Ctrl+S⋯⋯有时候看网页看着看着就Ctrl+S一下，之后突然反应过来不对⋯⋯看到bug就想改⋯⋯即使不是自己的bug⋯⋯还喜欢找bug，看到登录框就想试试能不能SQL注入⋯⋯有时候还会抓包或者发假包⋯⋯看到一个软件就会想自己要做的话怎么做⋯⋯', '10002', '', '1', '2', '0', '2016-04-29 00:00:00');
INSERT INTO `answers` VALUES ('4', '\n      <p>可以是形容一件事情的时候经常被借用的话，也可以是原本毫无意义，但是在游戏/动漫中反复出现导致生活中也拿它作为口头禅。（例如；它们回来了。我们是它们的奴隶。）</p><p><br></p>', '10000', '', '1', '0', '0', '0000-00-00 00:00:00');
INSERT INTO `answers` VALUES ('13', '<p>习惯按Ctrl+S⋯⋯有时候看网页看着看着就Ctrl+S一下，之后突然反应过来不对⋯⋯看到bug就想改⋯⋯即使不是自己的bug⋯⋯还喜欢找bug，看到登录框就想试试能不能SQL注入⋯⋯有时候还会抓包或者发假包⋯⋯看到一个软件就会想自己要做的话怎么做⋯⋯</p><p><img src=\"http://localhost:8082/static/uploads/photo/1463299420810.png\" style=\"max-width: 100%;\" class=\"\"></p><p>习惯按Ctrl+S⋯⋯有时候看网页看着看着就Ctrl+S一下，之后突然反应过来不对⋯⋯看到bug就想改⋯⋯即使不是自己的bug⋯⋯还喜欢找bug，看到登录框就想试试能不能SQL注入⋯⋯有时候还会抓包或者发假包⋯⋯看到一个软件就会想自己要做的话怎么做⋯⋯</p><p><br></p>', '10018', '', '1', '1', '0', '2016-05-16 16:18:25');

-- ----------------------------
-- Table structure for `friendship`
-- ----------------------------
DROP TABLE IF EXISTS `friendship`;
CREATE TABLE `friendship` (
  `userId` int(11) NOT NULL,
  `friendId` int(11) NOT NULL,
  `followFriend` int(2) DEFAULT NULL,
  PRIMARY KEY (`userId`,`friendId`),
  KEY `friendid` (`friendId`),
  CONSTRAINT `friendid` FOREIGN KEY (`friendId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of friendship
-- ----------------------------
INSERT INTO `friendship` VALUES ('10000', '10001', '1');
INSERT INTO `friendship` VALUES ('10000', '10018', '1');
INSERT INTO `friendship` VALUES ('10001', '10000', '1');
INSERT INTO `friendship` VALUES ('10002', '10000', '1');
INSERT INTO `friendship` VALUES ('10018', '10019', '1');
INSERT INTO `friendship` VALUES ('10019', '10018', '1');

-- ----------------------------
-- Table structure for `questions`
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `questionId` int(11) NOT NULL AUTO_INCREMENT,
  `questionTitle` varchar(255) CHARACTER SET utf8 NOT NULL,
  `questionDesc` longtext CHARACTER SET utf8,
  `questionerId` int(11) NOT NULL,
  `questionerName` varchar(255) CHARACTER SET utf8 NOT NULL,
  `answerTotal` int(11) NOT NULL,
  PRIMARY KEY (`questionId`),
  KEY `questionerId` (`questionerId`),
  CONSTRAINT `questionerId` FOREIGN KEY (`questionerId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of questions
-- ----------------------------
INSERT INTO `questions` VALUES ('1', '有哪些动漫或者游戏里的台词在生活中被经常说起？', '可以是形容一件事情的时候经常被借用的话，也可以是原本毫无意义，但是在游戏/动漫中反复出现导致生活中也拿它作为口头禅。（例如；它们回来了。我们是它们的奴隶。）', '10000', 'aaaaa', '0');
INSERT INTO `questions` VALUES ('2', '有', null, '10000', 'aaaaaa', '0');
INSERT INTO `questions` VALUES ('5', '如何看待分析今天勇士VS开拓者的G3的比赛？？？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('6', 'questionTitle', 'questionDesc', '10000', '', '0');
INSERT INTO `questions` VALUES ('8', '为什么 NB\r\nA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('9', '为什么 NB\r\nA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('10', '为什么 NB\r\nA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('11', '为什么 NB\r\nA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('12', '为什么 NB\r\nA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('13', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('14', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('15', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('16', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('17', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('18', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('19', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('20', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('21', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('22', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('23', '为什么 NBA 以前的历史没有出现库里这样三分投篮变态的球员？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('24', '库里真的比保罗强吗？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('25', '库里真的比保罗强吗？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('26', '库里真的比保罗强吗？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('27', '库里真的比保罗强吗？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('28', '库里真的比保罗强吗？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('29', '库里真的比保罗强吗？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('30', '如何评价 2016 年 4 月 28 日火箭 vs 勇士的比赛？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('31', '如何评价 2016 年 4 月 28 日火箭 vs 勇士的比赛？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('32', '如何评价 2016 年 4 月 28 日火箭 vs 勇士的比赛？', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('33', 'self.showQuestionWrap = false', '', '10000', '', '0');
INSERT INTO `questions` VALUES ('34', '', '', '10000', '', '0');

-- ----------------------------
-- Table structure for `question_topic_relationship`
-- ----------------------------
DROP TABLE IF EXISTS `question_topic_relationship`;
CREATE TABLE `question_topic_relationship` (
  `questionId` int(11) NOT NULL,
  `topicId` int(11) NOT NULL,
  PRIMARY KEY (`questionId`,`topicId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of question_topic_relationship
-- ----------------------------
INSERT INTO `question_topic_relationship` VALUES ('1', '1001');
INSERT INTO `question_topic_relationship` VALUES ('1', '1002');
INSERT INTO `question_topic_relationship` VALUES ('2', '1001');
INSERT INTO `question_topic_relationship` VALUES ('28', '1002');
INSERT INTO `question_topic_relationship` VALUES ('28', '1008');
INSERT INTO `question_topic_relationship` VALUES ('29', '1002');
INSERT INTO `question_topic_relationship` VALUES ('29', '1008');
INSERT INTO `question_topic_relationship` VALUES ('30', '1002');
INSERT INTO `question_topic_relationship` VALUES ('30', '1008');
INSERT INTO `question_topic_relationship` VALUES ('31', '1008');
INSERT INTO `question_topic_relationship` VALUES ('32', '1008');
INSERT INTO `question_topic_relationship` VALUES ('33', '1005');
INSERT INTO `question_topic_relationship` VALUES ('34', '1002');
INSERT INTO `question_topic_relationship` VALUES ('34', '1003');
INSERT INTO `question_topic_relationship` VALUES ('34', '1004');

-- ----------------------------
-- Table structure for `topics`
-- ----------------------------
DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics` (
  `topicId` int(255) NOT NULL AUTO_INCREMENT,
  `topicName` varchar(255) CHARACTER SET utf8 NOT NULL,
  `topicImg` varchar(255) DEFAULT NULL,
  `topicDesc` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `topicCat` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`topicId`),
  KEY `topicName` (`topicName`)
) ENGINE=InnoDB AUTO_INCREMENT=1013 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of topics
-- ----------------------------
INSERT INTO `topics` VALUES ('1001', '体育', 'http://localhost:8082/static/uploads/icon/c8f2d728879d05657d86ca6fa6b0336d_xs.jpg', '体育，又称体育运动或简称运动', '体育');
INSERT INTO `topics` VALUES ('1002', '篮球', 'http://localhost:8082/static/uploads/icon/f85294643_xs.jpg', '篮球是一个由两队参与的球类运动，每队出场5名队员。', '体育');
INSERT INTO `topics` VALUES ('1003', '足球', 'http://localhost:8082/static/uploads/icon/1f9c99e8aa4b0ab76d4885ffd0eb10c0_xs.jpg', null, '体育');
INSERT INTO `topics` VALUES ('1004', '羽毛球', 'http://localhost:8082/static/uploads/icon/5a8cff419_xs.jpg', null, '体育');
INSERT INTO `topics` VALUES ('1005', '游泳', 'http://localhost:8082/static/uploads/icon/6ff253b3a_xs.jpg', null, '体育');
INSERT INTO `topics` VALUES ('1006', '乒乓球', 'http://localhost:8082/static/uploads/icon/0101a66a3_xs.jpg', null, '体育');
INSERT INTO `topics` VALUES ('1007', '跑步', 'http://localhost:8082/static/uploads/icon/c8f2d728879d05657d86ca6fa6b0336d_xs.jpg', null, '体育');
INSERT INTO `topics` VALUES ('1008', 'nba', 'http://localhost:8082/static/uploads/icon/5daddd688_xs.jpg', null, '篮球');
INSERT INTO `topics` VALUES ('1009', '网球', 'http://localhost:8082/static/uploads/icon/392c679a0_xs.jpg', null, '体育');
INSERT INTO `topics` VALUES ('1010', 'cba', 'http://localhost:8082/static/uploads/icon/d1b25d9e3_xs.jpg', null, '篮球');
INSERT INTO `topics` VALUES ('1011', '马刺', 'http://localhost:8082/static/uploads/icon/d69f99282_m.jpg', null, 'nba');
INSERT INTO `topics` VALUES ('1012', '勇士', 'http://localhost:8082/static/uploads/icon/7ebc16874_m.jpg', null, 'nba');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `userImg` varchar(255) DEFAULT NULL,
  `userIntro` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `headline` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=10026 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('10000', 'aaaaa', 'http://localhost:8082/static/uploads/icon/1463368955190.png', null, '123456', 'a@163.com', '女', '234', '2222');
INSERT INTO `users` VALUES ('10001', 'ihg', null, null, '111', 'aaa', null, null, null);
INSERT INTO `users` VALUES ('10002', 'ihg_sherry', null, null, 'sherry', '', null, null, null);
INSERT INTO `users` VALUES ('10004', '', null, null, '123456', 'sherrty@gamil.com', null, null, null);
INSERT INTO `users` VALUES ('10005', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10006', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10007', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10008', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10009', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10010', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10011', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10012', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10013', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10014', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10015', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10016', '', null, null, '', '', null, null, null);
INSERT INTO `users` VALUES ('10018', 'sherry', 'http://localhost:8082/static/uploads/icon/1463371640407.png', null, 'ihg123456', '1235@163.com', '男', ' 计算机', null);
INSERT INTO `users` VALUES ('10019', 'sherry', null, null, 'ihg123', '1235@163.com', null, null, null);
INSERT INTO `users` VALUES ('10020', 'sherry', null, null, 'ihg123', '1235@163.com', null, null, null);
INSERT INTO `users` VALUES ('10021', 'sherry', null, null, '123456', '123@163.com', null, null, null);
INSERT INTO `users` VALUES ('10022', 'sherry', null, null, '123456', '123@163.com', null, null, null);
INSERT INTO `users` VALUES ('10023', 'sherry', null, null, '123456', '123@123.com', null, null, null);
INSERT INTO `users` VALUES ('10024', 'sherry', null, null, '123456', '123@163.com', null, null, null);
INSERT INTO `users` VALUES ('10025', 'sherry', null, null, '123456', '123456@163.com', null, null, null);

-- ----------------------------
-- Table structure for `user_answer_up`
-- ----------------------------
DROP TABLE IF EXISTS `user_answer_up`;
CREATE TABLE `user_answer_up` (
  `userId` int(11) NOT NULL,
  `upAnswerId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`upAnswerId`),
  KEY `answerId` (`upAnswerId`),
  CONSTRAINT `answerId` FOREIGN KEY (`upAnswerId`) REFERENCES `answers` (`answerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user_answer_up
-- ----------------------------
INSERT INTO `user_answer_up` VALUES ('10000', '2');
INSERT INTO `user_answer_up` VALUES ('10018', '2');
INSERT INTO `user_answer_up` VALUES ('10000', '3');
INSERT INTO `user_answer_up` VALUES ('10018', '3');
INSERT INTO `user_answer_up` VALUES ('10000', '4');
INSERT INTO `user_answer_up` VALUES ('10018', '13');

-- ----------------------------
-- Table structure for `user_follow_question`
-- ----------------------------
DROP TABLE IF EXISTS `user_follow_question`;
CREATE TABLE `user_follow_question` (
  `userId` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `followQuestion` int(2) NOT NULL,
  PRIMARY KEY (`userId`,`questionId`),
  KEY `questionId` (`questionId`),
  CONSTRAINT `questionId` FOREIGN KEY (`questionId`) REFERENCES `questions` (`questionId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user_follow_question
-- ----------------------------
INSERT INTO `user_follow_question` VALUES ('10000', '1', '1');
INSERT INTO `user_follow_question` VALUES ('10000', '2', '1');

-- ----------------------------
-- Table structure for `user_topic_relationship`
-- ----------------------------
DROP TABLE IF EXISTS `user_topic_relationship`;
CREATE TABLE `user_topic_relationship` (
  `userId` int(11) NOT NULL,
  `topicId` int(255) NOT NULL,
  `followTopic` int(2) NOT NULL,
  PRIMARY KEY (`userId`,`topicId`),
  KEY `topicId` (`topicId`),
  CONSTRAINT `topicId` FOREIGN KEY (`topicId`) REFERENCES `topics` (`topicId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user_topic_relationship
-- ----------------------------
INSERT INTO `user_topic_relationship` VALUES ('10000', '1002', '0');
INSERT INTO `user_topic_relationship` VALUES ('10000', '1005', '0');
INSERT INTO `user_topic_relationship` VALUES ('10001', '1001', '0');
INSERT INTO `user_topic_relationship` VALUES ('10018', '1002', '1');
INSERT INTO `user_topic_relationship` VALUES ('10018', '1008', '1');
INSERT INTO `user_topic_relationship` VALUES ('10018', '1010', '1');
