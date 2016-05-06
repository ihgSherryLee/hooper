<style lang="less">
  .user {
    .item {
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      .user-card {
        img {
          width: 50px;
          height: 50px;
          margin-right: 1em;
          border-radius: 4px;
        }
        .avator-link,.user-info {
          float: left;
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
          <li class="nav-tab active"><a v-link="{name:'search',params:{type:'content',keyword:$route.params.keyword}}">内容</a></li>
          <li class="nav-tab"><a v-link="{name:'search',params:{type:'user',keyword:keyword}}">用户</a></li>
          <li class="nav-tab"><a v-link="{name:'search',params:{type:'topic',keyword:keyword}}">话题</a></li>
        </ul>
      </div>
      <div v-if="$route.params.type === 'content'" class="list content" >
        <div class="item" v-for="item in items">
          <div class="feed-main">
            <h2><a href="#" v-link="{name:'question',params:{questionId:item.questionId}}">{{item.questionTitle}}</a></h2>
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
      <div v-if="$route.params.type === 'user'" class="list user">
        <div class="item" v-for="item in items">
          <div class="user-card clearfix">
            <a class="avator-link" href="#"><img src="" alt=""></a>
            <div class="user-info">
              <a class="name-link" href="#">{item.userName}}</a>
              <p>{item.userIntro}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$route.params.type === 'topic'" class="list topic">
        <div class="item" v-for="item in items">
          <a v-link="{name: 'topic', params: {topicId: item.topicId}}">
            <img src="{{item.topicImg}}" alt="">
            <strong>{{item.topicName}}</strong>
          </a>
          <p>{{item.description}}</p>
          <a v-if="!item.userId" class="follow" href="#" @click="follow($index,item.topicId)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>关注</a>
          <a v-else class="follow" href="#" @click="unfollow($index, item.topicId)">取消关注</a>
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
    components: {
      GlobleHeader
    },
    ready: function () {
      var self = this
      var type = self.$route.params.type
      var keyword = self.$route.params.keyword
      var account = cookie.getCookie('account')
      console.log(account)
      Vue.http.get('/api/search?user=10000&type=' + type + '&keyword=' + keyword).then(function (response) {
        self.items = response.data
        console.log(self.items)
      }, function () {
      })
    }
  }
</script>
