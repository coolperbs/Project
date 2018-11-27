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
			    text : '照片直播',
			    en : 'Photo live broadcast',
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
			},/*{
			    text : '健身',
			    en : 'Exercise',
			    value : 7
			},*/{
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
		},

		7 : {
			id : 'news2',
			sorts : [{
			    text : '境外人员服务',
			    en : 'Service for overseas personnel',
			    value : 1
			},{
			    text : '医疗服务',
			    en : 'Medical service',
			    value : 2
			},{
			    text : '教育服务',
			    en : 'Education Service',
			    value : 3
			},{
			    text : '应急服务',
			    en : 'Emergency service',
			    value : 4
			}/*,{
			    text : '服务机构',
			    en : 'Service organization',
			    value : 5
			}*/],
			search : true			
		},
		8 : {
			id : 'news2',
			sorts : [{
			    text : '旅游',
			    en : 'Tourism',
			    value : 1
			},{
			    text : '购物',
			    en : 'Shopping',
			    value : 2
			},{
			    text : '美食',
			    en : 'Delicious food',
			    value : 3
			},{
			    text : '运动',
			    en : 'Sports',
			    value : 4
			},{
			    text : '中介服务',
			    en : 'Intermediary services',
			    value : 5
			}],
			search : true			
		},
		9 : {
			id : 'news2',
			sorts : [{
			    text : '活动计划',
			    en : 'Activity Plans',
			    value : 1
			},{
			    text : '品牌项目',
			    en : 'Star Projects',
			    value : 2
			},{
			    text : '照片直播',
			    en : 'Photo live broadcast',
			    value : 3
			}/*,{
			    text : '报名方式',
			    en : 'Registration',
			    value : 4
			}*/],
			search : true			
		},
		10 : {
			id : 'news2',
			title : '政策介绍',
			en : 'Policy introduction',
			search : true			
		},
		11 : {
			id : 'news2',
			title : '入住企业',
			en : 'Settled Enterprise',
			search : true			
		}
	}

	module.exports = handle;
} );