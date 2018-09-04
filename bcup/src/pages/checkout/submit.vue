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
import axios from 'axios'
import ajax from '@/common/ajax/ajax'
import payServ from '@/services/pay/pay'
import orderServ from '@/services/order/order'
import utils from '@/common/utils/utils'


export default {
    props : [ 'pageInfo' ],
    methods : {
        submit : function() {
            orderServ.create( this.pageInfo.formInfo, function( res ) {
                if ( utils.isErrorRes( res ) ) {
                    utils.showError( res.msg || '创建订单失败' );
                    return;
                }
                payServ.getPayInfo( { orderId : res.data.orderId }, function() {
                    
                } );
            } );
            return;
            ajax.get( '/app/pay/wechatPrePay', { param : { orderId : 10000000 } }, function( res ) {
                pay.pay( res.data, function( res ) {
                    console.log( res );
                    alert( '支付成功' );
                    Router.push( { path : '/orderdetail' } );
                } );
            } );
        }
    },
    data : function() {
        return {
        }
    }
}
</script>