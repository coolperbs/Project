<div class="w-p-home">
	<div class="cont">
		<div class="sub">
			<a href="#index/jifu/ndetail2:id=1" class="mod">
				<div class="big title">社区简介 · Introduction</div>
				<div class="intro J_IntroCont">

				</div>
				<script class="J_IntroTemp" type="text/html">
					<div class="pic">
						<img src="jifu/src/jifu/pages/home/images/home.jpeg?t=2"/>
					</div>
					<div class="text">
						<div class="ellipsis-2">
						吉福社区隶属四川省成都市武侯区晋阳街道，所辖面积0.6平方公里，共有5条街道，辖区范围包括：晋吉北路2号至132号、晋吉南路、吉福南路、武侯大道双楠段375号至389号、武阳大道一段252号至288号。</div>
					</div>					
				</script>
			</a>

			<div class="mod">
				<div class="title">信息公开 · Info</div>
				<div class="info">
					<div class="info-mod">
						<div class="head">
							<div class="pic" style="background : url(jifu/src/jifu/pages/home/images/xiaobin.jpeg) 50% 50%  no-repeat #f0f0f0; background-size : contain;">
							</div>
							<div class="userinfo">
								<div class="name">肖冰</div>
								<div class="honor">党委书记</div>
							</div>
						</div>
						<div class="record ellipsis-6">
							<div>
							负责社区党委全面工作。分管社区党的建设社区人事、纪检、统战、综治、信访工作。
							</div>
						</div>
						<div class="phone">电话: 87428938</div>
					</div>

					<div class="info-mod">
						<div class="head">
							<div class="pic" style="background : url(jifu/src/jifu/pages/home/images/lichaoyang.jpg) 50% 50%  no-repeat #f0f0f0; background-size : contain;">
							</div>
							<div class="userinfo">
								<div class="name">李朝阳</div>
								<div class="honor">居委会主任</div>
							</div>
						</div>
						<div class="record ellipsis-7">
							<div>
							协助社区书记、分管社区居委会工作，工会、团委、妇联、公共服务资金管理及使用。社区精神文明建设、居民自治、消防安全、残疾人、城市管理、业主委员会监督指导，督导网格综合服务工作。
							</div>
						</div>
						<div class="phone">电话: 87428938</div>
					</div>
				</div>
			</div>
		</div>
		<div class="main J_HomeCont">
		</div>
		<script type="text/html" class="J_HomeTemp">
			<div class="big m-title">新闻 · News</div>
			<% if (news[0]) { %>			
			<a href="#index/jifu/ndetail2:id=<%= news[0].id%>" class="news">
				<div class="pic"><img src="<%= news[0].adImgUrl%>"/></div>
				<div class="n-cont">
					<div class="title ellipsis-1"><%= news[0].name%></div>
					<div class="sub-title ellipsis-1"><%= date(news[0].created, true )%></div>
				</div>
			</a>
			<% } %>
			<div class="news-list">
				<% for ( var i = 1; i < 4; ++i ) { %>
					<% if ( news[i] ){ %>
						<a href="#index/jifu/ndetail2:id=<%= news[i].id%>" class="small news">
							<div class="pic" style="background-image:url(<%= news[i].adImgUrl%>); background-size:cover; background-position : center center;"></div>
							<div class="n-cont">
								<div class="title ellipsis-2"><%= news[i].name%></div>
								<div class="sub-title ellipsis-1"><%= date( news[i].created, true )%></div>
							</div>
						</a>
					<% } %>
				<% } %>
			</div>
		</script>





		<div class="menu">
			<div class="big title">菜单 · Menu</div>
			<div class="list">
				<a href="#index/jifu/news:type=1&subType=2" class="tab">
					<div class="icon">
						<img src="jifu/src/jifu/pages/home/images/1.png"/>
					</div>
					<div class="text">
						党员模范带动
						<div class="en">Exemplary party members</div>
					</div>
				</a>
				<a href="#index/jifu/news:type=3" class="tab">
					<div class="icon">
						<img src="jifu/src/jifu/pages/home/images/2.png"/>
					</div>
					<div class="text">
						民族同心推动
						<div class="en">National concentric</div>
					</div>
				</a>
				<a href="#index/jifu/news:type=2" class="tab">
					<div class="icon">
						<img src="jifu/src/jifu/pages/home/images/4.png"/>
					</div>
					<div class="text">
						区域多方联动
						<div class="en">Regional linkage</div>
					</div>
				</a>
				<a href="#index/jifu/news:type=4" class="tab">
					<div class="icon">
						<img src="jifu/src/jifu/pages/home/images/3.png"/>
					</div>
					<div class="text">
						三社齐力互动
						<div class="en">Organizational interaction</div>
					</div>
				</a>
			</div>			
		</div>
	</div>
</div>
