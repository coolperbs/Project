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
      // if (utils.isErrorRes(res)) {
      //   utils.showError(res.msg || '请求接口出错');
      //   return;
      // }
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
  //userinfo
  getUserInfo: function (callback) {
    ajax.get('/app/user/info', function (res) {

      if ( res && res.code * 1 == 8888 ) {
        window.location.replace('http://gw.ypzmkj.com/login?callbackUrl=' + window.location.href);
        return;
      }

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
  },
  // 绑定账号
  bindAccount ({tradeName, tradePhone}, callback) {
    ajax.get('/app/trader/account', {tradeName, tradePhone}, (res) => {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback && callback(res);
    });
  },
  //提现记录
  rakeBackList ({currentPage}, callback) {
    ajax.get('/app/money/apply/list', {currentPage}, (res) => {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback && callback(res);
    });
  },
  //返佣信息
  rakeInfo (callback) {
    ajax.get('/app/money/info', {}, (res) => {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback && callback(res);
    });
  },
  applyMoney ({price}, callback) {
    ajax.get('/app/money/apply', {price}, (res) => {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback && callback(res);
    });
  },
  //预约列表
  getBespokeList(callback){
    ajax.get('/app/bespeak/list', {}, (res) => {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback && callback(res);
    });
  }
}

export default handle;


