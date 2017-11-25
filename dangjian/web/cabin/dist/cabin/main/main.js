(function () {
	var handle, kRouter = kayak.router,
		_fn;

	handle = {
		inited: false,
		init: function () {
			_fn.init();
		}
	}

	_fn = {
		init: function () {
			if (handle.inited) {
				return;
			}
			//_fn.filterPath();
			handle.inited = true;
		},
		filterPath: function () {
			kRouter.on('parseActions', function (p) {
				var path = (p.path + '').split('/');

				if (path.length == 1) {
					p.actionPath = 'cabin/demolayout/' + path[0] + '/' + path[0];
				}

				if (path.length == 3) {
					p.actionPath = path[1] + '/pages/' + path[2] + '/' + path[2];
				}
			});
		}
	}

	define('cabin/main/main', function (require, exports, module) {
		require('cabin/core/cabin');
		require('cabin/theme/cabin/cabin.css');
		handle.init();
		module.exports = handle;
	});
})();
