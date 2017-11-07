<div class="cabin-page-tabchange content-container"><div class="container-scroll"><ul class="nav nav-tabs" role="tablist" id="myTab"><li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">标签1</a></li><li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">标签2</a></li></ul><div class="tab-content"><div role="tabpanel" class="tab-pane active" id="home"><div class="stage"><div class="stage-title flag">门店／围栏时效查询1</div></div></div><div role="tabpanel" class="tab-pane" id="profile"><div class="stage"><div class="stage-title flag">门店／围栏时效查询2</div></div></div></div><pre><code>

            &lt;!--页面最外层 必须添加 content-container 类-->
&lt;div class="cabin-page-tabchange content-container">
    &lt;!--滚动内容 需要添加 container-scroll 类-->
    &lt;div class="container-scroll">
        &lt;!--tab导航-->
        &lt;ul class="nav nav-tabs" role="tablist" id="myTab">
            &lt;li role="presentation" class="active">&lt;a href="#home" aria-controls="home" role="tab" data-toggle="tab">标签1&lt;/a>&lt;/li>
            &lt;li role="presentation">&lt;a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">标签2&lt;/a>&lt;/li>
        &lt;/ul>
        &lt;!-- Tab panes -->
        &lt;div class="tab-content">
            &lt;div role="tabpanel" class="tab-pane active" id="home">
                &lt;div class="stage">
                    &lt;div class="stage-title flag">
                        门店／围栏时效查询1
                    &lt;/div>
                &lt;/div>
            &lt;/div>
            &lt;div role="tabpanel" class="tab-pane" id="profile">
                &lt;div class="stage">
                    &lt;div class="stage-title flag">
                        门店／围栏时效查询2
                    &lt;/div>
                &lt;/div>
            &lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div>


             $('.nav-tabs a').click(function (e) {
                //!!!e.preventDefault(); 必须添加这个
                e.preventDefault();
                $(this).tab('show');
            });
            // 通过名称选取标签页
            $('#myTab a[href="#profile"]').tab('show')

            // 选取第一个标签页
            $('#myTab a:first').tab('show')

             // 选取最后一个标签页
             $('#myTab a:last').tab('show')

            // 选取第三个标签页（从 0 开始索引）
            $('#myTab li:eq(2) a').tab('show')
        </code></pre></div></div>