<template>
    <div class="header clearfix">
        <div class="main clearfix">
            <div class="logo"></div>
            <div class="name"></div>
        </div>
        <div class="nav">
            <router-link :to="{ path : '/mine' }" class="more">
                更多
            </router-link>
            <!--<div class="more" @click="toggleList">more</div>-->
        </div>

        <transition name="fade">
            <div v-if="status.showList" class="poplist" ref="pop">
                <ul class="list">
                    <li v-for="item in nav">{{ item.name }}</li>
                </ul>
                <div class="shim" @click="toggleList"></div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    .header { height : 44px; z-index : 100; background: linear-gradient( #fff, #f0f0f0 ); position: fixed; top : 0; left : 0; width : 100%; }

    .main { float: left; height : 100%; line-height: 44px; }
    .main .logo { height : 30px; width : 30px; background-color: #ddd; border-radius: 50%; margin-top : 5px; display: inline-block; float: left; margin-left : 10px; }
    .main .name { display: inline-block; float: left; margin-left : 10px; }

    .nav { float : right; margin-right : 10px; }
    .nav .more { display: block; height : 30px; cursor: pointer; width : 30px; line-height: 30px; margin-top : 5px; font-size : 12px; }
    .list { border-radius : 5px; overflow:hidden; z-index: 1; transform-origin : top right; position: absolute; top : 40px; right : 5px; background-color: #fff; transition : all 0.3s; transform : scale( 1 ); box-shadow : 0 3px 5px rgba( 0, 0, 0, 0.1 ); }
    .list li {  padding : 5px 10px; border-bottom : solid 1px #f0f0f0; background-color: #fcfcfc; }
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
                    name : 'navasdfasf1',
                },{
                    name : 'nav2'
                }]
            };
        },
        methods : {
            toggleList : function() {
                this.status.showList = !this.status.showList;
            }
        }
    }
</script>
