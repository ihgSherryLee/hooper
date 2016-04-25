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
        <ul>
          <li class="topic-cat-item" v-for="item in topicCats"><a href="">{{item.name}}</a></li>
        </ul>
      </div>
      <div class="topic-list">
        <div class="topic-item" v-for="item in topics">
          <a v-link="{name: 'topic', params: {topicId: item.Id}}">
            <img src="" alt="">
            <strong>{{item.name}}</strong>
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
        topicCats: [
          {
            name: '体育'
          },
          {
            name: '体育'
          },
          {
            name: '体育'
          },
          {
            name: '体育'
          },
          {
            name: '体育'
          },
          {
            name: '体育'
          }
        ],
        topics: [
          {
            Id: 111,
            name: '体育',
            description: '111',
            followed: true
          },
          {
            Id: 111,
            name: '体育',
            description: '111',
            followed: true
          },
          {
            Id: 111,
            name: '体育',
            description: '111',
            followed: true
          },
          {
            Id: 111,
            name: '体育',
            description: '111',
            followed: true
          },
          {
            Id: 111,
            name: '体育',
            description: '111',
            followed: true
          },
          {
            Id: 111,
            name: '体育',
            description: '111',
            followed: false
          }
        ]
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
      var data = {}
      data.account = account
      console.log(account)
      Vue.http.post('/api/getAllTopic', data).then(function (response) {
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
