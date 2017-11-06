(function() {
    var kayak, ROUTER, COOKIE, EVT, COOKIE, CFG, handle, _fn;

    CFG = {
        SCE: 'wx',
        TRACE_EVENT_DATA: 'data-traceevent',
        TRACE_DATA_STR: 'data-tracedata',
        VIEW_NAME_DATA: 'data-viewname',
        TRACE_EVENT_DATA: 'data-viewname',
        BACK_CLS: 'J_ToolBarBack',
        LINK_CLS: 'J_Link',
        CLICK_TRACE_CLS: 'J_ClickTrace',
        TIMEOUT: 20000,
    }
    handle = {
        init: function() {
            _fn.initBaidu();
        },
        // 百度统计上报
        trackPage: function() {
            var href = window.location.href;
            href = href.split('dmall.com');
            href.shift();
            href = href.join('/');
            href = href.replace('#', '?');
            _hmt.push(['_trackPageview', href]);
        },
        trackClick: function(event, data, jTarget) {
            var action = jTarget && jTarget.attr(CFG.TRACE_EVENT_DATA) || '',
                category = ROUTER.currentPath || '';

            event = event || action;
            if (!event) {
                return;
            }
            event = category + ' ' + event;
            var requestParam = ROUTER.requestParam,
                sourceId = requestParam.source_id || '',
                sourceLabel = event + ' ' + sourceId;

            _hmt.push(['_trackEvent', category, event, sourceLabel]);
        }
    }

    _fn = {
        //初始百度统计 引用js
        initBaidu : function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?3c760cfd485a098a377d76ceec857d7d";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        }
    }
    define('kayak/common/track/baidu', function(require, exports, module) {
        kayak = require('kayak/core/kayak');
        COOKIE = require('kayak/common/cookie/cookie');
        ROUTER = kayak.router;
        EVT = kayak.EVT;
        module.exports = handle;
    });
})();
