require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../..//pages/index/index');
require('../..//pages/date/date');
require('../..//pages/detail/detail');
require('../..//pages/info/info');
require('../..//pages/checkout/checkout');
require('../..//pages/orderinfo/orderinfo');
require('../..//pages/artical/artical');
require('../..//pages/articallist/articallist');
require('../..//pages/city/city');
require('../..//pages/login/login');
require('../..//pages/map/map');
require('../..//pages/shopdetails/shopdetails');
require('../..//pages/fx-money/fx-money');
require('../..//pages/fx-team/fx-team');
require('../..//pages/fx-takemoney/fx-takemoney');
require('../..//pages/orderlist/orderlist');
require('../..//pages/orderdetail/orderdetail');
require('../..//pages/address/address');
require('../..//pages/addresslist/addresslist');
require('../..//pages/coupon-mine/coupon-mine');
require('../..//pages/coupon-fetch/coupon-fetch');
require('../..//pages/coupon-use/coupon-use');
require('../..//pages/comment/comment');
require('../..//pages/commentlist/commentlist');
require('../..//pages/favorite/favorite');
require('../..//pages/aftersale/aftersale');
require('../..//pages/aftersalelist/aftersalelist');
require('../..//pages/search/search');
require('../..//pages/join/join');
require('../..//pages/active/active');
require('../..//pages/shop/shop');
require('../..//pages/subscribe/subscribe');
require('../..//pages/subscribeinfo/subscribeinfo');
require('../..//pages/cashdetail/cashdetail');
require('../..//pages/scoredetail/scoredetail');
require('../..//pages/wallet/wallet');
require('../..//pages/pointToMoney/pointToMoney');
require('../..//pages/seckilllist/seckilllist');
require('../..//pages/gp-index/gp-index');
require('../..//pages/gp-detail/gp-detail');
require('../..//pages/gp-waredetail/gp-waredetail');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();