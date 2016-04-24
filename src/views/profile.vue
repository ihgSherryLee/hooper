<style lang="less">
  .profile-inner {
    border: 1px solid #ccc;
    border-radius: 2px;
    .profile-item {
      padding: 24px 12px;
      border-bottom: 1px solid #ccc;
      clear: both;
      .item-title {
        position: absolute;
        display: inline-block;
        width: 100px;
        text-align: right;
      }
      .profile-item-content {
        padding-left: 140px;
        .profile-item-content-static {
          a {

          }
        }
        .input-wrap {
          input[type='text'],textarea {
            width: 270px;
            padding: 8px 10px;
          }
        }
        .btn-wrap {
          margin-top: 10px;
          button {
            width: 50px;
            height: 30px;
            border: none;
            border-radius: 3px;
            color: #fff;
            background: #a01212;
          }
        }
      }
    }
  }
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner profile-inner">
      <div class="profile-item">编辑个人资料</div>
      <div class="profile-item">
        <span class="item-title">头像</span>
        <div class="profile-item-content">
          <img src="">
        </div>
      </div>
      <div class="profile-item">
        <span class="item-title">性别</span>
        <div class="profile-item-content">
          <div v-show="!show.gender" class="profile-item-content-static">{{gender}}&nbsp;&nbsp;<a @click="showEdit('gender')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改</a></div>
          <div v-else class="profile-item-content-edit">
            <div class="input-wrap">
              <input type="radio" name="gender">男
              <input type="radio" name="gender">女
            </div>
            <div class="btn-wrap">
              <button class="save-btn" @click="save('gender')">保存</button>
              <button class="cancel0btn" @click="cancel('gender')">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-item">
        <span class="item-title">一句话介绍</span>
        <div class="profile-item-content">
          <div v-show="!show.headline" class="profile-item-content-static">{{headline}}&nbsp;&nbsp;<a @click="showEdit('headline')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改</a></div>

          <div v-else class="profile-item-content-edit">
            <div class="input-wrap">
              <input value="{{headline}}" v-model="change.headline" type="text" name="headline">
            </div>
            <div class="btn-wrap">
              <button class="save-btn" @click="save('headline')">保存</button>
              <button class="cancel0btn" @click="cancel('headline')">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-item">
        <span class="item-title">个人简介</span>
        <div class="profile-item-content">
          <div v-show="!show.description" class="profile-item-content-static">{{description}}<a @click="showEdit('description')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 填写</a></div>
          <div v-else class="profile-item-content-edit">
            <div class="input-wrap">
              <textarea value="{{description}}" v-model="change.description" name="descrition"></textarea>
            </div>
            <div class="btn-wrap">
              <button class="save-btn" @click="save('description')">保存</button>
              <button class="cancel0btn" @click="cancel('description')">取消</button>
            </div>
          </div>
        </div>
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
        userName: '',
        userImg: '',
        gender: '',
        headline: '',
        description: '',
        change: {
          gender: '',
          headline: '',
          description: ''
        },
        show: {
          gender: false,
          headline: false,
          description: false
        }
      }
    },
    methods: {
      showEdit: function (val) {
        var self = this
        self.show[val] = true
      },
      save: function (val) {
        var self = this
        var data = {}
        data.account = getCookie('account')
        data.key = val
        data.val = self.change[val]
        self[val] = self.change[val]
        Vue.http.post('/api/changeUserInfo', data).then(function (response) {
          if (!response.data.status) {
            window.alert('修改出现问题，请重新修改')
          }
        }, function () {
        })
        self.show[val] = false
      },
      cancel: function (val) {
        var self = this
        self.show[val] = false
      }
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
      Vue.http.post('/api/queryUser', data).then(function (response) {
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
