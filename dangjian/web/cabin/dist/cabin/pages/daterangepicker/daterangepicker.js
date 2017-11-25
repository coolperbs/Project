define('cabin/pages/daterangepicker/daterangepicker', function (require, exports, module) {
	var handle, _fn, Page, page;

	Page = require('cabin/page/page');
	page = Page({
		nodeClass: 'pages-cabin-daterangepicker',
		parentClass: 'J_Main', // 没有就直接插入body，或者不插入
		source: ['cabin/pages/daterangepicker/daterangepicker.tpl', 'cabin/pages/daterangepicker/daterangepicker.css'],
		show: function () {
            handle.jView = this.jView;
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
			_fn.setInitRangeDate();
			$(document.body).addClass('cabin');

			$('#config-text').keyup(function () {
				eval($(this).val());
			});

			$('.configurator input, .configurator select').change(function () {
				updateConfig();
			});

			$('.demo i').click(function () {
				$(this).parent().find('input').click();
			});

			$('#startDate').daterangepicker({
				singleDatePicker: true,
				startDate: moment().subtract(6, 'days')
			});

			$('#endDate').daterangepicker({
				singleDatePicker: true,
				startDate: moment()
			});

			updateConfig();

			function updateConfig() {
				var options = {};

				if ($('#singleDatePicker').is(':checked'))
					options.singleDatePicker = true;

				if ($('#showDropdowns').is(':checked'))
					options.showDropdowns = true;

				if ($('#showWeekNumbers').is(':checked'))
					options.showWeekNumbers = true;

				if ($('#showISOWeekNumbers').is(':checked'))
					options.showISOWeekNumbers = true;

				if ($('#timePicker').is(':checked'))
					options.timePicker = true;

				if ($('#timePicker24Hour').is(':checked'))
					options.timePicker24Hour = true;

				if ($('#timePickerIncrement').val().length && $('#timePickerIncrement').val() != 1)
					options.timePickerIncrement = parseInt($('#timePickerIncrement').val(), 10);

				if ($('#timePickerSeconds').is(':checked'))
					options.timePickerSeconds = true;

				if ($('#autoApply').is(':checked'))
					options.autoApply = true;

				if ($('#dateLimit').is(':checked'))
					options.dateLimit = {
						days: 7
					};

				if ($('#ranges').is(':checked')) {
					options.ranges = {
						'今天': [moment().subtract(0, 'days'), moment().subtract(0, 'days')],
						'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
						'最近3天': [moment().subtract(2, 'days'), moment().subtract(0, 'days')],
						'最近7天': [moment().subtract(6, 'days'), moment().subtract(0, 'days')],
						'最近15天': [moment().subtract(14, 'days'), moment().subtract(0, 'days')],
						'最近30天': [moment().subtract(29, 'days'), moment().subtract(0, 'days')]
					};
				}

				if ($('#locale').is(':checked')) {
					$('#rtl-wrap').show();
					options.locale = {
						direction: $('#rtl').is(':checked') ? 'rtl' : 'ltr',
						format: 'MM/DD/YYYY HH:mm',
						separator: ' - ',
						applyLabel: '确定',
						cancelLabel: '取消',
						fromLabel: '起始时间',
						toLabel: '结束时间',
						customRangeLabel: '自定义',
						daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
						monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
						firstDay: 1
					};
				} else {
					$('#rtl-wrap').hide();
				}

				if (!$('#linkedCalendars').is(':checked'))
					options.linkedCalendars = false;

				if (!$('#autoUpdateInput').is(':checked'))
					options.autoUpdateInput = false;

				if (!$('#showCustomRangeLabel').is(':checked'))
					options.showCustomRangeLabel = false;

				if ($('#alwaysShowCalendars').is(':checked'))
					options.alwaysShowCalendars = true;

				if ($('#parentEl').val().length)
					options.parentEl = $('#parentEl').val();

				if ($('#startDate').val().length)
					options.startDate = $('#startDate').val();

				if ($('#endDate').val().length)
					options.endDate = $('#endDate').val();

				if ($('#minDate').val().length)
					options.minDate = $('#minDate').val();

				if ($('#maxDate').val().length)
					options.maxDate = $('#maxDate').val();

				if ($('#opens').val().length && $('#opens').val() != 'right')
					options.opens = $('#opens').val();

				if ($('#drops').val().length && $('#drops').val() != 'down')
					options.drops = $('#drops').val();

				if ($('#buttonClasses').val().length && $('#buttonClasses').val() != 'btn btn-sm')
					options.buttonClasses = $('#buttonClasses').val();

				if ($('#applyClass').val().length && $('#applyClass').val() != 'btn-success')
					options.applyClass = $('#applyClass').val();

				if ($('#cancelClass').val().length && $('#cancelClass').val() != 'btn-default')
					options.cancelClass = $('#cancelClass').val();

				$('#config-text').val("$('#demo').daterangepicker(" + JSON.stringify(options, null, '    ') + ", function(start, end, label) {\n  console.log(\"New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')\");\n});");

				$('#config-demo').daterangepicker(options, function (start, end, label) {
					console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
				});

			}
		},
		hide: function () {},
		on: {}
	});
	handle = {}
	_fn = {
		setInitRangeDate: function () {
			var start = moment().subtract(0, 'days'),
				end = moment().subtract(0, 'days');
			$('#rangedate').daterangepicker({
					startDate: start,
					endDate: end,
					parentEl: '.rulist-reportrange',
					autoApply: true,
					cancelClass: "com-hide",
					timePickerSeconds: true,
					autoUpdateInput: true,
					alwaysShowCalendars: true,
					separator: ' -- ',
					dateLimit: {
						days: 180
					}, //起止时间的最大间隔 
					showDropdowns: true,
					showWeekNumbers: false, //是否显示第几周
					timePicker: true, //是否显示小时和分钟 
					timePickerIncrement: 1, //时间的增量，单位为分钟  
					timePicker24Hour: true, //是否使用12小时制来显示时间 
					timePicker12Hour: false,
					buttonClasses: "btn btn-sm",
					applyClass: "btn-primary",
					time: {
						enabled: true
					},
					ranges: {
						'今天': [moment().subtract(0, 'days'), moment().subtract(0, 'days')],
						'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
						'最近3天': [moment().subtract(2, 'days'), moment().subtract(0, 'days')],
						'最近7天': [moment().subtract(6, 'days'), moment().subtract(0, 'days')],
						'最近15天': [moment().subtract(14, 'days'), moment().subtract(0, 'days')],
						'最近30天': [moment().subtract(29, 'days'), moment().subtract(0, 'days')]
					},
					locale: {
						applyLabel: '确定',
						cancelLabel: '取消',
						fromLabel: '起始时间',
						toLabel: '结束时间',
						customRangeLabel: '自定义',
						daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
						monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
						firstDay: 1,
						format: 'YYYY-MM-DD HH:mm:ss' //控件中from和to 显示的日期格式
					}
				},
				function (start, end, label) { //格式化日期显示框
					$('.searchdate-input').val(start.format('YYYY-MM-DD HH:mm:ss') + ' -- ' + end.format('YYYY-MM-DD HH:mm:ss'));
				});
		}
	}
	require('cabin/lib/daterangepicker/moment.js');
	require('cabin/lib/daterangepicker/daterangepicker.js');
	return page;
});
