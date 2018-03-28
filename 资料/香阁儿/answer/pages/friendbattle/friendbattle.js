// pages/friendbattle/friendbattle.js
import {battle} from '../../services/index'
import utils from '../../common/utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isConnect: false,
    WINNER: false,
    roomId: '',
    level: '',
    roomUsers: [],
    roomOwner: '',
    totalPoint: '',
    userId: '',
    subject: {},
    subjectList: [],
    subjectCount: 0,
    hasMore: true,
    countDownTime: 10,
    isAnswered: false,
    result: {},
    showRoom: true,
    roomAniData: {},
    qTypeData: {},
    qListData: {},
    isEnd: false,
    errorShaking: false
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
      if (res.code != '0000') {
        this.closeConnect();
        return
      }
      res = res.data;
      if (res.type == 1) {
        this.initRoom(res);
      }
      if (res.type == 2) {
        console.log('好友连接上了:-----------------------------');
        this.updateRoomUser(res.roomUsers);
      }
      if (res.type == 3) {
        console.log('得到题目了:-----------------------------');
        if (this.data.showRoom) {
          this.setData({
            subjectCount: 1
          })
          this.animationEvt('start', () => {
            this.filterSubject(res);
          })
        } else {
          //等待动画同步
          setTimeout(() => {
            this.filterSubject(res);
          }, 1000)
        }

      }
      if (res.type == 4) {
        console.log('得到答案了:-----------------------------');
        this.updatePoint(res)
      }
      if (res.type == 5) {
        console.log('游戏结束:-----------------------------');
        this.endGame(res)
      }
      if (res.type == '6') {
        //todo 这里可能有问题 需要核对
        this.clearTheInterval();
        this.subjectAnimation(4, () => {
          this.sendMessage({type: 3})
        })
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
      roomId: res.roomId || '',
      totalPoint: res.totlePoint || ''
    })
    this.updateRoomUser(res.roomUsers);
  },
  /**
   * 更新房间信息
   * */
  updateRoomUser (res) {
    console.log('房间信息更新:-----------------');
    console.log(res);
    console.log('房间信息更新:-----------------');
    let that = this;
    let roomUsers = res.map((el) => {
      el.point = 0;
      if (el.owner) {
        that.setData({
          roomOwner: el.id
        })
      }
      return el;
    });
    //补全 5个用户
    for (var k = roomUsers.length; k < 5; k++) {
      roomUsers.push({
        point: 0,
      })
    }
    this.setData({
      roomUsers: roomUsers
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
    if (this.data.roomUsers)
      this.sendMessage({"type": 7});
    this.animationEvt('start', () => {
      this.getSubject();
    })
  },
  /**
   * 取消对战
   * */
  cancelBattle () {
    this.closeConnect();
    wx.navigateBack(1)
  },
  /**
   * 场景动画
   * */
  animationEvt (type, callback) {
    let room = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
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
    if (subject.pushTime == res.subject.pushTime) {
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
      subject: res.subject,
      subjectList: subjectList,
      hasMore: res.hasMore,
      isAnswered: false
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
    roomUser[index] = updateUser;
    this.setData({
      roomUsers: roomUser
    });
    this.filterSubjectListEvt(res);
    if (res.mayNextSub) {
      if (!this.data.hasMore) {
        //获取对战结果
        /*结果展示2秒*/
        this.clearTheInterval();
        setTimeout(() => {
          this.subjectAnimation(4, () => {
            this.sendMessage({type: 3});
          })
        }, 2000);
        return
      }
      //提前结束这道题
      this.clearTheInterval(() => {
        /*结果展示2秒*/
        setTimeout(() => {
          this.subjectAnimation(4, () => {
            this.getSubject();
          })
        }, 2000)
      })
    }
  },
  /**
   * 题目选项过滤
   * */
  filterSubjectListEvt (res) {
    let subject = this.data.subject;
    let rightOption = subject.rightOption;
    let userId = this.data.userId;

    let optionId = res.optionId;
    let mayNextSub = res.mayNextSub;


    let subjectList = this.data.subjectList;
    let checkIndex = optionId - 1;
    let rightIndex = rightOption - 1;
    //没有选择
    if (optionId <= 0) {
      subjectList[rightIndex].className = 'success';
    } else {
      //选择了
      //只展示勾选
      if (checkIndex == rightIndex && res.userId == userId) {
        subjectList[checkIndex].className = 'success';
      } else if (checkIndex != rightIndex && res.userId == userId) {
        subjectList[checkIndex].className = 'error';
        wx.vibrateLong({});
        let count = 3;
        let timer = setInterval(() => {
          if (count <= 0) {
            clearInterval(timer);
            this.setData({
              errorShaking: false
            })
          } else {
            count -= 1;
            this.setData({
              errorShaking: !this.data.errorShaking
            })
          }
        }, 100);
      } else {
        subjectList[checkIndex].className = 'check';
      }
    }

    //这道题都答了 就显示正确答案 并把双方答案判断正确和错误
    if (mayNextSub) {
      //显示正确选项
      subjectList[rightIndex].className = 'success';
      for (let i = 0; i < subjectList.length; i++) {
        if (subjectList[i].className == '') {
          subjectList[i].className = 'hide'
        } else if (subjectList[i].className == 'check') {
          subjectList[i].className = 'error'
        }
      }
    }
    this.setData({
      subjectList: subjectList
    })
  },
  /**
   * 题目动画
   * */
  subjectAnimation (type, callback) {
    // 1 展示类型和第几题 自动展示 2
    // 2 展示题目 和选项
    // 3 展示此题答完状态
    // 4 清场状态 全部隐藏 延迟3秒执行
    let typeAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    let boxAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    if (type == '1') {
      typeAni.scale(1).step();
      this.setData({
        qTypeData: typeAni.export()
      });
      setTimeout(() => {
        this.subjectAnimation(2, callback)
      }, 1000)
    }
    if (type == '2') {
      typeAni.scale(0).step();
      boxAni.scale(1).step();
      this.setData({
        qTypeData: typeAni.export(),
        qListData: boxAni.export()
      });
      setTimeout(() => {
        callback && callback()
      }, 500)
    }
    if (type == '4') {
      typeAni.scale(0).step();
      boxAni.scale(0).step();
      this.setData({
        qTypeData: typeAni.export(),
        qListData: boxAni.export()
      });
      setTimeout(() => {
        callback && callback()
      }, 500)
    }
  },
  /**
   * 答题倒计时
   * */
  startTheInterval () {
    this.clearTheInterval(() => {
      this.Timer = setInterval(() => {
        if (this.data.countDownTime <= 0) {
          console.log('用户到时间,自动答错 获取新题目')
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
    if (this.data.isAnswered) {
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
      isEnd: true
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
      result: result[index]
    });
    this.closeConnect();
  },

  /**
   * 关闭连接
   * */
  closeConnect () {
    console.log('关闭连接:-------------------------------------')
    this.clearTheInterval();
    if (this.data.isConnect) {
      battle.PVF_close();
    }
  },
  /**
   * 再来一把
   * */
  playAgain () {
    if (this.data.roomOwner != this.data.userId) {
      utils.redirectTo('../home/home')
    } else {
      wx.navigateBack(1)
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