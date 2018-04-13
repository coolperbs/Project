/**
 * Created by k186 on 2018/4/11.
 * Name:
 * GitHub:
 * Email: k1868548@gmail.com
 */
import ajax from '../../common/ajax/ajax';


const app = getApp();
//app/danGrading/list  断位列表
export default {
  getNotice: function (callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/notice',
      callback
    });
  },
  readNotice: function (data, callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/notice/read',
      data: {...data},
      callback
    });
  }
}
