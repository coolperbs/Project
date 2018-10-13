import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'

export default {
  getPhoneCode (phoneNumber, callback) {
    ajax.get('/app/msg/find/ecode/' + phoneNumber, {}, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  },
  getECode ({phone, checkCode, orderId = ''}, callback) {
    ajax.get('/findEcode', {phone, checkCode, orderId}, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      alert( '电子码已发出' );
      callback(res);
    });
  }
}
