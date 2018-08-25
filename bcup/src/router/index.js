import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home/home'
import Detail from '@/pages/detail/detail'
import Checkout from '@/pages/checkout/checkout'
import OrderDetail from '@/pages/orders/detail/detail'
import OrderList from '@/pages/orders/list/list'
import Mine from '@/pages/mine/mine'
import DistributionIndex from '@/pages/distribution/index/index'
import DistributionTeam from '@/pages/distribution/team/team'
import DistributionRakeback from '@/pages/distribution/rakeback/rakeback'
import DistributionRakebackrecord from '@/pages/distribution/rakebackrecord/rakebackrecord'


Vue.use(Router)

export default new Router({
    mode : 'history',
    routes: [{   
        path : '/', 
        component : Home 
    },{
        path : '/home', 
        component  : Home
    },{
        path : '/detail',
        component : Detail
    },{
        path : '/checkout',
        component : Checkout
    },{
        path : '/orders/detail',
        component : OrderDetail
    },{
        path : '/orders/list',
        component : OrderList
    },{
        path : '/mine',
        component : Mine
    },{
        path : '/distribution/index',
        component : DistributionIndex
    },{
        path : '/distribution/team',
        component : DistributionTeam
    },{
        path : '/distribution/rakeback',
        component : DistributionRakeback
    },{
        path : '/distribution/rakebackrecord',
        component : DistributionRakebackrecord
    }]
})
