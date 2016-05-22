<style lang="less">
  .user-intro-card {
    padding: 10px;
    border: 1px solid #eee;
    img {
      float: left;
      width: 100px;
      height: 100px;
    }
    .user-info {
      float: left;
    }
    a {
      float: right;
      margin: 10px 10px 0 0;
      padding: 5px;
      border: none;
      border-radius: 4px;
      color: #3e5e00;
      background: #8ab923;
    }
    a:hover {
      text-decoration: none;
    }
  }
  .user-answer-list {
    padding: 10px;
    border: 1px solid #eee;
    .ans-content {
      padding-left: 50px;
    }
  }
  .user-question-list {
    padding: 10px;
    border: 1px solid #eee;
  }
  .user-friend-list {
    padding: 10px;
    border: 1px solid #eee;
    .friend-item {
      padding: 15px 0;
      border-top: 1px solid #eee;
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
      <div class="user-intro-card clearfix">
        <img v-if="!user.userImg" class="user-img" src="/static/uploads/icon/images.jpg">
        <img v-else class="user-img" src="{{user.userImg}}">
        <div class="user-info">
          {{user.userName}}
          <p>{{user.headline}}</p>
        </div>
        <template v-if="userId!=user.userId">
          <a href="#" v-if="!user.followFriend" @click="followUser(-1, user.userId, user.followFriend)">关注</a>
          <a href="#" v-else @click="followUser(-1, user.userId, user.followFriend)">取消关注</a>
        </template>
        <a v-link="{name:'profile',params:{userId:userId}}" v-if="userId==user.userId">完善资料</a>
      </div>
      <div class="user-friend-list friend-list" v-if="userId==user.userId">
        <h2>我关注的人</h2>
        <div class="friend-item" v-for="item in friend">
          <div class="user-card clearfix">
            <a class="avator-link" v-link="{name:'user',params:{userId:item.userId}}"><img v-if="!item.userImg" class="user-img" src="/static/uploads/icon/images.jpg">
            <img v-else class="user-img" :src="item.userImg"></a>
            <div class="user-info">
              <a class="name-link" v-link="{name:'user',params:{userId:item.userId}}">{{item.userName}}</a>
              <p>{{item.headline}}</p>
              <a v-if="!item.followFriend" class="follow" href="#" @click="followUser($index, item.friendId, item.followFriend)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>关注</a>
              <a v-else class="follow" href="#" @click="followUser($index, item.friendId, item.followFriend)">取消关注</a>
            </div>
          </div>
        </div>
      </div>
      <div class="user-answer-list question-list">
        <h2>{{user.userName}}的回答</h2>
        <div class="ans-content" v-for="ans in answer">
          <h2><a href="#" v-link="{name:'question',params:{questionId:ans.questionId}}">{{ans.questionTitle}}</a></h2>
          <div class="entry-body">
            <div class="votebar">
              <button @click="update( $index, ans.answerId, ans.upAnswerId)" class="up" :class="{active: ans.upAnswerId}" title="赞同"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span>{{ans.upNum}}</span></button>
            </div>
            <div class="answer">
              {{{ans.answerText}}}
            </div>
            <div class="feed-meta">
              <div class="meta-panel">
                <span class="answer-date">发布于 {{ans.date}}</span>
                <a href="#" class="follow" v-if="!ans.followQuestion" @click="followQuestion($index, ans.questionId, ans.followQuestion)">关注问题</a>
                <a href="#" class="cancel" v-else @click="followQuestion($index, ans.questionId, ans.followQuestion)">取消关注</a>
                <a href="#">收起</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="user-question-list question-list">
        <h2>{{user.userName}}的提问</h2>
        <div class="answer-item" v-for="ques in question">
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
        userId: '',
        user: {},
        friend: [],
        question: [],
        answer: []
      }
    },
    methods: {
      followUser: function (index, friendId, follow) {
        var self = this
        console.log(follow)
        if (!follow) {
          Vue.http.get('/api/followUser?type=follow&user=' + self.userId + '&friendId=' + friendId).then(function (response) {
            console.log(response.data)
            if (index === -1) {
              self.user.followFriend = 1
            } else {
              self.friend[index].followFriend = 1
            }
          }, function () {
          })
        } else {
          Vue.http.get('/api/followUser?type=unfollow&user=' + self.userId + '&friendId=' + friendId).then(function (response) {
            console.log(response.data)
            if (index === -1) {
              self.user.followFriend = 0
            } else {
              self.friend[index].followFriend = 0
            }
          }, function () {
          })
        }
      },
      followQuestion: function (index, questionId, follow) {
        var self = this
        console.log(follow)
        if (!follow) {
          Vue.http.get('/api/followQuestion?user=' + self.userId + '&type=follow&questionId=' + questionId).then(function (response) {
            self.answer[index].followQuestion = 1
          }, function () {
          })
        } else {
          Vue.http.get('/api/followQuestion?user=' + self.userId + '&type=unfollow&questionId=' + questionId).then(function (response) {
            self.answer[index].followQuestion = 0
          }, function () {
          })
        }
      },
      update: function (index, answerId, upAnswerId) {
        var self = this
        if (!upAnswerId) {
          Vue.http.get('/api/updateUp?user=' + self.userId + '&type=up&answerId=' + answerId + '&upNum=' + self.answer[index].upNum).then(function (response) {
            self.answer[index].upNum++
            self.answer[index].upAnswerId = true
          }, function () {
          })
        } else {
          Vue.http.get('/api/updateUp?user=' + self.userId + '&type=down&answerId=' + answerId + '&upNum=' + self.answer[index].upNum).then(function (response) {
            self.answer[index].upNum--
            self.answer[index].upAnswerId = false
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
    //   var account = cookie.getCookie('account')
    //   var userId = self.$route.params.userId
    //   console.log(account)
    //   Vue.http.get('/api/getUser?user=' + userId).then(function (response) {
    //     self.item = response.data
    //     console.log(self.item)
    //   }, function () {
    //   })
    // },
    route: {
      data: function (transition) {
        var self = this
        var user = cookie.getCookie('hpuserId')
        self.userId = user
        Vue.http.get('/api/getUser?user=' + self.$route.params.userId + '&me=' + user).then(function (response) {
          self.user = response.data.user[0]
          self.friend = response.data.friend
          self.question = response.data.question
          self.answer = response.data.answer
          console.log(self.user)
          console.log(self.userId)
        }, function () {
        })
      }
    }
  }
</script>
