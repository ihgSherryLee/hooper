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
    .votebar {
      float: left;
      margin-left: -48px;
      width: 40px;
      .up {
        margin-top: 10px;
        width: 40px;
        border: none;
        border-radius: 2px;
        background: #eff6fa;
        span {
          width: 100%;
        }
      }
      .up:hover,.up.active {
        width: 40px;
        border: none;
        border-radius: 2px;
        background: #698ebf;
        color: #fff;
      }
    }
    .answer-deatail {
      line-height: 25px;
    }
    .feed-meta {
      margin-top: 10px;
      color: #999;
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
          <a v-link="{name:'topic',params:{topicId:item.topicId}}"><img :src="item.topicImg"></a>
        </div>
        <div class="feed-main">
          <div class="source">来自<a v-link="{name:'topic',params:{topicId:item.topicId}}">{{item.topicName}}</a></div>
          <div class="content">
            <h2><a href="#" v-link="{name:'question',params:{questionId:item.questionId}}">{{item.questionTitle}}</a></h2>
          </div>
          <div class="entry-body">
            <div class="votebar">
              <button @click="update($index, item.answerId, item.upAnswerId)" class="up" :class="{active: item.upAnswerId}" title="赞同"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>{{item.upNum}}</span></button>
            </div>
            <div class="answer-deatail">
              <div class="author">
                <a href="#" v-link="{name:'user',params:{userId:item.answererId}}">{{item.userName}}</a><span v-if="item.headline">,{{item.headline}}</span>
              </div>
              <div class="answer">
                {{{item.answerText}}}
              </div>
            </div>
            <div class="feed-meta">
              <div class="meta-panel">
                <span class="answer-date">发布于 {{item.date}}</span>
                <a v-if="!item.followQuestion" @click="followQuestion($index, item.questionId, item.followQuestion)" href="#">关注问题</a>
                <a v-else @click="followQuestion($index, item.questionId, item.followQuestion)" href="#">取消关注</a>
                <a href="#">收起</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="more">加载更多</button>
    </div>
  </div>
</template>

<script>
  import cookie from './../assets/scripts/cookie.js'

  module.exports = {
    data: function () {
      return {
        userId: '',
        items: []
      }
    },
    methods: {
      update: function (index, answerId, upAnswerId) {
        var self = this
        if (!upAnswerId) {
          Vue.http.get('/api/updateUp?user=' + self.userId + '&type=up&answerId=' + answerId + '&upNum=' + self.items[index].upNum).then(function (response) {
            self.items[index].upNum++
            self.items[index].upAnswerId = true
          }, function () {
          })
        } else {
          Vue.http.get('/api/updateUp?user=' + self.userId + '&type=down&answerId=' + answerId + '&upNum=' + self.items[index].upNum).then(function (response) {
            self.items[index].upNum--
            self.items[index].upAnswerId = false
          }, function () {
          })
        }
      },
      followQuestion: function (index, questionId, follow) {
        var self = this
        if (!follow) {
          Vue.http.get('/api/followQuestion?user=' + self.userId + '&type=follow&questionId=' + questionId).then(function (response) {
            self.items[index].followQuestion = 1
          }, function () {
          })
        } else {
          Vue.http.get('/api/followQuestion?user=' + self.userId + '&type=unfollow&questionId=' + questionId).then(function (response) {
            self.items[index].followQuestion = 0
          }, function () {
          })
        }
      }
    },
    ready: function () {
      var self = this
      var userId = cookie.getCookie('hpuserId')
      self.userId = userId
      Vue.http.get('/api/getIndex?user=' + userId).then(function (response) {
        self.items = response.data
      }, function () {
      })
    }
  }
</script>
