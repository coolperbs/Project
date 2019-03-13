<template>
  <div class="home">
    <b-header ref="header"/>
    <swiper class="banner" :options="swiperOption" v-if="pageInfo.swipers && pageInfo.swipers.length">
      <swiper-slide v-for="slide in pageInfo.swipers" :key="slide.imgUrl">
        <!--<router-link :to="{ path : 'http://www.baidu.com' }">-->
        <a :href="slide.url">
          <img :src="slide.imgUri"/>
        </a>
        <!--</router-link>-->
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <router-link :to="{ path : '/detail', query : { id : item.shopId + '-' + item.skuId } }" v-for="item in pageInfo.wares" :key="item.skuId">
      <div class="mod">
        <div class="pic">
          <img :src="item.mainImage"/>
        </div>
        <div class="info">
          <div class="title ellipsis-2 ">{{ item.title }}</div>
          <div class="more clearfix">
            <div class="price">
              <span class="origin">￥<em>{{ fixPrice( item.price || item.originPrice ) }}</em></span>
              <span class="counter" v-if="userData.trader==1">返:￥{{ fixPrice( item.brokeragePrice) }}</span>
            </div>
            <!--<div class="sale-num">已售：{{item.saledNum?item.saledNum:0}}</div>-->
          </div>
        </div>
      </div>
    </router-link>

  </div>
</template>


<style scoped>
  .home {
    padding: 54px 10px 30px 10px;
  }

  .banner {
    height: 200px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
  }

  .title { font-size :18px; }
  .banner img {
    display: block;
    width: 100%;
    height: 200px;
  }

  .mod {
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
    margin-top: 20px;
    background-color: #fff;
  }

  .mod .pic {
    background-color: #f0f0f0;
    min-height: 100px;
  }

  .mod .pic img {
    width: 100%;
  }

  .mod .info {
    padding: 10px;
  }

  .mod .more {
    margin-top: 5px;
    padding: 5px 0;
  }

  .mod .more .price {
    float: left;
    font-size : 12px;
    font-weight: bold;
    color : #ff6e1d;
  }

  .mod .more .price em {
    font-size : 20px;
    font-style: normal;
  }

  .mod .more .price .counter {
    margin-left: 10px;
    font-size : 12px;
    font-weight: normal;
    color : #54a849;
  }

  .mod .more .sale-num {
    float: right;
  }
</style>

<script>
  import bHeader from '@/widgets/header/header'
  import ajax from '@/common/ajax/ajax'
  import utils from '@/common/utils/utils'
  import distributionService from '@/services/distribution/distribution'
  import weixin from '@/common/weixin/weixin'

  let _fn;

  export default {
    mounted: function () {
      //document.getElementsByTagName("title")[0].innerText = 'a';
      let self = this;
      let query = this.$route.query;

      // 达人关系绑定
      if (query.userId) {
        distributionService.applyBinding({origin: query.userId * 1});
      }


      _fn.getData(function (res) {

        self.pageInfo = res.data || {name: 1};
        distributionService.getUserInfo((res) => {
          self.userData = res.data;
            if ( res.data && res.data.trader == 1 && res.data.venderId ) {
              utils.addTraderId( res.data.id );
            }          
            _fn.setShareInfo();
        })
      });
    },

    updated : function() {

      if ( this.$route.query.c == 1 ) {
        this.$refs.header.setTitle( 1 );
      }
    },

    methods: {
      fixPrice: utils.fixPrice
    },

    components: {
      bHeader
    },
    data: function () {
      return {
        pageInfo: {},
        linkPath: 'link',
        userData: {},
        swiperOption: {
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    }
  }

  _fn = {
    getData: function (callback) {
      var id = localStorage.getItem( 'venderId' ) || 1,
          url = window.location.href.split( '#' )[0];
      ajax.get('/app/index', { venderId : id, signUrl : window.location.href }, function (res) {
        if (utils.isErrorRes(res)) {
          utils.showError(res.msg || '请求接口出错');
          return;
        }
        //weixin.share( res.data.shareInfo );
        callback(res);
      });
    },
    setShareInfo : function(  ) {
      _fn.getData( function( res ) {
        weixin.share( res.data.shareInfo, {
          url : window.location.href.split( '#' )[0],
          imgUrl : 'http://bc.ypzmkj.com/static/logo.jpeg',
          title : '暴客优品',
          desc : '整点巴适的！'
        } );
      } );
    }
  }
</script>
















