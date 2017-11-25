/**
 * Created by k186 on 2017/10/27.
 */
(function () {
    var handle = {
        getUrlData: function () {
            var result = kayak.router.requestParam;
            result = result.data ? result.data : {};
            return JSON.parse(result);
        },
        jumpPge: function (hash, data) {
            kayak.router.go(hash + ':data=' + JSON.stringify(data));
        }
    };
    var _fn = {
        objtostr: function (param, key) {
            var paramStr = "";
            if (param instanceof String || param instanceof Number || param instanceof Boolean) {
                paramStr += "&" + key + "=" + encodeURIComponent(param);
            } else {
                $.each(param, function (i) {
                    var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                    paramStr += '&' + _fn.objtostr(this, k);
                });
            }
            return paramStr.substr(1);
        },
        strtoobj: function (param) {
            //todo
            var data = param;
            var result = {};
            var keys = Object.keys(param);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].indexOf('[') > 0) {
                    var realKey = keys[i].split('[')[0];
                    var index = keys[i].split('[')[1].split(']')[0];
                    if (!result[realKey]) {
                        result[realKey] = [];
                    }
                    result[realKey][index] = data[keys[i]]
                } else {
                    result[keys[i]] = data[keys[i]];
                }
            }
            return result
        }
    };
    define('cabin/common/tools/tools', function (require, exports, module) {
        require('kayak/core/kayak');
        /*组装*/
        var COOKIE = require('cabin/common/cookie/cookie');
        var validate = require('cabin/common/widgets/dmFromValidate');
        var temp = {
            cookie: COOKIE,
            validate: validate
        };
        $.extend(handle,temp);
        module.exports = handle;
    });
})();
