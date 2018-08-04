
<div class="cabin-page-nextPage content-container">
    <div class="container-scroll">
        <div class="stage">
            <div id="mypage">

            </div>
        </div>
        <!--示例代码-->
        <pre><code>
            &lt;!--html 模板-->
            &lt;div id="mypage">&lt;/div>

            $('#mypage').NextPage({
                pageSize: 30, //每页大小,
                currentPage: 1, //当前页
                totalCount: 0, //总条数
                pageRange: 9, //间隔多少个
                select: [30, 60, 100], //下拉选项
                showTotal:false,//显示总条数 boolean
                position: null, //位置 left right center
                callback: function (data) {}
            });
        </code></pre>
    </div>
</div>


