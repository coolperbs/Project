import ajax from '../../common/ajax/ajax';
import utils from '../../common/utils/utils';

const app = getApp();
let handle;

///user/rank/list 用户好友榜
///rank/list  世界排行榜
handle = {
  getRank : function() {
    ajax.request( {
      url : app.HOST_AJAX + '/user/rank/list',
      callback : function( res ) {
      	console.log( res );
      }
    }, function() {
      
    } );
  },
  getGlobalRank : function() {

  }
}
//todo 调用报错 零时注释掉
//handle.getRank();
export default handle;