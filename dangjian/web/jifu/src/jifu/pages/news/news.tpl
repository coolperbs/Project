<div class="w-p-news">
	<div class="cont">
		<div class="analysis J_Analysis"  style="display:none">
			<div class="mod">
				<div class="title">年龄分布</div>
				<div class="J_Ages charts"></div>
			</div>
			<div class="mod">
				<div class="title">党龄分布</div>
				<div class="J_PartyAges charts"></div>			
			</div>
			<div class="mod line">
				<div class="title">党龄排名</div>
				<div class="J_AgeRank charts"></div>				
			</div>
			<div class="mod line">
				<div class="title">积分排名</div>
				<div class="J_PointRank charts"></div>				
			</div>
		</div>

		<div class="menu J_List" style="display:none">
		</div>
		<script class="J_ListTemp" type="text/html">
			<% for ( var i = 0, n; n = news[i]; ++i ) { %>
				<section class="<%= n.id == selected.id ? 'current' : ''%> J_Item" data-id="<%= n.id%>">
					<% if ( n.adImgUrl ) { %>
					<div class="pic">
						<img src="<%= n.adImgUrl%>"/>
					</div>
					<% } %>
					<div class="info">
						<div class="title ellipsis-2"><%= n.name%></div>
						<div class="sub"><%= date( n.created, true)%></div>
					</div>
				</section>
			<% } %>
		</script>


		<div class="main J_NewsMain" style="display:none">
			<div class="news news-wrap J_NewsCont">
			</div>
			<script class="J_NewsTemp" type="text/html">
				<% if ( imageUrl && false ) { %>
					<div class="main-pic">
						<img src="<%= imageUrl%>"/>
					</div>
				<% } %>
				<div class="detail">
					<div class="title ellipsis-2"><%= title%></div>
					<div class="sub-title"><%= date( publishDate, true)%> <!--<em>来源：{{缺数据}}</em>--></div>
					<% if ( moduleList && moduleList.length ) { %>
						<% for ( var j = 0, m; m = moduleList[j]; ++j) { %>
							<% if ( m.modulePrototypeId == 1 && m.data.contents && m.data.contents.length ) { %>	<!-- 文字 -->
								<% for ( var k = 0, t; t = m.data.contents[k]; ++k ) { %>
									<div class="text"><%= t%></div>
								<% } %>
							<% } %>
							<% if ( m.modulePrototypeId == 2 ) { %>	<!-- 图片 -->
								<div class="pic">
									<img src="<%= m.data.url%>"/>
								</div>
							<% } %>
							<% if ( m.modulePrototypeId == 4 ) { %>	<!-- 视频 -->
								<div class="video-wrap">
								<embed class="video" src="<%= m.data.code%>" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>
								</div>
							<% } %>
						<% } %>
					<% } %>
					<div class="commentlist J_CommentCont">
					</div>
				</div>
				<!--<div class="btn J_Comment" data-id="<%= id%>">评论</div>
				<div class="btn_back"></div>-->
			</script>

			<script type="text/html" class="J_CommentTemp">
				<% if ( total * 1 > 0 ) { %>
					<div class="title">评论<span>(<%= total%>)</span></div> 
					<div class="c-list">
						<% for ( var i = 0, c; c = list[i]; ++i ) { %>
						<div class="mod">
							<div class="user"><%= c.userPhone%> <span><%= date( c.commentCreated, true )%></span></div>
							<div class="c-text"><%= c.content%></div>
						</div>
						<% } %>
					</div>				
				<% } %>
			</script>
		</div>
	</div>
</div>