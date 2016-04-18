<style lang="less">
  .wrap {
    margin: auto;
    padding: 40px 0;
    width: 300px;
  }
  .title {
    width: 300px;
    font-size: 40px;
    text-align: center;
  }
  .tab-nav {
    margin-bottom: 10px;
    width: 300px;
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
    width: 450px;
    input {
      padding: 20px;
      line-height: 19px;
      border: none;
      border-radius: 0;
    }
    .sign-btn {
      margin-top: 20px;
      width: 300px;
      line-height: 41px;
      border: none;
      border-radius: 3px;
      background: rgba(204,91,91,0.4);
    }
  }
  .selected {
    display: block;
  }
  .input {
    display: inline-block;
    width: 300px;
  }
  .tip {
    margin-left: 10px;
    font-size: 12px;
    color: #fc6161;
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
        <input type="text" class="form-control input" name="fullname" v-model="fullname" @blur="checkFullname" placeholder="姓名"><span class="tip">{{tips.fullname}}</span>
        <input type="text" class="form-control input" name="email" v-model="email" @blur="checkEmail" placeholder="邮箱"><span class="tip">{{tips.email}}</span>
        <input type="password" class="form-control input" v-model="password" placeholder="密码（不少于6位数字）"><span class="tip">{{tips.password}}</span>
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
  import VueRouter from 'vue-router'
  import VueResource from 'Vue-resource'
  Vue.use(VueRouter)
  Vue.use(VueResource)

  var router = new VueRouter()

  module.exports = {
    data: function () {
      return {
        signin: false,
        signup: true,
        fullname: '',
        email: '',
        password: '',
        account: '',
        tips: {
          fullname: '姓名不能为空',
          email: '邮箱不能为空'
        }
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
      checkFullname: function () {
        var self = this
        if (!self.fullname) {
          self.tips.fullname = '姓名不能为空'
        } else if (self.fullname.length < 4) {
          self.tips.fullname = '请输入多于4个字符'
        } else {
          self.tips.fullname = ''
        }
      },
      checkEmail: function () {
        var self = this
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!self.email) {
          self.tips.email = '邮箱不能为空'
        } else if (!reg.test(self.email)) {
          self.tips.email = '请输入正确格式的邮箱'
        } else {
          self.tips.email = ''
        }
      },
      checkPassword: function () {
        var self = this
        var reg = /^[a-zA-Z]\w{5,15}$/
        if (!self.password) {
          self.tips.email = '密码不能为空'
        } else if (!reg.test(self.email)) {
          self.tips.email = '请输入正确格式的邮箱'
        } else {
          self.tips.email = ''
        }
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
          if (!response.data.status) {
            window.alert(response.data.tips)
          } else {
            router.go('/index')
          }
          console.log(response)
        }, function () {

        })
      }
    }
  }
</script>
