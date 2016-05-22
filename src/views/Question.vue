<style lang="less" scope>
  @import "./../../node_modules/wangeditor/dist/css/wangEditor.min.css";
  .tag {
    .item-tag {
      padding: 1px 10px 0;
      border-radius: 30px;
      text-decoration: none;
      margin: 0 5px 5px 0;
      background: #eff6fa;
    }
  }
  .question {
    h2 {
      font-size: 18px;
      font-weight: 700;
    }
    .total-answer {
      position: relative;
      padding: 10px 0;
      border-top: 1px solid #ccc;
      button {
        position: absolute;
        top: 7px;
        right: 0;
        padding: 5px;
        border: none;
        border-radius: 4px;
      }
      .follow {
        color: #3e5e00;
        background: #8ab923;
      }
      .cancel {
        color: #3e5e00;
        background: #eee;
      }
    }
  }
  .answer-list {
    .entry-body {
      position: relative;
      padding: 10px 0;
      border-top: 1px solid #ccc;
      .answer-detail {
        .author {
          margin-bottom: 10px;
        }
      }
      .feed-meta {
        color: #ccc;
      }
    }
  }
  .my-answer {
    margin-top: 20px;
    padding: 10px 0;
    border-top: 1px solid #eee;
  }
  #editor-container {
    position: relative;
    .submit {
      position: absolute;
      right: 0;
      margin-top: 10px;
      width: 50px;
      height: 30px;
      line-height: 30px;
      border: none;
      border-radius: 4px;
      color: #fff;
      background: #0e7bef;
    }
  }
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="tag">
        <a v-for="item in tag" v-link="{name:'topic',params:{topicId:item.topicId}}" class="item-tag">{{item.topicName}}</a>
      </div>
      <div class="question">
        <h2>{{question.questionTitle}}</h2>
        <ps>{{question.questionDesc}}</p>
        <div class="total-answer">共{{totalAnswer}}个回答
          <button class="follow" v-if="!question.followQuestion" @click="followQuestion(question.questionId, question.followQuestion)">关注问题</button>
          <button class="cancel" v-else @click="followQuestion(question.questionId, question.followQuestion)">取消关注</button>
        </div>
      </div>
      <div class="answer-list">
        <div class="entry-body" v-for="item in answer">
          <div class="votebar">
            <button @click="update($index, item.answerId, item.upAnswerId)" class="up" :class="{active: item.upAnswerId}" title="赞同"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>{{item.upNum}}</span></button>
          </div>
          <div class="answer-detail">
            <div class="author">
              <a href="#" v-link="{name:'user',params:{userId:item.answererId}}">{{item.userName}}</a><span v-if="item.headline">,{{item.headline}}</span>
            </div>
            <div class="answer summary">
              {{{item.answerText}}}
            </div>
          </div>
          <div class="feed-meta">
            <div class="meta-panel">
              <span class="answer-date">发布于 {{item.date}}</span>
              <a href="#">收起</a>
            </div>
          </div>
        </div>
      </div>
      <div class="my-answer">我的回答</div>
      <div id="editor-container">
        <div id="editor-trigger" style="height:200px;max-height:300px;">
        </div>
        <button class="submit" @click="submit">发表</button>
      </div>
    </div>
  </div>
</template>

<script>
  import GlobleHeader from './../components/GlobleHeader'
  import cookie from './../assets/scripts/cookie.js'
  import wangEditor from 'wangeditor/dist/js/wangEditor'

  module.exports = {
    data: function () {
      return {
        userId: '',
        tag: [],
        question: {},
        editorContent: '',
        answer: [],
        totalAnswer: 0,
        myAnswer: {}
      }
    },
    methods: {
      followQuestion: function (questionId, follow) {
        var self = this
        if (!follow) {
          Vue.http.get('/api/followQuestion?user=' + self.userId + '&type=follow&questionId=' + questionId).then(function (response) {
            self.question.followQuestion = 1
          }, function () {
          })
        } else {
          Vue.http.get('/api/followQuestion?user=' + self.userId + '&type=unfollow&questionId=' + questionId).then(function (response) {
            self.question.followQuestion = 0
          }, function () {
          })
        }
      },
      update: function (index, answerId, upAnswerId) {
        var self = this
        if (!upAnswerId) {
          Vue.http.get('/api/updateUp?user=' + self.userId + '&type=up&answerId=' + answerId + '&upNum=' + self.answer[index].upNum).then(function (response) {
            self.answer[index].upNum++
            self.answer[index].upAnswerId = true
          }, function () {
          })
        } else {
          Vue.http.get('/api/updateUp?user=' + self.userId + '&type=down&answerId=' + answerId + '&upNum=' + self.answer[index].upNum).then(function (response) {
            self.answer[index].upNum--
            self.answer[index].upAnswerId = false
          }, function () {
          })
        }
      },
      submit: function () {
        var self = this
        var type
        var data = {}
        data.questionId = self.$route.params.questionId
        data.user = self.userId
        data.text = self.editorContent
        if (!self.myAnswer) {
          type = 'insert'
        } else {
          type = 'update'
          data.answerId = self.myAnswer.answerId
        }
        Vue.http.post('/api/answer?type=' + type, data).then(function (response) {
          window.location.reload()
        }, function () {
        })
      },
      initEditor: function (text) {
        var self = this
        var editor = new wangEditor('editor-trigger')
        editor.config.menus = [
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'eraser',
          '|',
          'quote',
          'fontfamily',
          'fontsize',
          'head',
          'unorderlist',
          'orderlist',
          '|',
          'link',
          'unlink',
          '|',
          'img',
          'insertcode'
        ]
        editor.config.menuFixed = false
        editor.config.uploadImgUrl = '/api/uploadPhoto'
        editor.onchange = function () {
          // onchange 事件中更新数据
          self.editorContent = editor.$txt.html()
        }
        editor.create()
        editor.$txt.html(text)
      }
    },
    components: {
      GlobleHeader
    },
    ready: function () {
    },
    route: {
      data: function (transition) {
        var self = this
        var user = cookie.getCookie('hpuserId')
        self.userId = user
        var questionId = self.$route.params.questionId
        Vue.http.get('/api/getQuestion?user=' + user + '&questionId=' + questionId).then(function (response) {
          self.tag = response.data.tag
          self.question = response.data.question[0]
          self.answer = response.data.answer
          self.totalAnswer = self.answer.length
          if (response.data.myAnswer.length !== 0) {
            self.myAnswer = response.data.myAnswer[0]
            self.editorContent = self.myAnswer.answerText
            self.initEditor(self.myAnswer.answerText)
          } else {
            self.initEditor('')
          }
        }, function () {
        })
      }
    }
  }
</script>
