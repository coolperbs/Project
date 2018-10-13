var ajax = require('../../common/ajax/ajax'),
    app = getApp(),
    url,
    CFG,
    _fn,
    handle;

url = {
  submit: app.host + '/app/bespeak/submit',
  list: app.host + '/app/bespeak/list',
  get: app.actHost + '/bespeak/render'
};

handle = {
  submit: function (param, callback) {
    ajax.query({
      url: url.submit,
      param: param
    }, function (res) {
      callback && callback(res);
    });
  },
  query: function (param, callback) {
    ajax.query({
      url: url.get,
      param: param
    }, callback);
  },
  getList: function (param, callback) {
    ajax.query({
      url: url.list,
      param: param
    }, function (res) {
      callback && callback(res);
    });
  }
};

module.exports = handle;