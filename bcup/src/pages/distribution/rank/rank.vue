<template>
  <div class="rank">
    <order-tab @tabChange="changeType" :data="ENUMDATA" :currentKey="type"/>
    <order v-for="item,index in rankData" :key="index" :item="item" :rank="index+1" class="mod"/>
  </div>
</template>


<style scoped>
  .rank { padding : 60px 10px 20px 10px; }
  .mod { background-color: #fff; border-bottom : solid 1px #f0f0f0; }
  .mod:last-child { box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); border-bottom : 0; }
</style>

<script>
  import bHeader from '@/widgets/header/header'
  import orderTab from './tab'
  import order from './member'
  import rankService from '@/services/rank/rank'

  export default {
    components: {
      bHeader, orderTab, order
    },
    data: function () {
      return {
        type: 1,
        rankData: {},
        ENUMDATA:[{key:1,value:'总榜'},{key:2,value:'月榜'}]
      }
    },
    mounted () {
      this.getRank()
    },
    methods: {
      getRank () {
        rankService.getRank({type: this.type}, (res) => {
          this.rankData = res.data;
        })
      },
      changeType (e) {
        this.type = e.key;
        this.getRank();
      }
    }
  }
</script>
