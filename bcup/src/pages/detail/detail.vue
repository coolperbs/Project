<template>
  <div class="detail">
    <b-header ref="header2"/>
    <div class="head">
      <swiper class="banner" :style="{ height : bannerHeight + 'px' }" :options="swiperOption" v-if="pageInfo.mainImage">
        <swiper-slide v-for="item in pageInfo.mainImage" :key="item.skuId">
          <img :src="item"/>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="name">{{ pageInfo.title }}</div>
      <div class="price clearfix">
        <div class="origin">￥<em>{{ fixPrice( pageInfo.price || pageInfo.originPrice ) }}</em></div>
        <div class="counter" v-if="userData.trader==1">返:￥{{ fixPrice( pageInfo.brokeragePrice ) }}</div>
      </div>
      <div class="info clearfix">
        <!--<div class="sale">已售:{{pageInfo.saledNum?pageInfo.saledNum:0}}</div>-->
        <div class="stock" v-if="pageInfo.lastStock<=200">库存:{{pageInfo.lastStock}}</div>
      </div>

      <a :href="locationStr" class="loc ellipsis-1" style="display: block">
        {{pageInfo.storeVO.address}}
        <!--<div class="icon"><img src="static/arrow-right.png"/></div>-->
      </a>
    </div>

    <div v-if="userData.trader==1" class="shareIcon" @click="showSharePop">分享海报</div>
    <div class="sharePop" v-if="showPop">
      <div class="pop">
        <div class="close" @click="hideSharePop">
          <img src="static/cross.png"/>
        </div>
        <img :src="shareImgUrl"/>
      </div>
    </div>
    <b-spec class="mod" :pageInfo="pageInfo" @changeSkuId="changeSkuIdEvt"/>
    <b-maininfo class="mod" :pageInfo="pageInfo"/>
    <b-toolbar :pageInfo="pageInfo" :skuId="checkedSkuId"/>
  </div>
</template>


<style scoped>
  .detail {
    padding: 44px 0 54px 0;
    width: 100%;
  }

  .name {
    margin-top: 10px;
    padding: 0 10px;
    font-size: 18px;
  }

  .head {
    background-color: #fff;
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
  }

  .head .banner {
    height: 300px;
    background-color: #ccc;
  }

  .head .banner img {
    width: 100%;
    height: 100%;
  }

  .head .price {
    margin-top: 10px;
    padding: 0 10px;
  }

  .head .price .counter,
  .head .price .origin {
    display: inline-block;
    color: #ff6e1d;
    font-size: 18px;
    font-weight: bold;
  }

  .head .price .origin em {
    font-size: 24px;
    font-style: normal;
  }

  .head .price .counter {
    margin-left: 10px;
    font-weight: bold;
    color: #54a849;
    font-size: 14px;
  }

  .head .info {
    padding: 0 10px;
    margin-top: 10px;
    color: #999;
  }

  .head .info .sale {
    float: left;
  }

  .head .info .stock {
    float: right;
  }

  .head .loc {
    padding: 0 50px 0 10px;
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
    border-top: solid 1px #f0f0f0;
    position: relative;
  }

  .head .loc .icon {
    height: 50px;
    width: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
  }

  .head .loc .icon img {
    height: 20px;
  }

  .mod {
    margin-top: 10px;
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
  }

  .shareIcon {
    padding: 5px 10px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    color: #fff;
    position: fixed;
    top: 80px;
    right: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .sharePop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10000;
  }

  .sharePop {
    text-align: center;
  }

  .pop {
    margin: 0 auto;
    width: 70%;
    margin-top: 10%;
    position: relative;
  }

  .pop .close {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    top: -20px;
    right: -20px;
    overflow: hidden;
    position: absolute;
  }

  .pop .close img {
    width: 24px;
    height: 24px;
    position: absolute;
    left: 8px;
    top: 8px;
  }

  .pop img {
    width: 100%;
    background-color: #fff;
  }
</style>

<script>
  import bHeader from '@/widgets/header/header'
  import bToolbar from '@/widgets/toolbar/toolbar'
  import bSpec from '@/pages/detail/spec'
  import bMaininfo from '@/pages/detail/maininfo'
  import utils from '@/common/utils/utils'
  import detailServ from '@/services/detail/detail'
  import CFG from '@/config'
  import distributionServ from '@/services/distribution/distribution'
  import weixin from '@/common/weixin/weixin'

  export default {
    components: {
      bHeader, bToolbar, bSpec, bMaininfo
    },
    data: function () {
      return {
        linkPath: 'link',
        pageInfo: {},
        bannerHeight: 300,
        showPop: false,
        swiperOption: {
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        userData: {},
        locationStr: '',
        checkedSkuId: ''
      }
    },
    mounted: function () {
      let query = this.$route.query;

      this.bannerHeight = document.body.clientWidth;
      //this.bannerHeight = document.body.clientWidth / 300 * 180;

      let ids = (query.id + '').split('-');
      this.checkedSkuId = ids[1];
      this.getData(ids[1]);
    
    },
    updated(){
      if ( this.$route.query.c == 1 ) {
          this.$refs.header2.setTitle( 1 );
        }
    },
    methods: {

      setShareInfo : function(  ) {
        let self = this;
        let query = this.$route.query;
        detailServ.query({skuId: self.checkedSkuId, signUrl : window.location.href.split( '#' )[0] }, function (res) {
          weixin.share( res.data.shareInfo, {
            url : window.location.href.split( '#' )[0],
            imgUrl : self.pageInfo.mainImage[0],
            title : '暴客优品',
            desc : self.pageInfo.title,
          } );          
        });
      }, 
           
      getData (skuId) {
        let self = this;
        let query = this.$route.query;
        detailServ.query({skuId: skuId}, function (res) {
          self.pageInfo = res.data;
          var url = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${self.pageInfo.storeVO.lng},${self.pageInfo.storeVO.lat};title:${self.pageInfo.storeVO.name};addr:${self.pageInfo.storeVO.name}&referer=myapp`
          self.locationStr = decodeURIComponent(url);
          // self.locationStr = `http://api.map.baidu.com/marker?location=${self.pageInfo.storeVO.lat},${self.pageInfo.storeVO.lng}=${self.pageInfo.storeVO.name}&content=${self.pageInfo.storeVO.name}&output=html`

          if (self.pageInfo && self.pageInfo.mainImage && self.pageInfo.mainImage.length > 1) {
            self.pageInfo.mainImage.shift();
          }

          // 如果有userId，进行关系绑定
          if (query.userId) {
            distributionServ.applyBinding({origin: query.userId * 1});
          }
          //获取用户信息判断是否是达人
          distributionServ.getUserInfo((res) => {
            self.userData = res.data;
            if (res.data && res.data.trader == 1 && res.data.venderId) {
              utils.addTraderId(res.data.id);
            }
            self.setShareInfo();
          })
        })
      },
      fixPrice: utils.fixPrice,
      showSharePop: function () {
        let query = this.$route.query;
        let id = query.id || '';
        id = id.split('-')[1] || 0;
        this.showPop = true;
        this.shareImgUrl = this.shareImgUrl || CFG.host + '/app/ware/shareimage/' + id + '?token=' + utils.getCookie('ticketWeChat');
      },
      hideSharePop: function () {
        this.showPop = false;
        this.shareImgUrl = '';
      },
      changeSkuIdEvt: function (e) {
        if (e != this.checkedSkuId) {
          var lastPath = this.$route.path + '?id=' + this.$route.query.id.split('-')[0] + '-' + e;
          this.getData(e)
        }
        this.checkedSkuId = e;
      }
    }
  }
</script>













