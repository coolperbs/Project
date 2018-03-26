// pages/friendbattle/friendbattle.js
import {battle} from '../../services/index'
import utils from '../../common/utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: '',
    level: '',
    roomUsers: [],
    roomOwner: '',
    totalPoint: '',
    userId: '',
    subject: {},
    subjectCount: 0,
    Timer: null,
    isAnswered: false,
    result: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      level: options.level || 1,
      roomId: options.roomId || ''
    });
    this.initPage();
  },
  /**
   * 初始化
   * */
  initPage () {
    let UserInfo = utils.getStorageSync('userInfo') || {};
    let token = utils.getValueByPath(UserInfo, 'token');
    if (!token) {
      console.log('获取用户信息失败了')
      return
    }
    this.setData({
      userId: UserInfo.user.id
    });
    battle.PVF_connect(this.data.level, token, this.data.roomId, () => {
      console.log('好友对战连接成功:----------------------');
      this.getMessage();
    })
  },
  /**
   * 监听信息
   * */
  getMessage () {
    battle.PVF_onMessage((res) => {
      console.log('好友对战接收到消息了:----------------------');
      if (res.type == 1) {
        this.initRoom(res);
      }
      if (res.type == 2) {
        console.log('好友连接上了:-----------------------------');
        this.updateRoom(res);
      }
    })
  },
  /**
   * 初始化房间信息
   * */
  initRoom (res) {
    console.log('房间信息:-----------------');
    console.log(res);
    console.log('房间信息:-----------------');
    console.log(res.roomId)
    this.setData({
      roomUsers: res.roomUsers || [],
      roomOwner: res.userId || '',
      roomId: res.roomId || '',
      totalPoint: res.totlePoint || ''
    })
  },
  /**
   * 更新房间信息
   * */
  updateRoom (res) {
    console.log('房间信息更新:-----------------');
    console.log(res);
    console.log('房间信息更新:-----------------');
    this.setData({
      roomUsers: res.roomUsers || [],
    })
  },
  /**
   * 发送消息
   * */
  sendMessage (data) {
    battle.PVF_send(data);
  },
  /**
   * 开始对战
   * */
  startBattle () {
    this.sendMessage({"type": 4});
    this.animationEvt('start', () => {

    })
    this.getSubject();
  },
  /**
   * 场景动画
   * */
  animationEvt (type, callback) {
    let room = wx.wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    if (type == 'reset') {
      //所有动画还原
    }
    if (type == 'start') {
      //隐藏房间
      room.opacity(0).setp();
      this.setData({
        roomAniData: room.export()
      })
      setTimeout(() => {
        callback && callback();
      }, 500)
    }
  },
  /**
   * 获取题目
   * */
  getSubject () {
    this.sendMessage({type: 1, subjectOffset: this.data.subjectCount + 1})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '等你来战',
      path: '/pages/friendbattle/friendbattle?roomId=' + this.data.roomId,
      //image: '',
      success: function (res) {
        // utils.showToast({
        //   title: '邀请已发送!'
        // })
      },
      fail: function (res) {
        // utils.showToast({
        //   title: '邀请失败!'
        // })
      }
    }
  }
})