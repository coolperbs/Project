import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'

export default {
  getBookingList ( callback) {
    ajax.get('/app/bespoke/index', {}, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  }
}
