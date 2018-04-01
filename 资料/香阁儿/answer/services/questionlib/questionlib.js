import ajax from '../../common/ajax/ajax'

const app = getApp();
export default {
  getTypeArr (callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/question/types',
      callback: callback
    });
  },
  inputQ (q, callback) {
    ajax.request({
      data: q,
      url: app.HOST_AJAX + '/app/question/saveOrUpdate',
      callback: callback
    });
  },
  getList(data,callback){
    ajax.request({
      data: data,
      url: app.HOST_AJAX + '/app/question/list',
      callback: callback
    });
  }
}