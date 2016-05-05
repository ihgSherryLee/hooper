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
        <img src="{{topic.topicImg}}">
        <span>{{topic.topicName}}</span>
      </div>
      <div class="question-list">
        <div class="news-list-detail" v-for="item in question">
          <div class="feed-main">
            <div class="content">
              <h2><a v-link="{name:'question',params:{questionId:item.questionId}}">{{item.questionTitle}}</a></h2>
            </div>
            <div class="entry-body" v-for="ans in item.answer">
              <div class="votebar">
                <button href="#" @click="up(ans.answerId, ans.upNum)" class="up" title="赞同"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>{{ans.upNum}}</span></button>
                <button href="#" class="down" title="反对，不会显示你的姓名"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button>
              </div>
              <div class="answer-deatail">
                <div class="author">
                  <a href="#">ans.userName</a>,啊啊啊啊
                </div>
                <div class="answer">
                  {{{ans.answerText}}}
                </div>
              </div>
              <div class="feed-meta">
                <div class="meta-panel">
                  <span class="answer-date">发布于 {{ans.date}}</span>
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
        topic: {},
        question: []
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
      var user = cookie.getCookie('account')
      var topicId = self.$route.params.topicId
      console.log(topicId)
      Vue.http.get('/api/getTopicQuestion?topicId=' + topicId + '&user=' + user).then(function (response) {
        console.log(response.data)
        self.topic = response.data.topic
        self.question = response.data.question
      }, function () {
      })
    }
  }
</script>
