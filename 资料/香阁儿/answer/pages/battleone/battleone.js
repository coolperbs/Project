// pages/battleone/battleone.js
import {battle} from '../../services/index'
import util from '../../common/utils/utils'
//todo 1对战结果展示 2对战提前10秒内答题完毕 3.对战ai
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading: true,
    showRound: true,
    showBattle: true,
    isConnect: false,
    vsAi: true,
    sendMessageList: [],
    leftAniData: {},
    rightAniData: {},
    centerAniData: {},
    roundAniData: {},
    questionTypeAniData: {},
    questionTitleAniData: {},
    questionListAniData: {},
    systemInfo: {},
    roomUsers: [],
    roomInfo: {},
    question: {},
    ready: false,//可以开始答题了没
    answered: false,//这道题答过没有
    answerOption: 0,//答题号
    countDown: 10,
    subjectOffset: 0,//题目等级
    Timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    debugger
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initPage();
  },
  /**
   * 初始化动画对象
   * */
  initAnimation () {
    this.leftAni = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });
    this.rightAni = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });
    this.centerAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.roundAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.loadingAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.setData({
      leftAniData: this.leftAni.export(),
      rightAniData: this.rightAni.export(),
      centerAniData: this.centerAni.export(),
      roundAniData: this.roundAni.export(),
      loadingAniData: this.loadingAni.export(),
    })
  },
  /**
   * 获取题目
   * */
  getQuestion () {
    if (!this.data.question.hasMore && this.data.question.hasMore != undefined) {
      //本次对战结束 算分了！！！！！
      this.endThisRoundEvt();
      return
    }
    this.setData({
      countDown: 10,
      subjectOffset: this.data.subjectOffset + 1
    });
    this.sendMessage({
      "type": 1,
      "subjectOffset": this.data.subjectOffset // 题目列表ID，从1开始，以此累加 todo 这里我自己管里？？
    })
  },
  /**
   * 转场动画
   * */
  animationEvt (type, callback) {
    let width = this.data.systemInfo.windowWidth;
    if (type == 'loading') {
      this.setData({
        showBattle: true,
        showRound: true,
        showLoading: true,
      });
      callback && callback();
    } else if (type == 'ready') {
      this.loadingAni.opacity(0).step();
      this.leftAni.translateX(0).step({delay: 500});
      this.rightAni.translateX(0).step({delay: 500});
      this.centerAni.scale(1).translate3d(0, 0, 0).opacity(1).step({delay: 500});
      this.setData({
        leftAniData: this.leftAni.export(),
        rightAniData: this.rightAni.export(),
        centerAniData: this.centerAni.export(),
        loadingAniData: this.loadingAni.export(),
      });
      setTimeout(() => {
        this.setData({
          showLoading: false,
        });
        this.animationEvt('gaming', callback)
      }, 3000)
    } else if (type == 'gaming') {
      this.leftAni.translateX(-width).step();
      this.rightAni.translateX(width).step();
      this.centerAni.scale(2).translate3d(0, 0, 200).opacity(0).step();
      this.roundAni.opacity(0).step();
      this.setData({
        leftAniData: this.leftAni.export(),
        rightAniData: this.rightAni.export(),
        centerAniData: this.centerAni.export(),
        roundAniData: this.roundAni.export(),
      });
      setTimeout(() => {
        this.setData({
          showRound: false
        });
        callback && callback();
      }, 1000)
    } else if (type == 'end') {

    }
  },
  /**
   * 答题动画
   * */
  questionAnimationEvt (step, callback) {
    // 1 展示类型 自动展示 2
    // 2 展示题目 和选项
    // 3 展示此题答完状态
    // 4 清场状态 全部隐藏
    let typeAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    let titleAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    let boxAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    if (step == '1') {
      typeAni.scale(1).step();
      this.setData({
        questionTypeAniData: typeAni.export()
      });
      setTimeout(() => {
        this.questionAnimationEvt(2, callback)
      }, 1000)
    }
    if (step == '2') {
      typeAni.scale(0).step();
      titleAni.scale(1).step();
      boxAni.scale(1).step();
      this.setData({
        questionTypeAniData: typeAni.export(),
        questionTitleAniData: titleAni.export(),
        questionListAniData: boxAni.export(),
      });
      setTimeout(() => {
        callback && callback()
      }, 500)
    }
    if (step == '4') {
      typeAni.scale(0).step();
      titleAni.scale(0).step();
      boxAni.scale(0).step();
      this.setData({
        questionTypeAniData: typeAni.export(),
        questionTitleAniData: titleAni.export(),
        questionListAniData: boxAni.export(),
      });
      setTimeout(() => {
        callback && callback()
      }, 500)
    }

  },
  /**
   * 结束本回合
   * */
  endThisRoundEvt () {
    this.sendMessage({"type": 3});
  },
  /**
   * 获取socket返回信息
   * */
  getMessage () {
    battle.onSocketMessage((res) => {
      if (res.type == '1') {
        //获取房间
        //这里会返回 房间用户信息 如果beginAnswer 为真 就开始进场动画 房间用户信息 每次答题完 会去请求 todo 如何判断两个用户的勾选展示在界面上
        if (!res.beginAnswer) {
          //可以开始答题了，取拿题
          //不需要AI
          this.setData({
            vsAi: false
          });
          this.getQuestion();
          //对战用户信息
          this.initBattleUser(res);
        }
      }
      if (res.type == '2') {
        //加入房间
      }
      if (res.type == '3') {
        //获取题目
        //只有第一次走ready
        //播放对战前动画 准备开始对战拿第一题
        //把题目过滤结构
        var newOptionList = [];
        for (var i = 0; i < res.subject.optionList.length; i++) {
          newOptionList.push({
            className: '',
            label: res.subject.optionList[i]
          })
        }
        res.subject.optionList = newOptionList;
        this.setData({
          question: res,
          answered: false
        });
        if (!this.data.ready) {
          this.setData({
            ready: true
          });
          this.animationEvt('ready', () => {
            this.questionAnimationEvt(1, () => {
              this.startAnswerEvt();
            })
          });
        } else {
          this.questionAnimationEvt(1, () => {
            this.startAnswerEvt();
          })
        }
      }
      if (res.type == '4') {
        //回答问题
        //获取答案 后要停止Timer
        this.filterAnswerEvt(res);
      }
    });
  },
  /**
   * 回答校验同步分数
   * */
  filterAnswerEvt (res) {
    let oldUserInfo = this.data.roomUsers;
    for (let i = 0; i < oldUserInfo.length; i++) {
      let currentUser = oldUserInfo[i];
      if (currentUser.userId = res.userId && res.answerResult) {
        oldUserInfo[i].point += res.point;
        //计算百分比
        //todo 待完善
        oldUserInfo[i].pointBar = ((oldUserInfo[i].point * 100) / this.data.roomInfo.totlePoint).toFixed(2);
        this.setData({
          roomUsers: oldUserInfo
        })
      }
    }
    // if (flag != undefined) {
    //   let Timer = setInterval(() => {
    //     if (this.data.roomUsers[flag].point == newPoint) {
    //       clearInterval(Timer);
    //       return
    //     }
    //     let tempUser = this.data.roomUsers;
    //     tempUser[flag].point += 1;
    //     this.setData({
    //       roomUsers: tempUser
    //     })
    //   }, 10)
    // }
  },
  /**
   * 开始答题
   * */
  startAnswerEvt () {
    let Timer = setInterval(() => {
      if (this.data.countDown <= 0) {
        clearInterval(Timer);
        //到时间自动答题
        this.answerEvt();
        //10 完了展示3秒后开始新的
        setTimeout(() => {
          this.questionAnimationEvt(4, () => {
            this.getQuestion();
          })
        }, 3000)
      } else {
        this.setData({
          countDown: this.data.countDown - 1
        })
      }
    }, 1000);
    this.setData({
      Timer: Timer
    })
  },
  /**
   * 对战用户信息
   * */
  initBattleUser (res) {
    let roomUsers = res.roomUsers;
    //初始化积分
    roomUsers = roomUsers.map((el) => {
      el.point = 0;
      el.pointBar = 0;
      return el;
    });
    delete res.roomUsers;
    this.setData({
      roomInfo: res,
      roomUsers: roomUsers
    })
  },
  /*
  * 发送消息
  * */
  sendMessage (data) {
    var messageList = this.data.sendMessageList;
    messageList.push(data);
    this.setData({
      sendMessageList: messageList
    });
    if (this.data.isConnect) {
      for (var i = 0; i < this.data.sendMessageList.length; i++) {
        battle.sendSocketMessage(this.data.sendMessageList[i])
      }
      this.setData({
        sendMessageList: []
      });
    }
  },
  /**
   * 答题
   * */
  answerEvt (e) {
    let answer = e ? e.currentTarget.dataset.index : 0;
    if (this.data.answered) {
      return
    }
    //处理正确与错误
    this.setData({
      answerOption: answer,
      answered: true
    });
    this.filterOptionListEvt();
    this.sendMessage({
      "type": 2,
      "optionId": answer,		// 用户回答的选项ID，从1开始
      "subjectOffset": this.data.subjectOffset	// 用户回答的题目ID todo 题目接口里面没有
    })
  },
  /**
   * 处理答题列表
   * */
  filterOptionListEvt (isHide) {
    let answer = this.data.answerOption;
    let optionList = util.getValueByPath(this.data.question, 'subject.optionList') || [];
    for (let i = 0; i < optionList.length; i++) {
      let current = i + 1;
      let RightOption = util.getValueByPath(this.data.question, 'subject.rightOption');
      if (answer == current) {
        optionList[i].className = 'success';
        if (current != RightOption) {
          optionList[i].className = 'error';
        }
      } else if (current == RightOption) {
        optionList[i].className = 'success';
      } else {
        optionList[i].className = isHide ? 'hide' : '';
      }
    }
    let question = this.data.question;
    question.subject.optionList = optionList;
    this.setData({
      question: question
    })
  },
  /**
   * 进入房间
   * */
  initPage () {
    //初始化动画
    this.initAnimation();//todo 这个有点多余
    this.setData({
      systemInfo: util.getSystemInfo()
    });
    battle.Connect('', '');
    battle.onOpen(res => {
      this.setData({
        isConnect: true
      });
      this.getMessage();
      //todo 等待系统是否匹配AI 目前设置5秒
      setTimeout(() => {
        if (this.data.vsAi) {
          //todo socket 有问题
        }
      }, 5000);
    });
  },
  /**
   * 再来一吧 页面状态恢复
   * */
  playAgain () {
    this.setData({
      showLoading: true,
      showRound: true,
      showBattle: true,
      isConnect: false,
      vsAi: true,
      sendMessageList: [],
      leftAniData: {},
      rightAniData: {},
      centerAniData: {},
      roundAniData: {},
      questionTypeAniData: {},
      questionTitleAniData: {},
      questionListAniData: {},
      systemInfo: {},
      roomUsers: [],
      roomInfo: {},
      question: {},
      ready: false,//可以开始答题了没
      answered: false,//这道题答过没有
      answerOption: 0,//答题号
      countDown: 10,
      subjectOffset: 0,//题目等级
      Timer: null
    });
    //todo 这里核对逻辑
    setTimeout(() => {
      this.initPage();
    }, 50)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //todo 需要判断 标识符是否打开 如果没有则不能执行
    if (this.data.isConnect) {
      battle.onSocketClose(res => {
        debugger
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});