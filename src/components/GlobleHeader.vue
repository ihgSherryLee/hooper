<style lang="less">
  .nav-wrap {
    margin: auto;
    width: 960px;
  }
  .question-btn {
    width: 50px;
    height: 30px;
    line-height: 30px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background: #0e7bef;
  }
  .cancel-btn {
    width: 50px;
    height: 30px;
    line-height: 30px;
    border: none;
    border-radius: 4px;
    color: #259;
    background: #fff;
  }
  .navbar {
    height: 50px;
    line-height: 50px;
    .navbar-header {
      position: relative;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      .question-btn {
        margin-top: 12px;
      }
      .message-wrap {
        position: absolute;
        top: 48px;
        right: -90px;
        width: 315px;
        border: 1px solid #eee;
        border-radius: 4px;
        box-shadow: 1px #eee;
        z-index: 500;
        background: #fff;
        .message-type {
          a {
            display: inline-block;
            width: 49%;
            text-align: center;
            color: #eee;
          }
          .active {
            color: #337ab7; 
          }
        }
        .message-content {
          padding: 0 10px;
          max-height: 300px;
          font-size: 14px;
          line-height: 25px;
          .message-item {
            padding: 5px 0;
            border-top: 1px solid #eee;
          }
        }
      }
    }
  }
  .search-form {
    margin: 7px 0 0 12px;
    float: left;
  }
  .navbar-form {
    position: relative;
    float: left;
    margin-top: 0;
    padding: 0;
    width: 367px;
    line-height: 32px;
    .form-control {
      width: 100%;
    }
    button {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .sidebar-nav {
    padding: 9px 0;
  }
  ul.navbar-nav {
    margin-left: 30px;
  }
  .navbar-nav-li {
    height: 50px;
    line-height: 50px;
  }
  .profile {
    float: right;
    height: 50px;
    width: 160px;
    line-height: 50px;
  }
  .profile:hover {
    visibility: visible;
  }
  .user-info {
    height: 50px;
    margin: 8px;
    img {
      height: 40px;
      height: 40px;
    }
  }
.dropdown-menu .sub-menu {
    left: 100%;
    position: absolute;
    top: 0;
    visibility: hidden;
    margin-top: -1px;
}
.dropdown-menu {
  margin-top: 0;
}
.dropdown-menu li:hover .sub-menu {
    visibility: visible;
}

.dropdown:hover .dropdown-menu {
    display: block;
}
.question-wrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 555;
  overflow: auto;
  background: rgba(0, 0, 0, 0.2);
  .question-dialog {
    width: 550px;
    margin: auto;
    margin-top: 50px;
    border: 1px solid #eee;
    border-radius: 4px;
    background: #fff;
    .question-dialog-title {
      position: relative;
      padding: 5px 15px;
      line-height: 30px;
      border-radius: 4px;
      color: #FFF;
      background: #1676D7;
      .question-dialog-title-close {
        position: absolute;
        right: 5px;
      }
    }
    .question-dialog-content {
      padding: 15px;
      textarea {
        width: 100%;
        border: 1px solid #eee;
        border-radius: 4px;
        resize: none;
      }
      .question-desc {
        textarea {
          min-height: 100px;
        }
      }
      .choose-topic-input {
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 4px;
        .inline {
          .tag-editor {
            float: left;
            padding: 0 5px;
            margin-right: 5px;
            border-radius: 30px;
            background: #EFF6FA;
          }
        }
        input {
          border: none;
        }
        .tag-editor-btn {
          position: relative;
          float: left;
          .topic-render {
            position: absolute;
            top: 36px;
            width: 188px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            .topic-row {
              padding: 8px;
              img {
                margin-right: 10px;
                width: 30px;
                height: 30px;
              }
            }
            .topic-row:hover {
              background: #D6E9F8;
            }
          }
          
        }
      }
      .question-command-btn {
        position: relative;
        margin-top: 20px;
        text-align: right;
      }
    }
  }
}
</style>

<template>
  <nav class="navbar navbar-default" role="navigation">
    <div class="nav-wrap">
      <div class="navbar-header">HOOPER</div>
      <div class="navbar-header">
        <div class="search-form">
          <form class="navbar-form" role="search">
            <input type="text" v-model="searchVal" class="form-control" placeholder="搜索话题、人" @keyup.enter="submit">
            <button @click="submit" class="btn btn-default"><span class="glyphicon glyphicon-search" aria-hidden="true"></button>
          </form>
        </div>
        <ul class="nav navbar-nav">
          <li><a v-link="{path: '/index'}" class="navbar-nav-li">首页</a></li>
          <li><a href="#" v-link="{path:'/topicList'}"class="navbar-nav-li">话题</a></li>
          <li><a href="#"class="navbar-nav-li"  @click="showMessageWrap">消息</a>
          </li>
        </ul>
        <button class="question-btn" @click="toggleQuestionWrap">提问</button>
        <div v-show="showMessage" class="message-wrap">
          <div class="message-type">
            <a :class="{'active':showAnswer}" href="#" @click="showAnswerWrap"><span class="glyphicon glyphicon-list" aria-hidden="true"></span></a>
            <a :class="{'active':showUser}" href="#" @click="showUserWrap"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a>
          </div>
          <div class="message-content">
            <div class="message-answer" v-show="showAnswer">
              <div class="message-item" v-for="item in answerMessage">
                <a v-link="{name:'user',params:{userId:item.answererId}}">{{item.userName}}</a>回答了问题
                <a v-link="{name:'question',params:{questionId:item.questionId}}" href="#">{{item.questionTitle}}</a>
              </div>
            </div>
            <div class="message-user" v-show="showUser">
              <div class="message-item" v-for="item in userMessage">
                <!-- <a class="avator-link" v-link="{name:'user',params:{userId:item.userId}}"><img src="" alt=""></a>
                <div class="user-info">
                  <a class="name-link" v-link="{name:'user',params:{userId:item.userId}}">{{item.userName}}</a>
                  <p>{{item.headline}}</p>
                  <a v-if="!item.friendId" class="follow" href="#" @click="followUser($index,item.userId)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>关注</a>
                  <a v-else class="follow" href="#" @click="unfollowUser($index, item.userId)">取消关注</a>
                </div> -->
                <a v-link="{name:'user',params:{userId:item.userId}}">{{item.userName}}</a>关注了你
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown profile">
        <a v-link="{name:'user',params:{userId:user.userId}}" class="user-info">
          <span class="user-name">{{user.userName}}</span>
          <img v-if="!user.userImg" class="user-img" src="/static/uploads/icon/images.jpg">
          <img v-else class="user-img" :src="user.userImg">
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a v-link="{name:'user',params:{userId:user.userId}}">我的主页</a></li>
          <li><a v-link="{path:'/login'}">退出</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="question-wrap" v-show="showQuestionWrap">
    <div class="question-dialog">
      <div class="question-dialog-title">
        <span class="question-dialog-title-text">提问</span>
        <span class="question-dialog-title-close" @click="toggleQuestionWrap"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span>
      </div>
      <div class="question-dialog-content">
        <div class="question-title">
          <label>问题：</label>
          <textarea v-model="questionTitle"></textarea>
        </div>
        <div class="question-desc">
          <label>问题补充、说明：</label>
          <textarea v-model="questionDesc"></textarea>
        </div>
        <div class="choose-topic">
          <label>选择话题：</label>
          <span>{{chooseTips}}</span>
          <div class="choose-topic-input clearfix">
            <div class="inline">
              <div class="tag-editor" v-for="topic in topics">
                <span>{{topic.topicName}}</span>
                <a href="#" class="remove" @click="remove($index)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
              </div>
            </div>
            <div class="tag-editor-btn">
              <label><span class="glyphicon glyphicon-search" aria-hidden="true"></span></label>
              <input @click="toggltTopic" v-model="topic" placeholder="搜索话题" @keyup.enter="searchTopic" />
              <div v-show="showTopicRender" class="topic-render">
                <div class="topic-row" v-for="tag in tags" @click="selectTopic($index)">
                  <img :src="tag.topicImg">
                  <span>{{tag.topicName}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="question-command-btn">
          <button class="cancel-btn" @click="toggleQuestionWrap">取消</button>
          <button class="question-btn" @click="question">发布</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'Vue'
  import VueResource from 'Vue-resource'
  import cookie from './../assets/scripts/cookie.js'
  Vue.use(VueResource)

  export default {
    data: function () {
      return {
        user: {},
        searchVal: '',
        showMessage: false,
        showAnswer: true,
        showUser: false,
        showQuestionWrap: false,
        chooseTips: '请选择至少一个话题',
        showTopicRender: false,
        questionTitle: '',
        questionDesc: '',
        inputTopic: '',
        tags: [],
        topics: [],
        answerMessage: [],
        userMessage: []
      }
    },
    methods: {
      submit: function () {
        var self = this
        self.$router.go({
          name: 'search',
          params: {
            type: 'content',
            keyword: self.searchVal
          }
        })
      },
      searchTopic: function () {
        var self = this
        var topic = self.topic
        Vue.http.get('/api/searchTopic?topic=' + topic).then(function (response) {
          self.tags = response.data
        }, function () {
        })
      },
      selectTopic: function (index) {
        var self = this
        var flag
        if (self.topics.length > 2) {
          self.chooseTips = '最多选择3个话题'
        } else {
          self.chooseTips = ''
          self.topics.forEach(function (element) {
            if (element.topicId === self.tags[index].topicId) {
              flag = true
            }
          })
          if (!flag) {
            self.topics.push(self.tags[index])
          }
          self.tags.splice(index, 1)
        }
      },
      toggltTopic: function (e) {
        var self = this
        self.showTopicRender = true
        $(document).one('click', function () {
          self.showTopicRender = false
        })
        e.stopPropagation()
      },
      remove: function (index) {
        var self = this
        self.tags.unshift(self.topics[index])
        self.topics.splice(index, 1)
      },
      question: function () {
        var self = this
        var data = {}
        if (!self.questionTitle || !self.topics.length <= 0) {
          window.alert('请输入正确格式的问题')
          return
        }
        data.questionTitle = self.questionTitle
        data.questionDesc = self.questionDesc
        data.topics = self.topics
        var user = self.user.userId
        Vue.http.post('/api/question?user=' + user, data).then(function (response) {
          self.showQuestionWrap = false
          self.$router.go({
            name: 'question',
            params: {
              questionId: response.data.questionId
            }
          })
        }, function () {
        })
      },
      toggleQuestionWrap: function () {
        var self = this
        self.showQuestionWrap = !self.showQuestionWrap
      },
      showMessageWrap: function (e) {
        var self = this
        self.showMessage = !self.showMessage
        self.showAnswerWrap()
      },
      showAnswerWrap: function () {
        var self = this
        self.showAnswer = true
        self.showUser = false
        var user = self.user.userId
        Vue.http.get('/api/getMessage?type=answer&user=' + user).then(function (response) {
          self.answerMessage = response.data
        }, function () {
        })
      },
      showUserWrap: function () {
        var self = this
        self.showAnswer = false
        self.showUser = true
        var user = self.user.userId
        Vue.http.get('/api/getMessage?type=user&user=' + user).then(function (response) {
          self.userMessage = response.data
        }, function () {
        })
      }
    },
    ready: function () {
      var self = this
      var user = cookie.getCookie('hpuserId')
      Vue.http.get('/api/queryUser?user=' + user).then(function (response) {
        self.user = response.data
        self.showQuestionWrap = false
      }, function () {
      })
    }
  }
</script>
