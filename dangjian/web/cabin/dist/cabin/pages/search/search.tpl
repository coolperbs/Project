<div class="cabin-page-search content-container"><div class="container-fixed"><div class="bread"><div class="bread-back"></div><div class="bread-content"><ul><li><a>sdfdsa</a></li><li class="active"><a>新增规则</a></li></ul></div><button v-if="editType!='detail'" class="btn btn-primary" @click.self="saveEvt">提交</button></div></div><div class="container-scroll"><div class="stage"><div class="stage-title flag">门店／围栏时效查询</div><div class="search-content form-horizontal clearfix"><div class="form-horizontal clearfix"><div class="cabin-group pull-left"><label class="control-label">规则名称</label><input type="text" class="form-control J_rulename" placeholder="请输入规则名称"></div><div class="cabin-group pull-left"><label class="control-label">规则ID</label><input type="text" class="form-control J_ruleId" placeholder="请输入规则ID"></div><div class="cabin-group pull-left"><label class="control-label">创建人</label><input type="text" class="form-control" placeholder="请输入创建人姓名"></div><div class="cabin-group pull-left"><label class="control-label">规则状态</label><input type="text" class="form-control" placeholder="请输入规则状态"></div><div class="cabin-group pull-left"><label class="control-label">规则类型</label><input type="text" class="form-control" placeholder="请输入规则类型"></div><div class="cabin-group pull-left"><label class="control-label">适用业态</label><input type="text" class="form-control" placeholder="请输入适用业态"></div><div class="cabin-group pull-left"><label class="control-label">规则时间</label><input type="text" class="form-control icondate" placeholder="请选选择规则时间"></div></div></div><hr><div class="stage-search right"><button class="btn btn-outline">查询</button></div></div><div class="stage overhidden"><div class="stage-title flag">时效规则列表 <button class="btn btn-primary btn-icon show" data-toggle="modal" data-target="#myModal"><span class="cabin-icon check"></span>显示modal框</button></div><table class="cabinTable table table-hover"><thead><tr><th>规则id</th><th>规则类型</th><th>规则名称</th><th>适用业态</th><th>配送方式</th><th class="sort sort-time">生效时间<div class="sortbox"><span class="up"></span> <span class="down"></span></div></th><th>创建人</th><th class="sort sort-state">是否生效<div class="sortbox"><span class="up"></span> <span class="down"></span></div></th><th>操作</th></tr></thead><tbody><tr><td>内容</td><td>内容</td><td>内容</td><td>内容</td><td>内容</td><td>内容</td><td>内容</td><td><span class="tags blue">是</span> <span class="tags">否</span></td><td class="ctrl"><span class="table-btn event">查看</span> <span class="table-btn">停用</span></td></tr></tbody></table><div id="page"></div></div><div class="modal fade" id="myModal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document" style="width:60%"><div class="modal-content"><div class="modal-header clearfix"><div class="stage-title flag pull-left"><span>选择时效规则</span></div><div class="stage-title pull-right"><span class="cabin-big-icon close" data-dismiss="modal" aria-label="Close"></span></div></div><div class="modal-body" style="padding:0"><div><input type="text" class="form-control" style="color:#333" placeholder="搜索" v-model="filter"></div><div style="overflow-y:scroll;width:100%;min-height:400px"><table class="cabinTable table table-hover"><colgroup><col style="width:6%"><col style="width:8%"><col style="width:10%"><col style="width:26%"><col style="width:10%"><col style="width:18%"><col style="width:10%"><col style="width:12%"></colgroup><thead><tr><th></th><th>规则ID</th><th>规则类型</th><th>规则名称</th><th>适用业态</th><th>配送方式</th><th>生效时间</th><th>规则状态</th><th>创建人</th></tr></thead><tbody><tr><td><div class="checkbox" style="height:20px;margin:0"><input type="checkbox" id="checkbox"><label for="checkbox"></label></div></td><td>111</td><td>111</td><td>111</td><td>111</td><td>111</td><td>111</td><td>111</td><td>111</td></tr></tbody></table></div></div><div class="modal-footer clearfix" style="padding-left:20px"><div class="checkbox pull-left"><input type="checkbox" id="allCheckbox"><label for="allCheckbox">全选</label></div><button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">保存</button></div></div></div></div><ul class="nav nav-tabs" role="tablist" id="myTab"><li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">标签1</a></li><li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">标签2</a></li></ul><div class="tab-content"><div role="tabpanel" class="tab-pane active" id="home"><div class="stage"><div class="stage-title flag">门店／围栏时效查询1</div></div></div><div role="tabpanel" class="tab-pane" id="profile"><div class="stage"><div class="stage-title flag">门店／围栏时效查询2</div></div></div></div><pre><code>
            &lt;!--页面最外层 必须添加 content-container 类-->
&lt;div class="cabin-page-search content-container">
    &lt;!--固定内容 块使用 container-fixed-->
    &lt;div class="container-fixed">
        &lt;!--面包屑-->
        &lt;div class="bread">
            &lt;div class="bread-back">&lt;/div>
            &lt;div class="bread-content">
                &lt;ul>
                    &lt;li>&lt;a>sdfdsa&lt;/a>&lt;/li>
                    &lt;li class="active">&lt;a>新增规则&lt;/a>&lt;/li>
                &lt;/ul>
            &lt;/div>
            &lt;button v-if="editType!='detail'" class="btn btn-primary" @click.self="saveEvt">提交&lt;/button>
        &lt;/div>
    &lt;/div>
    &lt;!--滚动内容 需要添加 container-scroll 类-->
    &lt;div class="container-scroll">
        &lt;!--页面分块类 stage-->
        &lt;div class="stage">
            &lt;div class="stage-title flag">
                门店／围栏时效查询
            &lt;/div>
            &lt;!--搜索条件-->
            &lt;div class="search-content form-horizontal clearfix">
                &lt;div class="form-horizontal clearfix">
                    &lt;div class="cabin-group pull-left">
                        &lt;label class="control-label">规则名称&lt;/label>
                        &lt;input type="text" class="form-control J_rulename" placeholder="请输入规则名称">
                    &lt;/div>
                    &lt;div class="cabin-group pull-left">
                        &lt;label class="control-label">规则ID&lt;/label>
                        &lt;input type="text" class="form-control J_ruleId" placeholder="请输入规则ID">
                    &lt;/div>
                    &lt;div class="cabin-group pull-left">
                        &lt;label class="control-label">创建人&lt;/label>
                        &lt;input type="text" class="form-control" placeholder="请输入创建人姓名">
                    &lt;/div>
                    &lt;div class="cabin-group pull-left">
                        &lt;label class="control-label">规则状态&lt;/label>
                        &lt;input type="text" class="form-control" placeholder="请输入规则状态">
                    &lt;/div>
                    &lt;div class="cabin-group pull-left">
                        &lt;label class=" control-label">规则类型&lt;/label>
                        &lt;input type="text" class="form-control" placeholder="请输入规则类型">
                    &lt;/div>
                    &lt;div class="cabin-group pull-left">
                        &lt;label class=" control-label">适用业态&lt;/label>
                        &lt;input type="text" class="form-control" placeholder="请输入适用业态">
                    &lt;/div>
                    &lt;div class="cabin-group pull-left">
                        &lt;label class=" control-label">规则时间&lt;/label>
                        &lt;input type="text" class="form-control icondate" placeholder="请选选择规则时间">
                    &lt;/div>
                &lt;/div>
            &lt;/div>
            &lt;hr/>
            &lt;div class="stage-search right">
                &lt;button class="btn btn-outline">查询&lt;/button>
            &lt;/div>
        &lt;/div>
        &lt;!--当stage 最后是分页块的时候需要添加 overhidden 类-->
        &lt;div class="stage overhidden">
            &lt;!--模块title-->
            &lt;div class="stage-title flag">
                时效规则列表
                &lt;button class="btn btn-primary btn-icon" data-toggle="modal" data-target="#myModal">
                    &lt;span class="cabin-icon check">&lt;/span>显示modal框
                &lt;/button>
            &lt;/div>
            &lt;!--表格效果-->
            &lt;table class="cabinTable table table-hover">
                &lt;thead>
                &lt;tr>
                    &lt;th>规则id&lt;/th>
                    &lt;th>规则类型&lt;/th>
                    &lt;th>规则名称&lt;/th>
                    &lt;th>适用业态&lt;/th>
                    &lt;th>配送方式&lt;/th>
                    &lt;!--table 带上下角标-->
                    &lt;th class="sort sort-time">
                        生效时间
                        &lt;div class="sortbox">
                            &lt;span class="up">&lt;/span>
                            &lt;span class="down">&lt;/span>
                        &lt;/div>
                    &lt;/th>
                    &lt;th>创建人&lt;/th>
                    &lt;th class="sort sort-state">
                        是否生效
                        &lt;div class="sortbox">
                            &lt;span class="up">&lt;/span>
                            &lt;span class="down">&lt;/span>
                        &lt;/div>
                    &lt;/th>
                    &lt;th>操作&lt;/th>
                &lt;/tr>
                &lt;/thead>
                &lt;tbody>
                &lt;tr>
                    &lt;td>内容&lt;/td>
                    &lt;td>内容&lt;/td>
                    &lt;td>内容&lt;/td>
                    &lt;td>内容&lt;/td>
                    &lt;td>内容&lt;/td>
                    &lt;td>内容&lt;/td>
                    &lt;td>内容&lt;/td>
                    &lt;td>
                        &lt;span class="tags blue">是&lt;/span>
                        &lt;span class="tags">否&lt;/span>
                    &lt;/td>
                    &lt;td class="ctrl">
                        &lt;span class="table-btn">查看&lt;/span>
                        &lt;span class="table-btn">停用&lt;/span>
                    &lt;/td>
                &lt;/tr>
                &lt;/tbody>
            &lt;/table>
            &lt;!--分页容器-->
            &lt;div id="page">&lt;/div>
        &lt;/div>
        &lt;!--模态框使用案例-->
        &lt;div class="modal fade" id="myModal" tabindex="-1" role="dialog">
            &lt;div class="modal-dialog" role="document" style="width:60%;">
                &lt;div class="modal-content">
                    &lt;div class="modal-header clearfix">
                        &lt;div class="stage-title flag pull-left">
                            &lt;span>选择时效规则&lt;/span>
                        &lt;/div>
                        &lt;div class="stage-title pull-right">
                            &lt;span class="cabin-big-icon close" data-dismiss="modal" aria-label="Close">&lt;/span>
                        &lt;/div>
                    &lt;/div>
                    &lt;div class="modal-body" style="padding:0;">
                        &lt;div>
                            &lt;input type="text" class="form-control" style="color: #333333" placeholder="搜索"
                                   v-model="filter">
                        &lt;/div>
                        &lt;div style="overflow-y: scroll;width: 100%;min-height: 400px;">
                            &lt;table class="cabinTable table table-hover">
                                &lt;colgroup>
                                    &lt;col style="width:6%;"/>
                                    &lt;col style="width:8%;"/>
                                    &lt;col style="width:10%;"/>
                                    &lt;col style="width:26%;"/>
                                    &lt;col style="width:10%;"/>
                                    &lt;col style="width:18%;"/>
                                    &lt;col style="width:10%;"/>
                                    &lt;col style="width:12%;"/>
                                &lt;/colgroup>
                                &lt;thead>
                                &lt;tr>
                                    &lt;th>&lt;/th>
                                    &lt;th>规则ID&lt;/th>
                                    &lt;th>规则类型&lt;/th>
                                    &lt;th>规则名称&lt;/th>
                                    &lt;th>适用业态&lt;/th>
                                    &lt;th>配送方式&lt;/th>
                                    &lt;th>生效时间&lt;/th>
                                    &lt;th>规则状态&lt;/th>
                                    &lt;th>创建人&lt;/th>
                                &lt;/tr>
                                &lt;/thead>
                                &lt;tbody>
                                &lt;tr>
                                    &lt;td>
                                        &lt;div class="checkbox" style="height: 20px;margin: 0;">
                                            &lt;input type="checkbox" id="checkbox">
                                            &lt;label for="checkbox">&lt;/label>
                                        &lt;/div>
                                    &lt;/td>
                                    &lt;td>111&lt;/td>
                                    &lt;td>111&lt;/td>
                                    &lt;td>111&lt;/td>
                                    &lt;td>111&lt;/td>
                                    &lt;td>111&lt;/td>
                                    &lt;td>111&lt;/td>
                                    &lt;td>111&lt;/td>
                                    &lt;td>111&lt;/td>
                                &lt;/tr>
                                &lt;/tbody>
                            &lt;/table>
                        &lt;/div>
                    &lt;/div>
                    &lt;div class="modal-footer clearfix" style="padding-left:20px;">
                        &lt;div class="checkbox pull-left">
                            &lt;input type="checkbox" id="allCheckbox">
                            &lt;label for="allCheckbox">全选&lt;/label>
                        &lt;/div>
                        &lt;button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">保存
                        &lt;/button>
                    &lt;/div>
                &lt;/div>
            &lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div>
    </code></pre></div></div>