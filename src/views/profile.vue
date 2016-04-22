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
              <button>保存</button>
              <button>取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-item">
        <span class="item-title">一句话介绍</span>
        <div class="profile-item-content">
          <div v-show="!show.headline" class="profile-item-content-static">{{headline}}&nbsp;&nbsp;<a><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改</a></div>

          <div v-else class="profile-item-content-edit">
            <input type="text" name="headline">
          </div>
        </div>
      </div>
      <div class="profile-item">
        <span class="item-title">个人简介</span>
        <div class="profile-item-content">
          <div v-show="!show.description" class="profile-item-content-static">{{description}}<a><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 填写</a></div>
          <div v-else class="profile-item-content-edit">
            <textarea name="descrition"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GlobleHeader from './../components/GlobleHeader'

  // function getCookie (name) {
  //   if (document.cookie.length > 0) {
  //     var c_start = document.cookie.indexOf(name + '=')
  //     var c_end
  //     if (c_start !== -1) {
  //       c_start = c_start + name.length + 1
  //       c_end = document.cookie.indexOf(';', c_start)
  //       if (c_end === -1) c_end = document.cookie.length
  //       return unescape(document.cookie.substring(c_start, c_end))
  //     }
  //   }
  //   return ''
  // }

  module.exports = {
    data: function () {
      return {
        userImg: '',
        gender: '女',
        headline: '111',
        description: '1111',
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
      }
    },
    components: {
      GlobleHeader
    }
  }
</script>
