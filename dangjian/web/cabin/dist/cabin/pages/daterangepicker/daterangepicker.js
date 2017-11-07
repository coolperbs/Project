define("cabin/pages/daterangepicker/daterangepicker",function(require,exports,module){var handle,_fn,Page,page;return Page=require("cabin/page/page"),page=Page({nodeClass:"pages-cabin-daterangepicker",parentClass:"J_Main",source:["cabin/pages/daterangepicker/daterangepicker.tpl","cabin/pages/daterangepicker/daterangepicker.css"],show:function(){function updateConfig(){var a={};$("#singleDatePicker").is(":checked")&&(a.singleDatePicker=!0),$("#showDropdowns").is(":checked")&&(a.showDropdowns=!0),$("#showWeekNumbers").is(":checked")&&(a.showWeekNumbers=!0),$("#showISOWeekNumbers").is(":checked")&&(a.showISOWeekNumbers=!0),$("#timePicker").is(":checked")&&(a.timePicker=!0),$("#timePicker24Hour").is(":checked")&&(a.timePicker24Hour=!0),$("#timePickerIncrement").val().length&&1!=$("#timePickerIncrement").val()&&(a.timePickerIncrement=parseInt($("#timePickerIncrement").val(),10)),$("#timePickerSeconds").is(":checked")&&(a.timePickerSeconds=!0),$("#autoApply").is(":checked")&&(a.autoApply=!0),$("#dateLimit").is(":checked")&&(a.dateLimit={days:7}),$("#ranges").is(":checked")&&(a.ranges={"今天":[moment().subtract(0,"days"),moment().subtract(0,"days")],"昨天":[moment().subtract(1,"days"),moment().subtract(1,"days")],"最近3天":[moment().subtract(2,"days"),moment().subtract(0,"days")],"最近7天":[moment().subtract(6,"days"),moment().subtract(0,"days")],"最近15天":[moment().subtract(14,"days"),moment().subtract(0,"days")],"最近30天":[moment().subtract(29,"days"),moment().subtract(0,"days")]}),$("#locale").is(":checked")?($("#rtl-wrap").show(),a.locale={direction:$("#rtl").is(":checked")?"rtl":"ltr",format:"MM/DD/YYYY HH:mm",separator:" - ",applyLabel:"确定",cancelLabel:"取消",fromLabel:"起始时间",toLabel:"结束时间",customRangeLabel:"自定义",daysOfWeek:["日","一","二","三","四","五","六"],monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],firstDay:1}):$("#rtl-wrap").hide(),$("#linkedCalendars").is(":checked")||(a.linkedCalendars=!1),$("#autoUpdateInput").is(":checked")||(a.autoUpdateInput=!1),$("#showCustomRangeLabel").is(":checked")||(a.showCustomRangeLabel=!1),$("#alwaysShowCalendars").is(":checked")&&(a.alwaysShowCalendars=!0),$("#parentEl").val().length&&(a.parentEl=$("#parentEl").val()),$("#startDate").val().length&&(a.startDate=$("#startDate").val()),$("#endDate").val().length&&(a.endDate=$("#endDate").val()),$("#minDate").val().length&&(a.minDate=$("#minDate").val()),$("#maxDate").val().length&&(a.maxDate=$("#maxDate").val()),$("#opens").val().length&&"right"!=$("#opens").val()&&(a.opens=$("#opens").val()),$("#drops").val().length&&"down"!=$("#drops").val()&&(a.drops=$("#drops").val()),$("#buttonClasses").val().length&&"btn btn-sm"!=$("#buttonClasses").val()&&(a.buttonClasses=$("#buttonClasses").val()),$("#applyClass").val().length&&"btn-success"!=$("#applyClass").val()&&(a.applyClass=$("#applyClass").val()),$("#cancelClass").val().length&&"btn-default"!=$("#cancelClass").val()&&(a.cancelClass=$("#cancelClass").val()),$("#config-text").val("$('#demo').daterangepicker("+JSON.stringify(a,null,"    ")+", function(start, end, label) {\n  console.log(\"New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')\");\n});"),$("#config-demo").daterangepicker(a,function(a,b,c){})}handle.jView=this.jView,$("pre code").each(function(a,b){hljs.highlightBlock(b)}),_fn.setInitRangeDate(),$(document.body).addClass("cabin"),$("#config-text").keyup(function(){eval($(this).val())}),$(".configurator input, .configurator select").change(function(){updateConfig()}),$(".demo i").click(function(){$(this).parent().find("input").click()}),$("#startDate").daterangepicker({singleDatePicker:!0,startDate:moment().subtract(6,"days")}),$("#endDate").daterangepicker({singleDatePicker:!0,startDate:moment()}),updateConfig()},hide:function(){},on:{}}),handle={},_fn={setInitRangeDate:function(){var a=moment().subtract(0,"days"),b=moment().subtract(0,"days");$("#rangedate").daterangepicker({startDate:a,endDate:b,parentEl:".rulist-reportrange",autoApply:!0,cancelClass:"com-hide",timePickerSeconds:!0,autoUpdateInput:!0,alwaysShowCalendars:!0,separator:" -- ",dateLimit:{days:180},showDropdowns:!0,showWeekNumbers:!1,timePicker:!0,timePickerIncrement:1,timePicker24Hour:!0,timePicker12Hour:!1,buttonClasses:"btn btn-sm",applyClass:"btn-primary",time:{enabled:!0},ranges:{"今天":[moment().subtract(0,"days"),moment().subtract(0,"days")],"昨天":[moment().subtract(1,"days"),moment().subtract(1,"days")],"最近3天":[moment().subtract(2,"days"),moment().subtract(0,"days")],"最近7天":[moment().subtract(6,"days"),moment().subtract(0,"days")],"最近15天":[moment().subtract(14,"days"),moment().subtract(0,"days")],"最近30天":[moment().subtract(29,"days"),moment().subtract(0,"days")]},locale:{applyLabel:"确定",cancelLabel:"取消",fromLabel:"起始时间",toLabel:"结束时间",customRangeLabel:"自定义",daysOfWeek:["日","一","二","三","四","五","六"],monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],firstDay:1,format:"YYYY-MM-DD HH:mm:ss"}},function(a,b,c){$(".searchdate-input").val(a.format("YYYY-MM-DD HH:mm:ss")+" -- "+b.format("YYYY-MM-DD HH:mm:ss"))})}},require("cabin/lib/daterangepicker/moment.js"),require("cabin/lib/daterangepicker/daterangepicker.js"),page});