define('cabin/pages/ztree/ztree', function (require, exports, module) {
	var handle, _fn, page, ztree, MINIztree, TIPS;
	var zNodes = [
		{
			id: 1,
			pId: 0,
			name: "父节点1",
			open: true
		}, {
			id: 11,
			pId: 1,
			name: "父节点11",
			checked: true
		}, {
			id: 111,
			pId: 11,
			name: "叶子节点111",
			checked: true
		}, {
			id: 112,
			pId: 11,
			name: "叶子节点112",
			checked: true
		}, {
			id: 113,
			pId: 11,
			name: "叶子节点113",
			checked: true
		}, {
			id: 114,
			pId: 11,
			name: "叶子节点114",
			checked: true
		}, {
			id: 12,
			pId: 1,
			name: "父节点12",
			checked: true
		}, {
			id: 121,
			pId: 12,
			name: "叶子节点121",
			checked: true
		}, {
			id: 122,
			pId: 12,
			name: "叶子节点122",
			checked: true
		}, {
			id: 123,
			pId: 12,
			name: "叶子节点123",
			checked: true
		}, {
			id: 124,
			pId: 12,
			name: "叶子节点124",
			checked: true
		}, {
			id: 13,
			pId: 1,
			name: "父节点13",
			checked: true
		}, {
			id: 2,
			pId: 0,
			name: "父节点2"
		}, {
			id: 21,
			pId: 2,
			name: "父节点21",
			open: true
		}, {
			id: 211,
			pId: 21,
			name: "叶子节点211"
		}, {
			id: 212,
			pId: 21,
			name: "叶子节点212"
		}, {
			id: 213,
			pId: 21,
			name: "叶子节点213"
		}, {
			id: 214,
			pId: 21,
			name: "叶子节点214"
		}, {
			id: 22,
			pId: 2,
			name: "父节点22"
		}, {
			id: 221,
			pId: 22,
			name: "叶子节点221"
		}, {
			id: 222,
			pId: 22,
			name: "叶子节点222"
		}, {
			id: 223,
			pId: 22,
			name: "叶子节点223"
		}, {
			id: 224,
			pId: 22,
			name: "叶子节点224"
		}, {
			id: 23,
			pId: 2,
			name: "父节点23"
		}, {
			id: 231,
			pId: 23,
			name: "叶子节点231"
		}, {
			id: 232,
			pId: 23,
			name: "叶子节点232"
		}, {
			id: 233,
			pId: 23,
			name: "叶子节点233"
		}, {
			id: 234,
			pId: 23,
			name: "叶子节点234"
		}, {
			id: 3,
			pId: 0,
			name: "父节点3",
			checked: true
		}];
	require('cabin/widgets/ztree/ztree');
	TIPS = require('medusa/widgets/tips/tips');
	Page = require('cabin/page/page');
	page = Page({
		nodeClass: 'pages-cabin-ztree',
		parentClass: 'J_Main', // 没有就直接插入body，或者不插入
		source: ['cabin/pages/ztree/ztree.tpl', 'cabin/pages/ztree/ztree.css'],
		show: function () {
			handle.jView = this.jView;
			$('pre code').each(function (i, block) {
				hljs.highlightBlock(block);
			});
			var setting = {
				view: {
					dblClickExpand: false, //是否双击打开
					showLine: false, //是否显示虚线
					showIcon: false
				},
				check: {
					enable: true
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: function (e, treeId, treeNode) {
						console.log(a);
						console.log(a.getFistClassChecked())
					},
					onCheck: function (e, treeId, treeNode) {
						console.log(a);
						console.log(a.getFistClassChecked())
					}
				}
			};
			var a = $("#treeDemo").CabinZtree(setting, zNodes);

		},
		hide: function () {},

	});
	handle = {};
	return page;
});
