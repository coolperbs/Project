<div class="w-w-header">
	<div class="J_HMain h-cont">
	</div>
	<script class="J_HMainTemp" type="text/html">
		<div class="logo" style="-webkit-app-region:drag;">
			<img src="tongzilin/src/tongzilin/widgets/header/images/logo.png"/>
		</div>
		<!--
		<div class="info">
		 	<div class="mod">现有党支部<em><%= info.partyCount%></em>个</div>
		 	<div class="mod">现有党员<em><%= info.partyMemberCount%></em>个</div>
		 	<% if ( !token ) { %>
		 		<div class="mod login J_Login">登录</div>
		 	<% } else { %>
		 		<div class="mod login J_Logout">退出</div>
		 	<% } %>
		</div>-->
	</script>
	<div class="J_HSub h-cont sub">

		<!--
		<div class="sub-info">
			2017年11月2日
			上午
			10：00
		</div>-->
	</div>
	<script class="J_HeaderTemp" type="text/html">
		<div class="act">
			<div class="head">
				<div class="back J_Back">
					<img src="./tongzilin/src/tongzilin/widgets/header/images/back.png"/>
				</div>
				<div class="main-title">
					<div><%= title %></div>
					<div class="en"><%= en%></div>
				</div>
			</div>
			<div class="nav">
				<% for ( var i = 0,len = sorts.length; i< len; ++i ) { %>
					<div class="tab J_Tab <%= i == 0 ? 'current' : '' %>" data-value="<%= sorts[i].value%>">
						<div><%= sorts[i].text%></div>
						<div class="en"><%= sorts[i].en%></div>
					</div>
				<% } %>
			</div>
		</div>
		<% if ( search ) { %>
			<div class="search">
				<input type="text" class="J_SearchValue" placeholder="请输入搜索条件" />
				<div class="btn J_Search">
					<img src="./tongzilin/src/tongzilin/widgets/header/images/search.png"/>
				</div>
			</div>		
		<% } %>
	</script>
</div>