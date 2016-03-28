<style lang="less">
  .wrap {
    margin: auto;
    padding: 40px 0;
    width: 300px;
  }
  .title {
    font-size: 40px;
    text-align: center;
  }
  .tab-nav {
    margin-bottom: 10px;
    font-size: 18px;
    text-align: center;
    .nav-slide a {
      display: inline-block;
      width: 4em;
      line-height: 35px;
    }
  }
  .view-signup {
    input {
      padding: 20px;
      line-height: 19px;
      border: none;
      border-radius: 0;
    }
    .sign-btn {
      margin-top: 20px;
      width: 100%;
      line-height: 41px;
      border: none;
      border-radius: 3px;
      background: rgba(204,91,91,0.4);
    }
  }
</style>

<template>
  <div class="wrap">
    <div class="title">HOOPER</div>
    <div class="tab-nav">
      <div class="nav-slide">
        <a href="#singup" class="active">注册</a>
        <a href="#singin">登录</a>
      </div>
    </div>
    <div class="view view-signup selected">
      <form class="signup-form">
        <input type="text" class="form-control" name="fullname" placeholder="姓名">
        <input type="text" class="form-control" name="email" placeholder="邮箱">
        <input type="password" class="form-control" placeholder="密码（不少于6位数字）">
        <button class="sign-btn submit" type="submit">注册</button>
      </form>
    </div>
  </div>
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
