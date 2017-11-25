define('cabin/lib/suggester/suggester', function (require) {
    require('cabin/lib/suggester/suggester.css');
    ;(function ($, window, document, undefined) {
        //定义Suggester的构造函数
        var Suggester = function (ele, opt) {
            this.$element = ele,
                this.defaults = {
                    'invalidMsg': '未通过验证',
                    'delay': 300,
                    'separator': ';'
                };

            var options = {
                'url': '/keyword/filter',    // 后端服务器suggest接口url
                'remoteKeyName': 'key',       // 后端服务器suggest接口url接收的参数名
                'validUrl': '/keyword/valid',// 后端服务器验证接口url
                'remoteValidKeyName': 'key',  // 后端服务器验证时接受的参数名
                'invalidMsg': '未通过验证',    // 验证失败提示文本
                'delay': 1000,               // 输入停止后多少毫秒开始请求
                'separator': ';',            // 输入分割符号，按输入中的这个符号分割输入内容
                'onSuggest': function (value) {
                    // 异步获取补齐数据
                    return new Promise(function (resolve, reject) {
                        $.ajax({'url': '/keyword/filter', 'data': {'key': value}, 'type': 'GET'})
                            .then(function (res) {
                                if (res) {
                                    resolve(res);
                                } else {
                                    reject('未获取到数据');
                                }
                            }, function (err) {
                                reject(err);
                            })
                    });
                },
                'onRemoteValid': function (value, res) {
                    // start------第一种方式------
                    // 验证规则函数，给定当前值value和服务端返回值res，可根据给定值做判断
                    // 如return (value==res);,当前值与服务端返回相同则返回了true，验证通过
                    // 当然也可以直接返回true，那每次验证都成功
                    return true;
                    // end------第一种方式------

                    // start------第二种方式------
                    // 异步验证
                    return new Promise(function (resolve, reject) {
                        $.ajax({'url': '/keyword/valid', 'data': {'key': value}, 'type': 'GET'})
                            .then(function (res) {
                                // 这里写前端验证规则，验证成功调用resolve()，验证失败reject()
                                if (res) {
                                    resolve(res);

                                } else {
                                    reject();

                                }
                            }, function (err) {
                                reject(err);
                            })
                    });
                    // end------第二种方式------

                },
                'onRemoteValidSuccess': function () {
                    // 验证成功回调函数
                },
                'onRemoteValidFail': function () {
                    // 验证失败回调函数
                }
            };
            this.options = $.extend({}, this.defaults, opt)
        };
        //定义Suggester的方法
        Suggester.prototype = {
            init: function () {

                var self = this;
                var $body = $(document.body);
                var $orgInput = $(this.$element);
                var $suggester = $('<div class="suggester">' +
                    '<span class="custom popup top left transition visible">' + self.options.invalidMsg + '</span>' +
                    '</div>');
                var $tip = $suggester.find('.popup');
                var $keyList = $('<ul class="suggester-key-list"></ul>');
                var $labelList = $('<ul class="suggester-label-list">' +
                    '<li class="suggester-input-wrap">' +
                    '<input type="text" class="suggester-input"></li>' +
                    '</ul>');
                var $labelInput = $labelList.find('.suggester-input');
                var inputLeft = $orgInput.offset().left;
                var inputTop = $orgInput.offset().top;
                var inputWidth = $orgInput.width();
                var inputHeight = $orgInput.height();
                $keyList.hide();
                var valuePot = [];
                var validKeys = [];
                var notValidKeys = [];

                function showPopup() {
                    console.log('notValidKeys:',notValidKeys);
                    $suggester.find('.popup').html(notValidKeys.join(',')+self.options.invalidMsg);
                    $tip.css({
                        'visibility': 'visible'
                    });

                }

                function hidePopup() {
                    $tip.css({
                        'visibility': 'hidden'
                    });
                }

                $labelList.css({
                    'width': inputWidth
                });
                $suggester.append($labelList, $keyList);
                $body.append($suggester);
                $suggester.css({
                    'position': 'absolute',
                    'top': inputTop,
                    'left': inputLeft
                });

                var orgTime, ortTmo;
                $labelList.on('click', function () {

                    $labelInput.focus();
                });
                $tip.on('click', function () {
                    hidePopup();
                });

                // $labelInput.attr('placeholder', $orgInput.attr('placeholder'));
                $labelInput.on('keydown', function (event) {
                    var $target = $(event.target);
                    switch (event.keyCode) {
                        case 8:
                            if ($target.val() === '') {
                                var $prev = $target.parents('.suggester-input-wrap').prev();
                                $target.val($prev.find('.suggester-lb').html());
                                removeLabel($prev);
                            }
                            break;
                        case 38:
                            var $keys = $keyList.find('.suggester-key-item');
                            if ($keys.hasClass('active')) {
                                $keys.filter('.active').removeClass('active').prev().addClass('active');
                            } else {
                                $keys.first().addClass('active');

                            }
                            break;
                        case 40:
                            var $keys = $keyList.find('.suggester-key-item');
                            if ($keys.hasClass('active')) {
                                $keys.filter('.active').removeClass('active').next().addClass('active');
                            } else {
                                $keys.first().addClass('active');
                            }
                            break;
                        case 13:
                            var $keys = $keyList.find('.suggester-key-item');
                            $keys.filter('.active').trigger('click');
                            break;
                        default:
                            break;
                    }
                });

                function removeLabel($removeItem) {
                    valuePot = valuePot.filter(function (item) {
                        return item.id !== $removeItem.data('id');
                    });
                    $removeItem.remove();
                }

                $body.on('click', function (event) {
                    hidePopup();
                    closeKeyList();

                });

                function closeKeyList() {
                    $keyList.hide();
                    $suggester.css({
                        'z-index': 1
                    });
                    $labelList.css({
                        'border-bottom': 'solid 1px #f5f5f5'
                    });
                }

                function openKeyList() {
                    $suggester.css({
                        'z-index': 100
                    });

                    $labelList.css({
                        'border-bottom': 'none'
                    });
                    $keyList.show();
                }

                $labelInput.on('input', function (event) {

                    var $target = $(event.target);

                    var value = $target.val();

                    if (self.options.url || self.options.onSuggest) {
                        var time = new Date().getTime();
                        if ((time - orgTime) < self.options.delay) {
                            clearTimeout(ortTmo);
                        }
                        if (value) {
                            ortTmo = setTimeout(function () {
                                if (self.options.url) {
                                    var data = {};
                                    data[self.options.remoteKeyName] = value;
                                    $.ajax({
                                        'url': self.options.url,
                                        'data': data,
                                        'type': 'GET'
                                    }).then(function (res) {
                                        $keyList.html('');
                                        res.forEach(function (item) {

                                            var $item = $('<li class="suggester-key-item"><span>' + item + '</span></li>');
                                            $item.on('click', function () {
                                                addLabel(item);
                                                $target.val('');
                                                $target.focus();
                                                closeKeyList();
                                            });


                                            $keyList.append($item);
                                        });
                                        openKeyList();
                                    });
                                } else if (self.options.onSuggest) {
                                    self.options.onSuggest(value)
                                        .then(function (res) {
                                            $keyList.html('');
                                            res.forEach(function (item) {

                                                var $item = $('<li class="suggester-key-item"><span>' + item + '</span></li>');
                                                $item.on('click', function () {
                                                    addLabel(item);
                                                    $target.val('');
                                                    $target.focus();
                                                    closeKeyList();
                                                });


                                                $keyList.append($item);
                                            });
                                            openKeyList();
                                        })
                                        .catch(function (err) {

                                        })
                                }

                            }, self.options.delay);
                        }

                        orgTime = time;
                    }


                    var valueSplit = value.split(self.options.separator);
                    if (valueSplit.length > 1) {
                        valueSplit.pop();
                        var promiseIndex = 0;
                        if (self.options.validUrl || self.options.onRemoteValid) {

                            Promise.all(valueSplit.map(function (item) {
                                return checkValue(item);
                            }))
                                .then(function () {
                                    for (var i = 0, len = valueSplit.length; i < len; i++) {
                                        addLabel(valueSplit[i]);
                                    }
                                    setValue();
                                    $labelInput.val('');
                                    validKeys = [];
                                    notValidKeys = [];

                                })
                                .catch(function (err) {
                                    showPopup();
                                    validKeys = [];
                                    notValidKeys = [];
                                });
                        } else {
                            for (var i = 0, len = valueSplit.length; i < len; i++) {
                                addLabel(valueSplit[i]);
                            }
                            setValue();
                            $labelInput.val('');
                        }
                    }
                });

                function setValue() {
                    var valueStr = '';
                    for (var i = 0, len = valuePot.length; i < len; i++) {
                        valueStr += valuePot[i].value + self.options.separator;
                    }
                    $orgInput.val(valueStr);
                }

                function checkValue(value) {
                    return new Promise(function (resolve, reject) {
                        var data = {};
                        data[self.options.remoteValidKeyName] = value;

                        if (self.options.validUrl) {
                            $.ajax({'url': self.options.validUrl, 'data': data, 'type': 'GET'})

                                .then(function (res) {
                                    if (self.options.onRemoteValid) {
                                        var retOnRemoteValid = self.options.onRemoteValid(value, res);
                                        if (retOnRemoteValid) {
                                            validKeys.push(value);
                                            self.options.onRemoteValidSuccess(value);
                                            resolve('remoteValidComplete');

                                        } else {
                                            self.options.onRemoteValidFail(value);
                                            notValidKeys.push(value);
                                            reject('remoteValidFail');

                                        }
                                    } else {
                                        validKeys.push(value);

                                        resolve('remoteValidComplete');
                                    }

                                }, function (err) {
                                    notValidKeys.push(value);
                                    reject('remoteValidFail');
                                    console.error(err);
                                });
                        } else {
                            self.options.onRemoteValid(value)
                                .then(function (res) {
                                    validKeys.push(value);
                                    resolve('remoteValidComplete');
                                })
                                .catch(function (err) {
                                    notValidKeys.push(value);
                                    reject('remoteValidFail');

                                });
                        }

                    });

                }

                function addLabel(value) {
                    var labelId = (new Date()).getTime();
                    var $labelWrap = $('<li data-id="' + labelId + '" class="suggester-label-wrap">' +
                        '<label class="suggester-lb lb-' + value + '">' + value +
                        '</label><i class="suggester-label-remove">x</i></li>');

                    $labelWrap.find('.suggester-label-remove').on('click', function (event) {
                        removeLabel($(event.target).parent('.suggester-label-wrap'));
                    });
                    valuePot.push({value: value, id: labelId});
                    $labelInput.parents('.suggester-input-wrap').before($labelWrap);
                    hidePopup();

                }

                return this.$element;

            }
        };
        //在插件中使用Suggester对象
        $.fn.suggester = function (options) {
            return this.each(function () {
                //创建Suggester的实体

                var suggester = new Suggester(this, options);
                //调用其方法
                return suggester.init();
            });

        }
    })(jQuery, window, document);
});

