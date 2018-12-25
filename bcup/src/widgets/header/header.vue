<template>
    <div class="header clearfix">
        <div class="main clearfix">
            <router-link tag="li" class="logo" :to="{path:'/'}">
                <img src="/static/logo.jpeg"/>
            </router-link>
            <div class="name"></div>
        </div>
        <div class="city">
            <div class="select" @click="toggleList">
                {{ current.name }}
                <div class="arrow"></div>
            </div>
        </div>
        <div class="nav">
            <router-link :to="{ path : '/mine' }" class="more">
                <img src="/static/user.png"/>
            </router-link>
            <!--<div class="more" @click="toggleList">more</div>-->
        </div>

        <transition name="fade">
            <div v-if="status.showList" class="poplist" ref="pop">
                <ul class="list">
                    <li v-for="item in nav" @click="changeCity( item.id )">{{ item.name }}</li>
                </ul>
                <div class="shim" @click="toggleList"></div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    .header { height : 44px; z-index : 100; /*background: linear-gradient( #fff,#efefef );*/ background: #fff; position: fixed; top : 0; left : 0; width : 100%; color : #fff; box-shadow : 0 3px 5px rgba( 0, 0, 0, 0.1 ); }
    .city { height : 100%; color : #000; text-align: center; }
    .city .select { padding : 0; display: inline-block; margin : 0 auto; height : 44px; color : #444; line-height: 44px; font-size : 18px; position: relative; }
    .city .select .arrow { position : absolute; right :-20px; width: 0;height: 0;border-width: 6px; border-style: solid;border-color: #ccc transparent transparent transparent; top : 50%; margin-top : -3px; }
    .main { position : absolute; left : 0; height : 100%; line-height: 44px; }
    .main .logo { height : 40px; width : 40px; background-color: #fff; margin-top : 2px;float: left; display: block; position: relative; margin-left : 10px; }
    .main .logo img { width : 100%; height : 100%; display: block; }
    .main .name { display: inline-block; float: left; margin-left : 10px; }

    .nav { position: absolute; right :10px; top :0; }
    .nav .more img { display: block; height : 30px; cursor: pointer; width : 30px; line-height: 30px; margin-top : 8px; font-size : 12px; color : #fff; }
    .list { border-radius : 5px; overflow:hidden; z-index: 1; transform-origin : top center; position: relative; width : 150px; margin : 0 auto; top : 44px; right : 5px; background-color: #fff; transition : all 0.3s; transform : scale( 1 ); box-shadow : 0 3px 5px rgba( 0, 0, 0, 0.1 ); }
    .list li {  padding : 0 10px; text-align: center; font-size : 18px; height : 44px; line-height : 44px; color : #444; border-bottom : solid 1px #f0f0f0; background-color: #fcfcfc; }
    .list li:last-child { border-bottom : 0; }

    .poplist { display: block; z-index: 1000; position: fixed; top : 0; left : 0; width : 100%; height : 100%;}
    .poplist .shim { transition : all 0.5s; width : 100%; height : 100%; opacity: 1; position: absolute; top : 0; left : 0; background-color: rgba( 100, 100, 100, 0.1 );  }

    .fade-enter-active, .fade-leave-active { transition : all 0.5s; }
    .fade-enter .shim, .fade-leave-to .shim { opacity: 0; }
    .fade-enter .list, .fade-leave-to .list { transform : scale( 0 ); }
</style>

<script>
    export default {
        inited : false,
        data : function() {
            return {
                status : {
                    showList : false
                },
                nav : [{
                    name : '成都站',
                    id : 1
                },{
                    name : '绵阳站',
                    id : 2
                }],
                current : null
            };
        },
        mounted : function() {
            var id = localStorage.getItem( 'venderId' ) || 1,
                self = this,
                nav = this.nav, i = 0, n;

            for ( i = 0; n = nav[i]; ++i ) {
                if ( n.id == id ) {
                    self.current = n;
                    return;
                }
            }
        },
        methods : {
            toggleList : function() {
                this.status.showList = !this.status.showList;
            },
            changeCity : function( id ) {
                localStorage.setItem( 'venderId', id );
                window.location.href = '/';
            }
        }
    }
</script>
