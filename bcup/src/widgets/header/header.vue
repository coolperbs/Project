<template>
    <div class="header clearfix">
        <div class="main clearfix">
            <div class="logo"></div>
            <div class="name"></div>
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
                    <li v-for="item in nav">{{ item.name }}</li>
                </ul>
                <div class="shim" @click="toggleList"></div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    .header { height : 44px; z-index : 100; box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1); background: linear-gradient( #EF648F,#ef8d56 ); position: fixed; top : 0; left : 0; width : 100%; color : #fff; }

    .main { float: left; height : 100%; line-height: 44px; }
    .main .logo { height : 30px; width : 30px; background-color: #fff; border-radius: 50%; margin-top : 8px; display: inline-block; float: left; margin-left : 10px; }
    .main .name { display: inline-block; float: left; margin-left : 10px; }

    .nav { float : right; margin-right : 10px; }
    .nav .more img { display: block; height : 30px; cursor: pointer; width : 30px; line-height: 30px; margin-top : 8px; font-size : 12px; color : #fff; }
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
