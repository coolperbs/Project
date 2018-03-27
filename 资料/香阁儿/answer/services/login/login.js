import ajax from "../../common/ajax/ajax";
import utils from "../../common/utils/utils"

const app = getApp();
export default {
  apiList: {
    login: app.HOST_AJAX + '/login'
  },
  login(callback) {
    let that = this;
    wx.login({
      success(res1) {
        wx.getUserInfo({
          lang: 'zh_CN',
          success(res2) {
            console.log({code: res1.code, iv: res2.iv, encryptedData: res2.encryptedData})
            ajax.request({
              url: that.apiList.login,
              data: {code: res1.code, iv: res2.iv, encryptedData: res2.encryptedData},
              callback(res3) {
                //本地信息缓存
                console.warn(res3.data.token)
                utils.setStorageSync('userInfo', res3.data);
                callback&&callback(true)
              }
            })
          },
          fail(res) {
            utils.showAction('请开启授权,否则无法正常体验小程序', (res) => {
              if (res) {
                wx.openSetting({});
              }
            });
            callback&&callback(false)
          }
        })
      }
    });
  },
  isLogin(callback) {
    let UserInfo = this.getLoginInfo();
    if (UserInfo) {
      callback(true)
    } else {
      callback(false)
    }
  },
  getLoginInfo() {
    let userInfo = utils.getStorageSync('userInfo') || null;
    return userInfo
  }
}