import ajax from '../../common/ajax/ajax'
import utils from '../../common/utils/utils'

const app = getApp();
export default {
  apiList: {
    PVP: app.HOST_SOCKET + '/singleFightAgainst',
  },
  PVP_messageList: [],
  PVP_isConnect: false,
  PVP_socket: {},
  PVA_socket:{},
  PVA_isConnect:false,
  PVP_connect (danGrading, callback) {
    let UserInfo = utils.getStorageSync('userInfo') || {};
    let token = utils.getValueByPath(UserInfo, 'token');
    if (!token) {
      return
    }
    this.PVP_socket = ajax.connectSocket(this.apiList.PVP, {token: token, danGrading: danGrading || 1});
    this.PVP_socket.onOpen(res => {
      this.PVP_isConnect = true;
      callback(res);
    })
  },
  PVP_send (data) {
    console.log('发送：')
    console.log(data)
    var messageList = this.PVP_messageList;
    messageList.push(data);
    if (this.PVP_isConnect) {
      for (var i = 0; i < this.PVP_messageList.length; i++) {
        let data = JSON.stringify(this.PVP_messageList[i]);
        this.PVP_socket.send({
          data: data
        })
        this.PVP_messageList = [];
      }
    }
  },
  PVP_onMessage (callback) {
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
  PVP_onError (callback) {
    this.PVP_socket.onError(res => {
      utils.showToast({
        title: '连接错误！',
      });
    })
  },
  PVP_close () {
    if(this.PVP_isConnect){
      this.PVP_socket({})
    }
  },
  PVA_connect (danGrading, callback) {
    debugger
    this.PVA_socket = ajax.connectSocket(this.apiList.PVP, {type: 'ai', danGrading: danGrading || 1});
    this.PVA_socket.onOpen(res => {
      this.PVA_isConnect = true;
      callback(res);
    })
  },
  PVA_send (data) {
    var messageList = this.PVP_messageList;
    messageList.push(data);
    if (this.PVA_isConnect) {
      for (var i = 0; i < this.PVA_messageList.length; i++) {
        let data = JSON.stringify(this.PVA_messageList[i]);
        this.PVA_socket.send({
          data: data
        })
        this.PVA_messageList = [];
      }
    }
  },
  PVA_onMessage (callback) {
    this.PVA_socket.onMessage(res => {
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
  PVA_onError (callback) {
    this.PVA_socket.onError(res => {
      utils.showToast({
        title: '连接错误！',
      });
    })
  },
  PVA_close () {
    if(this.PVA_isConnect){
      this.PVA_socket({})
    }
  },
}