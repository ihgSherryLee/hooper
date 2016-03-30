<template>
  <!-- <div id="app">
    <globle-header></globle-header>
    <main>
      <router-view></router-view>
    </main>
  </div> -->
  <div id="app">
    <hooper-login></hooper-login>
  </div>
</template>

<script>
// import GlobleHeader from './components/GlobleHeader'
import HooperLogin from './components/Login'

export default {
  components: {
    // GlobleHeader,
    HooperLogin
  }
}
</script>

<style>

</style>
