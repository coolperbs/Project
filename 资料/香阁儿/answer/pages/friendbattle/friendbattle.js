// pages/friendbattle/friendbattle.js
import {battle} from '../../services/index'
import utils from '../../common/utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isConnect: false,
    roomId: '',
    level: '',
    roomUsers: [],
    roomOwner: '',
    totalPoint: '',
    userId: '',
    subject: {},
    subjectList: [],
    subjectCount: 0,
    hansMore: true,
    countDownTime: 10,
    isAnswered: false,
    result: {},
    showRoom: true,
    roomAniData: {},
    isEnd: false
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
      this.setData({
        isConnect: true
      });
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
      if (res.type == 3) {
        console.log('得到题目了:-----------------------------');
        this.filterSubject(res);
      }
      if (res.type == 4) {
        console.log('得到答案了:-----------------------------');
        this.updatePoint()
      }
      if (res.type == 5) {
        console.log('游戏结束:-----------------------------');
        this.endGame(res)
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
      this.getSubject();
    })
  },
  /**
   * 场景动画
   * */
  animationEvt (type, callback) {
    let room = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    if (type == 'reset') {
      //所有动画还原
      room.opacity(1).step();
      this.setData({
        roomAniData: room.export()
      });
      setTimeout(() => {
        this.setData({
          showRoom: true
        });
        callback && callback();
      }, 500)
    }
    if (type == 'start') {
      //隐藏房间
      room.opacity(0).step();
      this.setData({
        roomAniData: room.export()
      });
      setTimeout(() => {
        this.setData({
          showRoom: false
        });
        callback && callback();
      }, 500)
    }
  },
  /**
   * 获取题目
   * */
  getSubject () {
    if (!this.data.hasMore) {
      //本次对战结束 算分了！！！！！
      this.sendMessage({type: 3});
      return
    }
    this.setData({
      subjectCount: this.data.subjectCount + 1,
      countDownTime: 10
    });
    this.sendMessage({type: 1, subjectOffset: this.data.subjectCount})
  },
  /**
   * 拿到题目
   * */
  filterSubject (res) {
    console.log('获取的题目:-------------------------------')
    console.log(res)
    console.log('获取的题目:-------------------------------')
    let subject = this.data.subject;
    if (utils.getValueByPath(subject, 'subject.pushTime') == res.subject.pushTime) {
      //避免题目二次渲染
      return
    }
    //题目数据重构
    var subjectList = res.subject.optionList.map((item) => {
      var result = {};
      result.className = '';
      result.label = item;
      return result
    });
    delete res.subject.optionList;
    this.setData({
      subject: res,
      subjectList: subjectList,
      hasMore: res.hasMore,
      isAnswered: false
    });
    this.setData({
      subject: res.subject,
      hasMore: res.hasMore,
    });
    //题目动画
    this.subjectAnimation(1, () => {
      //开始倒计时
      this.startTheInterval();
    })
  },
  /**
   * 更新分数
   * */
  updatePoint (res) {
    console.log('得到答案更新用户分数:--------------------------------------')
    console.log(res);
    console.log('得到答案更新用户分数:--------------------------------------')
    let resultUser = res.userId;
    let index = this.data.roomUsers.findIndex((el) => {
      return el.id == resultUser
    })
    let roomUser = this.data.roomUsers;
    let updateUser = roomUser[index];
    updateUser['point'] += res.point;
    updateUser['pointBar'] = ((updateUser.point * 100) / this.data.roomInfo.totlePoint).toFixed(2);
    roomUser[index] = updateUser;
    this.setData({
      roomUsers: roomUser
    });
    this.filterOptionListEvt(res);
    if (res.mayNextSub) {
      //提前结束这道题
      this.clearInterval(() => {
        this.subjectAnimation(4, () => {
          this.getSubject();
        })
      })
    }
  },
  /**
   * 题目动画
   * */
  subjectAnimation (type, callback) {
    // 1 展示类型和第几题 自动展示 2
    // 2 展示题目 和选项
    // 3 展示此题答完状态
    // 4 清场状态 全部隐藏 延迟3秒执行
  },
  /**
   * 答题倒计时
   * */
  startTheInterval () {
    this.clearTheInterval(() => {
      this.Timer = setInterval(() => {
        if (this.data.countDownTime <= 0) {
          this.clearTheInterval(() => {
            this.answerSubject();
          });
        } else {
          this.setData({
            countDownTime: this.data.countDownTime - 1
          })
        }
      }, 1000);
    });
  },
  /**
   * 提前结束本道题
   * */
  clearTheInterval (callback) {
    if (this.Timer) {
      clearInterval(this.Timer)
    }
    callback && callback();
  },
  /**
   * 答题
   * */
  answerSubject (e) {
    let answer = e ? e.currentTarget.dataset.index : 0;
    if (this.data.answered) {
      return
    }
    this.setData({
      isAnswered: true
    });
    this.sendMessage({
      "type": 2,
      "optionId": answer,		// 用户回答的选项ID，从1开始
      "subjectOffset": this.data.subjectCount	// 用户回答的题目ID
    });
  },
  /**
   * 结束游戏
   * */
  endGame (res) {
    console.log('游戏结束:--------------------------------------')
    console.log(res)
    console.log('游戏结束:--------------------------------------')
    if (this.data.isEnd) {
      return
    }
    this.setData({
      isEnd: true,
    });
    //获取当前用户,
    let result = res.fightResults;
    let currentUser = this.data.userId;
    let roomUser = this.data.roomUsers;
    //计算玩家分数
    for (var i = 0; i < roomUser.length; i++) {
      for (var k = 0; k < result.length; k++) {
        if (roomUser[i].id == result[k].userId) {
          roomUser[i].point = result[k].totlePoint;
          roomUser[i].pointBar = ((roomUser[i].point * 100) / this.data.totalPoint).toFixed(2);
        }
      }
    }
    //判断当前玩家赢没有
    let index = result.findIndex((el) => {
      return el.userId == currentUser
    });
    let flag = false;
    if (result[index] && result[index].result) {
      flag = true;
    }
    console.log('玩家数据');
    console.log(result[index]);
    this.setData({
      roomUsers: roomUser,
      WINNER: flag,
      showResultData: result[index]
    });
    this.closeConnect();
  },

  /**
   * 关闭连接
   * */
  closeConnect () {
    console.log('关闭连接:-------------------------------------')
    if (this.isConnect) {
      battle.PVF_close();
    }
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