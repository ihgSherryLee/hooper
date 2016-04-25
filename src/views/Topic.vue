<style lang="less">
  .topic-title {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      margin-left: 10px;
      font-size: 15px;
      font-weight: bold;
    }
  }
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="topic-title">
        <img src="" alt="">
        <span>{{topicName}}</span>
      </div>
      <div class="question-list">
        <div class="news-list-detail">
          <div class="feed-main">
            <div class="content">
              <h2><a href="#">程序员都有哪些强迫症行为？</a></h2>
            </div>
            <div class="entry-body">
              <div class="vote">
                <button class="vote-count">111</button>
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
  </div>
</template>

<script>
  import GlobleHeader from './../components/GlobleHeader'
  import cookie from './../assets/scripts/cookie.js'

  // import VueRouter from 'vue-router'
  // import VueResource from 'Vue-resource'
  // Vue.use(VueRouter)
  // Vue.use(VueResource)

  // var router = new VueRouter()

  module.exports = {
    data: function () {
      return {
        topicName: '游戏',
        questionList: []
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
      var topicId = self.$route.params.topicId
      console.log(topicId)
      var data = {}
      data.account = account
      console.log(account)
      Vue.http.get('/api/getTopic', data).then(function (response) {
        console.log(response.data)
        self.userName = response.data.userId
        self.userImg = response.data.userImg
        self.gender = response.data.gender
        self.headline = response.data.headline
        self.description = response.data.description
      }, function () {
      })
    }
  }
</script>
