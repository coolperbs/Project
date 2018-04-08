// pages/rank/rank.js
import utils from '../../common/utils/utils'
import {rank} from '../../services/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: false,
    rankData: {},
    scrollToView: 0,
    modalValue:{}
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.updateRank();
  },
  /**
   * 更新rank
   * */
  updateRank() {
    rank.getRank((res) => {
      if (res.code !== '0000') {
        return
      }
      this.filterData(res.data)

    });
  },
  filterData(data) {
    let scrollToView = 0;
    for (let i = 0; i < data.danGradingList.length; i++) {
      let item = data.danGradingList[i];
      if (!item.deblock && i != 0) {
        scrollToView = i - 1
        break
      }
    }
    //用户技能处理
    let skills = data.user.skillInfos || [];
    //把道具拆开单独的
    //todo 是否直接取
    let indexA = skills.findIndex((el) => {
      return el.type == 1
    });
    let skillA = skills[indexA];
    let indexB = skills.findIndex((el) => {
      return el.type == 2
    });
    let skillB = skills[indexB];
    let indexC = skills.findIndex((el) => {
      return el.type == 3
    });
    let skillC = skills[indexC];
    let indexD = skills.findIndex((el) => {
      return el.type == 4
    });
    let skillD = skills[indexD];
    //1 3 限时
    this.setData({
      skillA: skillA,
      skillB: skillB,
      skillC: skillC,
      skillD: skillD
    });

    if (this.data.skillA) {
      if (this.timerA) {
        clearInterval(this.timerA)
      }
      this.timerA = setInterval(() => {
        let result = this.leftTime(this.data.skillA.limit);
        let tempSkill = this.data.skillA;
        tempSkill['countDown'] = result
        if (result) {
          this.setData({
            skillA: tempSkill
          })
        } else {
          clearInterval(this.timerA)
        }
      }, 1000);

    }

    if (this.data.skillC) {
      if (this.timerC) {
        clearInterval(this.timerC)
      }
      this.timerC = setInterval(() => {
        let result = this.leftTime(this.data.skillC.limit);
        let tempSkill = this.data.skillC;
        tempSkill['countDown'] = result;
        if (result) {
          this.setData({
            skillC: tempSkill
          })
        } else {
          clearInterval(this.timerC)
        }
      }, 1000);
    }
    let userCurrentLevel = data.user.danGradingLevel;
    let count = data.user.danGradingProcess;
    for (let i = 0; i < data.danGradingList.length; i++) {
      let item = data.danGradingList[i];
      item['processCountArr'] = [];
      for (var k = item.processCount || 0; k > 0; k--) {
        item['processCountArr'].push({active: false})
      }
      if (item.level < userCurrentLevel) {
        item['processCountArr'] = item['processCountArr'].map((el, index) => {
          el.active = true
          return el
        })
      }
      if (item.level == userCurrentLevel) {
        item['processCountArr'] = item['processCountArr'].map((el, index) => {
          if (index + 1 <= count) {
            el.active = true
          } else {
            el.active = false
          }
          return el
        })
      }
      this.setData({
        rankData: data,
        scrollToView: scrollToView
      })
    }
  },
  leftTime(endTime) {
    var leftTime = (endTime) - (new Date().getTime()); //计算剩余的毫秒数
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
    hours = this.checkTime(days * 24 + hours);
    minutes = this.checkTime(minutes);
    if (leftTime > 0) {
      if (hours > 0) {
        return hours + ':' + minutes + ':' + seconds
      } else {
        return minutes + ':' + seconds
      }
    } else {
      return null
    }
  },
  checkTime(i) { //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },
  showSkill(e) {
    debugger
    let value = e.currentTarget.dataset.index;
    this.setData({
      modalValue: value,
      showModal:true
    })
  },
  hideSkill(e){
    this.setData({
      showModal:false
    })
  },
  rankBattleEvt(e) {
    let level = e.currentTarget.dataset.level || 1
    utils.navigateTo('../battleone/battleone', {level: level})
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})