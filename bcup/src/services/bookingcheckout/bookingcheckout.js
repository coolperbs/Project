import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'

export default {
  getDisplayData ({wareId, bespeakId}, callback) {
    ajax.get('/app/bespoke/info/' + bespeakId, {}, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  },
  submit ({bespeakId, remark, ecode, username, userphone}, callback) {
    ajax.get('/app/bespoke/submit', {bespeakId, remark, ecode, username, userphone}, function (res) {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  }
}
