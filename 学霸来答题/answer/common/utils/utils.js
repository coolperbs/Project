var handle, loadingTimmer;


handle = {
  showError : function( msg ) {
    wx.showModal( {
      title : '提示',
      content : msg, 
      showCancel : false
    } );
  },

  showLoading : function() {
    var param, time;
    if ( arguments.length == 1 ) {
      param = {};
      time = arguments[0];
    } else {
      param = arguments[0] || {};
      time = arguments[1];
    }
    param.title = param.title || '加载中...';
    if ( time && time > 0 ) {
      loadingTimmer = setTimeout( function() {
        wx.showLoading( param );
      }, time );
      return;
    }

    wx.showLoading( param );
  },
  hideLoading : function() {
    clearTimeout( loadingTimmer );
    wx.hideLoading();
  }, 
  countTime : function( startTime, endTime, currentTime, sysTime ) {
    if ( !startTime || !endTime || !currentTime || !sysTime ) {
      return undefined;
    }
    return endTime - startTime;
  } 
}

module.exports = handle;