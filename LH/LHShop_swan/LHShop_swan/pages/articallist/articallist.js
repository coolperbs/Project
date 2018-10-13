var weigetUtil = require('../../common/utils/weigetUtil');
var utils = require('../../common/utils/utils');
var List = weigetUtil.List;
var Tab = weigetUtil.tab;
var App = getApp();
var config = App.config;

var typeEnum = {
  "1": '三会一课',
  "2": '党课学习'
};
var subtypeEnum = {
  "1": '党员风采',
  '2': '会议学习',
  '3': '年底工作计划',
  '4': '学习计划',
  '5': '工作总结'
  // '6':'资料下载'
};

Page({
  onShow: function () {
    var self = this;
    self.searchParam = {
      keyWord: ''
    };
    self.setData({
      searchParam: self.searchParam
    });
    _fn.init(self);
  },
  changeKeyword: function (e) {
    var self = this;
    var keyWord = e.detail.value;
    self.searchParam = self.searchParam || {};
    self.searchParam = {
      keyWord: keyWord
    };
    self.setData({
      searchParam: self.searchParam
    });
  },
  search: function () {

    _fn.updateList(this);
  },
  back: function () {
    swan.navigateBack();
  },
  changeTab: function (e) {
    var self = this;
    //切换tab
    var tabData = self.tab.change(e);
    var extraParam = JSON.parse(e.currentTarget.dataset.extra);
    var type = extraParam.type;

    self.searchParam = self.searchParam || {};
    self.searchParam = {
      keyWord: '',
      type: type
    };
    self.setData({
      searchParam: self.searchParam,
      tab: tabData
    });
    _fn.updateList(self);
  },
  loadMore: function (e) {
    var self = this;
    self.List.next();
  },
  toDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    // 之后统一到活动页，考虑模板拓展的问题
    swan.navigateTo({
      url: '../artical/artical?id=' + id
      //url : '../active/active?actid=' + id
    });
  }
});

var _fn = {
  init: function (page) {
    _fn.createList(page);
    _fn.createTab(page);
    swan.getSystemInfo({
      success: function (res) {
        var scrollHeight = utils.toRpx(res.windowHeight) - 20 + 'rpx';
        page.setData({
          scrollHeight: scrollHeight

        });
      }
    });
  },
  getListConfig: function (page) {
    page = page || {};
    var searchParam = page.searchParam || {};
    var keyWord = searchParam.keyWord || '';
    var type = searchParam.type || 1;
    var listConfig = {
      url: config.actHost + '/article/search',
      param: {
        //type:2,//1:三会一课 2:党课学习
        //subType:type,//1:党员风采，2会议学习，3年底工作计划，4学习及恶化，5工作总结，6资料下载
        title: keyWord
      },
      getList: function (res) {
        var retList = res.data.news || [];
        retList.map(function (v, k) {
          v.showCreateTime = utils.formateTime(v.modified);
          //v.showType = subtypeEnum[v.bussinessTypes.toString()];
          // v.showType = subtypeEnum[type]
          return v;
        });
        return retList;
      },
      getHasMore: function (res) {
        return res.data.hasMore;
        // return true;
      },
      render: function (data) {
        // data = {
        // 	totalData : [1,2,3,4,5,6,7,8,9,0,11]
        // };
        page.setData({
          listData: data.totalData

        });
      }
    };
    return listConfig;
  },
  createList: function (page) {
    var config = _fn.getListConfig(page);
    page.List = new List(config);
    page.List.next();
  },
  updateList: function (page) {
    var config = _fn.getListConfig(page);
    page.List.setConfig(config);
    page.List.next();
  },
  createTab: function (page) {
    page.tab = new Tab({
      tabs: [{
        name: "党员风采",
        extra: JSON.stringify({ type: 1 })
      }, {
        name: '会议学习',
        extra: JSON.stringify({ type: 2 })
      }, {
        name: '年底工作计划',
        extra: JSON.stringify({ type: 3 })
      }, {
        name: '学习计划',
        extra: JSON.stringify({ type: 4 })
      }, {
        name: '工作总结',
        extra: JSON.stringify({ type: 5 })
      }]

    });
    var tabData = page.tab.change();
    // console.log(tabData);
    page.setData({ tab: tabData });
  }
};