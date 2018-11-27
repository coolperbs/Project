<div class="w-p-actives">
	<!--<div class="shadow up"></div>
	<div class="shadow down"></div>-->
	<div class="cont J_List">
	</div>
	<script class="J_ListTemp" type="text/html">
		<% for ( var i = 0, n; n = news[i]; ++i ) { %>
		<a class="item" href="#index/tongzilin/ndetail2:id=<%= n.id%>">
			<img class="pic" src="<%= n.adImgUrl%>"/>
			<div class="info">
				<div class="title ellipsis-3"><%= n.name%></div>
			</div>
		</a>		
		<% } %>
	</script>
	</div>
</div>








