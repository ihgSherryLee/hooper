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
      padding: 10px 0;
      border-top: 1px solid #ccc;
    }
  }
  .answer-list {
    .answer-item {
      position: relative;
      padding: 10px 0;
      border-top: 1px solid #ccc;
      .votebar {
        position: absolute;
        left: -48px;
        width: 40px;
        button {
          margin-bottom: 10px;
          width: 40px;
          border: none;
          color: #337ab7;
          background: #eff6fa;
        }
      }
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
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="tag">
        <a v-for="item in tag" href="" class="item-tag">{{item.topicName}}</a>
      </div>
      <div class="question">
        <h2>{{question.questionTitle}}</h2>
        <ps>{{question.questionDesc}}</p>
        <div class="total-answer">共{{totalAnswer}}个回答</div>
      </div>
      <div class="answer-list">
        <div class="answer-item" v-for="item in answer">
          <div class="votebar">
            <button class="up" title="赞同"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>{{item.upNum}}</span></button>
            <button class="down" title="反对，不会显示你的姓名"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button>
          </div>
          <div class="answer-detail">
            <div class="author">
              <a href="#">{{item.userName}}</a>,{{item.userIntro}}
            </div>
            <div class="answer summary">
              {{{item.answerText}}}
            </div>
          </div>
          <div class="feed-meta">
            <div class="meta-panel">
              <span class="answer-date">发布于 {{item.date}}</span>
              <a href="#">关注问题</a>
              <a href="#">评论</a>
              <a href="#">收起</a>
            </div>
          </div>
        </div>
      </div>
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
        tag: [],
        question: {},
        editorContent: '',
        answer: [],
        totalAnswer: 0
      }
    },
    methods: {
      follow: function () {
      },
      unfollow: function () {
      },
      submit: function () {
        var self = this
        var data = {}
        data.questionId = 1
        data.user = 10000
        data.text = self.editorContent
        Vue.http.post('/api/answer', data).then(function (response) {
        }, function () {
        })
      }
    },
    components: {
      GlobleHeader
    },
    ready: function () {
      var self = this
      var account = cookie.getCookie('account')
      var data = {}
      data.account = account
      console.log(account)
      Vue.http.get('/api/getQuestion?user=10000&questionId=1', data).then(function (response) {
        self.tag = response.data.tag
        self.question = response.data.question[0]
        self.answer = response.data.answer
        self.totalAnswer = self.answer.length
      }, function () {
      })
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
      editor.config.uploadImgUrl = '/upload'
      editor.onchange = function () {
        // onchange 事件中更新数据
        self.editorContent = editor.$txt.html()
      }
      editor.create()
    }
  }
</script>
