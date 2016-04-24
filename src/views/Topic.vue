<style lang="less">
  .topic-cat {
    padding: 10px 0 8px 0;
  }
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <div class="topic-title">话题广场</div>
      <div class="topic-cat">
        <ul>
          <li class="topic-cat-item" v-for="item in items">{{item.name}}</li>
        </ul>
      </div>
      <div class="topic-list">
        
      </div>
    </div>
  </div>
</template>

<script>
  import GlobleHeader from './../components/GlobleHeader'
  import './../assets/scripts/cookie.js'
  function getCookie (name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(name + '=')
      var c_end
      if (c_start !== -1) {
        c_start = c_start + name.length + 1
        c_end = document.cookie.indexOf(';', c_start)
        if (c_end === -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ''
  }

  module.exports = {
    data: function () {
      return {
        items: [
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
        ]
      }
    },
    methods: {
    },
    components: {
      GlobleHeader
    },
    ready: function () {
      var self = this
      var account = getCookie('account')
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
