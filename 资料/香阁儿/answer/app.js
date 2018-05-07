//app.js
App({
  HOST_SOCKET: 'wss://gamegw.soofylia.net/ws',
  HOST_AJAX: 'https://gamegw.soofylia.net',
  onHide() {
    // let time = wx.getStorageSync('hideTime') || null;
    // if (!time) {
    //   time = new Date().getTime();
    //   wx.setStorageSync('hideTime', time)
    // }
  },
  onShow() {
    // let time = wx.getStorageSync('hideTime') || null;
    // let now = new Date().getTime();
    // if (time) {
    //   if ((now - time) > 50000) {
    //     wx.reLaunch({
    //       url:'../home/home'
    //     })
    //     wx.clearStorageSync('hideTime')
    //   }
    // }
  }
})