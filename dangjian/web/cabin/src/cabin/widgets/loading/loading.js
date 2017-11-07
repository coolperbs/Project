;
(function () {
	var kayak, kDom, handle, _fn, CFG;

	CFG = {
		SHOWTIME: 2000,
		HIDETIME: 800,
		TIMESTEP: 1500,
		SHOW_CLS: 'show'
	}

	handle = {
		className: 'cabin-widgets-loading',
		initView: false,
		jView: null,
		jBox: null,
		timmer: null,
		startTime: null,
		show: function (time) {
			time = time || 0;
			_fn.initView();
			handle.jView.kInsert();

			var jView = handle.jView,
				jBox = handle.jBox || jView.find('.vertical-box');

			handle.jView = jView;
			handle.jBox = jBox;
			if (time > 0) {
				handle.timmer = setTimeout(function () {
					handle.startTime = (new Date()).getTime();
					jView.addClass(CFG.SHOW_CLS);
				}, time);
				return;
			}
			handle.startTime = (new Date()).getTime();
			jView.addClass(CFG.SHOW_CLS);

		},

		hide: function () {
			var jView = handle.jView,
				jBox = handle.jBox || jView && jView.find('.vertical-box') || null,
				time;

			if (handle.timmer) {
				clearTimeout(handle.timmer);
			}
			/*			time = ( new Date() ).getTime();
						time = time - handle.startTime;
						time = time >= CFG.TIMESTEP ? 0 : CFG.TIMESTEP;*/
			time = 0;
			// 至少动画显示一秒,让动画播放完毕
			setTimeout(function () {
				if (!jView || !jBox) {

					_fn.exit();

				} else {
					jView.removeClass(CFG.SHOW_CLS);

					//fix 有可能没有触发 transitionend 情况 出现不能关闭情况
					setTimeout(function () {
						_fn.exit();
					}, CFG.HIDETIME);
				}
			}, time);
		}
	}

	_fn = {
		initView: function () {
			if (handle.initView) {
				return;
			}
			handle.jView = kDom.get(handle.className, kayak.jBody);
			handle.initView = true;
		},
		exit: function () {
			var jView = handle.jView;
			if (!jView) {
				return;
			}
			jView.kRemove();
		}
	}

	define('cabin/widgets/loading/loading', function (require, exports, module) {
		require('cabin/widgets/loading/loading.tpl');
		require('cabin/widgets/loading/loading.css');

		kayak = require('kayak/core/kayak');
		kDom = kayak.dom;

		module.exports = handle;
	});
})();
