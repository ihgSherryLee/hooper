<style lang="less" scope>
  .list {
    margin-top: 15px;
  }
  .ans-content {
    .item {
      padding: 15px 0;
      border-bottom: 1px solid #eee;
    }
  }
  .user {
    .item {
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      .user-card {
        position: relative;
        img {
          width: 50px;
          height: 50px;
          margin-right: 1em;
          border-radius: 4px;
        }
        .avator-link,.user-info {
          float: left;
        }
        .me,.follow {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="search-tab nav">
        <ul class="nav nav-tabs">
          <li class="nav-tab" :class="{'active':$route.params.type==='content'}"><a v-link="{name:'search',params:{type:'content',keyword:$route.params.keyword}}">内容</a></li>
          <li class="nav-tab" :class="{'active':$route.params.type==='user'}"><a v-link="{name:'search',params:{type:'user',keyword:$route.params.keyword}}">用户</a></li>
          <li class="nav-tab" :class="{'active':$route.params.type==='topic'}"><a v-link="{name:'search',params:{type:'topic',keyword:$route.params.keyword}}">话题</a></li>
        </ul>
      </div>
      <div v-if="$route.params.type === 'content'" class="list ans-content">
        <div class="item" v-for="item in items">
          <div class="feed-main">
            <h2><a href="#" v-link="{name:'question',params:{questionId:item.questionId}}">{{item.questionTitle}}</a></h2>
            <div class="entry-body">
              <div class="votebar">
                <button @click="update($index, item.answerId, item.upAnswerId)" class="up" :class="{active: item.upAnswerId}" title="赞同"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>{{item.upNum}}</span></button>
              </div>
              <div class="answer-deatail">
                <div class="author">
                  <a v-link="{name:'user',params:{userId:item.answererId}}">{{item.userName}}</a><span v-if="item.headline">,{{item.headline}}</span>
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
      </div>
      <div v-if="$route.params.type === 'user'" class="list user">
        <div class="item" v-for="item in items">
          <div class="user-card clearfix">
            <a class="avator-link" v-link="{name:'user',params:{userId:item.userId}}"><img v-if="!item.userImg" class="user-img" src="/static/uploads/icon/images.jpg">
            <img v-else class="user-img" :src="item.userImg"></a>
            <div class="user-info">
              <a class="name-link" v-link="{name:'user',params:{userId:item.userId}}">{{item.userName}}</a>
              <p>{{item.headline}}</p>
              <a v-if="userId!=item.userId&&!item.followFriend" class="follow" href="#" @click="followUser($index,item.userId, item.followFriend)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>关注</a>
              <a v-if="userId!=item.userId&&item.followFriend" class="follow" href="#" @click="followUser($index, item.userId, item.followFriend)">取消关注</a>
              <span class="me" v-if="userId==item.userId">我自己</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$route.params.type === 'topic'" class="list topic-list clearfix">
        <div class="topic-item" v-for="item in items">
          <a v-link="{name: 'topic', params: {topicId: item.topicId}}">
            <img src="{{item.topicImg}}" alt="">
            <strong>{{item.topicName}}</strong>
          </a>
          <p>{{item.description}}</p>
          <a v-if="!item.followTopic" class="follow" href="#" @click="followTopic($index,item.topicId, item.followTopic)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>关注</a>
          <a v-else class="follow" href="#" @click="followTopic($index, item.topicId, item.followTopic)">取消关注</a>
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
            console.log(self.items)
          }, function () {
          })
        } else {
          Vue.http.get('/api/followQuestion?user=' + self.userId + '&type=unfollow&questionId=' + questionId).then(function (response) {
            self.items[index].followQuestion = 0
            console.log(self.items)
          }, function () {
          })
        }
      },
      followTopic: function (index, topicId, follow) {
        var self = this
        var user = self.userId
        if (!follow) {
          Vue.http.get('/api/followTopic?user=' + user + '&type=follow&topicId=' + topicId).then(function (response) {
            self.items[index].followTopic = 1
          }, function () {
          })
        } else {
          Vue.http.get('/api/followTopic?user=' + user + '&type=unfollow&topicId=' + topicId).then(function (response) {
            self.items[index].followTopic = 0
          }, function () {
          })
        }
      },
      followUser: function (index, friendId, follow) {
        var self = this
        console.log(follow)
        if (!follow) {
          Vue.http.get('/api/followUser?type=follow&user=' + self.userId + '&friendId=' + friendId).then(function (response) {
            console.log(response.data)
            self.items[index].followFriend = 1
          }, function () {
          })
        } else {
          Vue.http.get('/api/followUser?type=unfollow&user=' + self.userId + '&friendId=' + friendId).then(function (response) {
            console.log(response.data)
            self.items[index].followFriend = 0
          }, function () {
          })
        }
      }
    },
    components: {
      GlobleHeader
    },
    // ready: function () {
    //   var self = this
    //   var type = self.$route.params.type
    //   var keyword = self.$route.params.keyword
    //   // var account = cookie.getCookie('account')
    //   window.alert(type)
    //   Vue.http.get('/api/search?user=10000&type=' + type + '&keyword=' + keyword).then(function (response) {
    //     self.items = response.data
    //     console.log(self.items)
    //   }, function () {
    //   })
    // },
    route: {
      data: function (transition) {
        var self = this
        var type = self.$route.params.type
        var keyword = self.$route.params.keyword
        var user = cookie.getCookie('hpuserId')
        self.userId = user
        console.log(self.userId)
        Vue.http.get('/api/search?user=' + user + '&type=' + type + '&keyword=' + keyword).then(function (response) {
          self.items = response.data
          console.log(self.items)
        }, function () {
        })
      }
    }
  }
</script>
