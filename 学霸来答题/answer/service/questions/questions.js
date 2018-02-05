import ajax from '../../common/ajax/ajax';
var App = getApp();
var HOST = App.HOST;

var url = {
  list : HOST + 'api/answer_v1/activities',
  question : HOST + 'api/answer_v1/activities'
};


var handle = {
  getList : function( callback ) {
    ajax.query( {
      url : url.list,
      param : {}
    }, callback );
  },
  getQuestion : function( id, callback ) {
    ajax.query( {
      url : url.question + '/' + id
    }, callback );
  }
};
module.exports = handle;