<div class="w-w-ppop">
	<div class="pop">
		<div class="close J_Close">x</div>
		<div class="J_Cont">
		</div>
		<script class="J_PopTemp" type="text/html">
			<div class="header">
				<div class="title ellipsis-1">
					<%= name%>
				</div>
				<div class="sub">
					<div class="cell">申请人:<%= userName%> <%= date( createTime )%></div>
					<% if ( flowUserName && flowTime ) { %>
						<div class="cell">认领人:<%= flowUserName%> <%= date( flowTime )%></div>
					<% } %>
				</div>
			</div>

			<div class="cont">
				<div class="desc">
				<%= desc%>
				</div>
				<% if ( flowNote && flowNote.length ) { %>
				<div class="comments">
					<div class="c-title">备注:</div>
					<% for ( var i = 0, n; n = flowNote[i]; ++i ) { %>
					<div class="cell">
						<div><%= date( n.noteTime )%>: <%= n.note%></div>
					</div>
					<%}%>
				</div>
				<% } %>
			</div>
			<!--<div class="act">
				<div class="btn J_Comment" data-value="sure">备注</div>
				<div class="btn primary J_Sure" data-value="sure">认领项目</div>
			</div>-->
		</script>
	</div>
</div>