import ajax from '../../common/ajax/ajax';
import utils from '../../common/utils/utils';

const app = getApp();
let handle;

handle = {
  getList : function( callback ) {
    ajax.request( {
      url : app.HOST_AJAX + '/app/ware/list',
      callback : callback
    } );
  },
  buyItem : function( data, callback ) {
    ajax.request( {
      url : app.HOST_AJAX + '/app/pay/wechatPrePay',
      data : data,
      callback : callback
    } );	
  }
}

export default handle;