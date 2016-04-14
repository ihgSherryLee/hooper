<style lang="less">
</style>

<template>
  <globle-header></globle-header>
  <router-view></router-view>
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
