var ajax = require( '../../common/ajax/ajax' ),
	service = require( '../../service/service' ),
	utils = require( '../../common/utils/utils' ),
	modules = require( '../../widgets/modules/modules.js' ),
	app = getApp(),
	pageParam, hasMore, 
	currentPage = 0,
	isGetMore = false,
	hasMore = true,
	buyType = 1, // 1为购物车购买，2为直接购买
	_fn;

Page({
	onShareAppMessage : app.shareFunc,
	data : {
		favorite : {},
		buyNum : 1,
		pop : {
			show : false
		},
		tab : {
			current : 'imgs'
		}
	},
	previewImage : function() {
		var images = this.data.pageData || {};
		images = images.mainImage || [];

		wx.previewImage( {
			urls : images
		} );
	},	
	moduleClickProxy : function( e ) {
		var target = e.currentTarget;
		if ( target.dataset && target.dataset.fn && modules.events[target.dataset.fn] ) {
	  		modules.events[target.dataset.fn].call( this, e );
		}
	},
	onLoad : function( param ) {
		var scene = param.scene || '';
		pageParam = param || {};

		scene = decodeURIComponent( scene );
		if ( scene.indexOf( 'skuid_' ) == 0 ) {
			pageParam.id = scene.split( '_' )[1];
		}
		//app.scene = ''; // 使用之后立即清空

		isGetMore = false;
		hasMore = true;
		currentPage = 0;
	},
	onShow : function() {
		var self = this;
		buyType = 1; // 默认为购物车购买
		service.cart.refreshNum( this );
		_fn.getPageData( this,function(res){
			_fn.renderGrouponList(self);
		} );
		_fn.getComment( this );
		_fn.renderGrouponBtn(this);
	},

	// 添加购物车
	addCart : function( e ) {
		var pageData = this.data.pageData;
		buyType = 1;

		// 有规格情况
		if ( pageData.saleProSku ) {
			this.showPop();
			return;
		}
		// 如果没有规格参数 就直接加购
		this.submit();
	},

	buyNow : function() {
		var pageData = this.data.pageData;
		buyType = 2;

		// 有规格情况
		if ( pageData.saleProSku ) {
			this.showPop();
			return;
		}		
		// 如果没有规格就直接购买
		this.submit();
	},

	submit : function() {
		var pageData = this.data.pageData || {};
		
		this.hidePop();
		if ( !pageData.skuId ) {
			wx.showToast( {
				title : '缺少skuId'
			} );
			return;
		}

		if ( buyType == 2 ) {	// 立即购买
			_fn.toCheckout();
		} else if ( buyType == 1 ) { //加购
			service.cart.addOut( this, {
				skuId : pageData.skuId,
				skuNum : this.data.buyNum
			}, function( res ) {
				if ( res.code == '1000' ) {
					wx.navigateTo( { url : '../login/login' } );
					return;
				}
				if ( utils.isErrorRes( res ) ) {
					return;
				}
				wx.showToast( { title : '添加成功!' } );
			} );
		}
	},
	showPop : function() {
		this.setData( {
			'pop.show' : true,
			buyNum : 1
		} );
	},
	hidePop : function() {
		this.setData( {
			'pop.show' : false
		} );
	},
	changeTab : function( e ) {
		var data = e.currentTarget.dataset;
		this.setData( {
			'tab.current' : data.id
		} );
	},
	toCart : function() {
		utils.topToHome( 'cart' );
	},

	minus : function() {
		var num = this.data.buyNum;

		if ( num == 1 ) {
			return;
		}
		this.setData( {
			buyNum : --num 
		} );
	},

	plus : function() {
		var num = this.data.buyNum;

		if ( num == 99 ) {
			return;
		}
		this.setData( {
			buyNum : ++num 
		} );
	},

	changePros : function( e ) {
		var dataset = e.currentTarget.dataset,
			id = dataset.id,
			level = dataset.level,
			skuId;

		skuId = _fn.getSkuId( this, { id : id, level : level } );
		if ( skuId == this.data.pageData.skuId ) {
			return;
		}
		pageParam = pageParam || {};
		pageParam.id = skuId;
		_fn.getPageData( this );
	},

	follow : function() {
		var self = this,
			data = self.data,
			param,
			favorite = data.pageData.favorite;

		favorite = favorite == 1 ? 2 : 1;
		param = {
			type : 1,
			skuId : data.pageData.skuId			
		}
		if ( favorite == 2 ) {
			param.favoriteId = self.data.pageData.favoriteId;
		}

		_fn.follow( param, function( res ) {
			var title;
			if ( utils.isErrorRes( res ) ) {
				return;
			}

			title = res.data.favoriteId ? '收藏成功' : '取消收藏成功';
			wx.showToast( { title : title } );
			self.setData( {
				'pageData.favoriteId' : res.data.favoriteId || data.pageData.favoriteId,
				'pageData.favorite' : favorite
			} );
		} );
	},
	getMore : function() {
    	var data = this.data;
    	if ( !hasMore || isGetMore ) {
    		return;
    	}
    	isGetMore = true;
    	_fn.getLike( this, {
    		currentPage : currentPage + 1
    	} );
	},
	joinGroupon:function(e){
		var grouponId = e.currentTarget.dataset.grouponid;
		var productId = e.currentTarget.dataset.productid;
		wx.redirectTo({
			url:'/pages/gp-waredetail/gp-waredetail?grouponId='+grouponId+'&id='+productId
		});
	},
	onUnload:function(e){
		var self =this;
		clearInterval(self.timeCounterId);
	}
});

_fn = {
	getLike : function( caller, param ) {
		var data = caller.data;

		param = param || {};
		param.currentPage = param.currentPage || 1;
		param.citycode = wx.getStorageSync('city').code||'010';
		// param.shopId = data.pageData.shopId;

		utils.showLoading( 300 );
		ajax.query( {
			// url : app.host+'/app/ware/like',
			url:app.host+'/groupon/product/recommend',
			param : param
		}, function( res ) {
			utils.hideLoading();
			isGetMore = false;
			var wareSkus, newData;
			if ( utils.isErrorRes( res ) ) {
				return;
			}

			currentPage = res.data.currentPage;
			//hasMore = true;
			hasMore = res.data.hasMore;
			if ( param.currentPage != 1 ) {
				wareSkus = caller.data || {};
				//wareSkus = wareSkus.pageData || {};
				wareSkus = wareSkus.moduleList || [];
				wareSkus = wareSkus[0] || {};
				wareSkus = wareSkus.data || {};
				wareSkus = wareSkus.wareSkus || [];
			} else {
				wareSkus = [];
			}
			res.data = res.data || {};
			res.data.wareSkus = res.data.productList || [];
			wareSkus = wareSkus.concat( res.data.productList );
			newData = [{
				modulePrototypeId : 1,
				templatePrototypeId : 2,
				data : {
					wareSkus : wareSkus
				}					
			}];
			
			if ( param.currentPage == 1 ) {
				newData.scrollTop = 0;
			}
			caller.setData( {
				moduleList : newData
			} );
		} );
	},
	getSkuId : function ( caller, param ) {
		var attributes = caller.data.pageData.attributes || '',
			newKey = [], i, len;

		attributes = attributes.split( '^' );
		for ( i = 0,len = attributes.length; i < len; ++i ) {
			i == param.level ? newKey.push( param.id ) : newKey.push( attributes[i] );
		}
		newKey = newKey.join( '^' );
		return caller.data.pageData.saleProSku.prosku[newKey];
	},
	formatData : function( data ) {
		var list = {}, i = 0, len,
			attributes;

		attributes = data.attributes || '';
		attributes = attributes.split( '^' );
		for ( i = 0, len = attributes.length; i < len; ++i ) {
			list[attributes[i]] = true;
		}
		data.attributesObj = list;
		console.log( data );
		return data;
	},
	follow : function( param, callback ) {
		param = param || {};
		ajax.query( {
			url : app.host + '/app/favorite',
			param : param
		}, callback );
	},

	getComment : function( caller ) {
		ajax.query( {
			url : app.host+'/app/comment/list',
			param : {
				skuId : pageParam.id,
				level : 1
			}
		}, function( res ) {
			var i, c;
			if ( !res || !res.data ) {
				return;
			}

			res.data.comments = res.data.comments || [];
			for ( i = 0; c = res.data.comments[i]; ++i ) {
				c.commentCreatedObj = utils.timeToDateObj( c.commentCreated );
			}

			caller.setData( {
				comments : res.data.comments,
				allcomments : res.data.totalCount
			} );
			console.log( res );
		} );
	},

	getPageData : function( caller, callback ) {

	// http://shopgateway.yimeixinxijishu.com/groupon/product/ware/detail/{productId(活动列表中ID)}
		ajax.query( {
			url : app.host + '/groupon/product/ware/detail/' + pageParam.id
		}, function( res ) {
			if ( utils.isErrorRes( res ) ) {
				return;
			}
			res.data = _fn.formatData( res.data );
			caller.setData( {
				pageData : res.data
			} );
			callback && callback();
			
		} );
	},
	
	renderGrouponBtn:function(caller){
		// var pageParam = pageParam || {};
		var isJoinOtherGroupon = pageParam.grouponId?true:false;
		caller.setData({isJoinOtherGroupon:isJoinOtherGroupon});
	},
	renderGrouponList:function(caller){
		// console.log(333);
		// var pageParam = pageParam || {};
		var grouponList = caller.data.pageData.grouponList||[];
		var pageGrouponList = [];//显示在页面上的拼团
		// var popGrouponList = [];//显示在pop上的拼团
		grouponList.forEach((v,k)=>{
			if(v.userList&&v.userList.length>0){
				pageGrouponList.push({
					productId:pageParam.id,
					grouponId:v.id,
					overdueTime:v.overdueTime,
					master:v.userList.filter((v,k)=>{
						return v.master === 1;
					})[0],
					left:v.quantity-v.userList.length
				});
			}
		});
		caller.setData({grouponList:pageGrouponList});
		_fn.startTimeCounter(caller);
	},
	startTimeCounter:function(caller){
		caller.timeCounterId = setInterval(function(){
			var grouponList = caller.data.grouponList||[];
			var curTime = new Date().getTime();
			grouponList.map(function(v,k){
				var leftTime = v.overdueTime-curTime;
				if(leftTime>0){
					var leftTimeStr = "剩余 "
					var timeObj =  {
                        day :   Math.floor(leftTime/1000/60/60/24),
                        hoursStr:   ((Math.floor(leftTime/1000/60/60%24))/100).toFixed(2).split('.')[1],
                        minutesStr: ((Math.floor(leftTime/1000/60%60))/100).toFixed(2).split('.')[1],
                        secondsStr: ((Math.floor(leftTime/1000%60))/100).toFixed(2).split('.')[1],
                    };;
					if(timeObj.day/1>0){
						leftTimeStr = leftTimeStr + timeObj.day+'天'	
					}
					leftTimeStr = leftTimeStr + timeObj.hoursStr + ":"+timeObj.minutesStr+":"+timeObj.secondsStr;
					v.leftTimeStr = leftTimeStr;
				}else{
					v.leftTimeStr = '已结束';
				}
				return v
			});
			caller.setData({grouponList:grouponList});
		},1000);
	},
	toCheckout:function(callback){
		var url = "";
		var productId = pageParam.id;
		var grouponId = pageParam.grouponId;
		var city  = wx.getStorageSync( 'city' );
		var cityCode = city.code||'028';
		var url = app.host + '/app/trade/groupon/' +  cityCode;
		
		ajax.query( {
			url : url,
			param:{
				productId:productId,
				grouponId:grouponId
				// grouponId:grouponId||null
			}
		}, function(res){
			if(res.code==='0000'){
				var productId = pageParam.id;
				var grouponId = pageParam.grouponId;
				var redirectUrl ='../checkout/checkout?bizType=groupon&productId=' + pageParam.id
				if(grouponId){
					redirectUrl = redirectUrl+ '&grouponId='+grouponId;
				}
				wx.navigateTo( {
					url : redirectUrl
				} );
			}else if(res.code==='1000'){
				wx.navigateTo( { url : '../login/login' } );
			}else{
				wx.showModal({
					title:'提示',
					content:res.msg,
					showCancel:false
				})
			}
		});


	},
}


