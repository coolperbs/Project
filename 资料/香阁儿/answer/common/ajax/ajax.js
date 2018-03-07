var sysInfo = wx.getSystemInfoSync(),
    handle,
    whiteList,
    _fn;

whiteList = [];

handle = {
    socket(option){
        //todo 这里还不确认能不能返回socketTask
    },
    request(object) {
        if (!object) {
            return
        }
        wx.request({
            url: object.url,
            data: object.data || {},
            method: object.method || 'get',
            header: object.header || {},
            success: function (res) {
                handle.responseWrapper(res, object.callback);
            },
            fail: function (res) {
                handle.responseWrapper(res, object.callback);
            }
        });
    },
    responseWrapper(res, callback) {
        //todo 如果socketTask 不可用 把responseWrapper 对外暴露方便统一使用
        //todo　所有接口返回结构如下
        res = {
            success: true,
            data: {},
            message: ''
        }
    }
}

_fn = {
    wrapParam(object) {
        return object.data || {};
        var userInfo = wx.getStorageSync('userinfo') || {},
            result;

        result = {
            param: JSON.stringify(object.data) || '',
            token: userInfo.token || ''
        };

        if (object && object.url && _fn.isInwhiteList(object.url)) {
            result.sys = JSON.stringify(sysInfo) || '';
        }
        return result;
    },
    isInwhiteList() {

    }
}

export default handle;