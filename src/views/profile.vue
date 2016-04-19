<style lang="less">
</style>

<template>
  <globle-header></globle-header>
  <div class="main-wrap">
    <div class="main-content-inner">
      <h5>编辑个人资料</h5>
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
