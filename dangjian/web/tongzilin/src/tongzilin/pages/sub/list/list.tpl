<div class="w-p-sub-list">
	<div class="head">
		<div class="title">项目查询</div>
	</div>
	<div class="cont list J_ListCont">
	</div>
	<script class="J_ListTemp" type="text/html">
		<% if ( projects.length ) { %>
			<% for ( var i = 0, p; p = projects[i]; ++i ) { %>
				<div class="project J_Project" data-id="<%= p.projectId%>">
					<div class="title ellipsis-2"><%= p.name%></div>
					<div class="sub-info">
						<div class="mod">申请人：<%= p.userName%> <%= date( p.createTime )%></div>
						<% if ( p.flowUserName && p.flowTime ) { %>
							<div class="mod">认领人：<%= p.flowUserName%> <%= date( p.flowTime )%></div>
						<% } %>
					</div>
					<div class="detail ellipsis-3">
						<%= p.desc%>
					</div>
					<div class="act">
						<% if ( p.flowStatus == 1 ) { %>
							<div class="status wait">未认领</div>
							<div class="btns">
								<!--<div class="btn">查看详情</div>-->
								<!-- 不能认领自己的任务 -->
								<% if ( p.userId != userInfo.id && userInfo.level == 2 ) { %>
									<div class="btn primary J_Get" data-id="<%= p.projectId%>">认领项目</div>
								<% } else if ( p.userId == userInfo.id ) { %>
									我发布的任务
								<% } %>
							</div>
						<% } %>

						<% if ( p.flowStatus == 2 ) { %>
							<div class="status working">处理中</div>
							<% if ( p.flowUserId == userInfo.id ) { %>
								<div class="btns">
									<div class="btn J_Comment" data-id="<%= p.projectId%>">备注</div>
									<div class="btn primary J_Finish" data-id="<%= p.projectId%>">完结项目</div>
								</div>
							<% } %>						
						<% } %>

						<% if ( p.flowStatus == 4 ) { %>
							<div class="status working">已完结</div>
						<% } %>
					</div>
				</div>		
			<% } %>
		<% } else { %>
			没有数据
		<% } %>
	</script>
</div>