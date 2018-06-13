// pages/friendbattle/friendbattle.js
import {battle, user} from '../../services/index'
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
    MATCH: false,
    vsAi: undefined,
    isMach: false
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
    if (this.countTimer) {
      clearInterval(this.countTimer)
    }
    this.countTimer = setInterval(() => {

      if (count >= time) {
        this.clearCountAni()
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
  onShow () {
    this.playBg();
  },
  onReady () {
    this.initPage();
  },
  checkStatus () {
    setTimeout(() => {
      if (this.data.hasError) {
        this.back()
      }
    }, 1000)
  },
  playBg () {
    return
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.setSrc('https://xgross.oss-cn-shenzhen.aliyuncs.com/201804/b456ace7-7cfb-44b1-80ff-81af24a794bb.mp3');
    this.audioCtx.play();
  },
  stopBg () {
    if (this.audioCtx) {
      this.audioCtx.pause();
    }
  },
  playWinner () {
    return
    this.audioCtx2 = wx.createAudioContext('myAudio2');
    this.audioCtx2.setSrc('https://xgross.oss-cn-shenzhen.aliyuncs.com/201804/bdf4c431-a246-4992-afb9-5c6e0eb42307.mp3');
    this.audioCtx2.play();
  },
  stopWinner () {
    if (this.audioCtx2) {
      this.audioCtx2.pause();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      level: options.level || 1,
      roomId: options.roomId || '',
      teamId: options.teamId || ''
    });
    this.modal = this.selectComponent("#m-modal");
  },
  /**
   * 初始化
   * */
  initPage () {
    let UserInfo = utils.getStorageSync('userInfo') || {};
    let token = utils.getValueByPath(UserInfo, 'token');
    if (!token) {
      //用户没有登陆
      utils.redirectTo('../login/login', {direct: this.route, roomId: this.data.roomId})
      return
    }
    this.setData({
      userId: UserInfo.user.id
    });
    battle.TVT_connect(this.data.level, token, this.data.roomId, this.data.teamId, () => {
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
    battle.TVT_onMessage((res) => {
      if (res.code != '0000') {
        if (this.data.isConnect) {
          utils.showToast({
            title: res.message
          })
        }
        this.closeConnect();
        this.back();
        return
      }
      res = res.data;
      if (res.type == 1) {
        //this.initRoom(res);
      }
      if (res.type == 2) {
        return
      }
      if (res.type == 3) {

        this.setData({
          isStart: true
        })
        this.filterSubject(res);
      }
      if (res.type == 4) {

        this.updatePoint(res)
      }
      if (res.type == 5) {

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
        //console.log('有人离开了', res)
        let roomUsers = this.data.roomUsers;
        let runner = roomUsers.findIndex((el) => {
          return el.id == res.userId
        });
        let rest = [...roomUsers]
        utils.showToast({title: '玩家' + rest[runner].name + '离开房间~'})
        //区分开始对战没有
        if (this.data.isStart) {
          // 这里判断 某一个组人为空就退出
          this.startRunner = this.startRunner || [];
          this.startRunner.push(res.userId);
          //对战ai 的时候 如果房主退出了 整个结束
          if (this.data.aiConnect) {
            if (res.userId == this.data.teamId) {
              this.clearCountAni();
              this.clearTheInterval();
              setTimeout(() => {
                this.subjectAnimation(4, () => {
                  this.clearCountAni();
                  this.clearTheInterval();
                  this.sendMessage({type: 3})
                })
              }, 100)
            }
          } else {
            //真人对战  其中一个组退完 才整体退出

            let teamUsersMap = this.data.teamUsersMap;
            for (let k  in teamUsersMap) {
              let count = 0;
              for (let y = 0; y < teamUsersMap[k].length; y++) {
                let temp = teamUsersMap[k][y];
                if (this.startRunner.indexOf(temp) > -1) {
                  count += 1;
                }
                if (count == 2) {
                  this.clearCountAni();
                  this.clearTheInterval();
                  setTimeout(() => {
                    this.subjectAnimation(4, () => {
                      this.clearCountAni();
                      this.clearTheInterval();
                      this.sendMessage({type: 3})
                    })
                  }, 100)
                  break;
                }
              }
            }
          }
        } else {
          rest[runner] = {point: 0};
          //计算还有几个用户
          this.setData({
            roomUsers: rest
          })
          if (res.userId == this.data.teamId) {
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

        return
        this.animationEvt('start', () => {
          this.getSubject();
        })
      }
      if (res.type == '8') {
        let roomId = res.roomId || '';
        let that = this;
        this.modal.showModal({
          content: '房主发起再来一盘',
          confirmText: '确认加入',
          success (res) {
            that.closeConnect();
            if (res.result == 'confirm') {
              utils.redirectTo('../friendbattle/friendbattle', {roomId: roomId})
            } else {
              that.back();
            }
          }
        })
      }
      if (res.type == 9) {
        this.initTeam(res)
        if (this.keepTimer) {
          clearInterval(this.keepTimer)
        }
        this.keepTimer = setInterval(() => {
          battle.TVT_send({type: 999})
        }, 5000)
      }
      if (res.type == 10) {
        if (this.keepTimer) {
          clearInterval(this.keepTimer)
        }
        this.keepTimer = setInterval(() => {
          battle.TVT_send({type: 999})
        }, 5000)
        this.initTeam(res)
      }
      if (res.type == 11) {
        this.setData({
          vsAi: false
        })
        if (!this.get12) {
          this.animationEvt('start');
        }
        this.initRoom(res);
        setTimeout(() => {
          this.setData({
            isMach: true
          })
          this.animationEvt('ready', () => {
            this.beginAnswer(res)
          })
        }, 2000)

        //保持动画一致 都等2000ms

      }
      if (res.type == 12) {
        this.get12 = true
        this.animationEvt('start');
      }
    })
  },
  initTeam (res) {
    this.setData({
      teamId: res.teamId
    })
    this.updateRoomUser(res.teamUsers)
  },
  /**
   * 初始化房间信息
   * */
  initRoom (res) {
    this.setData({
      roomId: res.roomId || '',
      totalPoint: res.totlePoint || ''
    })
    this.updateRoomUser(res.roomUsers, () => {
      setTimeout(() => {
        this.updateTeam(res.teamUsersMap)
      }, 500)
    });
  },
  /**
   * 更新房间信息
   * */
  updateRoomUser (res, callback) {
    let roomUsers = res.map((el, index) => {
      el.point = 0;
      return el;
    });
    //补全 4个用户
    for (let k = roomUsers.length; k < 4; k++) {
      roomUsers.push({
        point: 0
      })
    }
    this.setData({
      roomUsers: roomUsers
    })
    callback && callback();
  },
  updateTeam (res) {
    let teamId = Object.keys(res);
    console.log(teamId)
    let teamIdArr = [];
    // for (let i = 0; i < teamId.length; i++) {
    //   teamIdArr[i] = function (num) {
    //     return {
    //       teamId: teamId[num], teamPoint: 0
    //     }
    //   }(i)
    // }

    for (let k in res) {
      let temp = {teamId: k, teamPoint: 0}
      teamIdArr.push(temp)
    }

    console.log('调整 位置 之前的数据', teamIdArr)
    //todo 这里的问题导致页面卡死  后面的id 变成一样了
    let index = teamIdArr.findIndex((el) => {
      return el.teamId == this.data.teamId
    });
    let index2 = index === 0 ? 1 : 0;
    let tempArrA = teamIdArr[index];
    let tempArrB = teamIdArr[index2]
    let final = [tempArrA, tempArrB]
    this.setData({
      teamUsersMap: res,
      teamIdArr: final
    })
    console.log('初始化 队伍IDArr', final)
  },
  /**
   * 发送消息
   * */
  sendMessage (data) {
    if (!this.data.isConnect) {
      this.back();
      return
    }
    battle.TVT_send(data);
  },
  /**
   * 开始对战
   * */
  startMatch () {
    if (this.isStartMatch) {
      return
    }
    let count = 0;
    this.data.roomUsers.map((el) => {
      if (el.avatar) {
        count++;
      }
    })
    if (count >= 2) {
      this.isStartMatch = true;
      this.sendMessage({"type": 6});
      // 准备 机器人
      setTimeout(() => {
        this.connectAI();
      }, 5000)
    } else {
      wx.showToast({
        title: '先去邀请你的队友吧！~',
        icon: 'none'
      })
    }
  },
  connectAI () {
    if (this.data.vsAi == undefined) {
      battle.TVA_connect(this.data.level, this.data.teamId, () => {
        this.setData({
          aiConnect: true
        })
        this.getAiMessage()
      })
    }
  },
  getAiMessage () {
    battle.TVA_onMessage((res) => {
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
          let subject = this.data.subject;
          if (subject.pushTime == res.subject.pushTime && this.aiTimer) {
            //避免题目二次渲染
            return
          }
          this.startTheAiInterval()
        }, 2000)
      }
      if (res.type == '6') {
        return
        battle.TVA_send({"type": 3});
        setTimeout(() => {
          this.clearTheAiInterval()
          if (this.data.aiConnect) {
            battle.TVA_close();
            this.setData({
              aiConnect: false,
              vsAi: undefined
            })
          }
        }, 500)
      }
    })
  },
  startTheAiInterval () {
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
  clearTheAiInterval (callback) {
    if (this.aiTimer) {
      clearInterval(this.aiTimer);
      this.aiTimer = null;
    }
    callback && callback();
  },
  aiAnswerEvt () {
    //console.log('ai答题了');
    let percent = parseFloat(Math.random() * 1).toFixed(2);
    let percent2 = parseFloat(Math.random() * 1).toFixed(2);
    //let aiWinRate = this.data.aiInfo.aiWinRate || 0;
    let aiWinRate = 0.4;
    let aiWinRate2 = 0.1;
    //todo 差ai 胜率 0.4
    let that = this;

    //先随机取答案且保证答案不正确
    function getError (right) {
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
    let answer2 = getError(rightAnswer);
    if (percent > aiWinRate) {
      answer = rightAnswer;

    }
    if (percent2 > aiWinRate2) {
      answer2 = rightAnswer;
    }
    battle.TVA_send({
      "type": 2,
      "optionId": answer,
      "subjectOffset": this.data.subjectCount,
      "aiUser": true,
      "aiUserId": this.data.roomUsers[0].id
    })
    setTimeout(() => {
      battle.TVA_send({
        "type": 2,
        "optionId": answer2,
        "subjectOffset": this.data.subjectCount,
        "aiUser": true,
        "aiUserId": this.data.roomUsers[1].id
      })
    }, 1000)
  },
  /**
   * 取消对战
   * */
  cancelBattle () {
    let that = this;
    this.modal.showModal({
      content: '确定退出房间?',
      success (res) {
        if (res.result == 'confirm') {
          that.closeConnect();
          that.back();
        }
      }
    })
    // utils.showAction('确定退出房间?', (res) => {
    //   if (res) {
    //     this.closeConnect();
    //     this.back();
    //   }
    // })
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
    let matchAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    if (type == 'reset') {
      //所有动画还原
      matchLeftAni.translateX(-width).step();
      matchRightAni.translateX(width).step();
      matchAni.opacity(1).step();
      room.opacity(1).step();
      this.setData({
        roomAniData: room.export(),
        matchLeftData: matchLeftAni.export(),
        matchRightData: matchRightAni.export(),
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
      }, 100)
    }
    if (type == 'ready') {
      matchLeftAni.translateX(0).step({delay: 500});
      matchRightAni.translateX(0).step({delay: 500});
      this.setData({
        matchLeftData: matchLeftAni.export(),
        matchRightData: matchRightAni.export()
      });
      setTimeout(() => {
        this.animationEvt('gaming', callback)
      }, 1500)
    }
    if (type == 'gaming') {
      matchLeftAni.translateX(-width).step();
      matchRightAni.translateX(width).step();
      matchAni.opacity(0).step();
      this.setData({
        matchLeftData: matchLeftAni.export(),
        matchRightData: matchRightAni.export(),
        matchData: matchAni.export()
      });
      this.initCanvas();
      setTimeout(() => {
        this.setData({
          MATCH: false
        });
        callback && callback();
      }, 500)
    }
  },
  /**
   * 获取题目
   * */
  getSubject () {
    this.getSubjectMap = this.getSubjectMap || {}
    if (!this.data.hasMore) {
      return
    }

    this.setData({
      subjectCount: this.data.subjectCount + 1,
      countDownTime: 10
    });

    if (this.getSubjectMap[this.data.subjectCount]) {
      return
    }

    this.sendMessage({type: 1, subjectOffset: this.data.subjectCount})
    this.getSubjectMap[this.data.subjectCount] = true;
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
    let subjectList = res.subject.optionList.map((item) => {
      let result = {};
      result.className = '';
      result.label = item;
      return result
    });
    delete res.subject.optionList;
    //console.log('又可以答题了')
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
    // console.log('得到答案更新用户分数:--------------------------------------')
    // console.log(res);
    // console.log('得到答案更新用户分数:--------------------------------------')
    console.log('更新分数了')
    console.log('更新用户Id', res.userId)

    this.hasError = false;
    let resultUser = res.userId;
    let index = this.data.roomUsers.findIndex((el) => {
      return el.id == resultUser
    })
    let teamId = res.teamId;
    console.log('-----------')
    console.log(res)
    console.log('队伍id 数组', this.data.teamIdArr)
    console.log('-----------')

    let teamIndex = this.data.teamIdArr.findIndex((el) => {
      return el.teamId == teamId
    })
    let teamIdArr = this.data.teamIdArr;
    let updateTeam = teamIdArr[teamIndex];
    console.log('待更新队伍', updateTeam)
    console.log('更新结果', res)
    if (!updateTeam) {
      return
    }
    try {
      let roomUser = this.data.roomUsers;
      let updateUser = roomUser[index];
      updateUser['point'] += res.point;
      updateTeam['teamPoint'] += res.point;
      if (updateUser['point'] < 0) {
        updateUser['point'] = 0
      }
      if (updateTeam['teamPoint'] < 0) {
        updateTeam['teamPoint'] = 0
      }
      roomUser[index] = updateUser;
      teamIdArr[teamIndex] = updateTeam;
      updateUser['pointAnimation'] = true;
      let oldCombo = updateUser['comboCount'] || 0;
      updateUser['comboCount'] = res.answerResult ? oldCombo + 1 : 0;
      updateUser['comboAnimation'] = updateUser['comboCount'] > 1 ? true : false;
      roomUser[index] = updateUser;
      //console.log(roomUser)
      this.setData({
        roomUsers: roomUser,
        teamIdArr: teamIdArr
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
        //console.log('可以进行下一题或者 提前结束')
        if (!this.data.hasMore && this.data.isAnswered) {
          //获取对战结果
          /*结果展示2秒*/
          console.log('获取结果')
          this.clearCountAni();
          this.clearTheInterval();
          setTimeout(() => {
            this.subjectAnimation(4, () => {
              this.sendMessage({type: 3});
            })
          }, 2000);
          return
        }
        console.log('提前结束')
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
    } catch (e) {
      console.log('跟新分数异常')
      console.log(e)
      this.hasError = true;
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
        subjectList[checkIndex].className = subjectList[checkIndex].className || 'check';
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
              console.log('自动答题')
              //todo 明天检查 是不是这里
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
      console.log('题目已经答过了', this.data.subjectCount)
      return
    }
    // if (this.data.subjectCount === this.lastAnswerCount) {
    //   //避免重复答题
    //   return
    // }
    console.log('答题', this.data.subjectCount)
    console.log('答题用户', this.data.userId)
    console.log('答了几次', this.lastAnswerCount)
    this.setData({
      isAnswered: true
    });
    this.sendMessage({
      "type": 2,
      "optionId": answer,		// 用户回答的选项ID，从1开始
      "subjectOffset": this.data.subjectCount	// 用户回答的题目ID
    });
    this.lastAnswerCount = this.data.subjectCount;
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
    for (let i = 0; i < roomUser.length; i++) {
      for (let k = 0; k < result.length; k++) {
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
    this.stopBg();
    this.playWinner();
    //console.log('玩家数据');
    //console.log(result[index]);
    let resultA = result[index]
    if (resultA.upExp !== undefined) {
      resultA.exp += resultA.upExp
    }
    if (resultA.upGold !== undefined) {
      resultA.gold += resultA.upGold
    }
    let showUPMask = resultA.hasUpLevel || resultA.hasUpDanGrading;
    this.setData({
      roomUsers: roomUser,
      WINNER: flag,
      result: result,
      showUPMask: showUPMask,
      hasUpLevel: resultA.hasUpLevel || false,
      hasUpDanGrading: resultA.hasUpDanGrading || false
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
    console.log('关闭连接:-------------------------------------')
    this.clearTheInterval();
    this.clearTheAiInterval()
    this.clearCountAni();
    if (this.data.isConnect) {
      battle.TVT_close();
      this.setData({
        isConnect: false
      })
    }
    if (this.data.aiConnect) {
      setTimeout(() => {
        battle.TVA_close();
      }, 50)
    }
    if (this.keepTimer) {
      clearInterval(this.keepTimer)
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
    setTimeout(() => {
      wx.navigateBack();
    }, 50)
  },
  onHide () {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('触发页面卸载了')
    this.closeConnect();
    this.stopBg();
    this.stopWinner();
  },
  /**
   * 判断是否开始答题
   * */
  beginAnswer (res) {
    if (res.beginAnswer) {
      if (this.data.vsAi == 'undefined') {
        this.setData({
          vsAi: false
        })
      }
      this.getSubject()
    }
  },
  closeModal () {
    this.setData({
      showUPMask: false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (this.data.isEnd) {
      return {
        title: '我在知识大对战等你~',
        path: '/pages/login/login',
        success: function (res) {
          user.shareGetGold(function (res) {
            if (!res || res.code != '0000') {
              return;
            }
            wx.showToast({title: '分享成功'});
          });
        },
        fail: function (res) {

        }
      }
    } else {
      let teamId = this.data.teamId;
      return {
        title: '等你来战',
        path: '/pages/login/login?direct=../2v2/2v2&teamId=' + teamId + '&leve=' + this.data.level,
        success: function (res) {
        },
        fail: function (res) {
        }
      }
    }
  }
})