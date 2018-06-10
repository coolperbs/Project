import ajax from '../../common/ajax/ajax'
import utils from '../../common/utils/utils'

const app = getApp();
export default {
  apiList: {
    PVP: app.HOST_SOCKET + '/singleFightAgainst',
    PVF: app.HOST_SOCKET + '/friendFightAgainst',
    TVT: app.HOST_SOCKET + '/teamFightAgainst',
  },
  PVP_messageList: [],
  PVP_isConnect: false,
  PVP_socket: {},
  TVT_messageList: [],
  TVT_isConnect: false,
  TVT_socket: {},
  TVA_messageList: [],
  TVA_isConnect: false,
  TVA_socket: {},
  PVA_messageList: [],
  PVA_socket: {},
  PVA_isConnect: false,
  PVF_messageList: [],
  PVF_socket: {},
  PVF_isConnect: false,
  PVP_connect (danGrading, token, callback) {
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
        if (this.PVP_isConnect) {
          utils.showToast({
            title: res.msg || res.message || ''
          });
        }
        callback(res);
      }
      callback(res);
    })
  },
  PVP_onError (callback) {
    this.PVP_socket.onError(res => {
      console.log(res)
      utils.showToast({
        title: '连接错误！'
      });
    })
  },
  PVP_close () {
    if (this.PVP_isConnect) {
      console.log('PVP close')
      this.PVP_socket.close({})
    }
  },
  TVT_connect (danGrading, token, roomId, teamId, callback) {
    this.TVT_socket = ajax.connectSocket(this.apiList.TVT, {
      token: token,
      roomId: roomId,
      teamId: teamId,
      danGrading: danGrading || 1,
    });
    console.log('链接数据')
    console.log({
      token: token,
      roomId: roomId,
      teamId: teamId,
      danGrading: danGrading || 1,
    })
    console.log('链接数据')
    this.TVT_socket.onOpen(res => {
      this.TVT_isConnect = true;
      callback(res);
    })
  },
  TVT_send (data) {
    console.log('发送：')
    console.log(data)
    var messageList = this.TVT_messageList;
    messageList.push(data);
    if (this.TVT_isConnect) {
      for (var i = 0; i < this.TVT_messageList.length; i++) {
        let data = JSON.stringify(this.TVT_messageList[i]);
        this.TVT_socket.send({
          data: data
        })
        this.TVT_messageList = [];
      }
    }
  },
  TVT_onMessage (callback) {
    this.TVT_socket.onMessage(res => {
      var res = (typeof res.data == 'string' ? JSON.parse(res.data) : res.data) || null;
      if (res.code != '0000') {
        if (this.TVT_isConnect) {
          utils.showToast({
            title: res.msg || res.message || ''
          });
        }
        callback(res);
      }
      callback(res);
    })
  },
  TVT_onError (callback) {
    this.TVT_socket.onError(res => {
      console.log(res)
      utils.showToast({
        title: '连接错误！'
      });
    })
  },
  TVT_close () {
    if (this.TVT_isConnect) {
      console.log('VT close')
      this.TVT_socket.close({})
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
        if (this.PVA_isConnect) {
          utils.showToast({
            title: res.msg || res.message || ''
          });
        }
        callback(res);
      }
      callback(res);
    })
  },
  PVA_onError (callback) {
    this.PVA_socket.onError(res => {
      console.log(res)
      utils.showToast({
        title: '连接错误！'
      });
    })
  },
  PVA_close () {
    if (this.PVA_isConnect) {
      console.log('PVA close')
      this.PVA_socket.close({})
    }
  },
  PVF_connect (danGrading, token, roomId, type, isOwner, callback) {
    this.PVF_socket = ajax.connectSocket(this.apiList.PVF, {
      token: token,
      roomId: roomId,
      danGrading: danGrading || 1,
      type: type || null,
      isOwner: isOwner || false
    });
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
        if (this.PVF_isConnect) {
          utils.showToast({
            title: res.msg || res.message || ''
          });
        }
        callback(res);
      }
      callback(res);
    })
  },
  PVF_onError (callback) {
    this.PVF_socket.onError(res => {
      console.log(res)
      utils.showToast({
        title: '连接错误！'
      });
    })
  },
  PVF_close () {
    if (this.PVF_isConnect) {
      console.log('PVF close')
      this.PVF_socket.close({})
    }
  },
  TVA_connect (danGrading, teamId, callback) {
    this.TVA_socket = ajax.connectSocket(this.apiList.TVT, {
      type: 'ai',
      teamId: teamId,
      danGrading: danGrading || 1,
    });
    console.log('链接数据')
    console.log({
      teamId: teamId,
      danGrading: danGrading || 1,
    })
    console.log('链接数据')
    this.TVA_socket.onOpen(res => {
      this.TVA_isConnect = true;
      callback(res);
    })
  },
  TVA_send (data) {
    console.log('发送：')
    console.log(data)
    var messageList = this.TVA_messageList;
    messageList.push(data);
    if (this.TVA_isConnect) {
      for (var i = 0; i < this.TVA_messageList.length; i++) {
        let data = JSON.stringify(this.TVA_messageList[i]);
        this.TVA_socket.send({
          data: data
        })
        this.TVA_messageList = [];
      }
    }
  },
  TVA_onMessage (callback) {
    this.TVA_socket.onMessage(res => {
      var res = (typeof res.data == 'string' ? JSON.parse(res.data) : res.data) || null;
      if (res.code != '0000') {
        if (this.TVA_isConnect) {
          utils.showToast({
            title: res.msg || res.message || ''
          });
        }
        callback(res);
      }
      callback(res);
    })
  },
  TVA_onError (callback) {
    this.TVA_socket.onError(res => {
      console.log(res)
      utils.showToast({
        title: '连接错误！'
      });
    })
  },
  TVA_close () {
    if (this.TVA_isConnect) {
      console.log('VT close')
      this.TVA_socket.close({})
    }
  },
  addFriend (roomUsers, callback) {
    ajax.request({
      url: app.HOST_AJAX + '/app/user/friendship',
      data: {users: roomUsers || ''},
      callback: callback
    });
  },
  createRoom (callback) {
    ajax.request({
      url: app.HOST_AJAX + '/room/id',
      callback: callback
    });
  }
}

