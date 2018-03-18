import ajax from '../../common/ajax/ajax'
import utils from '../../common/utils/util'

const app = getApp();
export default {
  apiList: {
    battleOneByOne: app.HOST_SOCKET + '/singleFightAgainst'
  },
  Connect (userId, danGrading) {
    ajax.connectSocket(this.apiList.battleOneByOne, {userId: userId || 123456, danGrading: danGrading || 1})
  },
  ConnectAi(danGrading){
    ajax.connectSocket(this.apiList.battleOneByOne, {type: 'ai', danGrading: danGrading || 1})
  },
  onOpen (callback) {
    ajax.onSocketOpen(res => {
      callback(res);
    })
  },
  onSocketMessage (callback) {
    ajax.onSocketMessage(res => {
      var res = (typeof res == 'string' ? JSON.parse(res) : res) ||null;
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
    ajax.sendSocketMessage(data)
  },
  onSocketError (callback) {
    ajax.onSocketError(res => {
      callback(res)
    })
  },
  onSocketClose (callback) {
    ajax.onSocketClose(res => {
      callback(res);
    })
  }

}