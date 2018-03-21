import ajax from '../../common/ajax/ajax'
import utils from '../../common/utils/utils'
import {login} from '../../services/index'

const app = getApp();
export default {
  apiList: {
    PVP: app.HOST_SOCKET + '/singleFightAgainst'
  },
  PVP_socket: {},
  PVP_connect(danGrading,callback) {
    //todo 走 user server 去拿 没有调登陆
    let UserInfo = login.getLoginInfo() || {};
    let token = utils.getValueByPath(UserInfo, 'token');
    if (!token) {
      return
    }
    this.PVP_socket = ajax.connectSocket(this.apiList.PVP, {token: token, danGrading: danGrading || 1});
    this.PVP_socket.onOpen(res => {
      callback(res);
    })
  },
  PVP_onMessage(callback){
    this.PVP_socket.onMessage(res => {
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
  PVP_onError(callback){
    this.PVP_socket.onError(res=>{
      utils.showToast({
        title: '连接错误！',
      });
    })
  }
}