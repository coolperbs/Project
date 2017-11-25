//菜单配置
define('cabin/config/menuconfig', function (require, exports, module) {
	var CGI, menuconfig;
	menuconfig = [
		{
			name: "基础控件",
			children: [
				{
					name: "基础标签",
					type: "btn",
					url: "#index/cabin/btn"
                },
				{
					name: "单选/多选框",
					type: "checkbox",
					url: "#index/cabin/checkbox"
                },
				{
					name: "分页",
					type: "nextPage",
					url: "#index/cabin/nextPage"
                }
			]
        },
		{
			name: "组件",
			children: [
				{
					name: "下拉框(chosen)",
					type: "chosen",
					url: "#index/cabin/chosen"
                },
				{
					name: "时间范围选择器(daterangepicker)",
					type: "daterangepicker",
					url: "#index/cabin/daterangepicker"
                },
				{
					name: "提示框(pop)",
					type: "pop",
					url: "#index/cabin/pop"
                },
				{
					name: "树插件(zTree)",
					type: "ztree",
					url: "#index/cabin/ztree"
                },
				{
					name: "加载效果(loading)",
					type: "loading",
					url: "#index/cabin/loading"
				},
				{
					name: "提示框(tips)",
					type: "tips",
					url: "#index/cabin/tips"
				},
                {
                    name: "标签框",
                    type: "suggester",
                    url: "#index/cabin/suggester"
                }
			]
        },
		{
			name: "页面模板",
			children: [
				{
					name: "搜索页面",
					type: "search",
					url: "#index/cabin/search"
                },
				{
					name: "tab切换",
					type: "tabchange",
					url: "#index/cabin/tabchange"
                },
				{
					name: "vue模板",
					type: "vuePage",
					url: "#index/cabin/vuePage"
                },
				{
					name: "菜单",
					type: "menu",
					url: "#index/cabin/menu"
                }
                ]
        }
    ];
	module.exports = menuconfig;
});
