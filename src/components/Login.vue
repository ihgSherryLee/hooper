<style lang="less">
  .wrap {
    margin: auto;
    padding: 40px 0;
    width: 300px;
  }
  .title {
    front-size: 24px;
  }
</style>

<template>
  <div class="wrap">
    <div class="title">HOOPER</div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>
