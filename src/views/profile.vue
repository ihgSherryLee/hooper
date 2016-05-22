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
      .img {
        img {
          width: 100px;
          height: 100px;
        }
        input {
          display: none;
        }
      }
      .profile-item-content {
        padding-left: 140px;
        .profile-item-content-static {
          a:hover {
            text-decoration: none;
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
          }
          .save-btn {
            color: #fff;
            background: #0e7bef;
          }
          .cancel-btn {
            color: #3e5e00;
            background: #eee;
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
        <div class="profile-item-content img">
          <a @click="selectImg" href="#"><img v-if="!user.userImg" class="user-img" src="/static/uploads/icon/images.jpg">
          <img v-else class="user-img" :src="user.userImg"></a>
          <input @click="selectImg" type="file" name="photo" />
          <a @click="uploadImg" href="#">确定</a>
        </div>
      </div>
      <div class="profile-item">
        <span class="item-title">用户名</span>
        <div class="profile-item-content">
          <div v-show="!show.userName" class="profile-item-content-static">{{user.userName}}&nbsp;&nbsp;<a href="#" @click="showEdit('userName')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改</a></div>

          <div v-else class="profile-item-content-edit">
            <div class="input-wrap">
              <input value="{{user.userName}}" v-model="change.userName" type="text" name="userName">
            </div>
            <div class="btn-wrap">
              <button class="save-btn" @click="save('userName')">保存</button>
              <button class="cancel-btn" @click="cancel('userName')">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-item">
        <span class="item-title">密码</span>
        <div class="profile-item-content">
          <div v-show="!show.password" class="profile-item-content-static">{{user.password}}&nbsp;&nbsp;<a href="#" @click="showEdit('password')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改</a></div>

          <div v-else class="profile-item-content-edit">
            <div class="input-wrap">
              <input value="{{user.password}}" v-model="change.password" type="text" name="password">
            </div>
            <div class="btn-wrap">
              <button class="save-btn" @click="save('password')">保存</button>
              <button class="cancel-btn" @click="cancel('password')">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-item">
        <span class="item-title">性别</span>
        <div class="profile-item-content">
          <div v-show="!show.gender" class="profile-item-content-static">{{user.gender}}&nbsp;&nbsp;<a href="#" @click="showEdit('gender')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改</a></div>
          <div v-else class="profile-item-content-edit">
            <div class="input-wrap">
              <input type="radio" name="gender" value="男" v-model="change.gender">男
              <input type="radio" name="gender" value="女" v-model="change.gender">女
            </div>
            <div class="btn-wrap">
              <button class="save-btn" @click="save('gender')">保存</button>
              <button class="cancel-btn" @click="cancel('gender')">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-item">
        <span class="item-title">一句话介绍</span>
        <div class="profile-item-content">
          <div v-show="!show.headline" class="profile-item-content-static">{{user.headline}}&nbsp;&nbsp;<a href="#" @click="showEdit('headline')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改</a></div>

          <div v-else class="profile-item-content-edit">
            <div class="input-wrap">
              <input value="{{headline}}" v-model="change.headline" type="text" name="headline">
            </div>
            <div class="btn-wrap">
              <button class="save-btn" @click="save('headline')">保存</button>
              <button class="cancel-btn" @click="cancel('headline')">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-item">
        <span class="item-title">个人简介</span>
        <div class="profile-item-content">
          <div v-show="!show.description" class="profile-item-content-static">{{user.description}}<a href="#" @click="showEdit('description')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改</a></div>
          <div v-else class="profile-item-content-edit">
            <div class="input-wrap">
              <textarea value="{{description}}" v-model="change.description" name="descrition"></textarea>
            </div>
            <div class="btn-wrap">
              <button class="save-btn" @click="save('description')">保存</button>
              <button class="cancel-btn" @click="cancel('description')">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GlobleHeader from './../components/GlobleHeader'
  import cookie from './../assets/scripts/cookie.js'

  module.exports = {
    data: function () {
      return {
        userId: '',
        user: {},
        change: {
          userName: '',
          password: '',
          gender: '',
          headline: '',
          description: ''
        },
        show: {
          userName: false,
          password: false,
          gender: false,
          headline: false,
          description: false
        }
      }
    },
    methods: {
      selectImg: function () {
        $('input[type=file]').click()
      },
      uploadImg: function () {
        var self = this
        var data = new FormData()
        data.append('icon', $('input[type=file]')[0].files[0])
        console.log(data)
        Vue.http.post('/api/uploadIcon?user=' + self.userId, data, {emulateJson: true}).then(function (response) {
          console.log(response)
          $('.img img').attr('src', response.data)
        }, function () {
        })
      },
      showEdit: function (val) {
        var self = this
        self.show[val] = true
      },
      save: function (val) {
        var self = this
        var data = {}
        data.user = self.userId
        data.key = val
        data.val = self.change[val]
        self[val] = self.change[val]
        Vue.http.post('/api/changeUserInfo', data).then(function (response) {
          if (!response.data.status) {
            window.alert('修改出现问题，请重新修改')
          } else {
            if (val === 'password') {
              cookie.setCookie('hppassword', self.change[val], 7)
            }
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
      var user = cookie.getCookie('hpuserId')
      self.userId = user
      if (user !== self.$route.params.userId) {
        self.$route.go({
          name: 'profile',
          params: {
            userId: user
          }
        })
      } else {
        Vue.http.get('/api/queryUser?user=' + user).then(function (response) {
          console.log(response.data)
          self.user = response.data
          self.change = self.user
        }, function () {
        })
      }
    }
  }
</script>
