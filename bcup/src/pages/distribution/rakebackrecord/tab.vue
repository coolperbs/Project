<template>
  <div class="orderlist-tab">
    <div class="search">
      <div class="input">
        <input style="padding: 0 10px;" v-model="searchKey" placeholder="请输入"/>
      </div>
      <div class="btn" @click="searchEvt">搜索</div>
    </div>
    <ul class="list">
      <li v-for="item,index in tabList" :key="index" @click="changeCurrentKey(item)">
        <span class="text" :class="{current : item.key== currentKey }">{{ item.name}}</span>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .orderlist-tab { position: fixed; top : 0; left : 0; width : 100%; box-shadow : 0 5px 5px rgba( 100, 100, 100, 0.1 ); z-index: 100; background-color: #fff; }
  .list li { display: inline-block; height : 40px; width : 33.33%; background-color: #fff; text-align: center; }
  .list li .text { display: inline-block; height : 100%; line-height: 40px; padding : 0 5px; }
  .list li .text.current { color : #ef8d56; font-weight: bold; font-size : 16px; border-bottom : solid 2px #ef8d56; }

  .search { padding : 10px 60px 10px 10px; position: relative; }
  .search .input {}
  .search input { width : 100%; height : 30px; line-height: 30px; border-radius : 15px; border  : 0; background-color: #ddd; }
  .search .btn { font-weight : bold; font-size : 16px; color : #ef8d56; height : 30px; line-height: 30px; width : 40px; overflow: hidden; float : right; position: absolute; right : 10px; top : 10px; }
</style>

<script>
  export default {
    data(){
      return{
        searchKey:''
      }
    },
    props: {
      tabList: {
        type: Array,
        required: true
      },
      currentKey: {
        type: Number,
        required: true
      }
    },
    methods:{
      changeCurrentKey(el){
        if(el.key==this.currentKey){
          return
        }
        this.searchKey='';
        this.searchEvt();
        this.$emit('tabChange',el)
      },
      searchEvt(){
        this.$emit('searchEvt',this.searchKey)
      }
    }
  }
</script>
