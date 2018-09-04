<template>
  <keep-alive>
  <div class="orderlist">
    <order-tab v-model="tab" @changeTab="changeTab"/>
    <order v-for="order in orderList" :key="order.orderId" :orderId="order.orderId" class="mod"/>
  </div>
  </keep-alive>
</template>


<style scoped>
  .orderlist { padding : 40px 10px 20px 10px; }
  .mod { border-radius: 5px; background-color: #fff; margin-top : 10px;  box-shadow : 0 3px 5px rgba( 100, 100, 100, 0.1 ); }
</style>

<script>
import bHeader from '@/widgets/header/header'
import orderTab from './tab'
import order from './order'
import orderServ from '@/services/order/order'
import utils from '@/common/utils/utils'

export default {
  components : {
    bHeader, orderTab, order
  },
  data : function() {
    return {
      tab : {
        current : 1,
        list : [{
            name : '全部',
            value : 1,
          },{
            name : '待支付',
            value : 2
          },{
            name : '已支付',
            value : 3
          },{
            name : '已完成',
            value : 4
          },{
            name : '已取消',
            value : 5
        }]
      },
      orderList : []
    }
  },
  mounted : function() {
    this.render();
  },
  methods : {
    changeTab : function( tab ) {
      this.tab.current = tab.value;
      this.render()
    },
    render : function() {
      let self = this;
      orderServ.getList( { type : self.tab.current }, function( res ) {
        if ( utils.isErrorRes( res ) ) {
          utils.showError( res.msg || '获取列表信息错误' );
          return;
        }
        self.orderList = res.data.order;
      } );
    }
  }
}
</script>



