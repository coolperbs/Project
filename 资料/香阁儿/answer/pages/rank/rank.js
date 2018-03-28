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
    skills: [{}, {}, {}, {}],
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
    let skill = [];
    let skills = data.user.skillTypes || [];
    for (let i = 0; i < 4; i++) {
      skill.push({
        active: false
      })
      for (let k = 0; k < skills.length; k++) {
        if (i + 1 == skills[k]) {
          skill[i].active = true
        }
      }
    }
    this.setData({
      skills: skill
    })

    let userCurrentLevel = data.user.danGradingLevel;
    let count = data.user.danGradingProcess;
    for (let i = 0; i < data.danGradingList.length; i++) {
      let item = data.danGradingList[i];
      item['processCountArr'] = [];
      for (var k = item.processCount; k >= 0; k--) {
        item['processCountArr'].push({active: false})
      }
      if (item.level < userCurrentLevel) {
        item['processCountArr'] = item['processCountArr'].map((el) => {
          el.active = true
          return el
        })
      }
      this.setData({
        rankData: data,
        scrollToView: scrollToView
      })
      if (item.level == userCurrentLevel) {
        for (let y = 0; y < item['processCountArr'].length; y++) {
          if (y  < count) {
            setTimeout(() => {
              item['processCountArr'][y].active = true;
              this.setData({
                rankData: data
              })
            }, 1000)
          }
        }
      }
    }
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