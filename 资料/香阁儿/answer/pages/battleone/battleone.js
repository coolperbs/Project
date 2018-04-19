import utils from "../../common/utils/utils";
import {battle} from "../../services/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*场景*/
    LOADING: true,
    MATCH: true,
    /*动画*/
    loadingData: {},
    matchData: {},
    matchLeftData: {},
    matchRightData: {},
    matchCenterData: {},
    qTypeData: {},
    qListData: {},
    /*页面信息*/
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
    isEnd: false,
    WINNER: false,
    errorShaking: false,
    PVP_isConnect: false,
    /*ai*/
    vsAi: 'undefined',
    PVA_isConnect: false,
    aiInfo: {}
  },
  initCanvas() {
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
  clearCountAni(callback) {
    if (this.countTimer) {
      console.warn('进度条清空');
      clearInterval(this.countTimer)
    }
    callback && callback()
  },
  startCountAni() {
    let sys = wx.getSystemInfoSync();
    let ratio = sys.windowWidth * (150 / 750);
    let circle2 = this.canvasCircle2
    let time = 1000;
    let count = 0;
    if (this.countTimer) {
      clearInterval(this.countTimer)
    }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      level: options.level || 1
    })
    this.initPage();
  },
  onReady() {
    this.playBg();
  },
  playBg() {
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.setSrc('https://xgross.oss-cn-shenzhen.aliyuncs.com/201804/b456ace7-7cfb-44b1-80ff-81af24a794bb.mp3');
    this.audioCtx.play();
  },
  stopBg() {
    if (this.audioCtx) {
      this.audioCtx.pause();
    }
  },
  playWinner() {
    this.audioCtx2 = wx.createAudioContext('myAudio2');
    this.audioCtx2.setSrc('https://xgross.oss-cn-shenzhen.aliyuncs.com/201804/bdf4c431-a246-4992-afb9-5c6e0eb42307.mp3');
    this.audioCtx2.play();
  },
  stopWinner() {
    if (this.audioCtx2) {
      this.audioCtx2.pause();
    }
  },
  /**
   * 初始化
   * */
  initPage() {
    let UserInfo = utils.getStorageSync('userInfo') || {};
    let token = utils.getValueByPath(UserInfo, 'token');
    if (!token) {
      utils.showToast({
        title: '获取用户信息失败'
      });
      return
    }
    this.setData({
      userId: UserInfo.user.id
    });
    battle.PVP_close();
    battle.PVP_connect(this.data.level, token, () => {
      console.log('对战连接成功:----------------------');
      this.setData({
        PVP_isConnect: true
      });
      this.getPVPMessage();
      battle.PVP_onError();
    })
  },
  /**
   * PVP获取信息
   * */
  getPVPMessage() {
    battle.PVP_onMessage((res) => {
      console.log('玩家消息')
      console.log(res)
      if (res.code != '0000') {
        if (this.data.PVP_isConnect) {
          utils.showToast({
            title: '连接错误,请退出重试' + res.code
          })
        }
        return
      }
      res = res.data;
      if (res.type == 1) {
        this.initRoom(res);
        this.initAiEvt();

      }
      if (res.type == 2) {
        //console.log('对战开始:-----------------------------');
        this.initRoom(res);
        this.beginAnswer(res);
      }
      if (res.type == 3) {
        //console.log('得到题目了:-----------------------------');
        this.filterSubject(res);
      }
      if (res.type == 4) {
        //console.log('得到答案了:-----------------------------');
        this.updatePoint(res)
      }
      if (res.type == 5) {
        //console.log('游戏结束:-----------------------------');
        setTimeout(() => {
          this.subjectAnimation(4, () => {
          })
          this.endGame(res)
        }, 1000)
      }
      if (res.type == '6') {
        let roomUsers = this.data.roomUsers;
        let runner = roomUsers.findIndex((el) => {
          return el.id == res.userId
        });
        let rest = [...roomUsers]
        if (rest[runner].id != '-1' && !this.data.isEnd) {
          utils.showToast({title: '玩家' + rest[runner].name + '逃跑~'})
        }
        this.clearTheInterval();
        this.clearTheAiInterval();
        setTimeout(() => {
          this.subjectAnimation(4, () => {
            this.sendMessage({type: 3})
          })
        }, 1000)
      }

    })
  },
  /**
   * 初始化房间信息
   * */
  initRoom(res) {
    //console.log('房间信息:-----------------');
    //console.log(res);
    //console.log('房间信息:-----------------');
    //console.log(res.roomId)
    console.log(res)
    this.setData({
      roomId: res.roomId || '',
      totalPoint: res.totlePoint || 0
    });
    this.updateRoomUser(res.roomUsers);
  },
  /**
   * 更新房间用户信息
   * */
  updateRoomUser(users) {
    //console.log('房间信息更新:-----------------');
    //console.log(users);
    //console.log('房间信息更新:-----------------');
    let roomUsers = users.map((el) => {
      el.point = 0;
      el.pointBar = 0;
      return el;
    });
    let index = roomUsers.findIndex((el) => {
      return el.id == this.data.userId;
    });
    let temp = roomUsers.splice(index, 1);
    roomUsers.unshift(temp[0]);
    this.setData({
      roomUsers: roomUsers
    })
  },
  /**
   * 判断是否开始答题
   * */
  beginAnswer(res) {
    if (res.beginAnswer) {
      if (this.data.vsAi == 'undefined') {
        this.setData({
          vsAi: false
        })
      }
      this.animationEvt('ready', () => {
        this.getSubject()
      })
    }
  },
  /**
   * 场景动画
   * */
  animationEvt(type, callback) {
    let width = wx.getSystemInfoSync().windowWidth;
    let loadingAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
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
      this.setData({
        MATCH: true
      });
      matchLeftAni.translateX(-width).step();
      matchRightAni.translateX(width).step();
      matchCenterAni.scale(2).translate3d(0, 0, 200).opacity(0).step();
      matchAni.opacity(1).step();
      this.setData({
        loadingData: loadingAni.export(),
        matchLeftData: matchLeftAni.export(),
        matchRightData: matchRightAni.export(),
        matchCenterData: matchCenterAni.export(),
        matchData: matchAni.export()
      });
      setTimeout(() => {
        callback && callback();
      }, 2000)
    } else if (type == 'ready') {
      loadingAni.opacity(0).step();
      matchLeftAni.translateX(0).step({delay: 500});
      matchRightAni.translateX(0).step({delay: 500});
      matchCenterAni.scale(1).translate3d(0, 0, 0).opacity(1).step({delay: 500});
      this.setData({
        loadingData: loadingAni.export(),
        matchLeftData: matchLeftAni.export(),
        matchRightData: matchRightAni.export(),
        matchCenterData: matchCenterAni.export()
      });
      setTimeout(() => {
        this.setData({
          LOADING: false
        });
        this.animationEvt('gaming', callback)
      }, 1500)
    } else if (type == 'gaming') {
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
        this.setData({
          MATCH: false
        });
        callback && callback();
      }, 1000)
    }
  },
  /**
   * 获取题目
   * */
  getSubject() {
    if (!this.data.hasMore) {
      return
    }
    let sys = wx.getSystemInfoSync();
    let ratio = sys.windowWidth * (150 / 750);
    let circle2 = this.canvasCircle2 = wx.createCanvasContext('canvasArcCir');
    circle2.setLineWidth(4);
    circle2.arc(ratio / 2, ratio / 2, ratio / 2 - 4, -0.5 * Math.PI, -0.5 * Math.PI, false);
    circle2.setStrokeStyle('#e10083');
    circle2.stroke();
    circle2.draw();
    this.setData({
      subjectCount: this.data.subjectCount + 1,
      countDownTime: 10
    });
    this.sendMessage({type: 1, subjectOffset: this.data.subjectCount})
  },
  /**
   * 发送消息
   * */
  sendMessage(data) {
    battle.PVP_send(data);
  },
  /**
   * 渲染题目
   * */
  filterSubject(res) {
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
   * 题目动画
   * */
  subjectAnimation(type, callback) {
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
   * PVP 倒计时
   * */
  startTheInterval() {
    this.clearTheInterval(() => {
      this.clearCountAni(() => {
        this.startCountAni();
        this.Timer = setInterval(() => {
          if (this.data.countDownTime <= 0) {
            this.clearTheInterval(() => {
              ////console.log('用户到时间,自动答错 获取新题目')
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
  clearTheInterval(callback) {
    if (this.Timer) {
      clearInterval(this.Timer)
    }
    callback && callback();
  },
  /**
   * 答题
   * */
  answerSubject(e) {
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
   * 更新分数
   * */
  updatePoint(res) {
    console.log('得到答案更新用户分数:--------------------------------------')
    ////console.log(res);
    ////console.log('得到答案更新用户分数:--------------------------------------')

    let resultUser = res.userId;
    let index = this.data.roomUsers.findIndex((el) => {
      return el.id == resultUser
    });
    let roomUser = this.data.roomUsers;
    let updateUser = roomUser[index];
    let oldPoint = updateUser['point'];
    if (res.point >= 0) {
      updateUser['point'] += res.point;
    }
    updateUser['pointBar'] = ((updateUser.point * 100) / this.data.totalPoint).toFixed(2);
    updateUser['animation'] = true;
    let oldCombo = updateUser['comboCount'] || 0;
    updateUser['comboCount'] = res.answerResult ? oldCombo + 1 : 0;
    updateUser['comboAnimation'] = updateUser['comboCount'] > 1 ? true : false;
    roomUser[index] = updateUser;
    this.setData({
      roomUsers: roomUser
    });
    //加分动画
    //console.log('pointBar',updateUser['pointBar'] )
    if (updateUser['animation']) {
      setTimeout(() => {
        let users = this.data.roomUsers;
        users[index]['animation'] = false;
        //console.log('pointBar2',users[index].pointBar)
        this.setData({
          roomUsers: users
        });
      }, 1000);
    }
    //combo 动画
    if (updateUser['comboCount'] > 1) {
      setTimeout(() => {
        let users = this.data.roomUsers;
        users[index]['comboAnimation'] = false;
        this.setData({
          roomUsers: users
        });
      }, 1500);

    }
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
        }, 2000)
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
   * 题目选项过滤
   * */
  filterSubjectListEvt(res) {
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
      subjectList[rightIndex].className = 'check';
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
   * 游戏结束
   * */
  endGame(res) {
    // console.log('游戏结束:--------------------------------------')
    // console.log(res)
    // console.log('游戏结束:--------------------------------------')
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
          roomUser[i].point = result[k].totlePoint < 0 ? roomUser[i].point : result[k].totlePoint;
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
      this.playWinner()
    }
    this.stopBg();
    //console.log('玩家数据');
    //console.log(result[index]);
    let resultA = result[index]
    if (resultA.upExp !== undefined) {
      resultA.exp += resultA.upExp
    }
    if (resultA.upGold !== undefined) {
      resultA.gold += resultA.upGold
    }
    var showUPMask = resultA.hasUpLevel || resultA.hasUpDanGrading;
    this.setData({
      roomUsers: roomUser,
      WINNER: flag,
      result: resultA,
      showUPMask: showUPMask,
      hasUpLevel: resultA.hasUpLevel || false,
      hasUpDanGrading: resultA.hasUpDanGrading || false
    });
    this.closeConnect();
  },
  /**
   * 关闭连接
   * */
  closeConnect(type) {
    //console.log('关闭连接:-------------------------------------')
    if (type) {
      //有人逃跑
      this.clearTheInterval();
      this.clearTheAiInterval();
      if (this.data.PVP_isConnect) {
        battle.PVP_close();
        this.setData({
          PVP_isConnect: false
        })
      }
      return
    }
    this.clearTheInterval();
    this.clearTheAiInterval();
    if (this.data.PVP_isConnect) {
      battle.PVP_close();
      this.setData({
        PVP_isConnect: false
      })
    }
    if (this.data.PVA_isConnect) {
      battle.PVA_close();
      this.setData({
        PVA_isConnect: false,
        vsAi: undefined
      })
    }
  },
  /**
   * 准备AI
   * */
  initAiEvt() {
    setTimeout(() => {
      if (this.data.vsAi == 'undefined') {
        console.log('连接AI')
        if (!this.data.PVP_isConnect) {
          console.log('人机对战没有连接')
          return
        }
        this.setData({
          vsAi: true
        });
        console.log('连接AI开始');
        battle.PVA_close();
        battle.PVA_connect(this.data.roomId, this.data.level, () => {
          console.log('连接AI成功');
          this.setData({
            PVA_isConnect: true
          });
          this.getAiMessage();
          battle.PVA_onError();
        })
      }
    }, 3500)
  },
  /**
   * 监听Ai
   * */
  getAiMessage() {
    battle.PVA_onMessage((res) => {
      console.log('aiMessage', res)
      if (res.code != '0000') {
        if (this.data.PVA_isConnect) {
          utils.showToast({
            title: '连接错误' + res.code
          })
        }
        return
      }
      res = res.data;
      if (res.type == 2) {
        this.setData({
          aiInfo: res
        })
      }
      if (res.type == 3) {
        //更PVP 同步 等2秒动画
        setTimeout(() => {
          this.startTheAiInterval()
        }, 2000)
      }
      if (res.type == '6') {
        battle.PVA_send({"type": 3});
        setTimeout(()=>{
          this.clearTheAiInterval()
          if (this.data.PVA_isConnect) {
            battle.PVA_close();
            this.setData({
              PVA_isConnect: false,
              vsAi: undefined
            })
          }
        },500)
      }
    })
  },
  /**
   * ai倒计时
   * */
  startTheAiInterval() {
    this.clearTheAiInterval(() => {
      let count = Math.ceil(parseInt(Math.random() * 5));
      this.aiTimer = setInterval(() => {
        //console.log('ai答题倒计时');
        if (count <= 0) {
          this.clearTheAiInterval(() => {
            this.aiAnswerEvt();
          });
        } else {
          count -= 1
        }
      }, 1000);
    });
  },
  /**
   * ai 倒计时清空
   * */
  clearTheAiInterval(callback) {
    if (this.aiTimer) {
      clearInterval(this.aiTimer);
    }
    callback && callback();
  },
  /**
   * ai 答题
   * */
  aiAnswerEvt() {
    //console.log('ai答题了');
    let percent = parseFloat(Math.random() * 1).toFixed(2);
    let aiWinRate = this.data.aiInfo.aiWinRate || 0;
    let that = this;

    //先随机取答案且保证答案不正确
    function getError(right) {
      let result = Math.floor(parseInt((Math.random() * that.data.subjectList.length) + 1));
      if (right == result) {
        return getError(right)
      } else {
        //console.log('随机答案' + result)
        return result
      }
    }

    let rightAnswer = this.data.subject.rightOption;
    let answer = getError(rightAnswer);
    if (percent > aiWinRate) {
      answer = rightAnswer;
    }
    console.log('正确答案' + rightAnswer)
    console.log('ai 答案' + answer)
    battle.PVA_send({
      "type": 2,
      "optionId": answer,
      "subjectOffset": this.data.subjectCount
    })
  },
  /**
   * 在来一把
   * */
  playAgain() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //this.closeConnect();
  },
  closeModal() {
    this.setData({
      showUPMask: false
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.closeConnect('run');
    this.stopBg();
    this.stopWinner()
  }
})