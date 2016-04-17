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
        <a class="active" @click="changeSignupTab">注册</a>
        <a @click="changeSigninTab">登录</a>
      </div>
    </div>
    <div class="view view-signup" :class="{'selected': signup}">
      <!-- <form class="signup-form"> -->
        <input type="text" class="form-control" name="fullname" v-model="fullname" placeholder="姓名">
        <input type="text" class="form-control" name="email" v-model="email" placeholder="邮箱">
        <input type="password" class="form-control" v-model="password" placeholder="密码（不少于6位数字）">
        <button class="sign-btn" @click="signUp">注册</button>
        <a v-link="{'path':'/index/questionList'}">aa</a>
      <!-- </form> -->
    </div>
    <div class="view view-signin" :class="{'selected': signin}">
      <!-- <form class="signin-form"> -->
        <input type="text" class="form-control" name="account" v-model="account" placeholder="手机号或邮箱">
        <input type="password" class="form-control" v-model="password" placeholder="密码">
        <button class="sign-btn submit" @click="signIn">登录</button>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
  import Vue from 'Vue'
  import VueResource from 'Vue-resource'
  Vue.use(VueResource)

  module.exports = {
    data: function () {
      return {
        signin: false,
        signup: true,
        fullname: '',
        email: '',
        password: '',
        account: ''
      }
    },
    methods: {
      changeSignupTab: function () {
        var self = this
        self.signup = true
        self.signin = false
      },
      changeSigninTab: function () {
        var self = this
        self.signin = true
        self.signup = false
      },
      signUp: function () {
        var self = this
        var data = {}
        data.fullname = self.fullname
        data.email = self.email
        data.password = self.password
        Vue.http.post('/api/signUp', data).then(function (response) {
          console.log(response)
        }, function () {

        })
      },
      signIn: function () {
        var self = this
        var data = {}
        data.account = self.account
        data.password = self.password
        console.log(data)
        Vue.http.post('/api/signIn', data).then(function (response) {
          console.log(response)
        }, function () {

        })
      }
    }
  }
</script>
