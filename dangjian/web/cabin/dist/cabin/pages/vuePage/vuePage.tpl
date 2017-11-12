<div class="cabin-page-vuepage content-container"><div class="container-scroll" id="app"><div class="stage"><div class="stage-title flag">门店／围栏时效查询</div><div class="search-content form-horizontal clearfix"><div class="form-horizontal clearfix"><div class="cabin-group pull-left"><label class="control-label">时间</label><input type="text" class="form-control icondate" v-timepicker:range:result.date="dateOpt" v-model="result.date"></div><div class="cabin-group pull-left"><label class="control-label">时间</label><input type="text" class="form-control icondate" v-timepicker:datepicker:result.date2="datepicker" v-model="result.date2"></div><div class="cabin-group pull-left"><label class="control-label">下拉</label><select class="form-control" v-timepicker:chosen:result.chose="chosenOpt" v-model="result.chose" data-placeholder="请选择"><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></div><div class="cabin-group pull-left"><label class="control-label">输入项去掉头尾空格 使用 v-model.trim</label><input type="text" class="form-control" v-model.trim="valueB"></div></div></div><hr><div class="stage-search right"><button class="btn btn-outline">查询</button></div></div><div class="stage"><table class="cabinTable table table-hover"><thead><tr><th><div class="checkbox"><input type="checkbox" id="checkall" v-model="checkAll"><label for="checkall">全选</label></div></th><th>规则id</th></tr></thead><tbody><tr v-for="el,index in dataList"><td><div class="checkbox"><input type="checkbox" :id="'tablecheck'+index" v-model="el.checked"><label :for="'tablecheck'+index">el.id</label></div></td><td>{{el.id}}</td></tr></tbody></table></div><pre><code>
 define('cabin/pages/vuePage/vuePage', function (require, exports, module) {
    var handle, page;
    //这里必须引用这2个VUE的插件 VUE 可以在main里面全局引入 这里只是示例
    window.Vue = require('cabin/lib/vue/vue');
    //vue 局部指令
    var timepicker = require('cabin/widgets/datepicker/datepicker');
    page = Page({
        nodeClass: 'cabin-page-vuepage',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['cabin/pages/vuePage/vuePage.tpl'],
        show: function () {
            handle.jView = this.jView;

            handle.vue();
        },
        hide: function () {
        }
    });
    handle = {
        vm: null,
        vmData: {
            dateOpt: {
                startDate: '',
                endDate: '',
                singleDatePicker: true,
                format: 'YYYY-MM-DD HH:mm:ss', //控件中from和to 显示的日期格式
                cancelClass: "com-hide",
                "buttonClasses": "btn btn-sm ",
                "applyClass": "btn-primary",
                timePickerSeconds: true,
                autoUpdateInput: false,
                alwaysShowCalendars: true,
                //minDate: moment().subtract(0, 'days'),
                //maxDate: moment().subtract(0, 'days'), //最大时间
                separator: ' -- ',
                dateLimit: {
                    days: 180
                }, //起止时间的最大间隔
                showDropdowns: true,
                showWeekNumbers: false, //是否显示第几周
                timePicker: true, //是否显示小时和分钟
                timePickerIncrement: 1, //时间的增量，单位为分钟
                timePicker24Hour: true, //是否使用12小时制来显示时间
                timePicker12Hour: false,
                time: {
                    enabled: true
                },
                opens: 'right' //日期选择框的弹出位置
            },
            chosenOpt: {
                no_results_text: '没有找到',
                disable_search: true,
                search_contains: true,//关键字模糊搜索，设置为false，则只从开头开始匹配
                allow_single_deselect: true
            },
            result:{
                date:'',
                chose:''
            } ,
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
                mounted: function () {
                    this.initEvt();
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

        </code></pre><pre><code>


&lt;!--页面最外层 必须添加 content-container 类-->
&lt;div class="cabin-page-vuepage content-container">
    &lt;!--滚动内容 需要添加 container-scroll 类-->
    &lt;div class="container-scroll" >
        &lt;!--页面分块类 stage-->
        &lt;div class="stage">
            &lt;div class="stage-title flag">
                门店／围栏时效查询
            &lt;/div>
            &lt;!--搜索条件-->
            &lt;div class="search-content form-horizontal clearfix">
                &lt;div class="form-horizontal clearfix">
                    &lt;div class="cabin-group pull-left">
                        &lt;label class="control-label">时间&lt;/label>
                        &lt;input type="text" class="form-control icondate" v-timepicker:range:result.date="dateOpt"
                               v-model="result.date"/>
                    &lt;/div>
                    &lt;div class="cabin-group pull-left">
                        &lt;label class="control-label">下拉&lt;/label>
                        &lt;select class="form-control" v-timepicker:chosen:result.chose="chosenOpt" v-model="result.chose"
                                data-placeholder="请选择">
                            &lt;option value="1">1&lt;/option>
                            &lt;option value="2">2&lt;/option>
                            &lt;option value="3">3&lt;/option>
                        &lt;/select>
                    &lt;/div>
                    &lt;div class="cabin-group pull-left">
                        &lt;label class="control-label">输入项去掉头尾空格 使用 v-model.trim&lt;/label>
                        &lt;input type="text" class="form-control" v-model.trim="valueB"/>
                    &lt;/div>
                &lt;/div>
            &lt;/div>
            &lt;hr/>
            &lt;div class="stage-search right">
                &lt;button class="btn btn-outline">查询&lt;/button>
            &lt;/div>
        &lt;/div>
        &lt;!--表格全选反选-->
        &lt;div class="stage">
            &lt;table class="cabinTable table table-hover">
                &lt;thead>
                &lt;tr>
                    &lt;th>
                        &lt;div class="checkbox">
                            &lt;input type="checkbox" id="checkall" v-model="checkAll">
                            &lt;label for="checkall">全选&lt;/label>
                        &lt;/div>
                    &lt;/th>
                    &lt;th>规则id&lt;/th>
                &lt;/tr>
                &lt;/thead>
                &lt;tbody>
                &lt;tr>
                    &lt;td>
                        &lt;div class="checkbox">
                            &lt;input type="checkbox" :id="'tablecheck'+index" >
                            &lt;label :for="'tablecheck'+index">&lt;/label>
                        &lt;/div>
                    &lt;/td>
                    &lt;td>&lt;/td>
                &lt;/tr>
                &lt;/tbody>
            &lt;/table>
        &lt;/div>
    &lt;/div>
&lt;/div>
        </code></pre></div></div>