<style lang="less">
  .wrap {
    margin: auto;
    width: 960px;
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
    <div class="wrap">
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
          <span class="user-name">XXX</span>
          <img class="user-img" src="">
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
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>
