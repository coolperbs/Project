var handle, loadingTimmer;


handle = {
  showError : function( msg ) {
    wx.showModal( {
      title : '提示',
      content : msg, 
      showCancel : false
    } );
  },
  timeToDateObj : function( time ) {
    var date = new Date();

    date.setTime( time );

    return {
      time : time,
      day : date.getDate(),
      month : date.getMonth() + 1,
      year : date.getFullYear(),
      //week : weeks_ch[date.getDay()],
      hours : date.getHours(),
      minutes : date.getMinutes(),
      seconds : date.getSeconds()
    };   
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
    return Math.ceil( ( endTime - startTime + ( sysTime - currentTime ) ) / 1000 );
  } 
}

module.exports = handle;