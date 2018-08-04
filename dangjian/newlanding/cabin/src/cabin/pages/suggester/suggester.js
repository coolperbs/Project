define('cabin/pages/suggester/suggester', function (require, exports, module) {
    var handle, _fn, Page, page;
    Page = require('cabin/page/page');
    page = Page({
        nodeClass: 'demo-cabin-suggester',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/suggester/suggester.tpl', 'cabin/pages/suggester/suggester.css'],
        show: function () {
            handle.jView = this.jView;

            // start---------使用说明---------
            var options = {
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
                'onRemoteValid': function (value) {
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
                },
                'onRemoteValidSuccess': function () {
                    // 验证成功回调函数
                },
                'onRemoteValidFail': function () {
                    // 验证失败回调函数
                }
            };
            // end---------使用说明---------

            // 基本功能，输入《;》后转化标签，粘贴带有《;》自动转化标签，如粘贴值《a;b;c;大菠萝;测试数据;》
            $('#demo_default').suggester({});


            // 远程自定义补齐
            $('#demo_remote_suggest_promise').suggester({
                'onSuggest': function (value) {
                    return new Promise(function (resolve, reject) {
                        $.ajax({'url': '/keyword/filter', 'data': {'key': value}, 'type': 'GET'})
                            .then(function (res) {
                                if (res) {
                                    resolve(res);
                                } else {
                                    reject(res);
                                }
                            }, function (err) {
                                reject(err);
                            })
                    });
                },
            });


            // 远程自定义验证
            $('#demo_remote_valid_promise').suggester({
                'onRemoteValid': function (value) {
                    return new Promise(function (resolve, reject) {
                        $.ajax({'url': '/keyword/valid'})
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
                },
                'onRemoteValidSuccess': function (res) {
                    console.log('验证成功');
                },
                'onRemoteValidFail': function (res) {
                    console.log('验证失败');
                }
            });

        },
        hide: function () {

        },

    });
    handle = {};
    _fn = {};
    require('cabin/lib/suggester/suggester');
    require('cabin/lib/suggester/suggester.css');
    return page;
});
