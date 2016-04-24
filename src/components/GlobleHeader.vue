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
          <button type="submit" class="btn btn-default">搜索</button>
        </form>
        <ul class="nav navbar-nav">
          <li><a href="#" class="navbar-nav-li">首页</a></li>
          <li><a href="#" class="navbar-nav-li">话题</a></li>
        </ul>
      </div>
      <div class="dropdown profile">
        <a href="#" class="user-info">
          <span class="user-name">{{user}}</span>
          <img class="user-img" src="{{userImg}}">
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
  Vue.use(VueResource)

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
  export default {
    data: function () {
      return {
        user: '',
        userImg: ''
      }
    },
    ready: function () {
      var self = this
      var account = getCookie('account')
      var data = {}
      data.account = account
      console.log(account)
      Vue.http.post('/api/queryUser', data).then(function (response) {
        self.user = response.data.name
        self.userImg = response.data.img
        console.log(response.data)
      }, function () {
      })
    }
  }
</script>
