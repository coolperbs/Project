//app.js
App({
  HOST_SOCKET: 'ws://gamegw.soofylia.net/ws',
  HOST_AJAX: 'http://gamegw.soofylia.net',
  onHide() {
   /* let Time = new Date().getTime();
    wx.setStorageSync('hideTime', Time)*/
  },
  onShow() {
    /*let time = wx.getStorageSync('hideTime') || null;
    console.log(time)
    if (time) {
      let now = new Date().getTime();
      if ((now - time) > 120000) {
        wx.reLaunch({})
      }
    }*/
  }
})