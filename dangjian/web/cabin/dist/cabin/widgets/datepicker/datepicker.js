(function () {
    var OPTION = {
        datePicker: {
            format: 'yyyy-mm-dd',
            language: 'zh-CN'
        },
        range: {
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '起始时间',
            toLabel: '结束时间',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1,
            format: 'YYYY-MM-DD' //控件中from和to 显示的日期格式
        }
    };
    var handel = {
        inited: false,
        directive: {},
        enter: function () {
            if (handel.inited) {
                return
            }
            _fn.initDirective();
        },
        exit: function () {
        }
    };
    var _fn = {
        initDirective: function () {
            handel.directive = {
                name: 'timepicker',
                twoWay: true,
                bind: function (el, binding, Vnode, oldVnode) {
                    //binding rawName 是参数 :分隔
                    //binding.expression 是配置项
                    debugger
                    var type = binding.rawName.split(':')[1];
                    var key = _fn.tranformStr1(binding.rawName.split(':')[2]);
                    var opt = JSON.parse(JSON.stringify(binding.value));
                    if (type == 'datepicker') {
                        opt.format ? opt.format : (opt.format = OPTION.datePicker.format);
                        opt.language = OPTION.datePicker.language;
                        opt.startDate = _fn.getContext(Vnode.context, key, '', true);
                        if (opt.format == 'hh:ii') {
                            opt.startDate = moment().format('yyyy-mm-dd') + ' ' + opt.startDate
                        }
                        debugger
                        Vnode.context.$nextTick(function () {
                            $(el).datetimepicker(opt).on('changeDate', function (ev) {
                                _fn.getContext(Vnode.context, key, $(el).val())
                            })
                        });
                        return
                    }
                    if (type === 'chosen') {
                        $(el).chosen('destroy').unbind('change');
                        Vnode.context.$nextTick(function () {
                            $(el).chosen(opt).bind('change', function () {
                                _fn.getContext(Vnode.context, key, $(el).val());
                            });
                        });
                        return
                    }
                    if (type == 'range') {
                        opt['locale'] = OPTION.range;
                        var startDate = _fn.getContext(Vnode.context, key, '', true) ? moment(_fn.getContext(Vnode.context, key, '', true)) : moment();
                        opt.startDate = startDate ? moment(startDate) : moment();
                        $(el).daterangepicker(opt, function (start, end, label) {
                            _fn.getContext(Vnode.context, key, start.format(opt.locale.format));
                        });
                    }
                },
                update: function (el, binding, Vnode) {
                    debugger
                    var type = binding.rawName.split(':')[1];
                    var key = _fn.tranformStr1(binding.rawName.split(':')[2]);
                    var opt = JSON.parse(JSON.stringify(binding.value));
                    if (type == 'datepicker') {
                        opt.format ? opt.format : (opt.format = OPTION.datePicker.format);
                        opt.language = OPTION.datePicker.language;
                        opt.startDate = _fn.getContext(Vnode.context, key, '', true);
                        if (opt.format == 'hh:ii') {
                            opt.startDate = moment().format('yyyy-mm-dd') + ' ' + opt.startDate
                        }
                        Vnode.context.$nextTick(function () {
                            $(el).datetimepicker(opt).on('changeDate', function (ev) {
                                _fn.getContext(Vnode.context, key, $(el).val())
                            })
                        });
                        return
                    }
                    if (type === 'chosen') {
                        $(el).chosen('destroy').unbind('change');
                        Vnode.context.$nextTick(function () {
                            $(el).chosen(opt).bind('change', function () {
                                _fn.getContext(Vnode.context, key, $(el).val());
                            });
                        });
                        return
                    }
                    if (type == 'range') {
                        opt['locale'] = OPTION.range;
                        opt.startDate = _fn.getContext(Vnode.context, key, '', true) ? moment(_fn.getContext(Vnode.context, key, '', true)) : moment();
                        Vnode.context.$nextTick(function () {
                            $(el).daterangepicker(opt, function (start, end, label) {
                                _fn.getContext(Vnode.context, key, start.format(opt.format));
                            });
                        });
                    }
                },
                unbind: function (el, binding) {
                    var type = binding.arg.split(':')[0];
                    if (type == 'datepicker') {
                        $(el).datetimepicker('remove');
                        return
                    }
                    if (type === 'chosen') {
                        $(el).chosen('destroy').unbind('change');
                        return
                    }
                    if (type == 'range') {
                        $(el).data('daterangepicker').remove()
                    }
                }
            };
            handel.inited = true;
        },
        getContext: function (obj, path, value, type) {
            var tempObj = obj;
            path = path.replace(/\[(\w+)\]/g, '.$1');
            path = path.replace(/^\./, '');

            var keyArr = path.split('.');
            var i = 0;

            for (var len = keyArr.length; i < len - 1; ++i) {
                var key = keyArr[i];
                if (key in tempObj) {
                    tempObj = tempObj[key];
                } else {
                    throw new Error('[v-directive:datepicker warn]: please transfer a valid prop path to form item!');
                }
            }
            /* return {
                 o: tempObj,
                 k: keyArr[i],
                 v: tempObj[keyArr[i]]
             };*/
            if (!type) {
                obj.$set(tempObj, keyArr[i], value);
            } else {
                return tempObj[keyArr[i]];
            }
        },
        tranformStr1: function (str) {
            var strArr = str.split('_');
            for (var i = 1; i < strArr.length; i++) {
                strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
            }
            return strArr.join('');
        }
    };
    define('cabin/widgets/datepicker/datepicker', function (require, exports, module) {
        require('cabin/lib/chosen/chosen.jquery.js');
        require('cabin/lib/daterangepicker/moment.js');
        require('cabin/lib/daterangepicker/daterangepicker.js');
        require('cabin/lib/bootDatePicker/bootstrap-datetimepicker');
        require('cabin/lib/bootDatePicker/bootstrap-datetimepicker.zh-CN.js');
        _fn.initDirective();
        module.exports = handel.directive;
    });
})();