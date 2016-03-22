<template>
  <div id="app">
    <globle-header></globle-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import GlobleHeader from './components/GlobleHeader'

export default {
  components: {
    GlobleHeader
  }
}
</script>

<style>

</style>
