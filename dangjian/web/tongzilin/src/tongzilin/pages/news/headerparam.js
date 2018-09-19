define( 'tongzilin/pages/news/headerparam', function( require, exports, module ) {
	var handle;

	handle = {
		1 : {
			id : 'news1',
			title : '组织孵化',
			search : true
		},
		2 : {
			id : 'news2',
			sorts : [{
			    text : '非物质遗产',
			    value : 1
			},{
			    text : '节庆活动',
			    value : 2
			},{
			    text : '兴趣爱好',
			    value : 3
			},{
			    text : '艺术展览',
			    value : 4
			}],
			search : true			
		},
		3 : {
			id : 'news3',
			sorts : [{
			    text : '就学',
			    value : 1
			},{
			    text : '医疗',
			    value : 2
			},{
			    text : '运动',
			    value : 3
			},{
			    text : '宗教',
			    value : 4
			}],
			search : true			
		},
		4 : {
			id : 'news2',
			title : '邻里融合',
			search : true			
		},
		5 : {
			id : 'news2',
			title : '信息平台',
			search : true			
		}
	}

	module.exports = handle;
} );