import ajax from '../../common/ajax/ajax';


const app = getApp();
let handle;

///user/rank/list 用户好友榜
///rank/list  世界排行榜
handle = {
  getLevelInfo: function (callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/user/profile',
      callback: callback
    });
  },
  shareGetGold: function (callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/user/share',
      callback: callback
    });
  },
  getUpdateList (callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/question/type',
      callback: callback
    });
  },
  updateList (data, callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/question/upgrade',
      data: data,
      callback: callback
    });
  }
}

//handle.getGlobalRank();
export default handle;