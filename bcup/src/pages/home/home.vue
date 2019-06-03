<template>
  <div class="home">
    <b-header ref="header"/>
    <swiper class="banner" :options="swiperOption" v-if="pageInfo.swipers && pageInfo.swipers.length">
      <swiper-slide v-for="slide in pageInfo.swipers" :key="slide.imgUrl">
        <router-link :to="{ path : slide.url }">
        <a :href="slide.url">
          <img :src="slide.imgUri"/>
        </a>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="nav">
      <router-link :to="{ path : '/cat?id=' + item.catId }" class="icon" v-for=" item in cats ">
        <img :src="item.logo"/>
        {{item.catName}}
      </router-link>
      <!--<div class="icon">
        <img src="/static/quanbu.png"/>
        全部
      </div>
      <div class="icon">
        <img src="/static/meishi.png"/>
        美食
      </div>
      <div class="icon">
        <img src="/static/menpiao.png"/>
        门票
      </div>
      <div class="icon">
        <img src="/static/meirong.png"/>
        美容
      </div>
      <div class="icon">
        <img src="/static/qita.png"/>
        其他
      </div>-->
    </div>

    <div class="cont-list">
    <router-link :to="{ path : '/detail', query : { id : item.shopId + '-' + item.skuId } }" v-for="item in pageInfo.wares" :key="item.skuId" class="mod">
        <div class="pic">
          <img :src="item.mainImage"/>
        </div>
        <div class="info">
          <div class="title ellipsis-3 ">{{ item.title }}</div>
          <div class="more clearfix">
            <div class="price">
              <span class="origin">￥<em>{{ fixPrice( item.price || item.originPrice ) }}</em></span>
              <div class="counters">
                <span class="counter" v-if="userData.trader==1">返:￥{{ fixPrice( item.brokeragePrice) }}</span>
                <span class="counter" v-if="userData.trader==1">暴返:￥{{ fixPrice( item.brokerageSucondPrice) }}</span>
              </div>
            </div>
            <!--<div class="sale-num">已售：{{item.saledNum?item.saledNum:0}}</div>-->
          </div>
        </div>
    </router-link>
    </div>

    <b-bottom/>
  </div>
</template>


<style scoped>
  .nav { height : 80px; background-color: #fff; display: flex; align-items: center; justify-content: space-around; }
  .nav .icon { display: flex; flex-direction: column; justify-content: space-between; align-items: center; }
  .nav .icon img { width : 32px; height: 32px; }
  .home {
    padding: 54px 0 80px 0;
  }

  .banner {
    height: 200px;
    background-color: #fff;
    /*box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);*/
  }

  .title { font-size :18px; }
  .banner img {
    display: block;
    width: 100%;
    height: 200px;
  }

  .cont-list { justify-content: space-between; padding : 0 10px; display: flex; flex-wrap: wrap; }
  .mod {
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
    margin-top: 15px;
    width : 48%;
    background-color: #fff;
  }

  .mod .pic {
    background-color: #f0f0f0;
    height: 130px;
  }

  .mod .title { height : 50px; font-size : 12px; }

  .mod .pic img {
    width: 100%;
    height : 100%;
  }

  .mod .info {
    padding: 10px;
  }

  .mod .more {
    margin-top: 5px;
    padding: 5px 0;
  }

  .mod .more .price {
    /*float: left;*/
    display: block;
    font-size : 12px;
    font-weight: bold;
    color : #ff6e1d;
  }

  .mod .more .price .origin {
    display: block;
  }

  .mod .more .price em {
    font-size : 20px;
    font-style: normal;
  }

  .mod .more .price .counters {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mod .more .price .counter {
    /*margin-left: 10px;*/
    font-size : 12px;
    font-weight: normal;
    color : #54a849;
  }

  .mod .more .sale-num {
    float: right;
  }
  .ellipsis-3 { display: block; overflow:hidden; text-overflow:ellipsis; display: -webkit-box; -webkit-box-orient: vertical;line-clamp:3; -webkit-line-clamp: 3; }

</style>

<script>
  import bHeader from '@/widgets/header/header'
  import bBottom from '@/widgets/bottom/bottom'
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

      var id = localStorage.getItem( 'venderId' ) || 1,
          url = window.location.href.split( '#' )[0];

      ajax.get('/cat', { venderId : id }, function (res) {
        if (utils.isErrorRes(res)) {
          utils.showError(res.msg || '请求接口出错');
          return;
        }
        //weixin.share( res.data.shareInfo );
        self.cats = res.data;
      });

      _fn.getData(function (res) {

        self.pageInfo = res.data || {name: 1};
        //self.pageInfo.swipers = [{}]
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
      bHeader, bBottom
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
















