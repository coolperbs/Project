<div class="w-p-home">
	<div class="cont">
		<div class="sub">
			<a href="#index/tongzilin/ndetail2:id=91" class="mod">
				<div class="big title">社区简介 · Introduction</div>
				<div class="intro J_IntroCont">

				</div>
				<script class="J_IntroTemp" type="text/html">
					<div class="pic">
						<img src="tongzilin/src/tongzilin/pages/home/images/timg3.jpeg"/>
						<!--<img src="<%= shequ.adImgUrl%>"/>-->
					</div>
					<div class="text">
						<div class="ellipsis-2">
						桐梓林社区是四川省成都市武侯区火车南站街道下辖的一个行政社区，东起人民南路四段，西至新光路，南起桐梓林南路，北至二环路南三段，面积0.6平方公里；有常住人口13576人，暂住人口约3000人。</div>
					</div>					
				</script>
			</a>

			<div class="mod">
				<div class="title">邻里中心 · Neighborhood Center</div>
				<div class="info">
					<a href="#index/tongzilin/ndetail2:id=89" class="info-mod">
						<div class="record">
							<div>
							欢迎来到邻里中心，邻里相恤、毗邻而居是我国的文化传统，和睦健康的邻里关系对于家庭和谐、社区和谐、社会和谐都起着至关重要的作用，友善、互助、文明、和谐的邻里关系对于会让外来居民对社区更有归属感和认同感。<br>
							我们将在这里为大家准备了一个可以交流、体验的文化艺术休闲空间，同时还提供最贴心的生活服务咨询，内容包括就学、就医、购物、旅游、签证、购车、购房、法务、应急、运动及宗教场所等内容的查询。<br>
							我们联动各类国际机构和政府服务机构为在国际社区入驻的中外居民提供多方发展双向供需信息咨询和服务。为中外机构和个人在成都落户提供最便捷最有效的保障，这里将是你们另一个家园。
							</div>
						</div>
					</a>

					<a href="#index/tongzilin/ndetail2:id=90" class="info-mod">
						<div class="record">
							<div>
							Welcome to the Neighborhood Center. It is the cultural tradition of our country to be compassionate and live close to each other. Harmonious and healthy neighbourliness plays a vital role in family harmony, community harmony and social harmony. Friendly, mutual assistance, civilized and harmonious neighbourliness will make the foreign residents feel more belonging and identity to the community.<br>
							We are here to prepare a cultural and artistic leisure space for you to exchange and experience. At the same time, we also provide the most intimate life service consultation, including school, medical treatment, shopping, tourism, visa, car purchase, house purchase, legal affairs, emergency, sports and religious sites, etc.<br>
							We coordinate various international agencies and government service agencies to provide information consultation and services for Chinese and foreign residents residing in the international community. To provide the most convenient and effective guarantee for Chinese and foreign organizations and individuals to settle down in Chengdu, this will be another home for you.

							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
		<div class="main J_HomeCont">
		</div>
		<script type="text/html" class="J_HomeTemp">
			<div class="big m-title">新闻 · News</div>
			<% if ( news && news[0] ) { %>
			<a href="#index/tongzilin/ndetail2:id=<%= news[0].id%>" class="news">
				<div class="pic"><img src="<%= news[0].adImgUrl%>"/></div>
				<div class="n-cont">
					<div class="title ellipsis-1"><%= news[0].name%></div>
					<div class="sub-title ellipsis-1"><%= date(news[0].created, true )%></div>
				</div>
			</a>
			<% } %>
			<div class="news-list">
				<% if ( news && news.length >= 4 ) { %>
					<% for ( var i = 1; i < 4; ++i ) { %>
						<a href="#index/tongzilin/ndetail2:id=<%= news[i].id%>" class="small news">
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
				<a href="#index/tongzilin/news:type=1" class="tab">
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon1-white.png"/>
					</div>
					<div class="text">
                        <!--<div style="margin-bottom: 10px">双找</div>
                        <div>双报到</div>-->
                        <div class="text">
                        	组织孵化
                        	<div class="en">Social organization incubation base</div>
                        </div>
                    </div>
				</a>
				<a href="#index/tongzilin/news:type=2" class="tab" >
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon2.png"/>
					</div>
					<div class="text">
						艺术交流
						<div class="en">International art exchange</div>
					</div>
				</a>
				<a href="#index/tongzilin/news:type=3" class="tab" >
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon3.png"/>
					</div>
					<div class="text">
						生活服务
						<div class="en">Life Services</div>
					</div>
				</a>
				<a href="#index/tongzilin/news:type=4" class="tab" >
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon4.png"/>
					</div>
					<div class="text">
						邻里融合
						<div class="en">Community News</div>
					</div>
				</a>
				<!--<a href="#index/tongzilin/news:type=5" class="tab" >-->
				<a href="#index/tongzilin/qrcode" class="tab" >
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon5.png"/>
					</div>
					<div class="text">
						信息平台
						<div class="en">Information platform</div>
					</div>
				</a>
			</div>			
		</div>
	</div>
</div>