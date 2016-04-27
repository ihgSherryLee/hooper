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
    }
  }
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="tag">
        <a v-for="item in tags" href="" class="item-tag">{{item.name}}</a>
      </div>
      <div class="question">
        <h2>{{title}}</h2>
        <p v-if="description">{{description}}</p>
        <div class="total-answer">{{totalAnswer}}</div>
      </div>
      <div class="answer-list">
        <div class="answer-item">
          <div class="votebar">
            <button class="up" title="赞同"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>111</span></button>
            <button class="down" title="反对，不会显示你的姓名"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button>
          </div>
          <div class="answer-deatail">
            <div class="author">
              <a href="#">XXX</a>,啊啊啊啊
            </div>
            <div class="answer summary">
              习惯按Ctrl+S⋯⋯有时候看网页看着看着就Ctrl+S一下，之后突然反应过来不对⋯⋯看到bug就想改⋯⋯即使不是自己的bug⋯⋯还喜欢找bug，看到登录框就想试试能不能SQL注入⋯⋯有时候还会抓包或者发假包⋯⋯看到一个软件就会想自己要做的话怎么做⋯⋯
            </div>
          </div>
          <div class="feed-meta">
            <div class="meta-panel">
              <span class="answer-date">发布于 2016-01-15</span>
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
        <hr>
        <p><b>以下是编辑器的内容：</b></p>
        <p>{{ editorContent }}</p>
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
        tags: [
          {
            name: '体育'
          },
          {
            name: '体育'
          },
          {
            name: '体育'
          },
          {
            name: '体育'
          },
          {
            name: '体育'
          },
          {
            name: '体育'
          }
        ],
        title: '有哪些动漫或者游戏里的台词在生活中被经常说起？',
        description: '可以是形容一件事情的时候经常被借用的话，也可以是原本毫无意义，但是在游戏/动漫中反复出现导致生活中也拿它作为口头禅。（例如；它们回来了。我们是它们的奴隶。）,',
        totalAnswer: 20,
        editorContent: ''
      }
    },
    methods: {
      follow: function () {
      },
      unfollow: function () {
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
      Vue.http.post('/api/getAllTopic', data).then(function (response) {
        console.log(response.data)
        self.userName = response.data.userId
        self.userImg = response.data.userImg
        self.gender = response.data.gender
        self.headline = response.data.headline
        self.description = response.data.description
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
