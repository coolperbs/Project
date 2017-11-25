<div class="cabin-widgets-pop" style="display:none;">
	<div class="J_PopCont pop">
	</div>
	<script class="J_PopTemp" type="text/html">
		<%if(title){%>
			<div class="head">
				<%= title%>
			</div>
			<%}%>
				<%if(msg){%>
					<div class="content">
						<%= msg%>
					</div>
					<%}%>
						<%if(html){%>
							<%=#html%>
								<%}%>
									<div class="act clearfix">
										<% var p; %>
											<% for ( p in btns ) { %>
												<%if(p=='ok'){%>
													<button data-type="<%=p%>" class="btn btn-primary" style="width:100px;margin:0 5px;">
														<%=btns[p].text%>
													</button>
													<%}else{%>
														<button class="btn btn-outline" data-type="<%=p%>" style="width:100px;margin:0 5px;">
															<%=btns[p].text%>
														</button>
														<%}%>
															<% } %>
									</div>
	</script>
	<div class="J_PopMask mask"></div>
</div>
