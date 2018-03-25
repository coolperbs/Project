// pages/battleone/battleone.js
import {battle} from '../../services/index'
import util from '../../common/utils/utils'
//todo 1对战结果展示 2对战提前10秒内答题完毕 3.对战ai
Page({

  /**
   * 页面的初始数据
   */
  data: {
    LOADING: true,
    MATCH: true,
    BATTLE: false,
    END: false,
    WINNER: false,
    vsAi: true,
    /*动画*/
    loadingData: {},
    matchLeftData: {},
    matchRightData: {},
    matchCenterData: {},
    qTypeData: {},
    qListData: {},
    roomInfo: {},
    roomUsers: [],
    currentUser: null,
    hasMore: undefined,
    questionInfo: {},
    questionList: [],
    questionCount: 0,
    countDownTime: 10,
    result: {},
    showResultData: {},
    answered: false,
    countEnd: 0,
    isOffLine: false,//有人掉线
    level: 1,
    /*ai*/
    aiCountTime: 10,
    aiPushTime: undefined,
    aiInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      level: options.level || 1
    });
    this.initPage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 获取题目
   * */
  getQuestion () {
    if (!this.data.hasMore && this.data.hasMore != undefined) {
      //本次对战结束 算分了！！！！！
      this.endThisRoundEvt();
      return
    }
    this.setData({
      countDownTime: 10,
      questionCount: this.data.questionCount + 1
    });
    this.sendMessage({
      "type": 1,
      "subjectOffset": this.data.questionCount // 题目列表ID，从1开始，以此累加
    })
  },
  /**
   * 转场动画
   * */
  animationEvt (type, callback) {
    let width = this.data.systemInfo.windowWidth;
    let loadingAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    let matchLeftAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    let matchRightAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    let matchCenterAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    let matchAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    if (type == 'reset') {
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
        matchCenterData: matchCenterAni.export(),
      });
      setTimeout(() => {
        this.setData({
          LOADING: false,
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
      setTimeout(() => {
        this.setData({
          MATCH: false
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
    // 1 展示类型和第几题 自动展示 2
    // 2 展示题目 和选项
    // 3 展示此题答完状态
    // 4 清场状态 全部隐藏
    let typeAni = wx.createAnimation({
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
        qTypeData: typeAni.export()
      });
      setTimeout(() => {
        this.questionAnimationEvt(2, callback)
      }, 1000)
    }
    if (step == '2') {
      typeAni.scale(0).step();
      boxAni.scale(1).step();
      this.setData({
        qTypeData: typeAni.export(),
        qListData: boxAni.export(),
      });
      setTimeout(() => {
        callback && callback()
      }, 500)
    }
    if (step == '4') {
      typeAni.scale(0).step();
      boxAni.scale(0).step();
      this.setData({
        qTypeData: typeAni.export(),
        qListData: boxAni.export(),
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
    battle.PVP_onMessage((res) => {
      if (res.type == '1') {
        //获取房间
        this.initBattleUser(res);
        //todo 等待系统是否匹配AI 目前设置5秒
        setTimeout(() => {
          if (this.data.vsAi) {
            this.initAI();
          }
        }, 5000);
      }
      if (res.type == '2') {
        //加入房间
        //这里会返回 房间用户信息 如果beginAnswer 为真 就开始进场动画
        if (res.beginAnswer) {
          //可以开始答题了，取拿题
          //不需要AI
          this.setData({
            vsAi: false
          });
          //对战用户信息
          //延迟执行
          setTimeout(() => {
            this.initBattleUser(res, () => {
              this.animationEvt('ready', () => {
                this.getQuestion();
              });
            });
          }, 1000)
        }
      }
      if (res.type == '3') {
        //获取题目
        //只有第一次走ready
        //播放对战前动画 准备开始对战拿第一题
        //把题目过滤结构
        let questionInfo = this.data.questionInfo;
        if (util.getValueByPath(questionInfo, 'subject.pushTime') == res.subject.pushTime) {
          //避免题目二次渲染
          return
        }
        //题目数据重构
        var newOptionList = res.subject.optionList.map((item) => {
          var result = {};
          result.className = '';
          result.label = item;
          return result
        });
        delete res.subject.optionList;
        this.setData({
          questionInfo: res,
          questionList: newOptionList,
          hasMore: res.hasMore,
          answered: false
        });
        // if (this.data.questionCount == 1) {
        //   this.animationEvt('ready', () => {
        //     this.questionAnimationEvt(1, () => {
        //       this.startInterval();
        //     })
        //   });
        // } else {
        //   this.questionAnimationEvt(1, () => {
        //     this.startInterval();
        //   })
        // }
        this.questionAnimationEvt(1, () => {
          this.startInterval();
        })
      }
      if (res.type == '4') {
        //回答问题
        //获取答案 后要停止Timer
        this.filterAnswerEvt(res);
      }
      if (res.type == '5') {
        console.log(res)
        if (this.data.END) {
          return
        }
        this.data.countEnd += 1;
        this.setData({
          countEnd: this.data.countEnd
        });
        if (this.data.countEnd == 2) {
          this.setData({
            END: true,
            result: res.fightResults
          });
          this.showResult();
          this.closeConnect();
        }
      }
      if (res.type == '6') {
        this.setData({
          isOffLine: true
        })
      }
    });
  },
  /*
  * 发送消息
  * */
  sendMessage (data) {
    battle.PVP_send(data);
  },
  /**
   * 回答校验同步分数
   * */
  filterAnswerEvt (res) {
    let resultUser = res.userId;
    let index = this.data.roomUsers.findIndex((el) => {
      return el.id == resultUser
    })
    let roomUser = this.data.roomUsers;
    let updateUser = roomUser[index];
    updateUser.point += res.point;
    updateUser.pointBar = ((updateUser.point * 100) / this.data.roomInfo.totlePoint).toFixed(2);
    roomUser[index] = updateUser;
    this.setData({
      roomUsers: roomUser
    });
    //filterOptionListEvt
    this.filterOptionListEvt(res);
    if (res.mayNextSub) {
      //提前结束这道题
      this.clearInterval(() => {
        //10 完了展示3秒后开始新的
        setTimeout(() => {
          this.questionAnimationEvt(4, () => {
            this.getQuestion();
          })
        }, 3000)
      })
    }

  },
  /**
   * 开始答题
   * */
  startInterval () {
    this.clearInterval(() => {
      this.Timer = setInterval(() => {
        if (this.data.countDownTime <= 0) {
          this.clearInterval(() => {
            this.answerEvt();
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
   * 结束这道题
   * */
  clearInterval (callback) {
    if (this.Timer) {
      clearInterval(this.Timer);
    }
    callback && callback();
  },
  /**
   * 对战用户信息
   * */
  initBattleUser (res, callback) {
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
    });
    callback && callback();
  },
  /**
   * 答题
   * */
  answerEvt (e) {
    let answer = e ? e.currentTarget.dataset.index : 0;
    if (this.data.answered) {
      //todo 如有掉线怎么处理
      // if (this.data.isOffLine) {
      //   this.getQuestion();
      // }
      return
    }
    //处理正确与错误
    this.setData({
      answered: true
    });
    this.sendMessage({
      "type": 2,
      "optionId": answer,		// 用户回答的选项ID，从1开始
      "subjectOffset": this.data.questionCount	// 用户回答的题目ID todo 题目接口里面没有
    })
  },
  /**
   * 处理答题列表
   * */
  filterOptionListEvt (res) {
    //{result: res.answerResult, optionId: res.optionId, mayNextSub: res.mayNextSub}
    let question = this.data.questionInfo;
    let rightOption = question.subject.rightOption;
    let userId = this.data.currentUser;

    let optionId = res.optionId;
    let mayNextSub = res.mayNextSub;


    let optionList = this.data.questionList;
    let checkIndex = optionId - 1;
    let rightIndex = rightOption - 1;
    //没有选择
    if (optionId <= 0) {
      optionList[rightIndex].className = 'success';
    } else {
      //选择了
      //只展示勾选
      if (checkIndex == rightIndex && res.userId == userId) {
        optionList[checkIndex].className = 'success';
      } else if (checkIndex != rightIndex && res.userId == userId) {
        optionList[checkIndex].className = 'error';
      } else {
        optionList[checkIndex].className = 'check';
      }
    }

    //这道题都答了 就显示正确答案 并把双方答案判断正确和错误
    if (mayNextSub) {
      //显示正确选项
      optionList[rightIndex].className = 'success';
      for (let i = 0; i < optionList.length; i++) {
        if (optionList[i].className == '') {
          optionList[i].className = 'hide'
        } else if (optionList[i].className == 'check') {
          optionList[i].className = 'error'
        }
      }
    }
    this.setData({
      questionList: optionList
    })
  },
  /**
   * 进入房间
   * */
  initPage () {
    //初始化动画
    //this.initAnimation();//todo 这个有点多余
    let user = util.getStorageSync('userInfo') || {};
    let id = util.getValueByPath(user, 'user.id') || '';
    this.setData({
      systemInfo: util.getSystemInfo(),
      currentUser: id
    });
    let level = this.data.level;
    battle.PVP_connect(level, () => {
      this.setData({
        isConnect: true
      });
      //监听连接
      this.getMessage();
    });
  },
  /**
   * 初始化AI
   * */
  initAI () {
    let roomId = this.data.roomInfo.roomId;
    let level = 1;
    battle.PVA_connect(roomId, level, () => {
      this.getAiMessage();
    })
  },
  /**
   * 监听AI信息
   * */
  getAiMessage () {
    battle.PVA_onMessage((res) => {
      if (res.type == 2) {
        this.initAiInfo(res)
      }
      if (res.type == 3) {
        let aiPushTime = this.data.aiPushTime;
        if (aiPushTime == res.subject.pushTime) {
          //避免题目二次渲染
          return
        }
        //更PVP 同步 等2秒动画
        setTimeout(()=>{
          this.startAiInter()
        },2000)
      }
    })
  },

  /**
   * aiTimer
   * */
  startAiInter () {
    this.clearAiInterval(() => {
      this.setData({
        aiCountTime: 10
      })
      this.aiTimer = setInterval(() => {
        console.log('ai 答题倒计时')
        if (this.data.aiCountTime <= 0) {
          this.clearAiInterval(() => {
            this.aiAnswer();
          });
        } else {
          this.setData({
            aiCountTime: this.data.aiCountTime - 1
          })
        }
      }, 1000);
    });
  },
  /*
  * 初始化AI 信息
  * */
  initAiInfo (res) {
    this.setData({
      aiInfo: res
    })
  },
  /**
   * aiAnswer
   * */
  aiAnswer () {
    console.log('ai答题了');
    let percent = parseFloat(Math.random() * 1).toFixed(2);
    let aiWinRate = this.data.aiInfo.aiWinRate || 0;
    let that = this;

    //先随机取答案且保证答案不正确
    function getError (right) {
      let result = Math.ceil(parseInt(Math.random() * that.data.questionList.length));
      if (right == result) {
        return getError(right)
      } else {
        console.log('随机答案' + result)
        return result
      }
    }

    let rightAnswer = this.data.questionInfo.subject.rightOption;
    let answer = getError(rightAnswer);
    if (percent > aiWinRate) {
      answer = rightAnswer;
    }
    console.log('ai 答案' + answer)
    battle.PVA_send({
      "type": 2,
      "optionId": answer,		// 用户回答的选项ID，从1开始
      "subjectOffset": this.data.questionCount	// 用户回答的题目ID todo 题目接口里面没有
    })
    if (!this.data.hasMore && this.data.hasMore != undefined) {
      //本次对战结束 算分了！！！！！
      battle.PVA_send({
        "type": 3
      });
    }
  },
  /**
   * 清理AI timer
   * */
  clearAiInterval (callback) {
    if (this.aiTimer) {
      clearInterval(this.aiTimer);
    }
    callback && callback();
  },
  /**
   * 再来一吧 页面状态恢复
   * */
  playAgain () {
    this.setData({
      LOADING: true,
      MATCH: true,
      BATTLE: false,
      END: false,
      WINNER: false,
      vsAi: true,
      /*动画*/
      loadingData: {},
      matchLeftData: {},
      matchRightData: {},
      matchCenterData: {},
      qTypeData: {},
      qListData: {},
      roomInfo: {},
      roomUsers: [],
      currentUser: null,
      hasMore: undefined,
      questionInfo: {},
      questionList: [],
      questionCount: 0,
      countDownTime: 10,
      result: {},
      showResultData: {},
      answered: false,
      countEnd: 0,
      isOffLine: false,//有人掉线
    });
    //动画重置
    this.animationEvt('reset', () => {
      this.initPage();
    })
  },
  /**
   * 关闭连接
   * */
  closeConnect () {
    if (this.data.isConnect) {
      battle.PVP_close()
    }
    if (this.data.isAiConnect) {
      battle.PVA_close()
    }
  },
  /**
   * 展示对战结果
   * */
  showResult () {
    //获取当前用户,
    let result = this.data.result || [];
    let currentUser = this.data.currentUser;
    let roomUser = this.data.roomUsers;
    //计算玩家分数
    for (var i = 0; i < roomUser.length; i++) {
      for (var k = 0; k < result.length; k++) {
        if (roomUser[i].id == result[k].userId) {
          roomUser[i].point = result[k].totlePoint;
          roomUser[i].pointBar = ((roomUser[i].point * 100) / this.data.roomInfo.totlePoint).toFixed(2);
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
    console.log('赢家数据');
    console.log(result[index]);
    this.setData({
      roomUsers: roomUser,
      WINNER: flag,
      showResultData: result[index]
    });

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.isConnect) {
      battle.PVP_close()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});