<div class="pages-cabin-ztree"><div class="ztree-content"><ul id="treeDemo" class="ztree"></ul></div><pre style="margin-top:20px"><code>
		&lt;ul id="treeDemo" class="ztree">&lt;/ul>
	</code></pre><pre><code>
		//引入插件资源
		require('cabin/widgets/ztree/ztree');
		//初始化配置项
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
					onClick: function (e, treeId, treeNode) {},
					onCheck: function (e, treeId, treeNode) {}
				}
			};
		//树形节点数据
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
			name: "父节点12"
		}, {
			id: 121,
			pId: 12,
			name: "叶子节点121"
		}, {
			id: 122,
			pId: 12,
			name: "叶子节点122"
		}, {
			id: 123,
			pId: 12,
			name: "叶子节点123"
		}, {
			id: 124,
			pId: 12,
			name: "叶子节点124"
		}, {
			id: 13,
			pId: 1,
			name: "父节点13"
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
			name: "父节点3"
		}, {
			id: 4,
			pId: 0,
			name: "全选",
			type: 'allcheck',
			isParent: false
		}];
		//初始化
		$("#treeDemo").CabinZtree(setting, zNodes);
	</code></pre></div>