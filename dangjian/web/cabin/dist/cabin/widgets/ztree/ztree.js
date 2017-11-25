(function () {
	var _fn, TIPS, OPTIONS = {
		view: {
			dblClickExpand: false, //是否双击打开
			showLine: false, //是否显示虚线
			showIcon: false,
			addDiyDom: function (treeId, treeNode) {
				_fn.addDiyDom(treeId, treeNode);
			}
		},
		search: true, //是否打开查询功能
		check: {
			enable: true, //是否打开CheckBox
			checkAll: true //是否打开全选功能（CheckBox必须先打开）
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onClick: function (e, treeId, treeNode, callback) {
				_fn.singleClick(e, treeId, treeNode); //单击节点展开
				if (callback) {
					callback(e, treeId, treeNode);
				}
			},
			onCheck: function (e, treeId, treeNode, callback) {
				_fn.allCheck(e, treeId, treeNode); //全选交互实现
				if (callback) {
					callback(e, treeId, treeNode);
				}
			}
		}
	};

	function CabinZtree(id, setting, treeNode) {
		this.id = null;
		this.setting = null;
		this.treeNode = null;
		this.zTree = null;
		_fn.init.call(this, id, setting, treeNode);
	}

	CabinZtree.prototype = {
		getFistClassChecked: function () {
			var nodes = this.zTree.getCheckedNodes();
			var results = [];
			$.each(nodes, function (index, el) {
				if (el.pId === null) {
					results.push({
						id: el.id,
						pId: el.pId,
						name: el.name
					})
				}
			})
			return results
		}
	};

	_fn = {
		init: function (id, setting, treeNode) {
			if (id == '' || id == null && id == undefined) {
				console.warn('ztree id必填');
				return
			}
			this.id = id;
			this.treeNode = treeNode;
			//todo 同步settings
			var settings = JSON.parse(JSON.stringify(setting));

			settings.view = settings.view ? settings.view : OPTIONS.view;
			settings.check = settings.check ? settings.check : OPTIONS.check;
			settings.data = settings.data ? settings.data : OPTIONS.data;
			settings.callback = settings.callback ? settings.callback : {};

			settings.check.checkAll = settings.check.enable ? !settings.check.checkAll && (typeof settings.check.checkAll == 'boolean') ? false : true : false;
			settings.view.addDiyDom = function (treeId, treeNode) {
				_fn.addDiyDom(treeId, treeNode);
				var addDiyDomEvt = setting.view ? setting.view.addDiyDom ? setting.view.addDiyDom : null : null;
				if (addDiyDomEvt) {
					addDiyDomEvt(treeId, treeNode);
				}
			};
			settings.callback.onClick = function (e, treeId, treeNode) {
				debugger
				_fn.singleClick(e, treeId, treeNode); //单击节点展开
				var onClickEvt = setting.callback ? setting.callback.onClick ? setting.callback.onClick : null : null;
				if (onClickEvt) {
					onClickEvt(e, treeId, treeNode);
				}
			};
			settings.callback.onCheck = function (e, treeId, treeNode) {
				_fn.allCheck(e, treeId, treeNode); //全选交互实现
				var onCheckEvt = setting.callback ? setting.callback.onCheck ? setting.callback.onCheck : null : null;
				if (onCheckEvt) {
					onCheckEvt(e, treeId, treeNode);
				}
			};
			settings.search = OPTIONS.search;

			var ztreeNode = $('#' + this.id);
			if (settings.check.checkAll) {
				treeNode.push({
					checked: false,
					id: new Date(),
					name: "全选",
					parent: false,
					type: 'allcheck'
				});
			}
			this.zTree = $.fn.zTree.init(ztreeNode, settings, treeNode);
			if (settings.search) {
				var template = '<input type="text" class="ztree-search form-control" placeholder="搜索">';
				ztreeNode.prepend($(template));
				_fn.bind.apply(this);
			}
		},
		//样式优化
		addDiyDom: function (treeId, treeNode) {
			var spaceWidth = 20;
			var checkObj = $("#" + treeNode.tId + "_check"),
				switchObj = $("#" + treeNode.tId + "_switch"),
				icoObj = $("#" + treeNode.tId + "_ico");
			checkObj.remove();
			switchObj.remove();
			icoObj.before(switchObj);
			icoObj.before(checkObj);

			if (treeNode.level > 0) {
				var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
				switchObj.before(spaceStr);
			}
		},
		//单击节点展开
		singleClick: function (e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			zTree.expandNode(treeNode);
		},
		//全选交互实现
		allCheck: function (e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			if (treeNode.type == 'allcheck') { //选择的是全选CheckBox
				if (!treeNode.checked) {
					zTree.checkAllNodes(false); //反选
				} else {
					zTree.checkAllNodes(true); //全选
				}
			} else { //选择的不是全选CheckBox
				if (treeNode.checked) { //选中当前选项
					if (zTree.getCheckedNodes().length == treeNode.length - 1) {
						var checkAll = zTree.getNodeByParam('type', 'allcheck', null);
						if (!checkAll) {
							return;
						}
						zTree.checkNode(zTree.getNodeByParam('type', 'allcheck', null), true, true); //找到全选并选中
					}
				} else { //取消当前选中状态
					var checkAll = zTree.getNodeByParam('type', 'allcheck', null);
					if (!checkAll) {
						return;
					}
					zTree.checkNode(checkAll, false, true); //找到全选并选中
				}
			}
		},
		//查询节点
		search: function (e) {
			var searchValue = $(e.target).val(),
				zTree = $.fn.zTree.getZTreeObj(this.id),
				nodes = [];
			if (!searchValue) {
				return;
			}
			nodes = zTree.getNodesByParamFuzzy("name", searchValue, null);
			//zTree.expandAll(false); //节点全部折叠
			if (!nodes || nodes.length < 1) {
				TIPS.show('暂无数据！');
				return;
			}
			zTree.selectNode(nodes[0]); //选中第一个节点
		},
		bind: function () {
			debugger
			var that = this;
			$('#' + this.id).find('.ztree-search').on('keyup', function (e) {
				debugger
				_fn.search.call(that, e); //查询节点
			})
		}
	};
	$.fn.CabinZtree = function (setting, treeNode) {
		var id = this.prop('id');
		return new CabinZtree(id, setting, treeNode);
	};
	define('cabin/widgets/ztree/ztree', function (require, exports, module) {
		require('cabin/lib/ztree/jquery.ztree.all.js');
		TIPS = require('medusa/widgets/tips/tips');
		module.exports = function (id, setting, treeNode) {
			return new CabinZtree(id, setting, treeNode);
		}
	})
})();
