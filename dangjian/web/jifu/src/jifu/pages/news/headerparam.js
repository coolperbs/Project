define( 'jifu/pages/news/headerparam', function( require, exports, module ) {
	var handle;

	handle = {
		1 : {
			id : 'news1',
			/*title : '党员模范带动',*/
			sorts : [/*{
			    text : '党员大数据',
			    en : 'Party members big data',
			    value : 1
			},*/{
			    text : '心得体会',
			    en : 'Experience',
			    value : 2
			},{
			    text : '示范行动',
			    en : 'Demonstration action',
			    value : 3
			}],
			search : true
		},
		2 : {
			id : 'news2',
			/*title : '区域多方联动',*/
			sorts : [{
			    text : '多方协调',
			    en : 'Multiparty coordination',
			    value : 1
			},{
			    text : '宜居生活',
			    en : 'Livable life',
			    value : 2
			},{
			    text : '共建生活',
			    en : 'Build life together',
			    value : 3
			}],
			search : true			
		},
		3 : {
			id : 'news3',
			sorts : [{
			    text : '非物质文化遗产',
			    en : 'Intangible cultural heritage',
			    value : 1
			},{
			    text : '民族党建工作',
			    en : 'National Party Building',
			    value : 2
			},{
			    text : '民族文化展示',
			    en : 'National culture display',
			    value : 3
			},{
			    text : '相关制度',
			    en : 'Related system',
			    value : 4
			}],
			search : true			
		},
		4 : {
			id : 'news4',
			title : '三社齐力互动',
			en : 'Organizational interaction',
			search : true			
		},
		6 : {
			id : 'news6',
			sorts : [{
				value : 1,
				text : '自组织',
				en : ''
			},{
				value : 2,
				text : '百姓故事汇',
				en : ''
			}]
		}
	}

	module.exports = handle;
} );