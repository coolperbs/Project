import ajax from '../../common/ajax/ajax'
import utils from '../../common/utils/utils'

const app = getApp();
export default {
  apiList: {
    PVP: app.HOST_SOCKET + '/singleFightAgainst',
    PVF: app.HOST_SOCKET + '/friendFightAgainst'
  },
  PVP_messageList: [],
  PVP_isConnect: false,
  PVP_socket: {},
  PVA_messageList: [],
  PVA_socket: {},
  PVA_isConnect: false,
  PVF_messageList: [],
  PVF_socket: {},
  PVF_isConnect: false,
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
    if (this.PVP_isConnect) {
      console.log('PVP close')
      this.PVP_socket.close({})
    }
  },
  PVA_connect (roomId, danGrading, callback) {
    this.PVA_socket = ajax.connectSocket(this.apiList.PVP, {type: 'ai', roomId: roomId, danGrading: danGrading || 1});
    this.PVA_socket.onOpen(res => {
      this.PVA_isConnect = true;
      callback(res);
    })
  },
  PVA_send (data) {
    var messageList = this.PVA_messageList;
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
    if (this.PVA_isConnect) {
      console.log('PVP close')
      this.PVA_socket.close({})
    }
  },
  PVF_connect (danGrading, token, roomId, callback) {
    this.PVF_socket = ajax.connectSocket(this.apiList.PVF, {token: token, roomId: roomId, danGrading: danGrading || 1});
    this.PVF_socket.onOpen(res => {
      this.PVF_isConnect = true;
      callback(res);
    })
  },
  PVF_send (data) {
    var messageList = this.PVF_messageList;
    messageList.push(data);
    if (this.PVF_isConnect) {
      for (var i = 0; i < this.PVF_messageList.length; i++) {
        let data = JSON.stringify(this.PVF_messageList[i]);
        this.PVF_socket.send({
          data: data
        })
        this.PVF_messageList = [];
      }
    }
  },
  PVF_onMessage (callback) {
    this.PVF_socket.onMessage(res => {
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
  PVF_onError (callback) {
    this.PVF_socket.onError(res => {
      utils.showToast({
        title: '连接错误！',
      });
    })
  },
  PVF_close () {
    if (this.PVF_isConnect) {
      console.log('PVF close')
      this.PVF_socket.close({})
    }
  },
}