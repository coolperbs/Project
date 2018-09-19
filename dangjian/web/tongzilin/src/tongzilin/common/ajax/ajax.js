( function() {
    var _fn,
        handle,
        UA = window.navigator.userAgent,
        CFG,
        sData = seajs.data,
        cookie,
        cookieName = sData.cookieName;

    CFG = {
        TIMEOUT: 20000 // 超时10秒
    }

    handle = {
        submitForm : function( url, jForm, callback ) {
            jForm.ajaxSubmit( {
                url : url,
                type : 'POST',
                traditional : true,
                delegation: true,
                success: function (res) {
                    if (typeof callback == 'function') {
                        _fn.callbackProxy(res, callback);
                    }
                },
                error: function () {
                    var data = {
                        code: '-1',
                        msg: '加载数据失败',
                        data: {}
                    };
                    if (typeof callback == 'function') {
                        _fn.callbackProxy(data, callback);
                    }
                }                
            } );
        },
        query: function () {
            var url,
                param,
                type,
                callback;
            if (arguments.length == 3) {
                url = arguments[0];
                type = 'json';
                param = arguments[1];
                callback = arguments[2];
            } else if (arguments.length == 4) {
                url = arguments[0];
                type = arguments[1];
                param = arguments[2];
                callback = arguments[3];
            } else {
                return;
            }

            param = param || {};
            param = _fn.decorateParam(param);
            $.ajax({
                url: url,
                dataType: 'json',
                data: param,
                xhrFields: {
                    withCredentials: true
                },
                type: 'GET',
                cache: false,
                timeout: CFG.TIMEOUT,
                success: function (data) {
                    if (typeof callback == 'function') {
                        _fn.callbackProxy(data, callback);
                    }
                },
                error: function () {
                    var data = {
                        errCode: '-1',
                        errMsg: '加载数据失败',
                        data: {}
                    };
                    if (typeof callback == 'function') {
                        _fn.callbackProxy(data, callback);
                    }
                }
            });
        },
        post: function () {
            var url,
                param,
                type,
                callback;
            if (arguments.length == 3) {
                url = arguments[0];
                type = 'json';
                param = arguments[1];
                callback = arguments[2];
            } else {
                return;
            }
            param = param || {};
            param = _fn.decorateParam(param);
            $.ajax({
                url: url,
                dataType: 'json',
                data: param,
                xhrFields: {
                    withCredentials: true
                },
                type: 'POST',
                cache: false,
                timeout: CFG.TIMEOUT,
                success: function (data) {
                    if (typeof callback == 'function') {
                        _fn.callbackProxy(data, callback);
                    }
                },
                error: function () {
                    var data = {
                        errCode: '-1',
                        errMsg: '加载数据失败',
                        data: {}
                    };
                    if (typeof callback == 'function') {
                        _fn.callbackProxy(data, callback);
                    }
                }
            });
        }
    }

    _fn = {
        // 装饰参数
        decorateParam: function (param) {
            var result = {};

            result.param = JSON.stringify( param );
            result.token = cookie.get( 'token' );
            //            param = $.extend(param, globalParam);
            //            // 后期可适配添加系统级别参数
            //            return param;
/*            var source = _fn.getSource();
            param.token = UTILS.cookie.get(cookieName.ticketWeChat);
            param.source = source;
            param.tempid = UTILS.cookie.get(cookieName.tempId);
            param.pubParam = JSON.stringify(_fn.extPubParam());*/
            return result;
        },

        // 统一回调方案
        callbackProxy: function (data, callback) {
            // 这里可以做统一拦截方案
            if (typeof callback == 'function') {
                callback(data);
            }
        }
    }
	
	define('tongzilin/common/ajax/ajax', function (require, exports, module) {
        cookie = require( 'tongzilin/common/cookie/cookie' );
        require( 'tongzilin/lib/jqueryform/jquery.form.js' );
	    module.exports = handle;
	});
} )();

