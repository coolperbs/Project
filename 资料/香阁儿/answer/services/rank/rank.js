import ajax from '../../common/ajax/ajax';
import utils from '../../common/utils/utils';

const app = getApp();
//app/danGrading/list  断位列表
export default {
  getRank: function (callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/danGrading/list',
      callback
    });
  }
}
