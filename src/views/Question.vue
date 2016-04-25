<style lang="less">
  .tag {
    .item-tag {
      padding: 1px 10px 0;
      border-radius: 30px;
      text-decoration: none;
      margin: 0 5px 5px 0;
      background: #eff6fa;
    }
  }
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="tag">
        <a v-for="item in tags" href="" class="item-tag">{{item.name}}</a>
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
        tags: [
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
