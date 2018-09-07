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
import DistributionRank from '@/pages/distribution/rank/rank'
import DistributionOrders from '@/pages/distribution/orders/orders'
import DistributionCrashAccount from '@/pages/distribution/crashaccount/crashaccount'
import Invite from '@/pages/invite/invite'
import FocusOA from '@/pages/focusoa/focusoa'
import ServiceCenterFindECode from '@/pages/servicecenter/findecode/findecode'

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
        component : OrderList,
        meta: {
            keepAlive: true // 需要被缓存
        }
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
    },{
        path : '/distribution/rank',
        component : DistributionRank
    },{
        path : '/distribution/orders',
        component : DistributionOrders
    },{
        path : '/distribution/crashaccount',
        component : DistributionCrashAccount
    },{
        path : '/invite',
        component : Invite
    },{
        path : '/focusoa',
        component : FocusOA
    },{
        path : '/servicecenter/findecode',
        component : ServiceCenterFindECode
    }]
})
