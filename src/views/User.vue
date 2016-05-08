<style lang="less">
  .user-intro-card {
    padding: 10px;
    border: 1px solid #eee;
  }
  .user-answer-list {
    padding: 10px;
    border: 1px solid #eee;
    .content {
      padding-left: 60px;
    }
  }
  .user-question-list {
    padding: 10px;
    border: 1px solid #eee;
  }
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="user-intro-card">
        <a class="avator-link" href="#"><img src="{{item.user[0].userImg}}" alt=""></a>
        <div class="user-info">
          <a class="name-link" href="#">{{item.user[0].userName}}</a>
          <p>{{item.user[0].headline}}</p>
        </div>
      </div>
      <div class="user-answer-list question-list">
        <h2>{{item.user[0].userName}}的回答</h2>
        <div class="content" v-for="ans in item.answer">
          <h2><a href="#" v-link="{name:'question',params:{questionId:ans.questionId}}">{{ans.questionTitle}}</a></h2>
          <div class="entry-body">
            <div class="votebar">
              <button href="#" @click="up(ans.answerId, ansupNum)" class="up" title="赞同"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>{{ans.upNum}}</span></button>
              <button href="#" class="down" title="反对，不会显示你的姓名"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button>
            </div>
            <div class="answer">
              {{{ans.answerText}}}
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
      <div class="user-question-list question-list">
        <h2>{{item.user[0].userName}}的提问</h2>
        <div class="answer-item" v-for="ques in item.question">
          <h2><a href="#" v-link="{name:'question',params:{questionId:ques.questionId}}">{{ques.questionTitle}}</a></h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GlobleHeader from './../components/GlobleHeader'
  import cookie from './../assets/scripts/cookie.js'

  module.exports = {
    data: function () {
      return {
        item: []
      }
    },
    methods: {
    },
    components: {
      GlobleHeader
    },
    ready: function () {
      var self = this
      var account = cookie.getCookie('account')
      var userId = self.$route.params.userId
      console.log(account)
      Vue.http.get('/api/getUser?user=' + userId).then(function (response) {
        self.item = response.data
        console.log(self.item)
      }, function () {
      })
    }
  }
</script>
