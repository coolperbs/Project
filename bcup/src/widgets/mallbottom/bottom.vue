<template>
    <div class="bottom">
        <router-link :to="{ path : '/charge' }" class="cell">
            <img v-if="selected == 0" src="/static/shouye-on.png"/>
            <img v-else src="/static/shouye.png"/>
            充值区
        </router-link>
        <router-link :to="{ path : '/orders/list' }" class="cell">
            <img v-if="selected == 1" src="/static/dingdan-on.png"/>
            <img v-else src="/static/dingdan.png"/>
            积分商城
        </router-link>
    </div>
</template>

<style scoped>
.bottom { height : 60px; position: fixed; bottom : 0; left : 0; width: 100%; background-color: #fff; z-index: 100; display: flex; align-items: center; justify-content: space-around; }
.bottom .cell { display: flex; justify-content: space-between; align-items: center; flex-direction: column; }
.bottom .cell img { width : 32px; height : 32px; }
</style>

<script>
    let logo = true;
    export default {
        inited : false,
        data : function() {
            return {
                selected : 0
            };
        },
        mounted : function() {
            var href = location.href;
            if ( href.indexOf( '/orders/list' ) > 0 ) {
                this.selected = 1;
            } else if ( href.indexOf( '/mine' ) > 0 ) {
                this.selected = 2;
            } else {
                this.selected = 0;
            }
        }
    }
</script>
