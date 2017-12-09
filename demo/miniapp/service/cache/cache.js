var cache;
var handle = {
	// 缓存存储下,目前没有地址管理机制
	cache : function( value ) {
		if ( arguments.length == 0 ) {	// 读操作
			return cache || {};
		}
		cache = value; // 写操作
	},
	clear :function(){
		cache = null;
	}
}

module.exports = handle;