import ajax from '../../common/ajax/ajax';
import utils from '../../common/utils/utils';

const app = getApp();
let handle;

///user/rank/list 用户好友榜
///rank/list  世界排行榜
handle = {
  getFriendsRank : function( callback ) {
    ajax.request( {
      url : app.HOST_AJAX + '/app/user/rank/list',
      callback : callback
    } );
  },
  getGlobalRank : function( callback ) {
    ajax.request( {
      url : app.HOST_AJAX + '/app/rank/list',
      callback : callback
    });
  }
}

//handle.getGlobalRank();
export default handle;