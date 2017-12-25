var modules = require( '../../widgets/modules/modules.js' );
var weigetUtil = require('../../common/utils/weigetUtil');
var Tab = weigetUtil.tab;
var List = weigetUtil.List;
var config = require('../../config');
var host = config.host;
var utils = require('../../common/utils/utils');



Page({
    onShow:function(){
        var self = this;
        _fn.init(self);
    },
    getNext:function(e){
        var self = this;
        console.log(333);
        self.listWeiget.next();
    },
    toDetail:function(e){
        var sku = e.currentTarget.dataset.sku;
        console.log(333,sku);
        wx.navigateTo({
            url:'/pages/detail/detail?id='+sku
        })
    

    }
});
var _fn = {
    init:function(page){
        wx.getSystemInfo({
			success:function(res){
				console.log(res);
				page.setData({
					height:res.screenHeight+'px'
				});
			}
		});
		page.listWeiget = page.listWeiget || new List({
            // url:host+'/groupon/product/list',
			url:host+'/app/address/list',
			// isSingle:true,
			render:function(data){
				page.setData({
					grouponList:data.totalData
				});
			},
			getList:function(res){
				return [
                    {
                        "activityHour": 6,
                        "bannerImage": "http://yimeiimage.oss-cn-shenzhen.aliyuncs.com/201712/8f557ee1-b5c9-4ecd-8e15-a5364b863d83",
                        "id": 1,
                        "quantity": 3,
                        "shopId": 100042,
                        "skuDesc": "ASDKJSHDFKSJDKSJJKDJFSJDF",
                        "skuOriPrice": 1000.23,
                        "skuPrice": 0.01,
                        "skuTitle": "KKAKSKDAK",
                        "venderId": 2274,
                        "wareSkuId": 100866
                    },
                    {
                        "activityHour": 12,
                        "bannerImage": "http://yimeiimage.oss-cn-shenzhen.aliyuncs.com/201712/8f557ee1-b5c9-4ecd-8e15-a5364b863d83",
                        "id": 2,
                        "quantity": 5,
                        "shopId": 100042,
                        "skuDesc": "考试打击是多少蔷薇蔷薇123424alsdlkasd",
                        "skuOriPrice": 666.22,
                        "skuPrice": 2.19,
                        "skuTitle": "杀戮都市",
                        "venderId": 2274,
                        "wareSkuId": 100866
                    },
                    {
                        "activityHour": 6,
                        "bannerImage": "http://yimeiimage.oss-cn-shenzhen.aliyuncs.com/201712/e04e5d80-8f61-423e-bb2a-9ee12578760c",
                        "id": 3,
                        "quantity": 3,
                        "shopId": 100042,
                        "skuDesc": "水电费水电费是的方式方式",
                        "skuOriPrice": 123,
                        "skuPrice": 3,
                        "skuTitle": "是否大是大非是",
                        "venderId": 2274,
                        "wareSkuId": 100866
                    },
                    {
                        "activityHour": 6,
                        "bannerImage": "http://yimeiimage.oss-cn-shenzhen.aliyuncs.com/201712/6b9c66c9-8d2c-4566-8abb-ccc722c9701b",
                        "id": 4,
                        "quantity": 3,
                        "shopId": 100042,
                        "skuDesc": "水电费水电费是",
                        "skuOriPrice": 2223.23,
                        "skuPrice": 24.23,
                        "skuTitle": "实打实地方",
                        "venderId": 2274,
                        "wareSkuId": 100866
                    }
                ];

			},
			getHasMore:function(res){
				return true;
			}
		});
		page.listWeiget.next();
	},

}