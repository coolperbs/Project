import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'

export default {
  getBookingDetail (wareId, callback) {
    ajax.get('/app/bespoke/detail/' + wareId, {}, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  }
}
