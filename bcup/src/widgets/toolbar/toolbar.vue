<template>
    <div class="toolbar clearfix">
        <router-link :to="{ path : '/' }" class="home"><img src="/static/home.png"/></router-link>
        <div class="cont">
            <div class="btn" @click="toggleService">咨询客服 </div>
            <router-link :to="{ path : '/checkout', query : { skuId : skuId } }" class="btn primary">立即购买</router-link>
        </div>
        <transition name="fade">
            <div v-if="showService" class="pop">
                <div class="list">
                  <a class="item" href="tel:4007728772">拨打电话</a>
                  <router-link tag="div" :to="{ path : '/servicecenter'}"  class="item">服务中心</router-link>
                </div>
                <div class="shim" @click="toggleService"></div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    .toolbar { z-index: 100; height : 44px; background-color: #ddd; position: fixed; bottom : 0; left : 0; width : 100%;background: linear-gradient( #fff, #f0f0f0 ); line-height: 44px; padding-left : 44px; border-top : solid 1px #efefef; }
    .home { width : 44px; position: relative; line-height: 44px; height : 44px; float : left; margin-left : -44px; text-align: center; border-right : solid 1px #dfdfdf; }
    .home img { position: absolute; width : 24px; height : 24px; display: inline-block; display: block; top: 50%; left : 50%; margin-left : -12px; margin-top:-12px; }
    .cont .btn { height : 100%; width : 50%; display: inline-block; float : left; text-align: center; }
    .cont .btn.primary { background-color : #ff6e1d; transition : all 0.5s; color  : #fff; font-size : 16px; }
    .pop { height : 100%; width : 100%; position: fixed; top : -44px; left : 0; z-index: 10000; overflow: hidden; }
    .pop .list { position: absolute; bottom : 0; left : 0; width : 100%; z-index: 1; transform : translate( 0, 0 ); transition : all 0.3s;  }
    .pop .list .item {display: block; background-color: #fff; border-bottom : solid 1px #f0f0f0; padding : 0 10px; height : 60px; line-height: 60px; }
    .pop .list .item:last-child { border-bottom : 0; }
    .pop .shim { background-color: #000; opacity: 0.2; width : 100%; height : 100%; position: absolute; top : 0; left : 0; transition : all 0.5s; }

    .fade-enter-active, .fade-leave-active { transition : all 0.5s; }
    .fade-enter .shim, .fade-leave-to .shim { opacity: 0; }
    .fade-enter .list, .fade-leave-to .list {  transform : translate( 0, 120px ); }
</style>

<script>
    export default {
        props: ['skuId','pageInfo'],
        data : function() {
            return {
                showService : false
            };
        },
        methods : {
            toggleService : function() {
                this.showService = !this.showService;
            }
        }
    }
</script>
