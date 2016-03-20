<style lang="less">
  .wrap {
    margin: auto;
    width: 960px;
    height: 45px;
    line-height: 45px;
  }
  .navbar-header {
    margin: 8px;
  }
  .navbar-form {
    float: left;
  }
</style>

<template>
  <nav class="navbar navbar-default" role="navigation">
    <div class="wrap">
      <div class="navbar-header">HOOPER</div>
      <div>
        <form action="" class="navbar-form" role="search">
          <input type="text" class="form-control" placeholder="搜索话题、人"></input>
          <button type="submit" class="btn btn-default">搜索</button>
        </form>
        <ul class="nav navbar-nav">
          <li><a href="#">首页</a></li>
          <li><a href="#">话题</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <header class="globle-header">
    <div class="wrap">
      <div class="profile">
        <a href="#" class="user-info">
          <span class="user-name">XXX</span>
          <img class="user-img" src="">
        </a>
        <ul class="nav-dropdown">
          <li class="nav-dropdown-li"><a href="#">我的主页</a></li>
          <li class="nav-dropdown-li"><a href="#">退出</a></li>
        </ul>
      </div>
    </div>
  </header>
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
