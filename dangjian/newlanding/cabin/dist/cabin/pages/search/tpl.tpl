
&lt;!--页面最外层 必须添加 content-container 类-->
&lt;div class="cabin-page-vuepage content-container">
    &lt;!--滚动内容 需要添加 container-scroll 类-->
    &lt;div class="container-scroll" id="app">
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
                        &lt;input type="text" class="form-control icondate" v-timepicker:range:result.date="dateOpt" v-model="result.date"/>
                    &lt;/div>
                    &lt;div class="cabin-group pull-left">
                        &lt;label class="control-label">下拉&lt;/label>
                        &lt;select class="form-control" v-timepicker:chosen:result.chose="chosenOpt" v-model="result.chose" data-placeholder="请选择">
                            &lt;option value="1">1&lt;/option>
                            &lt;option value="2">2&lt;/option>
                            &lt;option value="3">3&lt;/option>
                        &lt;/select>
                    &lt;/div>
                &lt;/div>
            &lt;/div>
            &lt;hr/>
            &lt;div class="stage-search right">
                &lt;button class="btn btn-outline">查询&lt;/button>
            &lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div>