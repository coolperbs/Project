<div class="w-p-ndetail2">
	<div class="cont">
		<div class="menu" style="background-image:url( ./wuhou/src/wuhou/pages/ndetail2/images/back.jpg )">
		</div>
		<div class="main">
			<div class="news news-wrap">
				<div class="detail J_NewsCont">
				</div>
				<script class="J_NewsTemp" type="text/html">
					<% if ( imageUrl ) { %>
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
</div>