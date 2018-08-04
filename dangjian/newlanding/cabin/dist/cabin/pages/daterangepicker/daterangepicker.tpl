<div class="pages-cabin-daterangepicker">
	<div class="form-horizontal clearfix">
		<div class="cabin-group">
			<label class="control-label">规则时间</label>
			<input type="text" class="form-control icondate" id="rangedate" placeholder="请选选择时间" style="width: 400px;">
		</div>
	</div>
	<pre><code>
	require('cabin/lib/daterangepicker/moment.js');
	require('cabin/lib/daterangepicker/daterangepicker.js');
	
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
	</code></pre>
	<hr>
	<div class="daterangepicker-content">
		<div class="container">

			<h1 style="margin: 0 0 20px 0">Configuration Builder</h1>

			<div class="well configurator">

				<form>
					<div class="row">

						<div class="col-md-4">

							<div class="form-group">
								<label for="parentEl">parentEl</label>
								<input type="text" class="form-control" id="parentEl" value="" placeholder="body">
							</div>

							<div class="form-group">
								<label for="startDate">startDate</label>
								<input type="text" class="form-control" id="startDate" value="07/01/2015">
							</div>

							<div class="form-group">
								<label for="endDate">endDate</label>
								<input type="text" class="form-control" id="endDate" value="07/15/2015">
							</div>

							<div class="form-group">
								<label for="minDate">minDate</label>
								<input type="text" class="form-control" id="minDate" value="" placeholder="MM/DD/YYYY">
							</div>

							<div class="form-group">
								<label for="maxDate">maxDate</label>
								<input type="text" class="form-control" id="maxDate" value="" placeholder="MM/DD/YYYY">
							</div>

						</div>
						<div class="col-md-4">
							<div class="checkbox">
								<input type="checkbox" id="autoApply">
								<label for="autoApply">autoApply</label>
							</div>

							<div class="checkbox">
								<input type="checkbox" id="singleDatePicker">
								<label for="singleDatePicker">singleDatePicker</label>
							</div>
							<div class="checkbox">
								<input type="checkbox" id="showDropdowns">
								<label for="showDropdowns">showDropdowns</label>
							</div>
							<div class="checkbox">
								<input type="checkbox" id="showWeekNumbers">
								<label for="showWeekNumbers">showWeekNumbers</label>
							</div>

							<div class="checkbox">
								<input type="checkbox" id="showISOWeekNumbers">
								<label for="showISOWeekNumbers">showISOWeekNumbers</label>
							</div>
							<div class="checkbox">
								<input type="checkbox" id="timePicker">
								<label for="timePicker">timePicker</label>
							</div>

							<div class="checkbox">
								<input type="checkbox" id="timePicker24Hour">
								<label for="timePicker24Hour">timePicker24Hour</label>
							</div>

							<div class="form-group">
								<label for="timePickerIncrement">timePickerIncrement (in minutes)</label>
								<input type="text" class="form-control" id="timePickerIncrement" value="1">
							</div>
							<div class="checkbox">
								<input type="checkbox" id="timePickerSeconds">
								<label for="timePickerSeconds">timePickerSeconds</label>
							</div>
							<div class="checkbox">
								<input type="checkbox" id="dateLimit">
								<label for="dateLimit">dateLimit (with example date range span)</label>
							</div>
							<div class="checkbox">
								<input type="checkbox" id="ranges">
								<label for="ranges">ranges (with example predefined ranges)</label>
							</div>
							<div class="checkbox">
								<input type="checkbox" id="locale">
								<label for="locale">locale (with example settings)</label>
							</div>
							<div class="checkbox" id="rtl-wrap">
								<input type="checkbox" id="rtl">
								<label for="rtl">RTL (right-to-left)</label>
							</div>
							<div class="checkbox">
								<input type="checkbox" id="alwaysShowCalendars">
								<label for="alwaysShowCalendars">alwaysShowCalendars</label>
							</div>



							<!-- <div class="checkbox">
                                <label>
                                    <input type="checkbox" id="locale"> locale (with example settings)
                                </label>
                                <label id="rtl-wrap">
                                    <input type="checkbox" id="rtl"> RTL (right-to-left)
                                </label>
                            </div>-->

						</div>
						<div class="col-md-4">
							<div class="checkbox">
								<input type="checkbox" id="linkedCalendars" checked="checked">
								<label for="linkedCalendars">linkedCalendars</label>
							</div>
							<div class="checkbox">
								<input type="checkbox" id="autoUpdateInput" checked="checked">
								<label for="autoUpdateInput">autoUpdateInput</label>
							</div>
							<div class="checkbox">
								<input type="checkbox" id="showCustomRangeLabel" checked="checked">
								<label for="showCustomRangeLabel">showCustomRangeLabel</label>
							</div>


							<div class="form-group">
								<label for="opens">opens</label>
								<select id="opens" class="form-control">
									<option value="right" selected>right</option>
									<option value="left">left</option>
									<option value="center">center</option>
								</select>
							</div>

							<div class="form-group">
								<label for="drops">drops</label>
								<select id="drops" class="form-control">
									<option value="down" selected>down</option>
									<option value="up">up</option>
								</select>
							</div>

							<div class="form-group">
								<label for="buttonClasses">buttonClasses</label>
								<input type="text" class="form-control" id="buttonClasses" value="btn btn-sm">
							</div>

							<div class="form-group">
								<label for="applyClass">applyClass</label>
								<input type="text" class="form-control" id="applyClass" value="btn-success">
							</div>

							<div class="form-group">
								<label for="cancelClass">cancelClass</label>
								<input type="text" class="form-control" id="cancelClass" value="btn-default">
							</div>

						</div>

					</div>
				</form>

			</div>

			<div class="row">
				<div class="col-md-4 col-md-offset-2 demo">
					<h4>Your Date Range Picker</h4>
					<input type="text" id="config-demo" class="form-control">
					<i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
				</div>

				<div class="col-md-6">
					<h4>Configuration</h4>

					<div class="well">
						<textarea id="config-text" style="height: 300px; width: 100%; padding: 10px"></textarea>
					</div>
				</div>

			</div>

		</div>
	</div>
</div>
