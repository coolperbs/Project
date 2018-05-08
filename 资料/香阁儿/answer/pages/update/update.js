// pages/update/update.js
import { user } from '../../services/index';
import utils from '../../common/utils/utils';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    popShowData: {},
    isShowPop: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList() {
    user.getUpdateList((res) => {
      console.log(res)
      if (res.code != '0000') {
        utils.showToast({ title: '获取列表失败,请稍后重试！' });
        return;
      }
      this.setData({ listData: res.data })
    })
  },
  hidePop() {
    this.setData({
      isShowPop: false
    })
  },
  showPop(e) {
    let index = e.currentTarget.dataset.index;
    //判断是否展示升级
    let showPopData = this.data.listData[index];
    if(showPopData.nextLevel==undefined){
      wx.showToast({title:'等级已升满'})
      return
    }
    this.setData({
      popShowData: this.data.listData[index],
      isShowPop: true
    })
  },
  updateLevel() {
    user.updateList({ code: this.data.popShowData.code }, res => {
      console.log(res)
      if (res.code != '0000') {
        utils.showToast({
          title: '升级失败,' + res.message
        })
        return;
      }
      utils.showToast({
        title: '升级成功'
      })
      setTimeout(() => {
        this.hidePop();
        this.getList();
      }, 1500)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '等你来战',
      path: '/pages/login/login',
      success: function (res) {
        user.shareGetGold(function (res) {
          if (!res || res.code != '0000') {
            return;
          }
          wx.showToast({ title: '领取成功' });
        });
      }
    }
  }
})