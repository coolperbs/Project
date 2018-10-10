define( 'tongzilin/pages/news/headerparam', function( require, exports, module ) {
	var handle;

	handle = {
		1 : {
			id : 'news1',
			title : '组织孵化',
			en : 'Social organization incubation base',
			search : true
		},
		2 : {
			id : 'news2',
			sorts : [{
			    text : '非物质文化遗产',
			    en : 'Intangible cultural heritage',
			    value : 1
			},{
			    text : '节庆活动',
			    en : 'Festival activities',
			    value : 2
			},{
			    text : '兴趣爱好',
			    en : 'Hobbies & interests',
			    value : 3
			},{
			    text : '艺术展览',
			    en : 'Exhibition',
			    value : 4
			}],
			search : true			
		},
		3 : {
			id : 'news3',
			sorts : [{
			    text : '就学',
			    en : 'Education',
			    value : 1
			},{
			    text : '医疗',
			    en : 'Medical care',
			    value : 2
			},{
			    text : '运动',
			    en : 'Sports',
			    value : 3
			},{
			    text : '宗教',
			    en : 'Religion',
			    value : 4
			},{
			    text : '购物',
			    en : 'Shopping',
			    value : 5
			},{
			    text : '旅游',
			    en : 'Tourism',
			    value : 6
			},{
			    text : '健身',
			    en : 'Exercise',
			    value : 7
			},{
			    text : '应急',
			    en : 'Emergency',
			    value : 8
			}],
			search : true			
		},
		4 : {
			id : 'news2',
			title : '邻里融合',
			en : 'Community News',
			search : true			
		},
		5 : {
			id : 'news2',
			title : '信息平台',
			en : 'Information platform',
			search : true			
		}
	}

	module.exports = handle;
} );