;
(function () {
	var handle, _fn, CFG, ROUTER, kayak, kDom, _TOUCH, HASH, temps = [],
		prevUrl, menuData;

	CFG = {
		CONTAINER_CLS: 'J_Menu',
		TREE_MENU_CLS: 'cabinTreeMenu'
	}
	handle = {
		classname: 'cabin-menu',
		jView: null,
		init: function () {
			_fn.init();
			_fn.render();
			_fn.bind();
			_fn.selectMenu();
		}
	}
	_fn = {
		init: function () {
			if (handle.inited) {
				return;
			}
			handle.jView = kDom.get(handle.classname, $('.' + CFG.CONTAINER_CLS));
			handle.inited = true;
		},
		//渲染模块
		render: function () {
			var jView = handle.jView;
			jView.kInsert();

			var temp = _fn.getTemp('J_menuTemp');
			jView.find('.J_menuCont').html(temp({
				menuList: menuData
			}));
		},
		bind: function () {
			if (handle.hasBind) {
				return;
			}
			$(window).on('hashchange', function () {
				_fn.selectMenu(); //根据hash改变修改menu样式
			});
			handle.jView.on('click', function (e) {
				var jTarget = $(e.target);
				switch (true) {
					case _fn.isIn(jTarget, 'menu-sublist'): //点击关闭或展开菜单
						_fn.changeMenu(jTarget);
						break;
				}
			});
			handle.hasBind = true;
		},
		//根据hash改变修改menu样式
		selectMenu: function () {
			var hash = ROUTER.currentPath.split('/')[2],
				elm = handle.jView.find('.menu-sublist-txt[data-type="' + hash + '"]'),
				thisDom = elm.parents('.menu-sublist'),
				thisParent = thisDom.parents('.menu-list'),
				allSubLists = handle.jView.find('.menu-sublist'),
				allParentLists = handle.jView.find('.menu-list');

			allSubLists.removeClass('active');
			allParentLists.removeClass('active');
			thisDom.addClass('active');
			thisParent.addClass('active');
		},
		//切换菜单
		changeMenu: function (jTarget) {
			var thisDom = jTarget.hasClass('menu-sublist') ? jTarget : jTarget.parents('.menu-sublist'),
				parentDom = thisDom.parents('.menu-list'),
				allSubLists = handle.jView.find('.menu-sublist'),
				allParentLists = handle.jView.find('.menu-list'),
				url;
			if (!thisDom.length || thisDom.hasClass('active')) {
				return;
			}
			allSubLists.removeClass('active');
			allParentLists.removeClass('active');
			thisDom.addClass('active');
			parentDom.addClass('active');
			url = thisDom.find('.menu-sublist-txt').attr('data-url');
			ROUTER.go(url);
		},
		//获取模块
		getTemp: function (tempClass) {
			var jView = handle.jView;
			temps[tempClass] = template.compile(jView.find('.' + tempClass).text());
			return temps[tempClass];
		},
		//判断是否是查找元素
		isIn: function (jTarget, cls) {
			if (jTarget.hasClass(cls) || jTarget.parents('.' + cls).length > 0) {
				return true;
			}
			return false;
		},
		//判断是否空对象
		isEmptyObject: function (obj) { //判断空对象
			if (typeof obj === "object" && !(obj instanceof Array)) {
				var hasProp = false;
				for (var prop in obj) {
					hasProp = true;
					break;
				}
				if (hasProp) {
					return false;
				}
				return true;
			}
		}
	}
	define('cabin/modules/menu/menu', function (require, exports, module) {
		require('cabin/modules/menu/menu.css');
		require('cabin/modules/menu/menu.tpl');
		HASH = require('cabin/common/hash/hash');

		//menu配置数据
		menuData = require('cabin/config/menuconfig');

		kayak = require('kayak/core/kayak');
		ROUTER = require('kayak/core/router/router');
		kDom = kayak.dom;
		_TOUCH = ('ontouchend' in document) ? 'touchstart' : 'click';
		module.exports = handle;
	});
})();
