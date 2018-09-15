<template>
  <div>
    <userinfo :item="pageInfo"/>
    <saledata :pageInfo="pageInfo" class="mod"/>
    <entrys :item="pageInfo" class="mod"/>
  </div>
</template>


<style scoped>
  .mod { box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); margin-bottom : 20px; }
</style>

<script>
  import userinfo from './userinfo'
  import saledata from './data'
  import entrys from './entrys'
  import distributionServ from '@/services/distribution/distribution'

  export default {
    components : {
      userinfo, saledata, entrys
    },
    data : function() {
      return {
        pageInfo : {}
      }
    },
    mounted : function() {
      let self = this;
      distributionServ.getBaseInfo( function( baseInfo ) {

        self.pageInfo = baseInfo.data;
      } );
    }
  }
</script>
