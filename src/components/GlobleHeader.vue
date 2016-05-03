<style lang="less">
  .nav-wrap {
    margin: auto;
    width: 960px;
  }
  .navbar {
    height: 63px;
    line-height: 45px;
  }
  .navbar-header {
    margin: 8px;
    font-size: 18px;
  }
  .navbar-form {
    float: left;
  }
  .sidebar-nav {
    padding: 9px 0;
  }
  .navbar-nav-li {
    height: 63px;
    line-height: 63px;
  }
  .profile {
    float: right;
    height: 63px;
    width: 160px;
    line-height: 63px;
  }
  .profile:hover {
    visibility: visible;
  }
  .user-info {
    height: 45px;
    margin: 8px;
    img {
      height: 45px;
      height: 45px;
    }
  }
.dropdown-menu .sub-menu {
    left: 100%;
    position: absolute;
    top: 0;
    visibility: hidden;
    margin-top: -1px;
}
.dropdown-menu {
  margin-top: 0;
}
.dropdown-menu li:hover .sub-menu {
    visibility: visible;
}

.dropdown:hover .dropdown-menu {
    display: block;
}
</style>

<template>
  <nav class="navbar navbar-default" role="navigation">
    <div class="nav-wrap">
      <div class="navbar-header">HOOPER</div>
      <div>
        <form action="" class="navbar-form" role="search">
          <input type="text" class="form-control" placeholder="搜索话题、人">
          <button @click="submit" class="btn btn-default">搜索</button>
        </form>
        <ul class="nav navbar-nav">
          <li><a v-link="{path: 'index'}" class="navbar-nav-li">首页</a></li>
          <li><a href="#" v-link="{path:'topicList'}"class="navbar-nav-li">话题</a></li>
        </ul>
      </div>
      <div class="dropdown profile">
        <a href="#" class="user-info">
          <span class="user-name">{{user.userName}}</span>
          <img v-if="!user.userImg" class="user-img" src="/static/uploads/photos/images.jpg">
          <img v-else class="user-img" src="{{user.userImg}}">
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">我的主页</a></li>
          <li><a href="#">退出</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import Vue from 'Vue'
  import VueResource from 'Vue-resource'
  // import cookie from './../assets/scripts/cookie.js'
  Vue.use(VueResource)

  export default {
    data: function () {
      return {
        user: {}
      }
    },
    methods: {
      submit: function () {
      }
    },
    ready: function () {
      // var self = this
      // var account = cookie.getCookie('account')
      // var data = {}
      // data.account = 10000
      // console.log(account)
      // Vue.http.get('/api/queryUser?user=' + account).then(function (response) {
      //   self.user = response.data
      //   console.log(response.data)
      // }, function () {
      // })
    }
  }
</script>
