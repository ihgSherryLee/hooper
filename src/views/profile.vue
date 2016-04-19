<style lang="less">
  .profile-inner {
    border: 1px solid #ccc;
    border-radius: 2px;
    .profile-form {
      padding: 24px 12px;
      border-bottom: 1px solid #ccc;
      clear: both;
      .profile-item-content {
        float: left;
      }
    }
  }
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner profile-inner">
      <div class="profile-form">编辑个人资料</div>
      <div class="profile-form">
        <div class="profile-item">
          <span>头像</span>
          <div class="profile-item-content">
            <img src="">
          </div>
        </div>
      </div>
      <div class="profile-form">
        <div class="profile-item">
          <span>性别</span>
          <div class="profile-item-content">
            <div class="profile-item-content-static">填写</div>
            <div class="profile-item-content-edit">
              <input type="radio" name="gender">男
              <input type="radio" name="gender">女
            </div>
          </div>
        </div>
      </div>
      <div class="profile-form">
        <div class="profile-item">
          <span>一句话介绍</span>
          <div class="profile-item-content">
            <div class="profile-item-content-static">填写</div>
            <div class="profile-item-content-edit">
              <input type="text" name="headline">
            </div>
          </div>
        </div>
      </div>
      <div class="profile-form">
        <div class="profile-item">
          <span>个人简介</span>
          <div class="profile-item-content">
            <div class="profile-item-content-static">填写</div>
            <div class="profile-item-content-edit">
              <textarea name="descrition"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GlobleHeader from './../components/GlobleHeader'

  module.exports = {
    data: function () {
      return {
      }
    },
    methods: {
    },
    components: {
      GlobleHeader
    }
  }
</script>
