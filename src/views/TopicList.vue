<style lang="less">
  .topic-title {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .topic-cat {
    padding: 10px 0 8px 0;
    clear: both;
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
        <ul>
          <li class="topic-cat-item" v-for="item in topicCats"><a @click="showTopic(item.topicCat)">{{item.topicCat}}</a></li>
        </ul>
      </div>
      <div class="topic-list">
        <div class="topic-item" v-for="item in topics">
          <a v-link="{name: 'topic', params: {topicId: item.Id}}">
            <img src="" alt="">
            <strong>{{item.topicName}}</strong>
          </a>
          <p>{{item.description}}</p>
          <a v-if="!item.followed" class="follow" href="" @click="unfollow"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>关注</a>
          <a v-else class="follow" href="">取消关注</a>
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
        topicCats: [],
        topics: []
      }
    },
    methods: {
      follow: function () {
      },
      unfollow: function () {
      },
      showTopic: function (topicCat) {
        var self = this
        var data = {}
        data.topicCat = topicCat
        Vue.http.post('/api/getTopic', data).then(function (response) {
          console.log(response.data)
          self.topics = response.data.data
        }, function () {
        })
      }
    },
    components: {
      GlobleHeader
    },
    ready: function () {
      var self = this
      var account = cookie.getCookie('account')
      var data = {}
      data.account = account
      console.log(account)
      Vue.http.get('/api/getTopicCat').then(function (response) {
        console.log(response.data)
        self.topicCats = response.data.data
      }, function () {
      })
      self.showTopic('篮球')
    }
  }
</script>
