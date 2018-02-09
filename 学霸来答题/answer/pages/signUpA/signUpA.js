// pages/signUpA/signUpA.js
import server from '../../service/service'
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
        index: 0
    },
    onShareAppMessage : function() {
        var userId,
            userInfo = service.user.getStoreInfo(),
            path;

        userId = userInfo || {};
        userId = userId.user || {};
        userId = userId.id;
        path = userId ? 'pages/getCard/getCard?userId=' + userId : 'pages/index/index'
        return {
            path : path,
        };
    },
    onPullDownRefresh:function () {
        this.initPage();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options) {
            //todo 有参数 就展示详情信息？
        }

        wx.setNavigationBarTitle({
            title: '手机验证(1/3)'
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
        server.user.getRegCode(phone, function (res) {
            console.log(res)
            if (res.code == '0') {
                that.setData({
                    regText: '已发送验证码',
                    count: false
                });
              wx.showToast({
                title: '验证码已发送',
                icon: 'success'
              })
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
     * 自定义事件 去登陆
     * */
    nextStep: function () {
        this.checkRegCode(function (res) {
            if (res) {
                wx.showToast({
                    title:'保存成功',
                    icon:'success'
                });
                setTimeout(()=>{
                    wx.navigateTo({
                        url: '../signUpB/signUpB'
                    });
                },1500)
            }
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
        server.user.checkRegCode(this.data.regcode, function (res) {
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
    }
});