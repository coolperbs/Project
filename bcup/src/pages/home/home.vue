<template>
  <div class="home">
    <b-header/>
    <swiper class="banner" :options="swiperOption">
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <router-link :to="{ path : '/detail', query : { userId : linkPath } }" v-for="item in [{age:1},{age:2},{age:3}]" :key="item.age">
      <div class="mod">
        <div class="pic">
          <img src=""/>
        </div>
        <div class="info">
          <div class="title ellipsis-2 ">name name name name name name name name name name name name name name name name name name name name name name </div>
          <div class="more clearfix">
            <div class="price">
              <span class="origin">$100.00</span>
              <span class="counter">co:$10.00</span>
            </div>
            <div class="sale-num">sale：10</div>
          </div>
        </div>
      </div>
    </router-link>

  </div>
</template>


<style scoped>
  .home { padding : 54px 10px 30px 10px; }
  .banner { height : 200px; border-radius : 5px; background-color: #fff; box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
  .mod { border-radius : 5px; overflow: hidden;  box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); margin-top : 20px; background-color: #fff; }
  .mod .pic { background-color: #f0f0f0; min-height : 100px; }
  .mod .info { padding : 10px; }
  .mod .more { margin-top : 5px; padding : 5px 0; }
  .mod .more .price { float : left; }
  .mod .more .price .counter { margin-left : 10px; }
  .mod .more .sale-num { float : right; }
</style>

<script>
    import bHeader from '@/widgets/header/header'
    export default {
      mounted : function() {
      },
      components : {
        bHeader
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