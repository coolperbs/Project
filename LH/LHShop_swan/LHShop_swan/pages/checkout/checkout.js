var ajax = require('../../common/ajax/ajax'),
    weigetUtils = require('../../common/utils/weigetUtil'),
    service = require('../../service/service'),
    utils = require('../../common/utils/utils'),
    couponService = require('../../service/coupon/coupon'),
    app = getApp(),
    Address = weigetUtils.Address,
    pageParam,
    SCoupon = {},
    _fn;

Page({
  data: {
    paymentType: 1, // 默认微信支付
    floor: ['1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼', '8楼', '9楼', '10楼', '11楼', '12楼', '13楼', '14楼', '15楼', '16楼', '17楼', '18楼', '19楼', '20楼', '21楼', '22楼', '23楼', '24楼', '25楼', '26楼', '27楼', '28楼', '29楼', '30楼'],
    selectedFloor: 0,
    otherMoney: 0 // 附加金额0
  },
  onShareAppMessage: app.shareFunc,
  onLoad: function (param) {
    pageParam = param || {};
  },
  chooseFloor: function (e) {
    var floor = e.detail.value * 1,
        otherMoney = 0;

    otherMoney = (floor * 1 - 1) * 100;
    otherMoney = otherMoney < 0 ? 0 : otherMoney;
    this.setData({
      selectedFloor: floor,
      otherMoney: otherMoney
    });
  },
  onShow: function () {
    var self = this;

    SCoupon = couponService.cache();
    couponService.cache(null);
    var bizType = pageParam.bizType;
    var getDataFunc;
    if (bizType === 'groupon') {
      getDataFunc = _fn.getPageDataGroupon;
    } else {
      getDataFunc = _fn.getPageData;
    }
    // 获取页面信息
    getDataFunc(function (res) {
      if (res.code / 1 === 1000) {
        swan.navigateTo({ url: '../login/login' });
        return;
      }
      if (utils.isErrorRes(res)) {
        return;
      }
      if (res.data.sku && (!res.data.skus || res.data.skus.length <= 0)) {
        res.data.skus = [res.data.sku];
      }

      self.setData({
        pageData: res.data,
        selectedCoupon: SCoupon.selectCoupon || {},
        pointPrice: res.data.pointPrice
      });

      if (res && res.data && res.data.defaultAddress && !self.data.address) {
        _fn.initAddress(self, res.data.defaultAddress);
      } else if (self.data.address) {
        return;
      } else {
        _fn.initAddress(self, {});
      }
    });
    //this.showAddress();
  },

  usePoint: function (e) {
    var value = e.detail.value * 100,
        data = this.data;

    if (value <= 0) {
      value = 0;
    }
    if (value >= data.pageData.pointPrice) {
      //wx.showModal( { title : '提示', showCancel: false, content : ( '积分最多用' + data.pointPrice / 100 + '元' ) } );
      value = data.pageData.pointPrice;
    }
    if (value >= data.pageData.payPrice) {
      value = data.pageData.payPrice;
    }

    this.setData({
      pointPrice: value
    });
  },

  selectAddress: function (e) {
    var id = e.currentTarget.dataset.id,
        data = this.data,
        addressList = data.addressList || {},
        addressInfo,
        i,
        len;

    addressList = addressList.list || [];
    for (i = 0, len = addressList.length; i < len; ++i) {
      if (addressList[i].addressId == id) {
        addressInfo = addressList[i];
        break;
      }
    }
    addressInfo = addressInfo || {};
    addressInfo.id = addressInfo.addressId;
    _fn.initAddress(this, addressInfo);
    this.hideAddress();
    // this.setData( {
    // 	'addressList.selectedId' : id
    // } );
  },

  saveinput: function (e) {
    var value = e.detail.value,
        key = e.currentTarget.dataset.key,
        address = this.data.address;

    address[key] = value;
    this.setData({
      address: address
    });
  },

  changePayment: function (e) {
    var type = e.currentTarget.dataset.payment;
    this.setData({
      paymentType: type
    });
  },

  newAddress: function () {
    var address = {};
    this.setData({
      address: {}
    });
    _fn.initAddress(this, address);
    this.hideAddress();
  },

  showAddress: function () {
    var self = this,
        address = self.data.address || {},
        id = address.id;
    // 请求列表
    self.setData({
      showAddress: true,
      'addressList.selectedId': id
    });
    utils.showLoading(300);
    _fn.getAddressList(self, function (list) {
      var data = self.data,
          selectedId = null;
      utils.hideLoading();
      if (data && data.address && data.address.id) {
        selectedId = data.address.id;
      }
      self.setData({
        addressList: {
          selectedId: selectedId,
          list: list
        }
      });
    });
  },

  hideAddress: function () {
    this.setData({
      showAddress: false
    });
  },

  goCoupons: function () {
    couponService.cache({
      selectCoupon: this.data.pageData.defaultCoupon,
      available: this.data.pageData.availableCoupons,
      unavailable: this.data.pageData.unavailabilityCoupons
    });
    swan.navigateTo({ url: '../coupon-use/coupon-use' });
  },

  submit: function (e) {
    var userInfo = swan.getStorageSync('userinfo'),
        self = this;
    if (!userInfo || !userInfo.token) {
      swan.navigateTo({ url: '../login/login' });
      return;
    }

    if (!_fn.checkForm(this, e)) {
      return;
    }
    setTimeout(function () {
      // 保证blur先执行
      _fn.submit(self, function (res) {
        // 如果是在线支付就继续调用
        if (utils.isErrorRes(res)) {
          return;
        }
      });
    }, 100);
  },
  changeLocation: function (e) {
    var self = this;
    self.address.change(e);
  }
});

_fn = {
  getAddressList: function (caller, callback) {
    var data = caller.data;
    if (data.addressList) {
      callback && callback(data.addressList.list);
    }
    ajax.query({
      url: app.host + '/app/address/list'
    }, function (res) {
      if (utils.isErrorRes(res)) {
        return;
      }
      callback && callback(res.data);
    });
  },

  getPageData: function (callback) {
    var url = '',
        couponId = 0,
        city = swan.getStorageSync('city'),
        selectedCoupon = SCoupon;

    //  模拟数据
    //city = city || { name : '成都市', code : '028' };

    if (!city || !city.code) {
      swan.showToast({ title: '缺少地址信息' });
      return;
    }
    if (selectedCoupon && selectedCoupon.selectCoupon && selectedCoupon.selectCoupon.id) {
      couponId = selectedCoupon.selectCoupon.id;
    }
    if (pageParam.skuid && pageParam.skunum) {
      url = app.host + '/app/trade/buynow/' + city.code + '/' + pageParam.skuid + '/' + pageParam.skunum + '/' + couponId; //后面那个是优惠券Id
    } else if (pageParam.shopid) {
      // 门店购买
      url = app.host + '/app/trade/cartbuy/' + city.code + '/' + pageParam.shopid + '/' + couponId;
    } else {
      swan.showToast({ title: '缺少页面相关参数' });
      return;
    }

    ajax.query({
      url: url
    }, callback);
  },
  getPageDataGroupon: function (callback) {
    var url = "";
    var productId = pageParam.productId;
    var grouponId = pageParam.grouponId;
    var city = swan.getStorageSync('city');
    var cityCode = city.code || '028';
    var url = app.host + '/app/trade/groupon/' + cityCode;

    ajax.query({
      url: url,
      param: {
        productId: productId,
        grouponId: grouponId
        // grouponId:grouponId||null
      }
    }, callback);
  },
  initAddress: function (caller, address) {
    if (!address) {
      return;
    }
    caller.address = new Address({
      provinceId: address.province,
      cityId: address.city,
      countryId: address.country,
      changeCallback: function (data) {
        var formData = address,
            key;
        if (data.province) {
          formData.province = data.province.adcode;
          formData.provinceName = data.province.name;
          formData.lat = data.province.lat;
          formData.lng = data.province.lng;
        } else {
          formData.province = null;
          formData.provinceName = null;
        }
        if (data.city) {
          formData.city = data.city.adcode;
          formData.cityName = data.city.name;
          formData.lat = data.city.lat;
          formData.lng = data.city.lng;
        } else {
          formData.city = null;
          formData.cityName = null;
        }
        if (data.country) {
          formData.country = data.country.adcode;
          formData.countryName = data.country.name;
          formData.lat = data.country.lat;
          formData.lng = data.country.lng;
        } else {
          formData.country = null;
          formData.countryName = null;
        }

        for (key in caller.data.address) {
          formData[key] = formData[key] || caller.data.address[key];
        }
        caller.setData({
          location: data,
          address: formData
        });
      }
    });
    caller.address.change();
  },

  checkForm: function (caller, e) {
    var newData = e.detail.value || {};
    if ((newData.userName + '').trim() == '') {
      swan.showToast({ title: '请填写联系人' });
      return false;
    }
    if ((newData.userPhone + '').trim() == '') {
      swan.showToast({ title: '请填写手机号' });
      return false;
    }
    if (!/^1[34578]\d{9}$/.test(newData.userPhone)) {
      swan.showToast({ title: '请填写正确的手机号' });
      return false;
    }
    if ((newData.address + '').trim() == '') {
      swan.showToast({ title: '请填写详细地址' });
      return false;
    }
    caller.data.address.userName = newData.userName;
    caller.data.address.userPhone = newData.userPhone;
    caller.data.address.address = newData.address;
    caller.data.remarkInfo = newData.remarkInfo;
    return true;
  },
  submit: function (caller) {
    var data = caller.data;
    // 验证表单数据
    var createOrderFunc;
    if (pageParam.bizType === 'groupon') {
      createOrderFunc = _fn.createOrderGroupon;
    } else {
      createOrderFunc = _fn.createOrder;
    }

    // 1.创建订单
    createOrderFunc(caller, function (orderRes) {
      if (utils.isErrorRes(orderRes)) {
        return;
      }
      var orderId = orderRes.data.orderId;

      if (caller.data.type == '到店支付') {
        swan.redirectTo({ url: '../orderdetail/orderdetail?orderid=' + orderId });
        return;
      }

      // 水卡这些就不支付了
      if (caller.data.paymentType != 1 && caller.data.paymentType != 2) {
        if (pageParam.bizType === 'groupon') {
          var grouponId = orderRes.data.grouponId;
          swan.redirectTo({ url: '../gp-detail/gp-detail?grouponId=' + grouponId });
        } else {
          swan.redirectTo({ url: '../orderdetail/orderdetail?orderid=' + orderId });
        }
        return;
      }

      // 余额支付的情况
      if (orderRes && orderRes && orderRes.data && orderRes.data.payPrice * 1 === 0) {
        swan.redirectTo({ url: '../orderdetail/orderdetail?orderid=' + orderId });
        return;
      }

      // 2.获取支付订单
      _fn.payOrder({
        orderId: orderRes.data.orderId
      }, function (payRes) {
        if (!payRes || payRes.code != '0000' || !payRes.success) {
          swan.showModal({
            title: '提示',
            content: payRes.msg || '系统错误',
            showCancel: false,
            complete: function () {
              swan.redirectTo({ url: '../orderdetail/orderdetail?orderid=' + orderId });
            }
          });
          return;
        }

        // 3.唤醒微信支付
        _fn.wxPay({
          timeStamp: payRes.data.timeStamp,
          nonceStr: payRes.data.nonceStr,
          package: 'prepay_id=' + payRes.data.prepayId,
          paySign: payRes.data.sign
        }, function (res) {
          swan.showLoading({ title: '正在更新支付结果...' });
          setTimeout(function () {
            swan.hideLoading();
            if (pageParam.bizType === 'groupon' && res !== false) {
              var grouponId = orderRes.data.grouponId;
              swan.redirectTo({ url: '../gp-detail/gp-detail?grouponId=' + grouponId });
            } else {
              swan.redirectTo({ url: '../orderdetail/orderdetail?orderid=' + orderId + "&bizType=" + pageParam.bizType });
            }
          }, 2000);
        });
      });
    });
  },
  createOrder: function (caller, callback) {
    var data = caller.data;
    var type;
    var address = data.address || {};
    var param = {};
    var url;
    var city = swan.getStorageSync('city');

    address.addressId = address.id || '';
    if (pageParam.skunum && pageParam.skuid) {
      param.skuNum = pageParam.skunum;
      param.skuId = pageParam.skuid;
      param.shopId = 1;
    } else if (pageParam.shopid) {
      param.shopId = pageParam.shopid;
    } else {
      swan.showToast({ title: '缺少页面相关参数' });
      return;
    }
    if (!city || !city.code) {
      swan.showToast({ title: '缺少地址信息' });
      return;
    }
    param.citycode = city.code;
    if (caller.data.selectedCoupon && caller.data.selectedCoupon.id) {
      param.couponId = caller.data.selectedCoupon.id;
    }

    if (pageParam.skuid && pageParam.skunum) {
      url = app.host + '/app/order/buynow/submit';
    } else if (pageParam.shopid) {
      // 门店购买
      url = app.host + '/app/order/cart/submit';
    } else {
      swan.showToast({ title: '缺少页面相关参数' });
      return;
    }

    if (data.otherMoney && (data.paymentType == 1 || data.paymentType == 2)) {
      param.otherMoney = data.otherMoney;
    }
    param.address = address;
    param.payType = data.paymentType;
    param.userPoint = data.pointPrice;
    param.remarkInfo = data.remarkInfo;
    if (data.pageData.store.catTypeId == 2 && (data.paymentType == 1 || data.paymentType == 2)) {
      param.remark = '送水楼层' + (data.selectedFloor + 1) + '楼';
    }
    //param.userMoney = data.
    ajax.query({
      url: url,
      param: param
    }, callback);
  },
  createOrderGroupon: function (caller, callback) {
    var data = caller.data;
    var type;
    var address = data.address || {};
    var param = {};
    var url;
    var city = swan.getStorageSync('city') || { code: '028' };

    address.addressId = address.id || '';
    // if ( pageParam.skunum && pageParam.skuid ) {
    // 	param.skuNum = pageParam.skunum;
    // 	param.skuId = pageParam.skuid;
    // 	param.shopId = 1;
    // } else if ( pageParam.shopid ) {
    // 	param.shopId = pageParam.shopid;
    // } else {
    // 	wx.showToast( { title : '缺少页面相关参数' } );
    // 	return;
    // }
    if (!city || !city.code) {
      swan.showToast({ title: '缺少地址信息' });
      return;
    }
    if (!pageParam.productId) {
      swan.showToast({ title: '缺少拼团信息' });
      return;
    }

    if (caller.data.selectedCoupon && caller.data.selectedCoupon.id) {
      param.couponId = caller.data.selectedCoupon.id;
    }

    // if ( pageParam.skuid && pageParam.skunum ) {
    // 	url = app.host + '/app/order/buynow/submit';
    // }
    // else if ( pageParam.shopid ) {  // 门店购买
    // 	url = app.host + '/app/order/cart/submit';
    // } else {
    // 	wx.showToast( { title : '缺少页面相关参数' } );
    // 	return;
    // }

    url = app.host + '/app/order/groupon/submit';

    param.citycode = city.code;
    param.address = address;
    param.payType = data.paymentType;
    param.userPoint = data.pointPrice;
    param.productId = pageParam.productId;
    param.grouponId = pageParam.grouponId;
    //param.userMoney = data.
    ajax.query({
      url: url,
      param: param
    }, callback);
  },

  payOrder: function (param, callback) {
    ajax.query({
      url: app.host + '/app/pay/wechatPrePay',
      param: param
    }, callback);
  },

  wxPay: function (param, callback) {
    swan.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: 'MD5',
      paySign: param.paySign,
      success: function () {
        callback && callback(true);
      },
      fail: function () {
        callback && callback(false);
      }
    });
  }
};