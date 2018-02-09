// pages/getCard/getCard.js
import service from '../../service/service'
import  areaCode from '../../common/areaCode/areaCode'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      AREA_CODE:areaCode ,
      range: [],
      regText: '获取验证码',
      count: true,
      areacode: '+86',
      phone: '',
      regcode: '',
      index: 0,
      userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (options) {
          //todo 有参数 就展示详情信息？
          this.setData({
              userId:options.userId
          })
      }
      wx.setNavigationBarTitle({
          title: '最强学霸答题赢现金'
      })
  },
    initPage:function () {
        var result = [];
        for (let i = 0; i < this.data.AREA_CODE.districtArr.length; i++) {
            var item = this.data.AREA_CODE.districtArr[i];
            result.push(item.name + '  ' + item.number);
        }
        this.setData({
            range: result
        });
    },
    onPullDownRefresh:function () {
        this.initPage();
        setTimeout(()=>{
            wx.stopPullDownRefresh()
        },1500)
    },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.initPage();
  },
    /**
     * 用户输入处理
     * */
    bindKeyInput: function (e) {
        var value = e.detail.value;
        if (e.currentTarget.dataset.type == 'phone') {
            this.setData({
                phone: value
            })
        }
        if (e.currentTarget.dataset.type == 'regcode') {
            this.setData({
                regcode: value
            })
        }
    },
    /**
     * 获取验证码
     * */
    getRegCodeEvt: function () {
        var that = this;
        this.checkInput('show');
        if (this.data.phone == '') {
            wx.showModal({
                title: '提示',
                content: '手机号不能为空',
                confirmText: '确定'
            });
            return
        }
        if(!that.data.count){
            wx.showModal({
                title: '提示',
                content: '你的操作太快啦~~',
                confirmText: '确定'
            });
            return
        }
        var phone = this.data.areacode + this.data.phone;
        service.user.getShareCode({phone:phone,userId:this.data.userId}, function (res) {
            console.log(res)
            if (res.code == '0') {
                that.setData({
                    regText: '已发送验证码',
                    count: false
                });
            } else {
                wx.showToast({
                    title: '验证码发送失败',
                    icon: 'none'
                })
            }
            setTimeout(function () {
                that.setData({
                    regText: '获取验证码',
                    count: true
                });
            }, 30000);
        });
    },
    /**
     * 区号选择
     * */
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value,
            areacode: this.data.AREA_CODE.districtArr[e.detail.value].number
        })
    },

    /**
     * 验证手机验证码
     * */
    checkRegCode: function (callback) {
        if (!this.checkInput()) {
            return
        }
        if (this.data.regcode.length > 6) {
            wx.showModal({
                title: '提示',
                content: '请输入正确长度的验证码'
            });
            return
        }
        service.user.checkShareCode({code:this.data.regcode,userId:this.data.userId,phone:this.data.phone}, function (res) {
            callback(res)
        })
    },
    /**
     * 验证输入框内容
     * */
    checkInput: function (type) {
        var result = false;
        var phone = this.data.phone.replace(/(^\s*)|(\s*$)/g, "");
        var regCode = this.data.regcode.replace(/(^\s*)|(\s*$)/g, "");
        this.setData({
            regCode: regCode,
            phone: phone
        });
        if (phone != '' && regCode != '') {
            result = true;
        } else {
            if (!type) {
                wx.showModal({
                    title: '提示',
                    content: '手机号或验证码不能为空'
                })
            }
        }
        return result;
    },
    nextStep: function () {

        this.checkRegCode(function (res) {
            if (res) {
              //todo  需要新接口
                wx.navigateTo({
                    url: '../entry/entry'
                });
            }
        })

    },
});