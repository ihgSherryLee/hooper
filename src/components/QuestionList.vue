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
    a img {
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
      <div class="news-list-detail" v-for="item in items">
        <div class="avatar">
          <a href="#"><img src="{{item.topicImg}}"></a>
        </div>
        <div class="feed-main">
          <div class="source">来自<a <a href="#" v-link="{name:'topic',params:{topicId:item.topicId}}">{{item.topicName}}</a></div>
          <div class="content">
            <h2><a href="#" v-link="{name:'question',params:{questionId:item.questionId}}">{{item.questionTitle}}</a></h2>
          </div>
          <div class="entry-body">
            <div class="votebar">
              <button href="#" @click="up(item.answerId, item.upNum)" class="up" title="赞同"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>{{item.upNum}}</span></button>
              <button href="#" class="down" title="反对，不会显示你的姓名"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button>
            </div>
            <div class="answer-deatail">
              <div class="author">
                <a href="#">{{item.userName}}</a>,啊啊啊啊
              </div>
              <div class="answer">
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
      </div>
    </div>
  </div>
</template>

<script>
  import cookie from './../assets/scripts/cookie.js'

  module.exports = {
    data: function () {
      return {
        items: []
      }
    },
    methods: {
      up: function (answerId, upNum) {
        console.log(answerId)
        console.log(upNum)
        Vue.http.get('/api/up?answerId=' + answerId + '&upNum=' + upNum).then(function (response) {
          self.items = response.data
          console.log(self.items)
        }, function () {
        })
      }
    },
    ready: function () {
      var self = this
      var account = cookie.getCookie('account')
      console.log(account)
      Vue.http.get('/api/getIndex?user=10000').then(function (response) {
        self.items = response.data
        console.log(self.items)
      }, function () {
      })
    }
  }
</script>
