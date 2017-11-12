define('cabin/layout/layout', function (require, exports, module) {
	var EVENTS_TYPE = ['inited'],
		events = {},
		default_opt,
		instances = {},
		layoutClass = require('cabin/layout/layout.class'),
		monitor = require('cabin/layout/monitor'),
		_fn;

	default_opt = { // 默认配置
		name: 'cabinindex',
		tpl: 'cabin/layout/index/index.tpl'
			// css : 'cabin/theme/cabin/layout.scss'
	}

	// layout应该是全局单例，所以写死
	function Layout(opt) {
		opt = $.extend(true, default_opt, opt);
		instances[opt.name] = new layoutClass(Layout, opt);
		return instances[opt.name];
	}

	$.extend(Layout, {
		on: function (event, callback) {
			if (EVENTS_TYPE.indexOf(event) < 0) {
				return;
			}
			events[event] = events[event] || $.Callbacks();

			if (event == 'inited' && events[event] && events[event].hasFired === true) { // 如果fire要立即执行下，callback有fire方法
				callback();
				return;
			}
			events[event].add(callback);
		},
		fire: function (event, param) {
			if (EVENTS_TYPE.indexOf(event) < 0) {
				return;
			}
			events[event] = events[event] || $.Callbacks();
			events[event].fire(param);
			events[event].hasFired = true;
			//events[event].fired();		// 这个逻辑需深思下
		},
		setCurrent: function (instance) {
			this.current = instance;
		}
	});

	// 事件组装
	monitor.on('inited', function (instance) {
		Layout.current = instance;
		if (!events['inited'].hasFired) {
			Layout.fire('inited');
		}
	});
	monitor.on('destroy', function () {
		events['inited'].empty();
		events['inited'].hasFired = false;
	});

	return Layout;
});
