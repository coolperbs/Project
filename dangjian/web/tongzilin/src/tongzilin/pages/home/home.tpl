<div class="w-p-home">
	<div class="cont">
		<div class="sub">
			<div class="mod">
				<!--<div class="big title">社区简介 · Introduction</div>-->
				<div class="intro J_IntroCont">

				</div>
				<script class="J_IntroTemp" type="text/html">
					<div class="pic">
						<img src="tongzilin/src/tongzilin/pages/home/images/1.jpeg"/>
						<!--<img src="<%= shequ.adImgUrl%>"/>-->
					</div>
					<!--<div class="text">
						<div class="ellipsis-2">
						桐梓林社区是四川省成都市武侯区火车南站街道下辖的一个行政社区，东起人民南路四段，西至新光路，南起桐梓林南路，北至二环路南三段，面积0.6平方公里；有常住人口13576人，暂住人口约3000人。</div>
					</div>	-->				
				</script>
			</div>

			<div class="mod">
				<!--<div class="title">邻里中心 · Neighborhood Center</div>-->
				<div class="info">
					<a href="#index/tongzilin/ndetail2:id=89" class="info-mod">
						<div class="record">
							<div>
							社区东起人民南路四段，西到新光路，南从桐梓林南路起，北到二环路南三段，面积0.6平方公里，高档物管小区16个、单位院落3个，双流国际机场高速主城区出入口、天府国际机场18号线、地铁1号线、二环路联动整个区域，交通便利。辖区人口2万余人，其中外籍人士近4300人，来自于美国、英国、德国、韩国、日本等三十八个国家和地区，多数为国外驻成都机构中高层管理人员、外资企业高端人才，是近20年来成都市外籍人士居住最为集中的社区。成都最美街道——“欧洲风情街”是桐梓林社区的标志性街道，成为成都的一张国际名片，中英双语门牌，欧式风情浓郁。培育孵化出武侯区欣迪社会服务中心、志合服务中心等12家社会服务组织，拥有1所小学、2所中学、2所幼儿园，2家医院、4家医疗美容院等医美资源。聚集日本料理、韩国菜品、泰国餐吧的成都老外美食街，鳍合轩、雍雅河鲜、虾佬圣汤等10余家大中型餐饮场所，凯宾斯基饭店、成都富豪首座万丽酒店2家五星级涉外酒店，中国银行、工商银行等11家银行以及涵盖凯莱帝景、观南上域、上善国际、首座4座高端商务楼宇等资源进驻，让桐梓林成为“开放、包容、和谐”的宜商宜居宜业居住生活型国际社区。
							</div>
						</div>
					</a>

					<a href="#index/tongzilin/ndetail2:id=90" class="info-mod">
						<div class="record">
							<div>
							The community starts east from the fourth section of Renmin South Road , west to Xinguang Road , south from Tongzilin South Road , and north to the third section of Second Ring Road, covering the area of 0.6 square kilometers. There are 16 high-grade property management districts, 3 unit courtyards, the entrance and exit of Shuangliu International Airport, Tianfu International Airport Line 18, Metro Line 1 and Second Ring Road, linking the whole area which makes the transportation very convenient. The area has a population of over 20,000, of which nearly 4,300 are foreigners that from 38 countries and regions, such as the United States, Britain, Germany, South Korea and Japan. Most of them are middle and senior managers of foreign organizations in Chengdu and high-end talents of foreign-funded enterprises.It is the most concentrated residential communities in Chengdu in the past 20 years. The most beautiful street in Chengdu - "European Style Street" is the symbolic street of Tongzilin community, which becoming an international business card in Chengdu, bilingual doorplate of Chinese and English with strong European style. We have nurtured 12 social service organizations such as Xindi Social Service Center and Zhihe Service Center in Wuhou District. We have 1 primary school, 2 middle schools, 2 kindergartens, 2 hospitals and 4 medical beauty parlors. Chengdu Laowai Food Street, which gathers Japanese cuisine, Korean dishes and Thai cafes, has more than 10 large and medium-sized restaurants such as Jiahexuan, Yongya River food and shrimp Lao Saint soup, Kempinski Hotel, Chengdu Fortune's first Wanli Hotel, two five-star foreign-related hotels, 11 banks such as Bank of China, Industrial and Commercial Bank,as well as four high-end commercial buildings,which are the Kailaidijing, Guannanshangyu, Shangshan International, Shouzuo and other resources, Tongzilin becomes an “openning, inclusive and harmonious” livable international community suitable for business and livable.
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
		<div class="main J_HomeCont">
		</div>
		<script type="text/html" class="J_HomeTemp">
			<!--<div class="big m-title">三中心 · Three center</div>-->
			<a href="#index/tongzilin/ndetail2:id=149" class="news">
				<div class="pic"><img src="tongzilin/src/tongzilin/pages/home/images/01.jpeg"/></div>
				<div class="n-cont">
					<div class="title ellipsis-1">武侯区桐梓林国际社区邻里中心</div>
					<div class="sub-title ellipsis-1">2018年10月18日 22:10</div>
				</div>
			</a>
			<% if ( false && news && news[0] ) { %>
			<a href="#index/tongzilin/ndetail2:id=<%= news[0].id%>" class="news">
				<div class="pic"><img src="<%= news[0].adImgUrl%>"/></div>
				<div class="n-cont">
					<div class="title ellipsis-1"><%= news[0].name%></div>
					<div class="sub-title ellipsis-1"><%= date(news[0].created, true )%></div>
				</div>
			</a>
			<% } %>
			<div class="news-list">
				<a href="#index/tongzilin/ndetail2:id=148" class="small news">
					<div class="pic" style="background-image:url(tongzilin/src/tongzilin/pages/home/images/01.png); background-size:cover; background-position : center center;"></div>
					<div class="n-cont">
						<div class="title ellipsis-2">桐梓林社区党群服务中心</div>
						<div class="sub-title ellipsis-1">2018年10月18日 22:10</div>
					</div>
				</a>
				<a href="#index/tongzilin/ndetail2:id=147" class="small news">
					<div class="pic" style="background-image:url(tongzilin/src/tongzilin/pages/home/images/15.jpeg); background-size:cover; background-position : center center;"></div>
					<div class="n-cont">
						<div class="title ellipsis-2">桐梓林境外人员服务中心</div>
						<div class="sub-title ellipsis-1">2018年10月18日 22:10</div>
					</div>
				</a>									
				<% if ( false && news && news.length >= 4 ) { %>
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
			<!--<div class="big title">五平台 · Five platform</div>-->
			<div class="list">
				<!--<a href="#index/tongzilin/news:type=1" class="tab">
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon1-white.png"/>
					</div>
					<div class="text">
                        <div class="text">
                        	组织孵化
                        	<div class="en">Social organization incubation base</div>
                        </div>
                    </div>
				</a>-->
				<a href="#index/tongzilin/news:type=1" class="tab">
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon1-white.png"/>
					</div>
					<div class="text">
                        <div class="text">
                        	组织孵化
                        	<div class="en">Social organization incubation base</div>
                        </div>
                    </div>
				</a>
				<a href="#index/tongzilin/news:type=7" class="tab">
					<div class="icon">
						<img src="tongzilin/src/tongzilin/pages/home/images/icon8.png"/>
					</div>
					<div class="text">
                        <div class="text">
                        	活动公告
                        	<div class="en">Notice</div>
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