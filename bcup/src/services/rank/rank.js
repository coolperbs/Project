import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'


export default {
  getRank ({type = 1}, callback) {
    ajax.get('/app/user/trader', {type}, (res) => {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  }
}

