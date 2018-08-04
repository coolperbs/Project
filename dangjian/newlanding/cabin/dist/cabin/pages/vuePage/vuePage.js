define('cabin/pages/vuePage/vuePage', function (require, exports, module) {
    var handle, Page, page;
    Page = require('cabin/page/page');
    window.Vue = require('cabin/lib/vue/vue');
    var timepicker = require('cabin/widgets/datepicker/datepicker');
    page = Page({
        nodeClass: 'cabin-page-vuepage',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/vuePage/vuePage.tpl'],
        show: function () {
            handle.jView = this.jView;
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
            handle.vue();
        },
        hide: function () {
        },
        on: {}
    });
    handle = {
        vm: null,
        vmData: {
            dateOpt: {
                singleDatePicker: true,
                format: 'YYYY-MM-DD', //控件中from和to 显示的日期格式
                autoUpdateInput: true
            },
            chosenOpt: {
                no_results_text: '没有找到',
                disable_search: true,
                search_contains: true,//关键字模糊搜索，设置为false，则只从开头开始匹配
                allow_single_deselect: true
            },
            result:{
                date:'2017/11/20',
                date2:'2017/11/20',
                chose:''
            },
            datepicker:{
                language:  'zh-CN'
            },
            valueB:'',
            dataList:[
                {
                    checked:false,
                    id:111
                },
                {
                    checked:false,
                    id:222
                },
                {
                    checked:false,
                    id:333
                },
                {
                    checked:false,
                    id:4444
                }
            ]
        },
        vue: function () {
            if (handle.vm) {
                handle.vm.reset(function () {
                    handle.vm.initEvt();
                });
                return
            }
            handle.vm = new Vue({
                el: '#app',
                data: JSON.parse(JSON.stringify(handle.vmData)),
                directives: {
                    'timepicker': timepicker
                },
                mounted: function () {
                    this.initEvt();
                },
                filters:{
                  testA:function (va) {

                      return 1
                  }
                },
                computed:{
                  checkAll:{
                      get:function () {
                          return this.checkCount ==this.dataList.length;
                      },
                      set:function (value) {
                          this.dataList.forEach(function (el) {
                              el.checked=value
                          });
                          return value;
                      }
                  },
                    checkCount:{
                      get:function () {
                          var i=0;
                          this.dataList.forEach(function (el) {
                              if(el.checked==true){
                                  i++;
                              }
                          });
                          return i;
                      }
                    }
                },
                methods: {
                    /*reset*/
                    reset: function (callback) {
                        var tempData = JSON.parse(JSON.stringify(handle.vmData));
                        for (var k in tempData) {
                            this[k] = tempData[k];
                        }
                        this.$nextTick(function () {
                            callback();
                        })
                    },
                    initEvt: function () {

                    }
                }
            })
        }

    };
    return page;
});
