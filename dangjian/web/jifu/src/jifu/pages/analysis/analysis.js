define( 'jifu/pages/analysis/analysis', function( require, exports, module ) {
	require( 'jifu/pages/analysis/analysis.css' );
	require( 'jifu/pages/analysis/analysis.tpl' );
	var handle, CFG, _fn, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		header = require( 'jifu/widgets/header/header' ),
		pop = require( 'jifu/widgets/pop/pop' ),
		ajax = require( 'jifu/common/ajax/ajax' ),
		utils = require( 'jifu/common/utils/utils' ),
		config = require( 'jifu/config/config' ),
		self,
		kDom = kayak.dom,
		router = kayak.router;

	handle = Page( {
		nodeClass: 'w-p-analysis',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/menu/menu.tpl'],
        show : function() {
        	self= this;
        	header.showSub( { title : '党员信息' } );
        	_fn.getData( function( res ) {
        	} );
        	//_fn.render();
        },
        hide : function() {
        	
        }
	} );

	_fn = {
		getData : function() {
			ajax.query( config.url.analysis, {}, function( res ) {
				if ( utils.isErrorRes( res ) ) {
					pop.show( { msg : res.msg || '系统错误' } );
					return;
				}
				_fn.render( res.data );
				console.log( res );
			} );
		},

		render : function( data ) {
			var jView = self.jView;
			_fn.renderPie(  jView.find( '.J_Ages' )[0], data.ageInfo );
			_fn.renderPie( jView.find( '.J_PartyAges' )[0], data.partyAgeInfo );
			_fn.renderLine( jView.find( '.J_AgeRank')[0], data.topPartyAge, 'organizationCount' );
			_fn.renderLine( jView.find( '.J_PointRank')[0], data.topPoint, 'userPoint' );
			//_fn.renderPartyAge();
			//_fn.renderAgeTop();
			//_fn.renderPointTop();
		},
		renderPie : function( el, ageInfo ) {
			var chart = echarts.init( el );
			var data = [], key = [], i, len;

			for ( i = 0, len = ageInfo.length; i < len; ++i ) {
				if ( ageInfo[i].levelName != '其他' ) {	
					data.push( { value : utils.mul( ageInfo[i].scale, 100 ), name : ageInfo[i].levelName } );
				}
				key.push( ageInfo[i].levelName );

			}
			var option = {
				color : [ '#FF502E ', '#FFC107', '#41C9CB', '#DBC095', '#FFE4B5', '#ccc' ],
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {d}%"
			    },
			    series: [
			        {
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: true,
			                    color : '#434552',
			                    position: 'layoutCenter'
			                },
			                emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '30',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                	lineStyle: {
			                        color: '#434552'
			                    },
			                    show: true
			                }
			            },
			            data: data
			        }
			    ]
			};

			chart.setOption(option);
		},
		renderLine : function( el, obj, k ) {
			var jView = self.jView;
		    var myChart = echarts.init( el );
		    var data = [], key = [], i, len;

		    // 只取前5个
			for ( i = 0, len = 5; i < len; ++i ) {
				data.unshift( obj[i][k] );
				key.unshift( obj[i].userName );
			}

		    var option = {
		        title : {
		            text: '',
		            subtext: ''
		        },
		        tooltip : {
		            trigger: 'item'  //悬浮提示框不显示
		        },
		        grid:{   //绘图区调整
		            x:150,  //左留白
		            y:10,   //上留白
		            x2:10,  //右留白
		            y2:10   //下留白
		        },
		        xAxis : [
		            {
		                show:false,
		                type : 'value',
		                boundaryGap : [0, 0],
		                position: 'top'
		            }
		        ],
		        grid: {
			        left: '6%',
			        top: '10%',
			        bottom : '10%',
			        containLabel: true
			    },
		        yAxis : [
		            {
		                type : 'category',
		                data : key,
		                axisLine:{show:false},     //坐标轴
		                axisTick:[{    //坐标轴小标记
		                    show:false
		                }],
		                axisLabel:{
		                    textStyle:{
		                    	color : '#434552'
		                        //fontSize:'30rem'
		                    }
		                }
		            }
		        ],
		        series : [
		            {
		                name:'',
		                type:'bar',
		                tooltip:{show:false},
		                barMinHeight : 10,  //最小柱高
		                barWidth: 20,  //柱宽度
		                barMaxWidth: 20,   //最大柱宽度
		                data: data,
		                itemStyle:{
		                    normal:{    //柱状图颜色
		                        color:'#ff6600',
		                        label:{
		                            show: true,   //显示文本
		                            position: 'inside',  //数据值位置
		                            textStyle:{
		                                color:'#fff'
		                            }
		                        }
		                    }
		                }
		            }
		        ]
		    };
		//          window.onresize = function () {  //适应页面
		//              myChartContainer();
		//              myChart.resize(); 
		//          }
		    myChart.setOption(option);
		}
	}

	module.exports = handle;
} );
