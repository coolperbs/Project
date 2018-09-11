import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'

let handle;


handle = {
  // 申请成为达人
  applyTrader: function (param, callback) {
    ajax.get('/app/apply/trader', param, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  },

  // 绑定普通分销关系
  applyBinding: function (param, callback) {
    ajax.get('/app/trader/binding', param, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback && callback(res);
    });
  },

  // 获取基本信息
  getBaseInfo: function (callback) {
    ajax.get('/app/trader/info', function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback && callback(res);
    });
  },
  // 获取返佣记录
  getRakeBackRecord ({type, currentPage}, callback) {
    ajax.get('/app/user/money', {type, currentPage}, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback && callback(res);
    });
  }
}

export default handle;


