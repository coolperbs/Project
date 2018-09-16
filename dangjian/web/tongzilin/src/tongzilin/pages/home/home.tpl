<div class="w-p-home">
	<div class="cont">
		<div class="sub">
			<a href="#index/tongzilin/ndetail2:id=1" class="mod">
				<div class="big title">社区简介</div>
				<div class="intro J_IntroCont">

				</div>
				<script class="J_IntroTemp" type="text/html">
					<div class="pic">
						<img src="<%= shequ.adImgUrl%>"/>
					</div>
					<div class="text">
						<div class="ellipsis-2">
						<%= shequ.description%></div>
					</div>					
				</script>
			</a>

			<div class="mod">
				<div class="title">信息公开</div>
				<div class="info">
					<div class="info-mod">
						<div class="head">
							<div class="pic" style="background : url(tongzilin/src/tongzilin/pages/home/images/lihanrong.jpg) 50% 50%  no-repeat #f0f0f0; background-size : contain;">
							</div>
							<div class="userinfo">
								<div class="name">李含荣</div>
								<div class="honor">党委书记</div>
							</div>
						</div>
						<div class="record ellipsis-6">
							<div>
							主持社区党委全面工作。分管社区党建、党务、人事、宣传、统战、工会、团委、民政、残协、综治、司法、流口及一标三实、武装以及社会治理工作。
							</div>
						</div>
						<div class="phone">电话: 87432226</div>
					</div>

					<div class="info-mod">
						<div class="head">
							<div class="pic" style="background : url(tongzilin/src/tongzilin/pages/home/images/huangfang.jpg) 50% 50%  no-repeat #f0f0f0; background-size : contain;">
							</div>
							<div class="userinfo">
								<div class="name">黄 芳</div>
								<div class="honor">党委副书记</div>
							</div>
						</div>
						<div class="record ellipsis-6">
							<div>
							协助社区党委工作，主持社区居委会全面工作。分管社区网格化运行及管理、妇联、计生、劳动保障、文体科教、社区财务、居民自治、目标管理、消防安全工作。
							</div>
						</div>
						<div class="phone">电话: 87432226</div>
					</div>
				</div>
			</div>
		</div>
		<div class="main J_HomeCont">
		</div>
		<script type="text/html" class="J_HomeTemp">
			<div class="big m-title">新闻</div>
			<a href="#index/tongzilin/ndetail2:id=<%= news[0].id%>" class="news">
				<div class="pic"><img src="<%= news[0].adImgUrl%>"/></div>
				<div class="n-cont">
					<div class="title ellipsis-1"><%= news[0].name%></div>
					<div class="sub-title ellipsis-1"><%= date(news[0].created, true )%></div>
				</div>
			</a>
			<div class="news-list">
				<% for ( var i = 1; i < 4; ++i ) { %>
					<a href="#index/tongzilin/ndetail2:id=<%= news[i].id%>" class="small news">
						<div class="pic" style="background-image:url(<%= news[i].adImgUrl%>); background-size:cover; background-position : center center;"></div>
						<div class="n-cont">
							<div class="title ellipsis-2"><%= news[i].name%></div>
							<div class="sub-title ellipsis-1"><%= date( news[i].created, true )%></div>
						</div>
					</a>
				<% } %>
			</div>
		</script>





		<div class="menu">
			<div class="big title">菜单</div>
			<div class="list">
				<a href="#index/tongzilin/sub:tab=list" class="tab">
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon1-white.png"/>
					</div>
					<div class="text">
                        <div style="margin-bottom: 10px">双找</div>
                        <div>双报到</div>
                    </div>
				</a>
				<!--<a href="#index/tongzilin/news:type=3" class="tab" style="background-color : rgba(68, 42, 69, 0.5);">-->
					<!--<div class="icon">-->
						<!--<img src="tongzilin/src/tongzilin/pages/home/images/icon10.png"/>-->
					<!--</div>-->
					<!--<div class="text">廉洁晋阳</div>-->
				<!--</a>-->
				<a href="#index/tongzilin/ndetail2:id=2" class="tab red" >
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon2.png"/>
					</div>
					<div class="text">党组织信息</div>
				</a>
				<a href="#index/tongzilin/analysis" class="tab" >
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon3.png"/>
					</div>
					<div class="text">党员信息</div>
				</a>
				<a href="#index/tongzilin/news:type=1" class="tab" >
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon4.png"/>
					</div>
					<div class="text">三会一课</div>
				</a>
				<a href="#index/tongzilin/news:type=2" class="tab" >
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon5.png"/>
					</div>
					<div class="text">党员学习平台</div>
				</a>
				<div class="tab J_Bonus" >
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon6.png"/>
					</div>
					<div class="text">党员积分</div>
				</div>
				<a href="#index/tongzilin/oldpm" class="tab">
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon7.png"/>
					</div>
					<div class="text">老党员在行动</div>
				</a>
			</div>			
		</div>
	</div>
</div>