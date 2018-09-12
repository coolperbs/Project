import ajax from '@/common/ajax/ajax'
import utils from '@/common/utils/utils'

export default {
  getTeam: function ({type}, callback) {
    ajax.get('/', {type}, (res) => {
      if (utils.isErrorRes(res)) {
        utils.showError(res.msg || '请求接口出错');
        return;
      }
      callback(res);
    });
  },
}
