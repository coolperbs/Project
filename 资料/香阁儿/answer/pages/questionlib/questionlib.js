// pages/questionlib/questionlib.js
import {questionlib} from '../../services/index'
import utils from '../../common/utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 2,
    currentPage: 1,
    listArr: [],
    isEmpty: false,
    loading: false
  },
  changeTab (e) {
    let tab = e.currentTarget.dataset.tab
    if (tab == this.data.tab) {
      return
    }
    this.setData({
      tab: tab,
      listArr: [],
      isEmpty: false,
      currentPage: 1
    })
    this.loadEvt()
  },
  goin () {
    wx.navigateTo({
      url: '../questionin/questionin'
    })
  },
  loadEvt () {
    if (this.data.loading || this.data.isNoMore) {
      return
    }
    this.setData({
      loading: true
    })
    questionlib.getList({currentPage: this.data.currentPage, status: this.data.tab,pageSize:20}, res => {
      this.setData({
        loading: false
      })
      if (res.code != '0000') {
        utils.showToast({
          title: res.message
        })
        return
      }
      let result = res.data.result || [];
      result = result.map((el) => {
        if(el.options){
          el.options = JSON.parse(el.options);
        }
        return el
      })
      this.setData({
        listArr: [...this.data.listArr, ...result]
      })
      if (this.data.listArr.length <= 0) {
        this.setData({
          isEmpty: true
        })
      }
      console.log(res)
    })
  },
  loadMoreEvt () {
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    this.loadEvt();
  },
  onShow(){
    this.setData({
      tab: 2,
      listArr: [],
      isEmpty: false,
      currentPage: 1
    })
    this.loadEvt()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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