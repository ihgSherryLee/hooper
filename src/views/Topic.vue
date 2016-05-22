<style lang="less">
  .topic-title {
    position: relative;
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
    a {
      position: absolute;
      top: 5px;
      right: 0;
    }
  }
  .content {
    position: relative;
    h2 {
      margin-right: 80px;
    }
    button {
      position: absolute;
      top: 0;
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
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="topic-title">
        <img src="{{topic.topicImg}}">
        <span>{{topic.topicName}}</span>
        <a v-if="!topic.followTopic" class="follow" href="#" @click="followTopic(topic.topicId,topic.followTopic)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>关注</a>
        <a v-else class="follow" href="#" @click="followTopic(topic.topicId,topic.followTopic)">取消关注</a>
      </div>
      <div class="question-list">
        <div class="news-list-detail" v-for="item in question">
          <div class="feed-main">
            <div class="content">
              <h2><a v-link="{name:'question',params:{questionId:item.questionId}}">{{item.questionTitle}}</a></h2>
              <button class="follow" v-if="!item.followQuestion" @click="followQuestion($index, item.questionId, item.followQuestion)">关注问题</button>
              <button class="cancel" v-else @click="followQuestion($index, item.questionId, item.followQuestion)">取消关注</button>
            </div>
            <div class="entry-body" v-for="ans in item.answer">
              <div class="votebar">
                <button @click="update($parent.$index, $index, ans.answerId, ans.upAnswerId)" class="up" :class="{active: ans.upAnswerId}" title="赞同"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>{{ans.upNum}}</span></button>
              </div>
              <div class="answer-deatail">
                <div class="author">
                  <a href="#" v-link="{name:'user',params:{userId:ans.answererId}}">{{ans.userName}}</a><span v-if="item.headline">,{{ans.headline}}</span>
                </div>
                <div class="answer">
                  {{{ans.answerText}}}
                </div>
              </div>
              <div class="feed-meta">
                <div class="meta-panel">
                  <span class="answer-date">发布于 {{ans.date}}</span>
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
        userId: '',
        topic: {},
        question: []
      }
    },
    methods: {
      followTopic: function (topicId, follow) {
        var self = this
        var user = self.userId
        if (!follow) {
          Vue.http.get('/api/followTopic?user=' + user + '&type=follow&topicId=' + topicId).then(function (response) {
            self.topic.followTopic = 1
          }, function () {
          })
        } else {
          Vue.http.get('/api/followTopic?user=' + user + '&type=unfollow&topicId=' + topicId).then(function (response) {
            self.topic.followTopic = 0
          }, function () {
          })
        }
      },
      followQuestion: function (index, questionId, follow) {
        var self = this
        console.log(follow)
        if (!follow) {
          Vue.http.get('/api/followQuestion?user=' + self.userId + '&type=follow&questionId=' + questionId).then(function (response) {
            self.question[index].followQuestion = 1
          }, function () {
          })
        } else {
          Vue.http.get('/api/followQuestion?user=' + self.userId + '&type=unfollow&questionId=' + questionId).then(function (response) {
            self.question[index].followQuestion = 0
          }, function () {
          })
        }
      },
      update: function (i, j, answerId, upAnswerId) {
        var self = this
        if (!upAnswerId) {
          Vue.http.get('/api/updateUp?user=' + self.userId + '&type=up&answerId=' + answerId + '&upNum=' + self.question[i].answer[j].upNum).then(function (response) {
            self.question[i].answer[j].upNum++
            self.question[i].answer[j].upAnswerId = true
            console.log(self.question)
          }, function () {
          })
        } else {
          Vue.http.get('/api/updateUp?user=' + self.userId + '&type=down&answerId=' + answerId + '&upNum=' + self.question[i].answer[j].upNum).then(function (response) {
            self.question[i].answer[j].upNum--
            self.question[i].answer[j].upAnswerId = false
            console.log(self.question)
          }, function () {
          })
        }
      }
    },
    components: {
      GlobleHeader
    },
    ready: function () {
      var self = this
      var user = cookie.getCookie('hpuserId')
      self.userId = user
      var topicId = self.$route.params.topicId
      console.log(topicId)
      Vue.http.get('/api/getTopicQuestion?topicId=' + topicId + '&user=' + user).then(function (response) {
        console.log(response.data)
        self.topic = response.data.topic[0]
        self.question = response.data.question
      }, function () {
      })
    }
  }
</script>
