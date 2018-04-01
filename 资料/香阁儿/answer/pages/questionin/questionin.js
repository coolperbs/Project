// pages/questionin/questionin.js
import {questionlib} from '../../services/index'
import utils from '../../common/utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr: [],
    index: 0
  },
  formSubmit (e) {
    console.log(e)
    //初步校验

    let value = e.detail.value;
    //去掉空格
    for (let k in value) {
      value[k] = value[k].toString().replace(/(^\s*)|(\s*$)/g, "");
    }
    if (value.title == '') {
      utils.showToast({title: '请输入题目'})
      return
    }
    if (value.right == '') {
      utils.showToast({title: '请输入正确答案'})
      return
    }
    if (value.opt1 == '' && value.opt2 == '' && value.opt3 == '') {
      utils.showToast({title: '请至少填入一个错误答案'})
      return
    }
    //数据组装
    let options = [];
    options.push({
      option: value.right,
      isRight: true
    })
    for (let i = 1; i < 4; i++) {
      if (value['opt' + i] != '') {
        options.push({
          option: value['opt' + i]
        })
      }
    }
    let data = {
      title: value.title,
      type: value.type,
      options: options
    }
    questionlib.inputQ(data, res => {
      if (res.code != '0000') {
        utils.showToast({
          title: res.message
        })
        return
      }
      utils.showError('提交成功..请等待审核通过',res=>{
        wx.navigateBack()
      })
    })
  },
  bindPickerChange (e) {
    this.setData({index: e.detail.value})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    questionlib.getTypeArr(res => {
      if (res.code != '0000') {
        utils.showToast({
          title: res.message
        })
        return
      }
      this.setData({
        typeArr: res.data
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})