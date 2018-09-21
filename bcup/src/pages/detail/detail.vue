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
        <div class="counter" v-if="pageInfo.brokeragePrice">返:￥{{ fixPrice( pageInfo.brokeragePrice ) }}</div>
      </div>
      <div class="info clearfix">
        <div class="sale">已售:12</div>
        <div class="stock">库存:{{pageInfo.lastStock}}</div>
      </div>
      <div class="loc ellipsis-1">
        {{pageInfo.subTitle}}
        <div class="icon">></div>
      </div>
    </div>

    <div class="shareIcon" @click="showSharePop">分享海报</div>
    <div class="sharePop" v-if="showPop">
      <div class="pop">
        <div class="close" @click="hideSharePop"></div>
        <img :src="shareImgUrl"/>
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
  .head .price .origin { display: inline-block; color: #ee8e34;font-size: 18px}
  .head .price .counter { margin-left : 10px;font-weight: bold;color: #54a849;font-size: 12px; }
  .head .info { padding : 0 10px; margin-top : 10px; }
  .head .info .sale{ float : left; }
  .head .info .stock { float : right; }
  .head .loc { padding : 0 50px 0 10px; height : 40px; line-height : 40px; margin-top : 10px; border-top : solid 1px #f0f0f0; position: relative; }
  .head .loc .icon { height : 40px; width : 40px; line-height: 40px; text-align: center; position: absolute; right : 10px; top : 0; }
  .mod { margin-top : 10px;  box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }

  .shareIcon { padding : 5px 10px; border-top-left-radius : 20px; border-bottom-left-radius : 20px; color : #fff; position: fixed; top : 80px; right :0; z-index : 100; background-color: rgba(0,0,0,0.6); }
  .sharePop { position: fixed; top : 0; left : 0; width : 100%; height : 100%; background-color: rgba( 0, 0, 0, 0.3 ); z-index: 10000; }
  .sharePop { text-align: center; }
  .pop { margin : 0 auto; width : 80%; margin-top : 20%; position: relative; }
  .pop .close { width : 40px; height: 40px; background-color: #fff; border-radius: 50%; top: -20px; right :-20px; position: absolute; }
  .pop img { width : 100%; background-color: #fff; }
</style>

<script>
import bHeader from '@/widgets/header/header'
import bToolbar from '@/widgets/toolbar/toolbar'
import bSpec from '@/pages/detail/spec'
import bMaininfo from '@/pages/detail/maininfo'
import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'
import detailServ from '@/services/detail/detail'
import CFG from '@/config'
import distributionServ from '@/services/distribution/distribution'

let _fn;

export default {
  components : {
    bHeader,bToolbar,bSpec,bMaininfo
  },
  data : function() {
    return {
      linkPath : 'link',
      pageInfo : {},
      showPop : false,
      shareImgUrl : 'http://gw.jwcms.net//app/ware/shareimage/1?token=77321572C240F84D2BD7E5239462683435D3421A4B22812DE3A70D03668C05A4F4FD7A4CBEA6C6989A3E38B027130751DEBE5623FFBC6CC6D13509BB336A1EEBAB2E7A88C6786E36B608BB04B41B64A25AA7293A8DD198DFF653067C76A19986581E6ECE0B77BAA1F60DB2DC0414C63A37F202137E4D84D3CCE84FAC4CBCE245',
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
  },
  mounted : function() {
    let query = this.$route.query;
    let ids = ( query.id + '' ).split( '-' );
    let self = this;

    detailServ.query( { skuId : ids[1] }, function( res ) {
      self.pageInfo = res.data;
    } );

    // 如果有userId，进行关系绑定
    if ( query.userId ) {
      distributionServ.applyBinding( { origin : query.userId * 1 } );
    }
  },
  methods : {
    fixPrice : utils.fixPrice,
    showSharePop : function() {
      this.showPop = true;
      this.shareImgUrl = this.shareImgUrl || CFG.host + '/app/ware/shareimage/' + this.pageInfo.skuId + '?token=' + utils.getCookie( 'tikectWechart' );
    },
    hideSharePop : function() {
      this.showPop = false;
      this.shareImgUrl = '';
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













