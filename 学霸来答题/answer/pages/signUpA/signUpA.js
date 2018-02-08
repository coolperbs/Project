// pages/signUpA/signUpA.js
import server from '../../service/service'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        AREA_CODE: {
            "districtArr": [
                {
                    "name": "中国",
                    "number": "+86"
                },
                {
                    "name": "中国香港",
                    "number": "+852"
                },
                {
                    "name": "中国澳门",
                    "number": "+853"
                },
                {
                    "name": "中国台湾",
                    "number": "+886"
                },
                {
                    "name": "美国",
                    "number": "+1"
                },
                {
                    "name": "英国",
                    "number": "+44"
                },
                {
                    "name": "加拿大",
                    "number": "+1"
                },
                {
                    "name": "德国",
                    "number": "+49"
                },
                {
                    "name": "日本",
                    "number": "+81"
                },
                {
                    "name": "法国",
                    "number": "+33"
                },
                {
                    "name": "俄罗斯",
                    "number": "+7"
                },
                {
                    "name": "新加坡",
                    "number": "+65"
                },
                {
                    "name": "意大利",
                    "number": "+39"
                },
                {
                    "name": "比利时",
                    "number": "+32"
                },
                {
                    "name": "荷兰",
                    "number": "+31"
                },
                {
                    "name": "西班牙",
                    "number": "+34"
                },
                {
                    "name": "葡萄牙",
                    "number": "+351"
                },
                {
                    "name": "瑞典",
                    "number": "+46"
                },
                {
                    "name": "瑞士",
                    "number": "+41"
                },
                {
                    "name": "奥地利",
                    "number": "+43"
                },
                {
                    "name": "爱尔兰",
                    "number": "+353"
                },
                {
                    "name": "希腊",
                    "number": "+30"
                },
                {
                    "name": "土耳其",
                    "number": "+90"
                },
                {
                    "name": "以色列",
                    "number": "+972"
                },
                {
                    "name": "波兰",
                    "number": "+48"
                },
                {
                    "name": "芬兰",
                    "number": "+358"
                },
                {
                    "name": "巴西",
                    "number": "+55"
                },
                {
                    "name": "印度",
                    "number": "+91"
                }
            ]
        },
        range: [],
        regText: '获取验证码',
        count: true,
        areacode: '+86',
        phone: '',
        regcode: '',
        index: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options) {
            //todo 有参数 就展示详情信息？
        }
        this.initPage();
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
        var phone = this.data.areacode + this.data.phone;
        server.user.getRegCode(phone, function (res) {
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
     * 自定义事件 去登陆
     * */
    nextStep: function () {
        //todo 这里需要验证判断判断

        this.checkRegCode(function (res) {
            if (res) {
                wx.navigateTo({
                    url: '../signUpB/signUpB'
                });
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