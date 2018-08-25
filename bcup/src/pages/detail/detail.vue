<template>
  <div class="detail">
    <b-header/>
    <div class="head">
      <swiper class="banner" :options="swiperOption">
        <swiper-slide>I'm Slide 1</swiper-slide>
        <swiper-slide>I'm Slide 2</swiper-slide>
        <swiper-slide>I'm Slide 3</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="name ellipsis-2">name name name name name name name name name name name name name name name name name name name name name name </div>
      <div class="price clearfix">
        <div class="origin">$100.00</div>
        <div class="counter">co:$10.00</div>
      </div>
      <div class="info clearfix">
        <div class="sale">sale:12</div>
        <div class="stock">stock:122</div>
      </div>
      <div class="loc ellipsis-1">
        location info location infolocation info location infolocation info location infolocation info location infolocation info location infolocation info location infolocation info location info
        <div class="icon">></div>
      </div>
    </div>

    <b-spec class="mod"/>
    <b-maininfo class="mod"/>
    <b-toolbar/>
  </div>
</template>


<style scoped>
  .detail { padding : 44px 0 54px 0; }
  .name { margin-top : 10px; padding : 0 10px; }
  .head { background-color: #fff; box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
  .head .banner { height : 200px; background-color: #ccc; }
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

    export default {
      mounted : function() {
      },
      components : {
        bHeader,bToolbar,bSpec,bMaininfo
      },
      data : function() {
        return {
          linkPath : 'link',
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
</script>