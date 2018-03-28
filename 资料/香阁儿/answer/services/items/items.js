import ajax from '../../common/ajax/ajax';
import utils from '../../common/utils/utils';

const app = getApp();
let handle;

handle = {
  getList : function() {
    ajax.request( {
      url : app.HOST_AJAX + '',
      callback : function() {

      }
    } );
  }
}

export default handle;