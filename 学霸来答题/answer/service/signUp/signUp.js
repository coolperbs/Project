import ajax from '../../common/ajax/ajax'

var App = getApp();
module.exports={
  getRegCode(phone,callback){
    ajax.post({
      url:App.GET_API('POST_verification_requests'),
      param:{
        phone:phone
      }
    }, function (result) {
      callback && callback(result);
    })
  },
  checkRegCode(regCode,callback){
    ajax.post({
      url:App.GET_API('POST_verification'),
      param:{
        code:regCode
      }
    }, function (result) {
      callback && callback(result);
    })
  }
};