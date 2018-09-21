<template>
    <div class="spec">
      <div class="title ellipsis-1">【spec】</div>
      <div class="sub-title">name name name name name name name name name</div>
      <div class="list clearfix">
        <span class="cell">aasewrf</span>
        <span class="cell">aasf</span>
        <span class="cell">aasff</span>
        <span class="cell">aasfaassdd</span>
        <span class="cell">aasewrf</span>
        <span class="cell">aasf</span>
        <span class="cell">aasff</span>
        <span class="cell">aasfaassdd</span>
        <span class="cell">aasewrf</span>
        <span class="cell">aasf</span>
        <span class="cell">aasff</span>
        <span class="cell">aasfaassdd</span>
        <span class="cell">aasewrf</span>
        <span class="cell">aasf</span>
        <span class="cell">aasff</span>
        <span class="cell">aasfaassdd</span>
      </div>

      <div class="more">
        remark: asfdas asfdas dfasd fas
      </div>
    </div>
</template>


<style scoped>
  .spec { background-color: #fff; padding : 10px 10px 0 10px; }
  .sub-title { margin-top : 5px; }
  .list { margin-top : 5px; }
  .list .cell { background-color: #ccc; color : #fff; padding : 3px 5px; display: inline-block; margin : 2px 0; border-radius: 5px; float: left; margin-left : 10px; }
  .list .cell:first-child { margin-left : 0; }
  .more { border-top : dashed 1px #f0f0f0; margin-top : 10px; padding : 10px 0; }
</style>

<script>
  export default {
    props: {
      pageInfo: {}
    }
  }
</script>
