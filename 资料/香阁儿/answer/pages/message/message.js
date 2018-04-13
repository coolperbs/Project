// pages/message/message.js
import utils from '../../common/utils/utils'
import {notice} from '../../services/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    notice.getNotice((res) => {
      if (res.code != '0000') {
        utils.showToast({
          title: res.message
        })
        return
      }
      this.setData({
        noticeData: res.data || null
      })
      setTimeout(() => {
        this.readNotice();
      }, 1000)
    })
  },
  readNotice() {
    if(this.data.noticeData){
      notice.readNotice({id: this.data.noticeData.id}, (res) => {
        console.log(res)
      })
    }
  }
});