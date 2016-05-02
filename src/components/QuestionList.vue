<style lang="less">
  .main-wrap {
    margin: auto;
    width: 960px;
  }
  .main-content-inner {
    width: 700px;
    .news {
      margin-bottom: 10px;
    }
  }
  .news-list-detail {
    padding: 10px 0;
    border-top: 1px solid #ccc;
  }
  .news-list-detail.first {
    border-top: 1px solid #bdbdbd;
  }
  .avatar {
    width: 38px;
    height: 38px;
    float: left;
    margin-top: 3px;
    a {
      display: block;
      width: 38px;
      height: 38px;
    }
  }
  .feed-main {
    margin-left: 48px;
    .source {
      color: #999;
      a {
        color: #999;
      }
    }
  }
  .content {
    h2 {
      margin: 10px 0;
    }
    .question-deatail {
      display: none;
    }
  }
  h2,h3,h4,h5 {
    font-weight: 800;
    font-size: 14px;
    outline: 0;
  }
  .entry-body {
    position: relative;
    margin-top: 5px;
    .vote {
      position: absolute;
      left: -48px;
      display: none;
      width: 40px;
      .vote-count {
        border: none;
        border-radius: 2px;
        background: rgba(204,91,91,0.4);
        color: #d20000;
      }
      .vote-count:hover {
        background: #d20000;
        color: #fff;
      }
    }
    .votebar {
      float: left;
      margin-left: -48px;
      width: 40px;
      .up,.down {
        margin-top: 10px;
        width: 40px;
        border: none;
        border-radius: 2px;
        background: rgba(204,91,91,0.4);
        color: #d20000;
      }
      .up:hover,.down:hover {
        width: 40px;
        border: none;
        border-radius: 2px;
        background: #d20000;
        color: #fff;
      }
    }
  }
  .author {
    margin-bottom: 2px;
  }
  .vote-info {
    font-size: 12px;
    color: #ccc;
  }
</style>

<template>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="news">最新动态</div>
      <div class="news-list-detail first">
        <div class="avatar">
          <a href="#"><img src=""></a>
        </div>
        <div class="feed-main">
          <div class="source">来自 <a href="#">XXX</a></div>
          <div class="content">
            <h2><a href="#">程序员都有哪些强迫症行为？</a></h2>
            <div class="question-deatail">我虽然不是程序员，偶尔写写代码，提升工作效率，但是写代码时，会强迫自己缩进，看到不缩进的代码，特别难受，喜欢强迫自己写注释，看到没注释的代码就想一把扔过去。还有的人写C语言强迫大括号换行，还有的人强迫自己用vim或者emacs编辑器，都有哪些强迫症？这些强迫症是否可以治疗？</div>
          </div>
          <div class="entry-body">
            <div class="vote">
              <button class="vote-count">111</button>
            </div>
            <div class="votebar">
              <button class="up" title="赞同"><span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span><span>111</span></button>
              <button class="down" title="反对，不会显示你的姓名"><span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span></button>
            </div>
            <div class="answer-deatail">
              <div class="author">
                <a href="#">XXX</a>,啊啊啊啊
              </div>
              <div class="vote-info">XXXXX,XXXX赞成</div>
              <div class="answer summary">
                习惯按Ctrl+S⋯⋯有时候看网页看着看着就Ctrl+S一下，之后突然反应过来不对⋯⋯看到bug就想改⋯⋯即使不是自己的bug⋯⋯还喜欢找bug，看到登录框就想试试能不能SQL注入⋯⋯有时候还会抓包或者发假包⋯⋯看到一个软件就会想自己要做的话怎么做⋯⋯
                <span class="answer-date">发布于 2016-01-15</span>
              </div>
            </div>
            <div class="feed-meta">
              <div class="meta-panel">
                <a href="#">关注问题</a>
                <a href="#">评论</a>
                <a href="#">收起</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="news-list-detail" v-for="item in items">
        <div class="avatar">
          <a href="#"><img src=""></a>
        </div>
        <div class="feed-main">
          <div class="source">来自<a href="#">XXX</a></div>
          <div class="content">
            <h2><a href="#">程序员都有哪些强迫症行为？</a></h2>
            <div class="question-deatial">我虽然不是程序员，偶尔写写代码，提升工作效率，但是写代码时，会强迫自己缩进，看到不缩进的代码，特别难受，喜欢强迫自己写注释，看到没注释的代码就想一把扔过去。还有的人写C语言强迫大括号换行，还有的人强迫自己用vim或者emacs编辑器，都有哪些强迫症？这些强迫症是否可以治疗？</div>
          </div>
          <div class="entry-body">
            <div class="vote">
              <button class="vote-count">111</button>
            </div>
            <div class="votebar">
              <button class="up" title="赞同"></button>
              <button class="down" title="反对，不会显示你的姓名"></button>
            </div>
            <div class="answer-deatail">
              <div class="author">
                <a href="#">XXX</a>,啊啊啊啊
              </div>
              <div class="vote-info"></div>
              <div class="answer">
                习惯按Ctrl+S⋯⋯有时候看网页看着看着就Ctrl+S一下，之后突然反应过来不对⋯⋯看到bug就想改⋯⋯即使不是自己的bug⋯⋯还喜欢找bug，看到登录框就想试试能不能SQL注入⋯⋯有时候还会抓包或者发假包⋯⋯看到一个软件就会想自己要做的话怎么做⋯⋯
                <span class="answer-date">发布于 2016-01-15</span>
              </div>
            </div>
            <div class="feed-meta">
              <div class="meta-panel">
                <a href="#">关注问题</a>
                <a href="#">评论</a>
                <a href="#">收起</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        items: []
      }
    },
    methods: {
    },
    ready: function () {
      var self = this
      var account = cookie.getCookie('account')
      var data = {}
      data.account = account
      console.log(account)
      Vue.http.get('/api/getIndex?user=10000&questionId=1', data).then(function (response) {
        self.tag = response.data.tag
        self.question = response.data.question[0]
        self.answer = response.data.answer
        self.totalAnswer = self.answer.length
      }, function () {
      })
    }
  }
</script>
