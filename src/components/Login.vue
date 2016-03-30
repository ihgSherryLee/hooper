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
  .view-signup,.view-signin {
    display: none;
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
  .selected {
    display: block;
  }
</style>

<template>
  <div class="wrap">
    <div class="title">HOOPER</div>
    <div class="tab-nav">
      <div class="nav-slide">
        <a href="#singup" class="active" @click="changeTab('signup')">注册</a>
        <a href="#singin" @click="changeTab('signin')">登录</a>
      </div>
    </div>
    <div class="view view-signup" :class="select == 'signup' ? selected : ''">
      <form class="signup-form">
        <input type="text" class="form-control" name="fullname" placeholder="姓名">
        <input type="text" class="form-control" name="email" placeholder="邮箱">
        <input type="password" class="form-control" placeholder="密码（不少于6位数字）">
        <button class="sign-btn submit" type="submit">注册</button>
      </form>
    </div>
    <div class="view view-signin" v-bind:class="select === 'signin' ? selected : ''">
      <form class="signin-form">
        <input type="text" class="form-control" name="account" placeholder="手机号或邮箱">
        <input type="password" class="form-control" placeholder="密码">
        <button class="sign-btn submit" type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        select: ''
      }
    },
    methods: {
      changeTab: function (tab) {
        var self = this
        self.select = tab
        console.log(tab)
      }
    }
  }
</script>
