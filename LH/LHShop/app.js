//var user = require( 'service/user/user' );
//var uuid = require( 'common/uuid/uuid' );
var config = require( './config' );
var weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
var _fn;
var ajax = require( './common/ajax/ajax' );


var conf = wx.getExtConfigSync ? wx.getExtConfigSync() : {};

conf.host = conf.host || config.host;
conf.appid = conf.appid || 'wxaccdda8d2e9e827e';
conf.secret = conf.secret || '60088a714462ddd6fb59bb7b8bbe2a1c';
conf.title = conf.title || '商城';
conf.uid = conf.cid || 4442 || 2274;
conf.actHost = config.actHost;

ajax.setGlobalParam( conf );

var handle = {
	//host : 'https://hotelgateway.yimeixinxijishu.com',
	host : conf.host,
	actHost : conf.actHost,
	config : conf,
	shareFunc : function() {
		var upperuid = wx.getStorageSync( 'upperuid' ),
			url = 'pages/index/index';

		if ( upperuid ) {
			url += '?upperuid=' + upperuid
		}
		return {
			title : conf.title,
			path : url
		}
	},
	globalData:{
		evt:"dev"//使用环境
	},
	onLaunch : function() {
		wx.removeStorageSync( 'city' );
	},
	onShow:function( options ){
		//wx.showToast( { title : options.scene + '' } );
		//wx.showModal( { content : JSON.stringify( options ), title : '场景值获取' } );
		// 这里对页面scene进行透传，然后页面内消费后进行删除
		//options.q = 'a=1&b=2';
		var scene,
			query = options.query,
			upperuid = query.upperuid,	// 直接分享过来的
			str;

		scene = _fn.getQ( options.q ) || query.scene || options.scene || '';
		//console.log( scene );
		//console.log( options.scene );
		scene = scene ? decodeURIComponent( scene ) : '';
		// 处理分销逻辑
        if ( scene.indexOf( 'upperuid_' ) == 0 ) {
            str = options.scene.split( '_' );
            upperuid = str[1] || '';
        }

        // if ( scene.length > 0 ) {
        // 	this.scene = scene;
        // }

        upperuid = wx.getStorageSync( 'upperuid' ) || upperuid;
        wx.setStorageSync( 'upperuid', upperuid );
        this.bindUpperUid( upperuid );
		// _fn.setDate();
		// _fn.setCity();
		// _fn.getLocation();
	},
	bindUpperUid : function( upperuid ) {
		var hasBind = wx.getStorageSync( 'hasBind' ),
			userInfo = wx.getStorageSync( 'userinfo' ) || {};

		upperuid = upperuid || wx.getStorageSync( 'upperuid' );
		if ( !upperuid || !userInfo || !userInfo.token ) {
			return;
		}

		// if ( hasBind ) {
		// 	return;
		// }

		// upperuid是自己的情况，自己成为分销商就能分享了
		// if ( userInfo && userInfo.user && userInfo.user.id == upperuid  ) {
		// 	wx.removeStorageSync( 'upperuid' );
		// 	return;
		// }
		ajax.query( {
			url : this.host + '/app/binding',
			param : {
				parentUserId : upperuid
			}
		}, function( res ) {
			if ( res.code == '0000' || res.code == '1003' ) {
				wx.setStorageSync( 'hasBind', true );
			}
		} );
	}
};

_fn = {
	getQ : function( q ) {
		q = q || '';
		var result = '';

		q = decodeURIComponent( q );
		q = _fn.urlToObj( q );
		result = decodeURIComponent( q.scene || '' );

		//console.log( q );
		return result || '';
	},

	urlToObj : function( str ) {
		str = str || '';
		var result = {},
			i, len, sub;

		str = str.split( '&' );
		for ( i = 0, len = str.length; i < len; ++i ) {
			sub = str[i].split( '=' );
			if ( sub.length == 2 ) {
				result[sub[0]] = sub[1];
			}
		}

		return result;
	}
}

App( handle );

