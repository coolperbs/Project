<template>
  <div class="tab">
    <div class="nav clearfix">
      <div v-for="el,index in data" class="item" :class="{current:el.key==currentKey}" @click="changeTab(el)">{{el.value}}</div>
    </div>
  </div>
</template>


<style scoped>
  .tab { padding : 10px; color:#ef8d56; position: fixed; width : 100%; height : 50px; background-color: #fff; top : 0; left : 0;  box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
  .nav  { height : 30px; border : solid 1px #ef8d56; border-radius : 15px; overflow: hidden; }
  .nav .item { float : left; width : 50%; height : 30px; text-align: center; line-height: 30px; }
  .nav .item.current { background-color: #ef8d56; color : #fff; }
</style>
<script>
  export default {
    props:{
      data:{},
      currentKey:{}
    },
    methods:{
      changeTab(el){
        if(el.key!=this.currentKey){
          this.$emit('tabChange',el)
        }
      }
    }
  }
</script>
