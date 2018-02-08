import ajax from '../../common/ajax/ajax';
var App = getApp();
var HOST = App.HOST;

var url = {
  talks : HOST + 'api/answer_v1/activities' // api/answer_v1/activities/{activity_id}/talks
};


var handle = {
  getComment : function( actid, callback ) {
    ajax.query({
      url : url.talks + '/' + actid + '/talks',
      param : {
        limit : 20
      }
    }, callback);
  },
  postComment : function( actid, content, callback ) {
    if ( !content || !(content + '').trim() ) {
      return;
    }
    ajax.post({
      url : url.talks + '/' + actid + '/talks',
      param : {
        content : ( content + '' ).trim()
      }
    }, callback);
  }
};
module.exports = handle;