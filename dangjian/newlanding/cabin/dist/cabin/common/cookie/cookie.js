;
(function () {
    var handle;
    handle = {
        //读取
        get: function (b) {
            var c = new RegExp("(^|;|\\s+)" + b + "=([^;]*)(;|$)"),
                a = document.cookie.match(c);
            return (!a ? '' : unescape(a[2]));
        },
        //写入
        add: function (sName, sValue, day, path, domain) {
            var expireDate = new Date(),
                defaultDay = 30,
                daytime;

            // 微信失效时间为30天，浏览器失效时间为1天
            daytime = day || defaultDay;
            expireDate.setDate(expireDate.getDate() + daytime);
            path = path || '/';
            domain = location.host.indexOf('.dmall.com') > 0 ? 'dmall.com' : document.domain;
            //设置失效时间    
            if (day == 'session') {
                var isIE = !!window.ActiveXObject || "ActiveXObject" in window; //判断是否是ie核心浏览器  
                if (isIE) {
                    document.cookie = escape(sName) + '=' + escape(sValue) + ';expires=At the end of the Session;path=' + path + ';domain=' + domain;
                } else {
                    document.cookie = escape(sName) + '=' + escape(sValue) + ';expires=Session;path=' + path + ';domain=' + domain;
                }
                return;
            }
            document.cookie = escape(sName) + '=' + escape(sValue) + ';expires=' + expireDate.toGMTString() + ';path=' + path + ';domain=' + domain;
            //escape()汉字转成unicode编码,toGMTString() 把日期对象转成字符串
        },
        //删除
        del: function (a, path, domain) {
            var date = new Date(),
                path = path || '/';

            domain = location.host.indexOf('.dmall.com') > 0 ? 'dmall.com' : domain;
            date.setTime(date.getTime() - 10000);
            document.cookie = a + "=; expires=" + date.toGMTString() + ';path=' + path + ';domain=' + domain;
        },
        //批量写入
        writeByObject: function (obj) {
            if (!obj) {
                return;
            }
            var p, val;

            for (p in obj) {
                val = obj[p] + '';
                if (p && val) {
                    handle.add(p, obj[p]);
                }
            }
        },
        //批量删除
        deleteByList: function (arr) {
            if (!arr) {
                return;
            }
            var i, key;
            for (i = 0; key = arr[i]; ++i) {
                handle.del(key);
            }
        }

    }
    define('cabin/common/cookie/cookie', function (require, exports, module) {
        module.exports = handle;
    });
})();
