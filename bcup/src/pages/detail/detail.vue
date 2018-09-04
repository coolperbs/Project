<template>
  <div class="detail">
    <b-header/>
    <div class="head">
      <swiper class="banner" :options="swiperOption" v-if="pageInfo.mainImage">
        <swiper-slide v-for="item in pageInfo.mainImage" :key="item.skuId">
          <img :src="item"/>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="name ellipsis-2">{{ pageInfo.title }}</div>
      <div class="price clearfix">
        <div class="origin">￥{{ fixPrice( pageInfo.price || pageInfo.originPrice ) }}</div>
        <div class="counter">返:￥{{ fixPrice( 0 ) }}</div>
      </div>
      <div class="info clearfix">
        <div class="sale">已售:12</div>
        <div class="stock">库存:122</div>
      </div>
      <div class="loc ellipsis-1">
        location info location infolocation info location infolocation info location infolocation info location infolocation info location infolocation info location infolocation info location info
        <div class="icon">></div>
      </div>
    </div>

    <b-spec class="mod" :pageInfo="pageInfo"/>
    <b-maininfo class="mod" :pageInfo="pageInfo"/>
    <b-toolbar :skuId="pageInfo.skuId"/>
  </div>
</template>


<style scoped>
  .detail { padding : 44px 0 54px 0; }
  .name { margin-top : 10px; padding : 0 10px; }
  .head { background-color: #fff; box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
  .head .banner { height : 200px; background-color: #ccc; }
  .head .banner img { width : 100%; height : 100%; }
  .head .price { margin-top : 10px; padding : 0 10px; }
  .head .price .counter,
  .head .price .origin { display: inline-block; }
  .head .price .counter { margin-left : 10px; }
  .head .info { padding : 0 10px; margin-top : 10px; }
  .head .info .sale{ float : left; }
  .head .info .stock { float : right; }
  .head .loc { padding : 0 50px 0 10px; height : 40px; line-height : 40px; margin-top : 10px; border-top : solid 1px #f0f0f0; position: relative; }
  .head .loc .icon { height : 40px; width : 40px; line-height: 40px; text-align: center; position: absolute; right : 10px; top : 0; }
  .mod { margin-top : 10px;  box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
</style>

<script>
import bHeader from '@/widgets/header/header'
import bToolbar from '@/widgets/toolbar/toolbar'
import bSpec from '@/pages/detail/spec'
import bMaininfo from '@/pages/detail/maininfo'
import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'
import detailServ from '@/services/detail/detail'

let _fn;

export default {
  mounted : function() {
    let query = this.$route.query;
    let ids = ( query.id + '' ).split( '.' );
    let self = this;

    detailServ.query( { skuId : ids[1] }, function( res ) {
      self.pageInfo = res.data;
    } );
  },
  components : {
    bHeader,bToolbar,bSpec,bMaininfo
  },

  methods : {
    fixPrice : utils.fixPrice
  },

  data : function() {
    return {
      linkPath : 'link',
      pageInfo : {},
      swiperOption : {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },            
        pagination: {
          el: '.swiper-pagination',
          clickable : true
        }
      }
    }
  }
}

// _fn = {
//   getData : function( param, callback ) {
//     ajax.get( '/app/ware/detail/' + 1, function( res) {
//       if ( utils.isErrorRes( res ) ) {
//         utils.showError( res.msg || '请求接口出错' );
//         return;
//       }
//       callback( res );
//     } );
//   }
// }
</script>













