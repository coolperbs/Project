import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'

let handle;

handle = {
  create: function (param, callback) {
    ajax.get('/app/order/buynow/submit', param, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  },
  buyNow ({skuId,skuNum}, callback) {
    ajax.get('/app/trade/buynow', {skuId, skuNum}, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  },
  get: function (param, callback) {
    ajax.get('/app/order/info', param, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  },
  getList: function (param, callback) {
    ajax.get('/app/order/list', param, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  },
  cancelOrder ({orderId}, callback) {
    ajax.get('/app/order/cancel', {orderId}, (res) => {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  }
}

export default handle;
