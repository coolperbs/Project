import ajax from '../../common/ajax/ajax'
import utils from '../../common/utils/utils'

const app = getApp();
export default {
  apiList: {
    battleOneByOne: app.HOST_SOCKET + '/singleFightAgainst'
  },
  PVP_socket: {},
  Connect (danGrading) {
    let userInfo = utils.getStorageSync('userInfo') || {};
    let token = userInfo.token;
    this.PVP_socket = ajax.connectSocket(this.apiList.battleOneByOne, {token: token, danGrading: danGrading || 1})
  },
  ConnectAi (danGrading) {
    ajax.connectSocket(this.apiList.battleOneByOne, {type: 'ai', danGrading: danGrading || 1})
  },
  onOpen (callback) {
    this.PVP_socket.onOpen(res => {
      callback(res);
    })
  },
  onSocketMessage (callback) {
    this.PVP_socket.onMessage(res => {
      debugger
      var res = (typeof res.data == 'string' ? JSON.parse(res.data) : res.data) || null;
      if (res.code != '0000') {
        utils.showToast({
          title: res.msg || res.message || '',
        });
        return
      }
      callback(res.data);
    })
  },
  sendSocketMessage (data) {
    this.PVP_socket.send(data)
  },
  onSocketError (callback) {
    this.PVP_socket.onError(res => {
      callback(res)
    })
  },
  socketClose () {
    this.PVP_socket.close({})
  }

}