<style lang="less">
  .nav-wrap {
    margin: auto;
    width: 960px;
  }
  .navbar {
    height: 63px;
    line-height: 45px;
  }
  .navbar-header {
    margin: 8px;
    font-size: 18px;
  }
  .navbar-form {
    float: left;
  }
  .sidebar-nav {
    padding: 9px 0;
  }
  .navbar-nav-li {
    height: 63px;
    line-height: 63px;
  }
  .profile {
    float: right;
    height: 63px;
    width: 160px;
    line-height: 63px;
  }
  .profile:hover {
    visibility: visible;
  }
  .user-info {
    height: 45px;
    margin: 8px;
    img {
      height: 45px;
      height: 45px;
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
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
    background: #fff;
    .question-dialog-title {
      position: relative;
      height: 30px;
      line-height: 30px;
      background: #fff;
      .question-dialog-title-close {
        position: absolute;
        right: 0;
      }
    }
    .question-dialog-content {
      textarea {
        width: 100%;
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
            width: 255px;
            background: #fff;
            .topic-row {
              padding: 8px;
              img {
                margin-right: 10px;
                width: 30px;
                height: 30px;
              }
            }
          }
          
        }
      }
      .question-btn {
        position: relative;
        margin-top: 20px;
        button {
          position: absolute;
          right: 5px;
          background: #EFF6FA
        }
      }
    }
  }
}
</style>

<template>
  <nav class="navbar navbar-default" role="navigation">
    <div class="nav-wrap">
      <div class="navbar-header">HOOPER</div>
      <div>
        <form action="" class="navbar-form" role="search">
          <input type="text" class="form-control" placeholder="搜索话题、人">
          <button @click="submit" class="btn btn-default">搜索</button>
        </form>
        <ul class="nav navbar-nav">
          <li><a v-link="{path: '/index'}" class="navbar-nav-li">首页</a></li>
          <li><a href="#" v-link="{path:'/topicList'}"class="navbar-nav-li">话题</a></li>
        </ul>
        <button @click="toggleQuestionWrap">提问</button>
      </div>
      <div class="dropdown profile">
        <a href="#" class="user-info">
          <span class="user-name">{{user.userName}}</span>
          <img v-if="!user.userImg" class="user-img" src="/static/uploads/icon/images.jpg">
          <img v-else class="user-img" src="{{user.userImg}}">
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">我的主页</a></li>
          <li><a href="#">退出</a></li>
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
          问题：
          <textarea v-model="questionTitle"></textarea>
        </div>
        <div class="questionDesc">
          问题补充、说明：
          <textarea v-model="questionDesc"></textarea>
        </div>
        <div class="choose-topic">
          选择话题：
          <div class="choose-topic-input clearfix">
            <div class="inline">
              <div class="tag-editor" v-for="topic in topics">
                <span>{{topic.topicName}}</span>
                <a href="#" class="remove" @click="remove($index)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
              </div>
            </div>
            <div class="tag-editor-btn">
              <label><span class="glyphicon glyphicon-search" aria-hidden="true"></span></label>
              <input v-model="topic" placeholder="搜索话题" @keyup.enter="searchTopic" />
              <div class="topic-render">
                <div class="topic-row" v-for="tag in tags" @click="selectTopic($index)">
                  <img :src="tag.topicImg">
                  <span>{{tag.topicName}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="question-btn">
          <button @click="question">发布</button>
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
        showQuestionWrap: false,
        questionTitle: '',
        questionDesc: '',
        inputTopic: '',
        tags: [],
        topics: []
      }
    },
    methods: {
      submit: function () {
      },
      searchTopic: function () {
        var self = this
        var topic = self.topic
        Vue.http.get('/api/searchTopic?topic=' + topic).then(function (response) {
          self.tags = response.data
          console.log(response.data)
        }, function () {
        })
      },
      selectTopic: function (index) {
        var self = this
        self.topics.push(self.tags[index])
        console.log(self.topics)
        self.tags.splice(index, 1)
      },
      remove: function (index) {
        var self = this
        self.tags.unshift(self.topics[index])
        self.topics.splice(index, 1)
      },
      question: function () {
        var self = this
        var data = {}
        data.questionTitle = self.questionTitle
        data.questionDesc = self.questionDesc
        data.topics = self.topics
        var user = 10000
        Vue.http.post('/api/question?user=' + user, data).then(function (response) {
          self.tags = response.data
          console.log(response.data)
        }, function () {
        })
      },
      toggleQuestionWrap: function () {
        var self = this
        self.showQuestionWrap = !self.showQuestionWrap
        console.log(self.showQuestionWrap)
      }
    },
    ready: function () {
      var self = this
      var account = cookie.getCookie('account')
      var data = {}
      data.account = 10000
      console.log(account)
      Vue.http.get('/api/queryUser?user=' + account).then(function (response) {
        self.user = response.data
        console.log(response.data)
      }, function () {
      })
    }
  }
</script>
