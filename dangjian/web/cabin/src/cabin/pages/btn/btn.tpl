<!--基础标签-->
<div class="pages-cabin-btn content-container">
    <!--滚动内容 需要添加 container-scroll 类-->
    <div class="container-scroll">
        <!--搜索框 stage-->
        <div class="stage">
            <div class="stage-title flag">
                搜索条件样式组
            </div>
            <!--搜索条件-->
            <div class="cabin-search-box clearfix">
                <form class="form-inline">
                    <div class="form-group">
                        <label class="control-label">最好四个</label>
                        <input type="text" class="form-control" placeholder="Jane Doe">
                    </div>
                    <div class="form-group">
                        <label class="control-label">最好四个</label>
                        <input type="email" class="form-control" placeholder="jane.doe@example.com">
                    </div>
                    <div class="form-group">
                        <label class="control-label">最好四个</label>
                        <input type="text" class="form-control" placeholder="Jane Doe">
                    </div>
                    <div class="form-group">
                        <label class="control-label">最好四个</label>
                        <input type="text" class="form-control" placeholder="Jane Doe">
                    </div>
                    <div class="form-group cabin-date-range">
                        <label class="control-label">时间选择</label>
                        <input type="text" class="form-control icondate" placeholder="placeholder">
                        <label class="cabin-date-spin">-</label>
                        <input type="text" class="form-control icondate" placeholder="placeholder">
                    </div>
                </form>
            </div>
            <!--搜索条件结束-->
            <div style="padding: 20px">
                 <pre><code>
                &lt;div class="cabin-search-box clearfix">
                    &lt;form class="form-inline">
                    &lt;div class="form-group">
                        &lt;label class="control-label">最好四个</label>
                     &lt;input type="text" class="form-control" placeholder="Jane Doe">
                    &lt;/div>
                    &lt;div class="form-group">
                        &lt;label class="control-label">最好四个</label>
                     &lt;input type="email" class="form-control" placeholder="jane.doe@example.com">
                    &lt;/div>
                    &lt;div class="form-group">
                        &lt;label class="control-label">最好四个</label>
                     &lt;input type="text" class="form-control" placeholder="Jane Doe">
                    &lt;/div>
                    &lt;div class="form-group">
                        &lt;label class="control-label">最好四个</label>
                     &lt;input type="text" class="form-control" placeholder="Jane Doe">
                    &lt;/div>
                    &lt;div class="form-group cabin-date-range">
                        &lt;label class="control-label">时间选择</label>
                     &lt;input type="text" class="form-control icondate" placeholder="placeholder">
                        &lt;label class="cabin-date-spin">-</label>
                     &lt;input type="text" class="form-control icondate" placeholder="placeholder">
                    &lt;/div>
                &lt;/form>
                &lt;/div>
            </code></pre>
            </div>
        </div>
        <!--搜索框 stage 结束-->
        <div class="stage">
            <div class="stage-title flag">
                按钮
            </div>
            <div style="padding: 20px">
                <input type="button" class="btn btn-default" value="确认"/>
                <button class="btn btn-default">
                    按钮2
                    <span class="cabin-icon arrow-right"></span>
                </button>
                <button class="btn btn-outline">查询</button>
                <button class="btn btn-default">
                    <span class="cabin-icon arrow-left"></span> 按钮3
                </button>
                <button class="btn btn-primary">
                    <span class="cabin-icon add"></span> 按钮4
                </button>
            </div>
            <div style="padding: 20px">
                 <pre><code>
                     &lt;input type="button" class="btn btn-default" value="确认"/>
                     &lt;button class="btn btn-default">
                         按钮2
                         &lt;span class="cabin-icon arrow-right"></span>
                     &lt;/button>
                     &lt;button class="btn btn-outline">查询</button>
                     &lt;button class="btn btn-default">
                         &lt;span class="cabin-icon arrow-left"></span> 按钮3
                     &lt;/button>
                     &lt;button class="btn btn-primary">
                         &lt;span class="cabin-icon add"></span> 按钮4
                     &lt;/button>

                </code></pre>
            </div>
        </div>
        <div class="stage">
            <div class="stage-title flag">
                文件上传按钮
            </div>
            <div style="padding: 20px">
                <a class="file btn btn-default">
                    点击上传文件1
                    <input type="file" name="">
                </a>
                <a class="file btn btn-primary">
                    点击上传文件2
                    <input type="file" name="">
                </a>
                <a class="file btn btn-outline">
                    点击上传文件3
                    <input type="file" name="">
                </a>
            </div>
            <div style="padding: 20px">
                 <pre><code>
                    &lt;a class="file btn btn-default">
                        点击上传文件1
                        &lt;input type="file" name="">
                    &lt;/a>
                    &lt;a class="file btn btn-primary">
                        点击上传文件2
                        &lt;input type="file" name="">
                    &lt;/a>
                    &lt;a class="file btn btn-outline">
                        点击上传文件3
                        &lt;input type="file" name="">
                    &lt;/a>
                </code></pre>
            </div>
        </div>
        <div class="stage">
            <div class="stage-title flag">
                其他功能按钮
            </div>
            <div style="padding: 20px">
                <div class="btn danger btn-default clearfix">
                    <div>
                        <span>商品数量</span>
                    </div>
                </div>
                <div class="btn circle-danger btn-default clearfix">
                    <div>
                        <span>商品数量</span>
                    </div>
                    <b class="icon"></b>
                </div>
                <div class="btn disabled-circle-danger btn-default clearfix">
                    <div>
                        <span>商品数量</span>
                    </div>
                    <b class="icon"></b>
                </div>
                <div class="btn btn-default" style="padding: 5px 36px;">
                    <span>规则类型</span>
                    <input type="text" class="form-control" style="width: auto;display: inline;margin-left: 5px;height: 28px;"
                           disabled>
                </div>
                <div class="btn btn-default circle-danger" style="padding: 5px 36px;">
                    <span style="display: inline;">规则类型</span>
                    <input type="text" class="form-control" style="width: auto;display: inline;margin-left: 5px;height: 28px;">
                    <b class="icon"></b>
                </div>
            </div>
            <div style="padding: 20px">
                 <pre><code>
                     &lt;div class="btn danger btn-default clearfix">
                         &lt;div>
                             &lt;span>商品数量&lt;/span>
                         &lt;/div>
                     &lt;/div>
                     &lt;div class="btn circle-danger btn-default clearfix">
                         &lt;div>
                             &lt;span>商品数量&lt;/span>
                         &lt;/div>
                         &lt;b class="icon">&lt;/b>
                     &lt;/div>
                     &lt;div class="btn disabled-circle-danger btn-default clearfix">
                         &lt;div>
                             &lt;span>商品数量&lt;/span>
                         &lt;/div>
                         &lt;b class="icon">&lt;/b>
                     &lt;/div>
                     &lt;div class="btn btn-default" style="padding: 5px 36px;">
                         &lt;span>规则类型&lt;/span>
                         &lt;input type="text" class="form-control" style="width: auto;display: inline;margin-left: 5px;height: 28px;"
                                disabled>
                     &lt;/div>
                     &lt;div class="btn btn-default circle-danger" style="padding: 5px 36px;">
                         &lt;span style="display: inline;">规则类型&lt;/span>
                         &lt;input type="text" class="form-control" style="width: auto;display: inline;margin-left: 5px;height: 28px;">
                         &lt;b class="icon">&lt;/b>
                     &lt;/div>
                </code></pre>
            </div>
        </div>
        <div class="stage">
            <div class="stage-title flag">
                tags标签
            </div>
            <div style="padding: 20px">
                <div class="tags">23423</div>
                <div class="tags blue">23423</div>
                <div class="tags warning">23423</div>
            </div>
            <div style="padding: 20px">
                 <pre><code>
                     &lt;div class="tags">23423&lt;/div>
                     &lt;div class="tags blue">23423&lt;/div>
                     &lt;div class="tags warning">23423&lt;/div>
                </code></pre>
            </div>
        </div>
        <div class="stage">
            <div class="stage-title flag">
                表格
            </div>
            <div style="padding: 20px">
                <!--表格盒子-->
                <div class="cabinTable-box">
                    <!--左右滑动表格-->
                    <div class="table-responsive">
                        <!--表格-->
                        <table class="cabinTable table table-hover table-bordered">
                            <thead class="cabin-wumart-thead">
                            <tr>
                                <th>表格列1</th>
                                <th>表格列1</th>
                                <th>表格列1</th>
                                <th>表格列1</th>
                                <th>表格列1</th>
                                <th>表格列1</th>
                                <th>表格列1</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style="padding: 20px">
                 <pre><code>
                     &lt;!--表格盒子-->
                     &lt;div class="cabinTable-box">
                         &lt;!--左右滑动表格-->
                         &lt;div class="table-responsive">
                             &lt;!--表格 物美表格才有 cabin-wumart-thead -->
                             &lt;table class="cabinTable table table-hover table-bordered">
                                 &lt;thead class="cabin-wumart-thead">
                                 &lt;tr>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                 &lt;/tr>
                                 &lt;/thead>
                                 &lt;tbody>
                                 &lt;tr>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                 &lt;/tr>
                                 &lt;/tbody>
                             &lt;/table>
                         &lt;/div>
                </code></pre>
            </div>
            <div style="padding: 20px">
                <!--表格盒子-->
                <div class="cabinTable-box">
                    <!--左右滑动表格-->
                    <div class="table-responsive">
                        <!--表格-->
                        <table class="cabinTable table table-hover">
                            <thead>
                            <tr>
                                <th>表格列1</th>
                                <th>表格列1</th>
                                <th>表格列1</th>
                                <th>表格列1</th>
                                <th>表格列1</th>
                                <th>表格列1</th>
                                <th>表格列1</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                                <td><div>表格内容</div></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style="padding: 20px">
                 <pre><code>
                     &lt;!--表格盒子-->
                     &lt;div class="cabinTable-box">
                         &lt;!--左右滑动表格-->
                         &lt;div class="table-responsive">
                             &lt;!--表格-->
                             &lt;table class="cabinTable table table-hover ">
                                 &lt;thead >
                                 &lt;tr>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                     &lt;th>表格列1&lt;/th>
                                 &lt;/tr>
                                 &lt;/thead>
                                 &lt;tbody>
                                 &lt;tr>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                     &lt;td>&lt;div>表格内容&lt;/div>&lt;/td>
                                 &lt;/tr>
                                 &lt;/tbody>
                             &lt;/table>
                         &lt;/div>
                </code></pre>
            </div>
        </div>
        <div class="stage">
            <div class="stage-title flag">
                面包屑（可带返回按钮和功能按钮）
            </div>
            <div style="padding: 20px">
                <!--面包屑-->
                <div class="bread">
                    <!--面包屑返回按钮-->
                    <div class="bread-back"></div>
                    <!--面包屑返回按钮结束-->
                    <div class="bread-content">
                        <ul>
                            <li><a>的撒发</a></li>
                            <li class="active"><a>的撒发</a></li>
                            <li><a>的撒发</a></li>
                        </ul>
                    </div>
                    <!--面包屑功能按钮-->
                    <button class="btn btn-primary">提交</button>
                    <!--面包屑功能按钮结束-->
                </div>
                <!--面包屑结束-->
            </div>
            <div style="padding: 20px">
                 <pre><code>
                     &lt;!--面包屑-->
                     &lt;div class="bread">
                         &lt;!--面包屑返回按钮-->
                         &lt;div class="bread-back">&lt;/div>
                         &lt;!--面包屑返回按钮结束-->
                         &lt;div class="bread-content">
                             &lt;ul>
                                 &lt;li>&lt;a>的撒发&lt;/a>&lt;/li>
                                 &lt;li class="active">&lt;a>的撒发&lt;/a>&lt;/li>
                                 &lt;li>&lt;a>的撒发&lt;/a>&lt;/li>
                             &lt;/ul>
                         &lt;/div>
                         &lt;!--面包屑功能按钮-->
                         &lt;button class="btn btn-primary">提交&lt;/button>
                         &lt;!--面包屑功能按钮结束-->
                     &lt;/div>
                </code></pre>
            </div>
        </div>
        <div class="stage">
            <div class="stage-title flag">
               模块带标题(可带颜色小标)
            </div>
            <div style="padding: 20px">
                 <pre><code>
                     &lt;div class="stage">
                            &lt;!-- 不需要小标 去掉flag-->
                         &lt;div class="stage-title flag">
                             模块带标题
                         &lt;/div>
                     &lt;/div>
                </code></pre>
            </div>
        </div>
        <div class="stage">
            <div class="stage-title flag">
                tab标签(注意 tab标签不宜过多)
            </div>
            <div style="padding: 20px">
                <!--tab导航-->
                <ul class="nav nav-tabs" role="tablist" id="myTab">
                    <li role="presentation" class="active"><a  href="#yourtab1" aria-controls="yourtab1" role="tab" data-toggle="tab">tab标签1</a></li>
                    <li role="presentation"><a  href="#yourtab2" aria-controls="yourtab2" role="tab" data-toggle="tab">tab标签2</a></li>
                </ul>
                <!--tab导航结束-->
                <!--搜索结果stage-->
                <div class="stage">
                    <!-- tab导航内容-->
                    <div class="tab-content">
                        <!-- tab导航内容分块-->
                        <div role="tabpanel" class="tab-pane active" id="yourtab1">
                            <div class="stage">
                               <div>标签1内容</div>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="yourtab2">
                            <div class="stage">
                                <div>
                                    标签2 内容
                                </div>
                            </div>
                        </div>
                        <!-- tab导航内容分块结束-->
                    </div>
                    <!-- tab导航内容结束-->
                </div>
            </div>
            <div style="padding: 20px">
                 <pre><code>
                     &lt;!--tab导航-->
&lt;ul class="nav nav-tabs" role="tablist" id="myTab">
    &lt;li role="presentation" class="active">&lt;a  href="#yourtab1" aria-controls="yourtab1" role="tab" data-toggle="tab">tab标签1&lt;/a>&lt;/li>
    &lt;li role="presentation">&lt;a  href="#yourtab2" aria-controls="yourtab2" role="tab" data-toggle="tab">tab标签2&lt;/a>&lt;/li>
&lt;/ul>
&lt;!--tab导航结束-->
&lt;!--搜索结果stage-->
&lt;div class="stage">
    &lt;!-- tab导航内容-->
    &lt;div class="tab-content">
        &lt;!-- tab导航内容分块-->
        &lt;div role="tabpanel" class="tab-pane active" id="yourtab1">
            &lt;div class="stage">
                &lt;div>标签1内容&lt;/div>
            &lt;/div>
        &lt;/div>
        &lt;div role="tabpanel" class="tab-pane" id="yourtab2">
            &lt;div class="stage">
                &lt;div>
                    标签2 内容
                &lt;/div>
            &lt;/div>
        &lt;/div>
        &lt;!-- tab导航内容分块结束-->
    &lt;/div>
    &lt;!-- tab导航内容结束-->
&lt;/div>

/*需要在入口 执行*/
                     $('.nav-tabs a').click(function (e) {
                //!!!e.preventDefault(); 必须添加这个
                e.preventDefault();
                $(this).tab('show');
            });



                </code></pre>
            </div>
        </div>

    </div>
</div>
