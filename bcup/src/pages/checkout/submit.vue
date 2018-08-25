<template>
  <div class="checkout-submit">
    <div class="btn" @click="submit">submit</div>
  </div>
</template>


<style scoped>
    .checkout-submit { position: fixed; bottom : 0; left : 0; width : 100%; padding : 10px; }
    .btn { height : 44px; background-color: #ccc; border-radius : 22px; text-align: center; line-height: 44px; font-size : 20px; color : #fff; }
</style>

<script>
    import Router from '@/router'

    export default {
        methods : {
            submit : function() {
                Router.push( { path : '/orderdetail' } );
            }
        },
        data : function() {
            return {
            }
        }
    }
</script>