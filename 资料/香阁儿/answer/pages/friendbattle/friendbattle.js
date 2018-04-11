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
    errorShaking: false,
    isStart: false,
    MATCH: false
  },
  initCanvas () {
    let sys = wx.getSystemInfoSync();
    let ratio = sys.windowWidth * (150 / 750);
    let circle = this.canvasCircle = wx.createCanvasContext('canvasCircle');
    circle.setLineWidth(4);
    circle.arc(ratio / 2, ratio / 2, ratio / 2 - 4, -0.5 * Math.PI, 1.5 * Math.PI, false);
    circle.setStrokeStyle('#381b5a');
    circle.stroke();
    circle.draw();

    let circle2 = this.canvasCircle2 = wx.createCanvasContext('canvasArcCir');
    circle2.setLineWidth(4);
    circle2.arc(ratio / 2, ratio / 2, ratio / 2 - 4, -0.5 * Math.PI, -0.5 * Math.PI, false);
    circle2.setStrokeStyle('#e10083');
    circle2.stroke();
    circle2.draw();
  },
  clearCountAni (callback) {
    if (this.countTimer) {
      clearInterval(this.countTimer)
    }
    callback && callback()
  },
  startCountAni () {
    let sys = wx.getSystemInfoSync();
    let ratio = sys.windowWidth * (150 / 750);
    let circle2 = this.canvasCircle2;
    let time = 1000;
    let count = 0;
    this.countTimer = setInterval(() => {

      if (count >= time) {
        clearInterval(this.countTimer)
      }
      count += 1;
      let endPath = (-0.5 * Math.PI) + count * (2 * Math.PI / time);
      circle2.setLineWidth(4);
      circle2.arc(ratio / 2, ratio / 2, ratio / 2 - 4, -0.5 * Math.PI, endPath, false);
      circle2.setStrokeStyle('#e10083');
      circle2.stroke();
      circle2.draw();
    }, 10)
  },
  onShow(){
    this.playBg();
  },
  playBg(){
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.setSrc('http://xgross.oss-cn-shenzhen.aliyuncs.com/201804/b456ace7-7cfb-44b1-80ff-81af24a794bb.mp3');
    this.audioCtx.play();
  },
  stopBg(){
    this.audioCtx.pause();
  },
  playWinner(){
    this.audioCtx2 = wx.createAudioContext('myAudio2');
    this.audioCtx2.setSrc('http://xgross.oss-cn-shenzhen.aliyuncs.com/201804/bdf4c431-a246-4992-afb9-5c6e0eb42307.mp3');
    this.audioCtx2.play();
  },
  stopWinner(){
    this.audioCtx2.pause();
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
      //console.log('获取用户信息失败了')
      return
    }
    this.setData({
      userId: UserInfo.user.id
    });
    battle.PVF_connect(this.data.level, token, this.data.roomId, () => {
      //console.log('好友对战连接成功:----------------------');
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
      //console.log('好友对战接收到消息了:----------------------');
      if (res.code != '0000') {
        if (this.data.isConnect) {
          utils.showToast({
            title: res.message
          })
        }
        this.closeConnect();
        setTimeout(() => {
          this.back()
        }, 1500);
        return
      }
      res = res.data;
      if (res.type == 1) {
        this.initRoom(res);
      }
      if (res.type == 2) {
        //console.log('好友连接上了:-----------------------------');
        this.initRoom(res);
      }
      if (res.type == 3) {
        //console.log('得到题目了:-----------------------------');
        this.setData({
          isStart: true
        })
        this.filterSubject(res);
      }
      if (res.type == 4) {
        //console.log('得到答案了:-----------------------------');
        this.updatePoint(res)
      }
      if (res.type == 5) {
        //console.log('游戏结束:-----------------------------');
        this.setData({
          showRoom: false
        });

        setTimeout(() => {
          this.subjectAnimation(4, () => {
            this.clearCountAni();
            this.clearTheInterval();
          })
          this.endGame(res)
        }, 1000)
      }
      if (res.type == '6') {
        //判断有人逃跑 游戏没开始 房间解散 游戏开始后判断少于2个人 就结束游戏
        let roomUsers = this.data.roomUsers;
        let runner = roomUsers.findIndex((el) => {
          return el.id == res.userId
        });
        let rest = [...roomUsers]
        utils.showToast({title: '玩家' + rest[runner].name + '离开房间~'})
        rest[runner] = {point: 0};
        //计算还有几个用户
        let count = 0;
        rest.map((el) => {
          if (el.id) {
            count++
          }
        });
        //区分开始对战没有
        if (this.data.isStart) {
          this.updateRankList();
          if (count < 2) {
            //console.log('人都跑了,去拿答案了');
            this.clearCountAni();
            this.clearTheInterval();
            setTimeout(() => {
              this.subjectAnimation(4, () => {
                this.sendMessage({type: 3})
              })
            }, 1000)
          }
        } else {
          this.setData({
            roomUsers: rest
          })
          if (res.userId == this.data.roomOwner) {
            //房主都跑了
            utils.showToast({
              title: '房间解散~~'
            })
            this.closeConnect();
            setTimeout(() => {
              this.back()
            }, 1500);
          }
        }
      }
      if (res.type == '7') {
        this.animationEvt('start', () => {
          this.getSubject();
        })
      }
      if (res.type == '8') {
        let roomId = res.roomId || '';
        this.closeConnect();
        utils.redirectTo('../friendbattle/friendbattle', {roomId: roomId})
      }
    })
  },
  /**
   * 初始化房间信息
   * */
  initRoom (res) {
    console.log('房间信息:-----------------');
    //console.log('房间信息:-----------------');
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
    //console.log('房间信息更新:-----------------');
    //console.log(res);
    //console.log('房间信息更新:-----------------');
    let that = this;
    let sys = wx.getSystemInfoSync();
    let roomUsers = res.map((el, index) => {
      el.point = 0;
      el['scale'] = sys.windowWidth * (130 / 750);
      el['rank'] = index;
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
        point: 0
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
    let count = 0;
    this.data.roomUsers.map((el) => {
      if (el.avatar) {
        count++;
      }
    })
    if (count >= 2) {
      this.sendMessage({"type": 4});
    } else {
      wx.showToast({
        title: '至少2人才能开始对战！~',
        icon: 'none'
      })
    }
  },
  /**
   * 取消对战
   * */
  cancelBattle () {
    utils.showAction('确定退出房间?', (res) => {
      if (res) {
        this.closeConnect();
        this.back();
      }
    })
  },
  /**
   * 场景动画
   * */
  animationEvt (type, callback) {
    let room = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    let width = wx.getSystemInfoSync().windowWidth;
    let matchLeftAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    let matchRightAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    let matchCenterAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    let matchAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    if (type == 'reset') {
      //所有动画还原
      matchLeftAni.translateX(-width).step();
      matchRightAni.translateX(width).step();
      matchCenterAni.scale(2).translate3d(0, 0, 200).opacity(0).step();
      matchAni.opacity(1).step();
      room.opacity(1).step();
      this.setData({
        roomAniData: room.export(),
        matchLeftData: matchLeftAni.export(),
        matchRightData: matchRightAni.export(),
        matchCenterData: matchCenterAni.export(),
        matchData: matchAni.export()
      });
      setTimeout(() => {
        this.setData({
          showRoom: true,
          MATCH: false
        });
        callback && callback();
      }, 500)
    }
    if (type == 'start') {
      //隐藏房间
      room.opacity(0).step();
      this.setData({
        roomAniData: room.export(),
        MATCH: true
      });
      setTimeout(() => {
        this.setData({
          showRoom: false
        });
        this.animationEvt('ready', callback)
      }, 100)
    }
    if (type == 'ready') {
      matchLeftAni.translateX(0).step({delay: 500});
      matchRightAni.translateX(0).step({delay: 500});
      matchCenterAni.scale(1).translate3d(0, 0, 0).opacity(1).step({delay: 500});
      this.setData({
        matchLeftData: matchLeftAni.export(),
        matchRightData: matchRightAni.export(),
        matchCenterData: matchCenterAni.export()
      });
      setTimeout(() => {
        this.animationEvt('gaming', callback)
      }, 1500)
    }
    if (type == 'gaming') {
      matchLeftAni.translateX(-width).step();
      matchRightAni.translateX(width).step();
      matchCenterAni.scale(2).translate3d(0, 0, 200).opacity(0).step();
      matchAni.opacity(0).step();
      this.setData({
        matchLeftData: matchLeftAni.export(),
        matchRightData: matchRightAni.export(),
        matchCenterData: matchCenterAni.export(),
        matchData: matchAni.export()
      });
      this.initCanvas();
      setTimeout(() => {
        callback && callback();
        this.setData({
          MATCH: false
        });
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
    //console.log('获取的题目:-------------------------------')
    //console.log(res)
    //console.log('获取的题目:-------------------------------')
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
    //console.log('得到答案更新用户分数:--------------------------------------')
    //console.log(res);
    //console.log('得到答案更新用户分数:--------------------------------------')
    let resultUser = res.userId;
    let index = this.data.roomUsers.findIndex((el) => {
      return el.id == resultUser
    })
    let roomUser = this.data.roomUsers;
    let updateUser = roomUser[index];
    updateUser['point'] += res.point;
    roomUser[index] = updateUser;
    updateUser['pointAnimation'] = true;
    let oldCombo = updateUser['comboCount'] || 0;
    updateUser['comboCount'] = res.answerResult ? oldCombo + 1 : 0;
    updateUser['comboAnimation'] = updateUser['comboCount'] > 1 ? true : false;
    roomUser[index] = updateUser;
    //console.log(roomUser)
    this.setData({
      roomUsers: roomUser
    });

    //加分动画
    if (updateUser['pointAnimation']) {
      setTimeout(() => {
        let users = this.data.roomUsers;
        users[index]['pointAnimation'] = false;
        //console.log('pointBar2',users[index].pointBar)
        this.setData({
          roomUsers: users
        });
      }, 1000);
    }
    //combo 动画
    // if (updateUser['comboCount'] > 1) {
    //   setTimeout(() => {
    //     let users = this.data.roomUsers;
    //     users[index]['comboAnimation'] = false;
    //     this.setData({
    //       roomUsers: users
    //     });
    //   }, 1500);
    // }
    this.updateRankList();
    this.filterSubjectListEvt(res);
    if (res.mayNextSub) {
      if (!this.data.hasMore) {
        //获取对战结果
        /*结果展示2秒*/
        this.clearCountAni();
        this.clearTheInterval();
        setTimeout(() => {
          this.subjectAnimation(4, () => {
            this.sendMessage({type: 3});
          })
        }, 2000);
        return
      }
      //提前结束这道题
      this.clearCountAni();
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
   * updateRankList
   * */
  updateRankList () {
    let roomUser = this.data.roomUsers;
    let sortData = [...roomUser];
    sortData.sort((a, b) => {
      return b.point - a.point
    });
    //console.log('排行过后的用户列表', sortData)
    for (var i = 0; i < roomUser.length; i++) {
      let index = sortData.findIndex((el) => {
        return el.id == roomUser[i].id
      })
      roomUser[i].rank = index;
    }
    this.setData({
      roomUsers: roomUser
    })
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
      let sys = wx.getSystemInfoSync();
      let ratio = sys.windowWidth * (150 / 750);
      let circle2 = this.canvasCircle2 = wx.createCanvasContext('canvasArcCir');
      circle2.setLineWidth(4);
      circle2.arc(ratio / 2, ratio / 2, ratio / 2 - 4, -0.5 * Math.PI, -0.5 * Math.PI, false);
      circle2.setStrokeStyle('#e10083');
      circle2.stroke();
      circle2.draw();

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
      this.clearCountAni(() => {
        this.startCountAni();
        this.Timer = setInterval(() => {
          if (this.data.countDownTime <= 0) {
            //console.log('用户到时间,自动答错 获取新题目');
            this.clearCountAni();
            this.clearTheInterval(() => {
              this.answerSubject();
            });
          } else {
            this.setData({
              countDownTime: this.data.countDownTime - 1
            })
          }
        }, 1000);
      })
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
    //console.log('游戏结束:--------------------------------------')
    //console.log(res)
    //console.log('游戏结束:--------------------------------------')
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
      this.playWinner();
    }
    this.stopBg();
    //console.log('玩家数据');
    //console.log(result[index]);
    this.setData({
      roomUsers: roomUser,
      WINNER: flag,
      result: result
    });
    let circle = this.canvasCircle = wx.createCanvasContext('canvasCircle');
    let circle2 = this.canvasCircle2 = wx.createCanvasContext('canvasArcCir');
    circle.clearRect(0, 0, 1000, 1000);
    circle2.clearRect(0, 0, 1000, 1000);
    circle.draw();
    circle2.draw();
    //this.closeConnect();
  },

  /**
   * 关闭连接
   * */
  closeConnect () {
    //console.log('关闭连接:-------------------------------------')
    if (!this.data.isEnd && this.data.isStart) {
      //逃跑退出获取结果
      this.sendMessage({type: 3})
    }
    this.clearTheInterval();
    this.clearCountAni();
    if (this.data.isConnect) {
      battle.PVF_close();
      this.setData({
        isConnect: false
      })
    }
  },
  /**
   * 再来一把
   * */
  playAgain () {
    //房间重置
    this.setData({
      WINNER: false,
      roomId: '',
      level: '',
      roomUsers: [],
      roomOwner: '',
      totalPoint: '',
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
      errorShaking: false,
      isStart: false,
      MATCH: false
    })
    //清空canvas
    let circle = this.canvasCircle = wx.createCanvasContext('canvasCircle');
    let circle2 = this.canvasCircle2 = wx.createCanvasContext('canvasArcCir');
    circle.clearRect(0, 0, 1000, 1000);
    circle2.clearRect(0, 0, 1000, 1000);
    circle.draw();
    circle2.draw();
    //动画还原
    this.subjectAnimation(4)
    this.animationEvt('reset')
    this.playBg()
    setTimeout(() => {
      this.sendMessage({type: 5});
    }, 50)
  },
  back () {
    if (this.data.roomOwner != this.data.userId) {
      utils.redirectTo('../home/home')
    } else {
      wx.navigateBack()
    }
  },
  onHide () {
    //console.log('小程序隐藏了')
    if (this.data.isStart) {
      //console.log('关闭连接');
      this.closeConnect();
      this.back();
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.closeConnect();
    this.stopBg();
    this.stopWinner();
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