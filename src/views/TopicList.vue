<style lang="less">
  .topic-title {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .topic-cat {
    padding: 10px 0 8px 0;
    li {
      float: left;
      margin: 0 10px 10px 0;
      list-style: none;
    }
    .topic-cat-item a {
      display: block;
      padding: 0 10px;
      border-radius: 30px;
      border: 1px solid #daecf5;
      text-decoration: none;
    }
  }
  .topic-list {
    .topic-item {
      position: relative;
      float: left;
      width: 50%;
      padding: 18px 15px 18px 60px;
      border-top: 1px dotted #eee;
      img {
        position: absolute;
        left: 0;
        width: 50px;
        height: 50px;
        border-radius: 3px;
      }
      p {
        height: 40px;
        overflow: hidden;
      }
      .follow {
        position: absolute;
        top: 18px;
        right: 15px;
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="topic-title">话题广场</div>
      <div class="topic-cat">
        <ul class="clearfix">
          <li class="topic-cat-item" v-for="item in topicCats"><a href="#{{item.topicCat}}" @click="showTopic(item.topicCat)">{{item.topicCat}}</a></li>
        </ul>
      </div>
      <div class="topic-list">
        <div class="topic-item" v-for="item in topics">
          <a v-link="{name: 'topic', params: {topicId: item.topicId}}">
            <img :src="item.topicImg" alt="">
            <strong>{{item.topicName}}</strong>
          </a>
          <p>{{item.description}}</p>
          <a v-if="!item.followTopic" class="follow" href="#" @click="followTopic($index,item.topicId,item.followTopic)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>关注</a>
          <a v-else class="follow" href="#" @click="followTopic($index, item.topicId,item.followTopic)">取消关注</a>
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
        topicCats: [],
        topics: []
      }
    },
    methods: {
      followTopic: function (index, topicId, follow) {
        var self = this
        var user = self.userId
        if (!follow) {
          Vue.http.get('/api/followTopic?user=' + user + '&type=follow&topicId=' + topicId).then(function (response) {
            self.topics[index].followTopic = 1
          }, function () {
          })
        } else {
          Vue.http.get('/api/followTopic?user=' + user + '&type=unfollow&topicId=' + topicId).then(function (response) {
            self.topics[index].followTopic = 0
          }, function () {
          })
        }
      },
      showTopic: function (topicCat) {
        var self = this
        Vue.http.get('/api/getTopic?user=' + self.userId + '&topicCat=' + topicCat).then(function (response) {
          self.topics = response.data
        }, function () {
        })
      }
    },
    components: {
      GlobleHeader
    },
    ready: function () {
      var self = this
      var userId = cookie.getCookie('userId')
      self.userId = userId
      Vue.http.get('/api/getTopicCat').then(function (response) {
        self.topicCats = response.data
      }, function () {
      })
      self.showTopic('篮球')
    }
  }
</script>
