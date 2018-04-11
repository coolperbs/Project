import ajax from "../../common/ajax/ajax";
import utils from "../../common/utils/utils"

const app = getApp();
export default {
  checkSingleAuthorize (scopeItem, callback) {
    wx.getSetting({
      success: (response) => {
        if (response.authSetting[scopeItem]) {
          callback && callback(true);
        } else if (response.authSetting[scopeItem] == undefined) {
          wx.authorize({
            scope: scopeItem,
            success () {
              callback && callback(true);
            },
            fail () {
              callback && callback(false);
            }
          })
        } else {
          callback && callback(false);
        }
      }
    })
  },
  login (callback) {
    let that = this;
    this.checkSingleAuthorize('scope.userInfo', (res) => {
      if (!res) {
        utils.showAction('需要开启授权才能进行游戏哦~', res => {
          if (res) {
            wx.openSetting()
          }
        });
        return
      }
      wx.login({
        success (res1) {
          wx.getUserInfo({
            lang: 'zh_CN',
            success (res2) {
              wx.showToast({
                title: '登录中...',
                icon: 'loading'
              });
              ajax.request({
                url: app.HOST_AJAX + '/login',
                data: {code: res1.code, iv: res2.iv, encryptedData: res2.encryptedData},
                callback (res3) {
                  if(res3.code!='0000'){
                    callback && callback(false)
                  }else {
                    utils.setStorageSync('userInfo', res3.data);
                    callback && callback(true)
                  }
                }
              })
            }
          })
        }
      });
    })

  },
  isLogin (callback) {
    let UserInfo = this.getLoginInfo();
    if (UserInfo) {
      callback(true)
    } else {
      callback(false)
    }
  },
  getLoginInfo () {
    let userInfo = utils.getStorageSync('userInfo') || null;
    return userInfo
  },
  getDailyCheckData (callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/login/ware/list',
      callback: callback
    });
  },
  dailyCheck (data, callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/login/ware/use/' + data.wareId + '/' + data.wareNum,
      callback: callback
    });
  }
}