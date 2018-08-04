;
(function () {
	var kayak, kDom, handle, CFG, UTILS, currentConfig, _fn;

	CFG = {
			POP_CONT_CLS: 'J_minipopCont',
			POP_TEMP_CLS: 'J_minipopTemp',
			MASK_CLS: 'J_minipopMask',
			EVENT_ATTR: 'data-type'
		}
		//	MINIPOP.show({
		//		title: '我是标题',
		//		msg: '我是内容部分',
		//		ok:'我是确认'
		//		cancel: '我是取消',
		//      sort: 'left',//left(默认为left):cancel按钮在左，ok按钮在右,right:cancel按钮在右，ok按钮在左
		//		callback: function (el, type) {//el：点击的button，type：点击button的类型
		//
		//		}
		//	});
	handle = {
		className: 'cabin-widgets-minipop',
		jView: null,
		initView: false,
		inited: false,
		jPop: null,
		jMask: null,
		show: function (config) {
			currentConfig = config;
			_fn.initView();
			handle.jView.kInsert();

			var jView = handle.jView,
				jPop = handle.jPop,
				screenHeight = $(window).height();

			// 设置模板
			config.btnWidth = (100 / UTILS.getObjLength(config.btns)) + '%';
			var temp = UTILS.getTemp(CFG.POP_TEMP_CLS);
			jPop.html(temp(config));
			// 计算pop高度
			jView.show();
			jView.css('opacity', '0');
			_fn.resetPop();
			jView.animate({
				opacity: 1
			}, 200);
			//没有标题时，设置内容区域高度
			var head = handle.jView.find('.head'),
				content = handle.jView.find('.content');
			if (head.length == 0) {
				head.css('display', 'none');
				content.css('padding', '24px 10px 20px 10px');
			}
		},
		hide: function () {
			_fn.exit();
		}
	}

	_fn = {
		initView: function () {
			if (handle.initView) {
				return;
			}
			handle.jView = kDom.get(handle.className, kayak.jBody);
			_fn.initPop();
			handle.initView = true;
		},
		exit: function () {
			var jView = handle.jView || '';
			if (!jView) {
				return;
			}
			jView.hide();
			jView.kRemove();
		},
		initPop: function () {
			handle.jPop = handle.jView.find('.' + CFG.POP_CONT_CLS);
			handle.jMask = handle.jView.find('.' + CFG.MASK_CLS);
			_fn.bind();
		},
		bind: function () {
			var jMask = handle.jMask,
				jPop = handle.jPop,
				jView = handle.jView;
			// 页面
			jPop.on('click', function (e) {
				var jTarget = $(e.target);
				switch (true) {
					case _fn.isIn(jTarget, 'btn'):
						if (!currentConfig.callback) {
							jView.hide();
						} else {
							if (typeof currentConfig.callback === 'function') {
								var functionText = _fn.getFunctionText(currentConfig.callback);
								if (functionText.length < 1) { //callback没有方法体
									jView.hide();
								} else {
									var thisDom = jTarget.hasClass('btn') ? jTarget : jTarget.parents('btn'),
										type = thisDom.attr('data-type');
									currentConfig.callback($(jTarget), type);
									jView.hide();
								}
							}
						}
						break;
				}
			});
			// 一接触就关闭
			jMask.on('click', function (e) {
				e.preventDefault();
				jView.hide();
			});

			$(window).resize(function () {
				_fn.resetPop();
			});
		},
		resetPop: function () {
			var jPop = handle.jPop;

			jPop.css({
				marginTop: -(jPop.height() / 2 + 60),
				marginLeft: -(jPop.width() / 2)
			});
		},
		//判断是否是查找元素
		isIn: function (jTarget, cls) {
			if (jTarget.hasClass(cls) || jTarget.parents('.' + cls).length > 0) {
				return true;
			}
			return false;
		},
		//得到方法体
		getFunctionText: function (fun) {
			if (!fun) {
				return;
			}
			var funText = fun.toString();
			funText = funText.replace(/\s+/g, ""); //去掉所有空格

			//去掉function(){},得到方法体
			var index = funText.indexOf('{') + 1; //第一个{符号的位置
			funText = funText.substring(index).substring(0, funText.substring(index).length - 1); //得到方法体
			return funText;
		}
	}
	define('cabin/widgets/minipop/minipop', function (require, exports, module) {
		require('cabin/widgets/minipop/minipop.tpl');
		require('cabin/widgets/minipop/minipop.css');

		currentConfig = null;
		//修复点穿问题	
		UTILS = require('kayak/common/utils/utils');
		kayak = require('kayak/core/kayak');
		kDom = kayak.dom;

		module.exports = handle;
	});
})();
