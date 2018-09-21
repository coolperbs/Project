<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .swiper-pagination-bullet-active {
    background-color: #888;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    /*text-align: center;*/
    color: #2c3e50;
    max-width: 750px;
    margin: 0 auto;
    /*margin-top: 60px;*/
  }

  .pull-down {
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .pull-item{
    padding: 0 10px;
  }
</style>
