define( 'cabin/test/page1/page1', function( require ) {
	var Page = require('cabin/page/page');

	var handle = Page({
		nodeClass: 'cabin-test1',
		tpl : 'a',
		//parentClass: 'J_Main', // 没有就直接插入body，或者不插入
		source: ['cabin/test/page1/paged1.css','cabin/test/page1/page1.tpl'],		
		enter : function() {
			alert();
		},
		exit : function() {
			alert( 1 );
		},
		on : {
			// 绑定点击事件等
			'click .btn' : function( e ) {

			},
			'mouseover .tt' : function() {
				
			}
		}
	});

	return handle;
} );