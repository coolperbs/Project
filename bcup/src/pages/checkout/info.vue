<template>
  <div class="checkout-info">
    <div class="main">【loc】{{ pageInfo.skuInfo.title }} </div>
    <div class="spec"><span class="tag">spec</span>info info info info info info info info info info info info info info info info info info </div>
  </div>
</template>


<style scoped>
    .checkout-info { padding : 10px; }
    .spec { margin-top : 10px; font-size : 12px; line-height: 20px; color : #999; }
    .spec .tag{ height : 20px; line-height : 20px; display: inline-block; padding : 0 10px; background-color: #ccc; border-radius : 10px; margin-right: 10px; color : #444; }
</style>

<script>
  export default {
    props : ['value'],
    computed : {
      pageInfo : function() {
        return this.value;
      }
    },    
    data : function() {
      return {
      }
    }
  }
</script>