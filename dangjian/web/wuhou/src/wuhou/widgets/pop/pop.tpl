<div class="w-w-pop">
	<div class="pop">
		<div class="close J_Close">x</div>
		<div class="J_Cont">
		</div>
		<script class="J_PopTemp" type="text/html">
			<div class="header"><%= title%></div>
			<div class="cont-text">
				<%= msg%>
			</div>
			<div class="act">
				<% if ( showCancel ) { %>
					<div class="btn J_Btn" data-value="cancel">取消</div>
				<% } %>
				<div class="btn primary J_Btn" data-value="sure">确定</div>
			</div>
		</script>
	</div>
</div>